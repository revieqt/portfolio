import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function Projects() {
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

  return (
    <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition"
                  >
                    View Code <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition"
                  >
                    Live Demo <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
