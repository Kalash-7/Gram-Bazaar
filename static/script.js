/**
 * Gram Bazaar (ग्राम बाज़ार) - Client-Side Controller
 * Lucknow Micro-Yield Aggregation & Zero-Literacy Community Facilitator PWA
 */

window.gramBazaar = {
  currentLang: "en", // Default to clean English, toggleable to pure Hindi
  isSimulatedOffline: false,
  state: null,
  currentMatch: null,
  recognition: null,
  isRecording: false
};

// ---------------------------------------------------------------------------
// 1. COMPREHENSIVE BILINGUAL LOCALIZATION DICTIONARY (STRICT PURE SEPARATION)
// ---------------------------------------------------------------------------
const I18N_STRINGS = {
  en: {
    brand_name: "Gram Bazaar",
    lucknow_pilot: "Lucknow Pilot",
    brand_tagline: "Micro-Yield Aggregation & Fair Trade Agricultural Platform",
    net_online: "Live Online",
    net_offline: "Offline Simulator",
    lang_toggle_btn: "🌐 हिंदी",
    reset_btn: "Reset Demo Data",
    offline_mode_active: "Offline Mode Active:",
    offline_items_queued: "requests queued on device.",
    sync_now_btn: "Sync with Server",
    home_pilot_tag: "🌾 Lucknow District Digital Agro-Mandi Pilot • 0% Farmer Commission",
    home_main_title: "Gram Bazaar",
    home_welcome_desc: "Direct farmer-to-buyer trade powered by micro-yield pooling & 0% commission.",
    notice_bold: "Hypothetical Data Disclaimer:",
    notice_body: "All 12 smallholder farmers, 4 Rural Saathis, crop market rates, vehicle registration (UP 32 BN 8412), and cryptographic SHA-256 receipts displayed are simulated demonstration data for the Lucknow Agri-Cluster pilot (Mohanlalganj, Malihabad, Bakshi Ka Talab, Kakori, Gosainganj). In production, this integrates directly with state Mandi councils and Self-Help Group (SHG) networks.",
    
    badge_farmer: "0% Commission",
    card_farmer_title: "Farmer",
    card_farmer_sub: "Voice & Chat Harvest Assistant",
    card_farmer_desc: "List your harvest via voice or chat. Local units translated automatically with 0% commission.",
    f_feat_1: "🎙️ Bilingual Voice Recognition (Speech-to-Text)",
    f_feat_2: "⚡ Hybrid AI & Offline Local Parser",
    f_feat_3: "💰 100% Payout Directly to Farmer (Zero Fee)",
    btn_enter_farmer: "Enter Farmer Portal ➔",

    badge_saathi: "1.5% Incentive",
    card_saathi_title: "Admin / Rural Saathi",
    card_saathi_sub: "Community Facilitator Hub",
    card_saathi_desc: "Onboard smartphone-less farmers with 2-step SMS OTP consent & earn 1.5% facilitation incentive.",
    s_feat_1: "📲 Two-Step SMS OTP Consent Verification",
    s_feat_2: "👩‍🌾 Self-Help Group & FPO Facilitator Registry",
    s_feat_3: "💵 1.5% Community Facilitation Incentive",
    btn_enter_saathi: "Enter Saathi Portal ➔",

    badge_buyer: "Micro-Yield Pooling",
    card_buyer_title: "Wholesale Buyer",
    card_buyer_sub: "Bulk Demand & Matching Engine",
    card_buyer_desc: "Procure bulk produce pooled dynamically from smallholder harvests across Lucknow clusters.",
    b_feat_1: "⚖️ Micro-Yield Pooling (200kg + 150kg + 150kg)",
    b_feat_2: "📍 Cluster Proximity Routing for Lowest Freight",
    b_feat_3: "⚡ Graceful Partial Fulfillment & Open Demand",
    btn_enter_buyer: "Enter Buyer Portal ➔",

    badge_transporter: "60% Savings",
    card_transporter_title: "Transporter & Logistics",
    card_transporter_sub: "Shared Routes & Immutable Ledger",
    card_transporter_desc: "Shared mini-truck routes saving ~60% freight cost with SHA-256 cryptographic audit receipts.",
    t_feat_1: "🗺️ Mahindra Bolero Shared Pickup Timeline",
    t_feat_2: "📉 ₹1,950 Transport Savings + Lower Carbon Footprint",
    t_feat_3: "🔒 Immutable SHA-256 Ledger Audit Receipt",
    btn_enter_transporter: "Enter Transporter Portal ➔",

    live_pilot_stats_title: "📊 Lucknow Pilot Live Statistics",
    live_sim_badge: "⚠️ Simulated Live Data",
    kpi_farmers: "Active Farmers",
    kpi_farmers_sub: "5 Lucknow Clusters",
    kpi_volume: "Available Produce Volume",
    kpi_volume_sub: "Potato, Tomato, Onion, Wheat",
    kpi_orders: "Consolidated Orders Fulfilled",
    kpi_orders_sub: "Shared Mini-Truck Routes",
    kpi_earnings: "Direct Farmer Payout",
    kpi_earnings_sub: "0% Commission (Zero Fee)",

    clusters_title: "📍 5 Active Agricultural Clusters in Lucknow District",
    clusters_badge: "Pilot Clusters",
    cluster_1: "🥔 Mohanlalganj • Potato & Green Vegetables",
    cluster_2: "🥭 Malihabad • Dasheri Mango & Tomato",
    cluster_3: "🌾 Bakshi Ka Talab • Wheat & Potato",
    cluster_4: "🧅 Kakori • Onion & Seasonal Vegetables",
    cluster_5: "🌱 Gosainganj • Grains & Pulses",

    back_to_home: "Back to Home Dashboard",
    page_demo_badge: "⚠️ Demonstration Pilot Data",
    current_role_farmer: "👨‍🌾 Farmer Assistant Portal",
    current_role_saathi: "🤝 Admin & Rural Saathi Facilitator",
    current_role_buyer: "🛒 Wholesale Buyer Portal",
    current_role_logistics: "🚚 Transporter & Audit Ledger",

    farmer_title: "Independent Farmer: List Produce via Voice or Text",
    farmer_desc: "Speak or type in your language. Our hybrid parser extracts crop, weight, cluster, and price automatically.",
    parser_badge: "NLP Parser: Hybrid Local + Gemini",
    chat_welcome_title: "Greetings Farmer Brother! 🙏",
    chat_welcome_text: "Click the microphone or type below. Example: 'I have 180 kg potato in Mohanlalganj at rate 18 rupees'.",
    listen_audio: "Listen Audio",
    listening_prompt: "🔴 Listening to voice... Speak crop, quantity, and price",
    chat_placeholder: "e.g. I have 200 kg tomato in Bakshi Ka Talab at rate 22...",
    quick_test_chips: "⚡ Click to test quick demo phrases:",
    sim_prompts_badge: "⚠️ Simulated Demo Prompts",
    chip_1: "🥔 'List 300 kg potato in Mohanlalganj at 18 rupees'",
    chip_2: "🍅 'Malihabad 150 kg tomato 22 rupees per kg'",
    chip_3: "🧅 'Kakori 200 kg onion at 25 rupees per kg'",
    chip_4: "🌾 'Bakshi Ka Talab 500 kg wheat 28 rupees'",
    parsed_preview_title: "Last Parsed Listing Details",
    live_verified_tag: "Live Verified",
    tag_farmer: "Farmer / Provider",
    tag_cluster: "Lucknow Cluster",
    tag_crop: "Crop Type",
    tag_qty: "Available Quantity",
    tag_price: "Expected Price",
    tag_commission: "Farmer Commission",
    zero_commission_val: "0% (Zero Fee)",
    recent_listings: "📋 Live Farmer Inventory Feed",
    farmer_sim_badge: "⚠️ Simulated Farmer Dataset",
    tbl_farmer: "Farmer",
    tbl_cluster: "Cluster",
    tbl_crop: "Crop",
    tbl_stock: "Stock (kg)",
    tbl_rate: "Rate (₹/kg)",
    tbl_type: "Channel",

    saathi_title: "Rural Saathi: Zero-Literacy Assisted Onboarding + OTP Consent",
    saathi_desc: "Onboard smartphone-less farmers through local community facilitators (SHG/FPO). Dual-path mobile OTP ensures verified consent & 1.5% facilitator gig incentive.",
    saathi_gig_incentive_badge: "1.5% Saathi Gig Incentive",
    lbl_saathi_selector: "Select Rural Saathi Facilitator",
    lbl_farmer_name: "Farmer Full Name",
    ph_farmer_name: "e.g. Ramesh Verma",
    lbl_farmer_phone: "Mobile Number (Consent SMS)",
    ph_farmer_phone: "10-digit mobile number",
    lbl_cluster: "Lucknow Cluster / Tehsil",
    lbl_crop_name: "Crop Name",
    ph_crop_name: "e.g. Potato, Tomato, Onion, Wheat",
    lbl_quantity: "Yield Quantity & Unit",
    ph_quantity: "e.g. 250",
    lbl_expected_price: "Expected Price (₹ per kg)",
    otp_section_title: "📲 Two-Step Mobile OTP Consent Verification",
    sim_otp_demo_badge: "⚠️ Simulated Demo Consent OTP: 4829",
    otp_section_desc: "Consent SMS is dispatched to the farmer's mobile to guarantee verified identity before any crop is listed.",
    btn_send_otp: "Send Consent OTP to Farmer",
    ph_enter_otp: "4-Digit OTP",
    auto_fill_btn: "⚡ Auto-Fill",
    btn_verify_onboard: "✓ Verify OTP & Onboard Farmer",
    saathi_track_record: "🏆 Rural Saathi Performance & Commission Ledger",
    tbl_saathi_name: "Saathi Name",
    tbl_saathi_role: "Role / Organization",
    tbl_saathi_cluster: "Cluster",
    tbl_assisted_count: "Farmers Assisted",
    tbl_earned_comm: "Earned Commission (1.5%)",
    tbl_saathi_status: "Status",

    buyer_title: "Wholesale Buyer: Bulk Demand & Micro-Yield Aggregation Engine",
    buyer_desc: "Submit bulk orders. Our algorithm pools micro-yields from smallholder farmers in the nearest Lucknow village cluster.",
    buyer_engine_badge: "Cluster-Proximity Micro-Yield Engine",
    lbl_buyer_crop: "Required Crop",
    lbl_buyer_volume: "Total Volume Needed (kg)",
    lbl_buyer_cluster: "Cluster Preference",
    lbl_buyer_budget: "Max Budget (₹ per kg)",
    btn_run_engine: "⚡ Run Micro-Yield Aggregator",
    preset_scenarios: "⚡ Quick Demo Scenarios for Judges:",
    sim_demand_badge: "⚠️ Simulated Bulk Demand",
    matching_status_badge: "⚡ Aggregation Results",
    sim_aggregator_badge: "⚠️ Simulated Aggregator Model",
    matching_banner_default: "Search demand using the form above or click a quick demo scenario.",
    no_batch_selected: "No active batch selected.",
    matched_farmers_title: "👥 Aggregated Smallholder Micro-Yields:",
    fin_farmer_payout: "Direct Farmer Payout (0% Commission):",
    fin_saathi_incentive: "Rural Saathi Incentive (1.5% from platform fee):",
    fin_platform_fee: "Buyer Convenience Platform Fee (3%):",
    fin_buyer_total: "Buyer Total Invoice:",
    btn_confirm_dispatch: "🚚 Confirm Order & Shared Pickup Route",
    btn_open_demand: "📌 Save Remaining as Open Demand",

    logistics_title: "Shared Mini-Truck Routing & Transparent Immutable Ledger",
    logistics_desc: "Consolidated multi-farmer pickups save ~60% transport cost compared to individual tempos. Every payout is verified by SHA-256 cryptographic proof.",
    logistics_badge: "Zero Farmer Commission | SHA-256 Audit",
    truck_route_title: "🗺️ Shared Pickup Route & Driver Details",
    sim_vehicle_badge: "⚠️ Simulated Vehicle Data",
    logistics_engine_badge: "Logistics Optimization Engine",
    pooled_savings_title: "Total Transport Cost Savings",
    pooled_savings_desc: "Comparing multiple individual farmer tempos vs our consolidated mini-truck pickup:",
    savings_stat_line: "59.1% freight savings + 14.8 kg CO₂ reduction 🌱",
    indiv_tempo_cost: "Individual Tempos Estimated Cost:",
    pooled_truck_cost: "Gram Bazaar Pooled Pickup:",
    destination_hub: "Final Terminal:",
    destination_hub_name: "Dubagga / Sitapur Road Wholesale Mandi",
    ledger_table_title: "📜 100% Transparent Immutable Audit Ledger",
    crypto_test_badge: "🔒 Cryptographic SHA-256 Test Hashes",
    audit_note: "🔒 Every transaction is secured with an immutable SHA-256 hash. Zero commission deducted from farmers.",
    th_txn_id: "Order ID & Time",
    th_buyer: "Wholesale Buyer",
    th_crop_vol: "Crop & Weight",
    th_farmer_payout: "Farmer Payout (0% fee)",
    th_saathi_cut: "Saathi Commission (1.5%)",
    th_hash: "SHA-256 Hash",
    th_action: "Audit",

    sms_modal_header: "📱 Simulated Farmer SMS (Live Consent Demo)",
    sms_copy_autofill: "⚡ Auto-Fill OTP",
    audit_modal_title: "Audit Receipt & SHA-256 Cryptographic Verification",
    footer_text_1: "Lucknow District Micro-Yield Agritech Pilot.",
    footer_text_2: "Built with Python Flask, Vanilla JS/CSS PWA, and Zero-Commission Fair Trade Architecture."
  },

  hi: {
    brand_name: "ग्राम बाज़ार",
    lucknow_pilot: "लखनऊ पायलट",
    brand_tagline: "सूक्ष्म-उपज समूहीकरण एवं निष्पक्ष कृषि व्यापार मंच",
    net_online: "ऑनलाइन (सक्रिय)",
    net_offline: "ऑफ़लाइन सिम्युलेटर",
    lang_toggle_btn: "🌐 English",
    reset_btn: "रीसेट डेमो डेटा",
    offline_mode_active: "ऑफ़लाइन मोड सक्रिय:",
    offline_items_queued: "अनुरोध डिवाइस पर सुरक्षित हैं।",
    sync_now_btn: "सर्वर पर सिंक करें",
    home_pilot_tag: "🌾 लखनऊ जिला डिजिटल कृषि मंडी पायलट • 0% किसान कमीशन",
    home_main_title: "ग्राम बाज़ार",
    home_welcome_desc: "सूक्ष्म-उपज समूहीकरण और 0% कमीशन पर आधारित सीधा कृषि व्यापार।",
    notice_bold: "प्रायोगिक डेटा स्पष्टीकरण:",
    notice_body: "इस प्रोटोटाइप में प्रदर्शित सभी 12 किसान, 4 ग्रामीण साथी, मंडी भाव, वाहन नंबर (UP 32 BN 8412) एवं क्रिप्टोग्राफिक SHA-256 रसीदें लखनऊ कृषि पायलट (मोहनलालगंज, मलिहाबाद, बख्शी का तालाब, काकोरी, गोसाईंगंज) के लिए सिम्युलेटेड प्रदर्शन डेटा हैं। वास्तविक तैनाती में यह राज्य मंडी परिषद एवं स्वयं सहायता समूह (SHG) नेटवर्क से एकीकृत होता है।",

    badge_farmer: "0% कमीशन",
    card_farmer_title: "किसान",
    card_farmer_sub: "आवाज़ एवं चैट फसल सहायक",
    card_farmer_desc: "बोलकर या लिखकर उपज दर्ज करें। स्थानीय इकाइयों का स्वतः अनुवाद और 0% किसान कमीशन।",
    f_feat_1: "🎙️ द्विभाषी आवाज़ पहचान (स्पीच-टू-टेक्स्ट)",
    f_feat_2: "⚡ हाइब्रिड एआई एवं ऑफलाइन लोकल पार्सर",
    f_feat_3: "💰 100% भुगतान सीधे किसान को (शून्य कटौती)",
    btn_enter_farmer: "किसान पोर्टल खोलें ➔",

    badge_saathi: "1.5% प्रोत्साहन",
    card_saathi_title: "प्रशासक / ग्रामीण साथी",
    card_saathi_sub: "सामुदायिक सुविधा केंद्र",
    card_saathi_desc: "2-चरणीय SMS OTP द्वारा किसानों को ऑनबोर्ड करें और 1.5% सुविधा प्रोत्साहन कमाएं।",
    s_feat_1: "📲 2-चरणीय मोबाइल SMS OTP सहमति सत्यापन",
    s_feat_2: "👩‍🌾 स्वयं सहायता समूह एवं FPO सुविधा रिकॉर्ड",
    s_feat_3: "💵 1.5% सामुदायिक सुविधा प्रोत्साहन कमीशन",
    btn_enter_saathi: "साथी पोर्टल खोलें ➔",

    badge_buyer: "उपज समूहीकरण",
    card_buyer_title: "थोक खरीदार",
    card_buyer_sub: "थोक मांग एवं मिलान इंजन",
    card_buyer_desc: "लखनऊ क्लस्टर के छोटे किसानों से सीधे जुड़ी ताज़ी फसल की थोक खरीद करें।",
    b_feat_1: "⚖️ सूक्ष्म-उपज समूहीकरण (200kg + 150kg + 150kg)",
    b_feat_2: "📍 क्लस्टर-निकटता आधार पर न्यूनतम भाड़ा",
    b_feat_3: "⚡ सुचारू आंशिक पूर्ति प्रबंधन एवं खुली मांग",
    btn_enter_buyer: "खरीदार पोर्टल खोलें ➔",

    badge_transporter: "60% भाड़ा बचत",
    card_transporter_title: "परिवहन एवं लॉजिस्टिक्स",
    card_transporter_sub: "शेयर्ड मिनी-ट्रक रूट व बहीखाता",
    card_transporter_desc: "साझा मिनी-ट्रक रूट से ~60% भाड़ा बचत और SHA-256 क्रिप्टोग्राफिक ऑडिट रसीदें।",
    t_feat_1: "🗺️ महिन्द्रा बोलेरो साझा पिकअप समय-सारिणी",
    t_feat_2: "📉 ₹1,950 परिवहन बचत एवं कार्बन कटौती",
    t_feat_3: "🔒 अपरिवर्तनीय SHA-256 बहीखाता ऑडिट रसीद",
    btn_enter_transporter: "परिवहन पोर्टल खोलें ➔",

    live_pilot_stats_title: "📊 लखनऊ पायलट लाइव सांख्यिकी",
    live_sim_badge: "⚠️ प्रायोगिक सिमुलेशन डेटा",
    kpi_farmers: "सक्रिय किसान",
    kpi_farmers_sub: "5 लखनऊ क्लस्टर्स",
    kpi_volume: "उपलब्ध उपज मात्रा",
    kpi_volume_sub: "आलू, टमाटर, प्याज़, गेहूं",
    kpi_orders: "पूरे किए गए पूल्ड ऑर्डर्स",
    kpi_orders_sub: "शेयर्ड मिनी-ट्रक रूट",
    kpi_earnings: "किसानों को सीधा भुगतान",
    kpi_earnings_sub: "0% किसान कमीशन (शून्य कटौती)",

    clusters_title: "📍 लखनऊ जिले के 5 सक्रिय कृषि क्लस्टर्स",
    clusters_badge: "पायलट क्लस्टर्स",
    cluster_1: "🥔 मोहनलालगंज • आलू एवं हरी सब्जियां",
    cluster_2: "🥭 मलिहाबाद • दशहरी आम एवं टमाटर",
    cluster_3: "🌾 बख्शी का तालाब • गेहूं एवं आलू",
    cluster_4: "🧅 काकोरी • प्याज़ एवं मौसमी सब्जियां",
    cluster_5: "🌱 गोसाईंगंज • अनाज एवं दलहन",

    back_to_home: "मुख्य पृष्ठ पर वापस जाएं",
    page_demo_badge: "⚠️ प्रायोगिक प्रदर्शन डेटा",
    current_role_farmer: "👨‍🌾 किसान सहायक पोर्टल",
    current_role_saathi: "🤝 प्रशासक एवं ग्रामीण साथी सुविधा केंद्र",
    current_role_buyer: "🛒 थोक खरीदार पोर्टल",
    current_role_logistics: "🚚 परिवहन एवं ऑडिट बहीखाता",

    farmer_title: "स्वतंत्र किसान: आवाज़ या लिखकर फसल दर्ज करें",
    farmer_desc: "अपनी भाषा में बोलें या लिखें। हमारा हाइब्रिड पार्सर फसल, वज़न, क्लस्टर और भाव स्वतः पहचान लेता है।",
    parser_badge: "एनएलपी पार्सर: हाइब्रिड लोकल + जेमिनी",
    chat_welcome_title: "राम-राम किसान भाई! 🙏",
    chat_welcome_text: "माइक बटन दबाकर बोलें या नीचे लिखें। उदाहरण: 'मेरे पास मोहनलालगंज में 180 किलो आलू है, भाव 18 रुपये'।",
    listen_audio: "ऑडियो सुनें",
    listening_prompt: "🔴 आवाज़ सुन रहे हैं... अपनी फसल, मात्रा और भाव बोलें",
    chat_placeholder: "उदा. मेरे पास बख्शी का तालाब में 200 किलो टमाटर है भाव 22...",
    quick_test_chips: "⚡ तुरंत टेस्ट करने के लिए क्लिक करें:",
    sim_prompts_badge: "⚠️ प्रायोगिक टेस्ट संकेत",
    chip_1: "🥔 'मोहनलालगंज में 300 किलो आलू ₹18 में बेचना है'",
    chip_2: "🍅 'मलिहाबाद में 150 किलो टमाटर ₹22 प्रति किलो'",
    chip_3: "🧅 'काकोरी में 200 किलो प्याज़ ₹25 प्रति किलो'",
    chip_4: "🌾 'बख्शी का तालाब 500 किलो गेहूं ₹28'",
    parsed_preview_title: "अंतिम पार्स किया गया विवरण",
    live_verified_tag: "लाइव सत्यापित",
    tag_farmer: "किसान / प्रदाता",
    tag_cluster: "लखनऊ क्लस्टर",
    tag_crop: "फसल का प्रकार",
    tag_qty: "उपलब्ध मात्रा",
    tag_price: "अपेक्षित मूल्य",
    tag_commission: "किसान कमीशन",
    zero_commission_val: "0% (शून्य कटौती)",
    recent_listings: "📋 हाल ही में दर्ज किसान इन्वेंटरी",
    farmer_sim_badge: "⚠️ प्रायोगिक किसान डेटा",
    tbl_farmer: "किसान",
    tbl_cluster: "क्लस्टर",
    tbl_crop: "फसल",
    tbl_stock: "स्टॉक (किलो)",
    tbl_rate: "भाव (₹/किलो)",
    tbl_type: "माध्यम",

    saathi_title: "ग्रामीण साथी: शून्य-साक्षरता सहायता एवं OTP सहमति पोर्टल",
    saathi_desc: "स्मार्टफोन विहीन छोटे किसानों को स्थानीय साथी (SHG/FPO) द्वारा ऑनबोर्ड करें। 2-चरणीय मोबाइल OTP से सहमति की कानूनी पुष्टि और 1.5% सुविधा प्रोत्साहन सुनिश्चित होता है।",
    saathi_gig_incentive_badge: "1.5% साथी सुविधा प्रोत्साहन",
    lbl_saathi_selector: "ग्रामीण साथी का चयन करें",
    lbl_farmer_name: "किसान का पूरा नाम",
    ph_farmer_name: "उदा. रमेश वर्मा",
    lbl_farmer_phone: "मोबाइल नंबर (सहमति SMS)",
    ph_farmer_phone: "10 अंकों का मोबाइल नंबर",
    lbl_cluster: "लखनऊ क्लस्टर / तहसील",
    lbl_crop_name: "फसल का नाम",
    ph_crop_name: "उदा. आलू, टमाटर, प्याज़, गेहूं",
    lbl_quantity: "उपज मात्रा एवं इकाई",
    ph_quantity: "उदा. 250",
    lbl_expected_price: "अपेक्षित मूल्य (₹ प्रति किलो)",
    otp_section_title: "📲 2-चरणीय मोबाइल OTP सहमति सत्यापन",
    sim_otp_demo_badge: "⚠️ प्रायोगिक डेमो सहमति OTP: 4829",
    otp_section_desc: "किसान के फोन पर सहमति SMS भेजा जाता है ताकि बिना अनुमति कोई प्रविष्टि न हो सके।",
    btn_send_otp: "किसान को सहमति OTP भेजें",
    ph_enter_otp: "4 अंकों का OTP",
    auto_fill_btn: "⚡ स्वतः भरें",
    btn_verify_onboard: "✓ सत्यापित करें एवं किसान दर्ज करें",
    saathi_track_record: "🏆 ग्रामीण साथियों का रिकॉर्ड एवं प्रोत्साहन कमीशन",
    tbl_saathi_name: "साथी का नाम",
    tbl_saathi_role: "भूमिका / संगठन",
    tbl_saathi_cluster: "क्लस्टर",
    tbl_assisted_count: "सहायता प्राप्त किसान",
    tbl_earned_comm: "कुल अर्जित कमीशन (1.5%)",
    tbl_saathi_status: "स्थिति",

    buyer_title: "थोक खरीदार: थोक मांग एवं सूक्ष्म-उपज समूहीकरण इंजन",
    buyer_desc: "बड़े ऑर्डर दर्ज करें। हमारा एल्गोरिदम निकटतम लखनऊ क्लस्टर के छोटे किसानों की उपज को स्वतः जोड़कर ऑर्डर पूरा करता है।",
    buyer_engine_badge: "क्लस्टर-निकटता सूक्ष्म-उपज इंजन",
    lbl_buyer_crop: "मांग वाली फसल",
    lbl_buyer_volume: "आवश्यक कुल मात्रा (किलो)",
    lbl_buyer_cluster: "प्राथमिकता क्लस्टर",
    lbl_buyer_budget: "अधिकतम बजट (₹ प्रति किलो)",
    btn_run_engine: "⚡ सूक्ष्म-उपज समूहीकरण चलाएं",
    preset_scenarios: "⚡ निर्णायक दल के लिए त्वरित डेमो परिदृश्य:",
    sim_demand_badge: "⚠️ प्रायोगिक थोक मांग",
    matching_status_badge: "⚡ समूहीकरण परिणाम",
    sim_aggregator_badge: "⚠️ प्रायोगिक पूलिंग मॉडल",
    matching_banner_default: "ऊपर दिए गए फॉर्म से मांग खोजें या त्वरित डेमो परिदृश्य पर क्लिक करें।",
    no_batch_selected: "कोई सक्रिय बैच नहीं चुना गया।",
    matched_farmers_title: "👥 योगदान देने वाले सूक्ष्म-किसान:",
    fin_farmer_payout: "सीधे किसानों को भुगतान (0% कटौती):",
    fin_saathi_incentive: "ग्रामीण साथी प्रोत्साहन (1.5% मंच शुल्क से):",
    fin_platform_fee: "खरीदार सुविधा मंच शुल्क (3%):",
    fin_buyer_total: "खरीदार का कुल चालान:",
    btn_confirm_dispatch: "🚚 ऑर्डर एवं शेयर्ड ट्रक रूट पक्का करें",
    btn_open_demand: "📌 शेष मात्रा को खुली मांग बनाएं",

    logistics_title: "शेयर्ड मिनी-ट्रक रूट एवं पारदर्शी अपरिवर्तनीय बहीखाता",
    logistics_desc: "एकल टेंपो यात्राओं के बजाय समूहीकृत स्थानीय पिकअप से परिवहन लागत में 60% बचत। प्रत्येक भुगतान का SHA-256 अपरिवर्तनीय प्रमाण।",
    logistics_badge: "0% किसान कमीशन | SHA-256 ऑडिट",
    truck_route_title: "🗺️ शेयर्ड पिकअप रूट व ड्राइवर विवरण",
    sim_vehicle_badge: "⚠️ प्रायोगिक वाहन डेटा",
    logistics_engine_badge: "लॉजिस्टिक्स अनुकूलन इंजन",
    pooled_savings_title: "सामूहिक परिवहन से कुल बचत",
    pooled_savings_desc: "यदि प्रत्येक छोटा किसान अलग टेंपो बुक करता बनाम हमारा संयुक्त मिनी-ट्रक पूलिंग:",
    savings_stat_line: "59.1% परिवहन भाड़ा बचत + 14.8 किलो CO₂ उत्सर्जन में कमी 🌱",
    indiv_tempo_cost: "अलग-अलग टेंपो अनुमानित लागत:",
    pooled_truck_cost: "ग्राम बाज़ार शेयर्ड पिकअप:",
    destination_hub: "अंतिम गंतव्य:",
    destination_hub_name: "दुबग्गा / सीतापुर रोड नवीन मंडी",
    ledger_table_title: "📜 100% पारदर्शी अपरिवर्तनीय बहीखाता",
    crypto_test_badge: "🔒 क्रिप्टोग्राफिक SHA-256 टेस्ट हैश",
    audit_note: "🔒 प्रत्येक लेनदेन SHA-256 हैश से सुरक्षित है। किसान से शून्य कमीशन।",
    th_txn_id: "ऑर्डर ID व समय",
    th_buyer: "थोक खरीदार",
    th_crop_vol: "फसल व कुल भार",
    th_farmer_payout: "किसान भुगतान (0% शुल्क)",
    th_saathi_cut: "साथी कमीशन (1.5%)",
    th_hash: "SHA-256 हैश",
    th_action: "ऑडिट",

    sms_modal_header: "📱 सिम्युलेटेड किसान SMS (सहमति प्रदर्शन)",
    sms_copy_autofill: "⚡ OTP स्वतः भरें",
    audit_modal_title: "रसीद एवं SHA-256 क्रिप्टोग्राफिक सत्यापन",
    footer_text_1: "लखनऊ जिला सूक्ष्म-उपज कृषि-तकनीक पायलट।",
    footer_text_2: "पायथन फ्लास्क, वैनिला जावास्क्रिप्ट/सीएसएस पीडबल्यूए और शून्य-कमीशन निष्पक्ष व्यापार संरचना।"
  }
};

