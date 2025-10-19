import { Group, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./HeaderNav.module.scss";

export const HeaderNav = ({ onNavigate }: { onNavigate?: (page: "landing" | "landing3") => void }) => {
  return (
    <>
      <div className={styles.hotspot} aria-hidden />
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <Group className={styles.group}>
          <Anchor component="button" className={styles.link} onClick={() => onNavigate?.("landing")}>
            Home
          </Anchor>
          <Anchor component="button" className={styles.link} onClick={() => onNavigate?.("landing3")}>
            Universe
          </Anchor>
        </Group>
      </nav>
    </>
  );
};