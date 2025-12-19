import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(1);
  const pauseCounterRef = useRef(0);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with React and Node.js featuring real-time inventory management and payment processing.",
      tags: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
      image: "src/assets/images/about_img.png",
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tags: ["React", "Firebase", "Tailwind", "WebSocket"],
      image: "src/assets/images/about_img.png",
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive analytics dashboard with multiple chart types, real-time data updates, and customizable visualizations.",
      tags: ["React", "Recharts", "TypeScript", "API Integration"],
      image: "src/assets/images/about_img.png",
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Weather Forecast App",
      description: "Mobile-responsive weather application with location-based forecasts, hourly updates, and beautiful animations.",
      tags: ["React", "OpenWeather API", "Tailwind", "Geolocation"],
      image: "src/assets/images/about_img.png",
      link: "https://github.com",
      demo: "https://example.com"
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const autoScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      let currentScroll = container.scrollLeft;
      
      // Add pause counter to allow direction change to settle
      if (pauseCounterRef.current > 0) {
        pauseCounterRef.current--;
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      let newScroll = currentScroll + directionRef.current * 0.5;

      // Check boundaries and reverse direction
      if (newScroll >= maxScroll) {
        directionRef.current = -1;
        pauseCounterRef.current = 5; // Pause for 5 frames
      } else if (newScroll <= 0) {
        directionRef.current = 1;
        pauseCounterRef.current = 5; // Pause for 5 frames
      }

      // Clamp the value
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));
      container.scrollLeft = newScroll;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlay]);

  const pauseAutoPlay = () => {
    setIsAutoPlay(false);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 3000);
  };

  const goToPrevious = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 384 + 24;
    container.scrollLeft = Math.max(0, container.scrollLeft - cardWidth);
    pauseAutoPlay();
  };

  const goToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 384 + 24;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollLeft = Math.min(maxScroll, container.scrollLeft + cardWidth);
    pauseAutoPlay();
  };

  return (
    <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-900 overflow-hidden h-screen">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">A collection of projects that map my growth as a developer — from early experiments to more structured, scalable applications built with intention and curiosity.</p>

        {/* Carousel Container */}
        <div 
          className="relative group" 
          onMouseEnter={() => pauseAutoPlay()} 
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Fade Gradients - Left and Right */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-hidden py-5 pl-20 pr-20"
            style={{ scrollBehavior: "auto" }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-[300px] group/card cursor-pointer transition-all duration-500 transform hover:scale-105 h-[400px]"
                onMouseEnter={() => setHoveredCard(project.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="h-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Background Image Overlay */}
                  <div className="absolute inset-0" />

                  {/* Not Hovered State - Bottom Gradient with Title and Tags */}
                  {hoveredCard !== project.title && (
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 2 && (
                            <span className="px-3 py-1 text-white text-xs font-medium">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hovered State - Glassmorphism with Full Content */}
                  {hoveredCard === project.title && (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 backdrop-blur-md bg-black/40 border border-white/20">
                      {/* Title */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-100 text-sm mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* All Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links - Bottom */}
                      <div className="flex gap-3">
                        <a
                          href={project.link}
                          className="flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-md text-white font-semibold text-sm rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Code <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                        </a>
                        <a
                          href={project.demo}
                          className="flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-md text-white font-semibold text-sm rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Demo <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 backdrop-blur-md"
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 backdrop-blur-md"
            aria-label="Next project"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