// ---------------------------------------------------------------------------
// 2. INITIALIZATION & SERVICE WORKER SETUP
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("[Gram Bazaar] Initializing Progressive Web App...");

  // Register Service Worker for offline asset caching
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => {
        console.log("[Service Worker] Registered with scope:", reg.scope);
        reg.update();
      })
      .catch((err) => console.warn("[Service Worker] Registration failed:", err));
  }

  // Setup tab navigation switching
  setupTabNavigation();

  // Setup Web Speech API for voice recognition
  setupSpeechRecognition();

  // Setup UI event buttons
  setupEventListeners();

  // Apply initial language translation (clean English by default)
  applyLanguage(window.gramBazaar.currentLang);

  // Fetch initial system state from backend
  fetchSystemState();

  // Check if any items are in offline queue from previous sessions
  updateOfflineBanner();
});


// ---------------------------------------------------------------------------
// 3. TAB NAVIGATION
// ---------------------------------------------------------------------------
window.gramBazaar.navigateTo = function (targetId) {
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabPanes.forEach((p) => {
    if (p.id === targetId) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

function setupTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      window.gramBazaar.navigateTo(targetId);
    });
  });
}


// ---------------------------------------------------------------------------
// 4. WEB SPEECH API (VOICE-TO-TEXT & TEXT-TO-SPEECH)
// ---------------------------------------------------------------------------
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById("voice-mic-btn");
  const listeningIndicator = document.getElementById("listening-indicator");
  const chatInput = document.getElementById("chat-input");

  if (!SpeechRecognition) {
    if (micBtn) {
      micBtn.title = "Voice input is not supported in this browser";
      micBtn.style.opacity = "0.6";
    }
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    window.gramBazaar.isRecording = true;
    if (micBtn) micBtn.classList.add("listening");
    if (listeningIndicator) listeningIndicator.style.display = "block";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (chatInput) chatInput.value = transcript;
    window.gramBazaar.handleChatSubmit();
  };

  recognition.onerror = (event) => {
    console.warn("[Speech Recognition Error]", event.error);
    stopRecording();
  };

  recognition.onend = () => {
    stopRecording();
  };

  function stopRecording() {
    window.gramBazaar.isRecording = false;
    if (micBtn) micBtn.classList.remove("listening");
    if (listeningIndicator) listeningIndicator.style.display = "none";
  }

  if (micBtn) {
    micBtn.addEventListener("click", () => {
      if (window.gramBazaar.isRecording) {
        recognition.stop();
      } else {
        recognition.lang = window.gramBazaar.currentLang === "hi" ? "hi-IN" : "en-IN";
        try {
          recognition.start();
        } catch (e) {
          console.warn("[Speech recognition start error]", e);
        }
      }
    });
  }

  window.gramBazaar.recognition = recognition;
}

