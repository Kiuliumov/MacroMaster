import { supportStyles } from "../styles";

export default function OfficeLocation() {
  return (
    <div className={supportStyles.mapCard}>
      <div className={supportStyles.mapHeader}>
        <h2 className={supportStyles.mapTitle}>📍 Office Location</h2>
        <p className={supportStyles.mapSubtitle}>
          Come visit us at our central office
        </p>
      </div>

      <div className={supportStyles.mapContainer}>
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.123456789!2d24.74500031567645!3d42.14250047918752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd7d528c6a0d5%3A0x1fddcbd896bd8a2f!2sCentral%20Square%2C%20Plovdiv!5e0!3m2!1sen!2sus!4v1692909999999!5m2!1sen!2sus"
          className={supportStyles.mapFrame}
          allowFullScreen
          loading="lazy"
          style={{ filter: "var(--map-filter)" }}
        ></iframe>
      </div>

      <div className={supportStyles.mapFooter}>
        Central Square, Plovdiv, Bulgaria
      </div>
    </div>
  );
}
