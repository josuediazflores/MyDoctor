// chat.jsx — "Ask Buttercup" conversation UI.
// Editorial calm, not a bubbly chatbot: turns are typeset like a magazine Q&A.
// Context-aware: passes records + symptom log to a Butterbase chat-proxy function.
// Citations: model returns [cite:RECORD_ID] tokens, we render them as Citation chips.

const CHAT_PROXY_URL = "https://api.butterbase.ai/v1/app_hsc2rrbzk5mf/fn/chat-proxy";

// Build the system prompt with the user's actual data in context.
function buildSystem(data) {
  const recordLines = data.records.map((r) =>
    `- id=${r.id} · ${r.type} · ${r.date} · ${r.title}: ${r.snippet}`
  ).join('\n');

  // last 14 days symptom summary
  const sympLines = data.symptomsList.slice(0, 12).map((s) =>
    `- ${s.dateLabel} ${s.time} · ${s.name} · severity ${s.severity}/10${s.note ? ` — "${s.note}"` : ''}`
  ).join('\n');

  return `You are Buttercup, the considered companion inside My Doctor — a pre-visit prep tool.

USER: Maya Okafor. Has a follow-up with Dr. Renata Hsu in 6 days for recurring fatigue and an iron panel follow-up.

YOUR ROLE:
- Help Maya understand what her symptoms might mean so she can have a more informed conversation with her doctor.
- You are not a doctor and you do not deliver diagnoses. You offer educated possibilities — "this could be X, Y, or Z" — never verdicts ("you have X").
- A real doctor still confirms diagnoses and writes prescriptions. Always close with a doctor-follow-up nudge.

ALWAYS DO RED-FLAG TRIAGE FIRST.
If Maya's message mentions any of these, skip the possibility list and route her to urgent care or the ER immediately, then briefly say why:
- Chest pain or pressure
- Trouble breathing or shortness of breath
- Sudden severe headache or "worst headache of my life"
- Stroke signs (face droop, arm weakness, slurred speech, sudden confusion)
- Stiff neck combined with fever
- Fainting, persistent confusion, or new severe weakness
- Severe abdominal pain
- Sustained high fever above 103°F (39.4°C), or fever with a new rash
- Signs of dehydration (no urine in 8h, dizziness, dry mouth)
- Bleeding that won't stop
- Suicidal thoughts or self-harm

IF NO RED FLAGS, RESPOND IN THIS SHAPE:
1. Briefly reflect what she said (one sentence).
2. Offer 2–4 possible conditions, ordered most-likely first, with one short reason each. Use "could be" / "fits" / "sometimes shows up as" — never "you have."
3. Suggest a couple of OTC options that ease the symptoms. For each one, name where to find it and one thing to look out for at the pharmacy.
4. Mention the prescription CLASSES a doctor might consider if a specific condition is confirmed, in plain English. Drug classes only — never specific dosages, never specific brand prescriptions written as if you're prescribing them.
5. Close with a clear next step: when to call her doctor (same day vs. this week), or "fits the prep list for Dr. Hsu next week."

ALWAYS TRANSLATE INTO PLAIN ENGLISH.
Maya is not in the medical field. Anyone reading this should understand it on a first pass.
- Diseases: name the everyday word in parentheses on first mention. "influenza (the flu)", "sinusitis (a sinus infection)", "viral upper respiratory infection (a common cold)", "gastroenteritis (a stomach bug)".
- Medicines: lead with the everyday brand people see on the box, then the generic. "Tylenol (acetaminophen)", "Advil or Motrin (ibuprofen)", "Sudafed (pseudoephedrine)", "Claritin (loratadine)", "Pepto-Bismol (bismuth subsalicylate)". For prescription drugs, the same: "Tamiflu (an antiviral)", "Z-Pak (an azithromycin antibiotic)".

NAME WHERE TO BUY AND WHAT TO LOOK OUT FOR.
For every OTC medicine you mention, in one short clause each:
- Where to find it: usually "in the cold and flu aisle at any pharmacy or grocery store" for normal OTC, or "behind the pharmacy counter — no prescription needed, but you'll show ID and sign for it" for things like real Sudafed (pseudoephedrine) and a few cough syrups, or "by prescription only — the pharmacist fills it after the doctor sends it in" for prescriptions.
- What to look out for: pick the single most useful pharmacy tip — "the store-brand version is the same medicine for less", or "skip if you have high blood pressure", or "make sure your cold med doesn't already contain Tylenol or you can double up by accident", or "ask the pharmacist about timing it away from your iron supplement", etc. Pick ONE per medicine. Do not lecture.

VOICE & FORMAT:
- Quietly competent. Plain language. Treat Maya as an adult. No emojis. No exclamation marks except on genuine wins.
- Two to four short paragraphs. The pharmacy tips are short clauses, not their own paragraph each.
- When you reference one of Maya's records, end the sentence with a citation token like [cite:lab-iron]. Use ONLY the exact ids listed below.

MAYA'S RECORDS (use these ids in [cite:ID]):
${recordLines}

MAYA'S RECENT SYMPTOM LOG (newest first):
${sympLines}

VOICE EXAMPLES:
- Good: "Runny nose, congestion, and a high fever together fit a few possibilities — most likely influenza (the flu), then a heavy cold, then early sinusitis (a sinus infection) or COVID. For the fever, Tylenol (acetaminophen) or Advil (ibuprofen) plus fluids and rest is the usual move — both sit in the cold and flu aisle at any pharmacy or grocery store, and the store-brand bottle next to them is the same medicine for less. For the congestion, Sudafed (pseudoephedrine) is the real-deal decongestant — you'll find it behind the pharmacy counter and they'll ask for your ID and a signature, which is normal. If it turns out to be flu and you're inside the first 48 hours, doctors sometimes prescribe Tamiflu (an antiviral) — that's prescription-only, the pharmacist fills it once Dr. Hsu sends it over. If sinus pressure drags past 10 days, antibiotics may come up. Worth a same-day call to Dr. Hsu's office — fever this high is the kind of thing they want to see today, not in six days."
- Good: "Your ferritin in March was 18 — below the 30–150 reference range [cite:lab-iron]. That's the most likely place to start the conversation."
- Bad: "You have the flu! Take 75 mg of Tamiflu twice daily."
- Bad: "Oh no! That sounds rough! 😟 You should definitely ask about iron!!"
- Bad (too jargon): "Sinusitis with rhinorrhea and pyrexia points toward viral URI; consider analgesia with NSAIDs and a sympathomimetic decongestant."`;
}

