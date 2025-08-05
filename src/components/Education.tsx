import React from 'react';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "Ohio State University",
      period: "2020 - 2024",
      description: "Focused on software development, algorithms, and web technologies. Graduated with honors.",
      achievements: ["Dean's List", "Magna Cum Laude", "Computer Science Award"]
    },
    {
      degree: "High School Diploma",
      school: "Northland High School",
      period: "2016 - 2020",
      description: "Strong foundation in mathematics and sciences. Active in technology clubs and programming competitions.",
      achievements: ["Valedictorian", "Programming Club President", "Math Competition Winner"]
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Education
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-teal-400/30 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-teal-400 text-lg font-semibold">
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {edu.description}
                </p>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Achievements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <span
                        key={achievementIndex}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;