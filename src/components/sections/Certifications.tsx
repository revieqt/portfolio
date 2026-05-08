import { Fade } from "react-awesome-reveal";

export default function Certifications() {
  const certifications = [
    {
      year: "2025",
      items: [
        {
          title: "Champion, Web Design",
          issuer: "St. Cecilia's College IT Congress",
        },
        {
          title: "Runner-Up, Computer Programming",
          issuer: "St. Cecilia's College IT Congress",
        },
      ],
    },
    {
      year: "2024",
      items: [
        {
          title: "Basic Fiber Optic Installation Seminar",
          issuer: "St. Cecilia's College",
        },
        {
          title: "CSS NC II, Competency in Units 1-3",
          issuer: "TESDA",
        },
        {
          title: "Cebu ICT Congress Seminar",
          issuer: "PSITE",
        },
        {
          title: "Runner-Up, Computer Programming",
          issuer: "St. Cecilia's College IT Congress",
        },
      ],
    },
    {
      year: "2023",
      items: [
        {
          title: "Dean's Honor Roll",
          issuer: "St. Cecilia's College",
        },
        {
          title: "Champion, Computer Programming",
          issuer: "St. Cecilia's College IT Congress",
        },
      ],
    },
    {
      year: "2022",
      items: [
        {
          title: "Dean's Honor Roll",
          issuer: "St. Cecilia's College",
        },
      ],
    }
  ];

  return (
    <section id="certifications" className="relative py-24 px-4 overflow-hidden">
      <style>
        {`
          .glow-green:hover {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.1);
          }
        `}
      </style>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white/90 mb-16 text-center">
          Certifications & Awards
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500/50 to-cyan-500/50 hidden sm:block" />
          <div className="space-y-12">
            {certifications.map((yearGroup, index) => {
              const isEven = index % 2 === 0;

              return (
                <Fade key={index} direction={isEven ? "right" : "left"} delay={index * 100} triggerOnce>
                  <div className={`flex ${isEven ? "sm:flex-row-reverse" : "sm:flex-row"} flex-col items-center gap-8`}>
                    <div className={`w-full sm:w-1/2 ${isEven ? "sm:text-right" : "sm:text-left"} text-center`}>
                      <div className="glow-green border border-gray-200 dark:border-white/10 rounded-lg p-6 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300">
                        <p className="text-sm uppercase tracking-widest font-bold text-green-500 mb-4">
                          {yearGroup.year}
                        </p>
                        <div className="space-y-4">
                          {yearGroup.items.map((cert, certIndex) => (
                            <div key={certIndex}>
                              <h3 className="text-base font-bold text-gray-900 dark:text-white/90 mb-2">
                                {cert.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-white/60">
                                {cert.issuer}
                              </p>
                              {certIndex < yearGroup.items.length - 1 && (
                                <div className="mt-4 border-t border-gray-200 dark:border-white/10" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 relative">
                      <div className="w-4 h-4 rounded-full bg-green-500 z-10 border-4 border-white dark:border-gray-900"></div>
                    </div>

                    <div className="w-full sm:w-1/2" />
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
