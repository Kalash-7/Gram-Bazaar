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
   GEMINI_MODEL=gemini-1.5-flash
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

## 🎯 Live Demonstration Flow for Hackathon Judges

| Step | Feature | What to Demonstrate |
| :--- | :--- | :--- |
| **1. Header & KPIs** | Live Pilot Metrics | Point out the 4 KPI counters: 12 Active Smallholders, 2,820 kg Available Stock, 2 Fulfilled Pooled Orders, and Direct Farmer Earnings (0% Platform Fee). |
| **2. Language Toggle** | Hindi ⇋ English | Click the `हिंदी / EN` button in the top right to show instant dynamic translation across all tabs and labels. |
| **3. Farmer Assistant** | Voice & NLP Chat | In Tab 1, click the quick prompt chip: *"Mere paas Mohanlalganj mein 180 kg aaloo hai, rate 18 rupaye"*. Show how the parser extracts Crop (Potato), Weight (180 kg), Cluster (Mohanlalganj), and Price (₹18), confirms with audio speech, and adds it to the live inventory feed. |
| **4. Rural Saathi** | Assisted Onboarding + OTP | In Tab 2, select *Meena Devi*, click **"Send Consent OTP to Farmer"**, observe the simulated SMS modal toast (`4829`), click **"Auto-Fill"**, and submit. Show the verified checkmark and Saathi commission ledger. |
| **5. Wholesale Matching** | Micro-Yield Aggregator | In Tab 3, click the preset **"500 kg आलू (Mohanlalganj)"**. Show the progress meter bar filling to 100%, aggregating 3 distinct smallholder farmers, displaying geographic cluster proximity, and breaking down the transparent financial split. |
| **6. Shared Logistics** | Mini-Truck Routing | Click **"Confirm Order & Shared Route"**; watch it navigate to Tab 4 showing the scheduled *Mahindra Bolero Pickup* route, driver *Pappu Yadav*, and **₹1,950 transport savings (59.1% saved)**. |
| **7. Immutable Ledger** | Cryptographic Audit | Click **"Audit"** on any transaction in the ledger table to view the full cryptographic **SHA-256 hash**, proving 0% deductions from farmers. |
| **8. Offline Simulator** | Low-Connectivity Mode | Click the green **"Online (Live)"** badge in the header to switch to **"Offline Simulator"**. Actions are queued in device `localStorage`. Switch back and click **"Sync Now"** to drain the queue. |
| **9. Reset Demo Data** | 1-Click Fresh Start | Click the **"↺ Reset Demo Data"** button in the footer to restore `database.json` to its clean initial state before the next judge arrives. |

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

## 👥 Hackathon Team Presentation Tips
- Emphasize that **no React or complex build tools** are needed — standard Vanilla HTML5/CSS3/JS with Python Flask makes the prototype extremely lightweight, accessible, and fast to run on rural low-bandwidth devices.
- Highlight the **0% farmer commission** model: traditional commission agents (Arhatiyas) charge 6–10% from farmers; Gram Bazaar charges 0% to farmers and takes a modest 3% buyer convenience fee, from which 1.5% funds rural grassroots employment for Rural Saathis.
