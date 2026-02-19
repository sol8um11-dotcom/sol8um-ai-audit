// Pre-trained AI Opportunity Knowledge Base
// Sector-specific use cases, pain points, and AI solutions

export interface AISolution {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  timeToImplement: string;
  estimatedROI: string;
}

export interface PainPoint {
  id: string;
  label: string;
  description: string;
}

export interface SectorData {
  id: string;
  name: string;
  shortName: string;
  painPoints: PainPoint[];
  solutions: Record<string, AISolution[]>;
  quickWins: AISolution[];
}

export interface BusinessSize {
  id: string;
  label: string;
  description: string;
}

export interface TechLevel {
  id: string;
  label: string;
  description: string;
}

export interface BudgetRange {
  id: string;
  label: string;
  description: string;
}

export const businessSizes: BusinessSize[] = [
  { id: "solo", label: "Solo / Freelancer", description: "Just me" },
  { id: "micro", label: "Micro Business", description: "2–10 people" },
  { id: "small", label: "Small Business", description: "11–50 people" },
  { id: "medium", label: "Medium Enterprise", description: "51–200 people" },
  { id: "large", label: "Large Enterprise", description: "200+ people" },
];

export const techReadiness: TechLevel[] = [
  { id: "beginner", label: "Just Starting", description: "Mostly manual processes" },
  { id: "basic", label: "Basic Digital", description: "Using basic software & tools" },
  { id: "intermediate", label: "Tech Savvy", description: "Automated some workflows" },
  { id: "advanced", label: "Tech Forward", description: "Already using some AI" },
];

export const budgetRanges: BudgetRange[] = [
  { id: "bootstrap", label: "Bootstrap", description: "Under ₹50K/mo" },
  { id: "growing", label: "Growing", description: "₹50K – ₹2L/mo" },
  { id: "scaling", label: "Scaling", description: "₹2L – ₹10L/mo" },
  { id: "enterprise", label: "Enterprise", description: "₹10L+/mo" },
];

