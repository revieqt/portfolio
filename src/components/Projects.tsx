import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(1);
  const pauseCounterRef = useRef(0);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with React and Node.js featuring real-time inventory management and payment processing.",
      tags: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tags: ["React", "Firebase", "Tailwind", "WebSocket"],
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive analytics dashboard with multiple chart types, real-time data updates, and customizable visualizations.",
      tags: ["React", "Recharts", "TypeScript", "API Integration"],
      link: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Weather Forecast App",
      description: "Mobile-responsive weather application with location-based forecasts, hourly updates, and beautiful animations.",
      tags: ["React", "OpenWeather API", "Tailwind", "Geolocation"],
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
    <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Explore my latest work and innovations</p>

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
            className="flex gap-6 overflow-x-hidden pb-4 pl-32 pr-32"
            style={{ scrollBehavior: "auto" }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-96 group/card cursor-pointer transition-all duration-500 transform hover:scale-105"
              >
                <div className="h-full p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Animated Gradient Orbs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-3xl -mr-32 -mt-32 animate-pulse group-hover/card:opacity-100 opacity-60 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl -ml-32 -mb-32 animate-pulse group-hover/card:opacity-100 opacity-60 transition-opacity" style={{ animationDelay: "1s" }} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover/card:via-pink-600 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold border border-indigo-200 dark:border-indigo-800 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-gray-600 dark:text-gray-400 text-xs font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <a
                        href={project.link}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Code <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center gap-1 px-4 py-2 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 font-semibold text-sm rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Demo <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      </a>
                    </div>
                  </div>


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