window.gramBazaar.speakText = function (text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = window.gramBazaar.currentLang === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
};


// ---------------------------------------------------------------------------
// 5. EVENT LISTENERS & LANGUAGE SWITCHING
// ---------------------------------------------------------------------------
function setupEventListeners() {
  // Toggle simulated offline network mode
  const netBtn = document.getElementById("net-toggle-btn");
  if (netBtn) {
    netBtn.addEventListener("click", () => {
      window.gramBazaar.isSimulatedOffline = !window.gramBazaar.isSimulatedOffline;
      updateNetworkBadge();
      updateOfflineBanner();
    });
  }

  // Toggle language between English and Hindi
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const nextLang = window.gramBazaar.currentLang === "hi" ? "en" : "hi";
      applyLanguage(nextLang);
    });
  }

  // Reset demo state button
  const resetBtn = document.getElementById("reset-demo-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      window.gramBazaar.resetDatabase();
    });
  }

  // Sync now button in banner
  const syncBtn = document.getElementById("sync-now-btn");
  if (syncBtn) {
    syncBtn.addEventListener("click", () => {
      syncOfflineQueue();
    });
  }
}

function updateNetworkBadge() {
  const netBtn = document.getElementById("net-toggle-btn");
  const netText = document.getElementById("net-status-text");
  const isOffline = window.gramBazaar.isSimulatedOffline;
  const isHi = window.gramBazaar.currentLang === "hi";

  if (isOffline) {
    netBtn.classList.add("offline-active");
    netText.innerText = isHi ? "ऑफ़लाइन सिम्युलेटर" : "Offline Simulator";
  } else {
    netBtn.classList.remove("offline-active");
    netText.innerText = isHi ? "ऑनलाइन (सक्रिय)" : "Live Online";
  }
}

