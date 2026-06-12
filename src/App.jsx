import React from 'react';
import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  /* Base Reset & Smoothness */
  .tp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #0d0e12;
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;       
    max-width: 100%;    
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: #e3e4e8;
  }

  /* Soft Ambient Background Aura (Gak Mencolok Mata) */
  @keyframes soft-glow {
    0% { transform: translate(0px, 0px) scale(1); }
    50% { transform: translate(40px, -30px) scale(1.1); filter: blur(120px); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .tp-bg-glow {
    position: absolute;
    top: -10%;
    right: 5%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    animation: soft-glow 15s infinite ease-in-out;
  }

  /* Premium Soft Header */
  .tp-header {
    padding: 18px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(13, 14, 18, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    z-index: 10;
    flex-shrink: 0;
  }

  .tp-logo-group { display: flex; align-items: center; gap: 12px; }

  .tp-logo-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    color: #fff;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
  }

  .tp-logo-text { display: flex; flex-direction: column; }
  .tp-logo-name {
    font-weight: 600;
    font-size: 17px;
    color: #fff;
    letter-spacing: -0.3px;
  }
  .tp-logo-by {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.35);
    font-weight: 400;
  }

  /* Minimalist Status Pill */
  .tp-status-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 30px;
    padding: 6px 14px;
    transition: all 0.3s ease;
  }
  .tp-status-pill.thinking {
    background: rgba(139, 92, 246, 0.06);
    border-color: rgba(139, 92, 246, 0.2);
  }
  .tp-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
  }
  .tp-status-pill.thinking .tp-status-dot {
    background: #a78bfa;
    animation: pulse-dot 1.5s infinite ease-in-out;
  }
  .tp-status-text { font-size: 12px; color: rgba(255, 255, 255, 0.65); font-weight: 500; }
  .tp-status-pill.thinking .tp-status-text { color: #c084fc; }

  /* Chat Area - Autoscroll Optimized */
  .tp-messages {
    flex: 1; 
    overflow-y: auto; 
    padding: 30px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    z-index: 2;
    scroll-behavior: smooth;
  }

  /* Welcome Screen Elegant */
  .tp-empty {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 380px;
    padding: 20px;
  }
  .tp-empty-icon {
    font-size: 32px;
    margin-bottom: 16px;
    opacity: 0.85;
  }
  .tp-empty-title { font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 8px; }
  .tp-empty-sub { font-size: 13.5px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; }

  /* Soft Bubble Chat Layout */
  .tp-msg {
    display: flex;
    gap: 14px;
    max-width: 85%;
    animation: msg-fade-in 0.35s ease;
  }
  @keyframes msg-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .tp-msg.user { align-self: flex-end; flex-direction: row-reverse; }

  .tp-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
  }
  .tp-msg.user .tp-avatar {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(192, 132, 252, 0.2));
    border-color: rgba(139, 92, 246, 0.3);
    color: #fff;
  }

  .tp-bubble {
    padding: 14px 18px;
    border-radius: 18px;
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.04);
    word-break: break-word;
    white-space: pre-wrap;
  }
  .tp-msg.user .tp-bubble {
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.15);
    color: #fff;
  }

  /* Typing Loader */
  .tp-typing { display: flex; gap: 5px; align-items: center; padding: 6px 4px; }
  .tp-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    animation: blink 1.4s infinite both;
  }
  .tp-typing span:nth-child(2) { animation-delay: 0.2s; }
  .tp-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }

  /* Premium Bottom Input Area */
  .tp-bottom {
    background: rgba(13, 14, 18, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    padding: 16px 24px env(safe-area-inset-bottom, 20px);
    z-index: 10;
    flex-shrink: 0;
  }

  .tp-input-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tp-input-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 8px 8px 8px 18px;
    transition: border-color 0.25s ease;
  }
  .tp-input-row:focus-within {
    border-color: rgba(139, 92, 246, 0.35);
    background: rgba(255, 255, 255, 0.04);
  }

  .tp-textarea {
    flex: 1;
    background: transparent;
    border: none;
    padding: 8px 0;
    font-size: 14.5px;
    color: #fff;
    font-family: inherit;
    resize: none;
    outline: none;
    line-height: 1.5;
    min-height: 24px;
    max-height: 140px;
  }
  .tp-textarea::placeholder { color: rgba(255, 255, 255, 0.25); }

  .tp-send {
    width: 38px;
    height: 38px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .tp-send svg { stroke: #0d0e12; }
  .tp-send:hover { transform: scale(1.04); background: rgba(255,255,255,0.9); }
  .tp-send:disabled { opacity: 0.15; cursor: not-allowed; transform: none; background: #fff; }

  .tp-footer-text {
    text-align: center;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.2);
    letter-spacing: 0.2px;
  }
  
  .tp-err { font-size: 12px; color: #f87171; padding-left: 4px; }
`;

function TypingIndicator() {
  return (
    <div className="tp-typing">
      <span /><span /><span />
    </div>
  );
}

function Message({ role, content, isTyping }) {
  const isUser = role === "user";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isUser || isTyping || !content) {
      setDisplayedText(content);
      return;
    }

    setDisplayedText("");
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + content.charAt(index));
      index++;
      if (index >= content.length) {
        clearInterval(intervalId);
      }
    }, 15); // Kecepatan ngetik dimatangkan jadi 15ms biar kerasa gesit tapi dapet motion-nya

    return () => clearInterval(intervalId);
  }, [content, isUser, isTyping]);

  return (
    <div className={`tp-msg${isUser ? " user" : ""}`}>
      <div className="tp-avatar">{isUser ? "U" : "AI"}</div>
      <div className="tp-bubble">
        {isTyping ? <TypingIndicator /> : displayedText}
      </div>
    </div>
  );
}

export default function TechPI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endpoint = "https://techpi-backend-ai.onrender.com/chat";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("ready");

  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Perbaikan Bug Auto-Scroll: scroll langsung diarahkan ke total scrollHeight container secara instan pas ketik/terima data
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send() {
    if (loading || !input.trim()) return;

    const userText = input.trim();
    const newMsgs = [...messages, { role: "user", content: userText }];

    setMessages(newMsgs);
    setInput("");
    setError("");
    setLoading(true);
    setStatus("thinking...");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();

      const reply = data.reply || data.response || JSON.stringify(data);

      setMessages([...newMsgs, { role: "assistant", content: reply }]);
      setStatus("ready");
    } catch (e) {
      setError("Connection loose: " + e.message);
      setStatus("ready");
    }

    setLoading(false);

    // Cegah layar ngeloncat balik: fokus dikembalikan dengan aman tanpa paksaan window scroll
    setTimeout(() => {
      textareaRef.current?.focus({ preventScroll: true });
    }, 50);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleTextarea(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tp-root">
        <div className="tp-bg-glow" />

        <header className="tp-header">
          <div className="tp-logo-group">
            <div className="tp-logo-icon">TP</div>
            <div className="tp-logo-text">
              <span className="tp-logo-name">TechPI</span>
              <span className="tp-logo-by">by Glendon</span>
            </div>
          </div>
          <div className={`tp-status-pill ${status === "thinking..." ? "thinking" : ""}`}>
            <div className="tp-status-dot" />
            <span className="tp-status-text">{status === "thinking..." ? "Thinking" : "Ready"}</span>
          </div>
        </header>

        <div className="tp-messages" ref={messagesContainerRef}>
          {messages.length === 0 && !loading && (
            <div className="tp-empty">
              <div className="tp-empty-icon">✨</div>
              <div className="tp-empty-title">TechPI AI Interviewer</div>
              <div className="tp-empty-sub">Simulasi interview teknis bersama Tech Lead berpengalaman. Sapa "Halo" untuk menguji skill lo.</div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} role={m.role} content={m.content} />
          ))}

          {loading && <Message role="assistant" isTyping />}
        </div>

        <div className="tp-bottom">
          <div className="tp-input-container">
            {error && <div className="tp-err">{error}</div>}
            <div className="tp-input-row">
              <textarea
                ref={textareaRef}
                className="tp-textarea"
                rows={1}
                value={input}
                onChange={handleTextarea}
                onKeyDown={handleKey}
                placeholder="Message TechPI..."
              />
              <button
                className="tp-send"
                onClick={send}
                disabled={loading || !input.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="tp-footer-text">TechPI v2.0 • System Clean Mode</div>
          </div>
        </div>
      </div>
    </>
  );
}