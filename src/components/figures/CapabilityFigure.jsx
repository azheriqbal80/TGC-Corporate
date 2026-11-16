import { IsometricBlock } from "./primitives/IsometricBlock";
import { CapabilityCylinder } from "./primitives/CapabilityCylinder";

export function CapabilityFigure({ type }) {
  const figureCopy = {
    predictive: {
      title: "Predictive delivery sequence",
      description:
        "A cloud session prepares selected content through a prefetch stage before it becomes ready for delivery.",
    },
    orchestration: {
      title: "Cloud orchestration selection",
      description:
        "Several available cloud resources converge on one selected green destination, representing infrastructure matched to the player.",
    },
    input: {
      title: "Separated input and video paths",
      description:
        "A compact channel of small control packets stays separate from a larger channel of rendered video frames.",
    },
  }[type];
  const titleId = `capability-${type}-title`;
  const descId = `capability-${type}-desc`;

  return (
    <figure
      className={`capability-figure capability-figure--${type}`}
      data-capability-figure
    >
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
      >
        <title id={titleId}>{figureCopy.title}</title>
        <desc id={descId}>{figureCopy.description}</desc>

        {type === "predictive" && (
          <>
            <IsometricBlock
              cx={160}
              y={76}
              width={236}
              depth={92}
              height={42}
              tone="ink"
            />
            <IsometricBlock
              cx={116}
              y={74}
              width={94}
              depth={38}
              height={12}
              tone="paper"
              motion="predictive-step"
            />
            <IsometricBlock
              cx={160}
              y={47}
              width={94}
              depth={38}
              height={12}
              tone="muted"
              motion="predictive-step"
            />
            <IsometricBlock
              cx={204}
              y={20}
              width={94}
              depth={38}
              height={12}
              tone="signal"
              motion="predictive-step"
            />
          </>
        )}

        {type === "orchestration" && (
          <>
            <IsometricBlock
              cx={160}
              y={108}
              width={242}
              depth={90}
              height={16}
              tone="ink"
            />
            <CapabilityCylinder
              cx={82}
              bottomY={151}
              width={40}
              height={42}
              tone="paper"
            />
            <CapabilityCylinder
              cx={160}
              bottomY={130}
              width={40}
              height={42}
              tone="muted"
            />
            <CapabilityCylinder
              cx={238}
              bottomY={151}
              width={40}
              height={42}
              tone="paper"
            />
            <CapabilityCylinder
              cx={160}
              bottomY={181}
              width={62}
              height={72}
              tone="signal"
              motion="selected-resource"
            />
          </>
        )}

        {type === "input" && (
          <>
            <IsometricBlock
              cx={160}
              y={116}
              width={238}
              depth={84}
              height={15}
              tone="ink"
            />
            <CapabilityCylinder
              cx={106}
              bottomY={172}
              width={30}
              height={12}
              tone="signal"
              motion="input-packet"
            />
            <CapabilityCylinder
              cx={106}
              bottomY={139}
              width={30}
              height={12}
              tone="signal"
              motion="input-packet"
            />
            <CapabilityCylinder
              cx={106}
              bottomY={106}
              width={30}
              height={12}
              tone="signal"
              motion="input-packet"
            />
            <CapabilityCylinder
              cx={106}
              bottomY={73}
              width={30}
              height={12}
              tone="signal"
              motion="input-packet"
            />
            <path
              className="capability-channel-spine capability-channel-spine--signal"
              d="M106 61 L106 172"
              data-capability-block
            />
            <IsometricBlock
              cx={212}
              y={126}
              width={92}
              depth={36}
              height={11}
              tone="paper"
              motion="video-frame"
            />
            <IsometricBlock
              cx={212}
              y={88}
              width={92}
              depth={36}
              height={11}
              tone="paper"
              motion="video-frame"
            />
            <IsometricBlock
              cx={212}
              y={50}
              width={92}
              depth={36}
              height={11}
              tone="paper"
              motion="video-frame"
            />
            <path
              className="capability-channel-spine capability-channel-spine--paper"
              d="M212 50 L212 173"
              data-capability-block
            />
          </>
        )}
      </svg>
    </figure>
  );
}
