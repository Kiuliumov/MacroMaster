import { commonStyles } from "../commonStyles";

export default function CardWrapper({ title, children }) {
  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.card}>
        {title && <h1 className={commonStyles.title}>{title}</h1>}
        {children}
      </div>
    </div>
  );
}
