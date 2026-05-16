// visit-detail.jsx — THE centerpiece.
// On "Generate prep report", four skeleton sections appear instantly and
// crossfade to real content as each completes via simulated realtime updates.
// Citations are inline italic chips that pop a side drawer to the source.

const SECTIONS = [
  { k: 'summary',   title: 'Summary',             eyebrow: '01',  delay: 1300 },
  { k: 'timeline',  title: 'Timeline',            eyebrow: '02',  delay: 2400 },
  { k: 'questions', title: 'Suggested questions', eyebrow: '03',  delay: 3500 },
  { k: 'flag',      title: 'Anything to surface',    eyebrow: '04',  delay: 4500 },
];

function VisitDetailPage({ go, data }) {
  // 'idle' | 'generating' | 'done'
  const [phase, setPhase] = React.useState('idle');
  const [ready, setReady] = React.useState({}); // section key -> true
  const [openSource, setOpenSource] = React.useState(null);
  const printRef = React.useRef(null);

  const startGeneration = () => {
    setPhase('generating');
    setReady({});
    SECTIONS.forEach((s) => {
      setTimeout(() => {
        setReady((r) => ({ ...r, [s.k]: true }));
      }, s.delay);
    });
    setTimeout(() => setPhase('done'), SECTIONS[SECTIONS.length - 1].delay + 200);
  };

  const reset = () => { setPhase('idle'); setReady({}); };
  const handlePrint = () => window.print();

  return (
    <AppShell go={go} active="visits" page="04 Visit detail">
      {/* PRINT ONLY — clean header */}
      <div className="print-only">
        <h1 className="font-display" style={{ fontSize: 28, marginBottom: 4 }}>Prep brief — Dr. Renata Hsu</h1>
        <p style={{ fontSize: 12, marginBottom: 16 }}>For personal preparation. Not medical advice — always consult your doctor.</p>
        <hr />
      </div>

      {/* Back */}
      <button onClick={() => go('dashboard')} className="inline-flex items-center gap-2 text-[14px] mb-10 no-print"
              style={{ color: 'var(--text-2)' }}>
        <IconArrowLeft size={16}/> Back to home
      </button>

      {/* Editorial header */}
      <header className="mb-16 no-print">
        <div className="smallcaps mb-5" style={{ color: 'var(--accent-contrast)' }}>Visit · in 6 days</div>
        <h1 className="font-display" style={{ fontSize: 64, lineHeight: 0.98, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Dr. Renata Hsu
        </h1>
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]" style={{ color: 'var(--text-2)' }}>
          <span className="inline-flex items-center gap-2"><IconCalendar size={16}/><span className="tabular">Monday, 18 May · 2:30 pm</span></span>
          <span className="inline-flex items-center gap-2"><IconClock size={16}/>30 minutes</span>
          <span className="inline-flex items-center gap-2"><IconMapPin size={16}/>Internal medicine · Mission Bay</span>
        </div>
        <p className="font-display italic mt-8" style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--text-2)', maxWidth: 620 }}>
          A follow-up on the recurring fatigue and your iron panel from March.
        </p>
        <SeaHorizon className="mt-10" height={36} />
      </header>

      {/* Hero card: generate */}
      {phase === 'idle' && (
        <Card padding={48} className="no-print" style={{ background: 'var(--surface)' }}>
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-8">
              <div className="smallcaps mb-4" style={{ color: 'var(--text-faint)' }}>Prep report</div>
              <h2 className="font-display" style={{ fontSize: 36, lineHeight: 1.05, fontWeight: 500 }}>
                Ready to <em style={{ color: 'var(--accent-contrast)' }}>write your brief</em>?
              </h2>
              <p className="mt-5 text-[16px]" style={{ color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 540 }}>
                We'll pull from <span className="font-medium" style={{ color: 'var(--text)' }}>{data.records.length} records</span> and{' '}
                <span className="font-medium" style={{ color: 'var(--text)' }}>{data.symptomsList.length} symptom entries</span> from the last 14 days, and produce a one-page summary, timeline, suggested questions, and anything worth flagging. Each claim is cited.
              </p>
              <div className="mt-10 flex items-center gap-4 flex-wrap">
                <Button size="lg" icon={<IconSparkle size={20}/>} onClick={startGeneration}>
                  Generate prep report
                </Button>
                <span className="text-[14px]" style={{ color: 'var(--text-faint)' }}>Takes about 8 seconds. AI-drafted, your review.</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-center">
              <Buttercup size={200} pose="sitting" />
            </div>
          </div>
        </Card>
      )}

      {(phase === 'generating' || phase === 'done') && (
        <div>
          {/* Generation status bar */}
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4 no-print">
            <div className="flex items-center gap-4">
              {phase === 'generating'
                ? <StatusPill state="processing">Writing your brief</StatusPill>
                : <StatusPill state="ready">Brief ready</StatusPill>
              }
              <span className="text-[14px]" style={{ color: 'var(--text-faint)' }}>
                {phase === 'generating'
                  ? `${Object.keys(ready).length} of ${SECTIONS.length} sections complete`
                  : 'Drafted by AI · your judgment is the final read'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" icon={<IconRotate size={16}/>} onClick={reset}>Start over</Button>
              <Button variant="secondary" size="sm" icon={<IconPrint size={16}/>} onClick={handlePrint}>Print</Button>
            </div>
          </div>

          <div ref={printRef} className="flex flex-col" style={{ gap: 64 }}>
            {SECTIONS.map((s, idx) => (
              <BriefSection
                key={s.k}
                section={s}
                ready={ready[s.k]}
                content={data.brief[s.k]}
                onCite={(c) => setOpenSource(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Citation drawer */}
      <SourceDrawer source={openSource} onClose={() => setOpenSource(null)} records={data.records} />
    </AppShell>
  );
}

function BriefSection({ section, ready, content, onCite }) {
  return (
    <section>
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-5">
            <span className="font-display tabular" style={{ fontSize: 15, color: 'var(--accent-contrast)', fontWeight: 500 }}>
              {section.eyebrow}
            </span>
            <h2 className="font-display" style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 500 }}>{section.title}</h2>
          </div>
          <span className="no-print">
            {ready ? <StatusPill state="ready" /> : <StatusPill state="processing" />}
          </span>
        </div>
        <WaveDivider color="var(--ocean)" opacity={0.45} height={10} />
      </div>

      <div style={{ minHeight: 120 }}>
        {!ready ? (
          <SectionSkeleton kind={section.k} />
        ) : (
          <div className="reveal">
            {section.k === 'summary'   && <SummaryBody   content={content} onCite={onCite} />}
            {section.k === 'timeline'  && <TimelineBody  content={content} onCite={onCite} />}
            {section.k === 'questions' && <QuestionsBody content={content} onCite={onCite} />}
            {section.k === 'flag'      && <FlagBody      content={content} onCite={onCite} />}
          </div>
        )}
      </div>
    </section>
  );
}

function SectionSkeleton({ kind }) {
  if (kind === 'questions') {
    return (
      <div className="flex flex-col gap-5 pt-2">
        {[0,1,2,3].map((i) => (
          <div key={i} className="flex gap-4 items-start">
            <SkeletonLine w={24} h={24} className="flex-none rounded-full" />
            <div className="flex-1 flex flex-col gap-2">
              <SkeletonLine w="80%" h={18} />
              <SkeletonLine w="55%" h={14} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'timeline') {
    return (
      <div className="flex flex-col gap-5 pt-2">
        {[0,1,2].map((i) => (
          <div key={i} className="flex gap-5">
            <SkeletonLine w={70} h={16} className="flex-none" />
            <SkeletonLine w="65%" h={16} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 pt-2">
      <SkeletonLine w="100%" h={16} />
      <SkeletonLine w="96%"  h={16} />
      <SkeletonLine w="88%"  h={16} />
      <SkeletonLine w="70%"  h={16} />
    </div>
  );
}

// -- Summary -----------------------------------------------------------------
function SummaryBody({ content, onCite }) {
  return (
    <div className="text-[17px]" style={{ color: 'var(--text)', lineHeight: 1.75, maxWidth: 620 }}>
      <p>
        Over the last six weeks you've logged fatigue on{' '}
        <span className="font-medium tabular">11 of 14 days</span>, most often in the late afternoon,
        with an average severity of <span className="font-medium tabular">4.2 / 10</span>{' '}
        <Citation onClick={() => onCite({ label: '14-day symptom log', record: 'symptoms' })}>(per your symptom log)</Citation>.
      </p>
      <p className="mt-5">
        Your March iron panel showed ferritin at <span className="font-medium tabular">18 ng/mL</span>, below the lab's reference range
        of 30–150{' '}
        <Citation onClick={() => onCite({ label: 'Iron panel — 14 Mar 2026', record: 'lab-iron' })}>(per your March lab report)</Citation>.
        You started a daily iron supplement on April 2{' '}
        <Citation onClick={() => onCite({ label: 'Medication note — 02 Apr', record: 'rx-iron' })}>(per your medication note)</Citation>.
      </p>
      <p className="mt-5">
        Sleep has been roughly steady at six and a half hours; you mentioned twice that fatigue worsens when meals are skipped.
      </p>
    </div>
  );
}

// -- Timeline ---------------------------------------------------------------
function TimelineBody({ content, onCite }) {
  const items = [
    { date: '14 Mar', text: 'Annual labs drawn. Ferritin 18 ng/mL.',                  src: { label: 'Iron panel — 14 Mar 2026', record: 'lab-iron' } },
    { date: '02 Apr', text: 'Started ferrous bisglycinate, 25 mg once daily.',         src: { label: 'Medication note', record: 'rx-iron' } },
    { date: '12 Apr', text: 'First logged fatigue day. Severity 5.',                   src: null },
    { date: '03 May', text: 'Tried adding a midday meal — fatigue improved that week.', src: null },
    { date: '10 May', text: 'Fatigue returned after a stressful week. Severity 6.',    src: null },
  ];
  return (
    <ol className="flex flex-col" style={{ gap: 20 }}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-6">
          <div className="flex-none w-20 pt-0.5">
            <div className="smallcaps tabular" style={{ color: 'var(--text-faint)' }}>{it.date}</div>
          </div>
          <div className="flex-none mt-2.5">
            <span className="block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
          <p className="text-[17px] flex-1" style={{ color: 'var(--text)', lineHeight: 1.6 }}>
            {it.text}{' '}
            {it.src && <Citation onClick={() => onCite(it.src)}>({it.src.label.toLowerCase()})</Citation>}
          </p>
        </li>
      ))}
    </ol>
  );
}

// -- Questions ---------------------------------------------------------------
function QuestionsBody({ content, onCite }) {
  const qs = [
    {
      q: 'Given my ferritin is still under 30, should we adjust the iron dose or change the form?',
      why: "Your March ferritin was 18 ng/mL and you've been on a low-dose supplement for ~6 weeks.",
      src: { label: 'Iron panel — 14 Mar 2026', record: 'lab-iron' },
    },
    {
      q: 'Is it worth checking B12 and thyroid before assuming this is iron-related?',
      why: 'Your fatigue pattern (afternoon, meal-linked) is consistent with several causes.',
      src: null,
    },
    {
      q: 'Should I retest iron now, or wait until the 3-month mark?',
      why: 'Standard reassessment is 3 months from start of supplementation.',
      src: { label: 'Medication note — 02 Apr', record: 'rx-iron' },
    },
    {
      q: 'Anything I should stop or pause before the next labs?',
      why: 'Some supplements affect iron readings; worth confirming.',
      src: null,
    },
  ];
  return (
    <ol className="flex flex-col" style={{ gap: 28, counterReset: 'q' }}>
      {qs.map((it, i) => (
        <li key={i} className="flex items-start gap-5">
          <div className="flex-none rounded-full inline-flex items-center justify-center tabular"
               style={{ width: 32, height: 32, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 14, fontWeight: 600 }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex-1">
            <p className="font-display" style={{ fontSize: 20, lineHeight: 1.35, fontWeight: 500, color: 'var(--text)', maxWidth: 620 }}>
              {it.q}
            </p>
            <p className="mt-2 text-[15px]" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 620 }}>
              {it.why}{' '}
              {it.src && <Citation onClick={() => onCite(it.src)}>({it.src.label.toLowerCase()})</Citation>}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// -- Flag -------------------------------------------------------------------
function FlagBody({ content, onCite }) {
  return (
    <div className="rounded-xl border" style={{ background: 'var(--warn-bg)', borderColor: 'var(--warn-bd)', padding: 28 }}>
      <div className="flex items-start gap-4">
        <span style={{ color: 'var(--warn-text)' }}><IconAlert size={22}/></span>
        <div className="flex-1">
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 500, color: 'var(--warn-text)', lineHeight: 1.2 }}>
            One thing worth saying out loud.
          </h3>
          <p className="mt-3 text-[16px]" style={{ color: 'var(--warn-text)', lineHeight: 1.7, maxWidth: 620 }}>
            On May 8 you logged a brief episode of lightheadedness on standing, severity 6{' '}
            <Citation onClick={() => onCite({ label: 'Symptom log — 08 May', record: 'symptoms' })}>(per your symptom log)</Citation>.
            It hasn't recurred, but in the context of low ferritin it's worth mentioning, even if it feels minor now.
          </p>
        </div>
      </div>
    </div>
  );
}

// -- Source drawer ----------------------------------------------------------
function SourceDrawer({ source, onClose, records }) {
  if (!source) return null;
  const rec = records.find((r) => r.id === source.record);
  return (
    <div className="fixed inset-0 z-40 flex justify-end" style={{ background: 'rgba(31, 36, 25, 0.32)', animation: 'calm-reveal 320ms ease-out both' }}
         onClick={onClose}>
      <div className="h-full w-full max-w-[480px] overflow-y-auto" style={{ background: 'var(--surface)', animation: 'calm-reveal 480ms ease-out both', boxShadow: 'var(--shadow-modal)' }}
           onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '32px 32px 48px' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="smallcaps" style={{ color: 'var(--text-faint)' }}>Source</div>
            <button onClick={onClose} className="rounded-lg p-2" style={{ color: 'var(--text-2)' }}><IconClose size={20}/></button>
          </div>
          <h3 className="font-display" style={{ fontSize: 26, lineHeight: 1.15, fontWeight: 500 }}>
            {rec?.title || source.label}
          </h3>
          <div className="mt-3 text-[14px] tabular flex items-center gap-4" style={{ color: 'var(--text-faint)' }}>
            <span>{rec?.type || 'Symptom log'}</span><span>·</span><span>{rec?.date || 'Last 14 days'}</span>
          </div>

          {/* Mocked excerpt */}
          <div className="mt-8 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: 24 }}>
            <div className="smallcaps mb-4" style={{ color: 'var(--text-faint)' }}>Extracted excerpt</div>
            {source.record === 'lab-iron' && (
              <div className="font-mono text-[13px]" style={{ color: 'var(--text)', lineHeight: 1.8 }}>
                <div>Test &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result &nbsp;&nbsp; Reference</div>
                <div className="mt-2">Hgb &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12.4 &nbsp;&nbsp;&nbsp;&nbsp; 12.0–15.5</div>
                <div>Ferritin &nbsp; <b style={{ color: 'var(--sev-high)' }}>18</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30–150</div>
                <div>TIBC &nbsp;&nbsp;&nbsp; 425 &nbsp;&nbsp;&nbsp;&nbsp; 250–450</div>
                <div>Iron sat &nbsp; 14% &nbsp;&nbsp;&nbsp;&nbsp; 20–50</div>
              </div>
            )}
            {source.record === 'symptoms' && (
              <div className="font-display italic" style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.6 }}>
                “Stood up to grab water — vision went grey for a few seconds. Sat back down. Fine within a minute, but it spooked me.”
                <div className="text-[13px] not-italic mt-3" style={{ color: 'var(--text-faint)', fontFamily: 'Inter' }}>
                  8 May · 14:22 · severity 6
                </div>
              </div>
            )}
            {source.record === 'rx-iron' && (
              <div className="text-[14px]" style={{ color: 'var(--text)', lineHeight: 1.7 }}>
                <div><b>Ferrous bisglycinate</b> — 25 mg once daily, with food.</div>
                <div className="mt-2" style={{ color: 'var(--text-2)' }}>Started 2 April 2026. Reassess in 12 weeks.</div>
              </div>
            )}
          </div>

          <Button variant="secondary" className="mt-8" iconRight={<IconArrowRight size={16}/>}>Open full record</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VisitDetailPage, SourceDrawer });
