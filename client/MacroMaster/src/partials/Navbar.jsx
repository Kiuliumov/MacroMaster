export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
              alt="Company Logo"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
