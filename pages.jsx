// pages.jsx — Landing, Auth, Dashboard, Records, Symptoms.
// VisitDetail is in visit-detail.jsx because it's the centerpiece.

// ────────────────────────────────────────────────────────────────────────────
// LANDING
// ────────────────────────────────────────────────────────────────────────────
function LandingPage({ go }) {
  return (
    <div data-screen-label="01 Landing" className="min-h-screen">
      {/* Top nav — minimal, editorial */}
      <header className="flex items-center justify-between max-w-[1200px] mx-auto px-10 pt-8 pb-4">
        <Wordmark />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => go('signin')}>Sign in</Button>
          <Button size="sm" onClick={() => go('signup')}>Get started</Button>
        </div>
      </header>

      {/* HERO — editorial spread, breaks 920px constraint */}
      <section className="max-w-[1200px] mx-auto px-10 relative" style={{ paddingTop: 96, paddingBottom: 160 }}>
        {/* Soft sea watermark behind the hero */}
        <WaveWatermark className="absolute inset-x-0" style={{ bottom: 80, height: 120, width: '100%' }} />
        <div className="grid grid-cols-12 gap-10 items-center relative">
          <div className="col-span-12 lg:col-span-7">
            <div className="smallcaps mb-8" style={{ color: 'var(--text-faint)' }}>A pre-visit prep tool</div>
            <h1 className="font-display"
                style={{ fontSize: 'clamp(56px, 7vw, 88px)', lineHeight: 0.98, fontWeight: 400, color: 'var(--text)' }}>
              Walk in <em style={{ color: 'var(--accent-contrast)', fontWeight: 500 }}>prepared</em>.
            </h1>

            <p className="font-display italic mt-10" style={{ fontSize: 22, lineHeight: 1.5, color: 'var(--text-2)', maxWidth: 560 }}>
              The fifteen minutes you have with your doctor deserve more than the five you spent in the waiting room.
            </p>

            <p className="mt-6 text-[17px]" style={{ lineHeight: 1.7, color: 'var(--text-2)', maxWidth: 560 }}>
              Upload your records, log how you're feeling, and bring a one-page briefing to your next appointment.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <Button size="lg" iconRight={<IconArrowRight size={20} />} onClick={() => go('signup')}>
                Start preparing
              </Button>
              <span className="text-[14px]" style={{ color: 'var(--text-faint)' }}>Free during early access</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex justify-center">
            <Buttercup size={360} pose="sitting" />
          </div>
        </div>
      </section>

      {/* Sea-wave rule */}
      <div className="max-w-[920px] mx-auto px-6"><WaveRule /></div>

      {/* Feature triad — magazine-style, no icon tiles */}
      <section className="max-w-[920px] mx-auto px-6" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="smallcaps mb-16 text-center" style={{ color: 'var(--text-faint)' }}>How it works</div>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 80 }}>
          {[
            {
              n: '01',
              t: 'Bring your records.',
              b: 'Drop in lab results, imaging reports, discharge summaries — anything you have. We extract what matters and keep the originals private.',
            },
            {
              n: '02',
              t: 'Log how you feel.',
              b: 'A quick severity check-in, a couple of notes. No streaks, no points. Just an honest record so patterns surface over time.',
            },
            {
              n: '03',
              t: 'Generate the brief.',
              b: 'Before each visit, get a one-page summary with a timeline, questions worth asking, and items to flag — every claim cited to a source.',
            },
          ].map((f) => (
            <div key={f.n}>
              <div className="smallcaps" style={{ color: 'var(--accent-contrast)' }}>{f.n}</div>
              <h3 className="font-display mt-4" style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 500 }}>{f.t}</h3>
              <p className="mt-5 text-[16px]" style={{ lineHeight: 1.7, color: 'var(--text-2)' }}>{f.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote sea-horizon */}
      <div className="max-w-[1200px] mx-auto px-10"><SeaHorizon height={48} /></div>

      {/* Pull quote — editorial calm */}
      <section className="max-w-[760px] mx-auto px-6" style={{ paddingBottom: 120 }}>
        <div className="text-center">
          <div className="font-display italic" style={{ fontSize: 36, lineHeight: 1.3, color: 'var(--text)', fontWeight: 400 }}>
            “I used to forget half of what I wanted to ask. Now I bring a page, and I leave with answers.”
          </div>
          <div className="smallcaps mt-8" style={{ color: 'var(--text-faint)' }}>— M., early user, Portland</div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Wordmark() {
  return (
    <div className="flex items-center gap-3 select-none">
      <Buttercup size={44} pose="logo" />
      <span className="font-display tabular" style={{ fontSize: 22, letterSpacing: '-0.02em', fontWeight: 500 }}>
        My Doctor
      </span>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[920px] mx-auto px-6 text-center" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex justify-center mb-8">
          <WaveRule width={160} opacity={0.45} />
        </div>
        <p className="text-[13px]" style={{ color: 'var(--text-faint)' }}>
          Not medical advice. For personal prep only — always consult your doctor.
        </p>
        <p className="text-[12px] mt-3" style={{ color: 'var(--text-faint)' }}>
          © 2026 My Doctor · Privacy · Terms
        </p>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AUTH (sign in / sign up share layout)
// ────────────────────────────────────────────────────────────────────────────
function AuthPage({ mode = 'signin', go }) {
  const isSignup = mode === 'signup';
  return (
    <div data-screen-label={isSignup ? "02 Sign up" : "02 Sign in"} className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between max-w-[1200px] w-full mx-auto px-10 pt-8 pb-4">
        <button onClick={() => go('landing')} className="flex items-center gap-3 select-none">
          <Buttercup size={44} pose="logo" />
          <span className="font-display" style={{ fontSize: 22, letterSpacing: '-0.02em', fontWeight: 500 }}>My Doctor</span>
        </button>
        <Button variant="ghost" size="sm" onClick={() => go(isSignup ? 'signin' : 'signup')}>
          {isSignup ? 'I have an account' : 'Create account'}
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6" style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div className="w-full" style={{ maxWidth: 440 }}>
          <h1 className="font-display" style={{ fontSize: 40, lineHeight: 1.05, fontWeight: 500 }}>
            {isSignup ? 'Get started.' : 'Welcome back.'}
          </h1>
          <p className="mt-4 text-[16px]" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
            {isSignup
              ? 'A few minutes now saves you fumbling later. Your records stay yours.'
              : 'Pick up where you left off.'}
          </p>

          <div className="mt-12 flex flex-col gap-6">
            {isSignup && (
              <Field label="Your name">
                <Input leftIcon={<IconUser size={18} />} placeholder="Maya Okafor" />
              </Field>
            )}
            <Field label="Email">
              <Input leftIcon={<IconMail size={18} />} type="email" placeholder="you@example.com" />
            </Field>
            <Field label="Password" helper={isSignup ? 'At least 12 characters. A passphrase works.' : null}>
              <Input leftIcon={<IconLock size={18} />} type="password" placeholder="••••••••••••" />
            </Field>

            <Button size="lg" className="w-full mt-2" onClick={() => go('dashboard')} iconRight={<IconArrowRight size={20} />}>
              {isSignup ? 'Create my account' : 'Sign in'}
            </Button>

            {!isSignup && (
              <button className="text-[14px] text-center" style={{ color: 'var(--text-2)' }}>
                Forgot password?
              </button>
            )}
          </div>

          <p className="mt-12 text-[13px] text-center" style={{ color: 'var(--text-faint)', lineHeight: 1.6 }}>
            We don't share your records. <span className="cite">(Read our privacy note)</span>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────────────────────────────────────
function DashboardPage({ go, data, askChat }) {
  // Personalization: time-of-day greeting + countdown to the upcoming visit.
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 5 ? 'Still up' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const today = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const visitDays = 6; // mocked: visit is 6 days from today
  const visitWord = visitDays === 0 ? 'Today' : visitDays === 1 ? 'Tomorrow' : `In ${visitDays} days`;

  return (
    <AppShell go={go} active="home" page="01 Dashboard">
      <div className="relative">
        <WaveWatermark style={{ position: 'absolute', top: 8, right: -40, width: 360, height: 80, opacity: 0.6 }} />
        <PageHeader
          eyebrow={today}
          title={`${greeting}, Maya.`}
          sub={`${visitWord} you see Dr. Hsu. You've logged how you're feeling 9 of the last 14 days.`}
        />
      </div>

      <div className="flex flex-col" style={{ gap: 80 }}>
        {/* Ask Buttercup — chat entry */}
        <AskEntryCard onAsk={(prompt) => askChat(prompt)} />

        {/* Upcoming visit */}
        <Card padding={48}>
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <div className="smallcaps mb-4" style={{ color: 'var(--text-faint)' }}>Upcoming visit · in 6 days</div>
              <h2 className="font-display" style={{ fontSize: 36, lineHeight: 1.1, fontWeight: 500 }}>
                Dr. Renata Hsu
              </h2>
              <div className="mt-3 text-[15px] flex flex-wrap gap-x-6 gap-y-2" style={{ color: 'var(--text-2)' }}>
                <span className="inline-flex items-center gap-2"><IconCalendar size={16}/> <span className="tabular">Mon, 18 May · 2:30 pm</span></span>
                <span className="inline-flex items-center gap-2"><IconMapPin size={16}/> Internal medicine</span>
                <span className="inline-flex items-center gap-2"><IconClock size={16}/> 30 min</span>
              </div>
              <p className="mt-6 text-[16px]" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 540 }}>
                Follow-up on the recurring fatigue and your iron panel from March. Bring the supplement list.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <Button size="lg" iconRight={<IconArrowRight size={20}/>} onClick={() => go('visit')}>
                Open prep
              </Button>
              <span className="text-[13px]" style={{ color: 'var(--text-faint)' }}>Last edited 2 days ago</span>
            </div>
          </div>
        </Card>

        {/* Recent symptoms — 14-day timeline */}
        <Card padding={48}>
          <CardTitle eyebrow="Last 14 days" action={
            <Button variant="secondary" size="sm" icon={<IconPlus size={18}/>} onClick={() => go('symptoms')}>
              Log today
            </Button>
          }>
            How you've been feeling
          </CardTitle>

          <SymptomTimeline14Day data={data.symptoms14} />

          <div className="mt-10 grid grid-cols-3 gap-6">
            <Stat label="Logged days" value="9 / 14" />
            <Stat label="Avg severity" value="4.2" sub="last 7 days"/>
            <Stat label="Trending" value="Improving" sub="since last visit" tone="good"/>
          </div>
        </Card>

        {/* Recent records — 4-card grid */}
        <Card padding={48}>
          <CardTitle eyebrow="Records" action={
            <Button variant="secondary" size="sm" onClick={() => go('records')} iconRight={<IconArrowRight size={16}/>}>
              All records
            </Button>
          }>
            Recently added
          </CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.records.slice(0, 4).map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, sub, tone }) {
  const color = tone === 'good' ? 'var(--accent)' : 'var(--text)';
  return (
    <div>
      <div className="smallcaps mb-2">{label}</div>
      <div className="font-display tabular" style={{ fontSize: 32, fontWeight: 500, color, lineHeight: 1 }}>{value}</div>
      {sub && <div className="text-[13px] mt-2" style={{ color: 'var(--text-faint)' }}>{sub}</div>}
    </div>
  );
}

function SymptomTimeline14Day({ data }) {
  // 14 days, each cell with up to 3 colored dots. Generous spacing.
  return (
    <div>
      <div className="grid grid-cols-14 gap-3" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
        {data.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="text-[11px] tabular" style={{ color: 'var(--text-faint)' }}>{day.label}</div>
            <div className="h-20 flex flex-col-reverse items-center justify-start gap-1.5 pt-2 w-full rounded-md"
                 style={{ background: 'var(--bg)', borderRadius: 6 }}>
              {day.entries.length === 0 ? (
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
              ) : (
                day.entries.map((s, k) => (
                  <span key={k} className="rounded-full" style={{ width: 12, height: 12, background: sevColor(s) }} title={`Severity ${s}`} />
                ))
              )}
            </div>
            <div className="text-[10px] tabular" style={{ color: 'var(--text-faint)' }}>{day.date}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 mt-8 text-[13px]" style={{ color: 'var(--text-2)' }}>
        <span className="inline-flex items-center gap-2"><span className="rounded-full" style={{ width: 10, height: 10, background: 'var(--sev-low)' }}/> 1–3 mild</span>
        <span className="inline-flex items-center gap-2"><span className="rounded-full" style={{ width: 10, height: 10, background: 'var(--sev-mid)' }}/> 4–6 moderate</span>
        <span className="inline-flex items-center gap-2"><span className="rounded-full" style={{ width: 10, height: 10, background: 'var(--sev-high)' }}/> 7–10 severe</span>
      </div>
    </div>
  );
}

function RecordCard({ record, onClick }) {
  return (
    <button onClick={onClick} className="text-left rounded-xl border lift transition-all w-full"
         style={{ background: 'var(--surface)', borderColor: 'var(--border)', padding: 24 }}>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="smallcaps" style={{ color: 'var(--text-faint)' }}>{record.type}</div>
        <StatusPill state={record.status} />
      </div>
      <div className="font-display" style={{ fontSize: 19, lineHeight: 1.25, fontWeight: 500, color: 'var(--text)' }}>
        {record.title}
      </div>
      <div className="mt-5 text-[13px] tabular flex items-center justify-between" style={{ color: 'var(--text-faint)' }}>
        <span>{record.date}</span>
        <span>{record.size}</span>
      </div>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// RECORDS
// ────────────────────────────────────────────────────────────────────────────
const RECORDS_API_BASE = "https://api.butterbase.ai/v1/app_hsc2rrbzk5mf";
const ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function humanSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

async function uploadOneRecord(file, addRecord, updateRecord) {
  const tempId = `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  addRecord({
    id: tempId,
    type: "Note",
    title: file.name.replace(/\.[^.]+$/, ""),
    date: todayLabel(),
    size: humanSize(file.size),
    status: "processing",
    snippet: "Reading…",
  });

  try {
    if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type || "unknown"}. Use JPG, PNG, or PDF.`);
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new Error(`File too large (${humanSize(file.size)}). Max 10 MB.`);
    }

    const upRes = await fetch(`${RECORDS_API_BASE}/fn/records-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      }),
    });
    if (!upRes.ok) throw new Error(`records-upload ${upRes.status}: ${(await upRes.text()).slice(0, 160)}`);
    const { uploadUrl, recordId } = await upRes.json();

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!putRes.ok) throw new Error(`Storage upload ${putRes.status}`);

    updateRecord(tempId, { id: recordId, snippet: "Extracting…" });

    const procRes = await fetch(`${RECORDS_API_BASE}/fn/process-record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId }),
    });
    if (!procRes.ok) throw new Error(`process-record ${procRes.status}: ${(await procRes.text()).slice(0, 160)}`);
    const { record } = await procRes.json();

    updateRecord(recordId, {
      id: record.id,
      type: record.type,
      title: record.title,
      snippet: record.snippet,
      status: record.status,
      date: todayLabel(),
      size: humanSize(file.size),
    });
  } catch (e) {
    console.error("Upload failed:", e);
    updateRecord(tempId, { status: "failed", snippet: e.message || "Upload failed." });
  }
}

