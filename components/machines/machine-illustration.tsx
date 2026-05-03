import type { Machine } from "@/lib/types";

type IllustrationSize = "sm" | "lg";
type Variant =
  | "treadmill"
  | "bike"
  | "rowing"
  | "battle-ropes"
  | "cable"
  | "cable-row"
  | "leg-press"
  | "hack-squat"
  | "smith"
  | "press"
  | "pec-deck"
  | "hyperextension"
  | "pullup"
  | "freeweight"
  | "stack";

function getVariant(machine: Machine): Variant {
  switch (machine.slug) {
    case "treadmill":
      return "treadmill";
    case "stationary-bike":
      return "bike";
    case "rowing-machine":
      return "rowing";
    case "battle-ropes":
      return "battle-ropes";
    case "cable-machine":
    case "lat-pulldown":
      return "cable";
    case "seated-cable-row":
      return "cable-row";
    case "leg-press":
      return "leg-press";
    case "hack-squat":
      return "hack-squat";
    case "smith-machine":
      return "smith";
    case "chest-press-machine":
    case "shoulder-press-machine":
      return "press";
    case "pec-deck":
      return "pec-deck";
    case "hyperextension-bench":
      return "hyperextension";
    case "assisted-pullup-dip":
      return "pullup";
    case "kettlebell-rack":
      return "freeweight";
    default:
      if (machine.category === "cardio") return "treadmill";
      if (machine.category === "free_weights") return "freeweight";
      return "stack";
  }
}

const B = "var(--brand)"; // amber accent shorthand for style props

// ── Treadmill ──────────────────────────────────────────────────────────────
function TreadmillSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      <rect x="30" y="115" width="140" height="28" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <line x1="30" y1="129" x2="170" y2="129" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
      <line x1="55" y1="115" x2="55" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="145" y1="115" x2="145" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="55" x2="145" y2="55" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <rect x="50" y="50" width="15" height="28" rx="4" stroke={B} strokeWidth="2" />
      <rect x="135" y="50" width="15" height="28" rx="4" stroke={B} strokeWidth="2" />
      <circle cx="43" cy="129" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="43" cy="129" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="157" cy="129" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="157" cy="129" r="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="80" y="42" width="40" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="88" y1="48" x2="112" y2="48" stroke="currentColor" strokeWidth="1" />
      <line x1="88" y1="54" x2="104" y2="54" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="143" x2="30" y2="158" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="170" y1="143" x2="170" y2="158" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Stationary Bike ────────────────────────────────────────────────────────
function BikeSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Rear wheel */}
      <circle cx="60" cy="138" r="34" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="138" r="5" stroke={B} strokeWidth="2" fill={B} opacity="0.7" />
      {/* Front wheel */}
      <circle cx="150" cy="138" r="26" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="150" cy="138" r="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottom bracket (pedal) */}
      <circle cx="104" cy="118" r="7" stroke={B} strokeWidth="2" fill={B} opacity="0.15" />
      <line x1="96" y1="118" x2="112" y2="118" stroke={B} strokeWidth="2.5" strokeLinecap="round" />
      {/* Frame */}
      <line x1="60" y1="135" x2="104" y2="118" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="104" y1="118" x2="93" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="93" y1="82" x2="140" y2="85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="104" y1="118" x2="150" y2="115" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="140" y1="85" x2="150" y2="112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Seat post */}
      <line x1="93" y1="82" x2="93" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Saddle */}
      <line x1="78" y1="66" x2="108" y2="66" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Handlebar post */}
      <line x1="140" y1="85" x2="144" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Handlebar */}
      <line x1="134" y1="62" x2="154" y2="62" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Console */}
      <rect x="122" y="44" width="32" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="130" y1="50" x2="146" y2="50" stroke="currentColor" strokeWidth="1" />
      <line x1="130" y1="56" x2="140" y2="56" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// ── Rowing Machine ─────────────────────────────────────────────────────────
function RowingSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Monorail */}
      <rect x="28" y="125" width="145" height="8" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Flywheel */}
      <circle cx="48" cy="108" r="30" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="78" x2="48" y2="138" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="108" x2="78" y2="108" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="87" x2="69" y2="129" stroke="currentColor" strokeWidth="1.5" />
      <line x1="69" y1="87" x2="27" y2="129" stroke="currentColor" strokeWidth="1.5" />
      {/* Flywheel hub */}
      <circle cx="48" cy="108" r="7" stroke={B} strokeWidth="2" fill={B} opacity="0.2" />
      {/* Seat */}
      <rect x="93" y="115" width="22" height="10" rx="2" stroke={B} strokeWidth="2" fill={B} opacity="0.15" />
      {/* Handle */}
      <line x1="78" y1="100" x2="92" y2="117" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Grip */}
      <line x1="72" y1="96" x2="84" y2="104" stroke={B} strokeWidth="3" strokeLinecap="round" />
      {/* Footrests */}
      <rect x="142" y="100" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="153" y1="100" x2="153" y2="126" stroke="currentColor" strokeWidth="1.5" />
      {/* Support legs */}
      <line x1="82" y1="133" x2="82" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="130" y1="133" x2="130" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Floor */}
      <line x1="28" y1="155" x2="175" y2="155" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Battle Ropes ──────────────────────────────────────────────────────────
function BattleRopesSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Anchor post */}
      <line x1="100" y1="35" x2="100" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Anchor base bracket */}
      <rect x="88" y="83" width="24" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Anchor ring */}
      <circle cx="100" cy="88" r="9" stroke={B} strokeWidth="2.5" />
      <circle cx="100" cy="88" r="3" stroke={B} strokeWidth="2" fill={B} opacity="0.5" />
      {/* Left rope — wavy path */}
      <path d="M 94 92 C 78 102 62 98 50 112 C 38 126 44 138 32 154" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left rope second strand (slight offset for thickness) */}
      <path d="M 96 95 C 80 106 64 102 52 116 C 40 130 46 142 34 158" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Right rope — mirror */}
      <path d="M 106 92 C 122 102 138 98 150 112 C 162 126 156 138 168 154" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right rope second strand */}
      <path d="M 104 95 C 120 106 136 102 148 116 C 160 130 154 142 166 158" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Left handle loop */}
      <circle cx="33" cy="157" r="7" stroke={B} strokeWidth="2.5" />
      {/* Right handle loop */}
      <circle cx="167" cy="157" r="7" stroke={B} strokeWidth="2.5" />
      {/* Floor */}
      <line x1="15" y1="167" x2="185" y2="167" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Cable Column (tall, overhead pulley) ──────────────────────────────────
function CableSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      <line x1="55" y1="30" x2="55" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="145" y1="30" x2="145" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="30" x2="145" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="30" r="10" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="30" r="3" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      <line x1="94" y1="40" x2="85" y2="130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      <line x1="106" y1="40" x2="115" y2="130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      <line x1="80" y1="132" x2="120" y2="132" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="132" r="4" stroke={B} strokeWidth="2" />
      <circle cx="120" cy="132" r="4" stroke={B} strokeWidth="2" />
      <rect x="72" y="150" width="56" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="100" y1="160" x2="100" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="170" x2="145" y2="170" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Seated Cable Row (low pulley) ─────────────────────────────────────────
function CableRowSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Weight stack column */}
      <rect x="18" y="42" width="32" height="110" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="62" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="79" x2="50" y2="79" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="96" x2="50" y2="96" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="113" x2="50" y2="113" stroke="currentColor" strokeWidth="1.5" />
      {/* Selector pin */}
      <circle cx="34" cy="96" r="4" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      {/* Low pulley — distinct from tall cable: pulley at floor level */}
      <circle cx="34" cy="145" r="10" stroke={B} strokeWidth="2.5" />
      <circle cx="34" cy="145" r="3.5" stroke={B} strokeWidth="2" fill={B} opacity="0.4" />
      {/* Foot platform */}
      <rect x="14" y="152" width="55" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Cable (diagonal from low pulley to handle) */}
      <line x1="44" y1="143" x2="132" y2="116" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* V-grip handle */}
      <line x1="130" y1="114" x2="142" y2="108" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="114" x2="142" y2="120" stroke={B} strokeWidth="3" strokeLinecap="round" />
      {/* Seat */}
      <rect x="92" y="112" width="52" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Seat post */}
      <line x1="118" y1="125" x2="118" y2="148" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Backrest */}
      <rect x="136" y="78" width="14" height="38" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Base */}
      <line x1="88" y1="162" x2="162" y2="162" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="162" x2="68" y2="162" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Leg Press (45° angled sled) ────────────────────────────────────────────
function LegPressSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Left guide rail at ~45° */}
      <line x1="38" y1="168" x2="128" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right guide rail (parallel) */}
      <line x1="56" y1="168" x2="146" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top crossbar */}
      <line x1="128" y1="42" x2="146" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bottom crossbar */}
      <line x1="38" y1="168" x2="56" y2="168" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Weight plates (stacked at top) */}
      <ellipse cx="136" cy="58" rx="14" ry="9" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="122" cy="62" rx="14" ry="9" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="108" cy="66" rx="14" ry="9" stroke="currentColor" strokeWidth="2" />
      {/* Sled/carriage (parallelogram mid-rail) */}
      <path d="M 68 125 L 86 115 L 92 96 L 74 106 Z" stroke="currentColor" strokeWidth="2" />
      {/* Foot platform (on sled) — amber */}
      <line x1="68" y1="123" x2="94" y2="94" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Reclined seat at bottom */}
      <rect x="16" y="138" width="38" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Backrest (angled) */}
      <rect x="12" y="88" width="13" height="53" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Seat support leg */}
      <line x1="35" y1="151" x2="35" y2="168" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Hack Squat ─────────────────────────────────────────────────────────────
function HackSquatSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Vertical guide posts */}
      <line x1="62" y1="28" x2="62" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="138" y1="28" x2="138" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top crossbar */}
      <line x1="62" y1="28" x2="138" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bottom crossbar / base */}
      <line x1="62" y1="172" x2="138" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Sled/carriage */}
      <rect x="68" y="78" width="64" height="60" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Foot platform (bottom of carriage) */}
      <line x1="70" y1="133" x2="130" y2="133" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Shoulder pads (amber — the working part at top of carriage) */}
      <ellipse cx="83" cy="80" rx="11" ry="6" stroke={B} strokeWidth="2.5" fill={B} opacity="0.15" />
      <ellipse cx="117" cy="80" rx="11" ry="6" stroke={B} strokeWidth="2.5" fill={B} opacity="0.15" />
      {/* Weight plates on sides */}
      <rect x="42" y="88" width="18" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="42" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <line x1="42" y1="108" x2="60" y2="108" stroke="currentColor" strokeWidth="1.5" />
      <rect x="140" y="88" width="18" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="140" y1="100" x2="158" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <line x1="140" y1="108" x2="158" y2="108" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Smith Machine ──────────────────────────────────────────────────────────
function SmithSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Left vertical post */}
      <line x1="52" y1="22" x2="52" y2="175" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right vertical post */}
      <line x1="148" y1="22" x2="148" y2="175" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top crossbar */}
      <line x1="52" y1="22" x2="148" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Guide track slots on each post */}
      <rect x="46" y="35" width="12" height="130" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="142" y="35" width="12" height="130" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Olympic bar — amber, spans full width + beyond posts */}
      <line x1="18" y1="90" x2="182" y2="90" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Left weight plates */}
      <rect x="12" y="74" width="10" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="76" width="14" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Right weight plates */}
      <rect x="166" y="76" width="14" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="178" y="74" width="10" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* J-hook catches (bar rests on these) */}
      <path d="M 52 88 L 40 88 L 40 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 148 88 L 160 88 L 160 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Safety catchers (two heights) */}
      <line x1="44" y1="115" x2="60" y2="115" stroke="currentColor" strokeWidth="1.5" />
      <line x1="140" y1="115" x2="156" y2="115" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="138" x2="60" y2="138" stroke="currentColor" strokeWidth="1.5" />
      <line x1="140" y1="138" x2="156" y2="138" stroke="currentColor" strokeWidth="1.5" />
      {/* Base feet */}
      <line x1="36" y1="175" x2="68" y2="175" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="175" x2="164" y2="175" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Selectorized Press (chest press / shoulder press) ─────────────────────
function PressSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      <rect x="28" y="38" width="42" height="122" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="58" x2="70" y2="58" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="76" x2="70" y2="76" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="94" x2="70" y2="94" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="112" x2="70" y2="112" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="130" x2="70" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="49" cy="94" r="5" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      <line x1="70" y1="90" x2="145" y2="82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="90" cy="88" r="5" stroke="currentColor" strokeWidth="2" />
      <line x1="140" y1="72" x2="140" y2="98" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="72" r="5" stroke={B} strokeWidth="2" />
      <circle cx="140" cy="98" r="5" stroke={B} strokeWidth="2" />
      <rect x="130" y="118" width="15" height="47" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="112" y="155" width="42" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="160" x2="70" y2="160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="108" y1="165" x2="162" y2="165" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Pec Deck / Fly Machine ────────────────────────────────────────────────
function PecDeckSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Central backrest column */}
      <rect x="86" y="52" width="28" height="115" rx="4" stroke="currentColor" strokeWidth="2.5" />
      {/* Weight stack lines */}
      <line x1="86" y1="70" x2="114" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="86" y1="85" x2="114" y2="85" stroke="currentColor" strokeWidth="1.5" />
      <line x1="86" y1="100" x2="114" y2="100" stroke="currentColor" strokeWidth="1.5" />
      <line x1="86" y1="115" x2="114" y2="115" stroke="currentColor" strokeWidth="1.5" />
      {/* Selector */}
      <circle cx="100" cy="100" r="4" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      {/* Left arm */}
      <line x1="86" y1="93" x2="36" y2="103" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left forearm pad (vertical) */}
      <rect x="24" y="93" width="14" height="30" rx="5" stroke={B} strokeWidth="2.5" fill={B} opacity="0.12" />
      {/* Right arm */}
      <line x1="114" y1="93" x2="164" y2="103" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right forearm pad */}
      <rect x="162" y="93" width="14" height="30" rx="5" stroke={B} strokeWidth="2.5" fill={B} opacity="0.12" />
      {/* Motion arc (dashed) */}
      <path d="M 32 105 A 72 72 0 0 1 168 105" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      {/* Seat */}
      <rect x="78" y="148" width="44" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Base */}
      <line x1="68" y1="167" x2="132" y2="167" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="86" y1="167" x2="86" y2="160" stroke="currentColor" strokeWidth="2" />
      <line x1="114" y1="167" x2="114" y2="160" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ── Hyperextension Bench ───────────────────────────────────────────────────
function HyperextensionSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Main angled frame (long diagonal) */}
      <line x1="28" y1="155" x2="165" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Secondary frame bar (parallel) */}
      <line x1="40" y1="168" x2="177" y2="85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Front upright */}
      <line x1="28" y1="155" x2="40" y2="168" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Rear upright */}
      <line x1="165" y1="72" x2="177" y2="85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hip pad (the key element — where you rest your pelvis) */}
      <rect x="92" y="105" width="36" height="16" rx="5" stroke={B} strokeWidth="2.5" fill={B} opacity="0.15" />
      {/* Foot hooks platform */}
      <rect x="140" y="116" width="38" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Foot hook loops */}
      <path d="M 150 116 A 6 6 0 0 1 160 116" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 163 116 A 6 6 0 0 1 173 116" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Person silhouette: hanging forward from hip pad */}
      {/* Torso line */}
      <line x1="96" y1="108" x2="52" y2="88" stroke={B} strokeWidth="2.5" strokeLinecap="round" />
      {/* Head */}
      <circle cx="48" cy="84" r="9" stroke={B} strokeWidth="2" />
      {/* Arms dangling */}
      <line x1="68" y1="98" x2="62" y2="112" stroke={B} strokeWidth="2" strokeLinecap="round" />
      {/* Legs on bench extending back */}
      <line x1="124" y1="108" x2="158" y2="125" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Support legs to floor */}
      <line x1="28" y1="155" x2="22" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="168" x2="34" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Floor */}
      <line x1="15" y1="172" x2="185" y2="172" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Assisted Pull-Up / Dip ─────────────────────────────────────────────────
function PullUpSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      {/* Two vertical uprights */}
      <line x1="48" y1="25" x2="48" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="152" y1="25" x2="152" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pull-up bar (top) — amber, the primary working element */}
      <line x1="28" y1="28" x2="172" y2="28" stroke={B} strokeWidth="3.5" strokeLinecap="round" />
      {/* Grip circles on pull-up bar */}
      <circle cx="32" cy="28" r="5" stroke={B} strokeWidth="2" />
      <circle cx="168" cy="28" r="5" stroke={B} strokeWidth="2" />
      {/* Dip bars (parallel, lower) */}
      <line x1="32" y1="92" x2="88" y2="92" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <line x1="112" y1="92" x2="168" y2="92" stroke={B} strokeWidth="3" strokeLinecap="round" />
      {/* Knee platform (the counterweight pad) */}
      <rect x="72" y="110" width="56" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* Platform support arms */}
      <line x1="82" y1="128" x2="82" y2="148" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="118" y1="128" x2="118" y2="148" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Counterweight stack box */}
      <rect x="62" y="148" width="76" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="62" y1="160" x2="138" y2="160" stroke="currentColor" strokeWidth="1.5" />
      {/* Selector */}
      <circle cx="100" cy="160" r="4" stroke={B} strokeWidth="2" fill={B} opacity="0.5" />
      {/* Base feet */}
      <line x1="32" y1="172" x2="64" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="136" y1="172" x2="168" y2="172" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Kettlebell Rack (free weights) ─────────────────────────────────────────
function FreeweightSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      <line x1="25" y1="155" x2="175" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="100" x2="35" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="165" y1="100" x2="165" y2="155" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="35" cy="148" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="165" cy="148" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="2.5" />
      <line x1="74" y1="136" x2="126" y2="136" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 78 85 Q 78 45 100 45 Q 122 45 122 85" stroke={B} strokeWidth="3" strokeLinecap="round" fill="none" />
      <line x1="78" y1="85" x2="122" y2="85" stroke={B} strokeWidth="3" strokeLinecap="round" />
      <text x="100" y="118" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="sans-serif" opacity="0.35">24kg</text>
    </svg>
  );
}

// ── Generic Weight Stack (leg curl, ab crunch, etc.) ──────────────────────
function StackSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-[60%] max-w-[60%]" aria-hidden="true">
      <rect x="24" y="34" width="46" height="132" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="24" y1="54" x2="70" y2="54" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="71" x2="70" y2="71" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="88" x2="70" y2="88" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="105" x2="70" y2="105" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="122" x2="70" y2="122" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="139" x2="70" y2="139" stroke="currentColor" strokeWidth="1.5" />
      <rect x="24" y="105" width="46" height="17" stroke={B} strokeWidth="2" fill={B} opacity="0.12" />
      <circle cx="47" cy="113" r="4" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      <line x1="70" y1="113" x2="130" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="95" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="95" r="2" stroke={B} strokeWidth="2" fill={B} opacity="0.6" />
      <line x1="130" y1="78" x2="162" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="153" y="84" width="20" height="36" rx="5" stroke={B} strokeWidth="2" fill={B} opacity="0.1" />
      <rect x="118" y="145" width="56" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      <line x1="146" y1="157" x2="146" y2="166" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="166" x2="70" y2="166" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="114" y1="166" x2="180" y2="166" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Component map ──────────────────────────────────────────────────────────
const variantComponents: Record<Variant, React.FC> = {
  treadmill: TreadmillSVG,
  bike: BikeSVG,
  rowing: RowingSVG,
  "battle-ropes": BattleRopesSVG,
  cable: CableSVG,
  "cable-row": CableRowSVG,
  "leg-press": LegPressSVG,
  "hack-squat": HackSquatSVG,
  smith: SmithSVG,
  press: PressSVG,
  "pec-deck": PecDeckSVG,
  hyperextension: HyperextensionSVG,
  pullup: PullUpSVG,
  freeweight: FreeweightSVG,
  stack: StackSVG,
};

// ── Public component ───────────────────────────────────────────────────────
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
