import { useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import styles from "./UniverseLanding2.module.scss";

export const UniverseLanding2 = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (err) {
      // avoid breaking HMR if particles fail to load
      // eslint-disable-next-line no-console
      console.error("tsparticles loadFull error:", err);
    }
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 600, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.85,
        random: true,
        animation: { enable: true, speed: 1.2, minimumValue: 0.2, sync: false },
      },
      size: { value: { min: 0.5, max: 1.6 }, random: true },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      links: { enable: false },
    },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: false }, onClick: { enable: false }, resize: true },
    },
  };

  useEffect(() => {
    const prevHtmlBg = document.documentElement.style.background;
    const prevBodyBg = document.body.style.background;
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    return () => {
      document.documentElement.style.background = prevHtmlBg;
      document.body.style.background = prevBodyBg;
    };
  }, []);

  return (
    <div className={styles.universeLanding2Container} aria-hidden="true" role="presentation">
      {/* decorative blurred color layers rendered via CSS pseudo-elements in the module scss */}
      <div className={styles.vignette ?? "vignette"} />

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default UniverseLanding2;