/**
 * Updates UI strings dynamically across elements with data-i18n, data-i18n-ph,
 * select dropdown options, scenario cards, and driver info.
 */
function applyLanguage(lang) {
  window.gramBazaar.currentLang = lang;
  document.documentElement.lang = lang;

  const isHi = lang === "hi";
  document.title = isHi
    ? "ग्राम बाज़ार - लखनऊ सूक्ष्म-उपज समूहीकरण मंच"
    : "Gram Bazaar - Lucknow Micro-Yield Aggregation PWA";

  const currentLangText = document.getElementById("current-lang-text");
  if (currentLangText) {
    currentLangText.innerText = isHi ? "🌐 English" : "🌐 हिंदी";
  }

  const dict = I18N_STRINGS[lang] || I18N_STRINGS.en;

  // 1. Text elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  // 2. Placeholder attributes
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // 3. Update select options dynamically
  updateSelectOptions(isHi);

  // 4. Update Scenario Buttons
  updateScenarioButtons(isHi);

  // 5. Update Driver Box
  const driverText = document.getElementById("logistics-driver-text");
  const vehicleText = document.getElementById("logistics-vehicle-text");
  if (driverText) {
    driverText.innerHTML = isHi
      ? "<strong>चालक:</strong> पप्पू यादव (+91 94150 99823)"
      : "<strong>Driver:</strong> Pappu Yadav (+91 94150 99823)";
  }
  if (vehicleText) {
    vehicleText.innerHTML = isHi
      ? "<strong>वाहन:</strong> महिन्द्रा बोलेरो पिकअप"
      : "<strong>Vehicle:</strong> Mahindra Bolero Pickup";
  }

  updateNetworkBadge();

  // If state is already loaded, re-render tables to apply localized labels
  if (window.gramBazaar.state) {
    renderKPIs(window.gramBazaar.state.kpi);
    renderFarmerTable(window.gramBazaar.state.farmers);
    renderSaathiTable(window.gramBazaar.state.saathis);
    renderLedgerTable(window.gramBazaar.state.transactions);
    if (window.gramBazaar.state.transactions.length > 0) {
      renderLogisticsTimeline(window.gramBazaar.state.transactions[0]);
    }
  }

  updateParsedCard({
    farmer_name: "Ram Prasad Maurya",
    cluster: "Mohanlalganj",
    crop: "Potato",
    quantity_kg: 180,
    expected_price_per_kg: 18.0
  });

  if (window.gramBazaar.currentMatch) {
    renderMatchResults(window.gramBazaar.currentMatch);
  }
}

function updateSelectOptions(isHi) {
  // Saathi facilitator selector
  const saathiSelect = document.getElementById("saathi-select");
  if (saathiSelect) {
    const prevVal = saathiSelect.value;
    saathiSelect.innerHTML = isHi ? `
      <option value="STH-LKO-01|Meena Devi">मीना देवी - स्वयं सहायता समूह प्रमुख, मोहनलालगंज (+91 94150 88219)</option>
      <option value="STH-LKO-02|Ramesh Verma">रमेश वर्मा - एफपीओ समन्वयक, मलिहाबाद (+91 98392 41052)</option>
      <option value="STH-LKO-03|Sunita Yadav">सुनीता यादव - ग्राम प्रेरक, बख्शी का तालाब (+91 91255 33091)</option>
      <option value="STH-LKO-04|Abdul Qadir">अब्दुल कादिर - कृषि सखा, काकोरी (+91 97920 64811)</option>
    ` : `
      <option value="STH-LKO-01|Meena Devi">Meena Devi - SHG Cluster Lead, Mohanlalganj (+91 94150 88219)</option>
      <option value="STH-LKO-02|Ramesh Verma">Ramesh Verma - FPO Coordinator, Malihabad (+91 98392 41052)</option>
      <option value="STH-LKO-03|Sunita Yadav">Sunita Yadav - Village Motivator, Bakshi Ka Talab (+91 91255 33091)</option>
      <option value="STH-LKO-04|Abdul Qadir">Abdul Qadir - Krishi Sakha, Kakori (+91 97920 64811)</option>
    `;
    if (prevVal) saathiSelect.value = prevVal;
  }

  // Saathi cluster selector
  const saathiCluster = document.getElementById("saathi-cluster-select");
  if (saathiCluster) {
    const prevVal = saathiCluster.value;
    saathiCluster.innerHTML = isHi ? `
      <option value="Mohanlalganj">मोहनलालगंज</option>
      <option value="Malihabad">मलिहाबाद</option>
      <option value="Bakshi Ka Talab (BKT)">बख्शी का तालाब</option>
      <option value="Kakori">काकोरी</option>
      <option value="Gosainganj">गोसाईंगंज</option>
      <option value="Chinhat">चिनहट</option>
      <option value="Sarojini Nagar">सरोजिनी नगर</option>
    ` : `
      <option value="Mohanlalganj">Mohanlalganj</option>
      <option value="Malihabad">Malihabad</option>
      <option value="Bakshi Ka Talab (BKT)">Bakshi Ka Talab (BKT)</option>
      <option value="Kakori">Kakori</option>
      <option value="Gosainganj">Gosainganj</option>
      <option value="Chinhat">Chinhat</option>
      <option value="Sarojini Nagar">Sarojini Nagar</option>
    `;
    if (prevVal) saathiCluster.value = prevVal;
  }

  // Saathi unit selector
  const saathiUnit = document.getElementById("saathi-unit");
  if (saathiUnit) {
    const prevVal = saathiUnit.value;
    saathiUnit.innerHTML = isHi ? `
      <option value="kg">किलोग्राम (किग्रा)</option>
      <option value="quintal">कुंतल (100 किग्रा)</option>
      <option value="mann">मन (40 किग्रा)</option>
      <option value="bori">बोरी (50 किग्रा)</option>
    ` : `
      <option value="kg">kg</option>
      <option value="quintal">Quintal (100 kg)</option>
      <option value="mann">Maund (40 kg)</option>
      <option value="bori">Sack (50 kg)</option>
    `;
    if (prevVal) saathiUnit.value = prevVal;
  }

  // Buyer crop select
  const buyerCrop = document.getElementById("buyer-crop-select");
  if (buyerCrop) {
    const prevVal = buyerCrop.value;
    buyerCrop.innerHTML = isHi ? `
      <option value="potato">आलू</option>
      <option value="tomato">टमाटर</option>
      <option value="onion">प्याज़</option>
      <option value="wheat">गेहूं</option>
    ` : `
      <option value="potato">Potato</option>
      <option value="tomato">Tomato</option>
      <option value="onion">Onion</option>
      <option value="wheat">Wheat</option>
    `;
    if (prevVal) buyerCrop.value = prevVal;
  }

  // Buyer cluster filter
  const buyerCluster = document.getElementById("buyer-cluster-filter");
  if (buyerCluster) {
    const prevVal = buyerCluster.value;
    buyerCluster.innerHTML = isHi ? `
      <option value="All Lucknow">सभी लखनऊ क्लस्टर्स (निकटता आधार)</option>
      <option value="Mohanlalganj">मोहनलालगंज</option>
      <option value="Bakshi Ka Talab (BKT)">बख्शी का तालाब</option>
      <option value="Malihabad">मलिहाबाद</option>
      <option value="Kakori">काकोरी</option>
      <option value="Gosainganj">गोसाईंगंज</option>
    ` : `
      <option value="All Lucknow">All Lucknow Clusters (Smart Proximity)</option>
      <option value="Mohanlalganj">Mohanlalganj</option>
      <option value="Bakshi Ka Talab (BKT)">Bakshi Ka Talab (BKT)</option>
      <option value="Malihabad">Malihabad</option>
      <option value="Kakori">Kakori</option>
      <option value="Gosainganj">Gosainganj</option>
    `;
    if (prevVal) buyerCluster.value = prevVal;
  }
}

