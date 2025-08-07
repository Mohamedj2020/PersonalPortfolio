import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Trigger skill animation when skills tab is opened
  useEffect(() => {
    if (activeTab === 'skills') {
      setAnimateSkills(true);
      const timer = setTimeout(() => setAnimateSkills(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Reset animations when tab changes (optional - for re-triggering animations)
  useEffect(() => {
    if (isVisible) {
      // Small delay to allow tab content to render
      const timer = setTimeout(() => {
        // Force re-animation on tab change if needed
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isVisible]);

  // Updated skills without years
  const skills = {
    "💻 Programming Languages": [
      { name: "Python", level: "advanced" },
      { name: "Java", level: "advanced" },
      { name: "JavaScript", level: "intermediate" },
      { name: "TypeScript", level: "intermediate" },
      { name: "C", level: "intermediate" },
      { name: "C++", level: "intermediate" },
      { name: "HTML", level: "advanced" },
      { name: "CSS", level: "advanced" },
      { name: "SQL", level: "intermediate" }
    ],
    "🛠️ Frameworks & Tools": [
      { name: "FastAPI", level: "advanced" },
      { name: "Flask", level: "advanced" },
      { name: "React", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
      { name: "Docker", level: "intermediate" },
      { name: "Git", level: "advanced" },
      { name: "CI/CD", level: "intermediate" },
      { name: "Linux", level: "intermediate" },
      { name: "AWS", level: "intermediate" }
    ],
    "📊 Data & Analytics": [
      { name: "Jupyter", level: "advanced" },
      { name: "Pandas", level: "advanced" },
      { name: "Numpy", level: "advanced" },
      { name: "MongoDB", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "Tableau", level: "intermediate" },
      { name: "PowerBI", level: "beginner" },
      { name: "JSON", level: "advanced" }
    ],
    "🚀 Development & Soft Skills": [
      { name: "System Design", level: "intermediate" },
      { name: "REST APIs", level: "advanced" },
      { name: "Microservices", level: "intermediate" },
      { name: "Agile/Scrum", level: "intermediate" },
      { name: "Technical Writing", level: "advanced" },
      { name: "Team Leadership", level: "intermediate" }
    ]
  };

  // Function to get skill color based on level
  const getSkillColor = (level: string) => {
    switch (level) {
      case 'advanced':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'intermediate':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'beginner':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-r from-teal-600 to-cyan-600';
    }
  };

  // Fixed coursework with shorter names for better uniformity
  const coursework = [
    "Foundations",
    "Data Structures", 
    "Low-Level Programming",
    "Web Development",
    "Software Design",
    "AI/ML Modeling",
    "Operating Systems",
    "Database Systems",
    "Computer Networks",
    "Systems Programming",
    "OOP in C++",
    "Distributed Systems",
    "Software Implementation",
    "Computer Architecture",
    "Cloud Computing",
    "Cybersecurity"
  ];

  // Enhanced experiences with more details
  const experiences = [
    {
      id: 1,
      title: "Software Engineer Intern",
      organization: "Mahamed Konsulting",
      period: "Apr 2025 - Present",
      location: "Seattle, WA",
      description: "Built and deployed a responsive web platform enabling students to receive resume reviews and access real-time internship listings through integrated third-party APIs.",
      skills: ["React", "Node.js", "APIs"],
      highlights: ["Built responsive web platform", "Integrated third-party APIs", "Deployed production system"]
    },
    {
      id: 2,
      title: "Tech Prep Fellow",
      organization: "CodePath",
      period: "Jan 2025 - Apr 2025",
      location: "Remote",
      description: "Completed a rigorous training program focused on data structures, algorithms, and system design. Solved LeetCode-style problems covering arrays, linked lists, trees, and graphs.",
      skills: ["Python", "Algorithms", "System Design"],
      highlights: ["Completed rigorous training", "Solved 100+ LeetCode problems", "Mastered system design concepts"]
    },
    {
      id: 3,
      title: "Undergraduate Research",
      organization: "Ohio State University",
      period: "Jan 2024 - Jul 2024",
      location: "Ohio",
      description: "Designed compilers and software tools optimized for data-intensive applications on GPUs, enhancing processing efficiency and reducing processing time.",
      skills: ["C", "GPU Programming", "Compilers"],
      highlights: ["Designed GPU compilers", "Optimized data processing", "Reduced processing time by 30%"]
    },
    {
      id: 4,
      title: "STEM Instructor",
      organization: "Somali East African Community Services",
      period: "Aug 2024 - Present",
      location: "Ohio",
      description: "Taught weekly STEM and programming classes to Somali high school students, focusing on low-level programming using the C language.",
      skills: ["C", "Teaching", "Mentoring"],
      highlights: ["Taught 20+ students", "Developed curriculum", "Improved student engagement by 40%"]
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      issued: "May 2025",
      expires: "May 2028",
      credentialId: "",
      credentialUrl: "https://www.credly.com/badges/0d35804c-95a1-4ede-bdac-ef862769e680/linked_in_profile",
      skills: ["Cloud Architecture", "AWS Services", "System Design"]
    },
    {
      title: "Intermediate Technical Interview Prep",
      issuer: "CodePath",
      issued: "May 2025",
      credentialId: "117383",
      credentialUrl: "https://drive.google.com/file/d/1xPW9wi33O_o9Q-Zgmt2dO4D6au6x4RQJ/view?usp=share_link",
      skills: ["Python", "Collaborative Problem Solving", "Analytical Skills", "Data Structures and Algorithms"]
    },
    {
      title: "Python Certificate",
      issuer: "HackerRank",
      issued: "Oct 2024",
      credentialId: "",
      credentialUrl: "https://www.hackerrank.com/certificates/iframe/fa583e2abe8d",
      skills: ["Problem Solving", "Python"]
    }
  ];

  const leadership = [
    {
      title: "National Member",
      organization: "National Society of Black Engineers (NSBE)",
      period: "Jan 2024 - Present",
      description: "Active member of the largest student-managed organization focused on increasing the number of culturally responsible Black engineers. Participate in professional development workshops, networking events, and community outreach programs."
    },
    {
      title: "Tech Prep Fellow",
      organization: "Management Leadership for Tomorrow (MLT)",
      period: "Jan 2025 - Present",
      description: "Selected for MLT's competitive tech preparation program designed to prepare high-achieving underrepresented students for careers in technology. Engaging in technical skill development, career coaching, and networking with industry professionals."
    },
    {
      title: "National Member",
      organization: "ColorStack",
      period: "Aug 2024 - Present",
      description: "Member of the largest community of Black and Latinx Computer Science students and professionals. Participate in mentorship programs, technical workshops, and career development initiatives focused on increasing diversity in tech."
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-20">
      <div className="container mx-auto px-6">
        {/* Animated Title */}
        <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Experience & Skills
        </h2>

        {/* Animated Tab Navigation */}
        <div className={`flex flex-wrap justify-center mb-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-2 max-w-4xl mx-auto border border-teal-400/20 gap-1 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
        >
          {[
            { key: 'experience', label: 'Experience', icon: '💼' },
            { key: 'skills', label: 'Skills', icon: '🛠️' },
            { key: 'coursework', label: 'Coursework', icon: '📚' },
            { key: 'certifications', label: 'Certs', icon: '🏆' },
            { key: 'leadership', label: 'Leadership', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg md:rounded-full transition-all duration-500 text-center ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:space-x-1">
                <span className="text-xs sm:text-sm md:text-base">{tab.icon}</span>
                <span className="font-medium text-xs sm:text-xs md:text-sm leading-tight">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Tab Content */}
        <div className="max-w-6xl mx-auto">
          {/* Experience Tab with Popup Animations */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border transition-all duration-700 cursor-pointer transform-gpu ${
                      selectedExperience === exp.id
                        ? 'border-teal-400 shadow-lg shadow-teal-400/20'
                        : 'border-teal-400/30 hover:border-teal-400/60'
                    } ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-20'
                    }`}
                    style={{ 
                      transitionDelay: isVisible ? `${500 + index * 200}ms` : '0ms',
                      transform: selectedExperience === exp.id 
                        ? 'scale(1.02) translateZ(0)' 
                        : 'scale(1) translateZ(0)'
                    }}
                    onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white hover:text-teal-400 transition-colors">
                        {exp.title}
                      </h3>
                      <div className={`transform transition-transform duration-300 ${
                        selectedExperience === exp.id ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-teal-400 mb-1 font-medium">{exp.organization}</p>
                    <p className="text-gray-400 text-sm mb-3">{exp.period} • {exp.location}</p>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${
                      selectedExperience === exp.id ? 'max-h-96 opacity-100' : 'max-h-16 opacity-70'
                    }`}>
                      <p className="text-gray-300 text-sm mb-4">{exp.description}</p>
                      
                      {/* Only show details when THIS specific card is selected */}
                      {selectedExperience === exp.id && (
                        <div className="space-y-3 animate-slideDown">
                          <div>
                            <h4 className="text-teal-400 font-medium mb-2">Key Highlights:</h4>
                            <ul className="space-y-1">
                              {exp.highlights.map((highlight, idx) => (
                                <li key={idx} className="text-gray-300 text-sm flex items-center">
                                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab with Staggered Animations */}
          {activeTab === 'skills' && (
            <>
              <div className={`flex flex-col sm:flex-row justify-center items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-3xl mx-auto border border-teal-400/20 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                  <span className="text-white font-medium text-xs sm:text-sm">Advanced</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <span className="text-white font-medium text-xs sm:text-sm">Intermediate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                  <span className="text-white font-medium text-xs sm:text-sm">Beginner</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div 
                    key={category} 
                    className={`bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-teal-400/30 hover:border-teal-400 transition-all duration-700 ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-16 scale-95'
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">{category}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {skillList.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`${getSkillColor(skill.level)} text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Mobile-Optimized Coursework Tab */}
          {activeTab === 'coursework' && (
            <div className={`bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-teal-400/30 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">📚 Relevant Coursework</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {coursework.map((course, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-2 sm:p-3 rounded-lg text-center hover:from-teal-700 hover:to-cyan-700 transition-all duration-500 hover:scale-105 cursor-pointer min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${700 + index * 50}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-medium leading-tight">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-teal-400/30 hover:border-teal-400 transition-all duration-700 hover:shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-teal-400 mb-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-3">
                    Issued {cert.issued}
                    {cert.expires && ` • Expires ${cert.expires}`}
                    {cert.credentialId && ` • ID: ${cert.credentialId}`}
                  </p>
                  <div className="mb-4">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Show Credential
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === 'leadership' && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {leadership.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-teal-400/30 hover:border-teal-400 transition-all duration-700 hover:shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-teal-400 mb-1">{item.organization}</p>
                  <p className="text-gray-400 text-sm mb-3">{item.period}</p>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS for additional animations */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown { 
            animation: slideDown 0.3s ease-out; 
          }
        `}
      </style>
    </section>
  );
};

export default Experience;