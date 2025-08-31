import Logo from "../../components/Logo";
import OpenPositions from "./components/OpenPositions";
import { commonStyles } from "../../styles/commonStyles";
import { careersStyles } from "./styles";

const positions = [
  {
    title: "Front-End Developer",
    description:
      "Build beautiful interfaces and ensure a seamless experience for our users.",
  },
  {
    title: "Back-End Developer",
    description:
      "Design robust APIs, manage databases, and keep everything running smoothly.",
  },
  {
    title: "UI/UX Designer",
    description:
      "Create intuitive designs and delightful experiences for our users.",
  },
  {
    title: "QA Engineer",
    description:
      "Test, break, and improve the app to maintain the highest quality standards.",
  },
];

export default function CareersPage() {
  return (
    <main className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className={careersStyles.wrapper}>
        <Logo className={careersStyles.logo} />
        
        <h1 className={careersStyles.heading}>
          Join <span className={careersStyles.headingHighlight}>The Cantina</span>
        </h1>
        
        <p className={careersStyles.subheading}>
          Our developers are the cantina—brewing code, crafting features, and
          keeping the app running smoothly.
        </p>

        <h2 className={careersStyles.sectionTitle}>Open Positions</h2>

        <OpenPositions positions={positions} />

        <div className="text-center mt-6">
          <a href="mailto:ikiuliumov@gmail.com" className={careersStyles.applyLink}>
            Apply via email
          </a>
        </div>
      </div>
    </main>
  );
}
