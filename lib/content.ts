// All of the site's text lives here. Edit this file to change what the site says.

export const profile = {
  name: "Aaditya Agarwal",
  role: "CSE (AI & ML) student at SRM Institute of Science and Technology",
  intro:
    "I build tools for developers and like turning rough ideas into things people actually use. Right now that's CodeSync.",
  location: "Chennai, India",
  status: "Open to internships",
  email: "daadityaagarwal8589@gmail.com", 
  resumeUrl: "https://drive.google.com/file/d/1lbDpTyXTJ6NzI7K39r69bIOe__PPFV-t/view?usp=sharing",
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
    slug: "second-project",
    name: "Second project",
    summary: "One-line summary of another project.",
    description: "A short description of the project, the problem, and your role.",
    stack: ["Python", "PyTorch"],
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
