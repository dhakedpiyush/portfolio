const TECH_ITEMS = [
  "Salesforce", "Apex", "LWC", "Service Cloud", "CPQ", "OmniStudio",
  "REST APIs", "Copado", "Platform Events", "SOQL", "Aura", "Flows",
  "AvSight", "AuthVia", "Accounting Seed", "Education Cloud",
  "Manufacturing Cloud", "Razorpay",
];

// Repeat 4× so the CSS loop is invisible at any speed
const TRACK = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

function Track({ reverse = false, duration = 55 }: { reverse?: boolean; duration?: number }) {
  return (
    <div className="overflow-hidden select-none" style={{ maskImage: "none" }}>
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: `marquee-${reverse ? "rtl" : "ltr"} ${duration}s linear infinite`,
          width: "max-content",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        {TRACK.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 px-3">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-foreground/28">
              {item}
            </span>
            <span className="ml-3 w-[3px] h-[3px] rounded-full bg-primary/20 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative z-20 py-4 overflow-hidden border-y border-border/10 bg-background/40">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(220 15% 6%) 30%, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(220 15% 6%) 30%, transparent)" }}
      />
      <div className="space-y-2.5">
        <Track reverse={false} duration={60} />
        <Track reverse={true} duration={70} />
      </div>
    </div>
  );
}