// Parse [cite:ID] tokens out of the model's text and render Citation chips.
function renderWithCitations(text, records, onCite) {
  const parts = [];
  const re = /\[cite:([a-z0-9\-]+)\]/gi;
  let last = 0;
  let m;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={key++}>{text.slice(last, m.index)}</span>);
    const id = m[1];
    const rec = records.find((r) => r.id === id);
    const label = rec ? rec.title.toLowerCase() : id;
    parts.push(
      <Citation key={key++} onClick={() => onCite({ label: rec?.title || id, record: id })}>
        (per your {label})
      </Citation>
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
  return parts;
}

const STARTER_PROMPTS = [
  "Walk me through what my March labs actually said.",
  "What would be most useful to ask Dr. Hsu next week?",
  "Is the fatigue pattern I've been logging unusual?",
  "Should I be worried about the lightheadedness on May 8?",
];

function ChatPage({ go, data, messages, setMessages, pendingPromptRef }) {
  const [draft, setDraft] = React.useState('');
  const [thinking, setThinking] = React.useState(false);
  const [openSource, setOpenSource] = React.useState(null);
  const [error, setError] = React.useState(null);
  const scrollRef = React.useRef(null);
  const textareaRef = React.useRef(null);
  const system = React.useMemo(() => buildSystem(data), [data]);

  // Auto-scroll on new message
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  // Auto-grow textarea
  React.useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  }, [draft]);

  const send = async (textOverride) => {
    const text = (textOverride ?? draft).trim();
    if (!text || thinking) return;
    setError(null);
    setDraft('');

    const userMsg = { role: 'user', content: text, t: new Date() };
    const next = [...messages, userMsg];
    setMessages(next);
    setThinking(true);

    try {
      const payload = {
        messages: [
          { role: 'system', content: system },
          ...next.map((m) => ({ role: m.role, content: m.content })),
        ],
      };
      const res = await fetch(CHAT_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Proxy ${res.status}: ${detail.slice(0, 200)}`);
      }
      const data = await res.json();
      const reply = (data && typeof data.content === 'string') ? data.content : '';
      if (!reply) throw new Error('Empty reply');
      setMessages([...next, { role: 'assistant', content: reply, t: new Date() }]);
    } catch (e) {
      console.error('Chat error:', e);
      setError("Couldn't reach Buttercup just now. Try again in a moment.");
    } finally {
      setThinking(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Pick up a prompt handed off from the dashboard "Ask Buttercup" card.
  React.useEffect(() => {
    const p = pendingPromptRef?.current;
    if (p) {
      pendingPromptRef.current = null;
      send(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell go={go} active="ask" page="05 Ask">
      <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 240px)' }}>
        {/* Editorial header */}
        <header className="mb-10">
          <div className="smallcaps mb-4" style={{ color: 'var(--accent-contrast)' }}>Talk it through</div>
          <h1 className="font-display" style={{ fontSize: 56, lineHeight: 1.0, fontWeight: 400 }}>
            Ask <em style={{ color: 'var(--accent-contrast)' }}>Buttercup</em>.
          </h1>
          <p className="font-display italic mt-6" style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--text-2)', maxWidth: 620 }}>
            Calm waters for thinking out loud, with everything you've uploaded already in scope.
          </p>
        </header>

        {/* Context strip */}
        <div className="flex items-center gap-2 mb-12 flex-wrap text-[13px]" style={{ color: 'var(--text-2)' }}>
          <span className="smallcaps mr-2" style={{ color: 'var(--text-faint)' }}>In scope</span>
          <ContextChip>{data.records.filter(r => r.status === 'ready').length} records</ContextChip>
          <ContextChip>{data.symptomsList.length} symptom entries</ContextChip>
          <ContextChip>14-day log</ContextChip>
        </div>

        {/* Thread */}
        <div ref={scrollRef} className="flex-1 flex flex-col" style={{ gap: 56, paddingBottom: 40 }}>
          {messages.length === 0 ? (
            <EmptyState onPick={(p) => send(p)} starters={STARTER_PROMPTS} />
          ) : (
            messages.map((m, i) => (
              <Turn key={i} message={m} records={data.records} onCite={setOpenSource} />
            ))
          )}
          {thinking && <ThinkingTurn />}
        </div>

        {error && (
          <div className="rounded-lg mb-4 px-5 py-4 text-[14px]"
               style={{ background: 'var(--warn-bg)', color: 'var(--warn-text)', border: '1px solid var(--warn-bd)' }}>
            {error}
          </div>
        )}

        {/* Composer — sticky bottom */}
        <div className="sticky bottom-0 pt-4" style={{ background: 'linear-gradient(to bottom, rgba(243,239,231,0) 0%, var(--bg) 24px)' }}>
          <div className="rounded-xl border-[1.5px] ring-quiet transition-colors"
               style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)', padding: 18 }}>
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="What's on your mind? (Shift + Return for a new line.)"
              className="w-full bg-transparent outline-none text-[16px] resize-none"
              style={{ color: 'var(--text)', lineHeight: 1.5, minHeight: 28, maxHeight: 200 }}
            />
            <div className="flex items-center justify-between mt-3 gap-3">
              <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>
                AI-drafted. Not medical advice. Your doctor has the final read.
              </span>
              <Button
                size="sm"
                onClick={() => send()}
                disabled={!draft.trim() || thinking}
                iconRight={<IconArrowRight size={16}/>}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SourceDrawer source={openSource} onClose={() => setOpenSource(null)} records={data.records} />
    </AppShell>
  );
}

function ContextChip({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded text-[13px] font-medium tabular"
          style={{ background: 'var(--sunken)', color: 'var(--text-2)', borderRadius: 4 }}>
      {children}
    </span>
  );
}

function EmptyState({ onPick, starters }) {
  return (
    <div className="relative flex flex-col items-center text-center" style={{ paddingTop: 32, paddingBottom: 16 }}>
      <WaveWatermark style={{ position: 'absolute', top: 40, left: 0, right: 0, width: '100%', height: 140, opacity: 0.7 }} />
      <Buttercup size={200} pose="note" className="relative" />
      <h2 className="font-display mt-8" style={{ fontSize: 28, lineHeight: 1.2, fontWeight: 500, maxWidth: 480 }}>
        I've read your records. <em style={{ color: 'var(--accent-contrast)' }}>Where do you want to start?</em>
      </h2>
      <p className="mt-4 text-[15px]" style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 460 }}>
        Try one of these, or just write what's on your mind.
      </p>
      <div className="flex flex-col gap-3 mt-10 w-full" style={{ maxWidth: 540 }}>
        {starters.map((p, i) => (
          <button
            key={i}
            onClick={() => onPick(p)}
            className="text-left rounded-lg border lift transition-all px-6 py-5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <span className="font-display italic" style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.4 }}>
              "{p}"
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Turn({ message, records, onCite }) {
  const isUser = message.role === 'user';
  const time = formatTime(message.t);

  if (isUser) {
    return (
      <div className="reveal">
        <div className="smallcaps mb-3 flex items-center gap-3" style={{ color: 'var(--text-faint)' }}>
          <span>You</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span className="tabular">{time}</span>
        </div>
        <div className="pl-6 border-l-2" style={{ borderColor: 'var(--accent-contrast)' }}>
          <p className="font-display italic" style={{ fontSize: 22, lineHeight: 1.45, color: 'var(--text)', fontWeight: 400, maxWidth: 620 }}>
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Assistant — paragraphs separated by blank lines
  const paras = message.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="reveal">
      <div className="smallcaps mb-4 flex items-center gap-3" style={{ color: 'var(--accent)' }}>
        <Buttercup size={22} pose="peek" />
        <span>Buttercup</span>
        <span style={{ opacity: 0.6, color: 'var(--text-faint)' }}>·</span>
        <span className="tabular" style={{ color: 'var(--text-faint)' }}>{time}</span>
      </div>
      <div className="flex flex-col gap-5" style={{ maxWidth: 620 }}>
        {paras.map((p, i) => (
          <p key={i} className="text-[17px]" style={{ color: 'var(--text)', lineHeight: 1.75 }}>
            {renderWithCitations(p, records, onCite)}
          </p>
        ))}
      </div>
    </div>
  );
}

function ThinkingTurn() {
  return (
    <div className="reveal">
      <div className="smallcaps mb-4 flex items-center gap-3 calm-pulse" style={{ color: 'var(--accent)' }}>
        <Buttercup size={22} pose="peek" />
        <span>Buttercup is thinking</span>
      </div>
      <div className="flex flex-col gap-3" style={{ maxWidth: 620 }}>
        <SkeletonLine w="92%" h={16} />
        <SkeletonLine w="86%" h={16} />
        <SkeletonLine w="64%" h={16} />
      </div>
    </div>
  );
}

function formatTime(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ── Dashboard entry card — quick prompt that launches a conversation ──────
function AskEntryCard({ onAsk }) {
  const [v, setV] = React.useState('');
  const submit = () => {
    if (!v.trim()) { onAsk(null); return; }
    onAsk(v);
  };
  const onKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
  return (
    <Card padding={48}>
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-8">
          <CardTitle eyebrow="Talk it through">Ask Buttercup.</CardTitle>
          <p className="text-[16px]" style={{ color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 540, marginTop: -16 }}>
            Think out loud about anything — symptoms, what your records mean, what to bring up with your doctor.
            Your records and the last 14 days of symptoms are already in the conversation.
          </p>

          <div className="mt-8 rounded-lg border-[1.5px] ring-quiet flex items-center gap-2 px-4"
               style={{ background: 'var(--bg)', borderColor: 'var(--border-strong)', height: 56 }}>
            <input
              value={v}
              onChange={(e) => setV(e.target.value)}
              onKeyDown={onKey}
              placeholder="What's on your mind?"
              className="flex-1 bg-transparent outline-none text-[16px]"
              style={{ color: 'var(--text)' }}
            />
            <Button size="sm" onClick={submit} iconRight={<IconArrowRight size={16}/>}>
              {v.trim() ? 'Ask' : 'Open'}
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {STARTER_PROMPTS.slice(0, 2).map((p, i) => (
              <button key={i} onClick={() => onAsk(p)}
                      className="text-[13px] font-display italic px-3 py-2 rounded transition-colors"
                      style={{ background: 'var(--sunken)', color: 'var(--text-2)', borderRadius: 4 }}>
                "{p}"
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex justify-center">
          <Buttercup size={180} pose="sitting" />
        </div>
      </div>
    </Card>
  );
}

Object.assign(window, { ChatPage, AskEntryCard, STARTER_PROMPTS });
