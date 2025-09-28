import { useEffect, useState } from "react";

const REAL_INSPIRE_RANDOM = "https://api.realinspire.live/v1/quotes/random";

const fallbackQuotes = [
  { content: "Small steps every day lead to big results.", author: "" },
  { content: "Your only competition is who you were yesterday.", author: "" },
  { content: "Discipline beats motivation.", author: "" },
  { content: "Progress, not perfection.", author: "" },
];

export function useMotivationalQuote() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      try {
        const res = await fetch(REAL_INSPIRE_RANDOM);
        if (!res.ok) {
          throw new Error(`Real Inspire failed: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        
        if (Array.isArray(data) && data.length > 0) {
          const q0 = data[0];
          setQuote({ content: q0.content, author: q0.author });
        } else {
          throw new Error("Unexpected response from Real Inspire");
        }
      } catch (err) {
        console.error("Quote fetch via Real Inspire failed:", err);
        const fallback =
          fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote({ content: fallback.content, author: fallback.author });
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return { quote, loading };
}
