import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { Box } from "@mantine/core";
import * as THREE from "three";
import styles from "./UniverseLanding3.module.scss";

function Nebula() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.1 },
      uScale: { value: 6.0 }, // controls blob size (higher = smaller details)
      uWarp: { value: 0.4 }, // domain warp amount (0 = no warp)
      uSpeed: { value: 0.5 }, // global speed multiplier
    }),
    []
  );
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { camera, size } = useThree();

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;

    // scale plane to always fill camera frustum
    const distance = Math.abs(camera.position.z - (meshRef.current?.position.z ?? 0));
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const height = 2 * distance * Math.tan(fov / 2);
    const width = height * (size.width / size.height || 1);
    if (meshRef.current) meshRef.current.scale.set(width, height, 1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScale;
          uniform float uWarp;
          uniform float uSpeed;

          // hash / noise / fbm (unchanged)
          float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
          float noise(vec2 p){
            vec2 i=floor(p), f=fract(p);
            float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
            vec2 u=f*f*(3.0-2.0*f);
            return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
          }

          float fbm(vec2 p){
            float v=0.0;
            float amp=0.5;
            float freq=1.0;
            // 6 octaves - change loop count to alter shape richness
            for(int i=0;i<6;i++){
              v += amp * noise(p * freq);
              freq *= 2.0;
              amp *= 0.5;
            }
            return v;
          }

          // rotate UV helper
          mat2 rotate(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
          }

          void main(){
            // base uv + scale
            vec2 uv = (vUv - 0.5) * uScale;

            // apply a slow global rotation for organic motion
            float rot = 0.08 * sin(uTime * 0.2 * uSpeed);
            uv = rotate(rot) * uv;

            // domain warp: perturb uv using small fbm calls
            vec2 warp = vec2(fbm(uv + 0.13), fbm(uv + 7.13));
            vec2 q = uv + uWarp * warp;

            // final noise that defines blob shapes
            float t = uTime * uSpeed;
            float n = fbm(q + vec2(t * 0.1, t * 0.3));
            float movement = fbm(q + vec2(t * 0.4, -t * 0.3)) * 0.5 + 0.5;
            n = mix(n, movement, 0.5);

            // tweak contrast/threshold to make shapes harder/softer
            n = smoothstep(0.15, 0.85, n);

            // colors (unchanged)
            vec3 color1 = vec3(0.005, 0.005, 0.03);  // very near-black blue
            vec3 color2 = vec3(0.03, 0.0, 0.15);     // darker deep purple
            vec3 color3 = vec3(0.0, 0.05, 0.2);      // darker cold blue
            vec3 color4 = vec3(0.1, 0.08, 0.35);     // subdued violet glow

            vec3 color = mix(color1, color2, n);
            color = mix(color, color3, smoothstep(0.3,0.9,abs(sin(t + n*3.0))));
            color = mix(color, color4, smoothstep(0.5,1.0,n*1.2));

            gl_FragColor = vec4(color,1.0);
          }
        `}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function UniverseLanding3() {
  const [ParticlesComp, setParticlesComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let mounted = true;
    import("react-tsparticles").then((mod) => {
      if (mounted) setParticlesComp(() => mod.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (e) {
      // avoid breaking HMR if tsparticles fails to load
      // eslint-disable-next-line no-console
      console.error("tsparticles loadFull error:", e);
    }
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    preset: "stars",
    particles: {
      number: { value: 1000, density: { enable: true, area: 400 } },
      color: { value: "#fff" },
      opacity: { value: 0.8, random: true, animation: { enable: true, speed: 2, minimumValue: 0.2, sync: false } },
      shape: { type: "circle" },
      size: { value: 1 },
      move: { enable: true, speed: 0.3 },
    },
    detectRetina: true,
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: false } },
      modes: { grab: { distance: 100, links: { opacity: 0.2 } } },
    },
  };

  return (
    <Box className={styles["nebula-background"]} style={{ margin: 0, padding: 0 }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }} style={{ width: "100%", height: "100%", display: "block" }}>
        <Nebula />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* particles canvas fills container; component loaded dynamically to avoid import/runtime issues */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }} aria-hidden>
        {ParticlesComp ? (
          <ParticlesComp
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        ) : null}
      </div>
    </Box>
  );
}