export const personalData = {
  name: 'Mohamed Jirac',
  title: 'Software Engineer',
  location: 'Columbus, OH',
  bio: 'I am a Software Engineer based in Columbus, OH.',
  email: 'jirac.1@buckeyemail.osu.edu',
  resumeUrl: '/images/mlt_july_resume.pdf',
  profileImage: '/images/2P2A3560.png',
  socialLinks: {
    github: 'https://github.com/Mohamedj2020',
    linkedin: 'https://www.linkedin.com/in/mohamed-jirac',
  },
  currentRole: 'Software Engineer Intern @ Kassim Konsulting',
  previousRoles: [
    'Tech Prep Fellow @ CodePath',
    'Undergraduate Researcher @ Ohio State University',
    'STEM Instructor',
  ],
};

export const skillsData = {
  languages: {
    label: 'Languages',
    color: 'blue' as const,
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C++', 'SQL'],
  },
  frontend: {
    label: 'Frontend',
    color: 'emerald' as const,
    items: ['React', 'HTML/CSS', 'Tailwind CSS'],
  },
  backend: {
    label: 'Backend',
    color: 'purple' as const,
    items: ['FastAPI', 'Flask', 'Node.js'],
  },
  database: {
    label: 'Database',
    color: 'rose' as const,
    items: ['PostgreSQL', 'MongoDB', 'SQLite'],
  },
  tools: {
    label: 'Tools',
    color: 'amber' as const,
    items: ['Docker', 'Git', 'AWS', 'CI/CD', 'Linux', 'Jupyter', 'Figma'],
  },
};

export const experiencesData = [
  {
    id: 0,
    title: 'JPMorgan Chase',
    organization: 'JPMorgan Chase',
    period: '5 mos',
    location: 'Columbus, OH',
    logo: '/images/JPMorganChase-brown-and-white.jpg',
    logoInitial: 'JP',
    description: '',
    highlights: [],
    skills: [],
    roles: [
      {
        title: 'Software Engineer',
        type: 'Internship',
        period: '2026 - Present',
        description: '',
        highlights: ['Incoming Summer 2026'],
        skills: ['Software Engineering'],
      },
      {
        title: 'Code For Good Hackathon',
        type: 'Seasonal',
        period: 'Oct 2025',
        location: 'Columbus, Ohio Metropolitan Area · On-site',
        description:
          'Developed a React front-end for the Code For Good Hackathon at JPMorganChase, showcasing nonprofit data.',
        highlights: [
          'Created an interactive heat-map and geo-visualization to enhance user engagement',
          'Implemented a secure API layer to effectively manage incomplete data from a nonprofit API',
          'Focused on user experience by integrating smooth sliding components and an AI chat placeholder',
        ],
        skills: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'APIs', 'Figma'],
      },
    ],
  },
  {
    id: 5,
    title: 'Adobe Student Ambassador',
    organization: 'Adobe',
    period: 'Aug 2025 - Present',
    location: 'Columbus, OH',
    logo: '/images/adobe.jpg',
    logoInitial: 'A',
    description:
      'Collaborated with Adobe to empower students through creative tools and resources, enhancing their design and storytelling skills.',
    highlights: [
      'Organized workshops and events to promote Creative Cloud, fostering a community of innovative thinkers on campus',
      'Developed personal branding strategies for students, resulting in increased engagement and visibility for their projects',
    ],
    skills: ['Event Planning', 'Product Development', 'Creative Strategy'],
  },
  {
    id: 1,
    title: 'Software Engineer Intern',
    organization: 'Kassim Konsulting',
    period: 'Apr 2025 - Present',
    location: 'Remote',
    logo: '/images/kkcon.jpg',
    logoInitial: 'KK',
    description:
      'Built and deployed a responsive web platform enabling students to receive resume reviews and access real-time internship listings through integrated third-party APIs.',
    highlights: [
      'Built responsive web platform',
      'Integrated third-party APIs',
      'Deployed production system',
    ],
    skills: ['React', 'Node.js', 'APIs'],
  },
  {
    id: 2,
    title: 'Tech Prep Fellow',
    organization: 'CodePath',
    period: 'Jan 2025 - Apr 2025',
    location: 'Remote',
    logo: '/images/codepath_org_logo.jpg',
    logoInitial: 'CP',
    description:
      'Completed a rigorous training program focused on data structures, algorithms, and system design. Solved LeetCode-style problems covering arrays, linked lists, trees, and graphs.',
    highlights: [
      'Mastered data structures & algorithms',
      'Solved 100+ LeetCode problems',
      'System design fundamentals',
    ],
    skills: ['Python', 'Algorithms', 'System Design'],
  },
  {
    id: 3,
    title: 'Undergraduate Research',
    organization: 'Ohio State University',
    period: 'Jan 2024 - Jul 2024',
    location: 'Columbus, OH',
    logo: '/images/osulogo.png',
    logoInitial: 'OSU',
    description:
      'Designed compilers and software tools optimized for data-intensive applications on GPUs, enhancing processing efficiency and reducing processing time.',
    highlights: [
      'Designed GPU-optimized compilers',
      'Enhanced processing efficiency',
      'Reduced data processing time',
    ],
    skills: ['C', 'GPU Programming', 'Compilers'],
  },
  {
    id: 4,
    title: 'STEM Instructor',
    organization: 'Somali East African Community Services',
    period: 'Aug 2024 - Present',
    location: 'Columbus, OH',
    logo: '/images/stemexplorerprogramgearlogoc.png',
    logoInitial: 'SE',
    description:
      'Taught weekly STEM and programming classes to Somali high school students, focusing on low-level programming using the C language.',
    highlights: [
      'Taught weekly programming classes',
      'Mentored high school students',
      'Focused on C language fundamentals',
    ],
    skills: ['C', 'Teaching', 'Mentoring'],
  },
];

