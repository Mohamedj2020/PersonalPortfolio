export const personalData = {
  name: 'Mohamed',
  email: 'jirac.1@buckeyemail.osu.edu',
  resumeUrl: '/images/mlt_july_resume.pdf',
  socialLinks: {
    github: 'https://github.com/Mohamedj2020',
    linkedin: 'https://www.linkedin.com/in/mohamed-jirac',
  },
};

export const projectsData = [
  {
    title: "BDAA Data/IO Hackathon",
    description: "Conducted data analysis on EV charging infrastructure across California, identifying key trends and disparities in accessibility. Applied linear regression models to analyze correlation between city population and number of EV charging stations.",
    technologies: ["Python", "Data Analysis", "Linear Regression", "Pandas", "Numpy"],
    liveUrl: "#",
    githubUrl: "https://drive.google.com/file/d/1v4XHFsGqFCBHX89JOtpsIIjqTgUtS_xL/view?usp=share_link", // You can add your GitHub link here
    image: "/images/project-ev-analysis.png"
  },
  {
    title: "Market Data Pipeline Simulator",
    description: "Developed a real-time data pipeline using Python, FastAPI, and Redis to simulate equity market feeds and support real-time price updates via WebSockets. Containerized the system with Docker Compose and implemented automated testing and CI workflows.",
    technologies: ["Python", "FastAPI", "Redis", "WebSockets", "Docker", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#", // You can add your GitHub link here
    image: "/images/project-market-pipeline.png"
  },
  {
    title: "Down Detector",
    description: "A responsive portfolio website built with React and TypeScript. Features modern design with smooth animations, mobile-first approach, and showcases my technical skills and projects. It is optimized for fast loading times and is accessible on all devices.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/Mohamedj2020/DownDetector.git", // You can add your GitHub link here
    image: "/images/project-portfolio.png"
  }
];

export const contactInfo = {
  email: 'your.email@example.com',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourusername',
};

// You can continue this pattern for data in About.tsx, Experience.tsx, etc.
