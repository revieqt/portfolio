import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent! Thank you.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

  return (
    <Fade direction="right">

      <section id="contact" className="relative py-20 px-3">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
        
        <div className="px-3">
          <h2 className="text-4xl font-extrabold mb-6 text-center lg:text-left">Get In Touch</h2>

          <p className="text-gray-600 dark:text-gray-400 lg:max-w-md mb-8 text-center lg:text-left">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>

          <div className="flex flex-row gap-5 justify-center lg:flex-col">
            <a
              href="mailto:revie.dev@gmail.com"
              className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <EnvelopeIcon className="w-6 h-6" /> 
              <span className="hidden lg:inline">
                revie.dev@gmail.com
              </span>
            </a>
            <a
              href="https://github.com/revieqt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <FaGithub className="w-6 h-6" /> 
              <span className="hidden lg:inline">revieqt</span>
            </a>
            <a
              href="https://linkedin.com/in/joshua-opsima-09a3a7316"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <FaLinkedin className="w-6 h-6" /> 
              <span className="hidden lg:inline">Joshua Opsima</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <div>
              <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 block">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Send Message
            </button>
            {status && <p className="mt-2 text-center text-sm text-gray-700 dark:text-gray-300">{status}</p>}
          </form>

          <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50/50 dark:from-gray-900/50 to-transparent" />
        </div>
      </div>
    </section>
    </Fade>
    
  );
}
