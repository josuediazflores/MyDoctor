// app.jsx — main app shell, mock data, router state, tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3d5a3d",
  "bg": "#f3efe7",
  "showMascot": true,
  "density": "regular"
}/*EDITMODE-END*/;

// ────── MOCK DATA ──────────────────────────────────────────────────────────
function buildMockData() {
  // 14-day symptom timeline (oldest → newest, ending today Tue 12 May)
  const days = [
    { date: '29 Apr', dow: 'Tue', entries: [] },
    { date: '30 Apr', dow: 'Wed', entries: [4] },
    { date: '01 May', dow: 'Thu', entries: [5] },
    { date: '02 May', dow: 'Fri', entries: [] },
    { date: '03 May', dow: 'Sat', entries: [3] },
    { date: '04 May', dow: 'Sun', entries: [3, 4] },
    { date: '05 May', dow: 'Mon', entries: [5] },
    { date: '06 May', dow: 'Tue', entries: [4] },
    { date: '07 May', dow: 'Wed', entries: [] },
    { date: '08 May', dow: 'Thu', entries: [6, 6] },
    { date: '09 May', dow: 'Fri', entries: [5] },
    { date: '10 May', dow: 'Sat', entries: [6] },
    { date: '11 May', dow: 'Sun', entries: [4] },
    { date: '12 May', dow: 'Tue', entries: [4] },
  ];
  const symptoms14 = days.map((d) => ({
    label: d.dow,
    date: d.date.split(' ')[0],
    entries: d.entries,
  }));

  const records = [
    { id: 'lab-iron', type: 'Lab', title: 'Iron panel & CBC', date: '14 Mar 2026', size: '2 pages', status: 'ready',
      snippet: 'Ferritin 18 ng/mL — below reference. Hgb 12.4. Iron sat 14%.' },
    { id: 'rx-iron', type: 'Rx', title: 'Ferrous bisglycinate — daily', date: '02 Apr 2026', size: '1 page', status: 'ready',
      snippet: '25 mg once daily with food. Reassess at 12 weeks.' },
    { id: 'note-visit', type: 'Note', title: 'Annual visit — Dr. Hsu', date: '10 Mar 2026', size: '3 pages', status: 'ready',
      snippet: 'BP 118/76. Discussed fatigue. Labs ordered. Follow-up in 8 weeks.' },
    { id: 'img-thyroid', type: 'Imaging', title: 'Thyroid ultrasound', date: '08 Feb 2026', size: '4 pages', status: 'processing',
      snippet: 'Bilateral, unremarkable. No nodules above threshold.' },
    { id: 'lab-2023', type: 'Lab', title: 'Annual labs 2023', date: '22 Sep 2023', size: '2 pages', status: 'ready',
      snippet: 'Within reference except vitamin D (low). Ferritin 42 ng/mL.' },
    { id: 'rx-vitd', type: 'Rx', title: 'Vitamin D₃ 2000 IU', date: '24 Sep 2023', size: '1 page', status: 'ready',
      snippet: 'Daily. No longer active as of Jan 2025.' },
    { id: 'fail-ekg', type: 'Imaging', title: 'EKG (screenshot)', date: '11 May 2026', size: '0.4 MB', status: 'failed',
      snippet: "Couldn't read this file. PDFs and JPGs work best — is yours password-protected?" },
  ];

  const symptomsList = [
    { name: 'Fatigue',         severity: 4, time: '14:30', day: '12', dow: 'Tue', dateLabel: '12 May 2026', note: 'Hit hard after lunch.' },
    { name: 'Fatigue',         severity: 4, time: '15:10', day: '11', dow: 'Sun', dateLabel: '11 May 2026' },
    { name: 'Fatigue',         severity: 6, time: '16:00', day: '10', dow: 'Sat', dateLabel: '10 May 2026', note: 'Long week. Skipped breakfast.' },
    { name: 'Fatigue',         severity: 5, time: '13:45', day: '09', dow: 'Fri', dateLabel: '09 May 2026' },
    { name: 'Lightheadedness', severity: 6, time: '14:22', day: '08', dow: 'Thu', dateLabel: '08 May 2026', note: 'Stood up to grab water — vision went grey for a few seconds.' },
    { name: 'Fatigue',         severity: 6, time: '15:30', day: '08', dow: 'Thu', dateLabel: '08 May 2026' },
    { name: 'Fatigue',         severity: 4, time: '14:05', day: '06', dow: 'Tue', dateLabel: '06 May 2026' },
    { name: 'Fatigue',         severity: 5, time: '14:40', day: '05', dow: 'Mon', dateLabel: '05 May 2026' },
    { name: 'Headache',        severity: 3, time: '20:10', day: '04', dow: 'Sun', dateLabel: '04 May 2026', note: 'Mild. Resolved after water.' },
    { name: 'Fatigue',         severity: 4, time: '15:20', day: '04', dow: 'Sun', dateLabel: '04 May 2026' },
    { name: 'Fatigue',         severity: 3, time: '15:00', day: '03', dow: 'Sat', dateLabel: '03 May 2026' },
    { name: 'Fatigue',         severity: 5, time: '13:55', day: '01', dow: 'Thu', dateLabel: '01 May 2026' },
    { name: 'Fatigue',         severity: 4, time: '14:30', day: '30', dow: 'Wed', dateLabel: '30 Apr 2026' },
  ];

  const symptomsByWeek = [
    { label: 'This week',     range: '11 – 12 May', entries: symptomsList.slice(0, 2) },
    { label: 'Last week',     range: '04 – 10 May', entries: symptomsList.slice(2, 10) },
    { label: 'Two weeks ago', range: '27 Apr – 03 May', entries: symptomsList.slice(10) },
  ];

  return {
    records,
    symptoms14,
    symptomsList,
    symptomsByWeek,
    brief: { summary: {}, timeline: {}, questions: {}, flag: {} }, // bodies hard-coded in section components
  };
}

