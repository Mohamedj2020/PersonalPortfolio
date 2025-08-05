import React from 'react';

const Experience = () => {
  const skills = {
    "💻 Programming Languages": ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "HTML", "CSS"],
    "🛠️ Frameworks & Tools": ["FastAPI", "Flask", "React", "Node.js", "Docker", "CI/CD", "Linux"],
    "📊 Data & Analytics": ["Jupyter", "Pandas", "Numpy", "JSON", "Tableau", "PowerBI"],
    "🚀 Project & Software Development / Soft Skills": [
      "Software Development", "SDLC", "Data Structures & Algorithms",
      "Systems Analysis", "Project Management", "Collaborative Problem Solving",
      "Professional Development & Mentorship"
    ]
  };

  const coursework = [
    "Foundations",
    "Data Structures & Algorithms",
    "Low-Level Programming",
    "Computer Organization",
    "Web Applications",
    "Software Development & Design",
    "AI/ML Modeling",
    "Distributed Systems"
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

  // Function to get skill level styling
  const getSkillLevelStyle = (skill) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900">
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-teal-400 text-lg mb-4">Explore My</p>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Technical Skills Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-8">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                  <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-teal-300 mb-4">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <span key={skillIndex} className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${getSkillLevelStyle(skill)}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coursework Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-8">Relevant Coursework</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {coursework.map((course, index) => (
                  <div key={index} className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-teal-400/30">
                    <span className="text-gray-300 font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <h3 className="text-3xl font-bold text-white text-center mb-12">Experience Timeline</h3>
              <div className="relative max-w-6xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500"></div>
                
                {experiences.map((exp, index) => (
                  <div key={index} className="relative mb-12 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-4 border-gray-900 z-10"></div>

                    {/* Timeline card content - Fixed positioning */}
                    <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                      index % 2 === 0 
                        ? 'md:pr-8 md:text-right' 
                        : 'md:ml-auto md:pl-8 md:text-left'
                    }`}>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-teal-400/50 transition-all duration-300 shadow-lg">
                        
                        {/* Header with title, organization, and period */}
                        <div className={`mb-4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className="flex flex-col gap-1">
                            <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                            <p className="text-teal-300 font-medium">{exp.organization}</p>
                            <span className="text-gray-400 text-sm">{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={`text-gray-300 leading-relaxed ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
  
export default Experience;