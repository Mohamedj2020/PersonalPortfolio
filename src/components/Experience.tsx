import React, { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const skills = {
    "💻 Programming Languages": ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "HTML", "CSS", "SQL"],
    "🛠️ Frameworks & Tools": ["FastAPI", "Flask", "React", "Node.js", "Docker", "Git", "CI/CD", "Linux", "AWS"],
    "📊 Data & Analytics": ["Jupyter", "Pandas", "Numpy", "MongoDB", "PostgreSQL", "Tableau", "PowerBI", "JSON"],
    "🚀 Development & Soft Skills": [
      "System Design", "REST APIs", "Microservices",
      "Agile/Scrum", "Technical Writing", "Team Leadership"
    ]
  };

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
    "Cybersecurity Fundamentals",
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

  // Function to get skill level styling
  const getSkillLevelStyle = (skill: string) => {
    // Advanced skills (default/green tint)
    // Intermediate skills (yellow)
    const intermediateSkills = ['Java', 'Python', 'React', 'Node.js', 'C++', 'Flask', 'Pandas', 'Numpy', 'HTML', 'CSS', 'C'];
    // Basic/Learning skills (blue)
    const basicSkills = ['Docker', 'CI/CD', 'Linux', 'FastAPI', 'Tableau', 'PowerBI', 'JavaScript', 'TypeScript'];
    
    if (intermediateSkills.includes(skill)) {
      return 'bg-yellow-500 text-white border-yellow-500';
    } else if (basicSkills.includes(skill)) {
      return 'bg-blue-500 text-white border-blue-500';
    } else {
      // Advanced skills (default/green tint)
      return 'bg-emerald-600 text-white border-emerald-600';
    }
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Experience & Skills
        </h2>

        {/* NEW: Tab Navigation */}
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

        {/* Tab Content - keeping all your existing content */}
        <div className="max-w-6xl mx-auto">
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

          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-teal-400/30">
                  <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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