// ────── ROUTER ─────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Read hash to decide initial route, so refresh / inline preview persists.
  const initial = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || 'landing';
  const [route, setRoute] = React.useState(initial);

  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || 'landing');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = React.useCallback((r) => {
    setRoute(r);
    window.location.hash = r;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const data = React.useMemo(buildMockData, []);

  // Chat messages lifted here so they persist across route changes.
  const [messages, setMessages] = React.useState([]);
  // A prompt that the dashboard "Ask Buttercup" card can hand off to the chat page.
  const pendingPromptRef = React.useRef(null);

  const askChat = React.useCallback((prompt) => {
    pendingPromptRef.current = prompt || null;
    setRoute('chat');
    window.location.hash = 'chat';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Apply tweaks to CSS vars
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--bg', t.bg);
  }, [t.accent, t.bg]);

  let page;
  switch (route) {
    case 'signin':    page = <AuthPage mode="signin" go={go} />; break;
    case 'signup':    page = <AuthPage mode="signup" go={go} />; break;
    case 'dashboard': page = <DashboardPage go={go} data={data} askChat={askChat} />; break;
    case 'records':   page = <RecordsPage go={go} data={data} />; break;
    case 'symptoms':  page = <SymptomsPage go={go} data={data} />; break;
    case 'visit':     page = <VisitDetailPage go={go} data={data} />; break;
    case 'chat':      page = <ChatPage go={go} data={data} messages={messages} setMessages={setMessages} pendingPromptRef={pendingPromptRef} />; break;
    case 'landing':
    default:          page = <LandingPage go={go} />; break;
  }

  return (
    <>
      {page}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor
          label="Action color"
          value={t.accent}
          options={['#3d5a3d', '#1f3a2d', '#5a4a2a', '#4a3a5a', '#3a4a5a']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakColor
          label="Page background"
          value={t.bg}
          options={['#f3efe7', '#ebe5d6', '#efece1', '#f5f1e8', '#e8e2d0']}
          onChange={(v) => setTweak('bg', v)}
        />

        <TweakSection label="Navigation" />
        <TweakSelect
          label="Jump to page"
          value={route}
          options={[
            { value: 'landing',   label: 'Landing' },
            { value: 'signin',    label: 'Sign in' },
            { value: 'signup',    label: 'Sign up' },
            { value: 'dashboard', label: 'Dashboard' },
            { value: 'chat',      label: 'Ask Buttercup' },
            { value: 'records',   label: 'Records' },
            { value: 'symptoms',  label: 'Symptoms' },
            { value: 'visit',     label: 'Visit detail ★' },
          ]}
          onChange={go}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
