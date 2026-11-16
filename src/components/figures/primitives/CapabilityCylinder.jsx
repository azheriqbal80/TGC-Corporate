export function CapabilityCylinder({
  cx,
  bottomY,
  width = 42,
  height = 58,
  tone = "paper",
  motion,
}) {
  const topY = bottomY - height;
  const radiusY = width * 0.18;
  return (
    <g
      className={`capability-cylinder capability-cylinder--${tone}`}
      data-capability-block
      data-capability-motion={motion}
    >
      <rect x={cx - width / 2} y={topY} width={width} height={height} />
      <ellipse
        className="capability-cylinder-bottom"
        cx={cx}
        cy={bottomY}
        rx={width / 2}
        ry={radiusY}
      />
      <ellipse
        className="capability-cylinder-top"
        cx={cx}
        cy={topY}
        rx={width / 2}
        ry={radiusY}
      />
    </g>
  );
}