function updateScenarioButtons(isHi) {
  const s1 = document.getElementById("scenario-1-content");
  const s2 = document.getElementById("scenario-2-content");
  const s3 = document.getElementById("scenario-3-content");

  if (s1) {
    s1.innerHTML = isHi
      ? `🥔 <strong>500 किलो आलू (मोहनलालगंज)</strong><br><small>3 स्थानीय किसानों का सटीक मिलान</small>`
      : `🥔 <strong>500 kg Potato (Mohanlalganj)</strong><br><small>Exact match of 3 local smallholders</small>`;
  }
  if (s2) {
    s2.innerHTML = isHi
      ? `🍅 <strong>350 किलो टमाटर (लखनऊ हब)</strong><br><small>बख्शी का तालाब + मलिहाबाद + काकोरी पूलिंग</small>`
      : `🍅 <strong>350 kg Tomato (Lucknow Hub)</strong><br><small>BKT + Malihabad + Kakori Pooling</small>`;
  }
  if (s3) {
    s3.innerHTML = isHi
      ? `🧅 <strong>1,500 किलो उच्च मांग</strong><br><small>सुचारू आंशिक पूर्ति प्रबंधन (उपलब्ध स्टॉक)</small>`
      : `🧅 <strong>1,500 kg High Demand</strong><br><small>Graceful Partial Match (Available Stock)</small>`;
  }
}


// ---------------------------------------------------------------------------
// 6. API CALLS & STATE MANAGEMENT
// ---------------------------------------------------------------------------
async function fetchSystemState() {
  try {
    const res = await fetch("/api/state");
    const data = await res.json();
    if (data.status === "success" || data.status === "offline") {
      window.gramBazaar.state = data;
      localStorage.setItem("gram_bazaar_cached_state", JSON.stringify(data));

      renderKPIs(data.kpi);
      renderFarmerTable(data.farmers);
      renderSaathiTable(data.saathis);
      renderLedgerTable(data.transactions);

      if (data.transactions && data.transactions.length > 0) {
        renderLogisticsTimeline(data.transactions[0]);
      }

      // Update Parser status badge dynamically
      const parserBadge = document.getElementById("parser-badge-type");
      if (parserBadge) {
        const isHi = window.gramBazaar.currentLang === "hi";
        if (data.gemini_configured) {
          const modelName = data.gemini_model || "gemini-1.5-flash";
          parserBadge.innerHTML = `✨ Gemini Active (${modelName})`;
          parserBadge.style.background = "linear-gradient(135deg, #4338ca, #6366f1)";
          parserBadge.style.color = "#ffffff";
          parserBadge.style.boxShadow = "0 2px 8px rgba(99, 102, 241, 0.35)";
          parserBadge.title = `Gemini NLP active with ${modelName}`;
        } else {
          parserBadge.innerText = isHi ? "स्थानीय पार्सर (ऑफलाइन बैकअप)" : "Local Regex (Offline Backup)";
          parserBadge.style.background = "";
          parserBadge.style.color = "";
          parserBadge.style.boxShadow = "";
          parserBadge.title = "Add GEMINI_API_KEY in .env to enable Gemini LLM";
        }
      }
    }
  } catch (err) {
    console.warn("[Gram Bazaar] Backend offline, loading cached state from localStorage", err);
    const cached = localStorage.getItem("gram_bazaar_cached_state");
    if (cached) {
      const data = JSON.parse(cached);
      window.gramBazaar.state = data;
      renderKPIs(data.kpi);
      renderFarmerTable(data.farmers);
      renderSaathiTable(data.saathis);
      renderLedgerTable(data.transactions);
    }
  }
}

function renderKPIs(kpi) {
  if (!kpi) return;
  const isHi = window.gramBazaar.currentLang === "hi";
  const volUnit = isHi ? "किलो" : "kg";
  document.getElementById("kpi-active-farmers").innerText = kpi.active_farmers || 12;
  document.getElementById("kpi-volume").innerHTML = `${kpi.available_volume_kg || 0} <small style="font-size:0.8rem">${volUnit}</small>`;
  document.getElementById("kpi-fulfilled-orders").innerText = kpi.orders_fulfilled || 0;
  document.getElementById("kpi-farmer-earnings").innerText = `₹${(kpi.farmer_earnings_inr || 0).toLocaleString("en-IN")}`;
}

const CROP_LOCALIZATIONS = {
  Potato: { en: "Potato", hi: "आलू" },
  Tomato: { en: "Tomato", hi: "टमाटर" },
  Onion: { en: "Onion", hi: "प्याज़" },
  Wheat: { en: "Wheat", hi: "गेहूं" },
  "Dasheri Mango": { en: "Dasheri Mango", hi: "दशहरी आम" }
};

function getLocalizedCrop(crop) {
  const isHi = window.gramBazaar.currentLang === "hi";
  for (const [k, v] of Object.entries(CROP_LOCALIZATIONS)) {
    if (crop.toLowerCase().includes(k.toLowerCase()) || (v.hi && crop.includes(v.hi))) {
      return isHi ? v.hi : v.en;
    }
  }
  return crop;
}

const CLUSTER_LOCALIZATIONS = {
  "Mohanlalganj": { en: "Mohanlalganj", hi: "मोहनलालगंज" },
  "Malihabad": { en: "Malihabad", hi: "मलिहाबाद" },
  "Bakshi Ka Talab (BKT)": { en: "Bakshi Ka Talab (BKT)", hi: "बख्शी का तालाब" },
  "Bakshi Ka Talab": { en: "Bakshi Ka Talab", hi: "बख्शी का तालाब" },
  "Kakori": { en: "Kakori", hi: "काकोरी" },
  "Gosainganj": { en: "Gosainganj", hi: "गोसाईंगंज" },
  "Chinhat": { en: "Chinhat", hi: "चिनहट" },
  "Sarojini Nagar": { en: "Sarojini Nagar", hi: "सरोजिनी नगर" }
};

function getLocalizedCluster(cluster) {
  const isHi = window.gramBazaar.currentLang === "hi";
  for (const [k, v] of Object.entries(CLUSTER_LOCALIZATIONS)) {
    if (cluster && cluster.toLowerCase().includes(k.toLowerCase())) {
      return isHi ? v.hi : v.en;
    }
  }
  return cluster;
}

const DESIGNATION_LOCALIZATIONS = {
  "SHG Cluster Lead": { en: "SHG Cluster Lead", hi: "स्वयं सहायता समूह प्रमुख" },
  "FPO Coordinator": { en: "FPO Coordinator", hi: "एफपीओ समन्वयक" },
  "Village Motivator": { en: "Village Motivator", hi: "ग्राम प्रेरक" },
  "Krishi Sakha": { en: "Krishi Sakha", hi: "कृषि सखा" }
};

function getLocalizedDesignation(desig) {
  const isHi = window.gramBazaar.currentLang === "hi";
  for (const [k, v] of Object.entries(DESIGNATION_LOCALIZATIONS)) {
    if (desig && desig.toLowerCase().includes(k.toLowerCase())) {
      return isHi ? v.hi : v.en;
    }
  }
  return desig;
}

const SAATHI_LOCALIZATIONS = {
  "Meena Devi": { en: "Meena Devi", hi: "मीना देवी" },
  "Ramesh Verma": { en: "Ramesh Verma", hi: "रमेश वर्मा" },
  "Sunita Yadav": { en: "Sunita Yadav", hi: "सुनीता यादव" },
  "Abdul Qadir": { en: "Abdul Qadir", hi: "अब्दुल कादिर" },
  "Independent Voice": { en: "Independent Voice", hi: "स्वतंत्र आवाज़ सहायक" }
};

function getLocalizedSaathiName(name) {
  const isHi = window.gramBazaar.currentLang === "hi";
  for (const [k, v] of Object.entries(SAATHI_LOCALIZATIONS)) {
    if (name && name.toLowerCase().includes(k.toLowerCase())) {
      return isHi ? v.hi : v.en;
    }
  }
  return name;
}

