import { Fade } from "react-awesome-reveal";
import { FaCode, FaClock, FaUsers, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <section className="relative py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle animated glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-glow-slow" />
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glower" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left: Description */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              I'm a passionate full-stack developer crafting digital experiences that are both beautiful and functional.
            </p>
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              With expertise in modern web technologies, I build responsive applications that solve real problems and delight users.
            </p>
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              When I'm not coding, I'm exploring new technologies and contributing to the developer community.
            </p>
          </div>

          {/* Right: Stats - Inline layout */}
          <div className="space-y-4">
            <Fade direction="right" triggerOnce>
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-pink-500">
                  <FaCode />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    25+ Projects
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Built diverse applications from concept to production
                  </p>
                </div>
              </div>
            </Fade>
            
            <Fade direction="right" delay={100} triggerOnce>
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-pink-500">
                  <FaClock />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    5+ Years
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Dedicated to mastering modern web development
                  </p>
                </div>
              </div>
            </Fade>
            {/* Experience */}
            

            {/* Clients */}
            <Fade direction="right" delay={200} triggerOnce>
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-pink-500">
                  <FaUsers />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    40+ Clients
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Satisfied partners across various industries
                  </p>
                </div>
              </div>
            </Fade>

            {/* Expertise */}
            <Fade direction="right" delay={300} triggerOnce>
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-pink-500">
                  <FaRocket />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    Full Stack
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Frontend, backend, and everything in between
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes glow-slow {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            50% { transform: translate(20px, -10px) scale(1.05); opacity: 0.9; }
          }
          @keyframes glow-slower {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(-15px, 15px) scale(1.1); opacity: 0.8; }
          }
          .animate-glow-slow { animation: glow-slow 8s ease-in-out infinite; }
          .animate-glower { animation: glow-slower 12s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}
