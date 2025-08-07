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
    image: "/images/Logo3_0.png"

  },
  {
    title: "Market Data Pipeline Simulator",
    description: "Developed a real-time data pipeline using Python, FastAPI, and Redis to simulate equity market feeds and support real-time price updates via WebSockets. Containerized the system with Docker Compose and implemented automated testing and CI workflows.",
    technologies: ["Python", "FastAPI", "Redis", "WebSockets", "Docker", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/Mohamedj2020/Market-data-pipeline-simulator",
    image: "/images/logo2.jpg"  // Updated to match case-sensitivity
  },
  {
    title: "Portfolio Website",
    description: "Developed a personal portfolio website using React, TypeScript, and Tailwind CSS to showcase projects and skills. Implemented responsive design and animations for an engaging user experience.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/Mohamedj2020/my-portfolio",
    image: "/images/project4.jpg" // Updated to match case-sensitivity
  },
{
  title: "Down Detector",
  description:
    "Down Detector is a full-stack web application that monitors website uptime, logs results into a SQLite database, and displays real-time updates on a responsive dashboard. Built with Flask, Bootstrap, and JavaScript, it features scheduled checks, a live status table, alert notifications, and rich data visualizations. Future improvements include dark mode, downloadable reports, and per-user dashboards.",
  technologies: [
    "Flask",
    "Bootstrap",
    "SQLite",
    "JavaScript",
    "Chart.js",
    "APScheduler",
    "Flask-Login"
  ],
  liveUrl: "#",
  githubUrl: "https://github.com/Mohamedj2020/DownDetector.git",
  image: "/images/logo3.png" // Confirm filename casing is correct
},
{
  title: "Revu App",
  description: "A comprehensive sentiment analysis application that classifies product reviews as positive, negative, or neutral using advanced machine learning techniques. It features a user-friendly interface for inputting reviews, real-time sentiment analysis, and detailed results display. Built with React, Flask, and TensorFlow, it offers a seamless experience for users to understand product feedback.",
  technologies: ["React", "Javascrip", " Flask", "Node.js", "PostgreSQL", "Python"],
  liveUrl: "#",
  githubUrl: "https://github.com/Mohamedj2020/Revu-app",
    image: "/images/revs_logo.svg" // Updated to match case-sensitivity
  },

];

  // Add more project objects as needed
export const contactInfo = {
  email: 'your.email@example.com',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourusername',
};

// You can continue this pattern for data in About.tsx, Experience.tsx, etc.
