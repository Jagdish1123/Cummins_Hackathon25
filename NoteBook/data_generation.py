import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Categories and weightings for a hostel student
categories = {
    'food': 0.25,
    'transportation': 0.1,
    'entertainment': 0.1,
    'utilities': 0.05,
    'health': 0.05,
    'rent': 0.2,          # Hostel fees
    'shopping': 0.05,
    'stationery': 0.08,    # Books, pens, etc.
    'exam_fees': 0.07,    # Semester exams
    'miscellaneous': 0.05
}

# Common student expenses for each category
expense_descriptions = {
    'food': ['mess food', 'canteen', 'street food', 'groceries'],
    'transportation': ['bus pass', 'train ticket', 'bike fuel'],
    'entertainment': ['movie ticket', 'spotify', 'game subscription'],
    'utilities': ['phone bill', 'laundry', 'hostel electricity'],
    'health': ['medicines', 'doctor visit'],
    'rent': ['hostel rent', 'hostel deposit'],
    'shopping': ['clothes', 'shoes', 'accessories'],
    'stationery': ['notebooks', 'pen set', 'calculator', 'textbook'],
    'exam_fees': ['mid-term exam', 'final exam', 'certification fee'],
    'miscellaneous': ['photocopy', 'printing', 'donation']
}

# Price ranges for each category (min, max)
price_ranges = {
    'food': (10, 150),
    'transportation': (5, 100),
    'entertainment': (5, 50),
    'utilities': (20, 200),
    'health': (15, 300),
    'rent': (1000, 3000),  # Hostel fees are larger amounts
    'shopping': (50, 500),
    'stationery': (10, 200),
    'exam_fees': (100, 800),
    'miscellaneous': (5, 50)
}

# Generate dates for 2023
start_date = datetime(2023, 1, 1)
end_date = datetime(2023, 12, 31)
dates = pd.date_range(start_date, end_date)

# Synthetic data generation
data = []
for date in dates:
    category = np.random.choice(list(categories.keys()), p=list(categories.values()))
    description = np.random.choice(expense_descriptions[category])
    amount = round(np.random.uniform(*price_ranges[category]), 2)
    
    # Special case: Rent is typically a fixed monthly payment
    if category == 'rent' and date.day == 1:  # Pay rent on 1st of each month
        amount = round(np.random.uniform(1500, 2500), 2)
    elif category == 'rent':
        continue  # Skip rent for other days
        
    data.append([date.strftime('%Y-%m-%d'), description, category, amount])

df = pd.DataFrame(data, columns=['date', 'description', 'category', 'amount'])
df.to_csv('student_expenses_2023.csv', index=False)