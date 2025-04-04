from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, validator, Field
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from datetime import datetime, timedelta
from typing import List, Optional, Dict
import logging
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app with enhanced settings
app = FastAPI(
    title="AI-Powered Expense Tracker API",
    description="Advanced expense tracking with predictive analytics and financial insights",
    version="2.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Middleware for frontend compatibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
CONFIG = {
    "SEQ_LENGTH": 14,  
    "MODEL_PATH": "/mnt/newData/MERN_Project/Cummins_Hackethon/NoteBook/Model/expense_model.keras",
    "SCALER_PATH": "amount_scaler.save",
    "MIN_DATA_POINTS": 30,
    "FORECAST_DAYS": 7
}

# Load resources with error handling
try:
    model = load_model(CONFIG["MODEL_PATH"])
    logger.info("AI model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    model = None

try:
    scaler = joblib.load(CONFIG["SCALER_PATH"])
    logger.info("Scaler loaded successfully")
except Exception as e:
    logger.warning(f"Failed to load scaler: {str(e)}")
    scaler = MinMaxScaler()

# Enhanced data model with validation
class ExpenseInput(BaseModel):
    date: str = Field(..., example="2023-01-01")
    description: str = Field(..., max_length=100, example="Groceries at Whole Foods")
    category: str = Field(..., example="food", 
                         description="Expense category: food, transport, restaurant, healthcare, rent, utilities, entertainment")
    amount: float = Field(..., gt=0, example=45.30)

    @validator('date')
    def validate_date(cls, v):
        try:
            pd.to_datetime(v)
            return v
        except ValueError:
            raise ValueError("Invalid date format. Use YYYY-MM-DD")

# Response models for better API documentation
class PredictionResponse(BaseModel):
    predicted_amount: float
    confidence: float
    message: Optional[str]

class ForecastResponse(BaseModel):
    forecast: Dict[str, float]  # date: amount
    trend: str  # increasing, decreasing, stable
    confidence: float

class BudgetRecommendation(BaseModel):
    category: str
    recommended_limit: float
    current_spending: float
    suggestion: str

# Database simulation with persistence
class ExpenseDatabase:
    def __init__(self):
        self.df = pd.DataFrame(columns=['date', 'description', 'category', 'amount'])
        self.load_initial_data()
    
    def load_initial_data(self):
        """Load sample data if empty"""
        if len(self.df) == 0:
            sample_data = {
                'date': pd.date_range(end=datetime.today(), periods=30).astype(str),
                'description': ['Sample expense'] * 30,
                'category': ['food'] * 10 + ['transport'] * 5 + ['restaurant'] * 5 + ['utilities'] * 5 + ['rent'] * 5,
                'amount': [45 + i*0.5 for i in range(30)]
            }
            self.df = pd.DataFrame(sample_data)
            self.df['date'] = pd.to_datetime(self.df['date'])
    
    def add_expense(self, expense: dict):
        """Add new expense with validation"""
        new_row = pd.DataFrame([{
            'date': pd.to_datetime(expense['date']),
            'description': expense['description'],
            'category': expense['category'],
            'amount': expense['amount']
        }])
        self.df = pd.concat([self.df, new_row], ignore_index=True)
        return new_row.iloc[0].to_dict()
    
    def get_recent_expenses(self, days: int = 30):
        """Get expenses for the last N days"""
        if len(self.df) == 0:
            return pd.DataFrame()
        cutoff_date = datetime.today() - timedelta(days=days)
        return self.df[self.df['date'] >= cutoff_date]
    
    def get_category_summary(self):
        """Get spending by category"""
        if len(self.df) == 0:
            return {}
        return self.df.groupby('category')['amount'].sum().to_dict()

# Initialize database
db = ExpenseDatabase()

# Helper functions with improved error handling
def preprocess_data(data: pd.Series) -> np.ndarray:
    """Scale and prepare data for model input"""
    try:
        scaled = scaler.fit_transform(data.values.reshape(-1, 1))
        sequences = []
        for i in range(len(scaled) - CONFIG["SEQ_LENGTH"] + 1):
            sequences.append(scaled[i:i+CONFIG["SEQ_LENGTH"]])
        return np.array(sequences)
    except Exception as e:
        logger.error(f"Data preprocessing failed: {str(e)}")
        raise

def predict_next_value(sequences: np.ndarray) -> float:
    """Make prediction with confidence estimation"""
    if model is None:
        raise HTTPException(status_code=503, detail="Prediction model not available")
    
    try:
        # Get the last sequence and reshape for model input
        last_sequence = sequences[-1].reshape(1, CONFIG["SEQ_LENGTH"], 1)
        prediction = model.predict(last_sequence)
        return float(scaler.inverse_transform(prediction)[0][0])
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction error")

def generate_forecast(sequences: np.ndarray, days: int) -> Dict[str, float]:
    """Generate multi-day forecast with recursive prediction"""
    forecast = {}
    current_sequence = sequences[-1].copy()
    
    for day in range(1, days + 1):
        # Reshape and predict
        prediction = model.predict(current_sequence.reshape(1, CONFIG["SEQ_LENGTH"], 1))
        predicted_value = float(scaler.inverse_transform(prediction)[0][0])
        
        # Store prediction
        date_str = (datetime.today() + timedelta(days=day)).strftime("%Y-%m-%d")
        forecast[date_str] = predicted_value
        
        # Update sequence for next prediction
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[-1] = scaler.transform([[predicted_value]])[0][0]
    
    return forecast

# API Endpoints with enhanced functionality
@app.post("/expenses/", status_code=201)
async def add_expense(expense: ExpenseInput):
    """Add a new expense record"""
    try:
        new_expense = db.add_expense(expense.dict())
        logger.info(f"Added new expense: {new_expense}")
        return {"message": "Expense added successfully", "expense": new_expense}
    except Exception as e:
        logger.error(f"Error adding expense: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/expenses/", response_model=List[dict])
async def get_expenses(limit: int = 100, category: Optional[str] = None):
    """Get all expenses with optional filtering"""
    try:
        df = db.df.copy()
        if category:
            df = df[df['category'] == category]
        return df.sort_values('date', ascending=False).head(limit).to_dict('records')
    except Exception as e:
        logger.error(f"Error retrieving expenses: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving expenses")

@app.get("/predict/", response_model=PredictionResponse)
async def predict_next_expense():
    """Predict next day's expense amount"""
    try:
        recent_data = db.get_recent_expenses(60)['amount']
        if len(recent_data) < CONFIG["MIN_DATA_POINTS"]:
            raise HTTPException(
                status_code=400,
                detail=f"Need at least {CONFIG['MIN_DATA_POINTS']} data points for prediction"
            )
        
        sequences = preprocess_data(recent_data)
        predicted_amount = predict_next_value(sequences)
        
        # Simple confidence estimation (could be enhanced)
        confidence = min(0.95, len(recent_data) / 100)  # More data = higher confidence
        
        return {
            "predicted_amount": round(predicted_amount, 2),
            "confidence": round(confidence, 2),
            "message": "Prediction based on recent spending patterns"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction service unavailable")

@app.get("/forecast/", response_model=ForecastResponse)
async def forecast_expenses(days: int = CONFIG["FORECAST_DAYS"]):
    """Generate expense forecast for next N days"""
    try:
        if days < 1 or days > 30:
            raise HTTPException(status_code=400, detail="Days must be between 1 and 30")
            
        recent_data = db.get_recent_expenses(90)['amount']
        if len(recent_data) < CONFIG["MIN_DATA_POINTS"]:
            raise HTTPException(
                status_code=400,
                detail=f"Need at least {CONFIG['MIN_DATA_POINTS']} data points for forecasting"
            )
        
        sequences = preprocess_data(recent_data)
        forecast = generate_forecast(sequences, days)
        
        # Determine trend
        values = list(forecast.values())
        trend = "stable"
        if len(values) > 1:
            if values[-1] > values[0] * 1.1:
                trend = "increasing"
            elif values[-1] < values[0] * 0.9:
                trend = "decreasing"
        
        return {
            "forecast": {k: round(v, 2) for k, v in forecast.items()},
            "trend": trend,
            "confidence": 0.8  
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Forecast error: {str(e)}")
        raise HTTPException(status_code=500, detail="Forecast service unavailable")

@app.get("/budget/recommendations", response_model=List[BudgetRecommendation])
async def get_budget_recommendations():
    """Get personalized budget recommendations"""
    try:
        category_spending = db.get_category_summary()
        if not category_spending:
            raise HTTPException(status_code=404, detail="No expense data available")
        
        total_spending = sum(category_spending.values())
        recommendations = []
        
        # Smart budget rules based on category
        rules = {
            "food": {"target": 0.25, "message": "Consider meal planning to reduce costs"},
            "restaurant": {"target": 0.15, "message": "Try cooking at home more often"},
            "transport": {"target": 0.1, "message": "Explore carpooling or public transit"},
            "entertainment": {"target": 0.05, "message": "Look for free entertainment options"},
            "rent": {"target": 0.3, "message": "This seems reasonable for housing"},
            "utilities": {"target": 0.1, "message": "Check for energy-saving opportunities"},
            "healthcare": {"target": 0.05, "message": "Health is important, budget accordingly"}
        }
        
        for category, spending in category_spending.items():
            target_percentage = rules.get(category, {"target": 0.1})["target"]
            recommended = total_spending * target_percentage
            suggestion = rules.get(category, {"message": "Monitor this category"})["message"]
            
            recommendations.append({
                "category": category,
                "recommended_limit": round(recommended, 2),
                "current_spending": round(spending, 2),
                "suggestion": suggestion
            })
        
        return recommendations
    except Exception as e:
        logger.error(f"Budget recommendation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating recommendations")

@app.get("/analytics/summary")
async def get_spending_summary():
    """Get comprehensive spending analytics"""
    try:
        df = db.df.copy()
        if df.empty:
            raise HTTPException(status_code=404, detail="No expense data available")
        
        # Basic stats
        total_spent = df['amount'].sum()
        avg_daily = df.groupby(df['date'].dt.date)['amount'].sum().mean()
        category_dist = df.groupby('category')['amount'].sum().to_dict()
        
        # Monthly trends
        monthly = df.set_index('date').resample('M')['amount'].sum().to_dict()
        
        return {
            "total_spent": round(total_spent, 2),
            "average_daily": round(avg_daily, 2),
            "category_distribution": {k: round(v, 2) for k, v in category_dist.items()},
            "monthly_trends": {k.strftime("%Y-%m"): round(v, 2) for k, v in monthly.items()}
        }
    except Exception as e:
        logger.error(f"Analytics error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating analytics")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Service health check"""
    return {
        "status": "OK",
        "model_loaded": model is not None,
        "data_points": len(db.df),
        "version": "2.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=True
    )