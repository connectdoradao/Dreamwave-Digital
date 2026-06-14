import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Flame, Trophy, Sparkles, Timer, Link2, Upload, Send, Share2, Gift,
  Crown, Medal, Award, Zap, Target, BookOpen, Users, Code2, Megaphone, Check, RotateCw, RotateCcw,
  ThumbsUp, ThumbsDown, TrendingUp, Globe, Heart, Quote,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";

export const Route = createFileRoute("/contributors")({
  head: () => ({
    meta: [
      { title: "Contributors — Spin. Build. Climb. | GWY 2.0" },
      { name: "description", content: "Spin the wheel, complete a task, submit proof, earn points, keep your streak alive, and climb the contributors leaderboard." },
      { property: "og:title", content: "Contributors — Spin. Build. Climb." },
      { property: "og:description", content: "A gamified contribution loop: spin → task → proof → points → streak → rank." },
    ],
  }),
  component: ContributorsPage,
});

type Category = "Content" | "Build" | "Growth" | "Learning" | "Community";
type Difficulty = "Easy" | "Medium" | "Hard";
type Task = { id: string; title: string; category: Category; difficulty: Difficulty; minutes: number; points: number };

const CATEGORY_META: Record<Category, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  Content:   { icon: Megaphone,  color: "#f97316" },
  Build:     { icon: Code2,      color: "#ef4444" },
  Growth:    { icon: Target,     color: "#f59e0b" },
  Learning:  { icon: BookOpen,   color: "#fb7185" },
  Community: { icon: Users,      color: "#fb923c" },
};

const TASKS: Task[] = [
  { id: "c1", title: "spotlight someone doing cool work→ feature a GWY member / builder in your network", category: "Content", difficulty: "Easy", minutes: 6, points: 5 },
  { id: "c2", title: "create your ‘starting AI’ kit → compile tools, links, resources into 1 doc/post", category: "Content", difficulty: "Medium", minutes: 10, points: 10 },
  { id: "c3", title: "plug into an existing ecosystem → get GWY introduced in a community (discord/slack/college club)", category: "Community", difficulty: "Easy", minutes: 3, points: 2 },
  { id: "b1", title: "collab with a creator → co-create content (live, reel, thread, etc.)", category: "Build", difficulty: "Hard", minutes: 10, points: 10 },
  { id: "b2", title: "bring 10–20 serious applicants via your network", category: "Build", difficulty: "Easy", minutes: 5, points: 5 },
  { id: "b3", title: "create a deep-dive thread/blog on why GWY matters", category: "Build", difficulty: "Medium", minutes: 7, points: 8 },
  { id: "g1", title: "Invite 3 women builders to the fellowship", category: "Growth", difficulty: "Easy", minutes: 10, points: 5},
  { id: "g2", title: "Initiate + close 1 collaboration (community/brand)es", category: "Growth", difficulty: "Hard", minutes: 10, points: 10 },
  { id: "l1", title: "3–5 posts around a theme (your journey, GWY, AI) ", category: "Learning", difficulty: "Medium", minutes: 10, points: 10 },
  { id: "l2", title: "go live / record yourself talking about what you're building", category: "Learning", difficulty: "Easy", minutes: 7, points: 8 },
  { id: "m1", title: "reach out to someone you look up to → introduce GWY to a creator / org that makes sensee", category: "Community", difficulty: "Easy", minutes: 3, points: 4},
  { id: "m2", title: "host something small but release-worthy → 30–45 min session / jam / discussionn", category: "Community", difficulty: "Medium", minutes: 2, points: 10 },
];

const DIFF_COLOR: Record<Difficulty, string> = { Easy: "bg-emerald-500/15 text-emerald-700", Medium: "bg-amber-500/15 text-amber-700", Hard: "bg-rose-500/15 text-rose-700" };

type Profile = {
  name: string;
  handle: string;
  points: number;
  streak: number;
  lastSpinDate: string | null;
  spinsToday: number;
  submissions: Submission[];
};
type Submission = { id: string; taskId: string; title: string; category: Category; difficulty: Difficulty; points: number; proofUrl: string; note: string; createdAt: number };