function RecordsPage({ go, data, addRecord, updateRecord }) {
  const [filter, setFilter] = React.useState('all');
  const [hover, setHover] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const filtered = filter === 'all' ? data.records : data.records.filter((r) => r.type.toLowerCase() === filter);

  const handleFiles = (fileList) => {
    if (!fileList || !addRecord || !updateRecord) return;
    Array.from(fileList).forEach((file) => uploadOneRecord(file, addRecord, updateRecord));
  };

  return (
    <AppShell go={go} active="records" page="02 Records">
      <PageHeader
        eyebrow={`${data.records.length} records`}
        title="Your records."
        sub="Originals stay private. We extract values so they can show up in your briefings."
      />

      {/* Hidden file input — triggered by drop zone or browse-files button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
      />

      {/* Drop zone */}
      <div
        className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
        style={{
          borderColor: hover ? 'var(--accent)' : 'var(--border-strong)',
          background: hover ? 'var(--accent-soft)' : 'var(--surface)',
          height: 200,
          padding: 32,
        }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          handleFiles(e.dataTransfer?.files);
        }}
      >
        <IconUpload size={32} className="mb-4" style={{ color: 'var(--accent)' }} />
        <div className="font-display" style={{ fontSize: 22, fontWeight: 500 }}>Drop your record here.</div>
        <div className="mt-2 text-[14px]" style={{ color: 'var(--text-2)' }}>
          PDFs, JPGs, PNGs. Or{' '}
          <button
            type="button"
            className="underline"
            style={{ color: 'var(--accent)' }}
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >browse files</button>.
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 mt-12 flex-wrap">
        <span className="smallcaps mr-3" style={{ color: 'var(--text-faint)' }}>Filter</span>
        {[
          ['all', 'All'],
          ['lab', 'Lab'],
          ['imaging', 'Imaging'],
          ['note', 'Visit note'],
          ['rx', 'Prescription'],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="text-[14px] font-medium transition-colors"
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: '1.5px solid',
              borderColor: filter === k ? 'var(--accent)' : 'var(--border)',
              background: filter === k ? 'var(--accent-soft)' : 'transparent',
              color: filter === k ? 'var(--accent)' : 'var(--text-2)',
            }}
          >
            {l}
          </button>
        ))}
        <div className="flex-1" />
        <div className="rounded-lg border-[1.5px] flex items-center px-3 h-10"
             style={{ borderColor: 'var(--border)', background: 'var(--surface)', width: 240 }}>
          <IconSearch size={16} style={{ color: 'var(--text-faint)' }} />
          <input className="bg-transparent outline-none text-[14px] flex-1 ml-2" placeholder="Search records…" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filtered.map((r) => (
          <RecordCardFull key={r.id} record={r} />
        ))}
      </div>
    </AppShell>
  );
}

