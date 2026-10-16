# 💎 HIDDEN GEMS — Local City Discovery Platform

> **Explore Beyond the Ordinary**  
> Discover affordable food, quiet study corners, scenic viewpoints, waterfalls, and cultural treasures that mainstream guidebooks skip[cite: 1].

🌐 **Live Deployment**: [https://hidden-gems-one.vercel.app/](https://hidden-gems-one.vercel.app/)  
📂 **GitHub Repository**: [https://github.com/ananyayadav2/Hidden-Gems](https://github.com/ananyayadav2/Hidden-Gems)

---

## 📌 Project Overview

**HIDDEN GEMS** is an urban exploration, itinerary planning, and local discovery platform built for students, budget explorers, and cultural travelers[cite: 1]. Mainstream travel platforms often suffer from commercial bias—favoring sponsored chains and crowded tourist attractions. **HIDDEN GEMS** solves this by cataloging verified quiet study corners, public viewpoints, affordable eateries, nature trails, and heritage sites with zero or minimal entry fees, while giving local place owners a direct avenue to showcase their locations.

---

## 🚀 Key Features

### 🎒 1. Tourist / Explorer Workflow
* **Smart Day-Out Planner & Budget Guardian**:
  * Input your starting budget, available hours, and target vibe (Quiet, Lively, Any).
  * Generates an optimized 2–3 stop itinerary arranged in practical sequence with recommended visit durations.
  * **Budget Guardian**: Itemizes estimated costs into Travel, Food/Beverages, and Entry Tickets, showing the exact remaining balance and transparent editorial estimates.
* **Proximity & Geolocation Sorting**:
  * One-click "Sort by Distance (Near Me)" computes live radial distance (in kilometers) to all spots using browser geolocation and the Haversine formula.
* **Multi-Attribute Discovery**:
  * Filter spots by dynamic/unrestricted budgets (including ₹0 free places), atmosphere (*Quiet & Peaceful*, *Moderate*, *Lively & Social*), and study-friendly tags.
* **Over 100+ Curated Regional Spots**:
  * Covers Mumbai, Thane, Navi Mumbai, and weekend destinations within 200 km (Lonavala, Khandala, Karjat, Matheran, Alibaug, Igatpuri, Pune, and Nashik).
* **Smart Navigation & Quick Research**:
  * Click any place title to launch a direct Google Search in a new tab for instant image galleries and visitor articles.
  * One-click Google Maps turn-by-turn route planning.
* **Persistent Favorites & Community Upvotes**:
  * Save places into a personal collection stored securely in your profile across sessions and logouts.

---

### 💬 2. Community Feedback & Photo Uploads
* **Visitor Reviews & Ratings**: Rate places from 1 to 5 stars, leave practical visitor tips, and read advice from previous travelers.
* **Photo Attachments**: Upload photos directly with your feedback to share real-world conditions and perspectives.

---

### 🏪 3. Place Owner Workflow
* **Owner Dashboard**: Independent cafes, quiet reading rooms, nature parks, and cultural spaces can list their spots.
* **Review Queue**: Collects name, location, category, costs, ambiance, and photo submissions for community verification before going live.

---

### 🌐 4. Multilingual Engine (Bhashini Standard)
* Instant, client-side language switching across **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)** to ensure vernacular accessibility across Maharashtra[cite: 3].

---

### 🔒 5. Zero-Friction Authentication
* Direct sign-up requiring only **Full Name** and **Email ID**[cite: 15].
* Direct email-based login that instantly restores your saved favorites, profile identity, and role without passwords, OTP delays, or KYC roadblocks[cite: 15, 18].

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)[cite: 5, 12]
* **Language**: [TypeScript](https://www.typescriptlang.org/)[cite: 13]
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)[cite: 3]
* **Icons**: [Lucide React](https://lucide.dev/)[cite: 3]
* **Animations**: [Framer Motion](https://www.framer.com/motion/)[cite: 3]
* **Hosting**: [Vercel](https://vercel.com/)[cite: 12]
* **External Integrations**: Google Maps Platform URL Scheme & Google Search Query API

---

## 📂 Folder Structure

```text
hidden-gems/
├── app/
│   ├── layout.tsx             # Root layout with AuthProvider, LanguageProvider & Navbar
│   ├── page.tsx               # Homepage with hero, search, statistics & categories
│   ├── explore/
│   │   └── page.tsx           # Multi-filter explorer, distance sort & modal triggers
│   ├── owner/
│   │   └── page.tsx           # Place Owner dashboard & review submission form
│   ├── profile/
│   │   └── page.tsx           # User profile & saved favourites collection
│   └── auth/
│       ├── login/page.tsx     # Direct email sign-in (no password required)
│       └── register/page.tsx  # Name & email registration (no OTP / KYC)
├── components/
│   ├── DayOutPlanner.tsx      # Smart Day-Out Planner & Budget Guardian component
│   ├── ReviewModal.tsx        # Community reviews, tips & photo upload modal
│   ├── Navbar.tsx             # Multilingual switcher, role badge & favourites counter
│   └── SplashScreen.tsx       # Animated Diamond Gem splash screen
├── context/
│   ├── AuthContext.tsx        # Persistent user accounts, session state & favorites
│   └── LanguageContext.tsx    # Multilingual translation provider (EN, HI, MR)
├── data/
│   └── initialGems.ts         # Curated catalog of 100+ spots (Mumbai & up to 200 km)
└── types/
    └── index.ts               # Place, Review, CostBreakdown & User interfaces

💻 Getting Started Locally
Prerequisites
Make sure you have Node.js (v18+) and npm installed:

Bash
node -v
npm -v
Installation
Clone the repository:

Bash
git clone [https://github.com/ananyayadav2/Hidden-Gems.git](https://github.com/ananyayadav2/Hidden-Gems.git)
cd Hidden-Gems
Install dependencies:

Bash
npm install
Run the local development server:

Bash
npm run dev
View the application:
Open http://localhost:3000 in your browser.

🗺️ Curated Categories
Cheap Eats: Century-old Irani cafes, regional street eats, and student joints.

Study & Work Spaces: Quiet library reference halls, shaded reading gardens, and laptop spots.

Parks & Peaceful Corners: Shaded gardens, lakes, waterfalls, and nature trails.

Scenic Viewpoints: Seaside promenades, rock monoliths, and hill sunset points.

Art & Culture: Historic museums, rock-cut Buddhist caves, and street art docks.

Bookshops & Reading Corners: Rare second-hand bookstalls and bookstore coffee corners.

Local Markets & Hidden Shops: Vintage antique alleys, flower bazaars, and flea markets.

Stay & Accommodation: Budget backpacker pods, lakeside tents, and heritage stays.


📄 License
This project is developed for hackathon and educational purposes under the MIT License.


---

### How to apply it on GitHub:
1. In your GitHub browser tab, click the **pencil icon** right above the README text box on the right.
2. Press `Cmd + A` (select all) and press `Backspace` / `Delete`.
3. Paste the copied text above.
4. Click the green **"Commit changes..."** button at the top right and confirm. 

All headings, links, bullet points, and code boxes will now format cleanly.
