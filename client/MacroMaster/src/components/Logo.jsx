import logo from "../assets/MacroMaster.png";

export default function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center space-x-2">
      <img className="h-8 w-8" src={logo} alt="MacroMaster Logo" />
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        MacroMaster
      </span>
    </div>
  );
}
