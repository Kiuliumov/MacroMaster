import React from "react";
import CareerCard from "./CareerCard";

export default function OpenPositions({ positions }) {
  return (
    <div className="relative w-full max-w-6xl overflow-hidden py-3 flex justify-center">
      <div className="flex animate-scroll gap-6 w-max">
        {positions.concat(positions).map((pos, idx) => (
          <CareerCard key={idx} {...pos} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