export const projectsData = [
  {
    title: 'BDAA Data/IO Hackathon',
    description:
      'Conducted data analysis on EV charging infrastructure across California, identifying key trends and disparities in accessibility. Applied linear regression models to analyze correlation between city population and number of EV charging stations.',
    technologies: ['Python', 'Data Analysis', 'Linear Regression', 'Pandas', 'Numpy'],
    liveUrl: '#',
    githubUrl:
      'https://drive.google.com/file/d/1v4XHFsGqFCBHX89JOtpsIIjqTgUtS_xL/view?usp=share_link',
    image: '/images/Logo3_0.png',
  },
  {
    title: 'Market Data Pipeline Simulator',
    description:
      'Developed a real-time data pipeline using Python, FastAPI, and Redis to simulate equity market feeds and support real-time price updates via WebSockets. Containerized the system with Docker Compose and implemented automated testing and CI workflows.',
    technologies: ['Python', 'FastAPI', 'Redis', 'WebSockets', 'Docker', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mohamedj2020/Market-data-pipeline-simulator',
    image: '/images/logo2.jpg',
  },
  {
    title: 'Portfolio Website',
    description:
      'Developed a personal portfolio website using React, TypeScript, and Tailwind CSS to showcase projects and skills. Implemented responsive design and animations for an engaging user experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mohamedj2020/my-portfolio',
    image: '/images/project4.jpg',
  },
  {
    title: 'Down Detector',
    description:
      'A full-stack web application that monitors website uptime, logs results into a SQLite database, and displays real-time updates on a responsive dashboard.',
    technologies: ['Flask', 'Bootstrap', 'SQLite', 'JavaScript', 'Chart.js'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mohamedj2020/DownDetector.git',
    image: '/images/logo3.png',
  },
  {
    title: 'Revu App',
    description:
      'A sentiment analysis application that classifies product reviews as positive, negative, or neutral using machine learning. Features a user-friendly interface with real-time analysis.',
    technologies: ['React', 'Flask', 'Node.js', 'PostgreSQL', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mohamedj2020/Revu-app',
    image: '/images/revs_logo.svg',
  },
];

export const aboutData = {
  education: {
    degree: 'B.S. Computer Science',
    school: 'The Ohio State University',
    expected: 'Expected Dec 2026',
  },
  summary:
    "Heading into my senior year at The Ohio State University, I'm eager to take the next step in my journey as a Software Engineer. With a strong foundation in Computer Science, I'm actively seeking a Software Engineering internship where I can apply my skills, solve real-world problems, and continue to grow.",
};

export const courseworkData = [
  'Foundations',
  'Data Structures',
  'Low-Level Programming',
  'Web Development',
  'Software Design',
  'AI/ML Modeling',
  'Operating Systems',
  'Database Systems',
  'Computer Networks',
  'Systems Programming',
  'OOP in C++',
  'Distributed Systems',
  'Software Implementation',
  'Computer Architecture',
  'Cloud Computing',
  'Cybersecurity',
];

export const certificationsData = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Issued May 2025 • Expires May 2028',
    credentialUrl: 'https://www.credly.com/badges/0d35804c-95a1-4ede-bdac-ef862769e680/linked_in_profile',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design'],
  },
  {
    title: 'Intermediate Technical Interview Prep',
    issuer: 'CodePath',
    date: 'Issued May 2025 • ID: 117383',
    credentialUrl: 'https://drive.google.com/file/d/1xPW9wi33O_o9Q-Zgmt2dO4D6au6x4RQJ/view?usp=share_link',
    skills: ['Python', 'Collaborative Problem Solving', 'Analytical Skills', 'Data Structures and Algorithms'],
  },
  {
    title: 'Python Certificate',
    issuer: 'HackerRank',
    date: 'Issued Oct 2024',
    credentialUrl: 'https://www.hackerrank.com/certificates/iframe/fa583e2abe8d',
    skills: ['Problem Solving', 'Python'],
  },
];

export const leadershipData = [
  {
    role: 'National Member',
    organization: 'National Society of Black Engineers (NSBE)',
    period: 'Jan 2024 - Present',
    description:
      'Active member of the largest student-managed organization focused on increasing the number of culturally responsible Black engineers. Participate in professional development workshops, networking events, and community outreach programs.',
  },
  {
    role: 'Tech Prep Fellow',
    organization: 'Management Leadership for Tomorrow (MLT)',
    period: 'Jan 2025 - Present',
    description:
      "Selected for MLT's competitive tech preparation program designed to prepare high-achieving underrepresented students for careers in technology. Engaging in technical skill development, career coaching, and networking with industry professionals.",
  },
  {
    role: 'National Member',
    organization: 'ColorStack',
    period: 'Aug 2024 - Present',
    description:
      'Member of the largest community of Black and Latinx Computer Science students and professionals. Participate in mentorship programs, technical workshops, and career development initiatives focused on increasing diversity in tech.',
  },
];
