import { useEffect, useState } from "react";
import heroImg from "@/assets/images/hero_img.png";
import heroBg from "@/assets/images/hero_bg.png";

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const textOptions = [
    "<> Aspiring Developer </>",
    "<> Creative Thinker </>",
    "<> Keyboard Apprentice </>",
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
    <section className="h-screen w-full relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(128, 128, 128, 0.15) 25%, rgba(128, 128, 128, 0.15) 26%, transparent 27%, transparent 74%, rgba(128, 128, 128, 0.15) 75%, rgba(128, 128, 128, 0.15) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(128, 128, 128, 0.15) 25%, rgba(128, 128, 128, 0.15) 26%, transparent 27%, transparent 74%, rgba(128, 128, 128, 0.15) 75%, rgba(128, 128, 128, 0.15) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 grayscale"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: 'skewY(10deg)'
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-4/5 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 pointer-events-none z-30" />
      <div className="relative h-screen overflow-hidden mx-auto max-w-7xl flex items-center justify-center">

        {/* MOBILE */}
        <div className="lg:hidden relative h-full flex flex-col justify-between items-center px-4">
          <div className="absolute inset-0 flex items-center justify-center z-0 mt-20">
            <img
              src={heroImg}
              alt="Hero"
              className="h-full w-auto object-cover drop-shadow-2xl"
            />
          </div>

          <div className="relative z-50 mt-auto mb-16 text-center px-4">
            <div
              className={`transition-all duration-1000 ease-out ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-5xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white/90 mb-4">
                Josh Opsima
              </h1>
              <p className="text-lg text-gray-700 dark:text-white/75 mb-4">
                <span className="font-semibold font-mono text-green-600">{displayText}</span><span className="animate-pulse text-green-500">|</span>
              </p>

              <nav className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                <a href="#about" onClick={handleNavClick} className="text-gray-500 text-sm dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">About</a>
                <span className="text-gray-500 dark:text-white/90">·</span>
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
        </div>

        <div className="hidden lg:flex relative h-full">
          <div className="absolute left-0 z-20 flex items-center justify-center h-full mt-20">
            <img
              src={heroImg}
              alt="Hero"
              className="h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="ml-auto pr-8 z-10 ml-[280px] flex h-full items-center justify-end">
            <div
              className={`transition-all duration-1000 ease-out ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-9xl ml-20 pl-20 font-extrabold uppercase tracking-widest text-gray-900 dark:text-white/90 mb-6 text-right">
                Josh Opsima
              </h1>
              <div className="ml-20 pl-8">
                <p className="text-xl text-gray-700 dark:text-white/75 mb-8 leading-relaxed text-right">
                  <span className="font-semibold font-mono text-green-500">{displayText}</span><span className="animate-pulse text-green-500">|</span>  based in the Philippines.
                </p>

                <nav className="flex gap-6 text-lg justify-end">
                  <a href="#about" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">About</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#skills" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Skills</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#certifications" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Certifications</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#projects" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Projects</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#contact" onClick={handleNavClick} className="text-gray-500 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Contact</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
}
