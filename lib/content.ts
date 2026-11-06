// All of the site's text lives here. Edit this file to change what the site says.

export const profile = {
  name: "Aaditya Agarwal",
  role: "CSE (AI & ML) student at SRM Institute of Science and Technology",
  intro:
    "I build tools for developers and like turning rough ideas into things people actually use. Right now that's CodeSync.",
  location: "Chennai, India",
  status: "Open to internships",
  email: "daadityaagarwal8589@gmail.com", 
  resumeUrl: "https://drive.google.com/file/d/1klFj7pfGfXAJczStXXqN9yy8pxvotYZU/view?usp=sharing",
  links: {
    github: "https://github.com/aaditya8589",
    linkedin: "https://www.linkedin.com/in/aaditya-agarwal-b42ab6323/",
  },
};

export type Project = {
  slug: string; 
  name: string;
  summary: string; 
  description?: string; 
  features?: string[];
  stack: string[];
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "khuraak",
    name: "Khuraak",
    summary:
      "A fitness app built around Indian home food. Set calorie and protein targets, then log meals the way you actually eat them.",
    description:
      "Most calorie apps assume packaged food and make you enter everything by hand. Khuraak starts from Indian household dishes (North Indian first), works in katoris and rotis as well as grams, and suggests a deficit or bulk based on what your family already cooks. Currently in development as a solo build.",
    features: [
      "Calorie and protein targets from weight, height and goal",
      "Deficit or bulk suggestions based on Indian household diets",
      "Low-effort logging in household units or grams",
      "Your family's own version of a dish, without changing shared data",
      "Barcode scanning for packaged food, offline",
      "Protein-to-calorie guidance for gym-goers",
    ],
    stack: ["Kotlin", "Jetpack Compose", "ML Kit", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "codesync",
    name: "CodeSync",
    summary:
      "A real-time collaborative code editor where developers can code together, run code, and practice DSA in shared rooms.",
    features: [
      "User authentication",
      "Collaborative coding rooms",
      "Real-time code synchronization",
      "Multi-user presence",
      "Version history",
      "Code execution",
      "DSA collaborative arena",
      "Git integration",
      "Performance and concurrency testing",
    ],
    stack: ["React", "TypeScript", "Spring Boot", "WebSockets", "PostgreSQL", "Docker"],
    repo: "https://github.com/aaditya8589/CodeSync",
  },
  {
    slug: "raksha-net",
    name: "Raksha-Net",
    summary:
      "A disaster-response web app with one-tap SOS, nearby shelters and hospitals on a map, and a voice assistant. Works offline.",
    description:
      "Built at a hackathon (Hack Humanity) as a team project. In an emergency, network is often the first thing to go, so Raksha-Net caches nearby services for offline use and keeps the essentials one tap or one voice command away.",
    features: [
      "One-tap SOS that shares your live location",
      "Map of nearby shelters, hospitals and police from OpenStreetMap",
      "Offline mode with locally cached places",
      "Voice commands for SOS, maps and alerts",
      "Step-by-step safety guides for earthquakes, floods and storms",
      "Community posts for help requests and road updates",
      "English, Hindi and Tamil",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Leaflet", "IndexedDB"],
    repo: "https://github.com/aaravgupta8/hack-humanity",
  },
  {
    slug: "third-project",
    name: "Third project",
    summary: "One-line summary of another project.",
    description: "A short description of the project, the problem, and your role.",
    stack: ["React", "Node.js"],
  },
];


export const stack = {
  Languages: ["Java", "TypeScript", "Python", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Spring Boot", "WebSockets", "PostgreSQL"],
  "AI / ML": ["PyTorch", "Pandas", "NumPy"],
  Tools: ["Git", "Docker"],
};

export const education = [
  {
    place: "SRM Institute of Science and Technology",
    detail: "B.Tech, Computer Science & Engineering (AI & ML)",
    years: "2024 – 2028", 
  },
];
