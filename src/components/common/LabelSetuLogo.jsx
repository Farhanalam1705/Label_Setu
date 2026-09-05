import React from 'react';

export const LabelSetuLogo = ({ className = 'w-12 h-12', alt = 'LABEL SETU Logo' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-md ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular White Background & Navy Ring */}
        <circle cx="200" cy="200" r="190" fill="#FFFFFF" />
        <circle cx="200" cy="200" r="186" fill="#FFFFFF" stroke="#0F2942" strokeWidth="12" />

        {/* Document with Barcode Behind Bridge */}
        <g transform="translate(138, 56)">
          {/* Document Body with Folded Top Right Corner */}
          <path
            d="M12 0 H88 L124 36 V128 C124 134.6 118.6 140 112 140 H12 C5.4 140 0 134.6 0 128 V12 C0 5.4 5.4 0 12 0 Z"
            fill="#FFFFFF"
            stroke="#0F2942"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          {/* Document Fold Line */}
          <path
            d="M88 0 V36 H124"
            fill="#FFFFFF"
            stroke="#0F2942"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Barcode / Scan Lines */}
          <g fill="#0F2942">
            <rect x="22" y="32" width="7" height="66" rx="3.5" />
            <rect x="36" y="32" width="5" height="66" rx="2.5" />
            <rect x="47" y="32" width="9" height="66" rx="4.5" />
            <rect x="62" y="32" width="5" height="66" rx="2.5" />
            <rect x="73" y="32" width="8" height="66" rx="4" />
            <rect x="87" y="32" width="6" height="66" rx="3" />
            <rect x="99" y="32" width="4" height="66" rx="2" />
          </g>
        </g>

        {/* Bridge (Setu) Element */}
        <g id="bridge">
          {/* Teal Suspension Cables */}
          <path
            d="M96 200 Q 138 232 198 232 Q 258 232 304 200"
            stroke="#00A896"
            strokeWidth="6.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left Tower & Anchor */}
          <path d="M96 150 V225 H108 V150 Z" fill="#0F2942" />
          <polygon points="90,150 102,136 114,150" fill="#0F2942" />

          {/* Center/Right Towers */}
          <path d="M136 142 V226 H146 V142 Z" fill="#0F2942" />
          <polygon points="132,142 141,130 150,142" fill="#0F2942" />

          <path d="M254 142 V226 H264 V142 Z" fill="#0F2942" />
          <polygon points="250,142 259,130 268,142" fill="#0F2942" />

          {/* Right Anchor Tower */}
          <path d="M292 150 V225 H304 V150 Z" fill="#0F2942" />
          <polygon points="286,150 298,136 310,150" fill="#0F2942" />

          {/* Bridge Arch Deck */}
          <path
            d="M90 220 C 130 200, 270 200, 310 220 V 254 H 280 C 280 238, 258 238, 258 254 H 222 C 222 238, 178 238, 178 254 H 142 C 142 238, 120 238, 120 254 H 90 Z"
            fill="#0F2942"
          />
        </g>

        {/* LABEL SETU Text */}
        <g transform="translate(200, 305)" textAnchor="middle">
          <text
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="40"
            letterSpacing="4"
          >
            <tspan fill="#0F2942" x="-58">
              LABEL
            </tspan>
            <tspan fill="#00A896" x="58">
              SETU
            </tspan>
          </text>
        </g>

        {/* Bottom Accent: Line Dot Line */}
        <g stroke="#0F2942" strokeWidth="4" strokeLinecap="round">
          <line x1="154" y1="340" x2="184" y2="340" />
          <circle cx="200" cy="340" r="5" fill="#00A896" stroke="none" />
          <line x1="216" y1="340" x2="246" y2="340" />
        </g>
      </svg>
    </div>
  );
};
