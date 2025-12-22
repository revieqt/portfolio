import { Fade } from "react-awesome-reveal";
import { FaCode, FaClock, FaUsers, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden">
      <style>
        {`
          .glow-green:hover {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.1);
          }
        `}
      </style>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <p className="text-base text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              I’m a student aspiring developer with a passion for building practical, user-focused digital experiences. I enjoy turning ideas into functional applications while continuously learning new technologies and best practices.
            </p>
            <p className="text-base text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              As I grow my skills, I focus on writing clean code, solving real-world problems, and improving both performance and usability in every project I work on.
            </p>
            <p className="text-base text-gray-700 dark:text-white/75 leading-relaxed text-center lg:text-left">
              Focused on web and mobile development. I enjoy learning how things work behind the scenes and bringing ideas to life through code.
            </p>
          </div>

          <div className="space-y-4">
            <Fade direction="right" triggerOnce>
              <div className="glow-green flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-green-500">
                  <FaCode />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    10+ Projects
                  </p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    Built diverse applications from concept to production
                  </p>
                </div>
              </div>
            </Fade>
            
            <Fade direction="right" delay={100} triggerOnce>
              <div className="glow-green flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-green-500">
                  <FaClock />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    3+ Years
                  </p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    Dedicated to mastering modern web development
                  </p>
                </div>
              </div>
            </Fade>
            <Fade direction="right" delay={200} triggerOnce>
              <div className="glow-green flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-green-500">
                  <FaUsers />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    3+ Clients
                  </p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    Satisfied partners across various industries
                  </p>
                </div>
              </div>
            </Fade>

            <Fade direction="right" delay={300} triggerOnce>
              <div className="glow-green flex flex-col items-center text-center gap-4 p-4 rounded-lg border border-transparent hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 lg:items-start lg:text-left">
                <div className="text-2xl text-green-500">
                  <FaRocket />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    Expertise
                  </p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    Focus on Frontend, but has an experience in Backend development as well
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
