import { useEffect, useState } from "react";
import { FaCode, FaClock, FaUsers } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { useIsMobile } from "@/hooks/useIsMobile"

type HeroProps = {
  setIsGalleryOpen: () => void;
};

export default function Hero({ setIsGalleryOpen }: HeroProps) {
  const isMobile = useIsMobile();
  const [textVisible, setTextVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const textOptions = [
    "<> Full-Stack Developer </>",
    "<> Creative Thinker </>",
    "<> Emerging Innovator </>",
  ];

  useEffect(() => {
    setTextVisible(true);
  }, []);


  useEffect(() => {
    let charIndex = 0;
    let isTyping = true;

    const typeText = async () => {
      const currentText = textOptions[textIndex];
      while (isTyping && charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));

      setTextIndex((prev) => (prev + 1) % textOptions.length);
      charIndex = 0;
    };

    typeText();

    return () => {
      isTyping = false;
    };
  }, [textIndex]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="hero"className="w-full relative">
      <style>
        {`
        @keyframes meshDrift {
          0% {
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
          50% {
            background-position: 100% 50%, 0% 50%, 50% 100%;
          }
          100% {
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
        }

        .typing-glow {
          text-shadow: 0 0 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.4);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.15) 55%,
            rgba(255, 255, 255, 0.40) 78%,
            rgba(255, 255, 255, 0.70) 100%
          );
        }

        .dark .hero-overlay {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 35%,
            rgba(0, 0, 0, 0.40) 55%,
            rgba(0, 0, 0, 0.70) 78%,
            rgba(0, 0, 0, 1) 100%
          );
        }
        `}
      </style>

      <div
        className="absolute inset-0 z-0 bg-white dark:bg-gray-900"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(45,212,191,0.45), transparent 55%),
            radial-gradient(at 80% 20%, rgba(34,211,238,0.45), transparent 55%),
            radial-gradient(at 50% 80%, rgba(52,211,153,0.45), transparent 55%)
          `,
          backgroundSize: "220% 220%",
          animation: "meshDrift 40s ease-in-out infinite",
        }}
      />

      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(128, 128, 128, 0.15) 25%, rgba(128, 128, 128, 0.15) 26%, transparent 27%, transparent 74%, rgba(128, 128, 128, 0.15) 75%, rgba(128, 128, 128, 0.15) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(128, 128, 128, 0.15) 25%, rgba(128, 128, 128, 0.15) 26%, transparent 27%, transparent 74%, rgba(128, 128, 128, 0.15) 75%, rgba(128, 128, 128,0.15) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 grayscale blur-sm"
        style={{ 
          backgroundImage: `url(/hero-assets/hero_bg.png)`,
        }}
      />
      
      
      
      
      
      
      
      { isMobile && 
      <div className="relative max-w-7xl justify-center items-center mx-auto">

        {/* MOBILE */}
        <div className="relative h-screen flex flex-col justify-between items-center px-4 justify-center mx-auto items-center">
          <div className="absolute inset-0 flex items-center justify-center z-0 mt-20">
            <img
              src="/hero-assets/hero_img.png"
              alt="Hero"
              className="h-full object-cover"
            />
          </div>

          <div className="relative z-50 mt-auto mb-20 text-center px-4 mx-auto">
            <div
              className={`transition-all duration-1000 ease-out ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-gray-700 dark:text-white/75 mb-2">
                <span className="font-semibold font-mono text-green-600 typing-glow">{displayText}</span><span className="animate-pulse text-green-500">|</span>
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white/90 mb-4">
                Josh Opsima
              </h1>
              

              <nav className="flex flex-wrap justify-center gap-3 text-sm sm:text-base font-mono">
                <a href="#skills" onClick={handleNavClick} className="text-gray-500 text-sm dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Skills</a>
                <span className="text-gray-500 dark:text-white/90">·</span>
                <a href="#certifications" onClick={handleNavClick} className="text-gray-500 text-sm dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Certifications</a>
                <span className="text-gray-500 dark:text-white/90">·</span>
                <a href="#projects" onClick={handleNavClick} className="text-gray-500 text-sm dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Projects</a>
                <span className="text-gray-500 dark:text-white/90">·</span>
                <a href="#contact" onClick={handleNavClick} className="text-gray-500 text-sm dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Contact</a>
              </nav>
              
            </div>
          </div>
          <div className="hero-overlay" />
          <div className="absolute bottom-0 left-0 right-0 h-[100%] bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 pointer-events-none z-30" />
              
        </div>

        <div className="z-20 w-full px-8 z-50 justify-center bg-white dark:bg-gray-900 ">
          <p className="text-gray-700 dark:text-white/75 mb-6 leading-relaxed font-mono text-center">
            A Full-Stack Developer with a passion for building practical, user-focused digital experiences. 
          </p>
          <div className=" flex-row items-center justify-around gap-6">
            <Fade direction="right" triggerOnce>
              <a href="#projects" className="mb-4 glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                <div className="text-2xl text-green-500">
                  <FaCode />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    10+ Projects
                  </p>
                  <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                    Built diverse applications from concept to production
                  </p>
                </div>
              </a>
            </Fade>
            
            <Fade direction="right" delay={100} triggerOnce>
              <a href="#skills" className="mb-4 glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                <div className="text-2xl text-green-500">
                  <FaClock />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    4+ Years
                  </p>
                  <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                    Dedicated to honing modern development skills.
                  </p>
                </div>
              </a>
            </Fade>
            <Fade direction="right" delay={200} triggerOnce>
              <a href="#certifications" className="mb-4 glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                <div className="text-2xl text-green-500">
                  <FaUsers />
                </div>
                <div>
                  <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                    Awarded
                  </p>
                  <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                    Graduated with recognition for Excellence in Computer Programming and Software Development
                  </p>
                </div>
              </a>
            </Fade>
          </div>

          <button
            onClick={() => setIsGalleryOpen()}
            className="w-full hover:underline px-4 pt-4 pb-6 rounded-lg font-mono text-sm font-semibold flex items-center justify-center gap-2 text-green-500 "
          >
            /View Josh's Gallery
          </button>
          
        </div>
        </div>
      }

      {!isMobile &&
      <div className="w-full h-screen relative">
        <div className="relative h-screen overflow-hidden max-w-7xl flex justify-center items-center mx-auto">
          <div className="hidden lg:flex h-full mx-auto justify-between">
            <div className="justify-start items-center z-10 pt-20 px-8">
              <p className="text-xl text-gray-700 dark:text-white/75 mb-2 leading-relaxed">
                <span className="font-semibold font-mono text-green-500 typing-glow">{displayText}</span><span className="animate-pulse text-green-500">|</span>
              </p>
              <h1 className="text-8xl font-extrabold text-gray-900 dark:text-white/90 mb-6">
                Josh Opsima
              </h1>
              <p className="text-lg text-gray-700 dark:text-white/75 mb-4 leading-relaxed font-mono mr-[400px]">
                A Full-Stack Developer with a passion for building practical, user-focused digital experiences. 
              </p>

              <nav className="flex gap-4 text-lg font-mono">
                <a href="#skills" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:underline transition-colors duration-300">Skills</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#projects" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:underline transition-colors duration-300">Projects</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#certifications" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:underline transition-colors duration-300">Certifications</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#contact" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:underline transition-colors duration-300">Contact</a>
              </nav>
              
            </div>
            
            <div className="absolute right-0 z-20 flex items-center justify-center h-full mt-20">
              <img
                src="/hero-assets/hero_img.png"
                alt="Hero"
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="absolute bottom-0 z-20 w-full px-8 z-50 mb-2 justify-center items-center">
              <div className=" flex items-center justify-around gap-6">
                <Fade direction="right" triggerOnce>
                  <a href="#projects" className="glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                    <div className="text-2xl text-green-500">
                      <FaCode />
                    </div>
                    <div>
                      <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                        10+ Projects
                      </p>
                      <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                        Built diverse applications from concept to production
                      </p>
                    </div>
                  </a>
                </Fade>
                
                <Fade direction="right" delay={100} triggerOnce>
                  <a href="#skills" className="glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                    <div className="text-2xl text-green-500">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                        4+ Years
                      </p>
                      <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                        Dedicated to honing modern development skills.
                      </p>
                    </div>
                  </a>
                </Fade>
                <Fade direction="right" delay={200} triggerOnce>
                  
                  <a href="#certifications" className="glow-green flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/30 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 lg:items-start lg:text-left backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/[0.02] shadow-xl hover:shadow-green-500/20">
                    <div className="text-2xl text-green-500">
                      <FaUsers />
                    </div>
                    <div>
                      <p className="text-base uppercase tracking-widest font-bold text-gray-900 dark:text-white/90 mb-1">
                        Awarded
                      </p>
                      <p className="font-mono text-gray-600 dark:text-white/60 text-sm">
                        Graduated with recognition for Excellence in Computer Programming and Software Development
                      </p>
                    </div>
                  </a>
                </Fade>
              </div>

              <button
                onClick={() => setIsGalleryOpen()}
                className="w-full hover:underline px-4 py-6 rounded-lg font-mono text-sm font-semibold flex items-center justify-center gap-2 text-green-500 "
              >
                /View Josh's Gallery
              </button>
              
            </div>
          </div>
          
        </div>
        <div className="hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-[100%] bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 pointer-events-none z-30" />
      </div>
        
      }
      
      
      
      
      
  </section>
  );
}