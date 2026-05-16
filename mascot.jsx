// mascot.jsx — Buttercup the otter.
//
// Big poses use the illustrated PNGs (transparent bg, 1024px square).
// 'peek' stays a tiny SVG head — at 22–40px the PNGs would be a muddy blob,
// so we redraw a clean head matching the brown-otter-with-gold-glasses look.
//
// Poses:
//   'sitting'  — default big hero. Studying / reading pose. Used everywhere
//                we want "Buttercup is preparing your brief".
//   'note'     — alt big pose. Reading from a note, slightly more eager. Used
//                in the chat empty state ("here's what I have for you").
//   'peek'     — small inline head, SVG.
//   'sleeping' — curled, eyes closed (kept SVG, used in any empty states).

function Buttercup({ size = 320, pose = 'sitting', className = '', style = {} }) {
  // ── Big illustrated poses (PNG) ───────────────────────────────────────────
  if (pose === 'sitting' || pose === 'note') {
    const src = pose === 'note'
      ? 'assets/buttercup-note.png'
      : 'assets/buttercup-studying.png';
    const alt = pose === 'note'
      ? 'Buttercup the otter reading a note'
      : 'Buttercup the otter studying';
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          // Subtle paper-shadow so the mascot sits on the warm bg without floating.
          filter: 'drop-shadow(0 6px 14px rgba(31, 36, 25, 0.06))',
          ...style,
        }}
        draggable="false"
      />
    );
  }

  // ── Small SVG head — for wordmarks, top bar, chat eyebrow ─────────────────
  // Matches the PNG art: warm brown body, cream face, gold glasses, pink nose.
  if (pose === 'peek') {
    const fur     = '#8b6a4a';
    const furDark = '#6a4e35';
    const cream   = '#f5ead4';
    const gold    = '#d4a85a';
    const pink    = '#d97a7a';
    const dark    = '#1f2419';

    return (
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           className={className} style={style} role="img" aria-label="Buttercup">
        {/* ears */}
        <ellipse cx="22" cy="26" rx="9" ry="7" fill={fur} stroke={furDark} strokeWidth="1.8"/>
        <ellipse cx="78" cy="26" rx="9" ry="7" fill={fur} stroke={furDark} strokeWidth="1.8"/>
        <ellipse cx="22" cy="27" rx="4.5" ry="3" fill={furDark} opacity="0.5"/>
        <ellipse cx="78" cy="27" rx="4.5" ry="3" fill={furDark} opacity="0.5"/>

        {/* head */}
        <path d="M14 50 C 14 28, 28 16, 50 16 C 72 16, 86 28, 86 52 C 86 72, 72 82, 50 82 C 28 82, 14 72, 14 50 Z"
              fill={fur} stroke={furDark} strokeWidth="2"/>

        {/* face cream */}
        <path d="M24 54 C 24 38, 36 32, 50 32 C 64 32, 76 38, 76 56 C 76 70, 64 76, 50 76 C 36 76, 24 70, 24 54 Z"
              fill={cream}/>

        {/* glasses — round gold frames */}
        <circle cx="38" cy="50" r="9" fill="#faf7f0" stroke={gold} strokeWidth="2.2"/>
        <circle cx="62" cy="50" r="9" fill="#faf7f0" stroke={gold} strokeWidth="2.2"/>
        <line x1="47" y1="50" x2="53" y2="50" stroke={gold} strokeWidth="2.2"/>

        {/* eyes (behind glasses) */}
        <ellipse cx="38" cy="50" rx="3" ry="3.6" fill={dark}/>
        <ellipse cx="62" cy="50" rx="3" ry="3.6" fill={dark}/>
        <circle cx="39" cy="48.5" r="1" fill="#faf7f0"/>
        <circle cx="63" cy="48.5" r="1" fill="#faf7f0"/>

        {/* nose — pink, like the reference */}
        <ellipse cx="50" cy="62" rx="3" ry="2.2" fill={pink} stroke={furDark} strokeWidth="1"/>

        {/* mouth — calm small smile */}
        <path d="M46 68 Q 50 71, 54 68" fill="none" stroke={dark} strokeWidth="1.4" strokeLinecap="round"/>

        {/* whiskers */}
        <line x1="22" y1="60" x2="6"  y2="58" stroke={furDark} strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
        <line x1="22" y1="64" x2="6"  y2="66" stroke={furDark} strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
        <line x1="78" y1="60" x2="94" y2="58" stroke={furDark} strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
        <line x1="78" y1="64" x2="94" y2="66" stroke={furDark} strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
      </svg>
    );
  }

  // ── Sleeping — small curled SVG, brown palette ────────────────────────────
  if (pose === 'sleeping') {
    const fur     = '#8b6a4a';
    const furDark = '#6a4e35';
    const cream   = '#f5ead4';
    const accent  = '#c47b4d';
    const dark    = '#1f2419';
    return (
      <svg width={size} height={size} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg"
           className={className} style={style} role="img" aria-label="Buttercup resting">
        <ellipse cx="160" cy="200" rx="110" ry="8" fill="#1f2419" opacity="0.06" />
        <path d="M60 170 C 50 110, 110 60, 180 65 C 250 70, 285 130, 260 175 C 240 200, 90 200, 60 170 Z"
              fill={fur} stroke={furDark} strokeWidth="2"/>
        <path d="M68 168 C 50 158, 50 140, 68 130 C 86 124, 102 142, 100 158" fill={fur} stroke={furDark} strokeWidth="2"/>
        <path d="M105 178 C 95 150, 115 110, 165 105 C 220 102, 250 138, 245 175 C 240 188, 130 192, 105 178 Z" fill={cream}/>
        <ellipse cx="105" cy="135" rx="42" ry="38" fill={fur} stroke={furDark} strokeWidth="2"/>
        <ellipse cx="78" cy="115" rx="9" ry="7" fill={fur} stroke={furDark} strokeWidth="2"/>
        <ellipse cx="125" cy="108" rx="9" ry="7" fill={fur} stroke={furDark} strokeWidth="2"/>
        <ellipse cx="110" cy="138" rx="28" ry="24" fill={cream}/>
        <path d="M92 132 Q 98 135, 104 132" fill="none" stroke={dark} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M118 130 Q 124 133, 130 130" fill="none" stroke={dark} strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="111" cy="147" rx="3" ry="2" fill="#d97a7a"/>
        <ellipse cx="86" cy="148" rx="6" ry="3" fill={accent} opacity="0.25"/>
        <ellipse cx="135" cy="146" rx="6" ry="3" fill={accent} opacity="0.25"/>
        <text x="180" y="80" fontFamily="Fraunces, Georgia, serif" fontSize="32" fontStyle="italic" fill={furDark} opacity="0.6">z</text>
        <text x="210" y="58" fontFamily="Fraunces, Georgia, serif" fontSize="22" fontStyle="italic" fill={furDark} opacity="0.45">z</text>
        <text x="232" y="42" fontFamily="Fraunces, Georgia, serif" fontSize="16" fontStyle="italic" fill={furDark} opacity="0.35">z</text>
      </svg>
    );
  }

  return null;
}

window.Buttercup = Buttercup;
