# Handoff: My Doctor — Pre-visit prep tool

## Overview
**My Doctor** is a pre-visit prep tool. Patients upload medical records, log
symptoms, and the app generates a doctor-ready briefing they bring to the
appointment. There's also a context-aware AI chat ("Ask Buttercup") that
can reference the user's actual records when answering questions.

The brand is **editorial wellness** — large serif headlines, generous
whitespace, warm earthy palette, oversized cards. It should feel like a
considered wellness brand (Aesop / Oura / Maude) — not a medtech dashboard,
not a meditation app, not a typical SaaS product.

## About the Design Files
The files in this bundle are **design references created in HTML**
(React via inline Babel + Tailwind via CDN). They are prototypes showing
intended look and behavior — not production code to copy directly.

The task is to **recreate these designs in your target codebase** (Next.js,
Remix, Vite + React, etc.) using its established patterns: real routing,
real data fetching, real auth, a proper component library. If no codebase
exists yet, **Next.js (App Router) + Tailwind + Radix primitives + lucide-react**
is the recommended starting stack and matches the prototype's idioms closely.

## Fidelity
**High-fidelity.** Exact colors, typography, spacing, and motion are all
spec'd. Recreate the UI pixel-perfectly using the codebase's libraries.

## Screens / Views

There are seven screens.

### 1. Landing (`/`)
- **Purpose**: Marketing front door. Convert visitors to sign up.
- **Layout**:
  - Header bar — 1200px max width, 40px horizontal padding, 32px top padding.
    Wordmark left (Buttercup peek + "My Doctor" in 22px Fraunces 500),
    nav right ("Sign in" ghost + "Get started" primary).
  - Hero — 1200px max width, two-column at lg+ (`grid-cols-12`, 7/5 split).
    96px top padding, 160px bottom padding.
    - Left col: smallcaps eyebrow ("A pre-visit prep tool"),
      headline `Walk in *prepared*.` at `clamp(56px, 7vw, 88px)` with the word
      "prepared" italicized in terracotta. Below it: 22px Fraunces italic
      pull-paragraph, then 17px Inter body, then CTA row.
    - Right col: Buttercup mascot at 360px (studying pose).
  - Quiet horizontal rule (1px, `--border`).
  - Three-up feature row — 920px max width, 120px vertical padding,
    80px column gap. Each feature is a small terracotta number ("01" etc),
    a 28px Fraunces 500 title, and a 16px Inter body paragraph (line-height
    1.7). **No icon tiles** — these are editorial blocks.
  - Pull quote — 760px max width, centered, 36px Fraunces italic.
  - Footer.
- **Copy**:
  - Eyebrow: "A pre-visit prep tool"
  - Headline: `Walk in *prepared*.` (italic terracotta on "prepared")
  - Subtitle 1 (Fraunces italic 22px): "The fifteen minutes you have with your doctor deserve more than the five you spent in the waiting room."
  - Subtitle 2 (Inter 17px): "Upload your records, log how you're feeling, and bring a one-page briefing to your next appointment."
  - CTA: "Start preparing" (primary, lg)
  - Features:
    - 01 "Bring your records." — "Drop in lab results, imaging reports, discharge summaries — anything you have. We extract what matters and keep the originals private."
    - 02 "Log how you feel." — "A quick severity check-in, a couple of notes. No streaks, no points. Just an honest record so patterns surface over time."
    - 03 "Generate the brief." — "Before each visit, get a one-page summary with a timeline, questions worth asking, and items to flag — every claim cited to a source."
  - Pull quote: "I used to forget half of what I wanted to ask. Now I bring a page, and I leave with answers." — M., early user, Portland

### 2. Sign in / Sign up (`/signin`, `/signup`)
- **Purpose**: Standard auth.
- **Layout**: Centered, max 440px, generous vertical padding (64px top,
  96px bottom). Top header (Buttercup wordmark + "Create account" /
  "I have an account" toggle on right). Form below: 40px Fraunces 500 title
  ("Welcome back." / "Get started."), 16px sub, then stacked fields with
  24px gap, then primary CTA full-width.
- **Fields**:
  - Signup only: "Your name" (IconUser placeholder "Maya Okafor")
  - "Email" (IconMail, type=email)
  - "Password" (IconLock, type=password); signup shows helper text
    "At least 12 characters. A passphrase works."
- **Below CTA**: signin shows ghost "Forgot password?" link; signup shows
  privacy note: "We don't share your records. (Read our privacy note)"

