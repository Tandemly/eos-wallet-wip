import React from "react";
import cx from "classnames";
import Color from "color";
import styles from "./colors.module.scss";

console.log("styles:", styles);

const hslToString = hsl => {
  const [h, s, l] = hsl.color;
  const alpha = hsl.valpha;
  return `hsla(${h.toFixed(2)}, ${s.toFixed(2)}%, ${l.toFixed(2)}%, ${alpha})`;
};

const ucfirst = s => s.charAt(0).toUpperCase() + s.slice(1);

const Swatch = ({ color }: { color: string }) => {
  const _color = Color(styles[`color_${color}`]);
  const hsl = _color.hsl();
  console.log(hsl);
  return (
    <div className={cx(styles.swatch_wrapper, `bg-${color}`)}>
      <div className={cx(styles.swatch_info, "text-dark")}>
        <span className={styles.color_name}>{ucfirst(color)}</span>
        <br />
        <span className={styles.color_detail}>{_color.hex()}</span>
        <br />
        <span className={styles.color_detail}>{hslToString(_color.hsl())}</span>
      </div>
    </div>
  );
};

export default Swatch;
