import Logo from "../../../components/Logo";
import { styles } from "../styles";

export default function Header() {
  return (
    <div className={styles.header.wrapper}>
      <div className={styles.header.logoWrapper}>
        <Logo className={styles.header.logo} />
      </div>
      <h1 className={styles.header.title}>
        About <span className={styles.header.titleHighlight}>MacroMaster</span>
      </h1>
      <p className={styles.header.subtitle}>
        MacroMaster is designed to make nutrition tracking simple, accurate,
        and engaging. Whether you're managing weight, building muscle, or just
        eating healthier, we’ve got you covered.
      </p>
    </div>
  );
}
