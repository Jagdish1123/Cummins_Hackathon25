import pandas as pd
from fpdf import FPDF
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import os
import warnings
warnings.filterwarnings('ignore')

class SmartBudgetModel:
    def __init__(self):
        # Initialize cost estimation data
        self.cost_components = {
            'Component': [
                'UI/UX Design', 
                'Frontend Development (React)', 
                'Backend Development (Node.js + DB)',
                'AI & Analytics Integration',
                'Cloud Deployment (1st Year)',
                'QA, Testing & Security',
                'Documentation & Presentation'
            ],
            'Min Cost (INR)': [30000, 70000, 100000, 60000, 20000, 30000, 10000],
            'Max Cost (INR)': [60000, 100000, 150000, 100000, 40000, 50000, 20000]
        }
        
        # Revenue model data
        self.subscription_plans = {
            'Plan': ['Free Tier', 'Smart Tier', 'Pro Tier', 'Enterprise/Group'],
            'Monthly (INR)': [0, 99, 199, 'Custom'],
            'Yearly (INR)': [0, 999, 1999, 'Custom'],
            'Features': [
                'Basic tracking, manual entry, group creation, limited AI insights',
                'Bill uploads, basic predictions, badges, dark mode',
                'Advanced AI, financial insights, early payer score, full analytics',
                'Custom features for colleges, housing societies, or startups'
            ]
        }
        
        # Revenue streams
        self.revenue_streams = [
            'Freemium Subscriptions',
            'Group Plans',
            'Ad Revenue',
            'Affiliate Partnerships',
            'Data Insights (Anonymized)',
            'Consulting Services'
        ]
    
    def calculate_cost_estimates(self, inflation_factor=1.0):
        """Calculate cost estimates with optional inflation adjustment"""
        df = pd.DataFrame(self.cost_components)
        df['Min Cost (INR)'] = df['Min Cost (INR)'] * inflation_factor
        df['Max Cost (INR)'] = df['Max Cost (INR)'] * inflation_factor
        df['Avg Cost (INR)'] = (df['Min Cost (INR)'] + df['Max Cost (INR)']) / 2
        
        total_min = df['Min Cost (INR)'].sum()
        total_max = df['Max Cost (INR)'].sum()
        total_avg = df['Avg Cost (INR)'].sum()
        
        cost_summary = {
            'Total Min': total_min,
            'Total Max': total_max,
            'Total Avg': total_avg,
            'Details': df
        }
        
        return cost_summary
    
    def generate_revenue_projections(self, user_growth_rate=0.05, conversion_rates=None):
        """Generate revenue projections based on user growth and conversion rates"""
        if conversion_rates is None:
            conversion_rates = {
                'free_to_smart': 0.05,  # 5% convert from free to smart
                'free_to_pro': 0.02,    # 2% convert from free to pro
                'smart_to_pro': 0.1,    # 10% upgrade from smart to pro
                'group_adoption': 0.01  # 1% adopt group plans
            }
        
        # Base assumptions
        months = 12
        starting_users = 1000
        ad_revenue_per_user = 5  # INR per month
        affiliate_income_per_user = 10  # INR per month
        consulting_uptake = 0.005  # 0.5% of users
        
        # Initialize projections
        projections = []
        users = starting_users
        
        for month in range(1, months + 1):
            # Calculate subscription users
            smart_users = users * conversion_rates['free_to_smart']
            pro_users = users * conversion_rates['free_to_pro']
            group_users = users * conversion_rates['group_adoption']
            
            # Upgrade existing smart users to pro
            pro_users += smart_users * conversion_rates['smart_to_pro']
            smart_users -= smart_users * conversion_rates['smart_to_pro']
            
            # Calculate revenues
            subscription_revenue = (smart_users * 99) + (pro_users * 199) + (group_users * 299)
            ad_revenue = users * ad_revenue_per_user
            affiliate_revenue = users * affiliate_income_per_user
            consulting_revenue = users * consulting_uptake * 299
            
            total_revenue = subscription_revenue + ad_revenue + affiliate_revenue + consulting_revenue
            
            projections.append({
                'Month': month,
                'Total Users': users,
                'Smart Users': smart_users,
                'Pro Users': pro_users,
                'Group Users': group_users,
                'Subscription Revenue': subscription_revenue,
                'Ad Revenue': ad_revenue,
                'Affiliate Revenue': affiliate_revenue,
                'Consulting Revenue': consulting_revenue,
                'Total Revenue': total_revenue
            })
            
            # Grow user base
            users *= (1 + user_growth_rate)
        
        return pd.DataFrame(projections)
    
    def save_plot_to_tempfile(self, plt):
        """Save matplotlib plot to a temporary file and return path"""
        temp_dir = "temp"
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)
        
        temp_path = os.path.join(temp_dir, "temp_plot.png")
        plt.savefig(temp_path, format='png', bbox_inches='tight')
        plt.close()
        return temp_path
    
    def plot_cost_breakdown(self):
        """Generate a cost breakdown pie chart"""
        cost_data = self.calculate_cost_estimates()
        avg_costs = cost_data['Details']['Avg Cost (INR)']
        components = cost_data['Details']['Component']
        
        plt.figure(figsize=(10, 6))
        plt.pie(avg_costs, labels=components, autopct='%1.1f%%', startangle=140)
        plt.title('Average Development Cost Breakdown')
        plt.tight_layout()
        
        return self.save_plot_to_tempfile(plt)
    
    def plot_revenue_growth(self, projections):
        """Generate a revenue growth line chart"""
        plt.figure(figsize=(10, 6))
        plt.plot(projections['Month'], projections['Total Revenue'], label='Total Revenue')
        plt.plot(projections['Month'], projections['Subscription Revenue'], label='Subscription Revenue')
        plt.xlabel('Month')
        plt.ylabel('Revenue (INR)')
        plt.title('Projected Revenue Growth')
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        
        return self.save_plot_to_tempfile(plt)
    
    def generate_report(self, output_path='SmartBudget_Report.pdf'):
        """Generate a comprehensive PDF report"""
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()
        
        # Title
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, 'SmartBudget - Financial Model Report', 0, 1, 'C')
        pdf.ln(10)
        
        # Cost Estimation Section
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, '1. Development Cost Estimation', 0, 1)
        pdf.set_font('Arial', '', 12)
        
        cost_data = self.calculate_cost_estimates()
        total_min = f"Rs. {cost_data['Total Min']:,.2f}"
        total_max = f"Rs. {cost_data['Total Max']:,.2f}"
        
        pdf.multi_cell(0, 10, f"Total Development Cost Range: {total_min} - {total_max}")
        pdf.ln(5)
        
        # Add cost breakdown table
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(90, 10, 'Component', 1)
        pdf.cell(40, 10, 'Min Cost', 1)
        pdf.cell(40, 10, 'Max Cost', 1, 1)
        pdf.set_font('Arial', '', 12)
        
        for _, row in cost_data['Details'].iterrows():
            pdf.cell(90, 10, row['Component'], 1)
            pdf.cell(40, 10, f"Rs. {row['Min Cost (INR)']:,.2f}", 1)
            pdf.cell(40, 10, f"Rs. {row['Max Cost (INR)']:,.2f}", 1, 1)
        
        # Add cost breakdown image
        pdf.ln(10)
        cost_chart_path = self.plot_cost_breakdown()
        pdf.image(cost_chart_path, x=10, w=180)
        
        # Revenue Model Section
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, '2. Revenue Model', 0, 1)
        
        # Subscription Plans
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Subscription Plans:', 0, 1)
        pdf.set_font('Arial', '', 12)
        
        for plan in self.subscription_plans['Plan']:
            idx = self.subscription_plans['Plan'].index(plan)
            monthly = self.subscription_plans['Monthly (INR)'][idx]
            yearly = self.subscription_plans['Yearly (INR)'][idx]
            features = self.subscription_plans['Features'][idx]
            
            pdf.cell(0, 10, f"{plan}: Rs. {monthly}/month or Rs. {yearly}/year", 0, 1)
            pdf.multi_cell(0, 10, f"Features: {features}")
            pdf.ln(2)
        
        # Revenue Streams
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Revenue Streams:', 0, 1)
        pdf.set_font('Arial', '', 12)
        
        for stream in self.revenue_streams:
            pdf.cell(0, 10, f"- {stream}", 0, 1)
        
        # Revenue Projections
        pdf.ln(5)
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, '12-Month Revenue Projections:', 0, 1)
        
        projections = self.generate_revenue_projections()
        revenue_chart_path = self.plot_revenue_growth(projections)
        pdf.image(revenue_chart_path, x=10, w=180)
        
        # Clean up temporary files
        if os.path.exists(cost_chart_path):
            os.remove(cost_chart_path)
        if os.path.exists(revenue_chart_path):
            os.remove(revenue_chart_path)
        
        # Save the PDF
        pdf.output(output_path)
        return output_path

# Example usage
if __name__ == "__main__":
    model = SmartBudgetModel()
    
    # Calculate cost estimates
    cost_estimates = model.calculate_cost_estimates()
    print(f"Total Development Cost Range: Rs. {cost_estimates['Total Min']:,.2f} - Rs. {cost_estimates['Total Max']:,.2f}")
    
    # Generate revenue projections
    projections = model.generate_revenue_projections()
    print("\nFirst 3 months revenue projections:")
    print(projections.head(3))
    
    # Generate full report
    report_path = model.generate_report()
    print(f"\nReport generated at: {report_path}")