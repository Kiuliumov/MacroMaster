import React, { useEffect, useRef, useState } from "react";

export default function AnimatedStats({ stats }) {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    const animateCount = (index, target) => {
      const duration = 2000;
      const step = (timestamp, startTime) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCounters((prev) =>
          prev.map((val, i) => (i === index ? Math.floor(progress * target) : val))
        );
        if (progress < 1) {
          requestAnimationFrame((ts) => step(ts, startTime));
        }
      };
      requestAnimationFrame(step);
    };

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => animateCount(index, stat.value));
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, [stats]);

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-6 text-center mt-16">
      {stats.map((stat, i) => (
        <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className={`text-4xl font-extrabold ${stat.color}`}>{counters[i]}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
