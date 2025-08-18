export default function SocialIcon({ path, href = "#" }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 dark:bg-gray-700 rounded-full w-7 h-7 hover:bg-blue-600 dark:hover:bg-blue-500 focus:bg-blue-600 dark:focus:bg-blue-500"
    >
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={path}></path>
      </svg>
    </a>
  );
}
