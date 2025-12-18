import { useEffect, useRef, useState } from "react";

type SkillItem = { name: string; percent: number };
type SkillGroup = { category: string; items: SkillItem[] };

const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Javascript", percent: 90 },
      { name: "TypeScript", percent: 85 },
      { name: "Java", percent: 80 },
      { name: "PHP", percent: 60 },
      { name: "Python", percent: 35 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", percent: 90 },
      { name: "CSS", percent: 95 },
      { name: "Tailwind CSS", percent: 75 },
      { name: "React", percent: 80 },
      { name: "React Native", percent: 90 },
      { name: "Next.js", percent: 75 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", percent: 85 },
      { name: "Express", percent: 82 },
      { name: "REST APIs", percent: 75 },
      { name: "MySQL", percent: 90 },
      { name: "MongoDB", percent: 80 },
      { name: "Firebase", percent: 75 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", percent: 75 },
      { name: "Docker", percent: 60 },
      { name: "VS Code", percent: 90 },
      { name: "Postman", percent: 70 },
      { name: "Figma", percent: 80 },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Communication", percent: 80 },
      { name: "Teamwork", percent: 85 },
      { name: "Problem Solving", percent: 80 },
      { name: "Adaptability", percent: 75 },
    ],
  },
];

export default function Skills() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [categoryText, setCategoryText] = useState("");
  const [lines, setLines] = useState<
    { name: string; percent: string; bar: number }[]
  >([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    const current = SKILLS[groupIndex];

    const sleep = (ms: number) =>
      new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      setCategoryText("");
      setLines([]);

      for (const char of current.category) {
        if (cancelled) return;
        setCategoryText((prev) => prev + char);
        await sleep(60);
      }

      for (const item of current.items) {
        if (cancelled) return;

        let name = "";
        let percent = "";

        setLines((prev) => [...prev, { name: "", percent: "", bar: 0 }]);
        const index = current.items.indexOf(item);

        // Type name
        for (const char of item.name) {
          if (cancelled) return;
          name += char;
          setLines((prev) => {
            const copy = [...prev];
            copy[index].name = name;
            return copy;
          });
          await sleep(35);
        }

        // Type percent
        for (const char of `${item.percent}%`) {
          if (cancelled) return;
          percent += char;
          setLines((prev) => {
            const copy = [...prev];
            copy[index].percent = percent;
            return copy;
          });
          await sleep(40);
        }

        // Animate bar
        for (let i = 0; i <= item.percent; i++) {
          if (cancelled) return;
          setLines((prev) => {
            const copy = [...prev];
            copy[index].bar = i;
            return copy;
          });
        }
      }
    };

    run();

    const auto = setTimeout(next, 10000);

    return () => {
      cancelled = true;
      clearTimeout(auto);
    };
  }, [groupIndex, visible]);

  const next = () =>
    setGroupIndex((i) => (i + 1) % SKILLS.length);
  const prev = () =>
    setGroupIndex((i) => (i === 0 ? SKILLS.length - 1 : i - 1));

  return (
    <section
      ref={ref}
      className="relative bg-gray-50 dark:bg-gray-900 py-20 px-3"
    >
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
        
        <div className="px-3">
          <h2 className="text-5xl font-bold mb-6">Skills</h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            Every skill here tells a story of growth, exploration, and curiosity. Together, they map the journey I take from concept to execution.
          </p>

          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, i) => (
              <button
                key={skill.category}
                onClick={() => setGroupIndex(i)}
                className={`
                  px-4 py-2 rounded-lg font-mono text-sm transition
                  border
                  ${
                    groupIndex === i
                      ? "bg-green-500/10 text-green-400 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.35)]"
                      : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400 hover:text-green-400"
                  }
                `}
              >
                {skill.category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl bg-black p-6 font-mono text-sm text-green-400 h-[550px]">
            <div className="mb-4 flex justify-between text-xs text-green-500">
              <span>&gt; skills/{categoryText}</span>
              <div className="flex gap-4">
                <button onClick={prev} className="hover:underline">
                  Previous
                </button>
                <button onClick={next} className="hover:underline">
                  Next
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {lines.map((line, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <span>{line.name}</span>
                    <span>{line.percent}</span>
                  </div>

                  <div className="mt-1 h-1.5 bg-green-900/40 rounded">
                    <div
                      className="h-full bg-green-400 rounded transition-all"
                      style={{ width: `${line.bar}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
        </div>
      </div>
    </section>
  );
}
