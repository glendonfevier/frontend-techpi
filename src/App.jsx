import React from 'react';
import { useState, useRef, useEffect } from "react";
import techpiLogo from "./assets/logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  .tp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #f7f9fc;
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;       
    max-width: 100%;    
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: #2d3139;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes ambient-glow {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    50% { transform: translate(-30px, 20px) scale(1.1); opacity: 0.7; }
  }
  .tp-bg-ambient {
    position: absolute; top: -10%; left: 15%;
    width: 650px; height: 650px; border-radius: 50%;
    background: radial-gradient(circle, rgba(170, 59, 255, 0.08) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    animation: ambient-glow 14s infinite ease-in-out;
  }

  .tp-header {
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    z-index: 10; flex-shrink: 0;
  }

  .tp-logo-group { display: flex; align-items: center; gap: 12px; }
  .tp-logo-box {
    width: 36px; height: 36px; border-radius: 10px;
    overflow: hidden; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(170, 59, 255, 0.1);
    background: #fff;
  }
  .tp-logo-box img { width: 100%; height: 100%; object-fit: cover; }
  .tp-logo-text { display: flex; flex-direction: column; }
  .tp-logo-name { font-weight: 700; font-size: 16px; color: #1a1c20; letter-spacing: -0.2px; line-height: 1.2; }
  .tp-logo-by { font-size: 11px; color: rgba(0, 0, 0, 0.4); font-weight: 500; }

  /* Tab Navigation Baru */
  .tp-tabs {
    display: flex; gap: 8px; background: rgba(0,0,0,0.03); 
    padding: 4px; border-radius: 12px; margin-right: 16px;
  }
  .tp-tab-btn {
    padding: 6px 14px; border-radius: 10px; border: none; font-size: 13px;
    font-weight: 600; cursor: pointer; background: transparent; color: #64748b;
    transition: all 0.2s ease;
  }
  .tp-tab-btn.active {
    background: #ffffff; color: #aa3bff; box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .tp-status-pill {
    display: flex; align-items: center; gap: 6px; background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 100px; padding: 6px 14px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  }
  .tp-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2563eb; }
  .tp-status-text { font-size: 12px; color: #2563eb; font-weight: 600; }
  
  .tp-status-pill.thinking .tp-status-dot { background: #aa3bff; animation: pulse-dot 1.2s infinite ease-in-out; }
  .tp-status-pill.thinking .tp-status-text { color: #aa3bff; }

  /* Layout Container */
  .tp-main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; z-index: 2; }
  .tp-messages { flex: 1; overflow-y: auto; padding: 32px 0; display: flex; flex-direction: column; gap: 24px; scroll-behavior: smooth; }
  .tp-chat-wrapper { width: 100%; max-width: 720px; margin: 0 auto; padding: 0 20px; box-sizing: border-box; display: flex; flex-direction: column; }

  /* ATS Layout Styling */
  .tp-ats-container { flex: 1; overflow-y: auto; padding: 32px 0; }
  .tp-ats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .tp-ats-box { display: flex; flex-direction: column; gap: 8px; }
  .tp-ats-label { font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
  .tp-ats-input {
    width: 100%; height: 180px; padding: 14px; border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.08); background: #ffffff;
    font-family: inherit; font-size: 14px; resize: none; outline: none; box-sizing: border-box;
    transition: all 0.2s;
  }
  .tp-ats-input:focus { border-color: rgba(170, 59, 255, 0.4); box-shadow: 0 4px 12px rgba(170, 59, 255, 0.05); }
  
  .tp-btn-optimize {
    width: 100%; padding: 14px; border-radius: 14px; border: none; font-size: 15px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg, #b85cff 0%, #aa3bff 100%); cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(170, 59, 255, 0.25); display: flex; justify-content: center; align-items: center; gap: 8px;
  }
  .tp-btn-optimize:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(170, 59, 255, 0.35); }
  .tp-btn-optimize:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; }

  .tp-ats-result {
    margin-top: 24px; padding: 24px; background: #ffffff; border: 1px solid rgba(0,0,0,0.04);
    border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); line-height: 1.6; font-size: 14.5px;
  }
  .tp-ats-result h3 { color: #aa3bff; font-size: 16px; font-weight: 700; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.04); padding-bottom: 4px; }
  .tp-ats-result h3:first-child { margin-top: 0; }

  /* Existing Styles Backup */
  .tp-empty { margin: auto; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 400px; padding: 24px; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(0, 0, 0, 0.03); border-radius: 24px; backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02); }
  .tp-empty-icon { font-size: 32px; margin-bottom: 12px; }
  .tp-empty-title { font-size: 19px; font-weight: 700; color: #1a1c20; margin-bottom: 6px; }
  .tp-empty-sub { font-size: 13.5px; color: #64748b; line-height: 1.6; }
  .tp-msg { display: flex; gap: 14px; width: 100%; }
  .tp-msg.user { flex-direction: row-reverse; }
  .tp-avatar { width: 32px; height: 32px; border-radius: 50%; background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.06); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #64748b; flex-shrink: 0; overflow: hidden; }
  .tp-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .tp-msg.user .tp-avatar { background: #1a1c20; border-color: #1a1c20; color: #ffffff; }
  .tp-bubble-container { display: flex; flex-direction: column; max-width: 80%; }
  .tp-msg.user .tp-bubble-container { align-items: flex-end; }
  .tp-bubble { padding: 12px 18px; border-radius: 18px; font-size: 14.5px; line-height: 1.6; color: #334155; background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.04); word-break: break-word; white-space: pre-wrap; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.015); }
  .tp-msg.user .tp-bubble { background: rgba(170, 59, 255, 0.08); border: 1px solid rgba(170, 59, 255, 0.12); color: #6d28d9; font-weight: 500; }
  .tp-bottom { background: rgba(247, 249, 252, 0.85); backdrop-filter: blur(20px); border-top: 1px solid rgba(0, 0, 0, 0.04); padding: 16px 0 env(safe-area-inset-bottom, 16px); flex-shrink: 0; }
  .tp-input-row { display: flex; gap: 12px; align-items: flex-end; background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 20px; padding: 8px 8px 8px 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.015); }
  .tp-textarea { flex: 1; background: transparent; border: none; padding: 8px 0; font-size: 14.5px; color: #1a1c20; font-family: inherit; resize: none; outline: none; line-height: 1.5; min-height: 22px; max-height: 120px; }
  .tp-send { width: 38px; height: 38px; border-radius: 13px; border: none; cursor: pointer; background: linear-gradient(135deg, #b85cff 0%, #aa3bff 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(170, 59, 255, 0.25); }
  .tp-send svg { stroke: #ffffff; }
  .tp-footer-text { text-align: center; margin-top: 10px; font-size: 11px; color: #94a3b8; font-weight: 500; }
  .tp-err { font-size: 12.5px; color: #ef4444; margin-bottom: 6px; padding-left: 4px; font-weight: 500; }
  .tp-typing { display: flex; gap: 5px; align-items: center; padding: 6px 4px; }
  .tp-typing span { width: 6px; height: 6px; border-radius: 50%; background: #aa3bff; animation: blink 1.4s infinite both; }
  .tp-typing span:nth-child(2) { animation-delay: 0.2s; }
  .tp-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
`;

export default function TechPI() {
  const [activeTab, setActiveTab] = useState("interview"); // State navigasi tab
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("ready");

  // State khusus Fitur ATS Resume Tailor
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [atsResult, setAtsResult] = useState("");

  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Fungsi Send Interview Lama
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

  // Fungsi Fitur Baru: Tweak ATS Resume
  async function runAtsOptimization() {
    if (!jobDescription.trim() || !resumeText.trim() || loading) return;
    setLoading(true);
    setError("");
    setAtsResult("");
    setStatus("thinking...");

    try {
      const res = await fetch("https://techpi-backend-ai.onrender.com/optimize-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_description: jobDescription,
          resume_text: resumeText
        }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setAtsResult(data.result);
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
      <div className="tp-root">
        <div className="tp-bg-ambient" />

        <header className="tp-header">
          <div className="tp-logo-group">
            <div className="tp-logo-box"><img src={techpiLogo} alt="Logo" /></div>
            <div className="tp-logo-text">
              <span className="tp-logo-name">AceCVS AI</span>
              <span className="tp-logo-by">by Glendon</span>
            </div>
          </div>

          {/* Navigasi Menu Tab Eksklusif */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="tp-tabs">
              <button className={`tp-tab-btn ${activeTab === "interview" ? "active" : ""}`} onClick={() => setActiveTab("interview")}>Mock Interview</button>
              <button className={`tp-tab-btn ${activeTab === "ats" ? "active" : ""}`} onClick={() => setActiveTab("ats")}>ATS Resume Fixer</button>
            </div>
            <div className={`tp-status-pill ${status === "thinking..." ? "thinking" : ""}`}>
              <div className="tp-status-dot" />
              <span className="tp-status-text">{status === "thinking..." ? "Thinking" : "Ready"}</span>
            </div>
          </div>
        </header>

        <div className="tp-main-content">
          {activeTab === "interview" ? (
            /* TAMPILAN TAB INTERVIEW (Eksisting) */
            <>
              <div className="tp-messages" ref={messagesContainerRef}>
                {messages.length === 0 && !loading && (
                  <div className="tp-empty">
                    <div className="tp-empty-icon">✨</div>
                    <div className="tp-empty-title">TechPI AI Interviewer</div>
                    <div className="tp-empty-sub">Simulasi interview teknis modern bersama Tech Lead. Ketik "Halo" untuk memulai.</div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className="tp-chat-wrapper">
                    <div className={`tp-msg${m.role === "user" ? " user" : ""}`}>
                      <div className="tp-avatar">{m.role === "user" ? "U" : <img src={techpiLogo} alt="AI" />}</div>
                      <div className="tp-bubble-container">
                        <div className="tp-bubble">{m.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="tp-chat-wrapper"><div className="tp-msg"><div className="tp-avatar"><img src={techpiLogo} alt="AI" /></div><div className="tp-bubble-container"><div className="tp-bubble"><div className="tp-typing"><span /><span /><span /></div></div></div></div></div>
                )}
              </div>

              <div className="tp-bottom">
                <div className="tp-chat-wrapper">
                  {error && <div className="tp-err">{error}</div>}
                  <div className="tp-input-row">
                    <textarea ref={textareaRef} className="tp-textarea" rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendInterview())} placeholder="Message TechPI..." />
                    <button className="tp-send" onClick={sendInterview} disabled={loading || !input.trim()}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                  </div>
                  <div className="tp-footer-text">TechPI • Elegant Light Version</div>
                </div>
              </div>
            </>
          ) : (
            /* TAMPILAN TAB ATS RESUME OPTIMIZER (Baru!) */
            <div className="tp-ats-container">
              <div className="tp-chat-wrapper">
                <div className="tp-ats-grid">
                  <div className="tp-ats-box">
                    <label className="tp-ats-label">1. Job Description (Lowongan)</label>
                    <textarea className="tp-ats-input" placeholder="Paste syarat lowongan kerja atau job desc di sini..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                  </div>
                  <div className="tp-ats-box">
                    <label className="tp-ats-label">2. Isi CV / Resume Anda</label>
                    <textarea className="tp-ats-input" placeholder="Paste teks isi CV / Resume Anda di sini..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
                  </div>
                </div>

                {error && <div className="tp-err">{error}</div>}

                <button className="tp-btn-optimize" onClick={runAtsOptimization} disabled={loading || !jobDescription.trim() || !resumeText.trim()}>
                  {loading ? "Menganalisis Kode & Teks..." : "⚡ Optimasi CV via TechPI AI"}
                </button>

                {/* Tempat Render Output Hasil Analisis Gemini */}
                {atsResult && (
                  <div className="tp-ats-result">
                    {/* Render teks beralur rapi dari markdown */}
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