### 3. Dashboard (`/dashboard`)
- **Purpose**: At-a-glance summary; entry point to chat, visits, records,
  symptoms.
- **Layout**: AppShell (see below), max content width 920px, 72px top
  padding. PageHeader (eyebrow date, 56px Fraunces title "Good morning,
  Maya.", 18px subtitle). Then a vertical stack of four large Card
  components with **80px gaps** between them:
  1. **Ask Buttercup card** — `padding: 48px`. Two-column grid (8/4).
     Left: CardTitle ("Ask Buttercup."), 16px body paragraph, then a
     56px-tall input row (bg `--bg`, 1.5px border `--border-strong`, 16px
     px-4) with text input + small "Ask" / "Open" primary button. Below it,
     two italic starter chips (`--sunken` bg, 13px Fraunces italic).
     Right: Buttercup studying at 180px.
  2. **Upcoming visit card** — `padding: 48px`. Smallcaps eyebrow
     ("Upcoming visit · in 6 days"), 36px Fraunces 500 doctor name
     ("Dr. Renata Hsu"), metadata row with calendar/pin/clock icons + 15px
     Inter text, 16px body paragraph. Large primary CTA on the right
     ("Open prep") with "Last edited 2 days ago" subtext below it.
  3. **Recent symptoms card** — CardTitle with "Log today" secondary
     button. **14-day timeline grid** (`grid-cols-14`): each column shows
     day-of-week label, a 80px-tall column with up to 3 stacked severity
     dots (12px circles, color from severity tokens, bottom-aligned), then
     a tabular date label. Empty days show a faint 1.5px circle. Legend
     row below with three swatches. Below the timeline, a 3-column stats
     row: "Logged days 9 / 14", "Avg severity 4.2", "Trending Improving".
  4. **Recent records card** — CardTitle with "All records" secondary.
     4-column responsive grid of RecordCard (`padding: 24px`, type
     smallcaps + StatusPill at top, 19px Fraunces title, 13px tabular
     date / size footer).

### 4. Records (`/records`)
- **Layout**:
  - PageHeader.
  - **Drop zone** — 200px tall, dashed 2px border, 12px radius. Default
    `--surface` bg + `--border-strong` border. On dragover: `--accent-soft`
    bg + `--accent` border. Center icon (IconUpload 32px in `--accent`),
    22px Fraunces 500 "Drop your record here.", 14px subtext with
    underlined browse link.
  - **Filter row** — 48px above the drop zone. "FILTER" smallcaps label
    on left, then chip-style buttons (4px radius, 1.5px border, 8px/16px
    padding). Inactive: transparent bg, `--border` border, `--text-2` text.
    Active: `--accent-soft` bg, `--accent` border + text. On the right:
    240px search input (1.5px `--border`, 10 row).
  - **Card grid** — `grid-cols-1 sm:2 lg:3`, 24px gap, 40px top margin.
    RecordCardFull (`padding: 28px`): type smallcaps + StatusPill, 22px
    Fraunces title, 14px snippet, horizontal rule, 13px tabular footer.
- **Filter values**: all / lab / imaging / note / rx.

### 5. Symptoms (`/symptoms`)
- **Layout**:
  - Top row: PageHeader inline (eyebrow "13 entries · 14 days", 56px title
    "How you've been.", 18px sub) + right-side controls
    (SegToggle Timeline / List + primary "Log symptom" with IconPlus).
  - **Timeline view**: weeks grouped vertically with 80px gap. Each week
    has a serif heading (28px Fraunces 500 "This week" / "Last week" /
    "Two weeks ago") with the date range right-aligned in smallcaps, then
    a horizontal rule. Below: entries as `--surface` cards (1px border,
    12px radius, 24px padding), each with a left flex column (24px
    Fraunces day + smallcaps dow), then SeverityDot + 19px Fraunces name +
    13px time + optional note paragraph.
  - **List view**: single `--surface` card with rows separated by 1px
    `--border` lines. Each row: SeverityDot, name + note, right-aligned
    date/time tabular.
- **Log symptom modal** (Modal component): max 600px. 40px padding.
  Smallcaps eyebrow ("New entry · Tuesday, 12 May"), 28px Fraunces title
  ("Log a symptom."), then form:
  1. "What are you noticing?" text input.
  2. **Severity slider — hero element**:
     - Label row: smallcaps "HOW SEVERE" left, **40px Fraunces** current
       value right, colored to match severity token.
     - 8px-tall track with tri-colored gradient (sage 0–30%, amber 30–60%,
       brick 60–100%). 24px round thumb, colored to match current
       severity, 2px cream border, soft shadow.
     - Below: tabular "1 · barely there" / "10 · debilitating".
  3. "A note (optional)" textarea, 3 rows, 1.5px border, helper text.
  Footer: ghost "Cancel" + primary "Save entry".

### 6. Visit detail (`/visits/:id`) — **THE CENTERPIECE**
- **Purpose**: Generate and review the doctor-ready prep brief.
- **Layout**:
  - Back link top-left ("← Back to home").
  - **Editorial header** — terracotta smallcaps eyebrow ("Visit · in 6
    days"), 64px Fraunces doctor name, metadata row, 20px Fraunces italic
    summary line.
  - **Phase: idle** — Hero card (`padding: 48px`, two-column 8/4):
    smallcaps eyebrow, 36px Fraunces title "Ready to *write your brief*?"
    (terracotta italic on "write your brief"), 16px body paragraph
    summarizing what will be pulled, then large primary
    "Generate prep report" CTA with IconSparkle and "Takes about 8
    seconds." subtext. Right column: Buttercup studying at 200px.
  - **Phase: generating / done** —
    - Status bar (between header and sections): StatusPill (processing
      with slow pulse, or ready), "N of 4 sections complete" / "Drafted by
      AI · your judgment is the final read", and Start over / Print buttons
      on the right.
    - **Four BriefSection blocks** stacked vertically, 64px gap. Each has:
      - Header row: 15px Fraunces 500 terracotta eyebrow number
        ("01" / "02" / "03" / "04"), 28px Fraunces 500 title, StatusPill
        right (processing or ready), thin border-bottom.
      - Body: while loading, **a custom skeleton** per section
        (summary: 4 lines decreasing width; timeline: 3 date+text rows;
        questions: 4 numbered rows; flag: same as summary). When ready,
        cross-fade in real content via `reveal` animation.
    - **Sections** (each ~ 1.1–1.3s apart):
      - **01 Summary** — 17px Inter prose, line-height 1.75, max-width
        620px, ~3 paragraphs. Bold tabular numbers inline. Citation chips
        at end of relevant sentences.
      - **02 Timeline** — ordered list, 20px row gap. Each row: 80px-wide
        smallcaps tabular date column, accent-colored 8px dot, 17px text
        with optional citation.
      - **03 Suggested questions** — ordered list, 28px gap. Each row:
        32px round number badge (accent-soft bg, accent text, tabular
        "01"), 20px Fraunces 500 question + 15px Inter "why" paragraph
        with optional citation.
      - **04 Anything to flag** — single warning card: `--warn-bg`,
        `--warn-bd` border, 28px padding. IconAlert + 20px Fraunces 500
        heading + 16px body, all in `--warn-text`.
  - **Citation chips**: italic Fraunces, dotted underline in `--text-faint`,
    hovers to terracotta. Click opens a right-side **SourceDrawer** (480px
    max width, full-height, slides in from right with overlay) showing the
    record title + metadata + an "Extracted excerpt" inset box (cream `--bg`,
    1px border) with the actual data (lab values in mono, symptom quote in
    Fraunces italic, etc).
- **Print stylesheet**: media print strips chrome, single column,
  disclaimer header at top.

### 7. Chat ("Ask Buttercup", `/chat`)
- **Purpose**: Context-aware conversation with the user's records and
  symptom log already in scope.
- **Layout**:
  - AppShell, max 920px.
  - **Editorial header**: terracotta smallcaps "Talk it through", 56px
    Fraunces title "Ask *Buttercup*." (italic terracotta on Buttercup),
    20px Fraunces italic subtitle.
  - **Context strip**: row of ContextChips ("7 records", "13 symptom
    entries", "14-day log") in `--sunken` bg.
  - **Conversation thread** (gap 56px):
    - **Empty state**: Buttercup at 200px (note pose), 28px Fraunces title
      "I've read your records. *Where do you want to start?*", 15px Inter
      sub, then four starter-prompt cards (Surface bg, 1px border, 24px
      padding) with 18px Fraunces italic quoted text. On hover the border
      switches to `--accent`.
    - **User turn**: smallcaps eyebrow "YOU · 14:32" (`--text-faint`),
      then italic 22px Fraunces body, indented 24px with a 2px **terracotta**
      left rule.
    - **Buttercup turn**: smallcaps eyebrow with mascot peek + "Buttercup"
      + tabular time in `--accent`. Below: paragraphs of 17px Inter,
      line-height 1.75, max-width 620px. Inline citations rendered as
      Citation chips that open the same SourceDrawer used in the visit
      brief.
    - **Thinking state**: same eyebrow with calm-pulse animation +
      "Buttercup is thinking", then 3 skeleton lines.
  - **Composer (sticky bottom)**: `--surface` card with 1.5px
    `--border-strong` border, 18px padding. Auto-growing textarea
    (16px Inter, line-height 1.5, min-height 28px, max-height 200px).
    Footer row: "AI-drafted. Not medical advice. Your doctor has the final
    read." on left in 12px `--text-faint`, primary "Send" small button on
    right. Enter submits, Shift+Enter newlines.

## AppShell (used on dashboard, records, symptoms, visit, chat)
- **Top bar**: 72px tall, sticky, `--bg` background, 1px bottom border.
  Left: Buttercup peek (32px) + "My Doctor" wordmark (20px Fraunces 500).
  Right: 14px ghost "Search" with IconSearch + 40px round avatar with
  initials "MO" (accent-soft bg, accent text).
- **Side rail**: 220px wide, hidden below md. Padding `32px 16px`.
  Smallcaps "Workspace" eyebrow, then nav items (44px tall, 15px Inter
  500, 12px gap to icon, 12px horizontal padding, 8px radius). Active:
  `--sunken` bg + `--text` text + `--accent` icon. Inactive: transparent
  bg + `--text-2` text + `--text-faint` icon. Order: **Home, Ask, Visits,
  Records, Symptoms**. Bottom of rail: a "Next visit" mini-card linking to
  the prep page.
- **Mobile bottom bar**: shown below md, sticky bottom, 1px top border,
  `--surface` bg. Each item: icon + 11px label.
- **Footer**: small disclaimer "Not medical advice. For personal prep
  only — always consult your doctor." in `--text-faint`, centered, 48px
  vertical padding.

## Interactions & Behavior

- **Visit-detail generation**: on click of "Generate prep report",
  immediately render all four section skeletons; then mark each section
  ready at 1300 / 2400 / 3500 / 4500 ms (use setTimeout). Phase becomes
  "done" 200ms after the last section. Each section's reveal is the
  `calm-reveal` animation: opacity 0→1 and translateY 6px→0 over 480ms
  ease-out.
- **Symptom severity slider**: thumb and current-value number recolor
  live as the user drags. 1–3 sage, 4–6 amber, 7–10 brick.
- **Records drop zone**: dragover changes bg to `--accent-soft` and
  border to `--accent`. Drop is a no-op in the prototype.
- **Filter chips** (records): active filter switches to accent treatment.
- **Chat send**: posts to `window.claude.complete` with a system message
  containing the records list and last 12 symptom entries. Model is asked
  to use `[cite:RECORD_ID]` tokens, which the client parses into Citation
  components linked to the SourceDrawer. Failures show a warning toast in
  the warn palette. Enter submits, Shift+Enter newlines.
- **Citation click**: opens SourceDrawer (right-side, slides in 480ms,
  Esc / overlay click closes).
- **Tweaks**: prototype-only — accent color, page bg, page jump.

## State Management

- **Auth state**: out of scope for prototype (sign-in just navigates).
- **Records**: array of `{ id, type, title, date, size, status, snippet }`
  where status is `'ready' | 'processing' | 'failed'`.
- **Symptoms**: an array of entries `{ name, severity, time, day, dow,
  dateLabel, note? }` plus aggregated 14-day grid and per-week groupings.
- **Chat messages**: lifted to the app root so navigation between routes
  preserves the conversation. Each message: `{ role, content, t: Date }`.
- **Pending prompt handoff**: dashboard "Ask Buttercup" card can submit a
  prompt that the chat page picks up on mount via a ref and auto-sends.
- **Visit-detail phases**: `'idle' | 'generating' | 'done'`, plus a
  `Record<sectionKey, boolean>` for per-section ready state.

## Design Tokens

```css
/* Surfaces */
--bg:           #f3efe7;  /* page background — soft warm sand */
--surface:      #faf7f0;  /* card surface — warm cream */
--sunken:       #ebe5d6;  /* nested / inset / active-nav */

/* Text */
--text:         #1f2419;  /* near-black with green undertone */
--text-2:       #5c5848;  /* secondary */
--text-faint:   #8a8576;  /* tertiary / footer disclaimer */

/* Lines */
--border:       #d9d2c0;  /* default 1px borders */
--border-strong:#b8b09c;  /* 1.5px inputs / dashed drop zone */

/* Accent — the ONLY action color */
--accent:       #3d5a3d;  /* deep forest green */
--accent-hover: #2e4830;
--accent-soft:  #e0e8dc;  /* badges, active filter chip, avatar bg */

/* Accent contrast — use as punctuation only */
--accent-contrast: #c47b4d;  /* terracotta: hero italic word,
                                eyebrow numbers on visit-detail,
                                citation hover, user-turn left rule */

/* Severity */
--sev-low:  #7b9b6e;  /* 1–3 */
--sev-mid:  #c89855;  /* 4–6 */
--sev-high: #a8513f;  /* 7–10 */

/* Warning palette — for "Anything to flag" + chat errors + failed pills */
--warn-text: #7a4a1a;
--warn-bg:   #f0e3c8;
--warn-bd:   #d4a85a;

/* Elevation — almost none */
--shadow-lift:  0 2px 8px  rgba(31, 36, 25, 0.04);  /* card hover only */
--shadow-modal: 0 8px 32px rgba(31, 36, 25, 0.08);  /* modal + drawer */
```

### Typography
- **Display**: Fraunces (Google Fonts), weights 400 & 500, optical sizing
  on, letter-spacing `-0.02em`. Italic variant for accent words ("prepared",
  "Buttercup", "write your brief"). Use Fraunces for headlines, card
  titles, pull quotes, severity number, and the Citation chips themselves.
- **UI / body**: Inter, weights 400/500/600.
- **Numbers / dates / times**: `font-variant-numeric: tabular-nums`
  everywhere.
- **Scale**: 64 / 48 / 32 / 24 / 20 / 17 / 15 / 13. Headlines are larger
  than typical web product copy.
- **Body line-height**: 1.6–1.75 for long-form reading.
- **Max line length**: ~620px on body copy for reading rhythm.
- **Rule**: never use serif for buttons, never use sans for hero headlines.

### Spacing
- 8px base.
- Page-section gaps: **80–120px** on desktop.
- Hero vertical padding: **120–160px**.
- Card padding: 32–48px (24–28px on mobile / smaller cards).
- Generally err **larger** than feels safe.

### Border radius
- 4px — badges, severity chips, filter chips, status pills, smallcaps tags
- 8px — buttons, inputs, focus targets
- 12px — cards, modals, drop zone, drawer panel
- **No fully-rounded pills.**

### Motion
- Hover: 200ms ease-out (slower than typical).
- Reveals: 320ms ease-out.
- Modals / drawer: 480ms ease-out.
- "Processing" status pill: 2000ms calm-pulse (opacity 1 → 0.55 → 1).
- Skeleton shimmer: 2400ms linear, subtle.
- **Respect `prefers-reduced-motion`**: disable pulse, shimmer, reveal.

## Components Inventory

| Component        | Variants / Props                                                              |
|------------------|-------------------------------------------------------------------------------|
| `Button`         | variant: primary / secondary / ghost / danger. size: sm / md (48px) / lg (56px). Optional icon left & right. Sentence case labels. One primary per screen. |
| `Card`           | padding default 40px. `sunken` boolean swaps bg. Subtle `--shadow-lift` on hover. |
| `StatusPill`     | state: processing (sage soft + slow pulse + dot) / ready (sunken + check) / failed (warn palette + alert) / neutral. |
| `SeverityDot`    | value 1–10, size default 12px, label boolean (numeric value next to dot). |
| `Citation`       | inline italic Fraunces with dotted underline, hover terracotta. onClick opens SourceDrawer. |
| `Field`          | small-caps label above + helper text below. Wraps Input / textarea. |
| `Input`          | 48px tall, 1.5px border, optional left icon. Focus = border color only, no glow ring. |
| `CardTitle`      | eyebrow smallcaps + 24px Fraunces title + optional right-side action button. |
| `Modal`          | overlay + centered card, Esc & overlay-click close, fade+slide reveal. |
| `SegToggle`      | inline-flex, 1.5px border, 10 tall, active swatch in accent-soft + accent text. |
| `Buttercup`      | pose: sitting / note / peek / sleeping. sitting & note use the PNG assets; peek & sleeping are SVG. |
| `SourceDrawer`   | right-side, 480px max, slide-in 480ms. Record title + smallcaps metadata + "Extracted excerpt" inset card. |
| `AppShell`       | top bar + side rail + main + mobile bottom bar + footer. |
| `PageHeader`     | smallcaps eyebrow + 56px Fraunces title + 18px subtitle. |

## Voice & Copy

- **Quietly competent.** Plain language. No emojis. Exclamation marks only
  on genuine wins.
- **Treat the user as an adult.** Honest about AI limits.
- **Errors are human and actionable**: "Couldn't read this file. PDFs and
  JPGs work best — is yours password-protected?" — never "ERR_INGEST_FAILED".
- **Disclaimer always present**: "Not medical advice. For personal prep
  only — always consult your doctor." Appears in the footer on every page.
- **Citations are editorial footnotes**: `(per your 2023 lab report)`,
  `(per your iron panel & cbc)`. Always italic, always dotted.
- **Empty states are spacious, never apologetic.** They're the most
  "wellness brand" moments.

## Assets

- **`assets/buttercup-studying.png`** — 1024×1024 transparent PNG. Otter
  reading a clipboard, wearing gold round glasses and a green stethoscope.
  Default big-hero pose; appears on landing hero, dashboard Ask card, and
  visit-detail CTA.
- **`assets/buttercup-note.png`** — 1024×1024 transparent PNG. Same otter
  holding a small note up to read, more eager / mouth-open. Used on the
  chat empty state.
- The small SVG `peek` head (drawn in `mascot.jsx`) is used at 22–40px in
  the top bar, wordmark, and chat-turn eyebrow. It's tuned to match the
  PNG art: brown body, gold round glasses, pink nose, calm smile.

## Icons
- Lucide-style line icons, stroke 1.5, inherit text color.
- 18px inline, 22px in buttons, 32–40px on empty states.
- Hand-coded in `icons.jsx` to avoid CDN dep, but **`lucide-react` is the
  recommended runtime library** for the real app — same shapes, same
  stroke width.

## Files in this bundle

```
design_handoff_my_doctor/
├─ README.md                  ← this file
├─ index.html                 ← entry point (Tailwind CDN, font imports, tokens, mounts <App/>)
├─ app.jsx                    ← router state, mock data, tweaks
├─ pages.jsx                  ← Landing, Auth, Dashboard, Records, Symptoms, AppShell
├─ visit-detail.jsx           ← Visit detail centerpiece + SourceDrawer
├─ chat.jsx                   ← Ask Buttercup chat + dashboard entry card
├─ components.jsx             ← Button, Card, StatusPill, SeverityDot, Citation, Input, Field, Modal, CardTitle
├─ icons.jsx                  ← Inline SVG icon set (lucide-equivalent)
├─ mascot.jsx                 ← Buttercup poses (PNG + SVG)
├─ tweaks-panel.jsx           ← Prototype-only tweak panel; SKIP in production
└─ assets/
   ├─ buttercup-studying.png
   └─ buttercup-note.png
```

## Implementation Suggestions

- **Routing**: use Next.js App Router. `/`, `/signin`, `/signup`,
  `/dashboard`, `/records`, `/symptoms`, `/chat`, `/visits/[id]`.
- **Component library**: Radix Primitives for Dialog/Drawer/Tabs +
  shadcn-style wrappers styled to these tokens. Don't pull in the default
  shadcn color palette; replace with the tokens above.
- **Fonts**: `next/font/google` for Fraunces (opsz `9..144`, weights
  400/500, italic too) and Inter (400/500/600).
- **Chat**: replace `window.claude.complete` with your real LLM endpoint.
  Stream responses if possible — the existing UI's "thinking" skeleton
  becomes the live-stream container. Keep the `[cite:RECORD_ID]` token
  contract and the post-process step that swaps tokens for Citation chips.
- **Records ingest**: the prototype simulates extraction. The real app
  needs a server-side OCR + structured-extraction pipeline. The "processing
  / ready / failed" StatusPill state machine is already factored.
- **Print stylesheet**: Visit Detail already has print styles — preserve
  them. Add `@page` margins and a generated header with patient name,
  doctor, and date.
- **Accessibility**: focus states are intentionally subtle (border only,
  no ring). Ensure keyboard nav works on chips, severity slider (arrow keys
  step ±1), modal trap, drawer focus return.
- **DROP the `tweaks-panel.jsx`** — it's a designer-side variation tool
  and has nothing to do with the real product.
