# 💳 QR Payment App with UPI Integration

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Secure UPI payment solution with dynamic QR generation and transaction logging.

---

## ✨ Key Features

- ⚡ **Instant QR Generation** for UPI payments  
- 🔁 **Dual Payment Mode**: UPI ID or mobile number  
- 📡 **Real-time Transaction Logging** to Supabase  
- 🎞️ **Animated UI** with Framer Motion  
- 📱 **Responsive Design** for all devices  

---

## 🛠 Tech Stack

### 🧩 Frontend

- React + Vite
- React Router
- Framer Motion (for animations)
- `qrcode.react` (QR code generation)
- `react-hot-toast` (for toast notifications)

### 🗃️ Backend

- Supabase (Database & Auth)
- Node.js (API routes)
- MongoDB (User data – optional)

---

## 🔧 Environment Setup

Create a `.env` file in your root directory and add the following:

```bash
VITE_SUPABASE_URL=https://dgzkcnsdbmlclztjedaj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... 

