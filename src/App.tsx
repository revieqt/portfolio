import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, ChatBubbleOvalLeftIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import Gallery from "./components/Gallery";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .animate-slide-in {
          animation: slideInUp 0.3s ease-out;
        }
        .animate-slide-out {
          animation: slideOut 0.3s ease-out;
        }
        .menu-link-glow:hover {
          color: rgb(34, 197, 94);
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.6), 0 0 15px rgba(34, 197, 94, 0.4);
        }
        .button-glow:hover {
          color: rgb(34, 197, 94);
        }
      `}</style>

      <div className="relative z-10">
        <div className="fixed top-0 right-0 p-4 flex space-x-2 z-40">
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition shadow-lg hover:shadow-xl animate-slide-in button-glow"
            style={{
              transition: "transform 0.3s ease-out"
            }}
            aria-label="Find out more with AI"
          >
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition shadow-lg hover:shadow-xl animate-slide-in button-glow"
            style={{
              transition: "transform 0.3s ease-out"
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          {isScrolledPastHero && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition shadow-lg hover:shadow-xl animate-slide-in relative z-10 button-glow"
                aria-label="Menu"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>

              {isMenuOpen && (
                <div className={`absolute top-full right-0 mt-2 w-48 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-gray-400/20 dark:border-gray-200/20 rounded-lg shadow-lg ${
                  isMenuOpen ? "animate-slide-in" : "animate-slide-out"
                }`}>
                  <nav className="p-4 space-y-2">
                    <a
                      href="#hero"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      Home
                    </a>
                    <a
                      href="#about"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      About
                    </a>
                    <a
                      href="#skills"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      Skills
                    </a>
                    <a
                      href="#certifications"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      Certifications
                    </a>
                    <a
                      href="#projects"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      Projects
                    </a>
                    <a
                      href="#contact"
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white/75 transition-all rounded menu-link-glow"
                    >
                      Contact
                    </a>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
        
        
        <Hero />
        <About 
         setIsGalleryOpen={() => setIsGalleryOpen(true)}
        />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />

        {isGalleryOpen && (
          <Gallery onClose={() => setIsGalleryOpen(false)} />
        )}

        <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </div>
  );
}