function RecordCardFull({ record }) {
  return (
    <div className="rounded-xl border lift" style={{ background: 'var(--surface)', borderColor: 'var(--border)', padding: 28 }}>
      <div className="flex items-start justify-between mb-8">
        <div className="smallcaps" style={{ color: 'var(--text-faint)' }}>{record.type}</div>
        <StatusPill state={record.status} />
      </div>
      <div className="font-display" style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 500, color: 'var(--text)' }}>
        {record.title}
      </div>
      <p className="mt-3 text-[14px]" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
        {record.snippet}
      </p>
      <hr className="rule my-6" />
      <div className="flex items-center justify-between text-[13px] tabular" style={{ color: 'var(--text-faint)' }}>
        <span>{record.date}</span>
        <span>{record.size}</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SYMPTOMS
// ────────────────────────────────────────────────────────────────────────────
const SYMPTOMS_API_URL = "https://api.butterbase.ai/v1/app_hsc2rrbzk5mf/symptoms";

function SymptomsPage({ go, data, addSymptom }) {
  const [view, setView] = React.useState('timeline'); // 'timeline' | 'list'
  const [open, setOpen] = React.useState(false);
  const [sev, setSev] = React.useState(5);
  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState(null);

  const todayLabel = React.useMemo(() => {
    return new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  }, [open]);

  const resetForm = () => {
    setName(''); setNote(''); setSev(5); setSaveError(null); setSaving(false);
  };

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setSaveError("Add what you're noticing first — even a word is fine.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    const now = new Date();
    const payload = {
      name: trimmed,
      severity: sev,
      note: note.trim() || null,
      logged_at: now.toISOString(),
    };
    try {
      const res = await fetch(SYMPTOMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Save failed (${res.status}): ${detail.slice(0, 160)}`);
      }
      const row = await res.json();
      addSymptom?.({
        id: row.id,
        name: row.name,
        severity: row.severity,
        note: row.note || undefined,
        loggedAt: new Date(row.logged_at),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        day: String(now.getDate()).padStart(2, '0'),
        dow: now.toLocaleDateString(undefined, { weekday: 'short' }),
        dateLabel: now.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
      });
      resetForm();
      setOpen(false);
    } catch (e) {
      console.error('Symptom save failed:', e);
      setSaveError(e.message || "Couldn't save just now. Try again in a moment.");
      setSaving(false);
    }
  };

  return (
    <AppShell go={go} active="symptoms" page="03 Symptoms">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
        <PageHeader
          eyebrow={`${data.symptomsList.length} entries · 14 days`}
          title="How you've been."
          sub="A quiet record of what you're noticing. No streaks. No graphs."
          inline
        />
        <div className="flex items-center gap-3">
          <SegToggle value={view} onChange={setView} options={[
            { v: 'timeline', l: 'Timeline', i: <IconTimeline size={16}/> },
            { v: 'list',     l: 'List',     i: <IconList size={16}/> },
          ]} />
          <Button icon={<IconPlus size={20}/>} onClick={() => setOpen(true)}>Log symptom</Button>
        </div>
      </div>

      {view === 'timeline' ? (
        <SymptomTimelineView data={data.symptomsByWeek} />
      ) : (
        <SymptomListView data={data.symptomsList} />
      )}

      {/* Log modal */}
      <Modal open={open} onClose={() => { if (!saving) { resetForm(); setOpen(false); } }} maxWidth={600}>
        <div style={{ padding: 40 }}>
          <div className="flex items-start justify-between gap-6 mb-2">
            <div>
              <div className="smallcaps mb-3" style={{ color: 'var(--text-faint)' }}>New entry · {todayLabel}</div>
              <h3 className="font-display" style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 500 }}>Log a symptom.</h3>
            </div>
            <button onClick={() => { if (!saving) { resetForm(); setOpen(false); } }} className="rounded-lg p-2" style={{ color: 'var(--text-2)' }}>
              <IconClose size={20}/>
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-8">
            <Field label="What are you noticing?">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. fatigue, headache, sore throat" />
            </Field>

            <div>
              <div className="flex items-baseline justify-between mb-5">
                <div className="smallcaps">How severe</div>
                <div className="font-display tabular" style={{ fontSize: 40, fontWeight: 500, color: sevColor(sev), lineHeight: 1 }}>{sev}</div>
              </div>
              {/* Severity slider — hero element */}
              <input
                type="range" min={1} max={10} value={sev}
                onChange={(e) => setSev(parseInt(e.target.value, 10))}
                className="sev"
                style={{
                  '--thumb': sevColor(sev),
                  '--track': `linear-gradient(to right, var(--sev-low) 0%, var(--sev-low) 30%, var(--sev-mid) 30%, var(--sev-mid) 60%, var(--sev-high) 60%, var(--sev-high) 100%)`,
                }}
              />
              <div className="flex justify-between text-[13px] mt-3 tabular" style={{ color: 'var(--text-faint)' }}>
                <span>1 · barely there</span>
                <span>10 · debilitating</span>
              </div>
            </div>

            <Field label="A note (optional)" helper="Anything that might help your doctor. Skipped meals, sleep, what you tried.">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-lg border-[1.5px] outline-none text-[15px] resize-none"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)', padding: '12px 16px', color: 'var(--text)' }}
                placeholder="Started after lunch. Worse standing."
              />
            </Field>
          </div>

          {saveError && (
            <div className="rounded-lg mt-8 px-4 py-3 text-[14px]"
                 style={{ background: 'var(--warn-bg)', color: 'var(--warn-text)', border: '1px solid var(--warn-bd)' }}>
              {saveError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 mt-12">
            <Button variant="ghost" onClick={() => { if (!saving) { resetForm(); setOpen(false); } }} disabled={saving}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              {saving ? 'Saving…' : 'Save entry'}
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}

function SegToggle({ value, onChange, options }) {
  return (
    <div className="inline-flex border-[1.5px] rounded-lg overflow-hidden"
         style={{ borderColor: 'var(--border-strong)', background: 'var(--surface)' }}>
      {options.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)}
                className="px-4 h-10 text-[14px] font-medium inline-flex items-center gap-2 transition-colors"
                style={{
                  background: value === o.v ? 'var(--accent-soft)' : 'transparent',
                  color: value === o.v ? 'var(--accent)' : 'var(--text-2)',
                }}>
          {o.i}{o.l}
        </button>
      ))}
    </div>
  );
}

function SymptomTimelineView({ data }) {
  return (
    <div className="flex flex-col" style={{ gap: 80 }}>
      {data.map((week, wi) => (
        <section key={wi}>
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-display" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1 }}>{week.label}</h3>
              <span className="smallcaps tabular" style={{ color: 'var(--text-faint)' }}>{week.range}</span>
            </div>
            <WaveDivider color="var(--ocean)" opacity={0.4} height={10} />
          </div>
          <div className="flex flex-col gap-5">
            {week.entries.length === 0 ? (
              <p className="font-display italic" style={{ fontSize: 18, color: 'var(--text-faint)' }}>Nothing logged.</p>
            ) : week.entries.map((e, ei) => (
              <div key={ei} className="rounded-xl flex items-start gap-5 lift"
                   style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24 }}>
                <div className="flex-none w-16 text-center">
                  <div className="font-display tabular" style={{ fontSize: 24, fontWeight: 500 }}>{e.day}</div>
                  <div className="smallcaps mt-1" style={{ color: 'var(--text-faint)' }}>{e.dow}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <SeverityDot value={e.severity} size={14} />
                    <span className="font-display" style={{ fontSize: 19, fontWeight: 500 }}>{e.name}</span>
                    <span className="text-[13px] tabular" style={{ color: 'var(--text-faint)' }}>{e.time}</span>
                  </div>
                  {e.note && (
                    <p className="mt-3 text-[15px]" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 620 }}>
                      {e.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SymptomListView({ data }) {
  return (
    <div className="rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      {data.map((e, i) => (
        <div key={i} className="flex items-center gap-6 px-8 py-6"
             style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
          <SeverityDot value={e.severity} size={14} />
          <div className="flex-1">
            <div className="font-display" style={{ fontSize: 18, fontWeight: 500 }}>{e.name}</div>
            {e.note && <div className="text-[14px] mt-1" style={{ color: 'var(--text-2)' }}>{e.note}</div>}
          </div>
          <div className="text-[13px] tabular text-right" style={{ color: 'var(--text-faint)' }}>
            <div>{e.dateLabel}</div>
            <div>{e.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AppShell — top bar, side rail, footer
// ────────────────────────────────────────────────────────────────────────────
function AppShell({ go, active, children, page }) {
  const nav = [
    { k: 'home',     l: 'Home',     i: <IconHome size={20}/>, t: 'dashboard' },
    { k: 'ask',      l: 'Ask',      i: <IconQuote size={20}/>, t: 'chat' },
    { k: 'visits',   l: 'Visits',   i: <IconCalendar size={20}/>, t: 'visits' },
    { k: 'records',  l: 'Records',  i: <IconFile size={20}/>, t: 'records' },
    { k: 'symptoms', l: 'Symptoms', i: <IconActivity size={20}/>, t: 'symptoms' },
  ];
  return (
    <div data-screen-label={page} className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Top bar 72px */}
      <header className="border-b sticky top-0 z-30" style={{ background: 'var(--bg)', borderColor: 'var(--border)', height: 72 }}>
        <div className="h-full px-8 flex items-center justify-between">
          <button className="flex items-center gap-3 select-none" onClick={() => go('landing')}>
            <Buttercup size={44} pose="logo" />
            <span className="font-display" style={{ fontSize: 20, letterSpacing: '-0.02em', fontWeight: 500 }}>My Doctor</span>
          </button>
          <div className="flex items-center gap-6">
            <button className="text-[14px] inline-flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
              <IconSearch size={18}/> Search
            </button>
            <button className="w-10 h-10 rounded-full inline-flex items-center justify-center font-medium"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 13 }}>
              MO
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Side rail 220px (hidden on mobile) */}
        <nav className="hidden md:flex flex-col border-r" style={{ width: 220, borderColor: 'var(--border)', padding: '32px 16px' }}>
          <div className="smallcaps px-3 mb-4" style={{ color: 'var(--text-faint)' }}>Workspace</div>
          {nav.map((n) => (
            <button key={n.k} onClick={() => go(n.t)}
                    className="flex items-center gap-3 px-3 h-11 rounded-lg text-[15px] font-medium transition-colors my-0.5"
                    style={{
                      background: active === n.k ? 'var(--sunken)' : 'transparent',
                      color: active === n.k ? 'var(--text)' : 'var(--text-2)',
                    }}>
              <span style={{ color: active === n.k ? 'var(--accent)' : 'var(--text-faint)' }}>{n.i}</span>
              {n.l}
            </button>
          ))}
          <div className="flex-1" />
          <div className="px-3 py-4 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="smallcaps mb-2" style={{ color: 'var(--text-faint)' }}>Next visit</div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>Dr. Hsu</div>
            <div className="text-[12px] tabular mt-1" style={{ color: 'var(--text-2)' }}>Mon, 18 May · 2:30 pm</div>
            <button className="mt-3 text-[13px] inline-flex items-center gap-1 font-medium" onClick={() => go('visit')} style={{ color: 'var(--accent)' }}>
              Open prep <IconArrowRight size={14}/>
            </button>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto" style={{ maxWidth: 920, padding: '72px 40px 96px' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom bar */}
      <nav className="md:hidden border-t flex sticky bottom-0 z-30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {nav.map((n) => (
          <button key={n.k} onClick={() => go(n.t)} className="flex-1 flex flex-col items-center gap-1 py-3 text-[11px] font-medium"
                  style={{ color: active === n.k ? 'var(--accent)' : 'var(--text-2)' }}>
            {n.i}
            {n.l}
          </button>
        ))}
      </nav>

      <footer className="border-t no-print" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[920px] mx-auto px-6 text-center" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="flex justify-center mb-6">
            <WaveRule width={120} opacity={0.4} />
          </div>
          <p className="text-[13px]" style={{ color: 'var(--text-faint)' }}>
            Not medical advice. For personal prep only — always consult your doctor.
          </p>
        </div>
      </footer>
    </div>
  );
}

function PageHeader({ eyebrow, title, sub, inline = false }) {
  return (
    <header className={cx(inline ? "" : "mb-16")}>
      {eyebrow && <div className="smallcaps mb-4" style={{ color: 'var(--text-faint)' }}>{eyebrow}</div>}
      <h1 className="font-display" style={{ fontSize: 56, lineHeight: 1.0, fontWeight: 400, color: 'var(--text)' }}>{title}</h1>
      {sub && <p className="mt-6 text-[18px]" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 620 }}>{sub}</p>}
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// VISITS — month-grid calendar + Upcoming/Past agenda
// ────────────────────────────────────────────────────────────────────────────
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
}

function fmtTime(d) {
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function VisitsPage({ go, data }) {
  const visits = data.visits || [];
  const today = React.useMemo(() => new Date(), []);
  const [monthOffset, setMonthOffset] = React.useState(0);
  const [openVisit, setOpenVisit] = React.useState(null);

  const displayed = React.useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [today, monthOffset]
  );
  const monthName = displayed.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  // 6×7 grid starting from the Sunday on or before the 1st of the month
  const cells = React.useMemo(() => {
    const start = new Date(displayed);
    start.setDate(displayed.getDate() - displayed.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [displayed]);

  const visitsByDate = React.useMemo(() => {
    const map = {};
    visits.forEach((v) => {
      const k = v.date.toDateString();
      (map[k] = map[k] || []).push(v);
    });
    return map;
  }, [visits]);

  const upcoming = React.useMemo(
    () => visits.filter((v) => v.date >= today).sort((a, b) => a.date - b.date),
    [visits, today]
  );
  const past = React.useMemo(
    () => visits.filter((v) => v.date < today).sort((a, b) => b.date - a.date),
    [visits, today]
  );

  const openItem = (v) => {
    if (v.kind === 'upcoming' && v.detailRoute) go(v.detailRoute);
    else setOpenVisit(v);
  };

  return (
    <AppShell go={go} active="visits" page="04 Visits">
      <div className="relative">
        <WaveWatermark style={{ position: 'absolute', top: 0, right: -40, width: 360, height: 80, opacity: 0.55 }} />
        <PageHeader
          eyebrow={`${visits.length} visits · past + upcoming`}
          title="Your calendar."
          sub="Past appointments stay with you. Upcoming ones get a prep brief when you're ready."
        />
      </div>

      {/* Month nav */}
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display tabular" style={{ fontSize: 28, fontWeight: 500 }}>{monthName}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setMonthOffset((n) => n - 1)}
                  className="px-3 h-9 rounded text-[14px] transition-colors"
                  style={{ color: 'var(--text-2)', background: 'transparent' }}>
            ← Prev
          </button>
          <button onClick={() => setMonthOffset(0)}
                  className="px-3 h-9 rounded text-[13px] smallcaps transition-colors"
                  style={{ color: monthOffset === 0 ? 'var(--accent)' : 'var(--text-faint)' }}>
            Today
          </button>
          <button onClick={() => setMonthOffset((n) => n + 1)}
                  className="px-3 h-9 rounded text-[14px] transition-colors"
                  style={{ color: 'var(--text-2)', background: 'transparent' }}>
            Next →
          </button>
        </div>
      </div>
      <WaveDivider color="var(--ocean)" opacity={0.4} height={10} className="mb-6" />

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="smallcaps text-center" style={{ color: 'var(--text-faint)' }}>{d}</div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7 rounded-xl overflow-hidden"
           style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === displayed.getMonth();
          const visitsHere = visitsByDate[d.toDateString()] || [];
          const isToday = isSameDay(d, today);
          return (
            <div key={i}
                 className="border-r border-b"
                 style={{
                   borderColor: 'var(--border)',
                   borderRightWidth: (i % 7 === 6) ? 0 : 1,
                   borderBottomWidth: (i >= 35) ? 0 : 1,
                   minHeight: 92,
                   padding: '8px 8px 10px',
                   background: inMonth ? 'var(--surface)' : 'var(--sunken)',
                 }}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[13px] tabular font-medium"
                      style={{ color: inMonth ? 'var(--text)' : 'var(--text-faint)' }}>
                  {d.getDate()}
                </span>
                {isToday && (
                  <span className="text-[10px] tabular smallcaps"
                        style={{ color: 'var(--accent-contrast)' }}>Today</span>
                )}
              </div>
              {visitsHere.map((v) => {
                const upcomingCell = v.kind === 'upcoming';
                return (
                  <button key={v.id} onClick={() => openItem(v)}
                          className="block w-full text-left mb-1 rounded px-1.5 py-1 transition-colors"
                          style={{
                            background: upcomingCell ? 'var(--accent-soft)' : 'var(--sea-foam)',
                            color: upcomingCell ? 'var(--accent)' : 'var(--text-2)',
                          }}>
                    <div className="flex items-center gap-1.5">
                      <span style={{
                        width: 6, height: 6, borderRadius: 999,
                        background: upcomingCell ? 'var(--accent)' : 'var(--ocean)',
                        flexShrink: 0,
                      }} />
                      <span className="text-[11px] tabular truncate">{fmtTime(v.date)}</span>
                    </div>
                    <div className="text-[11px] truncate mt-0.5"
                         style={{ fontWeight: upcomingCell ? 500 : 400 }}>
                      {shortName(v.doctor)}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-[12px]" style={{ color: 'var(--text-faint)' }}>
        <span className="inline-flex items-center gap-2">
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent)' }} />
          Upcoming
        </span>
        <span className="inline-flex items-center gap-2">
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--ocean)' }} />
          Past
        </span>
      </div>

      {/* Agenda — Upcoming */}
      <section style={{ marginTop: 80 }}>
        <div className="mb-6">
          <h2 className="font-display mb-3" style={{ fontSize: 28, fontWeight: 500 }}>Upcoming</h2>
          <WaveDivider color="var(--ocean)" opacity={0.4} height={10} />
        </div>
        {upcoming.length === 0 ? (
          <p className="text-[15px]" style={{ color: 'var(--text-faint)' }}>
            Nothing scheduled. Quiet stretches are okay too.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {upcoming.map((v) => <AgendaRow key={v.id} v={v} onOpen={openItem} />)}
          </div>
        )}
      </section>

      {/* Agenda — Past */}
      <section style={{ marginTop: 64 }}>
        <div className="mb-6">
          <h2 className="font-display mb-3" style={{ fontSize: 28, fontWeight: 500 }}>Past</h2>
          <WaveDivider color="var(--ocean)" opacity={0.4} height={10} />
        </div>
        {past.length === 0 ? (
          <p className="text-[15px]" style={{ color: 'var(--text-faint)' }}>
            No past visits in scope yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {past.map((v) => <AgendaRow key={v.id} v={v} onOpen={openItem} />)}
          </div>
        )}
      </section>

      <VisitDrawer visit={openVisit} onClose={() => setOpenVisit(null)} />
    </AppShell>
  );
}

function shortName(s) {
  // Trim long doctor / facility names for tight calendar cells.
  return s.length > 14 ? s.slice(0, 13) + '…' : s;
}

function AgendaRow({ v, onOpen }) {
  const dateLabel = v.date.toLocaleDateString(undefined, {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
  });
  const time = fmtTime(v.date);
  const upcoming = v.kind === 'upcoming';
  return (
    <button onClick={() => onOpen(v)}
            className="text-left rounded-xl border lift transition-colors"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', padding: 24 }}>
      <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
        <div className="smallcaps tabular"
             style={{ color: upcoming ? 'var(--accent)' : 'var(--text-faint)' }}>
          {dateLabel} · {time}
        </div>
        <span className="smallcaps"
              style={{ color: upcoming ? 'var(--accent-contrast)' : 'var(--text-faint)' }}>
          {upcoming ? 'Open prep →' : 'Past'}
        </span>
      </div>
      <div className="font-display" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2 }}>{v.doctor}</div>
      <div className="text-[14px] mt-1" style={{ color: 'var(--text-2)' }}>
        {v.specialty} · {v.location}
      </div>
      {v.summary && (
        <p className="text-[14px] mt-3" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 620 }}>
          {v.summary}
        </p>
      )}
    </button>
  );
}

function VisitDrawer({ visit, onClose }) {
  React.useEffect(() => {
    if (!visit) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visit, onClose]);

  if (!visit) return null;
  const dateLabel = visit.date.toLocaleDateString(undefined, {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });
  const time = fmtTime(visit.date);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(31, 36, 25, 0.18)' }} />
      <aside onClick={(e) => e.stopPropagation()}
             className="absolute right-0 top-0 h-full overflow-y-auto"
             style={{
               width: 'min(480px, 100vw)',
               background: 'var(--surface)',
               boxShadow: 'var(--shadow-modal)',
               padding: 36,
               animation: 'calm-reveal 480ms ease-out both',
             }}>
        <button onClick={onClose}
                className="smallcaps mb-6 inline-flex items-center gap-2"
                style={{ color: 'var(--text-faint)' }}>← Close</button>
        <div className="smallcaps mb-4" style={{ color: 'var(--accent-contrast)' }}>Past visit</div>
        <h2 className="font-display" style={{ fontSize: 32, lineHeight: 1.1, fontWeight: 500 }}>
          {visit.doctor}
        </h2>
        <div className="text-[14px] mt-3" style={{ color: 'var(--text-2)' }}>
          {visit.specialty} · {visit.location}
        </div>
        <div className="smallcaps tabular mt-2" style={{ color: 'var(--text-faint)' }}>
          {dateLabel} · {time}{visit.durationMin ? ` · ${visit.durationMin} min` : ''}
        </div>
        <div className="my-6"><WaveRule /></div>
        {visit.summary ? (
          <div className="rounded-lg p-5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="smallcaps mb-3" style={{ color: 'var(--text-faint)' }}>Notes</div>
            <p className="text-[15px]" style={{ color: 'var(--text)', lineHeight: 1.7 }}>
              {visit.summary}
            </p>
          </div>
        ) : (
          <p className="text-[14px]" style={{ color: 'var(--text-faint)' }}>
            No notes recorded for this visit.
          </p>
        )}
      </aside>
    </div>
  );
}

Object.assign(window, {
  LandingPage, AuthPage, DashboardPage, RecordsPage, SymptomsPage, VisitsPage,
  AppShell, PageHeader, Wordmark, SiteFooter, RecordCard, RecordCardFull,
  SymptomTimeline14Day, SegToggle, AgendaRow, VisitDrawer,
});