const KEY = "gwy_contrib_v1";
const today = () => new Date().toISOString().slice(0, 10);

const SEED_BOARD = [
  { name: "Aanya B.", handle: "aanya.b", points: 1240, streak: 9 },
  { name: "Ria Mehta", handle: "ria_codes", points: 1080, streak: 7 },
  { name: "Sana K.", handle: "sana.builds", points: 860, streak: 5 },
  { name: "Tara P.", handle: "tara.eth", points: 640, streak: 4 },
  { name: "Niharika S.", handle: "niharika", points: 510, streak: 3 },
  { name: "Kavya R.", handle: "kavya.dev", points: 380, streak: 2 },
];




const VOTES_KEY = "gwy_contrib_votes_v1";
type Vote = 1 | -1;
type VoteMap = Record<string, Vote>;

function loadVotes(): VoteMap {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(VOTES_KEY) || "{}"); } catch { return {}; }
}
function saveVotes(v: VoteMap) { localStorage.setItem(VOTES_KEY, JSON.stringify(v)); }

function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function saveProfile(p: Profile) { localStorage.setItem(KEY, JSON.stringify(p)); }
function slug(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 20); }

function mockReach(seed: string) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return 200 + (h % 4200);
}

function ContributorsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  // wheel
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState<Task | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [expired, setExpired] = useState(false);
  const tickRef = useRef<number | null>(null);

  // proof
  const [proofUrl, setProofUrl] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);

  // tabs
  const [boardTab, setBoardTab] = useState<"daily" | "weekly" | "all">("weekly");

  // peer voting
  const [votes, setVotes] = useState<VoteMap>({});

  useEffect(() => { setProfile(loadProfile()); setVotes(loadVotes()); }, []);
  useEffect(() => () => { if (tickRef.current) window.clearInterval(tickRef.current); }, []);

  function join(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const p: Profile = {
      name: name.trim(),
      handle: slug(handle || name),
      points: 0, streak: 0, lastSpinDate: null, spinsToday: 0, submissions: [],
    };
    saveProfile(p); setProfile(p);
  }

  const spinsLeft = useMemo(() => {
    if (!profile) return 2;
    if (profile.lastSpinDate !== today()) return 2;
    return Math.max(0, 2 - profile.spinsToday);
  }, [profile]);

  function spin() {
    if (!profile || spinning || spinsLeft <= 0 || active) return;
    setSpinning(true); setExpired(false);
    const i = Math.floor(Math.random() * TASKS.length);
    const seg = 360 / TASKS.length;
    const target = 360 * 6 + (360 - (i * seg + seg / 2));
    setAngle((prev) => prev + target);
    window.setTimeout(() => {
      const task = TASKS[i];
      setActive(task);
      setSpinning(false);
      // start timer
      const total = task.minutes * 60;
      setSecondsLeft(total);
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = window.setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) { window.clearInterval(tickRef.current!); setExpired(true); return 0; }
          return s - 1;
        });
      }, 1000);
      // bookkeep spins
      const isNewDay = profile.lastSpinDate !== today();
      const next: Profile = { ...profile, lastSpinDate: today(), spinsToday: isNewDay ? 1 : profile.spinsToday + 1 };
      saveProfile(next); setProfile(next);
    }, 4200);
  }

  function abandon() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    setActive(null); setExpired(false); setProofUrl(""); setNote(""); setFileName("");
  }

  function reset() {
    if (!window.confirm("Reset your contributor profile? This removes you from the leaderboard and clears all points, streaks, and submissions.")) return;
    if (tickRef.current) window.clearInterval(tickRef.current);
    localStorage.removeItem(KEY);
    localStorage.removeItem(VOTES_KEY);
    setProfile(null);
    setName(""); setHandle("");
    setSpinning(false); setAngle(0); setActive(null); setExpired(false); setSecondsLeft(0);
    setProofUrl(""); setNote(""); setFileName(""); setJustSubmitted(false);
    setVotes({});
  }

  function castVote(id: string, v: Vote) {
    setVotes((prev) => {
      const next = { ...prev };
      if (next[id] === v) delete next[id]; else next[id] = v;
      saveVotes(next);
      return next;
    });
  }

  function submitProof(e: React.FormEvent) {
    e.preventDefault();
    if (!active || !profile || expired) return;
    const validUrl = /^https?:\/\/.+\..+/i.test(proofUrl.trim());
    if (!validUrl && !fileName && !note.trim()) return;

    const sub: Submission = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      taskId: active.id, title: active.title, category: active.category, difficulty: active.difficulty,
      points: active.points, proofUrl: proofUrl.trim(), note: note.trim(), createdAt: Date.now(),
    };

    // streak: bump if first completion today (or maintain)
    const completedToday = profile.submissions.some((s) => new Date(s.createdAt).toISOString().slice(0,10) === today());
    const streakBump = completedToday ? 0 : 1;

    const next: Profile = {
      ...profile,
      points: profile.points + active.points,
      streak: profile.streak + streakBump,
      submissions: [sub, ...profile.submissions],
    };
    saveProfile(next); setProfile(next);
    setJustSubmitted(true);
    if (tickRef.current) window.clearInterval(tickRef.current);
    setActive(null); setProofUrl(""); setNote(""); setFileName("");
    setTimeout(() => setJustSubmitted(false), 2400);
  }

  const board = useMemo(() => {
    const me = profile ? [{ name: profile.name, handle: profile.handle, points: profile.points, streak: profile.streak, me: true }] : [];
    const seed = SEED_BOARD.map((b) => ({ ...b, me: false }));
    const scale = boardTab === "daily" ? 0.18 : boardTab === "weekly" ? 0.55 : 1;
    return [...me, ...seed.map((s) => ({ ...s, points: Math.round(s.points * scale) }))].sort((a, b) => b.points - a.points);
  }, [profile, boardTab]);

  const myRank = profile ? board.findIndex((e) => "me" in e && e.me) + 1 : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-4">
        <SiteNav active={"fellowship" as never} />
      </div>

      <main className="mx-auto w-[min(94%,1100px)] mt-8 space-y-6 pb-28">
        {/* Hero */}
        <section className="chapter-glass p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
                <Sparkles className="h-3.5 w-3.5" /> Contributors
              </div>
              <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight">
                Spin. Build. <span className="text-coral">Climb.</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/70 leading-relaxed">
                One spin a day. A real task. A timer that ticks. Drop your proof, earn points, keep your streak alive,
                and shoot up the contributors board.
              </p>
            </div>

            {profile && (
              <div className="flex items-center gap-3">
                <Stat icon={<Flame className="h-4 w-4" />} label="streak" value={`${profile.streak} wk`} />
                <Stat icon={<Zap className="h-4 w-4" />} label="points" value={profile.points} />
                <Stat icon={<Trophy className="h-4 w-4" />} label="rank" value={myRank ? `#${myRank}` : "—"} />
              </div>
            )}
          </div>
        </section>

        {/* Manifesto */}
        <section className="chapter-glass p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-coral/15 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <Quote className="h-7 w-7 shrink-0 text-coral" />
            <p className="font-display text-lg md:text-2xl leading-snug text-foreground/85">
              Every spin = a real task that grows this community. Complete it, prove it, earn points.
              <span className="text-coral"> Top contributors win from the prize pool</span> — and your name lives on the leaderboard forever.
            </p>
          </div>
        </section>

        {/* Community Impact — live from real proofs */}
        {(() => {
          const subs = profile?.submissions ?? [];
          const pieces = subs.length;
          const reach = subs
            .filter((s) => s.category === "Content" || s.category === "Growth")
            .reduce((sum, s) => sum + mockReach(s.id), 0);
          const builds = subs.filter((s) => s.category === "Build").length;
          const upvotes = Object.values(votes).filter((v) => v === 1).length;
          const contributors = profile ? 1 : 0;
          return (
            <section className="chapter-glass p-6 md:p-8">
              <div className="chapter-num">live · in public</div>
              {pieces === 0 ? (
                <>
                  <h2 className="mt-1 font-display text-xl md:text-2xl font-bold">
                    This community has shipped <span className="text-coral">0</span> proofs so far.
                  </h2>
                  <p className="mt-2 text-sm text-foreground/65 max-w-2xl">
                    Be the first. Every spin you complete grows this number — and the reach, builds, and peer love that follow.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mt-1 font-display text-xl md:text-2xl font-bold">
                    This community has generated{" "}
                    <span className="text-coral">{pieces.toLocaleString()}</span>{" "}
                    {pieces === 1 ? "proof" : "proofs"} so far.
                  </h2>
                  <p className="mt-2 text-sm text-foreground/65 max-w-2xl">
                    You're not posting into the void. Every proof you ship compounds — reach, hires, partnerships, and signal for the next builder.
                  </p>
                </>
              )}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <Impact icon={<TrendingUp className="h-4 w-4" />} value={reach.toLocaleString()} label="estimated reach" />
                <Impact icon={<Users className="h-4 w-4" />} value={contributors} label="active contributors" />
                <Impact icon={<Code2 className="h-4 w-4" />} value={builds} label="shipped builds" />
                <Impact icon={<Heart className="h-4 w-4" />} value={upvotes} label="peer upvotes" />
              </div>
            </section>
          );
        })()}

        {/* Join */}
        {!profile && (
          <section className="chapter-glass p-6 md:p-8">
            <h2 className="font-display text-xl md:text-2xl font-bold">Join the contributor loop</h2>
            <p className="mt-1 text-sm text-foreground/65">No signup. We keep your profile on this device.</p>
            <form onSubmit={join} className="mt-5 grid md:grid-cols-[1fr_1fr_auto] gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
                className="rounded-full border border-foreground/15 bg-white/60 px-4 py-2.5 text-sm focus:outline-none focus:border-coral" />
              <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="Handle (optional)"
                className="rounded-full border border-foreground/15 bg-white/60 px-4 py-2.5 text-sm focus:outline-none focus:border-coral" />
              <button className="rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.03] transition">
                Start contributing
              </button>
            </form>
          </section>
        )}

        {/* Wheel + Active Task */}
        <section className="grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* Wheel */}
          <div className="chapter-glass p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="chapter-num">01 · spin</div>
                <h2 className="mt-1 font-display text-xl md:text-2xl font-bold">The Daily Wheel</h2>
              </div>
              <div className="text-xs rounded-full bg-foreground/5 px-3 py-1.5">
                spins left today: <span className="font-bold text-coral">{spinsLeft}</span>
              </div>
            </div>

            <div className="relative mx-auto mt-6 aspect-square max-w-[380px]">
              {/* pointer */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-coral drop-shadow" />
              </div>
              {/* wheel */}
              <div
                className="absolute inset-0 rounded-full shadow-xl ring-4 ring-white/60"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transition: spinning ? "transform 4s cubic-bezier(.16,.84,.2,1)" : "none",
                  background: `conic-gradient(${TASKS.map((t, i) => {
                    const seg = 100 / TASKS.length;
                    const c = CATEGORY_META[t.category].color;
                    return `${c} ${i * seg}% ${(i + 1) * seg}%`;
                  }).join(", ")})`,
                }}
              >
                {TASKS.map((t, i) => {
                  const seg = 360 / TASKS.length;
                  const rot = i * seg + seg / 2;
                  const Icon = CATEGORY_META[t.category].icon;
                  return (
                    <div key={t.id} className="absolute inset-0" style={{ transform: `rotate(${rot}deg)` }}>
                      <div className="absolute left-1/2 top-3 -translate-x-1/2 text-white/95">
                        <Icon className="h-4 w-4 drop-shadow" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* hub */}
              <button
                onClick={spin}
                disabled={spinning || spinsLeft <= 0 || !!active || !profile}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 inline-flex h-24 w-24 items-center justify-center rounded-full bg-coral text-primary-foreground font-display font-bold shadow-glow disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 transition"
              >
                {spinning ? <RotateCw className="h-6 w-6 animate-spin" /> : active ? "Live" : "SPIN"}
              </button>
            </div>

            {/* legend */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {(Object.keys(CATEGORY_META) as Category[]).map((c) => {
                const Icon = CATEGORY_META[c].icon;
                return (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 text-xs">
                    <Icon className="h-3.5 w-3.5" style={{ color: CATEGORY_META[c].color }} />
                    {c}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Active task / proof */}
          <div className="chapter-glass p-6 md:p-8">
            <div className="chapter-num">02 · do the thing</div>
            <h2 className="mt-1 font-display text-xl md:text-2xl font-bold">Active task</h2>

            {!active && !justSubmitted && (
              <div className="mt-6 rounded-2xl bg-foreground/5 p-6 text-sm text-foreground/65">
                No task yet. Hit <span className="font-bold text-coral">SPIN</span> to get a random mission from the wheel.
              </div>
            )}

            {justSubmitted && (
              <div className="mt-6 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30 p-5 text-sm text-emerald-800 flex items-center gap-2">
                <Check className="h-4 w-4" /> Proof submitted. Points added. Keep going.
              </div>
            )}

            {active && (
              <>
                <div className="mt-5 rounded-2xl bg-white/60 p-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${CATEGORY_META[active.category].color}22`, color: CATEGORY_META[active.category].color }}>
                      {active.category}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${DIFF_COLOR[active.difficulty]}`}>
                      {active.difficulty}
                    </span>
                    <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-semibold">
                      +{active.points} pts
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug">{active.title}</h3>

                  {/* timer */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-foreground/65">
                      <span className="inline-flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> Time left</span>
                      <span className={`font-bold ${secondsLeft < 60 ? "text-rose-600" : "text-foreground"}`}>
                        {Math.floor(secondsLeft / 60).toString().padStart(2, "0")}:{(secondsLeft % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                      <div className="h-full bg-coral transition-[width] duration-500" style={{ width: `${Math.max(0, (secondsLeft / (active.minutes * 60)) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                {expired ? (
                  <div className="mt-4 rounded-2xl bg-rose-500/10 ring-1 ring-rose-500/30 p-4 text-sm text-rose-700">
                    Task expired. Streak protected — spin again tomorrow.
                    <button onClick={abandon} className="ml-3 underline">dismiss</button>
                  </div>
                ) : (
                  <form onSubmit={submitProof} className="mt-4 space-y-3">
                    <label className="flex items-center gap-2 rounded-full border border-foreground/15 bg-white/60 px-4 py-2.5 text-sm">
                      <Link2 className="h-4 w-4 text-foreground/60" />
                      <input value={proofUrl} onChange={(e) => setProofUrl(e.target.value)}
                        placeholder="Paste proof URL (Twitter, LinkedIn, GitHub…)"
                        className="flex-1 bg-transparent focus:outline-none" />
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-foreground/15 bg-white/60 px-4 py-2.5 text-sm cursor-pointer">
                      <Upload className="h-4 w-4 text-foreground/60" />
                      <span className="text-foreground/65 truncate">{fileName || "Attach a screenshot (optional)"}</span>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                    </label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
                      placeholder="One line: what did you actually do?"
                      className="w-full resize-none rounded-2xl border border-foreground/15 bg-white/60 px-4 py-2.5 text-sm focus:outline-none focus:border-coral" />
                    <div className="flex items-center gap-2">
                      <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.03] transition">
                        <Send className="h-3.5 w-3.5" /> Submit proof
                      </button>
                      <button type="button" onClick={abandon} className="rounded-full border border-foreground/15 px-4 py-2.5 text-xs font-semibold hover:bg-white/60 transition">
                        Skip
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just completed: ${active.title} 🔥 #GWY2`)}`}
                        target="_blank" rel="noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-foreground/70 hover:text-foreground"
                      >
                        <Share2 className="h-3.5 w-3.5" /> share
                      </a>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </section>

        {/* Leaderboard */}
        <section className="chapter-glass p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-coral" />
              <h2 className="font-display text-xl md:text-2xl font-bold">Contributors board</h2>
            </div>
            <div className="inline-flex rounded-full bg-foreground/5 p-1 text-xs">
              {(["daily","weekly","all"] as const).map((t) => (
                <button key={t} onClick={() => setBoardTab(t)}
                  className={`rounded-full px-3 py-1.5 capitalize transition ${boardTab === t ? "bg-coral text-primary-foreground shadow-glow" : "text-foreground/65 hover:text-foreground"}`}>
                  {t === "all" ? "all-time" : t}
                </button>
              ))}
            </div>
          </div>

          <ol className="mt-5 space-y-2">
            {board.map((e, i) => {
              const rankIcon = i === 0 ? <Crown className="h-4 w-4 text-amber-500" /> : i === 1 ? <Medal className="h-4 w-4 text-slate-400" /> : i === 2 ? <Award className="h-4 w-4 text-amber-700" /> : null;
              const isMe = "me" in e && e.me;
              return (
                <li key={`${e.handle}-${i}`} className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition ${isMe ? "bg-coral/15 ring-1 ring-coral/40" : i < 3 ? "bg-white/60" : "bg-foreground/[0.03]"}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background font-bold text-sm">{i + 1}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-semibold truncate">
                        {e.name} {rankIcon}
                        {isMe && <span className="text-[10px] font-bold uppercase tracking-wider text-coral">you</span>}
                      </div>
                      <div className="text-xs text-foreground/55 truncate">@{e.handle} · <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3 text-coral" />{e.streak}w</span></div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-lg font-bold text-coral leading-none">{e.points}</div>
                    <div className="text-[10px] uppercase tracking-wider text-foreground/55 mt-0.5">points</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Peer voting on proofs */}
        <section className="chapter-glass p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-coral" />
              <h2 className="font-display text-xl md:text-2xl font-bold">Validate proofs from the community</h2>
            </div>
            <span className="text-xs text-foreground/60">upvotes & downvotes weigh into the prize pool</span>
          </div>
          <p className="mt-2 text-sm text-foreground/65 max-w-3xl">
            Real proof, not vibes. Vote what shipped — top-voted proofs get featured and earn bonus points.
          </p>

          {(profile?.submissions.length ?? 0) === 0 ? (
            <div className="mt-5 rounded-2xl bg-foreground/5 p-6 text-sm text-foreground/65">
              No proofs to vote on yet. Submit the first one — your own proofs appear here for the community to upvote.
            </div>
          ) : (
            <ul className="mt-5 grid md:grid-cols-2 gap-3">
              {(profile?.submissions ?? []).map((p) => {
                const my = votes[p.id];
                const up = (my === 1 ? 1 : 0);
                const down = (my === -1 ? 1 : 0);
                const Icon = CATEGORY_META[p.category].icon;
                const hoursAgo = Math.max(0, Math.floor((Date.now() - p.createdAt) / 3600000));
                const showReach = p.category === "Content" || p.category === "Growth";
                return (
                  <li key={p.id} className="rounded-2xl bg-white/60 p-4 ring-1 ring-foreground/5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${CATEGORY_META[p.category].color}22`, color: CATEGORY_META[p.category].color }}>
                        <Icon className="h-3 w-3" /> {p.category}
                      </span>
                      <span className="text-[11px] text-foreground/55 ml-auto">{hoursAgo === 0 ? "just now" : `${hoursAgo}h ago`}</span>
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug">{p.title}</h3>
                    <div className="mt-1 text-xs text-foreground/60">by <span className="font-semibold text-foreground/80">{profile?.name}</span> · @{profile?.handle}</div>
                    {p.note && <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.note}</p>}
                    {p.proofUrl && (
                      <a href={p.proofUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-coral hover:underline">
                        <Link2 className="h-3 w-3" /> view proof
                      </a>
                    )}
                    {showReach && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-1 text-[11px] font-semibold text-coral">
                        <Globe className="h-3 w-3" /> reached ~{mockReach(p.id).toLocaleString()} people
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => castVote(p.id, 1)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${my === 1 ? "bg-emerald-500 text-white shadow-glow" : "bg-foreground/5 text-foreground/70 hover:bg-emerald-500/10 hover:text-emerald-700"}`}>
                        <ThumbsUp className="h-3.5 w-3.5" /> {up}
                      </button>
                      <button onClick={() => castVote(p.id, -1)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${my === -1 ? "bg-rose-500 text-white" : "bg-foreground/5 text-foreground/70 hover:bg-rose-500/10 hover:text-rose-700"}`}>
                        <ThumbsDown className="h-3.5 w-3.5" /> {down}
                      </button>
                      <span className="ml-auto text-[11px] font-semibold text-foreground/55">score {up - down}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Profile & submissions */}
        {profile && (
          <section className="grid md:grid-cols-[1fr_1.4fr] gap-6">
            <div className="chapter-glass p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="chapter-num">profile</div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
              <h3 className="mt-1 font-display text-xl font-bold">{profile.name}</h3>
              <div className="text-xs text-foreground/60">@{profile.handle}</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Mini label="points" value={profile.points} />
                <Mini label="streak" value={`${profile.streak}w`} />
                <Mini label="rank" value={myRank ? `#${myRank}` : "—"} />
              </div>
              <div className="mt-5 rounded-2xl bg-foreground/5 p-4 text-xs text-foreground/65">
                Tasks done: <span className="font-bold text-foreground">{profile.submissions.length}</span>
              </div>
            </div>

            <div className="chapter-glass p-6 md:p-8">
              <div className="chapter-num">submissions</div>
              <h3 className="mt-1 font-display text-xl font-bold">Recent proofs</h3>
              {profile.submissions.length === 0 ? (
                <p className="mt-4 text-sm text-foreground/60">Nothing yet. Spin to start a task and your proofs will show up here.</p>
              ) : (
                <ul className="mt-4 space-y-2 max-h-[320px] overflow-auto pr-1">
                  {profile.submissions.map((s) => (
                    <li key={s.id} className="rounded-2xl bg-white/60 p-3 text-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold rounded-full px-2 py-0.5" style={{ background: `${CATEGORY_META[s.category].color}22`, color: CATEGORY_META[s.category].color }}>{s.category}</span>
                        <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${DIFF_COLOR[s.difficulty]}`}>{s.difficulty}</span>
                        <span className="text-[11px] text-foreground/55 ml-auto">+{s.points} pts</span>
                      </div>
                      <div className="mt-1.5 font-semibold leading-snug">{s.title}</div>
                      {s.proofUrl && <a href={s.proofUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-coral hover:underline"><Link2 className="h-3 w-3" /> {s.proofUrl}</a>}
                      {s.note && <div className="mt-1 text-xs text-foreground/65">{s.note}</div>}
                      {(s.category === "Content" || s.category === "Growth") && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-0.5 text-[10px] font-semibold text-coral">
                          <Globe className="h-3 w-3" /> reached ~{mockReach(s.id).toLocaleString()} people
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Rewards */}
        <section className="chapter-glass p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-coral" />
            <h2 className="font-display text-xl md:text-2xl font-bold">Rewards</h2>
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {[
              { tier: "Top 10", icon: Crown, label: "Featured spotlight · cash bounties · 1:1 with mentors" },
              { tier: "Top 50", icon: Medal, label: "Exclusive badges · early-access to programs · merch drops" },
              { tier: "Everyone", icon: Zap, label: "XP system · skill profile · referral bonuses" },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.tier} className="rounded-2xl bg-white/60 p-5">
                  <Icon className="h-5 w-5 text-coral" />
                  <div className="mt-2 font-display text-lg font-bold">{r.tier}</div>
                  <p className="mt-1 text-sm text-foreground/65 leading-relaxed">{r.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
      <ApplyBar />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-2.5 text-sm flex items-center gap-2">
      <span className="text-coral">{icon}</span>
      <div className="leading-tight">
        <div className="font-bold">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-foreground/55">{label}</div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-foreground/5 p-3 text-center">
      <div className="font-display text-lg font-bold text-coral">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-foreground/55">{label}</div>
    </div>
  );
}

function Impact({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-foreground/5">
      <div className="inline-flex items-center gap-1.5 text-coral">{icon}<span className="text-[10px] font-bold uppercase tracking-wider">{label}</span></div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