export const sectors: SectorData[] = [
  {
    id: "food-restaurant",
    name: "Food & Restaurant",
    shortName: "Food & QSR",
    painPoints: [
      { id: "inventory", label: "Inventory & Wastage", description: "Overstocking, spoilage & manual stock tracking eating profits" },
      { id: "orders", label: "Order Management", description: "Juggling dine-in, delivery & takeout orders manually" },
      { id: "customer-retention", label: "Customer Retention", description: "Customers visit once and never come back" },
      { id: "staff", label: "Staff Scheduling & Training", description: "Constant understaffing during rush, overstaffing when slow" },
      { id: "delivery", label: "Delivery Operations", description: "Late deliveries, wrong orders & angry customers" },
      { id: "marketing", label: "Marketing & Local Reach", description: "Struggling to get noticed by nearby hungry customers" },
      { id: "menu-engineering", label: "Menu Engineering & Pricing", description: "No clue which menu items actually make money" },
      { id: "hygiene-compliance", label: "Hygiene & Compliance", description: "FSSAI paperwork piling up, audit anxiety every quarter" },
      { id: "aggregator-dependency", label: "Aggregator Dependency", description: "Zomato & Swiggy eating 25%+ of every order" },
    ],
    solutions: {
      inventory: [
        {
          title: "AI Demand Forecasting",
          description: "Predict daily demand per menu item using historical sales, weather, events & trends. Reduces food waste by 30–40%.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Save ₹50K–2L/month on wastage",
        },
        {
          title: "Smart Auto-Reordering",
          description: "AI monitors stock levels in real-time and auto-generates purchase orders before items run out.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "15–20% reduction in stockouts",
        },
      ],
      orders: [
        {
          title: "AI Order Processing Bot",
          description: "WhatsApp/Phone AI bot that takes orders, handles modifications, and routes to kitchen display. Works 24/7.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Handle 3x more orders with same staff",
        },
        {
          title: "Smart Kitchen Display System",
          description: "AI-prioritized order queue that optimizes cooking sequence for faster delivery times.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "25% faster order completion",
        },
      ],
      "customer-retention": [
        {
          title: "AI Loyalty & Personalization Engine",
          description: "Automatically segments customers, sends personalized offers based on order history & preferences.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "20–35% increase in repeat orders",
        },
        {
          title: "Review & Feedback AI",
          description: "Automatically responds to reviews, analyzes sentiment trends, and alerts on negative patterns.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "0.5–1 star rating improvement",
        },
      ],
      staff: [
        {
          title: "AI Staff Scheduler",
          description: "Predicts busy hours using historical data and auto-creates optimal shift schedules.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "20% reduction in labor costs",
        },
        {
          title: "AI Performance & Training Tracker",
          description: "Monitors staff performance metrics, identifies skill gaps, and recommends targeted training modules.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15% improvement in service speed",
        },
      ],
      delivery: [
        {
          title: "AI Route Optimization",
          description: "Optimizes delivery routes in real-time considering traffic, orders & driver locations.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30% reduction in delivery time",
        },
        {
          title: "Smart Delivery ETA Predictor",
          description: "Gives customers accurate delivery ETAs using AI that factors in kitchen load, traffic & distance.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "40% fewer 'where is my order' calls",
        },
      ],
      marketing: [
        {
          title: "AI Social Media Manager",
          description: "Auto-generates food photography posts, captions, stories & reels schedule based on trending content.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "3x social media engagement",
        },
        {
          title: "Hyper-Local Ad Targeting",
          description: "AI creates and optimizes ads targeting people within 5km radius based on time, weather & events.",
          impact: "high",
          timeToImplement: "1 week",
          estimatedROI: "2–4x return on ad spend",
        },
      ],
      "menu-engineering": [
        {
          title: "AI Menu Pricing Optimizer",
          description: "Analyze competitor pricing, ingredient costs & customer preferences to set optimal prices for each item.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "8–15% margin improvement",
        },
        {
          title: "AI Menu Mix Analyzer",
          description: "Identifies stars, puzzles, plow horses & dogs in your menu — suggests removals, promotions & repositioning.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "12% increase in average order value",
        },
      ],
      "hygiene-compliance": [
        {
          title: "AI FSSAI Compliance Tracker",
          description: "Automated checklist management, temperature logging, expiry alerts & FSSAI documentation.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "100% audit readiness, zero penalty risk",
        },
        {
          title: "Smart Kitchen Monitoring",
          description: "IoT + AI temperature sensors, hygiene cameras & automated compliance reporting for food safety.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "Prevent costly health violations",
        },
      ],
      "aggregator-dependency": [
        {
          title: "Direct Ordering Channel Builder",
          description: "Build your own ordering website + WhatsApp bot to reduce Zomato/Swiggy commission dependency.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Save 15–25% on commission per order",
        },
        {
          title: "AI Aggregator Performance Analyzer",
          description: "Track performance across aggregators — optimize menu placement, pricing & promotions per platform.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "20% better aggregator ROI",
        },
      ],
    },
    quickWins: [
      {
        title: "WhatsApp AI Chatbot",
        description: "Set up a WhatsApp chatbot for instant order taking, menu sharing & reservation booking.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "Handle 50+ queries/day automatically",
      },
      {
        title: "Google Review Auto-Responder",
        description: "AI responds to every Google & Zomato review within minutes — personalized, on-brand, 24/7.",
        impact: "medium",
        timeToImplement: "1–2 days",
        estimatedROI: "Improve rating by 0.3–0.5 stars in 30 days",
      },
      {
        title: "Smart Reorder Alert System",
        description: "Automated stock alerts via WhatsApp when any ingredient drops below threshold — never run out of key items.",
        impact: "medium",
        timeToImplement: "2–3 days",
        estimatedROI: "Zero stockout incidents per month",
      },
    ],
  },
  {
    id: "hotel-travel-tourism",
    name: "Hotel, Travel & Tourism",
    shortName: "Hotel & Travel",
    painPoints: [
      { id: "bookings", label: "Booking & Reservation Management", description: "Double bookings, missed reservations & front desk chaos" },
      { id: "guest-experience", label: "Guest Experience & Satisfaction", description: "Guests expect personalized service but staff can't keep up" },
      { id: "revenue", label: "Revenue & Yield Optimization", description: "Empty rooms while competitors sell out at higher rates" },
      { id: "operations", label: "Operations & Housekeeping", description: "Housekeeping delays & maintenance surprises hurting reviews" },
      { id: "reviews", label: "Online Reputation & Reviews", description: "Bad reviews piling up with no time to respond" },
      { id: "marketing", label: "Marketing & Visibility", description: "Invisible online while competitors dominate search results" },
      { id: "ota-dependency", label: "OTA Commission Dependency", description: "MakeMyTrip & Booking.com taking 15-25% per reservation" },
      { id: "seasonal-demand", label: "Seasonal Demand Fluctuations", description: "Packed in peak season, ghost town in off-season" },
    ],
    solutions: {
      bookings: [
        {
          title: "AI Dynamic Pricing Engine",
          description: "Auto-adjusts room rates based on demand, competition, seasonality & events. Maximizes RevPAR.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15–25% revenue increase",
        },
        {
          title: "AI Booking Assistant",
          description: "24/7 chatbot on website & WhatsApp that handles inquiries, bookings & upsells experiences.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "40% more direct bookings",
        },
      ],
      "guest-experience": [
        {
          title: "AI Concierge System",
          description: "Personalized guest recommendations for dining, activities & local experiences based on preferences.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "30% increase in ancillary revenue",
        },
        {
          title: "AI Pre-Arrival Experience Builder",
          description: "Sends personalized pre-arrival emails with room preferences, special requests & curated local guides.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "25% higher guest satisfaction scores",
        },
      ],
      revenue: [
        {
          title: "Revenue Management AI",
          description: "Analyzes booking patterns, competitor rates & market demand to optimize pricing strategy.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20–30% RevPAR improvement",
        },
        {
          title: "AI Upsell & Cross-Sell Engine",
          description: "Recommends room upgrades, spa packages & dining deals at optimal moments during guest journey.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "₹500–2000 additional revenue per booking",
        },
      ],
      operations: [
        {
          title: "Smart Housekeeping Scheduler",
          description: "AI optimizes cleaning schedules based on checkout times, new bookings & staff availability.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "25% faster room turnover",
        },
        {
          title: "AI Maintenance Predictor",
          description: "Predicts AC, plumbing & equipment failures before they happen using sensor data patterns.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "50% reduction in emergency repair costs",
        },
      ],
      reviews: [
        {
          title: "AI Review Management",
          description: "Auto-responds to reviews across platforms, analyzes sentiment trends, and flags issues.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "0.5–1 star rating improvement",
        },
        {
          title: "AI Sentiment Dashboard",
          description: "Real-time dashboard tracking guest sentiment across all review platforms with trend alerts.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Identify issues 3x faster than manual monitoring",
        },
      ],
      marketing: [
        {
          title: "AI Content & SEO Engine",
          description: "Auto-generates SEO-optimized listings, social content & email campaigns for different seasons.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "3x organic traffic growth",
        },
        {
          title: "AI Remarketing Automation",
          description: "Targets past guests with personalized offers based on stay history, preferences & upcoming events.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "35% increase in repeat bookings",
        },
      ],
      "ota-dependency": [
        {
          title: "Direct Booking Engine AI",
          description: "Smart booking engine with price-match guarantee, loyalty rewards & WhatsApp confirmation to reduce OTA reliance.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "Save 15–22% OTA commission per booking",
        },
        {
          title: "AI Channel Manager",
          description: "Automatically distributes inventory & rates across OTAs, own website & offline channels for max revenue.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "20% more direct bookings in 90 days",
        },
      ],
      "seasonal-demand": [
        {
          title: "AI Seasonal Demand Forecaster",
          description: "Predicts demand spikes/dips months ahead using festivals, events, weather & historical data.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Fill 25% more rooms in low season",
        },
        {
          title: "AI Off-Season Package Builder",
          description: "Auto-creates attractive packages combining rooms, experiences & dining for low-demand periods.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "15% higher occupancy in shoulder seasons",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Review Auto-Responder",
        description: "Automatically craft personalized responses to Google, TripAdvisor & OTA reviews.",
        impact: "high",
        timeToImplement: "2–3 days",
        estimatedROI: "Save 10+ hours/week on review management",
      },
      {
        title: "WhatsApp Check-in/Checkout Bot",
        description: "Let guests check-in, request services & checkout via WhatsApp — no front desk queue.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "60% reduction in front desk wait times",
      },
    ],
  },
  {
    id: "ecommerce-d2c",
    name: "E-Commerce & D2C",
    shortName: "E-Com & D2C",
    painPoints: [
      { id: "conversion", label: "Low Conversion Rate", description: "Tons of traffic but barely anyone actually buys" },
      { id: "customer-support", label: "Customer Support Overload", description: "Support team drowning in repetitive order queries" },
      { id: "inventory", label: "Inventory & Supply Chain", description: "Dead stock piling up while bestsellers go out-of-stock" },
      { id: "marketing", label: "CAC & Marketing ROI", description: "Ad spend keeps climbing but returns keep shrinking" },
      { id: "returns", label: "Returns & Refund Management", description: "Returns eating into margins, especially wrong-size orders" },
      { id: "personalization", label: "Personalization at Scale", description: "Every customer gets the same generic shopping experience" },
      { id: "catalog-management", label: "Catalog & Content Management", description: "Writing product descriptions for hundreds of SKUs manually" },
      { id: "abandoned-carts", label: "Cart Abandonment", description: "70% of carts abandoned and no way to recover them" },
    ],
    solutions: {
      conversion: [
        {
          title: "AI-Powered Product Recommendations",
          description: "Real-time personalized product suggestions based on browsing behavior, purchase history & trends.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15–30% increase in AOV",
        },
        {
          title: "AI A/B Testing Engine",
          description: "Continuously tests & optimizes product pages, CTAs, pricing display for maximum conversions.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "20–40% conversion improvement",
        },
      ],
      "customer-support": [
        {
          title: "AI Customer Support Agent",
          description: "Handles 80% of queries automatically — order tracking, returns, product info, complaints.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Reduce support costs by 60%",
        },
        {
          title: "AI Voice Support Agent",
          description: "Handles phone calls for order status, complaints & FAQs in Hindi & English with natural voice.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Handle 500+ calls/day without extra staff",
        },
      ],
      inventory: [
        {
          title: "AI Demand Forecasting",
          description: "Predicts demand by SKU, season, and trend to optimize stock levels across warehouses.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "30% reduction in dead stock",
        },
        {
          title: "AI Multi-Warehouse Optimizer",
          description: "Distributes inventory across warehouses based on regional demand patterns for faster delivery.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20% faster delivery, 15% lower logistics cost",
        },
      ],
      marketing: [
        {
          title: "AI Ad Creative Generator",
          description: "Auto-generates ad copy, images & videos optimized for each platform and audience segment.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "2–3x ROAS improvement",
        },
        {
          title: "AI Customer Segmentation",
          description: "Automatically segments customers by behavior, LTV & purchase patterns for targeted campaigns.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "40% better email open rates",
        },
      ],
      returns: [
        {
          title: "AI Return Predictor",
          description: "Predicts which orders are likely to be returned and takes proactive action to reduce returns.",
          impact: "medium",
          timeToImplement: "3 weeks",
          estimatedROI: "20–30% reduction in returns",
        },
        {
          title: "AI Size & Fit Recommender",
          description: "Uses purchase history & body measurements to recommend perfect sizes — biggest return reducer.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "35% reduction in size-related returns",
        },
      ],
      personalization: [
        {
          title: "AI Personalized Shopping Experience",
          description: "Dynamic homepage, search results & email content tailored to each visitor's preferences.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% increase in customer LTV",
        },
        {
          title: "AI WhatsApp Commerce",
          description: "Full shopping experience on WhatsApp — browse catalog, get recommendations, pay & track orders.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "New revenue channel with 3x engagement rate",
        },
      ],
      "catalog-management": [
        {
          title: "AI Product Description Writer",
          description: "Auto-generate SEO-optimized product titles, descriptions & tags for your entire catalog in minutes.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "Save 50+ hours/month on content writing",
        },
        {
          title: "AI Image Enhancement & Background Removal",
          description: "Auto-enhance product photos, remove backgrounds & generate lifestyle imagery at scale.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "80% reduction in photography costs",
        },
      ],
      "abandoned-carts": [
        {
          title: "Abandoned Cart Recovery AI",
          description: "Sends personalized WhatsApp/email nudges with smart timing to recover abandoned carts.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Recover 15–25% of abandoned carts",
        },
        {
          title: "AI Exit Intent Optimizer",
          description: "Detects when visitors are about to leave & shows personalized offers to keep them on site.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "10–15% reduction in bounce rate",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Chatbot for Instant Support",
        description: "Deploy a smart chatbot that handles product queries, order tracking & returns 24/7.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "Resolve 70% queries without human intervention",
      },
      {
        title: "Abandoned Cart WhatsApp Nudge",
        description: "Automated WhatsApp messages to cart abandoners with personalized product reminders & incentives.",
        impact: "high",
        timeToImplement: "2–3 days",
        estimatedROI: "Recover 15–25% of abandoned carts",
      },
      {
        title: "AI Review & UGC Collector",
        description: "Auto-request reviews post-delivery, curate UGC content & generate social proof widgets.",
        impact: "medium",
        timeToImplement: "2–3 days",
        estimatedROI: "3x more product reviews per month",
      },
    ],
  },
  {
    id: "auto-ev",
    name: "Auto & EV",
    shortName: "Auto & EV",
    painPoints: [
      { id: "sales", label: "Sales & Lead Conversion", description: "Leads going cold because follow-ups are too slow" },
      { id: "service", label: "Service & Maintenance", description: "Vehicles breaking down before scheduled service dates" },
      { id: "fleet", label: "Fleet Management", description: "No real-time visibility into fleet location or performance" },
      { id: "charging", label: "Charging Network Operations", description: "Chargers sitting idle or overloaded with no smart balancing" },
      { id: "customer-experience", label: "Customer Experience", description: "Buyers expect premium experience but processes feel outdated" },
      { id: "supply-chain", label: "Supply Chain & Parts", description: "Parts shortages delaying service and frustrating customers" },
      { id: "warranty-claims", label: "Warranty & Claims Management", description: "Warranty claims stuck in slow manual approval loops" },
      { id: "dealer-network", label: "Dealer Network Performance", description: "No visibility into which dealers are underperforming and why" },
    ],
    solutions: {
      sales: [
        {
          title: "AI Lead Scoring & Nurturing",
          description: "Automatically scores leads, predicts purchase intent & triggers personalized follow-ups.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30–50% improvement in lead conversion",
        },
        {
          title: "AI Sales Conversation Assistant",
          description: "Real-time prompts for sales reps during calls — objection handling, pricing suggestions, competitor comparisons.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "25% higher close rates",
        },
      ],
      service: [
        {
          title: "Predictive Maintenance AI",
          description: "Analyzes vehicle data to predict maintenance needs before breakdowns occur.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "40% reduction in unexpected breakdowns",
        },
        {
          title: "AI Service Workflow Optimizer",
          description: "Optimizes workshop bay allocation, parts ordering & technician scheduling for maximum throughput.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "30% more vehicles serviced per day",
        },
      ],
      fleet: [
        {
          title: "AI Fleet Optimizer",
          description: "Real-time fleet tracking, route optimization & driver behavior analysis.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20–30% reduction in operational costs",
        },
        {
          title: "AI Driver Safety Scorer",
          description: "Monitors driving patterns, flags risky behavior & gamifies safe driving with leaderboards.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "25% reduction in accident-related costs",
        },
      ],
      charging: [
        {
          title: "Smart Charging Network AI",
          description: "Optimizes charging station placement, pricing & load balancing based on demand patterns.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "35% better utilization rates",
        },
        {
          title: "AI Energy Grid Optimizer",
          description: "Balances charging loads with grid capacity, solar input & time-of-use pricing for minimal cost.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "20–30% reduction in energy costs",
        },
      ],
      "customer-experience": [
        {
          title: "AI Virtual Showroom",
          description: "Interactive AI assistant for virtual test drives, configuration & personalized recommendations.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "2x showroom engagement",
        },
        {
          title: "AI After-Sales Engagement",
          description: "Automated service reminders, insurance renewals, accessory recommendations based on vehicle & usage.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "40% increase in after-sales revenue",
        },
      ],
      "supply-chain": [
        {
          title: "AI Supply Chain Predictor",
          description: "Forecasts parts demand, optimizes inventory & identifies supply chain risks early.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "25% reduction in parts inventory cost",
        },
        {
          title: "AI Vendor Performance Tracker",
          description: "Rates suppliers on delivery time, quality & pricing — auto-suggests better alternatives.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15% improvement in procurement efficiency",
        },
      ],
      "warranty-claims": [
        {
          title: "AI Warranty Claims Processor",
          description: "Auto-validates warranty claims, detects fraudulent patterns & speeds up approval workflows.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "60% faster claim processing, 20% fraud reduction",
        },
        {
          title: "AI Warranty Analytics Dashboard",
          description: "Identifies recurring defect patterns across models, regions & production batches for quality control.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Detect quality issues 3x faster",
        },
      ],
      "dealer-network": [
        {
          title: "AI Dealer Performance Scorer",
          description: "Tracks dealer KPIs in real-time — sales targets, service quality, customer satisfaction & compliance.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20% improvement in underperforming dealers",
        },
        {
          title: "AI Dealer Training & Enablement",
          description: "Personalized training modules for each dealer based on performance gaps & product knowledge needs.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30% faster new product launch readiness",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Service Booking Bot",
        description: "WhatsApp/web bot for instant service appointments, status updates & reminders.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "50% reduction in booking calls",
      },
      {
        title: "AI Test Drive Scheduler",
        description: "Automated test drive scheduling with location preference, vehicle selection & instant confirmation.",
        impact: "medium",
        timeToImplement: "2–3 days",
        estimatedROI: "3x more test drives booked",
      },
    ],
  },
  {
    id: "beauty-health-wellness",
    name: "Beauty, Health & Wellness",
    shortName: "Beauty & Wellness",
    painPoints: [
      { id: "appointments", label: "Appointment & No-Show Management", description: "Clients booking and not showing up, wasting prime slots" },
      { id: "client-retention", label: "Client Retention & Loyalty", description: "Clients try you once then switch to competitors" },
      { id: "staff-utilization", label: "Staff Utilization & Performance", description: "Some staff overbooked while others sit idle all day" },
      { id: "marketing", label: "Marketing & Social Media", description: "No time to post content despite needing social presence" },
      { id: "inventory", label: "Product Inventory & Reordering", description: "Running out of products mid-service or overstocking shelves" },
      { id: "patient-management", label: "Patient/Client Records", description: "Client history scattered across notebooks and spreadsheets" },
      { id: "upselling", label: "Upselling & Cross-Selling", description: "Missing easy upsell opportunities at the chair or bed" },
      { id: "multi-location", label: "Multi-Location Consistency", description: "Quality drops the moment you're not personally present" },
    ],
    solutions: {
      appointments: [
        {
          title: "AI Appointment Optimizer",
          description: "Smart scheduling that minimizes gaps, handles cancellations & auto-fills slots from waitlist.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "30% increase in daily appointments",
        },
        {
          title: "No-Show Predictor & Auto-Filler",
          description: "Predicts likely no-shows and auto-sends confirmations or fills slots from waitlist 24hrs ahead.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Recover 80% of no-show revenue",
        },
      ],
      "client-retention": [
        {
          title: "AI Client Engagement Engine",
          description: "Automated personalized follow-ups, birthday offers & re-engagement campaigns based on visit patterns.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "40% increase in repeat visits",
        },
        {
          title: "AI Membership & Loyalty Builder",
          description: "Creates smart loyalty programs with tiered rewards, referral bonuses & personalized offers.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "50% increase in membership sign-ups",
        },
      ],
      "staff-utilization": [
        {
          title: "AI Staff Performance Tracker",
          description: "Analyzes booking patterns per staff member, optimizes schedules & identifies training needs.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "20% better staff utilization",
        },
        {
          title: "AI Commission & Incentive Calculator",
          description: "Auto-calculates commissions based on services, products sold & client ratings — motivates teams.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "15% improvement in upselling",
        },
      ],
      marketing: [
        {
          title: "AI Social Content Creator",
          description: "Auto-generates before/after posts, reels, stories & hashtag strategies for beauty/wellness brands.",
          impact: "high",
          timeToImplement: "1 week",
          estimatedROI: "4x social media engagement",
        },
        {
          title: "AI Local SEO & Google Business Optimizer",
          description: "Optimizes Google Business profile, auto-posts updates & manages local SEO for area visibility.",
          impact: "high",
          timeToImplement: "1 week",
          estimatedROI: "2x walk-in traffic from Google searches",
        },
      ],
      inventory: [
        {
          title: "Smart Product Reordering",
          description: "AI tracks product usage per service, predicts reorder points & auto-generates POs.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "20% reduction in product wastage",
        },
        {
          title: "AI Retail Product Recommender",
          description: "Suggests retail products to clients based on their treatments — auto-creates upsell opportunities.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "25% increase in product sales per visit",
        },
      ],
      "patient-management": [
        {
          title: "AI Health Records Assistant",
          description: "Smart patient/client records with AI-powered insights, treatment suggestions & history analysis.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "50% faster consultation prep",
        },
        {
          title: "AI Skin/Hair Analysis Tool",
          description: "Photo-based AI analysis that recommends treatments and tracks progress over visits.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "30% increase in treatment plan conversions",
        },
      ],
      upselling: [
        {
          title: "AI Service Bundle Recommender",
          description: "Suggests optimal service combinations & add-ons based on client history, season & trends.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "20% increase in average ticket size",
        },
        {
          title: "AI Post-Visit Product Nudges",
          description: "Auto-sends product recommendations via WhatsApp after visits based on services availed.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "15% additional product revenue",
        },
      ],
      "multi-location": [
        {
          title: "AI Multi-Branch Dashboard",
          description: "Centralized performance tracking, inventory sync & staff management across all locations.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "Consistent quality across all branches",
        },
        {
          title: "AI Standard Operating Procedures",
          description: "Auto-generates & monitors SOP compliance across locations with real-time deviation alerts.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "90% SOP compliance across all locations",
        },
      ],
    },
    quickWins: [
      {
        title: "WhatsApp Booking Bot",
        description: "Let clients book, reschedule & get reminders via WhatsApp AI assistant.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "70% reduction in booking calls",
      },
      {
        title: "AI Review & Testimonial Collector",
        description: "Auto-sends review requests post-visit, collects testimonials & generates social proof content.",
        impact: "medium",
        timeToImplement: "1–2 days",
        estimatedROI: "3x more Google reviews per month",
      },
    ],
  },
  {
    id: "education-edtech",
    name: "Education & EdTech",
    shortName: "Education",
    painPoints: [
      { id: "enrollment", label: "Student Enrollment & Admissions", description: "Inquiries pouring in but conversion to enrollment is low" },
      { id: "engagement", label: "Student Engagement & Retention", description: "Students losing interest and dropping out mid-course" },
      { id: "content", label: "Content Creation & Curriculum", description: "Teachers spending nights creating quizzes and study material" },
      { id: "assessment", label: "Assessment & Grading", description: "Grading hundreds of papers manually every single week" },
      { id: "operations", label: "Administrative Operations", description: "Admin staff buried in timetables, attendance and paperwork" },
      { id: "parent-comm", label: "Parent Communication", description: "Parents calling daily asking about progress and fees" },
      { id: "fee-collection", label: "Fee Collection & Defaults", description: "Chasing parents for overdue fees every single month" },
      { id: "placement-outcomes", label: "Placement & Outcome Tracking", description: "No clear data on whether graduates actually got placed" },
    ],
    solutions: {
      enrollment: [
        {
          title: "AI Lead Nurturing for Admissions",
          description: "Automated inquiry handling, follow-ups & personalized course recommendations based on student profile.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "40% increase in enrollment conversion",
        },
        {
          title: "AI Enrollment Funnel Optimizer",
          description: "Tracks every touchpoint from inquiry to enrollment, identifies drop-off points & auto-fixes them.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "25% more enrollments from same leads",
        },
      ],
      engagement: [
        {
          title: "AI Adaptive Learning Path",
          description: "Personalized learning journeys that adapt difficulty, content & pace based on student performance.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "50% improvement in completion rates",
        },
        {
          title: "AI Student Risk Predictor",
          description: "Identifies students at risk of dropping out based on attendance, grades & engagement patterns.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30% reduction in student dropout rates",
        },
      ],
      content: [
        {
          title: "AI Course Content Generator",
          description: "Auto-generates quizzes, summaries, practice problems & study materials from curriculum.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "80% faster content creation",
        },
        {
          title: "AI Video Lecture Enhancer",
          description: "Auto-generates subtitles, chapter markers, searchable transcripts & key takeaway summaries from lectures.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "40% improvement in student video engagement",
        },
      ],
      assessment: [
        {
          title: "AI Auto-Grading System",
          description: "Instantly grades assignments, provides detailed feedback & identifies learning gaps.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "90% reduction in grading time",
        },
        {
          title: "AI Plagiarism & Quality Checker",
          description: "Detects plagiarism, AI-generated content & assesses assignment quality with detailed feedback.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Ensure academic integrity at scale",
        },
      ],
      operations: [
        {
          title: "AI Admin Assistant",
          description: "Automates timetabling, attendance tracking, fee reminders & report generation.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "60% reduction in admin work",
        },
        {
          title: "AI Fee Collection Optimizer",
          description: "Smart payment reminders, flexible payment plan suggestions & automated follow-ups for pending fees.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "30% improvement in on-time fee collection",
        },
      ],
      "parent-comm": [
        {
          title: "AI Parent Communication Hub",
          description: "Automated progress reports, attendance alerts & personalized parent updates via WhatsApp.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "3x parent engagement improvement",
        },
        {
          title: "AI Parent-Teacher Meeting Scheduler",
          description: "Auto-schedules PTMs based on availability, sends prep summaries & follow-up action items.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "2x PTM attendance rates",
        },
      ],
      "fee-collection": [
        {
          title: "AI Fee Default Predictor",
          description: "Predicts students at risk of fee default based on payment history, engagement & financial signals.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "25% reduction in fee defaults",
        },
        {
          title: "AI Flexible Payment Plan Engine",
          description: "Auto-creates personalized EMI plans, scholarship suggestions & financial aid matching for at-risk students.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "15% improvement in enrollment retention",
        },
      ],
      "placement-outcomes": [
        {
          title: "AI Placement Matching Engine",
          description: "Matches students to jobs/internships based on skills, grades, preferences & company requirements.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "40% higher placement rates",
        },
        {
          title: "AI Outcome Dashboard",
          description: "Real-time tracking of graduate outcomes — placement rates, salary data, employer feedback for accreditation.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Better accreditation scores & institutional ranking",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Inquiry Chatbot",
        description: "24/7 chatbot answering course queries, fee structures & admission process.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "Handle 100+ inquiries/day automatically",
      },
      {
        title: "AI Attendance Tracker",
        description: "Automated attendance via face recognition or QR codes with instant parent notifications.",
        impact: "medium",
        timeToImplement: "3–5 days",
        estimatedROI: "Save 30+ minutes/day on manual attendance",
      },
    ],
  },
  {
    id: "specialty-services",
    name: "Specialty Services",
    shortName: "Services",
    painPoints: [
      { id: "lead-gen", label: "Lead Generation & Qualification", description: "Spending hours on leads that never convert to clients" },
      { id: "client-onboarding", label: "Client Onboarding", description: "New client setup takes weeks of back-and-forth emails" },
      { id: "operations", label: "Operations & Workflow", description: "Team stuck doing repetitive tasks instead of real work" },
      { id: "compliance", label: "Compliance & Documentation", description: "Regulatory deadlines and audit prep causing constant stress" },
      { id: "customer-support", label: "Customer Support", description: "Same questions asked a hundred times draining your team" },
      { id: "scaling", label: "Scaling Without Hiring", description: "Want to grow revenue without proportionally growing headcount" },
      { id: "proposal-management", label: "Proposals & Estimates", description: "Writing custom proposals from scratch for every prospect" },
      { id: "talent-management", label: "Talent & Resource Management", description: "Wrong people on wrong projects, no capacity visibility" },
    ],
    solutions: {
      "lead-gen": [
        {
          title: "AI Lead Gen & Qualification",
          description: "Automated lead generation from multiple channels with AI scoring and prioritization.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "3x qualified leads per month",
        },
        {
          title: "AI Cold Outreach Engine",
          description: "Personalized email & LinkedIn campaigns at scale with AI-crafted messages per prospect profile.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "5x higher response rates than manual outreach",
        },
      ],
      "client-onboarding": [
        {
          title: "AI-Powered Client Onboarding",
          description: "Automated document collection, KYC verification & personalized onboarding workflows.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "70% faster onboarding",
        },
        {
          title: "AI Contract & Proposal Generator",
          description: "Auto-generates customized proposals, contracts & SLAs from templates based on client requirements.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "80% faster proposal turnaround",
        },
      ],
      operations: [
        {
          title: "AI Workflow Automation",
          description: "Identifies repetitive tasks and automates them — data entry, reporting, email handling.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "40% reduction in manual work",
        },
        {
          title: "AI Meeting Intelligence",
          description: "Auto-records, transcribes & extracts action items from client meetings. Sends follow-up summaries.",
          impact: "medium",
          timeToImplement: "1 week",
          estimatedROI: "Save 5+ hours/week on meeting admin",
        },
      ],
      compliance: [
        {
          title: "AI Compliance Monitor",
          description: "Auto-tracks regulatory requirements, generates reports & alerts on compliance deadlines.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "90% reduction in compliance risks",
        },
        {
          title: "AI Audit Trail Generator",
          description: "Maintains complete audit trails for every transaction, decision & client interaction automatically.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "100% audit readiness at all times",
        },
      ],
      "customer-support": [
        {
          title: "AI Multi-Channel Support",
          description: "Unified AI support across WhatsApp, email, phone & chat — handles 80% queries automatically.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "60% reduction in support costs",
        },
        {
          title: "AI Ticket Prioritizer & Router",
          description: "Auto-categorizes support tickets by urgency, topic & expertise needed — routes to right person.",
          impact: "medium",
          timeToImplement: "1–2 weeks",
          estimatedROI: "40% faster ticket resolution",
        },
      ],
      scaling: [
        {
          title: "AI Process Optimizer",
          description: "Analyzes operational bottlenecks and suggests automation opportunities for scaling.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "2x throughput without hiring",
        },
        {
          title: "AI Revenue Forecaster",
          description: "Predicts monthly revenue, identifies at-risk accounts & suggests upsell opportunities.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15% improvement in revenue predictability",
        },
      ],
      "proposal-management": [
        {
          title: "AI Proposal Builder",
          description: "Auto-generates professional proposals with pricing, scope & timelines from brief client conversations.",
          impact: "high",
          timeToImplement: "2 weeks",
          estimatedROI: "5x faster proposal creation",
        },
        {
          title: "AI Estimate Accuracy Engine",
          description: "Uses historical project data to provide accurate cost & time estimates for new projects.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30% more accurate project estimates",
        },
      ],
      "talent-management": [
        {
          title: "AI Resource Allocation Optimizer",
          description: "Matches team members to projects based on skills, availability, workload & past performance.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% better resource utilization",
        },
        {
          title: "AI Skills Gap Analyzer",
          description: "Identifies skill gaps in your team and recommends targeted training or hiring needs.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "30% reduction in project delays from skill gaps",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Email & Document Processor",
        description: "Auto-categorize emails, extract key data from documents & route to right teams.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "Save 15+ hours/week on admin",
      },
      {
        title: "AI Invoice & Expense Processor",
        description: "Scan invoices, extract data, match to POs & auto-enter into accounting software.",
        impact: "high",
        timeToImplement: "2–3 days",
        estimatedROI: "90% reduction in manual data entry",
      },
    ],
  },
  {
    id: "fashion-jewelry",
    name: "Fashion & Jewelry",
    shortName: "Fashion & Jewelry",
    painPoints: [
      { id: "inventory", label: "Inventory & Trend Forecasting", description: "Last season's stock sitting unsold, wrong trends stocked" },
      { id: "customer-experience", label: "Customer Experience & Styling", description: "Customers browsing endlessly but leaving without buying" },
      { id: "online-presence", label: "Online Presence & Marketplace", description: "Listings buried on Amazon and Myntra with poor visibility" },
      { id: "design", label: "Design & Collections", description: "Design cycles too slow to keep up with fast trends" },
      { id: "pricing", label: "Pricing & Margin Strategy", description: "Gold prices fluctuating daily and margins getting squeezed" },
      { id: "marketing", label: "Brand Marketing & Influencers", description: "Paying influencers with no idea if it drives sales" },
      { id: "counterfeiting", label: "Counterfeiting & Authenticity", description: "Fake copies of your designs popping up everywhere" },
      { id: "festive-planning", label: "Festive & Wedding Season Planning", description: "Scrambling every Diwali and wedding season unprepared" },
    ],
    solutions: {
      inventory: [
        {
          title: "AI Trend Forecasting",
          description: "Predicts upcoming fashion trends from social media, runway data & market signals.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "30% reduction in unsold inventory",
        },
        {
          title: "AI Stock Assortment Optimizer",
          description: "Recommends optimal product mix per store location based on local demand, demographics & seasons.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20% improvement in sell-through rates",
        },
      ],
      "customer-experience": [
        {
          title: "AI Virtual Try-On",
          description: "Let customers virtually try jewelry/accessories using AR & AI on your app/website.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "40% increase in online conversions",
        },
        {
          title: "AI Personal Stylist",
          description: "Recommends products based on customer style preferences, body type & occasion.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% increase in basket size",
        },
      ],
      "online-presence": [
        {
          title: "AI Product Photography",
          description: "Auto-generates professional product photos with AI backgrounds, models & styling.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "80% reduction in photography costs",
        },
        {
          title: "AI Marketplace Optimizer",
          description: "Optimizes product listings across Amazon, Myntra, Nykaa with AI-tuned titles, images & keywords.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "30% increase in marketplace sales",
        },
      ],
      design: [
        {
          title: "AI Design Assistant",
          description: "Generates design concepts, color palettes & pattern suggestions based on trend data.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "5x faster design iteration",
        },
        {
          title: "AI Collection Planner",
          description: "Plans collections aligned with upcoming trends, festivals & regional preferences across India.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% higher collection sell-through",
        },
      ],
      pricing: [
        {
          title: "AI Dynamic Pricing",
          description: "Optimizes pricing based on material costs, competitor prices, demand & customer segments.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "15–20% margin improvement",
        },
        {
          title: "AI Gold/Material Price Tracker",
          description: "Real-time material cost tracking with auto-adjusted retail pricing and margin protection alerts.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "Protect margins on 100% of inventory",
        },
      ],
      marketing: [
        {
          title: "AI Influencer Matching",
          description: "Identifies perfect influencers for your brand based on audience match, engagement & ROI prediction.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "3x better influencer campaign ROI",
        },
        {
          title: "AI Festive Campaign Manager",
          description: "Auto-creates marketing campaigns for Diwali, Karva Chauth, wedding season & other festivals.",
          impact: "high",
          timeToImplement: "1–2 weeks",
          estimatedROI: "40% increase in festive season sales",
        },
      ],
      counterfeiting: [
        {
          title: "AI Authenticity Verification",
          description: "Blockchain + AI system for product authentication — customers scan QR to verify genuineness.",
          impact: "high",
          timeToImplement: "4–6 weeks",
          estimatedROI: "Eliminate counterfeit concerns, build trust",
        },
        {
          title: "AI Online Counterfeit Detector",
          description: "Scans marketplaces for counterfeit listings of your products & auto-files takedown requests.",
          impact: "medium",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Protect brand value & prevent revenue leakage",
        },
      ],
      "festive-planning": [
        {
          title: "AI Festive Demand Forecaster",
          description: "Predicts product demand for Diwali, Akshaya Tritiya, wedding season with granular SKU-level forecasts.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "25% better inventory readiness for peak seasons",
        },
        {
          title: "AI Wedding Season Planner",
          description: "Auto-creates curated wedding collections, personalized lookbooks & targeted campaign schedules.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "35% higher wedding season conversion",
        },
      ],
    },
    quickWins: [
      {
        title: "AI Catalog Generator",
        description: "Auto-create digital catalogs with professional product descriptions & SEO tags.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "Save 20+ hours/month on catalog work",
      },
      {
        title: "WhatsApp Catalog & Order Bot",
        description: "Share product catalog on WhatsApp, take orders & send invoices — all automated.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "New sales channel with 50+ orders/week",
      },
    ],
  },
  {
    id: "dealer-distributor",
    name: "Dealer & Distributor",
    shortName: "Dealer & Dist.",
    painPoints: [
      { id: "order-management", label: "Order Processing & Management", description: "Orders coming in via calls, WhatsApp & email — total mess" },
      { id: "territory", label: "Territory & Beat Management", description: "Sales reps covering routes inefficiently, missing key retailers" },
      { id: "logistics", label: "Logistics & Last-Mile Delivery", description: "Delivery trucks running half-empty or missing delivery windows" },
      { id: "retailer-relations", label: "Retailer Relationship Management", description: "Retailers switching to competitors over small service gaps" },
      { id: "inventory", label: "Warehouse & Inventory", description: "Warehouse full of slow movers while fast movers go stockout" },
      { id: "collections", label: "Payments & Collections", description: "Crores stuck in overdue payments from retailers" },
      { id: "scheme-management", label: "Scheme & Discount Management", description: "Trade schemes leaking money without reaching target retailers" },
      { id: "market-intelligence", label: "Market & Competitor Intelligence", description: "Competitors launching offers and you find out too late" },
    ],
    solutions: {
      "order-management": [
        {
          title: "AI Order Processing Hub",
          description: "Automated order capture from WhatsApp, email & calls with smart validation & routing.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "50% faster order processing",
        },
        {
          title: "AI Demand Sensing Engine",
          description: "Predicts retailer demand patterns & auto-suggests optimal order quantities to prevent stockouts.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "20% reduction in lost sales from stockouts",
        },
      ],
      territory: [
        {
          title: "AI Territory Intelligence",
          description: "Optimizes sales territories based on potential, coverage & rep performance data.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% increase in territory revenue",
        },
        {
          title: "AI Beat Planning Optimizer",
          description: "Creates optimal daily routes for sales reps covering max retailers with minimum travel time.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "30% more retailer visits per day",
        },
      ],
      logistics: [
        {
          title: "AI Route & Load Optimizer",
          description: "Optimizes delivery routes, vehicle loading & scheduling for minimum cost.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "30% reduction in logistics costs",
        },
        {
          title: "AI Delivery Tracking & ETA",
          description: "Real-time delivery tracking for retailers with accurate ETAs and auto-delay notifications.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "50% fewer 'where is my delivery' calls",
        },
      ],
      "retailer-relations": [
        {
          title: "AI Retailer Engagement Platform",
          description: "Automated visit scheduling, order suggestions & personalized schemes for retailers.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "35% improvement in retailer satisfaction",
        },
        {
          title: "AI Retailer Credit Scorer",
          description: "Assesses retailer creditworthiness using payment history, order patterns & market data.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "40% reduction in bad debt",
        },
      ],
      inventory: [
        {
          title: "AI Warehouse Management",
          description: "Real-time stock tracking, demand forecasting & automated reorder point management.",
          impact: "high",
          timeToImplement: "3–4 weeks",
          estimatedROI: "25% reduction in carrying costs",
        },
        {
          title: "AI Expiry & Freshness Manager",
          description: "Tracks product expiry dates, auto-prioritizes FIFO dispatch & alerts on slow-moving stock.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "80% reduction in expiry-related losses",
        },
      ],
      collections: [
        {
          title: "AI Collections Predictor",
          description: "Predicts payment delays, auto-sends reminders & prioritizes collection efforts.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "40% improvement in collection efficiency",
        },
        {
          title: "AI Outstanding & Reconciliation Bot",
          description: "Auto-reconciles payments, identifies discrepancies & generates outstanding reports per retailer.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Save 20+ hours/week on accounting",
        },
      ],
      "scheme-management": [
        {
          title: "AI Scheme Optimizer",
          description: "Designs optimal trade schemes, discounts & incentive structures based on retailer segments & margins.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "20% better scheme ROI",
        },
        {
          title: "AI Scheme Compliance Tracker",
          description: "Monitors scheme utilization, detects misuse & ensures schemes reach intended retailers.",
          impact: "medium",
          timeToImplement: "2 weeks",
          estimatedROI: "30% reduction in scheme leakage",
        },
      ],
      "market-intelligence": [
        {
          title: "AI Competitor Price Monitor",
          description: "Tracks competitor pricing, new product launches & market promotions across your territory.",
          impact: "high",
          timeToImplement: "2–3 weeks",
          estimatedROI: "Stay ahead of competitor moves in real-time",
        },
        {
          title: "AI Market Trend Analyzer",
          description: "Identifies emerging product trends, shifting consumer preferences & new market opportunities.",
          impact: "medium",
          timeToImplement: "3–4 weeks",
          estimatedROI: "First-mover advantage on new trends",
        },
      ],
    },
    quickWins: [
      {
        title: "WhatsApp Order Bot",
        description: "Let retailers place orders via WhatsApp with AI validation and instant confirmation.",
        impact: "high",
        timeToImplement: "3–5 days",
        estimatedROI: "3x faster order intake from retailers",
      },
      {
        title: "AI Payment Reminder System",
        description: "Automated WhatsApp payment reminders with outstanding amount, due dates & payment links.",
        impact: "high",
        timeToImplement: "2–3 days",
        estimatedROI: "30% faster collections on average",
      },
    ],
  },
];

// Result generation engine
export interface AuditResult {
  overallScore: number;
  sectorName: string;
  topSolutions: AISolution[];
  quickWins: AISolution[];
  estimatedMonthlySavings: string;
  aiReadinessLevel: string;
  priorityActions: string[];
}

export function generateAuditResult(
  sectorId: string,
  painPointIds: string[],
  businessSize: string,
  techLevel: string,
  budget: string,
  painIntensities?: Record<string, number>
): AuditResult {
  const sector = sectors.find((s) => s.id === sectorId);
  if (!sector) {
    return {
      overallScore: 0,
      sectorName: "Unknown",
      topSolutions: [],
      quickWins: [],
      estimatedMonthlySavings: "N/A",
      aiReadinessLevel: "N/A",
      priorityActions: [],
    };
  }

  // Gather all relevant solutions based on selected pain points
  const allSolutions: AISolution[] = [];
  painPointIds.forEach((ppId) => {
    const solutions = sector.solutions[ppId];
    if (solutions) {
      allSolutions.push(...solutions);
    }
  });

  // Sort by impact (high first), then boost by pain intensity if available
  const impactOrder = { high: 3, medium: 2, low: 1 };
  allSolutions.sort((a, b) => {
    const aScore = impactOrder[a.impact];
    const bScore = impactOrder[b.impact];
    return bScore - aScore;
  });

  // Take top 3–4 solutions
  const topSolutions = allSolutions.slice(0, Math.min(4, allSolutions.length));

  // Calculate AI readiness score (0-100)
  const techScores: Record<string, number> = {
    beginner: 20,
    basic: 40,
    intermediate: 65,
    advanced: 85,
  };
  const sizeMultipliers: Record<string, number> = {
    solo: 0.7,
    micro: 0.8,
    small: 1.0,
    medium: 1.1,
    large: 1.15,
  };
  const budgetBonus: Record<string, number> = {
    bootstrap: 0,
    growing: 5,
    scaling: 10,
    enterprise: 15,
  };

  const baseScore = techScores[techLevel] || 40;
  const multiplier = sizeMultipliers[businessSize] || 1.0;
  const bonus = budgetBonus[budget] || 0;

  // Pain intensity affects the opportunity score — higher pain = more AI opportunity
  let painBonus = 0;
  if (painIntensities) {
    const avgIntensity =
      painPointIds.reduce((sum, id) => sum + (painIntensities[id] || 5), 0) /
      Math.max(painPointIds.length, 1);
    // High pain = high opportunity, which adjusts score context
    painBonus = avgIntensity > 7 ? -5 : avgIntensity > 4 ? 0 : 3;
  }

  const painPointPenalty = Math.min(painPointIds.length * 3, 15);

  let overallScore = Math.round(baseScore * multiplier + bonus - painPointPenalty + painBonus);
  overallScore = Math.max(15, Math.min(95, overallScore));

  // Determine AI readiness level
  let aiReadinessLevel: string;
  if (overallScore >= 80) aiReadinessLevel = "AI Champion — You're ahead of the curve";
  else if (overallScore >= 60) aiReadinessLevel = "AI Ready — Strong foundation to build on";
  else if (overallScore >= 40) aiReadinessLevel = "AI Curious — Great time to start your AI journey";
  else aiReadinessLevel = "AI Explorer — Massive untapped potential";

  // Estimate monthly savings
  const savingsMap: Record<string, Record<string, string>> = {
    solo: { low: "₹10K–25K", med: "₹25K–50K", high: "₹50K–1L" },
    micro: { low: "₹25K–50K", med: "₹50K–1.5L", high: "₹1.5L–3L" },
    small: { low: "₹50K–1.5L", med: "₹1.5L–5L", high: "₹5L–10L" },
    medium: { low: "₹1.5L–5L", med: "₹5L–15L", high: "₹15L–30L" },
    large: { low: "₹5L–15L", med: "₹15L–50L", high: "₹50L–1Cr+" },
  };
  const savingsTier =
    painPointIds.length >= 4 ? "high" : painPointIds.length >= 2 ? "med" : "low";
  const estimatedMonthlySavings =
    savingsMap[businessSize]?.[savingsTier] || "₹50K–2L";

  // Generate priority actions
  const priorityActions: string[] = [];
  if (topSolutions.length > 0) {
    priorityActions.push(
      `Implement ${topSolutions[0].title} first — ${topSolutions[0].estimatedROI}`
    );
  }
  if (sector.quickWins.length > 0) {
    priorityActions.push(
      `Quick Win: ${sector.quickWins[0].title} (${sector.quickWins[0].timeToImplement})`
    );
  }
  if (techLevel === "beginner" || techLevel === "basic") {
    priorityActions.push("Start with workflow automation to build AI confidence");
  }
  if (painPointIds.length >= 3) {
    priorityActions.push(
      "Focus on highest-ROI automation first, then expand systematically"
    );
  }
  priorityActions.push("Schedule a free 15-min strategy call with our AI team");

  return {
    overallScore,
    sectorName: sector.name,
    topSolutions,
    quickWins: sector.quickWins,
    estimatedMonthlySavings,
    aiReadinessLevel,
    priorityActions,
  };
}
