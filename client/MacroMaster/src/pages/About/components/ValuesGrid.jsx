import { Heart, Star, PieChart } from "lucide-react";
import ValueCard from "./ValueCard";

export default function ValuesGrid() {
  const values = [
    { Icon: Heart, title: "Health First", text: "We prioritize user health by providing accurate and actionable nutrition data.", color: "text-red-500" },
    { Icon: Star, title: "Quality & Accuracy", text: "Reliable food databases and smart tracking features for consistent results.", color: "text-yellow-400" },
    { Icon: PieChart, title: "Empowerment", text: "Help users understand their nutrition and take control of their health journey.", color: "text-green-500" },
  ];

  return (
    <div className="mt-16 max-w-5xl w-full text-center">
      <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, idx) => (
          <ValueCard key={idx} {...value} />
        ))}
      </div>
    </div>
  );
}
