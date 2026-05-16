// components.jsx — shared UI primitives, all bound to the design tokens.
// Buttons, Card, StatusPill, SeverityDot, Citation, Input, Skeleton, Field, etc.

const cx = (...a) => a.filter(Boolean).join(' ');

// -------- Button --------
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, className = '', ...rest }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium select-none transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  const sizes = {
    sm: "h-9 px-4 text-[14px] rounded-lg",
    md: "h-12 px-7 text-[15px] rounded-lg",   // 48px default
    lg: "h-14 px-8 text-[16px] rounded-lg",
  };
  const variants = {
    primary:   "text-white",
    secondary: "bg-transparent border-[1.5px]",
    ghost:     "bg-transparent",
    danger:    "bg-transparent border-[1.5px]",
  };
  const styles = {
    primary:   { background: 'var(--accent)' },
    secondary: { borderColor: 'var(--border-strong)', color: 'var(--text)' },
    ghost:     { color: 'var(--text)' },
    danger:    { borderColor: 'var(--warn-bd)', color: 'var(--warn-text)' },
  }[variant];

  const onMouseEnter = (e) => {
    if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-hover)';
    if (variant === 'secondary') { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--sunken)';
    if (variant === 'danger') e.currentTarget.style.background = 'var(--warn-bg)';
    rest.onMouseEnter?.(e);
  };
  const onMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, styles, { background: variant === 'primary' ? 'var(--accent)' : 'transparent' });
    if (variant === 'secondary') { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)'; }
    if (variant === 'danger') { e.currentTarget.style.background = 'transparent'; }
    rest.onMouseLeave?.(e);
  };

  return (
    <button
      className={cx(base, sizes[size], variants[variant], className)}
      style={styles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {icon && <span className="flex-none">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex-none">{iconRight}</span>}
    </button>
  );
}

// -------- Card --------
function Card({ children, className = '', padding = 40, asSurface = true, sunken = false, style = {}, ...rest }) {
  return (
    <div
      className={cx("rounded-xl border lift", className)}
      style={{
        background: sunken ? 'var(--sunken)' : (asSurface ? 'var(--surface)' : 'transparent'),
        borderColor: 'var(--border)',
        padding: padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// -------- StatusPill --------
function StatusPill({ state = 'ready', children }) {
  // states: 'processing' | 'ready' | 'failed' | 'neutral'
  if (state === 'processing') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1 rounded calm-pulse"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4 }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
        {children || 'Processing'}
      </span>
    );
  }
  if (state === 'ready') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1"
            style={{ background: 'var(--sunken)', color: 'var(--text-2)', borderRadius: 4 }}>
        <IconCheck size={14} stroke={2} />
        {children || 'Ready'}
      </span>
    );
  }
  if (state === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1"
            style={{ background: 'var(--warn-bg)', color: 'var(--warn-text)', borderRadius: 4, border: '1px solid var(--warn-bd)' }}>
        <IconAlert size={14} />
        {children || 'Failed'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1"
          style={{ background: 'var(--sunken)', color: 'var(--text-2)', borderRadius: 4 }}>
      {children}
    </span>
  );
}

// -------- SeverityDot (with numeric value) --------
function SeverityDot({ value, size = 12, label = true, className = '' }) {
  const color = value <= 3 ? 'var(--sev-low)' : value <= 6 ? 'var(--sev-mid)' : 'var(--sev-high)';
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <span className="rounded-full flex-none" style={{ width: size, height: size, background: color }}></span>
      {label && <span className="tabular text-[14px] font-medium" style={{ color: 'var(--text)' }}>{value}</span>}
    </span>
  );
}

function sevColor(v) {
  return v <= 3 ? 'var(--sev-low)' : v <= 6 ? 'var(--sev-mid)' : 'var(--sev-high)';
}

// -------- Citation chip --------
function Citation({ children, onClick }) {
  return (
    <span className="cite" onClick={onClick}>
      {children}
    </span>
  );
}

// -------- Field (label + input + helper) --------
function Field({ label, helper, children, className = '' }) {
  return (
    <label className={cx("block", className)}>
      {label && <div className="smallcaps mb-2">{label}</div>}
      {children}
      {helper && <div className="text-[13px] mt-2" style={{ color: 'var(--text-faint)' }}>{helper}</div>}
    </label>
  );
}

function Input({ leftIcon, className = '', ...rest }) {
  return (
    <div className={cx("flex items-center gap-2 rounded-lg border-[1.5px] px-4 ring-quiet transition-colors", className)}
         style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)', height: 48 }}>
      {leftIcon && <span style={{ color: 'var(--text-faint)' }}>{leftIcon}</span>}
      <input
        className="flex-1 bg-transparent outline-none text-[15px] tabular"
        style={{ color: 'var(--text)' }}
        {...rest}
      />
    </div>
  );
}

// -------- Skeleton lines --------
function SkeletonLine({ w = '100%', h = 14, className = '' }) {
  return <div className={cx("skeleton", className)} style={{ width: w, height: h }} />;
}

// -------- Section header inside cards --------
function CardTitle({ children, eyebrow, action, className = '' }) {
  return (
    <div className={cx("flex items-end justify-between mb-8 gap-6", className)}>
      <div>
        {eyebrow && <div className="smallcaps mb-3">{eyebrow}</div>}
        <h2 className="font-display text-[24px] leading-[1.15]" style={{ color: 'var(--text)' }}>{children}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// -------- Modal --------
function Modal({ open, onClose, children, maxWidth = 560 }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(31, 36, 25, 0.32)', animation: 'calm-reveal 320ms ease-out both' }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-xl border"
        style={{
          maxWidth,
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-modal)',
          animation: 'calm-reveal 480ms ease-out both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  cx, Button, Card, StatusPill, SeverityDot, sevColor, Citation,
  Field, Input, SkeletonLine, CardTitle, Modal,
});
