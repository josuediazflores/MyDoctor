// icons.jsx — inline SVG icons in lucide style. stroke 1.5, inherits text color.
// Slightly oversized to feel hand-drawn rather than ui-kit-tight.

const Icon = ({ d, size = 18, className = '', stroke = 1.5, fill = 'none', children, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    {children || (d ? <path d={d} /> : null)}
  </svg>
);

const IconUpload = (p) => (
  <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>
);
const IconFile = (p) => (
  <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>
);
const IconActivity = (p) => (
  <Icon {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>
);
const IconHome = (p) => (
  <Icon {...p}><path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></Icon>
);
const IconPlus = (p) => (
  <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
);
const IconCheck = (p) => (
  <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>
);
const IconAlert = (p) => (
  <Icon {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>
);
const IconArrowRight = (p) => (
  <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>
);
const IconArrowLeft = (p) => (
  <Icon {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Icon>
);
const IconClose = (p) => (
  <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>
);
const IconPrint = (p) => (
  <Icon {...p}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></Icon>
);
const IconSparkle = (p) => (
  <Icon {...p}><path d="M12 3 14 9.5 20.5 11.5 14 13.5 12 20 10 13.5 3.5 11.5 10 9.5z"/></Icon>
);
const IconRotate = (p) => (
  <Icon {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></Icon>
);
const IconList = (p) => (
  <Icon {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></Icon>
);
const IconTimeline = (p) => (
  <Icon {...p}><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><line x1="6" y1="8" x2="6" y2="10"/><line x1="6" y1="14" x2="6" y2="16"/><line x1="11" y1="6" x2="21" y2="6"/><line x1="11" y1="12" x2="21" y2="12"/><line x1="11" y1="18" x2="21" y2="18"/></Icon>
);
const IconSettings = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.03a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.03a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>
);
const IconMail = (p) => (
  <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></Icon>
);
const IconLock = (p) => (
  <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></Icon>
);
const IconUser = (p) => (
  <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>
);
const IconClock = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>
);
const IconMapPin = (p) => (
  <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>
);
const IconSearch = (p) => (
  <Icon {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>
);
const IconChevronDown = (p) => (
  <Icon {...p}><polyline points="6 9 12 15 18 9"/></Icon>
);
const IconDot = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="3" fill="currentColor"/></Icon>
);
const IconHeart = (p) => (
  <Icon {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Icon>
);
const IconQuote = (p) => (
  <Icon {...p}><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></Icon>
);

Object.assign(window, {
  Icon,
  IconUpload, IconFile, IconCalendar, IconActivity, IconHome, IconPlus,
  IconCheck, IconAlert, IconArrowRight, IconArrowLeft, IconClose, IconPrint,
  IconSparkle, IconRotate, IconList, IconTimeline, IconSettings,
  IconMail, IconLock, IconUser, IconClock, IconMapPin, IconSearch,
  IconChevronDown, IconDot, IconHeart, IconQuote,
});
