import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

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
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">Let's Work Together</h2>
        <p className="text-xl text-indigo-100 mb-12">
          I'm always interested in hearing about new projects and opportunities.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12 text-left bg-white rounded-lg p-8 shadow-lg max-w-xl mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full h-32"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            <EnvelopeIcon className="w-5 h-5" /> Send Message
          </button>
          {status && <p className="mt-2 text-center text-sm text-gray-700">{status}</p>}
        </form>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="mailto:josh@example.com"
            className="flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            <EnvelopeIcon className="w-5 h-5" /> Send Email
          </a>
          <a
            href="https://github.com"
            className="flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            className="flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
