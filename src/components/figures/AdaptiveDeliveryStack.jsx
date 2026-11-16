export function AdaptiveDeliveryStack() {
  return (
    <figure
      className="delivery-stack"
      data-delivery-stack
      aria-labelledby="delivery-stack-title delivery-stack-desc"
    >
      <svg className="delivery-stack-svg" viewBox="0 0 780 620" role="img">
        <title id="delivery-stack-title">
          TGC adaptive cloud delivery stack
        </title>
        <desc id="delivery-stack-desc">
          Player input travels into a cloud session, through game execution,
          rendering and optimisation, before an adaptive stream returns to the
          player device.
        </desc>
        <defs>
          <pattern
            id="delivery-grid"
            width="82"
            height="82"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="1.6" fill="currentColor" />
          </pattern>
        </defs>

        <rect
          className="delivery-grid"
          width="780"
          height="620"
          fill="url(#delivery-grid)"
        />
        <path
          className="delivery-path delivery-path--inbound"
          data-delivery-inbound
          d="M118 488 C196 488 225 424 279 382"
        />
        <path
          className="delivery-path delivery-path--outbound"
          data-delivery-path
          d="M512 293 C596 320 615 421 676 474"
        />

        <g
          className="delivery-endpoint delivery-endpoint--input"
          data-delivery-endpoint
        >
          <path d="M48 466 L118 430 L188 466 L118 503 Z" />
          <path d="M48 466 L48 510 L118 548 L118 503 Z" />
          <path d="M118 503 L188 466 L188 510 L118 548 Z" />
          <circle cx="118" cy="467" r="7" />
          <text
            className="delivery-endpoint-label"
            x="83"
            y="507"
            textAnchor="middle"
            transform="rotate(28.5 83 507)"
            textLength="58"
            lengthAdjust="spacingAndGlyphs"
          >
            PLAYER INPUT
          </text>
        </g>

        <g
          className="delivery-layer delivery-layer--session"
          data-delivery-layer
        >
          <path
            className="delivery-layer-top"
            d="M279 334 L394 274 L523 340 L407 404 Z"
          />
          <path
            className="delivery-layer-left"
            d="M279 334 L279 382 L407 451 L407 404 Z"
          />
          <path
            className="delivery-layer-right"
            d="M407 404 L523 340 L523 388 L407 451 Z"
          />
          <text
            className="delivery-layer-label"
            x="304"
            y="374"
            transform="rotate(28.5 304 374)"
          >
            CLOUD SESSION
          </text>
        </g>

        <g
          className="delivery-layer delivery-layer--engine"
          data-delivery-layer
        >
          <path
            className="delivery-layer-top"
            d="M298 259 L397 207 L504 262 L404 317 Z"
          />
          <path
            className="delivery-layer-left"
            d="M298 259 L298 296 L404 353 L404 317 Z"
          />
          <path
            className="delivery-layer-right"
            d="M404 317 L504 262 L504 300 L404 353 Z"
          />
          <text
            className="delivery-layer-label"
            x="330"
            y="299"
            transform="rotate(28.5 330 299)"
          >
            EXECUTE
          </text>
        </g>

        <g
          className="delivery-layer delivery-layer--render"
          data-delivery-layer
        >
          <path
            className="delivery-layer-top"
            d="M317 191 L399 148 L486 193 L403 238 Z"
          />
          <path
            className="delivery-layer-left"
            d="M317 191 L317 221 L403 267 L403 238 Z"
          />
          <path
            className="delivery-layer-right"
            d="M403 238 L486 193 L486 224 L403 267 Z"
          />
          <text
            className="delivery-layer-label"
            x="342"
            y="222"
            transform="rotate(28.5 342 222)"
          >
            RENDER
          </text>
        </g>

        <g
          className="delivery-layer delivery-layer--optimise"
          data-delivery-layer
        >
          <path
            className="delivery-layer-top"
            d="M337 127 L401 93 L468 128 L403 163 Z"
          />
          <path
            className="delivery-layer-left"
            d="M337 127 L337 151 L403 187 L403 163 Z"
          />
          <path
            className="delivery-layer-right"
            d="M403 163 L468 128 L468 153 L403 187 Z"
          />
          <text
            className="delivery-layer-label"
            x="357"
            y="154"
            transform="rotate(28.5 357 154)"
          >
            ADAPT
          </text>
        </g>

        <g
          className="delivery-endpoint delivery-endpoint--device"
          data-delivery-endpoint
        >
          <path d="M592 466 L662 430 L732 466 L662 503 Z" />
          <path d="M592 466 L592 510 L662 548 L662 503 Z" />
          <path d="M662 503 L732 466 L732 510 L662 548 Z" />
          <circle cx="662" cy="467" r="7" />
          <text
            className="delivery-endpoint-label"
            x="627"
            y="507"
            textAnchor="middle"
            transform="rotate(28.5 627 507)"
            textLength="64"
            lengthAdjust="spacingAndGlyphs"
          >
            PLAYER DEVICE
          </text>
        </g>

        <g className="delivery-packet delivery-packet--in" data-delivery-packet>
          <circle cx="216" cy="448" r="6" />
          <circle cx="216" cy="448" r="14" />
        </g>
        <g
          className="delivery-packet delivery-packet--out"
          data-delivery-packet
        >
          <circle cx="600" cy="377" r="6" />
          <circle cx="600" cy="377" r="14" />
        </g>

        <g className="delivery-caption" data-delivery-caption>
          <text x="32" y="37">
            TGC DELIVERY LOOP
          </text>
          <text x="748" y="37" textAnchor="end">
            INPUT → EXECUTE → OPTIMISE → STREAM
          </text>
        </g>
      </svg>
      <figcaption>
        <span>Adaptive delivery loop</span>
        <strong>One coordinated path from input to experience.</strong>
      </figcaption>
    </figure>
  );
}
