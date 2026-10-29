# Gram Bazaar (ग्राम बाज़ार) — Lucknow Micro-Yield Aggregation PWA

> **A low-connectivity, multilingual Progressive Web App (PWA) connecting smallholder farmers in the Lucknow district with urban wholesale buyers through micro-yield aggregation and assisted onboarding via local facilitators ("Rural Saathis").**

---

## 🌟 Key Highlights & Hackathon Innovation

1. **Micro-Yield Aggregation Engine:** Aggregates small fragmented crop yields (e.g., 200 kg + 150 kg + 150 kg = 500 kg) from smallholder farmers within the same Lucknow cluster (*Mohanlalganj, Malihabad, Bakshi Ka Talab, Kakori, Gosainganj*) into standardized wholesale batches.
2. **Zero-Literacy & Smartphone-less Farmer Inclusion:**
   - **Independent Voice/Chat Onboarding:** Bilingual Web Speech API (Hindi `hi-IN` & English `en-IN`) with a hybrid NLP parser (Gemini API with robust offline Python regex/dictionary fallback).
   - **Rural Saathi Facilitator Portal:** Community facilitators (SHG women, FPO leads) onboard farmers with a **Dual-Path Simulated SMS OTP** consent workflow.
3. **100% Transparent Financial Split:**
   - **0% Farmer Commission:** Farmers receive 100% of their quoted crop price.
   - **3% Buyer Convenience Fee:** Nominal markup added to urban wholesale buyer invoices.
   - **1.5% Rural Saathi Micro-Commission:** Automatically credited to the local facilitator from the platform fee for every assisted batch.
4. **Shared Mini-Truck Routing:** Consolidates multi-farmer pickups into a single mini-truck loop (*Mahindra Bolero Pickup*), saving **~60% in transport freight** and reducing vehicular carbon emissions.
5. **Cryptographic SHA-256 Immutable Ledger:** Every fulfilled batch generates an unalterable SHA-256 receipt hash for auditability.
6. **Low-Connectivity PWA Architecture:** Works offline via Service Worker (`sw.js`) and stores offline actions in a `localStorage` queue with dynamic sync. Includes an interactive **Network Status Simulator** button to demonstrate offline queueing live to judges!

---

## 📂 Project Structure

```text
gram-bazaar/
├── app.py                  # Flask backend server, REST API endpoints, NLP parser & Matching Engine
├── database.json           # Pre-seeded realistic Lucknow cluster dataset (auto-updated on new inputs)
├── requirements.txt        # Flask & optional google-generativeai dependencies
├── README.md               # Student presentation guide & system documentation
└── static/
    ├── index.html          # Single-page responsive PWA with Role Switcher & Multilingual UI
    ├── style.css           # Modern agricultural design theme (Lush Greens, Turmeric Gold, Terracotta)
    ├── script.js           # Frontend logic, Web Speech API (Voice), Offline Sync, Aggregation Visualizer
    ├── manifest.json       # PWA configuration for mobile installation
    ├── sw.js               # Service Worker for asset caching & offline fallback
    ├── icon-192.png        # 192x192 PWA app icon
    └── icon-512.png        # 512x512 PWA app icon
```

---

## 🚀 Quick Start Guide

### 1. Requirements
- Python 3.10+ (tested on Python 3.12)
- Flask (`pip install -r requirements.txt`)

### 2. Run Locally
### 2. Configure Gemini API for NLP (Recommended)
1. Copy or edit the `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-3.5-flash
   ```
   *(Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey))*
2. Verify your Gemini key connectivity anytime:
   Visit **[http://127.0.0.1:5000/api/test-gemini](http://127.0.0.1:5000/api/test-gemini)**
3. *(Note: If no API key is provided, the platform automatically runs on its built-in offline Regex & Dictionary NLP parser with zero downtime).*

### 3. Run Locally
```bash
python app.py
```
Open **[http://127.0.0.1:5000](http://127.0.0.1:5000)** in Google Chrome or any modern browser.

---


## 🏛️ REST API Documentation

- `GET /api/state`: Returns live ecosystem state, KPIs, inventory summary, farmers, transactions, and saathis.
- `POST /api/chat-onboard`: Accepts `{ message: string }`, extracts crop details, saves farmer listing, and returns conversational response.
- `POST /api/send-otp`: Generates a 4-digit consent OTP and simulated SMS preview.
- `POST /api/saathi-onboard`: Onboards smartphone-less farmer assisted by a Rural Saathi with OTP verification.
- `POST /api/match-demand`: Micro-yield aggregation algorithm matching farmers by crop, volume, and cluster proximity.
- `POST /api/confirm-order`: Finalizes matched order, deducts inventory, generates SHA-256 hash, and logs transaction.
- `POST /api/reset`: Resets `database.json` to initial pre-seeded pilot dataset.

---


