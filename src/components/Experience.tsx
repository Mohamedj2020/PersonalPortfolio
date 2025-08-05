import React, { useState, useEffect } from 'react';

type SkillLevel = 'Advanced' | 'Intermediate' | 'Basic';

interface Skill {
  name: string;
  level: SkillLevel;
  icon: string;
}

interface CourseCategory {
  category: string;
  courses: string[];
}

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
}

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills: Record<string, Skill[]> = {
    "Programming Languages": [
      { name: "Java", level: "Advanced", icon: "☕" },
      { name: "Python", level: "Intermediate", icon: "🐍" },
      { name: "JavaScript", level: "Intermediate", icon: "📜" },
      { name: "TypeScript", level: "Basic", icon: "🔷" },
      { name: "C++", level: "Intermediate", icon: "⚡" },
    ],
    "Web Technologies": [
      { name: "React", level: "Intermediate", icon: "⚛️" },
      { name: "Node.js", level: "Basic", icon: "🟢" },
      { name: "HTML/CSS", level: "Intermediate", icon: "🎨" },
      { name: "Material UI", level: "Basic", icon: "🎭" },
    ],
    "Tools & Technologies": [
      { name: "Git", level: "Intermediate", icon: "🔀" },
      { name: "MySQL", level: "Basic", icon: "🗄️" },
      { name: "Linux", level: "Basic", icon: "🐧" },
    ]
  };

  const coursework: CourseCategory[] = [
    {
      category: "Core Computer Science",
      courses: [
        "Data Structures & Algorithms",
        "Software Development",
        "Operating Systems",
        "Database Management"
      ]
    },
    {
      category: "Mathematics & Statistics",
      courses: [
        "Discrete Mathematics",
        "Statistics for Engineers",
        "Linear Algebra",
        "Calculus I & II"
      ]
    },
    {
      category: "Specialized Topics",
      courses: [
        "Web Application Development",
        "Computer Graphics",
        "Machine Learning Basics",
        "Software Engineering"
      ]
    }
  ];

  const experiences: ExperienceItem[] = [
    {
      title: "Computer Science Student",
      organization: "The Ohio State University",
      period: "2022 - Present",
      type: "Education",
      description: "Pursuing Bachelor's degree in Computer Science with focus on software development and web technologies. Active in coding projects and learning modern development practices.",
      achievements: [
        "Maintained strong academic performance",
        "Completed multiple programming projects",
        "Learning full-stack development"
      ]
    },
    {
      title: "Self-Taught Developer",
      organization: "Personal Projects",
      period: "2021 - Present",
      type: "Development",
      description: "Independently learning web development technologies and building personal projects. Focused on React, TypeScript, and modern web development practices.",
      achievements: [
        "Built responsive portfolio website",
        "Learned React and TypeScript",
        "Developed problem-solving skills"
      ]
    }
  ];

  const getLevelColor = (level: SkillLevel): string => {
    switch (level) {
      case 'Advanced': return 'bg-emerald-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Basic': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll" id="exp-header">
          <p className="text-teal-400 text-lg mb-4">Explore My</p>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Experience
          </h2>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12 animate-on-scroll" id="skills-title">
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <div 
                key={category} 
                className={`animate-on-scroll transform transition-all duration-700 delay-${categoryIndex * 200} ${
                  visibleItems.has(`skill-category-${categoryIndex}`) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                id={`skill-category-${categoryIndex}`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10">
                  <h4 className="text-xl font-semibold text-white mb-6 text-center">{category}</h4>
                  <div className="space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="text-gray-200 font-medium">{skill.name}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coursework Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12 animate-on-scroll" id="coursework-title">
            Relevant Coursework
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursework.map((category, categoryIndex) => (
              <div 
                key={category.category}
                className={`animate-on-scroll transform transition-all duration-700 delay-${categoryIndex * 200} ${
                  visibleItems.has(`course-category-${categoryIndex}`) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                id={`course-category-${categoryIndex}`}
              >
                <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-teal-300 mb-4">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.courses.map((course, courseIndex) => (
                      <li key={course} className="flex items-start space-x-2">
                        <span className="text-teal-400 mt-2">•</span>
                        <span className="text-gray-300">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12 animate-on-scroll" id="timeline-title">
            Experience Timeline
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500"></div>
              
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`animate-on-scroll relative flex items-center mb-12 transform transition-all duration-700 delay-${index * 300} ${
                    visibleItems.has(`exp-${index}`) 
                      ? 'translate-x-0 opacity-100' 
                      : index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
                  }`}
                  id={`exp-${index}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-4 border-gray-900 z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'ml-auto pl-8'}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-teal-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.type === 'Education' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                        }`}>
                          {exp.type}
                        </span>
                        <span className="text-gray-400 text-sm">{exp.period}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{exp.title}</h4>
                      <p className="text-teal-400 font-semibold mb-4">{exp.organization}</p>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{exp.description}</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-400">
                            <span className="text-teal-400 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
