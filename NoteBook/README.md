# 💸 AI Expense Tracker with Predictive Analytics

![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)
![LSTM](https://img.shields.io/badge/LSTM-Deep_Learning-FFA500?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-ML%20Pipeline-blue?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)

Smart AI-powered expense tracking system with **30-day forecasting**, **intelligent insights**, and **budget optimization**.

---

## 🚀 Features

### 📈 ML Model - LSTM Forecasting
- Trained on real user expense data (`myexpenses.csv`)
- 30-day sliding window for next-day predictions
- 🔧 MinMaxScaler normalization for robust LSTM learning
- 📊 Visual trendlines using Matplotlib
- 💡 Predictive budgeting to avoid overspending

### 💻 Streamlit Dashboard
- 💰 Real-time expense logging (Add/Edit/Delete)
- 📊 Dynamic charts via Plotly:
  - Category-wise distribution
  - Monthly analytics
  - 7-day AI-powered forecast
- 🎯 Personalized budget insights from ML model
- 🎨 Responsive, mobile-friendly UI with custom CSS

### 🔒 Security & Performance
- FastAPI backend with clean RESTful architecture
- JWT-based auth ready (optional)
- Async operations for scalability

---

## 🛠 Tech Stack

| Layer           | Technologies                          |
|----------------|----------------------------------------|
| **Frontend**    | Streamlit, Plotly, HTML/CSS            |
| **Backend**     | FastAPI, Uvicorn, Pydantic             |
| **ML Model**    | LSTM (Keras), Scikit-learn, NumPy      |
| **Database**    | MongoDB / SQLite                       |
| **Tools**       | Pandas, Matplotlib, Seaborn, dotenv    |

---

## 📦 Coming Soon
- 📤 Upload Receipts (OCR)
- 🧠 AI Categorization with BERT
- 🔐 Google OAuth Login
- 🔔 Smart Spend Alerts

---

> 💬 _Built to help users understand, predict, and optimize their financial behavior._

