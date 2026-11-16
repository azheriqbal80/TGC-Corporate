import { IsometricBlock } from "./primitives/IsometricBlock";

export function LeadershipModelFigure() {
  return (
    <figure className="leadership-model-figure" data-leadership-model-figure>
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-labelledby="leadership-model-title leadership-model-desc"
      >
        <title id="leadership-model-title">
          Core and advisory leadership model
        </title>
        <desc id="leadership-model-desc">
          A larger operational stack and a complementary advisory stack share
          one company foundation.
        </desc>
        <IsometricBlock
          cx={160}
          y={112}
          width={248}
          depth={88}
          height={16}
          tone="muted"
        />
        <g data-capability-motion="leadership-core">
          <IsometricBlock
            cx={108}
            y={120}
            width={104}
            depth={42}
            height={18}
            tone="ink"
          />
          <IsometricBlock
            cx={108}
            y={86}
            width={90}
            depth={36}
            height={17}
            tone="ink"
          />
          <IsometricBlock
            cx={108}
            y={54}
            width={76}
            depth={30}
            height={16}
            tone="signal"
          />
        </g>
        <g data-capability-motion="leadership-advisory">
          <IsometricBlock
            cx={220}
            y={126}
            width={92}
            depth={36}
            height={15}
            tone="paper"
          />
          <IsometricBlock
            cx={220}
            y={94}
            width={78}
            depth={30}
            height={14}
            tone="paper"
          />
          <IsometricBlock
            cx={220}
            y={66}
            width={64}
            depth={26}
            height={13}
            tone="paper"
          />
        </g>
      </svg>
    </figure>
  );
}
