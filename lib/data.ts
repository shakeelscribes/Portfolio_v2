export const CONTACT = {
  name: "Mohamed Shakeel",
  email: "ahamedshakeel2005@gmail.com",
  phone: "+91 90800 65048",
  phoneHref: "tel:+919080065048",
  linkedin: "https://linkedin.com/in/mohamed-shakeel-720b2a29b",
  github: "https://github.com/shakeelscribes",
  resume: "/resume.pdf",
  location: "Tirunelveli, India",
};

export const AVAILABILITY =
  "Open to full-time roles, remote or relocation";

export type Metric = { value: string; label: string };
export type ProjectLink = { label: string; href: string };

export type FeatureProject = {
  id: string;
  name: string;
  meta: string;
  headline: string;
  body: string;
  metrics: Metric[];
  stack: string[];
  links: ProjectLink[];
  visual: "ecg" | "slots" | "rings";
};

export type RowProject = {
  name: string;
  year: string;
  desc: string;
  stack: string;
  href: string;
};

export const FEATURED: FeatureProject[] = [
  {
    id: "cardioguard",
    name: "CardioGuard",
    meta: "Team Lead and ML Engineer, 2025",
    headline:
      "Cardiovascular risk prediction, from raw patient data to three live surfaces.",
    body: "Led a four-member team training a Gradient Boosting classifier on 68,645 patient records, beating Random Forest, Logistic Regression, and XGBoost baselines. The model sits behind a FastAPI service that computes derived clinical features at inference time, and the same API feeds a Next.js dashboard and a Flutter app on Supabase PostgreSQL.",
    metrics: [
      { value: "0.8017", label: "ROC-AUC, 5-fold stratified CV" },
      { value: "68,645", label: "patient records trained on" },
      { value: "3", label: "surfaces: web, API, mobile" },
    ],
    stack: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "FastAPI",
      "Next.js 14",
      "Flutter",
      "Supabase",
    ],
    links: [
      { label: "Live site", href: "https://cardioguard-website.vercel.app" },
      {
        label: "Backend repo",
        href: "https://github.com/shakeelscribes/CardioGuard-backend",
      },
    ],
    visual: "ecg",
  },
  {
    id: "salon-booking",
    name: "Salon Booking Platform",
    meta: "Freelance client build, in production, 2026",
    headline:
      "One booking platform running an entire salon, from customer wizard to stylist phone.",
    body: "A production system for a working unisex salon. A six-step React booking wizard with duration-aware slot math and cascade viability sits on an atomic FastAPI and MongoDB slot engine with a five-state booking lifecycle, two-way reschedule proposals, and RFC 5545 calendar invites that move on reschedule. Stylists approve bookings from a Flutter app mid-haircut; the owner gets a full money dashboard. Every clock runs IST, server to app.",
    metrics: [
      { value: "6-step", label: "booking wizard, cascade viability" },
      { value: "5-state", label: "booking lifecycle engine" },
      { value: "3 apps", label: "customer web, staff panel, stylist app" },
    ],
    stack: ["React 18", "FastAPI", "MongoDB", "Flutter", "Tailwind CSS"],
    // No public repo: the source slug would expose the client's name.
    links: [],
    visual: "slots",
  },
  {
    id: "anna-univ",
    name: "Anna University Results Portal",
    meta: "System Architect, distributed systems PoC, 2026",
    headline:
      "An architecture built for the one day 1.5 million users arrive at once.",
    body: "Anna University's results day crashes its own servers every semester. This PoC replaces the live SQL lookup with a Redis-backed virtual waiting room behind a Proof-of-Work CAPTCHA, serving 1.5 million pre-generated static result files from MinIO and S3, fully containerized. The thesis: infrastructure decisions, not application code, absorb extreme traffic at zero marginal cost per user.",
    metrics: [
      { value: "1.5M", label: "concurrent users sized for" },
      { value: "1.5M", label: "static result files pre-generated" },
      { value: "0", label: "marginal cost per additional user" },
    ],
    stack: ["Redis", "Node.js", "MinIO", "Amazon S3", "Docker Compose"],
    links: [
      {
        label: "Source",
        href: "https://github.com/shakeelscribes/anna-univ-clone",
      },
    ],
    visual: "rings",
  },
];

export const ROWS: RowProject[] = [
  {
    name: "Stride",
    year: "2026",
    desc: "Flutter health platform with a Groq Llama 3.3 70B clinical assistant, native pedometer science computing ACSM MET calories and cadence, and offline-first SQLite to Firestore sync with conflict resolution.",
    stack: "Flutter, Riverpod, Groq, SQLite, Firestore",
    href: "https://github.com/shakeelscribes/Stride",
  },
  {
    name: "Vault",
    year: "In development",
    desc: "AI personal finance that reads bank SMS and PDF statements itself: iOS webhook ingestion, Groq merchant cleanup, and a deduplicating statement parser on a Next.js PWA. Early build, opened while it grows.",
    stack: "Next.js 14, Express, Groq, Supabase",
    href: "https://github.com/shakeelscribes/Vault",
  },
  {
    name: "Fleet Tracking",
    year: "2026",
    desc: "MQTT GPS ingestion at QoS 1 into a JWT-secured FastAPI service: derived vehicle status, strict row ownership, uniform error contracts, and a one-command Docker Compose boot.",
    stack: "FastAPI, MQTT, PostgreSQL, Docker",
    href: "https://github.com/shakeelscribes/fleet-tracking-backend",
  },
];

export const STACK_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "AI and machine learning",
    items: [
      "RAG",
      "LangChain",
      "LangGraph",
      "MCP",
      "Prompt engineering",
      "Groq",
      "Llama 3",
      "NLP",
      "Scikit-learn",
      "XGBoost",
      "Gradient Boosting",
    ],
  },
  {
    title: "Backend",
    items: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "Pydantic",
      "Zod",
      "REST APIs",
      "JWT and OAuth2",
      "Microservices",
    ],
  },
  {
    title: "Data and infrastructure",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "MinIO",
      "Amazon S3",
      "Docker",
      "MQTT",
      "GitHub Actions",
      "Nginx",
    ],
  },
  {
    title: "Frontend and mobile",
    items: [
      "TypeScript",
      "JavaScript",
      "Dart",
      "React",
      "Next.js 14",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
      "Three.js",
      "Flutter",
      "Riverpod",
    ],
  },
  {
    title: "Daily drivers",
    items: ["OpenCode", "Cursor", "GitHub Copilot", "Pi", "n8n", "Vitest"],
  },
];

export const CERTS: { name: string; issuer: string; year: string }[] = [
  { name: "Introduction to Generative AI", issuer: "IBM SkillsBuild", year: "2025" },
  { name: "Now Platform Micro-Certification", issuer: "ServiceNow", year: "2025" },
  { name: "Foundations of Cybersecurity", issuer: "Google", year: "2024" },
];

export const MARQUEE_ITEMS = [
  "Python",
  "FastAPI",
  "LangChain",
  "LangGraph",
  "RAG",
  "MCP",
  "Groq",
  "Llama 3",
  "Next.js 14",
  "Flutter",
  "PostgreSQL",
  "Redis",
  "Docker",
];

