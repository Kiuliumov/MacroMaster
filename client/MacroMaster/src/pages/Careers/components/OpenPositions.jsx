import CareerCard from "./CareerCard";
import "./OpenPositions.css";
import { careersStyles } from "../styles";

export default function OpenPositions({ positions }) {
  return (
    <div className={careersStyles.container}>
      <div className={careersStyles.scrollWrapper}>
        {positions.concat(positions).map((pos, idx) => (
          <CareerCard key={idx} {...pos} />
        ))}
      </div>
    </div>
  );
}
