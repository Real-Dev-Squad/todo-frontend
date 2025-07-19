export default function StrideAppLogo() {
  return (
    <div className="logo-gradient-bg relative h-8 w-8 overflow-hidden rounded-lg shadow-lg">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Stride by RDS App Logo"
        className="absolute inset-0"
      >
        <path className="logo-line line-1" d="M50 70 L50 50" />
        <path className="logo-line line-2" d="M50 50 L30 30" />
        <path className="logo-line line-3" d="M50 50 L70 30" />

        <circle cx="50" cy="70" r="4" fill="white" className="logo-dot dot-1" />
        <circle cx="50" cy="50" r="4" fill="white" className="logo-dot dot-2" />
        <circle cx="30" cy="30" r="4" fill="white" className="logo-dot dot-3" />
        <circle cx="70" cy="30" r="4" fill="white" className="logo-dot dot-4" />
      </svg>
    </div>
  )
}
