import styles from "./MakingProcess.module.css"
import sourcing from "../../imgs/sourcing.png";
import design from "../../imgs/design.png";
import crafting from "../../imgs/crafting.png";
import finishing from "../../imgs/finishing.png";



const MakingProcess = () => {
  const steps = [
    {
      img: sourcing,
      label: "Step 01",
      title: "Stone sourcing",
      desc: "Hand-selected from the finest mines, chosen for colour, grain & purity",
    },
    {
      img: design,
      label: "Step 02",
      title: "Design creation",
      desc: "Artisans sketch and plan each piece, honouring regional motifs & heritage patterns",
    },
    {
      img: crafting,
      label: "Step 03",
      title: "Expert crafting",
      desc: "Shaped by master artisans using tools passed through generations of craftspeople",
    },
    {
      img: finishing,
      label: "Step 04",
      title: "Final polish",
      desc: "Hand-polished to a mirror finish that reveals the stone's natural brilliance",
    },
  ];

  return (
    <section className={styles.mpSection}>
      <div className={styles.mpHeader}>
        <span className={styles.mpEyebrow}>Our craft</span>
        <h2 className={styles.mpTitle}>From earth to your hands</h2>
        <p className={styles.mpSubtitle}>
          Every piece carries the journey of skilled hands and centuries-old traditions
        </p>
      </div>

      <div className={styles.mpTrack}>
        {steps.map((step, i) => (
          <>
            <div key={i} className={styles.mpStep}>
              <div className={styles.mpImgWrap}>
                <img src={step.img} alt={step.title} />
                <span className={styles.mpBadge}>{i + 1}</span>
              </div>
              <div className={styles.mpText}>
                <p className={styles.mpStepLabel}>{step.label}</p>
                <h3 className={styles.mpStepTitle}>{step.title}</h3>
                <p className={styles.mpStepDesc}>{step.desc}</p>
              </div>
            </div>

            {/* Mobile arrow — hidden on desktop via CSS */}
            {i < steps.length - 1 && (
              <div key={`arrow-${i}`} className={styles.mpArrow}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none"
                  stroke="#c97b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 0v16M2 10l6 8 6-8" />
                </svg>
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default MakingProcess