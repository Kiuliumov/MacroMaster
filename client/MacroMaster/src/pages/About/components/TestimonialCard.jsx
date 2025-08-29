
export default function TestimonialCard({ text, author }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{text}</p>
      <span className="font-semibold">{author}</span>
    </div>
  );
}
