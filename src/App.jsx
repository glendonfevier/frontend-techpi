import React from 'react';
import { useState, useRef, useEffect } from "react";
import hireloopLogo from "./assets/hireloop.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .hl-root {
    font-family: 'Inter', sans-serif;
    background-color: var(--hl-bg);
    background-image:
      radial-gradient(circle at 12% 8%, rgba(200, 247, 81, 0.05) 0%, transparent 45%),
      radial-gradient(circle at 88% 92%, rgba(255, 180, 84, 0.04) 0%, transparent 45%);
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: var(--hl-text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── HEADER ── */
  .hl-header {
    padding: 14px 22px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(24, 25, 29, 0.85);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--hl-border);
    z-index: 10; flex-shrink: 0;
    gap: 12px;
  }

  .hl-logo-group { display: flex; align-items: center; gap: 11px; }
  .hl-logo-box {
    width: 34px; height: 34px; border-radius: 9px;
    overflow: hidden; display: flex; align-items: center; justify-content: center;
    background: var(--hl-surface-2);
    border: 1px solid var(--hl-border-strong);
    flex-shrink: 0;
  }
  .hl-logo-box img { width: 100%; height: 100%; object-fit: cover; }
  .hl-logo-text { display: flex; flex-direction: column; line-height: 1.15; }
  .hl-logo-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700; font-size: 15.5px; color: var(--hl-text); letter-spacing: -0.2px;
  }
  .hl-logo-by { font-size: 10.5px; color: var(--hl-text-dim); font-weight: 500; letter-spacing: 0.02em; }

  /* Tab Navigation */
  .hl-tabs {
    display: flex; gap: 4px; background: var(--hl-surface);
    padding: 4px; border-radius: 11px; border: 1px solid var(--hl-border);
  }
  .hl-tab-btn {
    padding: 7px 14px; border-radius: 8px; border: none; font-size: 12.5px;
    font-weight: 600; cursor: pointer; background: transparent; color: var(--hl-text-muted);
    transition: all 0.18s ease; white-space: nowrap;
    font-family: 'Inter', sans-serif;
  }
  .hl-tab-btn.active {
    background: var(--hl-lime); color: #14150F;
    box-shadow: 0 2px 10px rgba(200, 247, 81, 0.25);
  }
  .hl-tab-btn:not(.active):hover { color: var(--hl-text); }

  .hl-status-pill {
    display: flex; align-items: center; gap: 7px; background: var(--hl-surface);
    border: 1px solid var(--hl-border); border-radius: 100px; padding: 6px 13px;
    flex-shrink: 0;
  }
  .hl-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hl-lime); box-shadow: 0 0 8px var(--hl-lime); }
  .hl-status-text {
    font-size: 11.5px; color: var(--hl-text-muted); font-weight: 600;
    font-family: 'JetBrains Mono', monospace; letter-spacing: -0.02em;
  }
  .hl-status-pill.thinking .hl-status-dot {
    background: var(--hl-amber); box-shadow: 0 0 8px var(--hl-amber);
    animation: hl-pulse 1.1s infinite ease-in-out;
  }
  .hl-status-pill.thinking .hl-status-text { color: var(--hl-amber); }
  @keyframes hl-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

  /* ── LAYOUT ── */
  .hl-main-content { flex: 1; display: flex; overflow: hidden; position: relative; z-index: 2; }

  /* ════════════════════════════════
     INTERVIEW MODE — chat + side rail
  ════════════════════════════════ */
  .hl-interview-layout { flex: 1; display: flex; overflow: hidden; }

  .hl-chat-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .hl-messages { flex: 1; overflow-y: auto; padding: 28px 0; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }
  .hl-chat-wrapper { width: 100%; max-width: 700px; margin: 0 auto; padding: 0 22px; box-sizing: border-box; display: flex; flex-direction: column; }

  .hl-empty {
    margin: auto; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 380px; padding: 32px 26px;
    background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-radius-lg);
  }
  .hl-empty-icon {
    width: 46px; height: 46px; border-radius: 12px; margin: 0 auto 16px;
    background: var(--hl-lime-dim); border: 1px solid rgba(200,247,81,0.25);
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .hl-empty-title { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: var(--hl-text); margin-bottom: 8px; }
  .hl-empty-sub { font-size: 13px; color: var(--hl-text-muted); line-height: 1.65; }

  .hl-msg { display: flex; gap: 12px; width: 100%; }
  .hl-msg.user { flex-direction: row-reverse; }
  .hl-avatar {
    width: 30px; height: 30px; border-radius: 9px; background: var(--hl-surface-2);
    border: 1px solid var(--hl-border-strong); display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--hl-text-muted); flex-shrink: 0; overflow: hidden;
  }
  .hl-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .hl-msg.user .hl-avatar { background: var(--hl-lime); border-color: var(--hl-lime); color: #14150F; }
  .hl-bubble-container { display: flex; flex-direction: column; max-width: 82%; gap: 6px; }
  .hl-msg.user .hl-bubble-container { align-items: flex-end; }
  .hl-bubble {
    padding: 12px 16px; border-radius: 14px; font-size: 14px; line-height: 1.65; color: #D8D9DE;
    background: var(--hl-surface); border: 1px solid var(--hl-border);
    word-break: break-word; white-space: pre-wrap;
  }
  .hl-msg.user .hl-bubble {
    background: rgba(200, 247, 81, 0.08); border: 1px solid rgba(200, 247, 81, 0.18); color: #E7FCB8; font-weight: 500;
  }

  /* Score chip — extracted from AI reply */
  .hl-score-chip {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 600;
    padding: 5px 12px; border-radius: 8px; align-self: flex-start;
    background: var(--hl-amber-dim); border: 1px solid rgba(255,180,84,0.3); color: var(--hl-amber);
  }

  .hl-bottom {
    background: rgba(24, 25, 29, 0.92); backdrop-filter: blur(20px);
    border-top: 1px solid var(--hl-border); padding: 14px 0 env(safe-area-inset-bottom, 14px); flex-shrink: 0;
  }
  .hl-input-row {
    display: flex; gap: 10px; align-items: flex-end; background: var(--hl-surface);
    border: 1px solid var(--hl-border-strong); border-radius: 16px; padding: 7px 7px 7px 16px;
    transition: border-color 0.18s;
  }
  .hl-input-row:focus-within { border-color: rgba(200, 247, 81, 0.4); }
  .hl-textarea {
    flex: 1; background: transparent; border: none; padding: 8px 0; font-size: 14px; color: var(--hl-text);
    font-family: 'Inter', sans-serif; resize: none; outline: none; line-height: 1.5; min-height: 22px; max-height: 120px;
  }
  .hl-textarea::placeholder { color: var(--hl-text-dim); }
  .hl-send {
    width: 36px; height: 36px; border-radius: 11px; border: none; cursor: pointer;
    background: var(--hl-lime); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.18s;
  }
  .hl-send:hover:not(:disabled) { box-shadow: 0 0 16px rgba(200,247,81,0.4); transform: translateY(-1px); }
  .hl-send:disabled { background: var(--hl-surface-2); cursor: not-allowed; }
  .hl-send svg { stroke: #14150F; }
  .hl-send:disabled svg { stroke: var(--hl-text-dim); }
  .hl-footer-text { text-align: center; margin-top: 8px; font-size: 10.5px; color: var(--hl-text-dim); font-weight: 500; font-family: 'JetBrains Mono', monospace; }
  .hl-err {
    font-size: 12px; color: var(--hl-red); margin-bottom: 8px; padding: 8px 12px;
    background: var(--hl-red-dim); border: 1px solid rgba(255,107,107,0.25); border-radius: 9px; font-weight: 500;
  }
  .hl-typing { display: flex; gap: 5px; align-items: center; padding: 4px 2px; }
  .hl-typing span { width: 5px; height: 5px; border-radius: 50%; background: var(--hl-text-muted); animation: hl-blink 1.4s infinite both; }
  .hl-typing span:nth-child(2) { animation-delay: 0.2s; }
  .hl-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes hl-blink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }

  /* ── SIDE RAIL: session info + live score ── */
  .hl-rail {
    width: 240px; flex-shrink: 0; border-left: 1px solid var(--hl-border);
    background: rgba(31, 32, 37, 0.5);
    padding: 22px 18px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 22px;
  }
  .hl-rail-block { display: flex; flex-direction: column; gap: 10px; }
  .hl-rail-label {
    font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--hl-text-dim); font-weight: 500;
  }
  .hl-rail-card {
    background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-radius-md);
    padding: 16px;
  }
  .hl-avg-score {
    font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; line-height: 1;
    color: var(--hl-lime); margin-bottom: 4px;
  }
  .hl-avg-score-label { font-size: 11.5px; color: var(--hl-text-muted); }
  .hl-score-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
  .hl-score-row { display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
  .hl-score-row-num { color: var(--hl-text-dim); width: 16px; flex-shrink: 0; }
  .hl-score-bar-wrap { flex: 1; height: 4px; background: var(--hl-surface-2); border-radius: 2px; overflow: hidden; }
  .hl-score-bar { height: 100%; background: linear-gradient(90deg, var(--hl-amber), var(--hl-lime)); border-radius: 2px; }
  .hl-score-row-val { color: var(--hl-text-muted); width: 28px; text-align: right; flex-shrink: 0; }

  .hl-tips-list { display: flex; flex-direction: column; gap: 10px; }
  .hl-tip-item {
    font-size: 12px; color: var(--hl-text-muted); line-height: 1.55;
    padding: 10px 12px; background: var(--hl-surface); border: 1px solid var(--hl-border);
    border-radius: 10px; display: flex; gap: 8px;
  }
  .hl-tip-item::before { content: '→'; color: var(--hl-lime); flex-shrink: 0; font-weight: 700; }

  /* ════════════════════════════════
     ATS MODE — diagnostic scanner
  ════════════════════════════════ */
  .hl-ats-container { flex: 1; overflow-y: auto; padding: 32px 0; }
  .hl-ats-wrapper { width: 100%; max-width: 760px; margin: 0 auto; padding: 0 22px; box-sizing: border-box; }

  .hl-ats-intro { margin-bottom: 22px; }
  .hl-ats-intro-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
  .hl-ats-intro-sub { font-size: 13px; color: var(--hl-text-muted); line-height: 1.6; }

  .hl-ats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px; }
  .hl-ats-box { display: flex; flex-direction: column; gap: 9px; }
  .hl-ats-label {
    font-size: 11px; font-weight: 600; color: var(--hl-text-muted); text-transform: uppercase; letter-spacing: 0.06em;
    display: flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace;
  }
  .hl-ats-label-num {
    width: 18px; height: 18px; border-radius: 5px; background: var(--hl-lime-dim);
    border: 1px solid rgba(200,247,81,0.25); color: var(--hl-lime);
    display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700;
  }
  .hl-ats-input {
    width: 100%; height: 180px; padding: 14px; border-radius: var(--hl-radius-md);
    border: 1px solid var(--hl-border-strong); background: var(--hl-surface);
    font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--hl-text);
    resize: none; outline: none; box-sizing: border-box; line-height: 1.6;
    transition: border-color 0.18s;
  }
  .hl-ats-input::placeholder { color: var(--hl-text-dim); }
  .hl-ats-input:focus { border-color: rgba(200, 247, 81, 0.45); }

  .hl-btn-optimize {
    width: 100%; padding: 14px; border-radius: var(--hl-radius-md); border: none; font-size: 14px; font-weight: 700; color: #14150F;
    background: var(--hl-lime); cursor: pointer; transition: all 0.18s;
    display: flex; justify-content: center; align-items: center; gap: 9px;
    font-family: 'Inter', sans-serif;
  }
  .hl-btn-optimize:hover:not(:disabled) { box-shadow: 0 4px 20px rgba(200, 247, 81, 0.3); transform: translateY(-1px); }
  .hl-btn-optimize:disabled { background: var(--hl-surface-2); color: var(--hl-text-dim); cursor: not-allowed; }

  /* Score gauge for ATS result */
  .hl-ats-score-banner {
    margin-top: 22px; padding: 20px; border-radius: var(--hl-radius-md);
    background: var(--hl-surface); border: 1px solid var(--hl-border);
    display: flex; align-items: center; gap: 18px;
  }
  .hl-gauge {
    width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
    background: conic-gradient(var(--hl-lime) calc(var(--pct) * 1%), var(--hl-surface-2) 0);
    position: relative;
  }
  .hl-gauge::before {
    content: ''; position: absolute; inset: 5px; border-radius: 50%; background: var(--hl-bg);
  }
  .hl-gauge span { position: relative; z-index: 1; color: var(--hl-lime); }
  .hl-gauge-label-col { display: flex; flex-direction: column; gap: 3px; }
  .hl-gauge-title { font-size: 13px; font-weight: 700; color: var(--hl-text); }
  .hl-gauge-sub { font-size: 11.5px; color: var(--hl-text-muted); }

  .hl-ats-result {
    margin-top: 16px; padding: 24px; background: var(--hl-surface); border: 1px solid var(--hl-border);
    border-radius: var(--hl-radius-lg); line-height: 1.7; font-size: 14px; color: #D8D9DE;
  }
  .hl-ats-result h3 {
    color: var(--hl-lime); font-size: 15px; font-weight: 700; margin-top: 22px; margin-bottom: 10px;
    border-bottom: 1px solid var(--hl-border); padding-bottom: 8px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .hl-ats-result h3:first-child { margin-top: 0; }

  @media (max-width: 880px) {
    .hl-rail { display: none; }
    .hl-ats-grid { grid-template-columns: 1fr; }
    .hl-tabs { gap: 2px; }
    .hl-tab-btn { padding: 7px 10px; font-size: 11.5px; }
    .hl-logo-by { display: none; }
  }
`;

const initials = (s) => s === "user" ? "U" : null;

export default function Hireloop() {
  const [activeTab, setActiveTab] = useState("interview");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("ready");

  // State khusus ATS Resume Fixer
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [atsResult, setAtsResult] = useState("");
  const [atsScore, setAtsScore] = useState(null);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Extract "Skor: X/10" from AI message text
  function extractScore(text) {
    const m = text.match(/Skor:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i);
    return m ? parseFloat(m[1]) : null;
  }

  const scoreHistory = messages
    .filter((m) => m.role !== "user")
    .map((m) => extractScore(m.content))
    .filter((s) => s !== null);

  const avgScore = scoreHistory.length
    ? (scoreHistory.reduce((a, b) => a + b, 0) / scoreHistory.length).toFixed(1)
    : null;

  async function sendInterview() {
    if (loading || !input.trim()) return;
    const userText = input.trim();
    const newMsgs = [...messages, { role: "user", content: userText }];
    setMessages(newMsgs);
    setInput("");
    setError("");
    setLoading(true);
    setStatus("thinking...");

    try {
      const res = await fetch("https://techpi-backend-ai.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setMessages([...newMsgs, { role: "model", content: data.reply }]);
    } catch (e) {
      setError("Connection loose: " + e.message);
    } finally {
      setLoading(false);
      setStatus("ready");
    }
  }

  async function runAtsOptimization() {
    if (!jobDescription.trim() || !resumeText.trim() || loading) return;
    setLoading(true);
    setError("");
    setAtsResult("");
    setAtsScore(null);
    setStatus("thinking...");

    try {
      const res = await fetch("https://techpi-backend-ai.onrender.com/optimize-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_description: jobDescription,
          resume_text: resumeText,
        }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setAtsResult(data.result);
      const m = data.result.match(/Skor ATS:\s*(\d+)\s*%/i);
      if (m) setAtsScore(parseInt(m[1]));
    } catch (e) {
      setError("Failed to optimize resume: " + e.message);
    } finally {
      setLoading(false);
      setStatus("ready");
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="hl-root">
        <header className="hl-header">
          <div className="hl-logo-group">
            <div className="hl-logo-box"><img src={hireloopLogo} alt="Hireloop" /></div>
            <div className="hl-logo-text">
              <span className="hl-logo-name">Hireloop</span>
              <span className="hl-logo-by">by Glendon</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="hl-tabs">
              <button className={`hl-tab-btn ${activeTab === "interview" ? "active" : ""}`} onClick={() => setActiveTab("interview")}>Mock Interview</button>
              <button className={`hl-tab-btn ${activeTab === "ats" ? "active" : ""}`} onClick={() => setActiveTab("ats")}>ATS Fixer</button>
            </div>
            <div className={`hl-status-pill ${status === "thinking..." ? "thinking" : ""}`}>
              <div className="hl-status-dot" />
              <span className="hl-status-text">{status === "thinking..." ? "THINKING" : "READY"}</span>
            </div>
          </div>
        </header>

        <div className="hl-main-content">
          {activeTab === "interview" ? (
            <div className="hl-interview-layout">
              <div className="hl-chat-col">
                <div className="hl-messages" ref={messagesContainerRef}>
                  {messages.length === 0 && !loading && (
                    <div className="hl-empty">
                      <div className="hl-empty-icon">🎯</div>
                      <div className="hl-empty-title">Mock Interview Loop</div>
                      <div className="hl-empty-sub">Latihan interview teknis sama AI Tech Lead. Tiap jawaban lo dinilai 1–10, real-time. Ketik "Halo" buat mulai sesi.</div>
                    </div>
                  )}
                  {messages.map((m, i) => {
                    const score = m.role !== "user" ? extractScore(m.content) : null;
                    return (
                      <div key={i} className="hl-chat-wrapper">
                        <div className={`hl-msg${m.role === "user" ? " user" : ""}`}>
                          <div className="hl-avatar">
                            {m.role === "user" ? "U" : <img src={hireloopLogo} alt="AI" />}
                          </div>
                          <div className="hl-bubble-container">
                            <div className="hl-bubble">{m.content}</div>
                            {score !== null && (
                              <div className="hl-score-chip">● Skor {score}/10</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {loading && (
                    <div className="hl-chat-wrapper">
                      <div className="hl-msg">
                        <div className="hl-avatar"><img src={hireloopLogo} alt="AI" /></div>
                        <div className="hl-bubble-container">
                          <div className="hl-bubble"><div className="hl-typing"><span /><span /><span /></div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hl-bottom">
                  <div className="hl-chat-wrapper">
                    {error && <div className="hl-err">{error}</div>}
                    <div className="hl-input-row">
                      <textarea
                        className="hl-textarea"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendInterview())}
                        placeholder="Message Hireloop..."
                      />
                      <button className="hl-send" onClick={sendInterview} disabled={loading || !input.trim()}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>
                    <div className="hl-footer-text">HIRELOOP · MOCK INTERVIEW SESSION</div>
                  </div>
                </div>
              </div>

              {/* ── SIDE RAIL ── */}
              <div className="hl-rail">
                <div className="hl-rail-block">
                  <div className="hl-rail-label">Live Score</div>
                  <div className="hl-rail-card">
                    <div className="hl-avg-score">{avgScore ?? "—"}</div>
                    <div className="hl-avg-score-label">
                      {avgScore ? `rata-rata dari ${scoreHistory.length} jawaban` : "belum ada penilaian"}
                    </div>
                    {scoreHistory.length > 0 && (
                      <div className="hl-score-list">
                        {scoreHistory.map((s, i) => (
                          <div className="hl-score-row" key={i}>
                            <span className="hl-score-row-num">{i + 1}</span>
                            <div className="hl-score-bar-wrap">
                              <div className="hl-score-bar" style={{ width: `${s * 10}%` }} />
                            </div>
                            <span className="hl-score-row-val">{s}/10</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="hl-rail-block">
                  <div className="hl-rail-label">Quick Tips</div>
                  <div className="hl-tips-list">
                    <div className="hl-tip-item">Pakai struktur STAR buat jawab behavioral question.</div>
                    <div className="hl-tip-item">Jelasin trade-off, bukan cuma solusi akhir.</div>
                    <div className="hl-tip-item">Jujur kalau gak tau — tunjukin cara mikir lo.</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hl-ats-container">
              <div className="hl-ats-wrapper">
                <div className="hl-ats-intro">
                  <div className="hl-ats-intro-title">ATS Resume Scanner</div>
                  <div className="hl-ats-intro-sub">Tempel job description & CV lo. Hireloop bakal scan keyword gap dan kasih rewrite siap pakai.</div>
                </div>

                <div className="hl-ats-grid">
                  <div className="hl-ats-box">
                    <label className="hl-ats-label"><span className="hl-ats-label-num">1</span>Job Description</label>
                    <textarea
                      className="hl-ats-input"
                      placeholder="Paste syarat lowongan kerja atau job desc di sini..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="hl-ats-box">
                    <label className="hl-ats-label"><span className="hl-ats-label-num">2</span>CV / Resume Kamu</label>
                    <textarea
                      className="hl-ats-input"
                      placeholder="Paste teks isi CV / Resume kamu di sini..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                  </div>
                </div>

                {error && <div className="hl-err">{error}</div>}

                <button className="hl-btn-optimize" onClick={runAtsOptimization} disabled={loading || !jobDescription.trim() || !resumeText.trim()}>
                  {loading ? "Scanning CV kamu..." : "⚡ Scan & Optimize via Hireloop"}
                </button>

                {atsScore !== null && (
                  <div className="hl-ats-score-banner">
                    <div className="hl-gauge" style={{ "--pct": atsScore }}>
                      <span>{atsScore}%</span>
                    </div>
                    <div className="hl-gauge-label-col">
                      <div className="hl-gauge-title">ATS Match Score</div>
                      <div className="hl-gauge-sub">Estimasi kelulusan screening otomatis</div>
                    </div>
                  </div>
                )}

                {atsResult && (
                  <div className="hl-ats-result">
                    <div style={{ whiteSpace: "pre-wrap" }}>{atsResult}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
