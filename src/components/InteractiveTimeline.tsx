import { useState, useEffect } from 'react';

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timelineEvents = [
    {
      date: "2025",
      title: "Software Engineer Intern",
      company: "Mahamed Konsulting",
      type: "work",
      details: "Built responsive web platform with React and Node.js",
      achievements: ["500+ users", "99.9% uptime", "AWS deployment"]
    },
    {
      date: "2024-2025",
      title: "Computer Science Student",
      company: "Ohio State University",
      type: "education",
      details: "Pursuing Bachelor's in Computer Science",
      achievements: ["3.8 GPA", "Dean's List", "Research Assistant"]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          My Journey
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-start transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-gray-900 z-10"></div>

                {/* Event Card */}
                <div 
                  className="ml-20 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-teal-400/30 hover:border-teal-400 cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      <p className="text-teal-400 font-medium">{event.company}</p>
                    </div>
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.date}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">{event.details}</p>

                  {selectedEvent === index && (
                    <div className="pt-4 border-t border-gray-700 animate-slideDown">
                      <h4 className="text-teal-400 font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {event.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-300 flex items-center text-sm">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;