function renderFarmerTable(farmers) {
  const tbody = document.getElementById("farmer-live-table-body");
  if (!tbody || !farmers) return;

  const isHi = window.gramBazaar.currentLang === "hi";
  tbody.innerHTML = "";
  farmers.slice(0, 8).forEach((f) => {
    const tr = document.createElement("tr");
    const cropDisplay = getLocalizedCrop(f.crop);
    const badgeColor = f.quantity_kg > 0 ? "background:#dcfce7; color:#166534;" : "background:#fee2e2; color:#991b1b;";
    const qtyText = isHi ? `${f.quantity_kg} किलो` : `${f.quantity_kg} kg`;

    let channelText = f.onboard_type || "Voice AI Assistant";
    if (channelText.includes("Voice") || channelText.includes("Chat")) {
      channelText = isHi ? "आवाज़ सहायक" : "Voice AI Assistant";
    } else if (channelText.includes("Saathi") || channelText.includes("SHG")) {
      channelText = isHi ? "ग्रामीण साथी सहायता" : "Rural Saathi Assisted";
    }

    tr.innerHTML = `
      <td><strong>${f.name}</strong><br><small style="color:#64748b;">${f.id}</small></td>
      <td>${getLocalizedCluster(f.cluster)}</td>
      <td><strong>${cropDisplay}</strong></td>
      <td><span class="brand-badge" style="${badgeColor}">${qtyText}</span></td>
      <td><strong>₹${f.price_per_kg}</strong></td>
      <td><small style="color:#16a34a; font-weight:700;">${channelText}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderSaathiTable(saathis) {
  const tbody = document.getElementById("saathi-summary-table-body");
  if (!tbody || !saathis) return;

  const isHi = window.gramBazaar.currentLang === "hi";
  tbody.innerHTML = "";
  saathis.forEach((s) => {
    const tr = document.createElement("tr");
    const assistedLabel = isHi ? `${s.total_assisted} किसान सहायता प्राप्त` : `${s.total_assisted} Farmers Assisted`;
    const statusLabel = isHi ? "सक्रिय" : "Active";

    tr.innerHTML = `
      <td><strong>${s.name}</strong><br><small style="color:#64748b;">${s.id}</small></td>
      <td>${getLocalizedDesignation(s.designation)}</td>
      <td>${getLocalizedCluster(s.cluster)}</td>
      <td><strong>${assistedLabel}</strong></td>
      <td><strong style="color:var(--primary-700);">₹${(s.total_commission_earned || 0).toFixed(2)}</strong></td>
      <td><span class="brand-badge" style="background:#dcfce7; color:#14532d;">${statusLabel}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderLedgerTable(transactions) {
  const tbody = document.getElementById("immutable-ledger-body");
  if (!tbody || !transactions) return;

  const isHi = window.gramBazaar.currentLang === "hi";
  tbody.innerHTML = "";
  transactions.forEach((t) => {
    const tr = document.createElement("tr");
    const formattedDate = new Date(t.timestamp).toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
    const cropDisplay = getLocalizedCrop(t.crop);
    const weightLabel = isHi ? `${cropDisplay} (${t.total_kg} किलो)` : `${cropDisplay} (${t.total_kg} kg)`;
    const auditBtnText = isHi ? "🔍 ऑडिट जांच" : "🔍 Audit";
    const buyerName = isHi ? "अवध थोक मार्ट (सीतापुर रोड मंडी)" : (t.buyer_name || "Awadh Wholesale Mart");

    tr.innerHTML = `
      <td><strong>${t.order_id}</strong><br><small style="color:#64748b;">${formattedDate}</small></td>
      <td><strong>${buyerName}</strong></td>
      <td>${weightLabel}</td>
      <td><strong style="color:var(--primary-700);">₹${(t.farmer_payout_total || 0).toLocaleString("en-IN")}</strong></td>
      <td>₹${(t.saathi_commissions_total || 0).toFixed(2)}</td>
      <td><span class="hash-pill" title="${t.immutable_hash}">${t.immutable_hash}</span></td>
      <td>
        <button type="button" class="audit-verify-btn" onclick="window.gramBazaar.openAuditModal('${t.order_id}')">
          ${auditBtnText}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderLogisticsTimeline(latestTxn) {
  const container = document.getElementById("route-timeline-container");
  if (!container || !latestTxn || !latestTxn.logistics) return;

  const log = latestTxn.logistics;
  const stops = log.route_stops || [];
  const isHi = window.gramBazaar.currentLang === "hi";

  document.getElementById("metric-saved-rupees").innerText = `₹${log.saved_cost || 1950}`;
  document.getElementById("metric-indiv-cost").innerText = `₹${log.individual_tempo_cost || 3300}`;
  document.getElementById("metric-pooled-cost").innerText = `₹${log.pooled_transport_cost || 1350}`;
  document.getElementById("driver-badge").innerText = log.vehicle || "UP 32 BN 8412";

  container.innerHTML = "";
  stops.forEach((stop, idx) => {
    const isLast = idx === stops.length - 1;
    const stepDiv = document.createElement("div");
    stepDiv.className = `timeline-step ${isLast ? "destination" : ""}`;
    
    let actionDesc = stop.action;
    if (isHi) {
      if (idx === 0) actionDesc = "राम प्रसाद व रामेश्वर सिंह से संयुक्त पिकअप";
      else if (idx === 1) actionDesc = "2 किसानों से द्वितीयक उपज समूहीकरण";
      else actionDesc = "सीतापुर रोड नवीन मंडी पर सीधा अनलोडिंग";
    }

    const stepNumText = isHi ? (isLast ? "लक्ष्य" : `स्टॉप ${idx + 1}`) : stop.stop_num;
    const etaText = isHi ? `🕒 अनुमानित समय: ${stop.eta}` : `🕒 ETA: ${stop.eta}`;

    stepDiv.innerHTML = `
      <div class="step-marker">${stepNumText}</div>
      <div class="step-content">
        <div class="step-location">${getLocalizedCluster(stop.location)}</div>
        <div class="step-desc">${actionDesc}</div>
        <div class="step-eta">${etaText}</div>
      </div>
    `;
    container.appendChild(stepDiv);
  });
}


// ---------------------------------------------------------------------------
// 7. FEATURE A: FARMER CHAT & VOICE ONBOARDING
// ---------------------------------------------------------------------------
window.gramBazaar.fillChatChip = function (chipNum) {
  const isHi = window.gramBazaar.currentLang === "hi";
  let promptText = "";
  if (chipNum === 1) {
    promptText = isHi ? "मोहनलालगंज में 300 किलो आलू 18 रुपये में बेचना है" : "I have 300 kg potato in Mohanlalganj at rate 18 rupees";
  } else if (chipNum === 2) {
    promptText = isHi ? "मलिहाबाद में 150 किलो टमाटर भाव 22 रुपये प्रति किलो" : "I have 150 kg tomato in Malihabad at rate 22 per kg";
  } else if (chipNum === 3) {
    promptText = isHi ? "काकोरी गांव से 200 किलो प्याज़ बेचना है भाव 25 रुपये" : "List 200 kg onion in Kakori at 25 rupees per kg";
  } else if (chipNum === 4) {
    promptText = isHi ? "बख्शी का तालाब 500 किलो गेहूं भाव 28 रुपये" : "I have 500 kg wheat in Bakshi Ka Talab at rate 28";
  }

  const input = document.getElementById("chat-input");
  if (input) {
    input.value = promptText;
    window.gramBazaar.handleChatSubmit();
  }
};

window.gramBazaar.handleChatSubmit = async function () {
  const input = document.getElementById("chat-input");
  const message = input ? input.value.trim() : "";
  if (!message) return;

  input.value = "";
  appendChatBubble("user", message);

  if (window.gramBazaar.isSimulatedOffline) {
    handleOfflineChatListing(message);
    return;
  }

  try {
    const res = await fetch("/api/chat-onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });
    const data = await res.json();

    if (data.success) {
      const responseText = window.gramBazaar.currentLang === "hi" ? data.message_hi : data.message;
      appendChatBubble("bot", responseText);

      updateParsedCard(data.parsed);
      fetchSystemState();
    } else {
      appendChatBubble("bot", window.gramBazaar.currentLang === "hi"
        ? "क्षमा करें, संदेश समझने में त्रुटि हुई। कृपया दोबारा प्रयास करें।"
        : "Sorry, could not parse the listing. Please specify crop, weight, and price.");
    }
  } catch (err) {
    console.warn("[Chat Submit Offline Fallback]", err);
    handleOfflineChatListing(message);
  }
};

function appendChatBubble(sender, text) {
  const history = document.getElementById("chat-history-box");
  if (!history) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;

  if (sender === "bot") {
    const listenLabel = window.gramBazaar.currentLang === "hi" ? "ऑडियो सुनें" : "Listen Audio";
    bubble.innerHTML = `
      <p>${text}</p>
      <div class="chat-bubble-speaker" onclick="window.gramBazaar.speakText(this.previousElementSibling.innerText)">
        🔊 <span>${listenLabel}</span>
      </div>
    `;
  } else {
    bubble.innerText = text;
  }

  history.appendChild(bubble);
  history.scrollTop = history.scrollHeight;
}

function updateParsedCard(parsed) {
  if (!parsed) return;
  const isHi = window.gramBazaar.currentLang === "hi";

  const price = parsed.expected_price_per_kg != null ? parsed.expected_price_per_kg : (parsed.price_per_kg || 18.0);
  const cluster = parsed.cluster || parsed.village_cluster || "Mohanlalganj";

  document.getElementById("tag-farmer-name").innerText = parsed.farmer_name || "Ram Prasad Maurya";
  document.getElementById("tag-cluster").innerText = getLocalizedCluster(cluster);
  document.getElementById("tag-crop").innerText = getLocalizedCrop(parsed.crop || "Potato");
  document.getElementById("tag-qty").innerText = isHi ? `${parsed.quantity_kg} किलो` : `${parsed.quantity_kg} kg`;
  document.getElementById("tag-price").innerText = isHi ? `₹${price} / किलो` : `₹${price} / kg`;

  const tagCommission = document.getElementById("tag-commission-val");
  if (tagCommission) {
    tagCommission.innerText = isHi ? "0% (शून्य कटौती)" : "0% (Zero Fee)";
  }
  const parsedSourceTag = document.getElementById("parsed-source-tag");
  if (parsedSourceTag) {
    if (parsed.parser_type && parsed.parser_type.includes("Gemini")) {
      parsedSourceTag.innerHTML = `✨ ${parsed.parser_type}`;
      parsedSourceTag.style.background = "linear-gradient(135deg, #4338ca, #6366f1)";
      parsedSourceTag.style.color = "#ffffff";
    } else {
      parsedSourceTag.innerText = isHi ? "स्थानीय पार्सर" : "Local Regex";
      parsedSourceTag.style.background = "";
      parsedSourceTag.style.color = "";
    }
  }
}

function handleOfflineChatListing(message) {
  const offlineParsed = {
    farmer_name: "Ram Prasad Maurya (Offline)",
    cluster: "Mohanlalganj",
    crop: "Potato",
    quantity_kg: 200,
    expected_price_per_kg: 18.0
  };

  addToOfflineQueue({
    type: "chat_onboard",
    payload: { message: message },
    timestamp: new Date().toISOString()
  });

  const isHi = window.gramBazaar.currentLang === "hi";
  const reply = isHi
    ? "🌾 [ऑफ़लाइन मोड]: आपकी उपज डिवाइस पर सुरक्षित कर ली गई है। इंटरनेट जुड़ते ही लखनऊ मंडी से कनेक्ट हो जाएगी!"
    : "🌾 [Offline Mode]: Harvest listing queued locally on device. Will sync to Lucknow mandi once reconnected!";

  appendChatBubble("bot", reply);
  updateParsedCard(offlineParsed);
}


// ---------------------------------------------------------------------------
// 8. FEATURE B: RURAL SAATHI FACILITATOR ONBOARDING & OTP CONSENT
// ---------------------------------------------------------------------------
window.gramBazaar.triggerConsentOTP = function () {
  const farmerName = document.getElementById("saathi-farmer-name").value.trim() || "Farmer";
  const farmerPhone = document.getElementById("saathi-farmer-phone").value.trim() || "+91 98380 54321";
  const isHi = window.gramBazaar.currentLang === "hi";

  const modal = document.getElementById("simulated-sms-modal");
  const content = document.getElementById("sms-body-content");

  if (content) {
    content.innerText = isHi
      ? `📩 [सिम्युलेटेड SMS ${farmerPhone} को]: नमस्ते ${farmerName}! ग्राम बाज़ार में फसल दर्ज करने के लिए आपका सहमति OTP 4829 है। किसानों से 0% कमीशन।`
      : `📩 [Simulated SMS to ${farmerPhone}]: Hello ${farmerName}! Your Gram Bazaar crop listing consent OTP is: 4829. 0% farmer commission guaranteed.`;
  }

  if (modal) {
    modal.classList.add("show");
    setTimeout(() => {
      modal.classList.remove("show");
    }, 12000);
  }
};

window.gramBazaar.autoFillDemoOTP = function () {
  const input = document.getElementById("entered-otp-input");
  if (input) input.value = "4829";

  const modal = document.getElementById("simulated-sms-modal");
  if (modal) modal.classList.remove("show");
};

window.gramBazaar.submitSaathiOnboard = async function () {
  const saathiVal = document.getElementById("saathi-select").value.split("|");
  const saathiId = saathiVal[0];
  const saathiName = saathiVal[1] || "Meena Devi";
  const farmerName = document.getElementById("saathi-farmer-name").value.trim();
  const farmerPhone = document.getElementById("saathi-farmer-phone").value.trim();
  const cluster = document.getElementById("saathi-cluster-select").value;
  const crop = document.getElementById("saathi-crop-name").value.trim();
  const qty = parseFloat(document.getElementById("saathi-quantity").value);
  const unit = document.getElementById("saathi-unit").value;
  const price = parseFloat(document.getElementById("saathi-price").value);
  const otp = document.getElementById("entered-otp-input").value.trim();
  const isHi = window.gramBazaar.currentLang === "hi";

  if (!otp) {
    alert(isHi ? "कृपया 4 अंकों का सहमति OTP दर्ज करें।" : "Please enter the 4-digit consent OTP.");
    return;
  }

  const payload = {
    saathi_id: saathiId,
    saathi_name: saathiName,
    farmer_name: farmerName,
    farmer_phone: farmerPhone,
    cluster: cluster,
    crop: crop,
    quantity: qty,
    unit: unit,
    expected_price_per_kg: price,
    consent_otp: otp
  };

  if (window.gramBazaar.isSimulatedOffline) {
    addToOfflineQueue({
      type: "saathi_onboard",
      payload: payload,
      timestamp: new Date().toISOString()
    });
    alert(isHi
      ? `🌾 [ऑफ़लाइन मोड]: ${farmerName} का विवरण OTP सहमति के साथ सुरक्षित हो गया!`
      : `🌾 [Offline Mode]: ${farmerName} onboarded and queued with OTP consent!`);
    resetSaathiForm();
    return;
  }

  try {
    const res = await fetch("/api/saathi-onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      alert(isHi
        ? `🎉 बधाई! ${farmerName} का विवरण OTP सहमति के साथ सफलतापूर्वक दर्ज हुआ।`
        : `🎉 Success! ${farmerName} verified & onboarded with OTP consent.`);
      resetSaathiForm();
      fetchSystemState();
    } else {
      alert(data.error || "Onboarding failed");
    }
  } catch (err) {
    console.warn("[Saathi Onboard Network Error]", err);
    addToOfflineQueue({
      type: "saathi_onboard",
      payload: payload,
      timestamp: new Date().toISOString()
    });
    alert(isHi ? "नेटवर्क त्रुटि। ऑफ़लाइन कतार में सुरक्षित किया गया।" : "Network error. Saved to offline queue!");
    resetSaathiForm();
  }
};

function resetSaathiForm() {
  document.getElementById("saathi-farmer-name").value = "";
  document.getElementById("saathi-farmer-phone").value = "";
  document.getElementById("saathi-crop-name").value = "";
  document.getElementById("saathi-quantity").value = "";
  document.getElementById("entered-otp-input").value = "";
}


// ---------------------------------------------------------------------------
// 9. FEATURE C: WHOLESALE BUYER & MICRO-YIELD AGGREGATION ENGINE
// ---------------------------------------------------------------------------
window.gramBazaar.triggerPresetScenario = function (crop, qty, cluster) {
  document.getElementById("buyer-crop-select").value = crop;
  document.getElementById("buyer-qty-input").value = qty;
  document.getElementById("buyer-cluster-filter").value = cluster;
  window.gramBazaar.executeDemandMatching();
};

window.gramBazaar.executeDemandMatching = async function () {
  const crop = document.getElementById("buyer-crop-select").value;
  const requestedKg = parseFloat(document.getElementById("buyer-qty-input").value);
  const cluster = document.getElementById("buyer-cluster-filter").value;
  const maxBudget = parseFloat(document.getElementById("buyer-max-budget").value) || 999;

  try {
    const res = await fetch("/api/match-demand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crop: crop,
        requested_kg: requestedKg,
        target_cluster: cluster,
        max_budget_per_kg: maxBudget
      })
    });
    const match = await res.json();
    if (match.success) {
      window.gramBazaar.currentMatch = match;
      renderMatchResults(match);
    }
  } catch (err) {
    console.error("[Matching Engine Error]", err);
  }
};

function renderMatchResults(match) {
  const fillBar = document.getElementById("meter-fill-bar");
  const percentText = document.getElementById("meter-percentage-text");
  const banner = document.getElementById("matching-summary-banner");
  const list = document.getElementById("matched-farmers-list");
  const finCard = document.getElementById("financial-summary-card");
  const actionRow = document.getElementById("matching-action-buttons");
  const saveDemandBtn = document.getElementById("save-open-demand-btn");
  const isHi = window.gramBazaar.currentLang === "hi";

  const pct = Math.min(100, Math.round((match.accumulated_kg / match.requested_kg) * 100));
  fillBar.style.width = `${pct}%`;
  percentText.innerText = isHi
    ? `${pct}% (${match.accumulated_kg} / ${match.requested_kg} किलो)`
    : `${pct}% (${match.accumulated_kg} / ${match.requested_kg} kg)`;

  if (match.is_fulfilled) {
    fillBar.className = "meter-fill";
    banner.style.background = "#dcfce7";
    banner.style.color = "#14532d";
    banner.innerHTML = isHi
      ? `✅ <strong>100% आपूर्ति उपलब्ध:</strong> ${match.matched_batches.length} स्थानीय किसानों की फसल सफलतापूर्वक समूहीकृत!`
      : `✅ <strong>100% Volume Fulfilled:</strong> Successfully aggregated harvests from ${match.matched_batches.length} local smallholders!`;
    if (saveDemandBtn) saveDemandBtn.style.display = "none";
  } else {
    fillBar.className = "meter-fill partial";
    banner.style.background = "#fef3c7";
    banner.style.color = "#92400e";
    banner.innerHTML = isHi
      ? `⚠️ <strong>आंशिक आपूर्ति उपलब्ध:</strong> ${match.accumulated_kg} किलो मिला (${match.shortfall_kg} किलो शेष)। आप आंशिक ऑर्डर बुक कर सकते हैं।`
      : `⚠️ <strong>Partial Supply Available:</strong> Found ${match.accumulated_kg} kg (${match.shortfall_kg} kg remaining). You can confirm partial dispatch.`;
    if (saveDemandBtn) saveDemandBtn.style.display = "inline-block";
  }

  list.innerHTML = "";
  if (match.matched_batches.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:20px; color:#dc2626;">${isHi ? "दिए गए बजट और फसल के अनुसार कोई किसान उपलब्ध नहीं है।" : "No farmers currently available matching the crop and budget criteria."}</div>`;
  } else {
    match.matched_batches.forEach((b) => {
      const card = document.createElement("div");
      card.className = "matched-farmer-card";
      const facilitatorLabel = isHi ? `साथी: ${getLocalizedSaathiName(b.saathi_name)}` : `Facilitator: ${b.saathi_name}`;
      const unitText = isHi ? "किलो" : "kg";
      card.innerHTML = `
        <div>
          <div class="farmer-meta-name">${b.farmer_name}</div>
          <div class="farmer-meta-cluster">📍 ${getLocalizedCluster(b.cluster)} • ₹${b.rate}/${unitText} • ${facilitatorLabel}</div>
        </div>
        <div style="text-align:right;">
          <div class="farmer-contribution-pill">${b.contributed_kg} ${unitText}</div>
          <div style="font-size:0.85rem; font-weight:800; color:#15803d; margin-top:2px;">₹${b.subtotal.toFixed(2)}</div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  const fin = match.financials;
  document.getElementById("fin-farmer-total").innerText = `₹${fin.farmer_payout_total.toLocaleString("en-IN")}`;
  document.getElementById("fin-saathi-total").innerText = `₹${fin.saathi_commissions_total.toFixed(2)}`;
  document.getElementById("fin-platform-fee").innerText = `₹${fin.platform_fee_3pct.toFixed(2)}`;
  document.getElementById("fin-buyer-invoice").innerText = `₹${fin.buyer_invoice_total.toLocaleString("en-IN")}`;

  finCard.style.display = "block";
  actionRow.style.display = "flex";
}

window.gramBazaar.confirmCurrentOrder = async function () {
  if (!window.gramBazaar.currentMatch) return;
  const isHi = window.gramBazaar.currentLang === "hi";

  const payload = {
    buyer_name: "Awadh Wholesale Mart (Sitapur Road Mandi)",
    match_result: window.gramBazaar.currentMatch
  };

  if (window.gramBazaar.isSimulatedOffline) {
    addToOfflineQueue({
      type: "confirm_order",
      payload: payload,
      timestamp: new Date().toISOString()
    });
    alert(isHi
      ? "ऑफ़लाइन मोड: ऑर्डर सुरक्षित कर लिया गया है। ऑनलाइन आते ही डिस्पैच होगा!"
      : "Offline: Order queued. Will dispatch when back online!");
    return;
  }

  try {
    const res = await fetch("/api/confirm-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      alert(isHi
        ? `🎉 ऑर्डर सफल! शेयर्ड मिनी-ट्रक रूट तैयार हो गया है। SHA-256 हैश: ${data.transaction.immutable_hash.slice(0, 14)}...`
        : `🎉 Order Confirmed! Shared mini-truck route scheduled. SHA-256 Hash: ${data.transaction.immutable_hash.slice(0, 14)}...`);

      fetchSystemState();
      window.gramBazaar.navigateTo("tab-logistics");
    }
  } catch (err) {
    console.error("[Confirm Order Error]", err);
  }
};

window.gramBazaar.saveOpenDemand = function () {
  const isHi = window.gramBazaar.currentLang === "hi";
  alert(isHi
    ? "बचे हुए स्टॉक की खुली मांग दर्ज कर दी गई है। जैसे ही किसान फसल दर्ज करेंगे, आपको सूचित किया जाएगा।"
    : "Remaining requirement saved as open demand! You will be notified as farmers list new crops.");
};


// ---------------------------------------------------------------------------
// 10. AUDIT MODAL & CRYPTOGRAPHIC VERIFICATION
// ---------------------------------------------------------------------------
window.gramBazaar.openAuditModal = function (orderId) {
  const txns = (window.gramBazaar.state && window.gramBazaar.state.transactions) || [];
  const txn = txns.find((t) => t.order_id === orderId);
  if (!txn) return;

  const modal = document.getElementById("audit-modal");
  const body = document.getElementById("modal-body-content");
  if (!modal || !body) return;

  const isHi = window.gramBazaar.currentLang === "hi";
  const cropDisplay = getLocalizedCrop(txn.crop);

  const contributionsHtml = (txn.contributions || []).map((c) => {
    const saathiText = isHi ? `साथी: ${getLocalizedSaathiName(c.saathi_name)}` : `Saathi: ${c.saathi_name}`;
    const feeText = isHi ? "0% कटौती (₹0 शुल्क)" : "0% Fee Deduction (₹0)";
    const unitText = isHi ? "किलो" : "kg";
    return `
      <div style="background:#f8fafc; padding:12px 16px; border-radius:12px; margin-bottom:10px; display:flex; justify-content:space-between; font-size:0.9rem; border:1px solid #e2e8f0;">
        <div>
          <strong>${c.farmer_name}</strong> (${getLocalizedCluster(c.cluster)})<br>
          <small style="color:#64748b;">${c.contributed_kg} ${unitText} @ ₹${c.rate}/${unitText} • ${saathiText}</small>
        </div>
        <div style="text-align:right;">
          <strong>₹${c.subtotal.toFixed(2)}</strong><br>
          <small style="color:#15803d; font-weight:700;">${feeText}</small>
        </div>
      </div>
    `;
  }).join("");

  const buyerNameModal = isHi ? "अवध थोक मार्ट (सीतापुर रोड मंडी)" : txn.buyer_name;
  const weightTextModal = isHi ? `${txn.total_kg} किलो` : `${txn.total_kg} kg`;

  body.innerHTML = `
    <div style="background:#f0fdf4; border:1.5px solid #86efac; padding:16px; border-radius:14px; margin-bottom:20px;">
      <div style="font-size:0.75rem; color:#14532d; font-weight:800; letter-spacing:0.5px;">
        ${isHi ? "क्रिप्टोग्राफिक SHA-256 अपरिवर्तनीय रसीद" : "CRYPTOGRAPHIC SHA-256 IMMUTABLE RECEIPT"}
      </div>
      <div style="font-family:monospace; font-size:0.84rem; word-break:break-all; margin-top:6px; color:#0f391b; font-weight:600;">
        ${txn.immutable_hash}
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px; font-size:0.92rem;">
      <div><strong>${isHi ? "ऑर्डर ID:" : "Order ID:"}</strong> ${txn.order_id}</div>
      <div><strong>${isHi ? "स्थिति:" : "Status:"}</strong> <span style="color:#16a34a; font-weight:700;">${isHi ? "सत्यापित एवं पूर्ण" : "Verified & Settled"}</span></div>
      <div><strong>${isHi ? "खरीदार:" : "Buyer:"}</strong> ${buyerNameModal}</div>
      <div><strong>${isHi ? "फसल व कुल भार:" : "Crop & Volume:"}</strong> ${cropDisplay} (${weightTextModal})</div>
    </div>

    <h4 style="font-size:0.92rem; font-weight:800; margin:14px 0 8px; color:#1e293b;">
      ${isHi ? "प्रत्येक किसान को सीधा भुगतान (100% निष्पक्षता):" : "Direct Payout to Each Smallholder Farmer (100% Transparency):"}
    </h4>
    ${contributionsHtml}

    <div style="border-top:1.5px solid #e2e8f0; margin-top:16px; padding-top:12px; font-size:0.92rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${isHi ? "किसानों को कुल भुगतान (0% शुल्क):" : "Total Farmer Payout (0% fee):"}</span>
        <strong style="color:#15803d; font-size:1.0rem;">₹${txn.farmer_payout_total.toLocaleString("en-IN")}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${isHi ? "ग्रामीण साथी सुविधा प्रोत्साहन (1.5%):" : "Rural Saathi Incentive (1.5%):"}</span>
        <span>₹${(txn.saathi_commissions_total || 0).toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${isHi ? "खरीदार सुविधा शुल्क (3%):" : "Buyer Convenience Fee (3%):"}</span>
        <span>₹${(txn.platform_fee_3pct || 0).toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.1rem; margin-top:10px; padding-top:8px; border-top:1px dashed #cbd5e1;">
        <span>${isHi ? "खरीदार का अंतिम चालान:" : "Buyer Total Invoice:"}</span>
        <span style="color:#0f172a;">₹${txn.buyer_invoice_total.toLocaleString("en-IN")}</span>
      </div>
    </div>
  `;

  modal.classList.add("open");
};

window.gramBazaar.closeAuditModal = function () {
  const modal = document.getElementById("audit-modal");
  if (modal) modal.classList.remove("open");
};


// ---------------------------------------------------------------------------
// 11. OFFLINE QUEUE MANAGEMENT & SYNC
// ---------------------------------------------------------------------------
function addToOfflineQueue(item) {
  const queue = JSON.parse(localStorage.getItem("gram_bazaar_offline_queue") || "[]");
  queue.push(item);
  localStorage.setItem("gram_bazaar_offline_queue", JSON.stringify(queue));
  updateOfflineBanner();
}

function updateOfflineBanner() {
  const banner = document.getElementById("offline-sync-banner");
  const countEl = document.getElementById("offline-queue-count");
  const queue = JSON.parse(localStorage.getItem("gram_bazaar_offline_queue") || "[]");

  if (banner && countEl) {
    countEl.innerText = queue.length;
    if (window.gramBazaar.isSimulatedOffline || queue.length > 0) {
      banner.classList.add("visible");
    } else {
      banner.classList.remove("visible");
    }
  }
}

async function syncOfflineQueue() {
  const queue = JSON.parse(localStorage.getItem("gram_bazaar_offline_queue") || "[]");
  const isHi = window.gramBazaar.currentLang === "hi";

  if (queue.length === 0) {
    alert(isHi ? "ऑफ़लाइन कतार वर्तमान में खाली है।" : "Offline queue is currently empty.");
    return;
  }

  window.gramBazaar.isSimulatedOffline = false;
  updateNetworkBadge();

  let syncedCount = 0;
  for (const item of queue) {
    try {
      if (item.type === "chat_onboard") {
        await fetch("/api/chat-onboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.payload)
        });
        syncedCount++;
      } else if (item.type === "saathi_onboard") {
        await fetch("/api/saathi-onboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.payload)
        });
        syncedCount++;
      } else if (item.type === "confirm_order") {
        await fetch("/api/confirm-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.payload)
        });
        syncedCount++;
      }
    } catch (e) {
      console.warn("[Sync item error]", e);
    }
  }

  localStorage.removeItem("gram_bazaar_offline_queue");
  updateOfflineBanner();
  alert(isHi
    ? `सफलतापूर्वक ${syncedCount} ऑफ़लाइन अनुरोध सर्वर पर सिंक हो गए!`
    : `Successfully synced ${syncedCount} queued items to server!`);
  fetchSystemState();
}


// ---------------------------------------------------------------------------
// 12. DEMO RESET HELPER
// ---------------------------------------------------------------------------
window.gramBazaar.resetDatabase = async function () {
  const isHi = window.gramBazaar.currentLang === "hi";
  const confirmMsg = isHi
    ? "क्या आप निश्चित रूप से डेमो डेटा को मूल स्थिति में रीसेट करना चाहते हैं?"
    : "Are you sure you want to reset demo data back to initial clean state?";

  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch("/api/reset", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      localStorage.removeItem("gram_bazaar_offline_queue");
      updateOfflineBanner();
      alert(isHi ? "डेमो डेटा सफलतापूर्वक रीसेट हो गया!" : "Database reset successfully!");
      fetchSystemState();
    }
  } catch (err) {
    console.error("[Reset DB Error]", err);
  }
};
