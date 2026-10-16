💎 HIDDEN GEMS — Local City Discovery PlatformExplore Beyond the OrdinaryDiscover affordable food, quiet study corners, viewpoints, and cultural treasures that mainstream guidebooks skip.   🌐 Live Deployment: https://hidden-gems-one.vercel.app/📂 GitHub Repository: https://github.com/ananyayadav2/Hidden-Gems📌 Project OverviewHIDDEN GEMS is a localized urban exploration and discovery web platform engineered for students, budget explorers, and cultural travelers. Mainstream travel platforms frequently suffer from commercial bias—promoting expensive chains and crowded tourist traps. HIDDEN GEMS bridges this divide by surfacing unmonetized public viewpoints, quiet library reading halls, affordable eateries, and heritage sites with zero or minimal entry fees, while empowering local small business and place owners to list and manage their locations.   🚀 Key Features🎒 1. Tourist / Explorer WorkflowMulti-Attribute Discovery: Filter spots by dynamic/unrestricted budgets (including ₹0 free places), atmosphere (Quiet & Peaceful, Moderate, Lively & Social), and study-friendly workspace tags.Over 100+ Curated Spots: Covers Mumbai, Thane, Navi Mumbai, and surrounding getaways within 200 km (waterfalls, ancient rock-cut caves, hill forts, indie book cafes, and street food corridors).Smart Exploration & Turn-by-Turn Navigation:Direct Google Search integration on place titles to quickly view live articles, photos, and reviews in a new tab.One-click Google Maps turn-by-turn routing links to any destination.Favorites & Community Upvotes: Save locations locally in-browser and discover spots ranked by community appreciation.🏪 2. Place Owner WorkflowOwner Dashboard: Independent cafes, quiet gardens, and cultural venues can easily register their locations.Admin Review Queue: Submissions include category, cost per person, atmosphere, description, and photo uploads, feeding into a community verification queue before going live.🌐 3. Multilingual Support (Bhashini Standard)Instant, client-side language switching across English, Hindi (हिंदी), and Marathi (मराठी) to ensure vernacular inclusion and accessibility for regional travelers.🔒 4. Frictionless OnboardingLightweight sign-up requiring only Full Name and Email ID.Eliminates verification bottlenecks and identity verification friction for immediate platform access.🛠️ Tech StackFramework: Next.js (App Router, React)   Language: TypeScriptStyling: Tailwind CSSIcons: Lucide ReactAnimations: Framer MotionDeployment: Vercel   External Links: Google Maps Deep Routing & Google Search Query Parameters📂 Folder StructurePlaintexthidden-gems/
├── app/
│   ├── layout.tsx             # Root layout with LanguageProvider and Navbar
│   ├── page.tsx               # Landing page with hero, search, live stats & 8 categories
│   ├── explore/
│   │   └── page.tsx           # Tourist explorer interface with dynamic multi-filters
│   ├── owner/
│   │   └── page.tsx           # Place Owner dashboard & submission review form
│   └── auth/
│       ├── login/page.tsx     # Sign-in portal with credential checks
│       └── register/page.tsx  # Direct Name & Email registration (no OTP / KYC)
├── components/
│   ├── Navbar.tsx             # Multilingual switcher and navigation header
│   └── SplashScreen.tsx       # Animated Diamond Gem entry screen
├── context/
│   └── LanguageContext.tsx    # Multilingual translation provider (EN, HI, MR)
├── data/
│   └── initialGems.ts         # Curated catalog of 100+ regional locations (up to 200 km)
└── types/
    └── index.ts               # Core data models and interfaces
💻 Getting Started LocallyPrerequisitesMake sure you have Node.js (v18+) and npm installed:Bashnode -v
npm -v
InstallationClone the repository:Bashgit clone https://github.com/ananyayadav2/Hidden-Gems.git
cd Hidden-Gems
Install dependencies:Bashnpm install
Run the local development server:Bashnpm run dev
View the application:
Open http://localhost:3000 in your browser.   🗺️ Curated CategoriesCheap Eats: Century-old Irani cafes, regional street eats, and student joints.Study & Work Spaces: Quiet library reference halls, shaded reading gardens, and laptop spots.Parks & Peaceful Corners: Shaded gardens, lakes, waterfalls, and nature trails.Scenic Viewpoints: Seaside promenades, rock monoliths, and hill sunset points.Art & Culture: Historic museums, rock-cut Buddhist caves, and street art docks.Bookshops & Reading Corners: Rare second-hand bookstalls and bookstore coffee corners.Local Markets & Hidden Shops: Vintage antique alleys, flower bazaars, and flea markets.Stay & Accommodation: Budget backpacker pods, lakeside tents, and heritage stays.👥 Hackathon DetailsEvent: Techformers 2026   Problem Statement: PS 02 — Hidden Gems (Local City Discovery Platform)   Team Name: TriByte   Institution: Usha Mittal Institute of Technology (UMIT), CSI UMIT | SNDT Women's University, Mumbai   Live Demo: https://hidden-gems-one.vercel.app/📄 LicenseThis project is developed for hackathon and educational purposes under the MIT License.
