export default function ListenTestIcon() {
  return (
    <div className="listenIconCard mx-auto flex h-[132px] w-[132px] items-center justify-center">
      <svg
        viewBox="0 0 140 140"
        width="132"
        height="132"
        role="img"
        aria-label="Hard drive with ear listening"
        className="listenIconIdle"
      >
        <defs>
          <linearGradient id="driveFace" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        <rect x="22" y="44" width="62" height="52" rx="10" fill="url(#driveFace)" stroke="#64748b" strokeWidth="2" />
        <circle cx="53" cy="70" r="12" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="53" cy="70" r="3" fill="#64748b" />
        <rect x="70" y="86" width="10" height="4" rx="2" fill="#94a3b8" />

        <g transform="translate(0 2)">
          <path
            d="M100 47c10 0 18 8 18 18 0 8-4 13-9 16-2 1-3 3-3 5v8c0 6-5 11-11 11s-11-5-11-11V67c0-11 8-20 16-20z"
            fill="#e2e8f0"
            stroke="#64748b"
            strokeWidth="2"
          />
          <path d="M103 66c-4 0-7 3-7 7s3 7 7 7" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </g>

        <path
          d="M87 64c5-3 9-3 13 0"
          fill="none"
          stroke="#4285f4"
          strokeWidth="2"
          strokeLinecap="round"
          className="listenWave1"
        />
        <path
          d="M84 58c8-5 15-5 23 0"
          fill="none"
          stroke="#4285f4"
          strokeWidth="2"
          strokeLinecap="round"
          className="listenWave2"
        />
        <path
          d="M81 52c10-6 20-6 30 0"
          fill="none"
          stroke="#4285f4"
          strokeWidth="2"
          strokeLinecap="round"
          className="listenWave3"
        />
      </svg>
    </div>
  );
}
