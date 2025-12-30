import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import Chat from "./components/Chat";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
      `}</style>

      <div className="relative z-10">
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-2 px-4 z-50 flex gap-2 fixed top-5 right-16 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 hover:border hover:border-gray-400 dark:hover:border-gray-200 hover:bg-white/20 dark:hover:bg-white/10 transition shadow-lg hover:shadow-xl"
          aria-label="Toggle dark mode"
        >
          <ChatBubbleOvalLeftIcon className="w-5 h-5" />
          <p className="text-sm text-gray-700 dark:text-white/75">
            Find out more with AI
          </p>
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 z-50 fixed top-5 right-5 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 hover:border hover:border-gray-400 dark:hover:border-gray-200 hover:bg-white/20 dark:hover:bg-white/10 transition shadow-lg hover:shadow-xl"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />

        {/* <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        /> */}
      </div>
    </div>
  );
}
