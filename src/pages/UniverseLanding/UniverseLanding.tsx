import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { BackgroundImage, Overlay, Box } from "@mantine/core";

import milky_way from "../../assets/milky-way2.jpg";

export const UniverseLanding = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    preset: "stars",
    particles: {
      number: { value: 1000, density: { enable: true, area: 400 } },
      color: { value: "#fff" },
      opacity: {
        value: 0.8,
        random: true, // each star starts with random opacity
        animation: {
          enable: true,
          speed: 2, // speed of twinkle
          minimumValue: 0.2, // min opacity during twinkle
          sync: false, // unsynchronized = natural
        },
      },
      shape: { type: "circle" },
      size: { value: 1 },
      move: { enable: true, speed: 0.3 },
    },
    detectRetina: true,
    interactivity: {
      detectsOn: "canvas", // detect cursor over canvas
      events: {
        onHover: {
          enable: true,
          mode: "grab", // other options: "grab", "bubble"
        },
        onClick: {
          enable: false,
        },
      },
      modes: {
        grab: {
          distance: 100,
          links: {
            opacity: 0.2, // line opacity
          },
        },
      },
    },
  };

  return (
    <BackgroundImage
      src={milky_way}
      style={{
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,   
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* // <Box  style={{
    //     backgroundColor: "#000", // explicit black
    //     width: "100vw",
    //     height: "100vh",
    //     minHeight: "100vh",
    //     minWidth: "100vw",
    //     margin: 0,
    //     padding: 0,
    //     position: "relative",
    //     overflow: "hidden",
    //   }}> */}
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

      {/* <Overlay color="#000" opacity={0.25} zIndex={6} /> */}
      {/* // </Box> */}
    </BackgroundImage>
  );
};
