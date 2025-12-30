/* =========================================================
   PORTFOLIO KNOWLEDGE BASE (MARKDOWN ENABLED)
   ========================================================= */

const PORTFOLIO_DATA = [
  {
    id: "about",
    text: `
### 👋 About Me
I’m **Josh Opsima**, a student developer based in the **Philippines**.
I specialize in **React**, **React Native**, and **full-stack development**.
`
  },
  {
    id: "projects",
    text: `
### 🚀 Projects
I built **TaraG**, a travel companion app featuring:
- 🗺️ Maps & routing
- ☁️ Weather forecasts
- 👥 Group trips & itineraries
- 🚨 Emergency alerts
- 📡 Offline support  

Built with **React Native**, **Firebase**, and **Node.js**.
`
  },
  {
    id: "skills",
    text: `
### 🛠️ Skills
- **Frontend:** React, TypeScript, Tailwind CSS
- **Mobile:** React Native, Expo
- **Backend:** Node.js, Firebase
- **Design:** UI / UX
`
  },
  {
    id: "goals",
    text: `
### 🎯 Goals
I’m currently seeking **internship / OJT opportunities**
to gain real-world experience and grow as a software developer.
`
  },
  {
    id: "contact",
    text: `
### 📬 Contact
You can reach me through:
- 🌐 My portfolio website
- 💼 LinkedIn
- ✉️ Email
`
  }
];

/* =========================================================
   SEMANTIC SEARCH UTILITIES
   ========================================================= */

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function textToVector(text: string): Record<string, number> {
  const vec: Record<string, number> = {};
  for (const w of normalize(text)) vec[w] = (vec[w] || 0) + 1;
  return vec;
}

function cosineSimilarity(
  a: Record<string, number>,
  b: Record<string, number>
): number {
  let dot = 0, magA = 0, magB = 0;

  for (const k in a) {
    magA += a[k] ** 2;
    if (b[k]) dot += a[k] * b[k];
  }
  for (const k in b) magB += b[k] ** 2;

  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/* =========================================================
   OPTIONAL OPEN-SOURCE LLM REWRITE (PLUG-IN)
   ========================================================= */

/*
  To enable:
  - Deploy a Hugging Face Space (free)
  - Replace URL below
  - If unavailable, system gracefully skips rewrite
*/
async function rewriteWithLLM(
  question: string,
  content: string
): Promise<string> {
  try {
    const res = await fetch("https://your-hf-space-url.hf.space/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        content
      })
    });

    if (!res.ok) return content;
    const data = await res.json();
    return data.text || content;
  } catch {
    return content; // fallback if LLM is offline
  }
}

/* =========================================================
   API HANDLER
   ========================================================= */

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Invalid message" }), {
      status: 400
    });
  }

  const userVec = textToVector(message);

  // Score all entries
  const scored = PORTFOLIO_DATA.map(entry => {
    const score = cosineSimilarity(
      userVec,
      textToVector(entry.text)
    );
    return { ...entry, score };
  })
    .filter(e => e.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // 🔥 MULTI-ANSWER BLENDING

  let combinedAnswer = scored
    .map(e => e.text.trim())
    .join("\n\n---\n\n");

  const confidence =
    scored.reduce((acc, cur) => acc + cur.score, 0) /
    (scored.length || 1);

  // ✨ Optional rewrite (still free)
  combinedAnswer = await rewriteWithLLM(
    message,
    combinedAnswer
  );

  /* =========================================================
     CONFIDENCE-BASED FOLLOW-UP
     ========================================================= */

  let followUp = "";
  if (confidence < 0.25) {
    followUp = `
---

🤔 *Want to know more?*
Try asking about:
- My **projects**
- My **tech stack**
- My **career goals**
`;
  } else if (confidence < 0.45) {
    followUp = `
---

👉 *You can also ask about my experience or tools I use.*
`;
  }

  return new Response(
    JSON.stringify({
      reply: combinedAnswer + followUp,
      confidence: Number(confidence.toFixed(2)),
      matchedTopics: scored.map(s => s.id),
      format: "markdown"
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
