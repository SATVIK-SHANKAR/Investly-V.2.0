# 💹 Investly V2.0

**Investly** is a smart and sleek investment planning web app that helps you build a personalized portfolio based on your **risk profile** and **investment amount**. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, and powered by real-time market data via **TradingView**, Investly aims to simplify investing for everyone — whether you're a cautious saver or a thrill-seeking trader.

---

## 🚀 What’s New in V2.0

We've made major updates in this version of Investly to bring a better experience:

- 🔧 **News API Bug Fix**: Resolved the news fetch issue, now headlines display seamlessly again.
- ➕ **New Portfolio Button Fix**: "Create New Portfolio" now works without reloading or freezing.
- 🤖 **AI Assistant Integration** (Coming Soon): Foundation laid for integrating an AI-based advisor to help you analyze your portfolio decisions smarter and faster.

> Stay tuned — this is just the beginning of a more intelligent Investly.

---

## 🎯 Purpose

Investly empowers everyday investors by answering:

> _"How should I allocate my money across stocks, bonds, crypto, and cash based on my goals?"_

Using a user-friendly interface and a smart rule-based algorithm, it provides **simple yet actionable advice**.

---

## 🌐 Live Demo

🔗 [https://investly-eight.vercel.app/](https://investly-eight.vercel.app/)

> ⚠️ API calls are limited to 5/day (Free TradingView tier). For uninterrupted use, consider upgrading or adding a caching layer.

---

## 🔥 Features

- 📈 Real-time **market data** (stocks, crypto, etc.)
- ⚖️ **Risk-based asset allocation** using financial principles
- 🧠 AI integration (WIP) for smarter insights
- 📊 Interactive **portfolio breakdown** charts
- 📰 Live financial **news feed**
- 🖥️ **Responsive UI** for desktop & mobile
- ✨ Built with Next.js + TypeScript + Tailwind

---

## 🧠 How the Allocation Works

Investly uses a simplified version of **Modern Portfolio Theory** to offer sensible diversification for 3 risk levels.

| Asset Class | Low Risk | Medium Risk | High Risk |
|-------------|----------|-------------|-----------|
| **Stocks**  | 20%      | 50%         | 70%       |
| **Bonds**   | 50%      | 30%         | 10%       |
| **Crypto**  | 5%       | 10%         | 15%       |
| **Cash**    | 25%      | 10%         | 5%        |

For example:  
💰 ₹100,000 with **High Risk** = ₹70K in stocks, ₹10K in bonds, ₹15K in crypto, and ₹5K in cash.

> Built to be transparent, customizable, and easy to scale with future AI/ML enhancements.

---

## ⚙️ Tech Stack

| Area       | Tech                     |
|------------|--------------------------|
| Framework  | [Next.js](https://nextjs.org/) |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) |
| Language   | TypeScript               |
| Charts     | [Chart.js](https://www.chartjs.org/) via `react-chartjs-2` |
| API        | TradingView, News API    |
| Hosting    | Vercel                   |

---

## 🧪 Getting Started

### 🔁 Clone the Repo

```bash
git clone https://github.com/SATVIK-SHANKAR/Investly-V.2.0.git
cd Investly-V.2.0
```

### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🚀 Start Development Server

```bash
npm run dev
# or
yarn dev
```

Go to [http://localhost:3000](http://localhost:3000) to use the app locally.

### 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 🧩 Folder Structure

```
/components       → Reusable UI components
/pages            → Next.js pages
/styles           → Tailwind + custom styles
/utils            → Helper functions and constants
/services         → API integrations (TradingView, News)
```

---

## 📈 Upcoming Features

- 🧠 **AI-powered Investment Suggestions**
- 🗂️ **User Profiles & Portfolio History**
- 🔒 **Authentication & Secure Portfolios**
- 🌍 Multi-currency & Global market support
- 💹 Dynamic asset modeling using real-time volatility

---

## 🤝 Contributing

We welcome PRs, bug reports, and feature ideas!

1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/your-feature`)  
3. Commit changes (`git commit -am 'Add feature'`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Open a Pull Request 🎉

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License © 2025 Satvik Shankar
```
