export default function EarListeningDrive() {
  return (
    <svg
      viewBox="0 0 800 450"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bare hard drive with ear listening and pulsing sound waves"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="sceneBg" x1="120" y1="70" x2="690" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FCFEFF" />
          <stop offset="1" stopColor="#EEF3F8" />
        </linearGradient>
        <linearGradient id="tableGrad" x1="140" y1="335" x2="690" y2="335" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#DEE6EF" />
          <stop offset="1" stopColor="#CAD4E0" />
        </linearGradient>
        <linearGradient id="driveTop" x1="350" y1="170" x2="650" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8FBFE" />
          <stop offset="1" stopColor="#D7E0EB" />
        </linearGradient>
        <linearGradient id="driveSide" x1="360" y1="286" x2="644" y2="336" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C7D3E0" />
          <stop offset="1" stopColor="#B2C0CF" />
        </linearGradient>
        <linearGradient id="labelPlate" x1="396" y1="194" x2="607" y2="278" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E8EEF5" />
        </linearGradient>
        <linearGradient id="earFill" x1="164" y1="160" x2="280" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E4ECF5" />
          <stop offset="1" stopColor="#CBD7E4" />
        </linearGradient>
      </defs>

      <rect x="98" y="60" width="604" height="320" rx="30" fill="url(#sceneBg)" />
      <ellipse cx="424" cy="338" rx="272" ry="34" fill="url(#tableGrad)" />

      <g className="listeningMicroShift">
        <path d="M360 184H640C651 184 660 193 660 204V286H340V204C340 193 349 184 360 184Z" fill="url(#driveTop)" stroke="#BAC7D5" strokeWidth="2" />
        <path d="M340 286H660V312C660 323 651 332 640 332H360C349 332 340 323 340 312V286Z" fill="url(#driveSide)" stroke="#AAB9C9" strokeWidth="2" />

        <rect x="392" y="198" width="214" height="86" rx="10" fill="url(#labelPlate)" stroke="#C8D3DE" />

        <circle cx="362" cy="206" r="6" fill="#9DAFC1" />
        <circle cx="638" cy="206" r="6" fill="#9DAFC1" />
        <circle cx="362" cy="308" r="6" fill="#9DAFC1" />
        <circle cx="638" cy="308" r="6" fill="#9DAFC1" />

        <rect x="642" y="286" width="12" height="22" rx="2" fill="#8FA0B3" />
        <rect x="654" y="286" width="6" height="22" rx="1.5" fill="#718399" />
      </g>

      <g className="listeningMicroShift">
        <path
          d="M252 246C214 246 182 216 182 178C182 136 214 102 256 102C298 102 332 136 332 178C332 209 313 235 286 246"
          fill="url(#earFill)"
          stroke="#A5B7CA"
          strokeWidth="4"
        />
        <path
          d="M266 142C288 150 298 174 286 194C277 210 258 220 240 215"
          stroke="#8FA4B9"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M248 175C257 178 261 187 257 194"
          stroke="#8FA4B9"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <g>
        <path
          d="M326 246C350 230 372 230 396 246"
          stroke="#6E839B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="wave1"
        />
        <path
          d="M316 230C350 209 383 209 417 230"
          stroke="#617891"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="wave2"
        />
        <path
          d="M306 214C350 187 394 187 438 214"
          stroke="#556E89"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="wave3"
        />
      </g>
    </svg>
  );
}
