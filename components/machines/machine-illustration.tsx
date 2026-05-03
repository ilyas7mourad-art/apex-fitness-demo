import type { Machine } from "@/lib/types";

type IllustrationSize = "sm" | "lg";
type Variant = "cable" | "press" | "cardio" | "freeweight" | "stack";

function getVariant(machine: Machine): Variant {
  if (machine.category === "cardio") return "cardio";
  if (machine.category === "free_weights") return "freeweight";
  if (["cable-machine", "lat-pulldown", "seated-cable-row"].includes(machine.slug))
    return "cable";
  if (
    ["chest-press-machine", "shoulder-press-machine", "hack-squat", "leg-press", "smith-machine"].includes(
      machine.slug,
    )
  )
    return "press";
  return "stack";
}

function CableSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-h-[60%] max-w-[60%]"
      aria-hidden="true"
    >
      {/* Left vertical post */}
      <line x1="55" y1="30" x2="55" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right vertical post */}
      <line x1="145" y1="30" x2="145" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top crossbar */}
      <line x1="55" y1="30" x2="145" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pulley circle at top center */}
      <circle cx="100" cy="30" r="10" stroke="currentColor" strokeWidth="2.5" />
      {/* Pulley inner dot */}
      <circle cx="100" cy="30" r="3" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Left cable */}
      <line x1="94" y1="40" x2="85" y2="130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      {/* Right cable */}
      <line x1="106" y1="40" x2="115" y2="130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      {/* Handle bar */}
      <line x1="80" y1="132" x2="120" y2="132" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Left grip */}
      <circle cx="80" cy="132" r="4" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Right grip */}
      <circle cx="120" cy="132" r="4" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Seat */}
      <rect x="72" y="150" width="56" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Seat post */}
      <line x1="100" y1="160" x2="100" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Base */}
      <line x1="55" y1="170" x2="145" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PressSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-h-[60%] max-w-[60%]"
      aria-hidden="true"
    >
      {/* Weight stack (left) */}
      <rect x="30" y="40" width="40" height="120" rx="4" stroke="currentColor" strokeWidth="2.5" />
      {/* Stack lines */}
      <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="80" x2="70" y2="80" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="100" x2="70" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="120" x2="70" y2="120" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="140" x2="70" y2="140" stroke="currentColor" strokeWidth="1.5" />
      {/* Selector pin (amber) */}
      <circle cx="50" cy="100" r="5" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" fill="currentColor" />
      {/* Arm extending right */}
      <line x1="70" y1="95" x2="145" y2="85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arm pivot */}
      <circle cx="90" cy="93" r="5" stroke="currentColor" strokeWidth="2" />
      {/* Handle */}
      <line x1="140" y1="75" x2="140" y2="100" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="75" r="5" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      <circle cx="140" cy="100" r="5" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Backrest */}
      <rect x="130" y="120" width="15" height="45" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* Seat */}
      <rect x="115" y="155" width="40" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Base */}
      <line x1="30" y1="160" x2="70" y2="160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="110" y1="165" x2="165" y2="165" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CardioSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-h-[60%] max-w-[60%]"
      aria-hidden="true"
    >
      {/* Platform/belt */}
      <rect x="30" y="115" width="140" height="28" rx="5" stroke="currentColor" strokeWidth="2.5" />
      {/* Belt lines */}
      <line x1="30" y1="129" x2="170" y2="129" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
      {/* Left upright */}
      <line x1="55" y1="115" x2="55" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right upright */}
      <line x1="145" y1="115" x2="145" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Handlebar */}
      <line x1="55" y1="55" x2="145" y2="55" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Handle grips */}
      <rect x="50" y="50" width="15" height="28" rx="4" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      <rect x="135" y="50" width="15" height="28" rx="4" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Left roller */}
      <circle cx="43" cy="129" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="43" cy="129" r="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Right roller */}
      <circle cx="157" cy="129" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="157" cy="129" r="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Console display */}
      <rect x="80" y="42" width="40" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="88" y1="48" x2="112" y2="48" stroke="currentColor" strokeWidth="1" />
      <line x1="88" y1="54" x2="104" y2="54" stroke="currentColor" strokeWidth="1" />
      {/* Base feet */}
      <line x1="30" y1="143" x2="30" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="170" y1="143" x2="170" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FreeweightSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-h-[60%] max-w-[60%]"
      aria-hidden="true"
    >
      {/* Rack shelf */}
      <line x1="25" y1="155" x2="175" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left rack post */}
      <line x1="35" y1="100" x2="35" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right rack post */}
      <line x1="165" y1="100" x2="165" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left rack sphere */}
      <circle cx="35" cy="148" r="8" stroke="currentColor" strokeWidth="2" />
      {/* Right rack sphere */}
      <circle cx="165" cy="148" r="8" stroke="currentColor" strokeWidth="2" />
      {/* Kettlebell body */}
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="2.5" />
      {/* Kettlebell flat bottom */}
      <line x1="74" y1="136" x2="126" y2="136" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Kettlebell handle - arc */}
      <path
        d="M 78 85 Q 78 45 100 45 Q 122 45 122 85"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ color: "var(--brand)" }}
      />
      {/* Handle crossbar */}
      <line x1="78" y1="85" x2="122" y2="85" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Kettlebell weight marking */}
      <text x="100" y="115" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="sans-serif" className="opacity-40">
        24kg
      </text>
    </svg>
  );
}

function StackSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-h-[60%] max-w-[60%]"
      aria-hidden="true"
    >
      {/* Weight stack */}
      <rect x="25" y="35" width="45" height="130" rx="4" stroke="currentColor" strokeWidth="2.5" />
      {/* Stack plate lines */}
      <line x1="25" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="72" x2="70" y2="72" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="89" x2="70" y2="89" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="106" x2="70" y2="106" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="123" x2="70" y2="123" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="140" x2="70" y2="140" stroke="currentColor" strokeWidth="1.5" />
      {/* Selected plate (amber) */}
      <rect x="25" y="106" width="45" height="17" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
      {/* Selector pin */}
      <circle cx="47" cy="114" r="4" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" fill="currentColor" />
      {/* Mechanical arm */}
      <line x1="70" y1="114" x2="130" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pivot point */}
      <circle cx="100" cy="97" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="97" r="2" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" fill="currentColor" />
      {/* Pad/seat arm */}
      <line x1="130" y1="80" x2="160" y2="90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pad */}
      <rect x="152" y="85" width="20" height="35" rx="5" style={{ color: "var(--brand)" }} stroke="currentColor" strokeWidth="2" />
      {/* Seat */}
      <rect x="120" y="145" width="55" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* Seat post */}
      <line x1="147" y1="157" x2="147" y2="165" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Base */}
      <line x1="25" y1="165" x2="70" y2="165" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="115" y1="165" x2="180" y2="165" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const variantComponents: Record<Variant, React.FC> = {
  cable: CableSVG,
  press: PressSVG,
  cardio: CardioSVG,
  freeweight: FreeweightSVG,
  stack: StackSVG,
};

interface MachineIllustrationProps {
  machine: Machine;
  size: IllustrationSize;
}

export function MachineIllustration({ machine, size }: MachineIllustrationProps) {
  const variant = getVariant(machine);
  const IllustrationComponent = variantComponents[variant];

  const containerClass =
    size === "sm"
      ? "h-[120px] w-full rounded-t-xl flex items-center justify-center overflow-hidden"
      : "h-[240px] w-full rounded-xl flex items-center justify-center overflow-hidden";

  return (
    <div
      className={containerClass}
      style={{ backgroundColor: "color-mix(in oklch, var(--brand) 8%, var(--background))" }}
    >
      <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
        <IllustrationComponent />
      </div>
    </div>
  );
}
