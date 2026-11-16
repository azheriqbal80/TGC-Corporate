export function IsometricBlock({
  cx,
  y,
  width = 54,
  depth = 26,
  height = 18,
  tone = "ink",
  motion,
}) {
  const half = width / 2;
  const halfDepth = depth / 2;
  return (
    <g
      className={`capability-block capability-block--${tone}`}
      data-capability-block
      data-capability-motion={motion}
    >
      <path
        className="capability-block-top"
        d={`M${cx} ${y} L${cx + half} ${y + halfDepth} L${cx} ${y + depth} L${cx - half} ${y + halfDepth} Z`}
      />
      <path
        className="capability-block-left"
        d={`M${cx - half} ${y + halfDepth} L${cx} ${y + depth} L${cx} ${y + depth + height} L${cx - half} ${y + halfDepth + height} Z`}
      />
      <path
        className="capability-block-right"
        d={`M${cx} ${y + depth} L${cx + half} ${y + halfDepth} L${cx + half} ${y + halfDepth + height} L${cx} ${y + depth + height} Z`}
      />
    </g>
  );
}
