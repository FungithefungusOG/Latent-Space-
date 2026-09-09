export default function LatentSpaceLogo({ className = 'logo' }: { className?: string }) {
  return (
    <span className={className}>
      L<LogoA />TENT&nbsp;SP<LogoA />CE
    </span>
  );
}

function LogoA() {
  return (
    <span className="logo-char-a">
      {/* Triangle: two legs meeting at apex, no base, no crossbar */}
      <svg
        viewBox="0 0 14 18"
        height="0.82em"
        width="auto"
        style={{ display: 'inline-block', verticalAlign: '-0.05em' }}
        aria-hidden="true"
      >
        <polyline
          points="7,5 0.5,17 7,5 13.5,17"
          fill="none"
          stroke="white"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo-glow-dot logo-glow-dot--apex" />
    </span>
  );
}
