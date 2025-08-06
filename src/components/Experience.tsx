import React, { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');

  // Updated skills with proficiency levels
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
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'; // Yellow/Orange for advanced
      case 'intermediate':
        return 'bg-gradient-to-r from-blue-500 to-blue-600'; // Blue for intermediate
      case 'beginner':
        return 'bg-gradient-to-r from-green-500 to-green-600'; // Green for beginner
      default:
        return 'bg-gradient-to-r from-teal-600 to-cyan-600'; // Default teal
    }
  };

  // Add coursework array
  const coursework = [
    "Foundations",
    "Data Structures & Algorithms", 
    "Low-Level Programming and Computer Organization",
    "Web Applications Development",
    "Software Development and Design",
    "AI/ML Modeling",
    "Operating Systems",
    "Database Systems",
    "Computer Networks",
    "Systems Programming in C",
    "Object-Oriented Programming in C++",
    "Distributed Systems",
    "Software Design & Implementation",
    "Computer Architecture",
    "Cloud Computing",
    "Cybersecurity Fundamentals"
  ];

  const experiences = [
    {
      title: "Software Engineer Intern",
      organization: "Mahamed Konsulting",
      period: "Apr 2025 - Present",
      location: "Seattle, WA",
      description: "Built and deployed a responsive web platform enabling students to receive resume reviews and access real-time internship listings through integrated third-party APIs."
    },
    {
      title: "Tech Prep Fellow",
      organization: "CodePath",
      period: "Jan 2025 - Apr 2025",
      location: "Remote",
      description: "Completed a rigorous training program focused on data structures, algorithms, and system design. Solved LeetCode-style problems covering arrays, linked lists, trees, and graphs."
    },
    {
      title: "Undergraduate Research",
      organization: "Ohio State University",
      period: "Jan 2024 - Jul 2024",
      location: "Ohio",
      description: "Designed compilers and software tools optimized for data-intensive applications on GPUs, enhancing processing efficiency and reducing processing time."
    },
    {
      title: "STEM Instructor",
      organization: "Somali East African Community Services",
      period: "Aug 2024 - Present",
      location: "Ohio",
      description: "Taught weekly STEM and programming classes to Somali high school students, focusing on low-level programming using the C language."
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      issued: "May 2025",
      expires: "May 2028",
      credentialId: "",
      skills: ["Cloud Architecture", "AWS Services", "System Design"]
    },
    {
      title: "Intermediate Technical Interview Prep",
      issuer: "CodePath",
      issued: "May 2025",
      credentialId: "117383",
      skills: ["Python", "Collaborative Problem Solving", "Analytical Skills", "Data Structures and Algorithms"]
    },
    {
      title: "Python Certificate",
      issuer: "HackerRank",
      issued: "Oct 2024",
      credentialId: "",
      skills: ["Problem Solving", "Python"]
    }
  ];

  const leadership = [
    {
      title: "National Member",
      organization: "National Society of Black Engineers (NSBE)",
      period: "Jan 2024 - Present"
    },
    {
      title: "Tech Prep Fellow",
      organization: "Management Leadership for Tomorrow (MLT)",
      period: "Jan 2025 - Present"
    },
    {
      title: "National Member",
      organization: "ColorStack",
      period: "Aug 2024 - Present"
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Experience & Skills
        </h2>

        {/* Tab Navigation - Add Coursework tab */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('coursework')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'coursework'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Coursework
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'certifications'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Certifications
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'leadership'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Leadership
          </button>
        </div>

        {/* Add skill level legend */}
        {activeTab === 'skills' && (
          <div className="flex justify-center mb-6 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mr-2"></div>
              <span className="text-white">Advanced</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-2"></div>
              <span className="text-white">Intermediate</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 mr-2"></div>
              <span className="text-white">Beginner</span>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {/* Skills tab with color-coded levels */}
          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
                  <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <span
                        key={index}
                        className={`${getSkillColor(skill.level)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Coursework tab */}
          {activeTab === 'coursework' && (
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
              <h3 className="text-xl font-bold text-white mb-4">📚 Relevant Coursework</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {coursework.map((course, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm text-center"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keep all your existing tab content (experience, certifications, leadership) */}
          {activeTab === 'experience' && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
                  <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-teal-400 mb-1">{exp.organization}</p>
                  <p className="text-gray-400 text-sm mb-3">{exp.period} • {exp.location}</p>
                  <p className="text-gray-300 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-teal-400 mb-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-3">
                    Issued {cert.issued}
                    {cert.expires && ` • Expires ${cert.expires}`}
                    {cert.credentialId && ` • ID: ${cert.credentialId}`}
                  </p>
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

          {activeTab === 'leadership' && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {leadership.map((item, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-teal-400 mb-1">{item.organization}</p>
                  <p className="text-gray-400 text-sm">{item.period}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;