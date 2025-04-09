
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionGraphsProps {
  className?: string;
}

export const PredictionGraphs = ({ className }: PredictionGraphsProps) => {
  const [activeTab, setActiveTab] = useState('monthly');
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Spending Predictions",
      description: "Forecast your future expenses based on spending patterns",
      monthly: "Monthly",
      yearly: "Yearly",
      amount: "Amount",
      month: "Month",
      year: "Year",
      actual: "Actual",
      predicted: "Predicted",
      january: "Jan",
      february: "Feb",
      march: "Mar",
      april: "Apr",
      may: "May",
      june: "Jun",
      july: "Jul",
      august: "Aug",
      september: "Sep",
      october: "Oct",
      november: "Nov",
      december: "Dec",
    },
    mr: {
      title: "खर्च भविष्यवाणी",
      description: "खर्च पॅटर्नवर आधारित आपला भविष्यातील खर्च अंदाज",
      monthly: "मासिक",
      yearly: "वार्षिक",
      amount: "रक्कम",
      month: "महिना",
      year: "वर्ष",
      actual: "वास्तविक",
      predicted: "अंदाजित",
      january: "जाने",
      february: "फेब्रु",
      march: "मार्च",
      april: "एप्रिल",
      may: "मे",
      june: "जून",
      july: "जुलै",
      august: "ऑगस्ट",
      september: "सप्टें",
      october: "ऑक्टो",
      november: "नोव्हें",
      december: "डिसें",
    }
  };

  const t = translations[language];

  const monthNames = [
    t.january, t.february, t.march, t.april,
    t.may, t.june, t.july, t.august,
    t.september, t.october, t.november, t.december
  ];

  // Generate mock data for monthly predictions
  const currentMonth = new Date().getMonth();
  const monthlyData = monthNames.map((month, index) => {
    // Past months (actual data)
    if (index <= currentMonth) {
      return {
        name: month,
        actual: Math.floor(Math.random() * 30000) + 10000,
        predicted: null
      };
    } 
    // Future months (predictions)
    else {
      return {
        name: month,
        actual: null,
        predicted: Math.floor(Math.random() * 30000) + 10000
      };
    }
  });

  // Generate mock data for yearly predictions
  const currentYear = new Date().getFullYear();
  const yearlyData = Array.from({ length: 6 }, (_, i) => {
    const year = currentYear - 2 + i;
    // Past years (actual data)
    if (year < currentYear) {
      return {
        name: year.toString(),
        actual: Math.floor(Math.random() * 350000) + 100000,
        predicted: null
      };
    } 
    // Current year
    else if (year === currentYear) {
      return {
        name: year.toString(),
        actual: Math.floor(Math.random() * 350000) + 100000,
        predicted: Math.floor(Math.random() * 350000) + 100000
      };
    }
    // Future years (predictions)
    else {
      return {
        name: year.toString(),
        actual: null,
        predicted: Math.floor(Math.random() * 350000) + 100000
      };
    }
  });

  // Custom tooltip formatter that uses ₹
  const formatTooltip = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
        <Tabs 
          defaultValue="monthly" 
          className="mt-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="monthly">{t.monthly}</TabsTrigger>
            <TabsTrigger value="yearly">{t.yearly}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {activeTab === 'monthly' ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `₹${value/1000}k`} 
                label={{ value: t.amount, angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip formatter={(value) => formatTooltip(value as number)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3f51b5" 
                name={t.actual} 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#4caf50" 
                name={t.predicted} 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={{ r: 4 }} 
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `₹${value/1000}k`} 
                label={{ value: t.amount, angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip formatter={(value) => formatTooltip(value as number)} />
              <Legend />
              <Bar 
                dataKey="actual" 
                fill="#3f51b5" 
                name={t.actual} 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="predicted" 
                fill="#4caf50" 
                name={t.predicted} 
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionGraphs;
