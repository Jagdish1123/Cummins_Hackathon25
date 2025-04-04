import streamlit as st
import requests
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import numpy as np

# Configuration
BASE_URL = "http://127.0.0.1:8000"  # FastAPI server URL
CATEGORIES = ["food", "transport", "restaurant", "healthcare", "rent", "utilities", "entertainment", "personal_development"]
COLOR_PALETTE = px.colors.qualitative.Pastel

# Set page config
st.set_page_config(
    page_title="AI Expense Tracker",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        background-color: #f8f9fa;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        padding: 0.5rem 1rem;
    }
    .stSelectbox, .stDateInput, .stTextInput, .stNumberInput {
        margin-bottom: 1rem;
    }
    .metric-card {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
    }
    .plot-container {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
    }
    </style>
""", unsafe_allow_html=True)

# Helper functions
@st.cache_data(ttl=300)
def fetch_data(endpoint):
    try:
        response = requests.get(f"{BASE_URL}{endpoint}")
        if response.status_code == 200:
            return response.json()
        return None
    except requests.exceptions.RequestException:
        return None

def display_metric(label, value, delta=None):
    st.metric(label=label, value=f"${value:,.2f}", delta=delta)

# Sidebar - Filters and Actions
with st.sidebar:
    st.title("💰 AI Expense Tracker")
    st.markdown("---")
    
    # Date range selector
    today = datetime.today()
    default_start = today - timedelta(days=30)
    start_date = st.date_input("Start Date", default_start)
    end_date = st.date_input("End Date", today)
    
    # Category filter
    selected_categories = st.multiselect(
        "Filter Categories",
        options=CATEGORIES,
        default=CATEGORIES
    )
    
    st.markdown("---")
    st.markdown("### Quick Actions")
    if st.button("🔄 Refresh Data"):
        st.cache_data.clear()

# Main Page Layout
st.title("AI-Powered Expense Dashboard")

# Row 1: Summary Metrics
try:
    summary_data = fetch_data("/analytics/summary")
    
    if summary_data:
        col1, col2, col3 = st.columns(3)
        with col1:
            display_metric("Total Spent", summary_data["total_spent"])
        with col2:
            display_metric("Avg Daily", summary_data["average_daily"])
        with col3:
            monthly_trend = list(summary_data["monthly_trends"].values())
            trend = "↑" if len(monthly_trend) > 1 and monthly_trend[-1] > monthly_trend[-2] else "↓"
            display_metric("Monthly Trend", monthly_trend[-1], trend)
except Exception as e:
    st.error("Couldn't load summary metrics")

# Row 2: Add Expense Form
with st.expander("➕ Add New Expense", expanded=False):
    with st.form("expense_form"):
        cols = st.columns(4)
        with cols[0]:
            date = st.date_input("Date", today)
        with cols[1]:
            description = st.text_input("Description")
        with cols[2]:
            category = st.selectbox("Category", CATEGORIES)
        with cols[3]:
            amount = st.number_input("Amount", min_value=0.0, format="%.2f", step=1.0)
        
        submitted = st.form_submit_button("Add Expense")
        if submitted:
            expense_data = {
                "date": date.strftime('%Y-%m-%d'),
                "description": description,
                "category": category,
                "amount": amount
            }
            try:
                response = requests.post(f"{BASE_URL}/expenses/", json=expense_data)
                if response.status_code == 201:
                    st.success("✅ Expense added successfully!")
                else:
                    st.error(f"Error adding expense: {response.text}")
            except requests.exceptions.RequestException:
                st.error("Couldn't connect to the server")

# Row 3: Charts and Visualizations
tab1, tab2, tab3, tab4 = st.tabs(["📊 Spending Analysis", "🔮 AI Forecast", "💡 Budget Insights", "📝 Expense Log"])

with tab1:  # Spending Analysis
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Category Distribution")
        if summary_data:
            df_cat = pd.DataFrame({
                "Category": summary_data["category_distribution"].keys(),
                "Amount": summary_data["category_distribution"].values()
            })
            fig = px.pie(df_cat, values="Amount", names="Category", 
                         color_discrete_sequence=COLOR_PALETTE)
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.warning("No category data available")
    
    with col2:
        st.markdown("### Monthly Trend")
        if summary_data and "monthly_trends" in summary_data:
            df_monthly = pd.DataFrame({
                "Month": summary_data["monthly_trends"].keys(),
                "Amount": summary_data["monthly_trends"].values()
            })
            fig = px.bar(df_monthly, x="Month", y="Amount", 
                         color_discrete_sequence=[COLOR_PALETTE[1]])
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.warning("No monthly trend data available")

with tab2:  # AI Forecast
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Next Day Prediction")
        try:
            prediction = fetch_data("/predict")
            if prediction:
                display_metric("Predicted Amount", prediction["predicted_amount"])
                st.progress(int(prediction["confidence"] * 100))
                st.caption(f"Confidence: {prediction['confidence']*100:.0f}%")
                st.info(prediction["message"])
            else:
                st.warning("Couldn't load prediction")
        except Exception:
            st.error("Prediction service unavailable")
    
    with col2:
        st.markdown("### 7-Day Forecast")
        try:
            forecast = fetch_data("/forecast")
            if forecast:
                df_forecast = pd.DataFrame({
                    "Date": forecast["forecast"].keys(),
                    "Amount": forecast["forecast"].values()
                })
                fig = px.line(df_forecast, x="Date", y="Amount", 
                             title=f"Trend: {forecast['trend'].capitalize()}",
                             color_discrete_sequence=[COLOR_PALETTE[4]])
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.warning("Couldn't load forecast")
        except Exception:
            st.error("Forecast service unavailable")

with tab3:  # Budget Insights
    try:
        recommendations = fetch_data("/budget/recommendations")
        if recommendations:
            st.markdown("### Personalized Budget Recommendations")
            cols = st.columns(3)
            for i, rec in enumerate(recommendations):
                with cols[i % 3]:
                    with st.container():
                        st.markdown(f"#### {rec['category'].capitalize()}")
                        st.write(f"**Current:** ${rec['current_spending']:,.2f}")
                        st.write(f"**Recommended:** ${rec['recommended_limit']:,.2f}")
                        progress = min(100, (rec['current_spending'] / rec['recommended_limit']) * 100) if rec['recommended_limit'] > 0 else 0
                        st.progress(int(progress))
                        st.info(rec['suggestion'])
        else:
            st.warning("No budget recommendations available")
    except Exception:
        st.error("Couldn't load budget recommendations")

with tab4:  # Expense Log
    try:
        expenses = fetch_data("/expenses")
        if expenses:
            df = pd.DataFrame(expenses)
            df['date'] = pd.to_datetime(df['date'])
            
            # Apply filters
            mask = (df['date'].dt.date >= start_date) & (df['date'].dt.date <= end_date)
            df = df[mask]
            df = df[df['category'].isin(selected_categories)]
            
            st.markdown(f"### Expense Log ({len(df)} records)")
            
            # Group by category for quick view
            with st.expander("📌 Category Summary", expanded=True):
                cat_summary = df.groupby('category')['amount'].agg(['sum', 'count'])
                st.dataframe(cat_summary.style.format({'sum': '${:,.2f}'}))
            
            # Detailed view
            with st.expander("🔍 View All Expenses", expanded=False):
                st.dataframe(df.sort_values('date', ascending=False).reset_index(drop=True))
        else:
            st.warning("No expense data available")
    except Exception:
        st.error("Couldn't load expense data")

# Health status in sidebar
with st.sidebar:
    st.markdown("---")
    try:
        health = fetch_data("/health")
        if health:
            status = " Operational" if health["status"] == "OK" else " Degraded"
            st.markdown(f"**Service Status:** {status}")
            st.caption(f"Data points: {health['data_points']}")
            st.caption(f"Model loaded: {'Yes' if health['model_loaded'] else 'No'}")
    except Exception:
        st.markdown("**Service Status:**  Unavailable")