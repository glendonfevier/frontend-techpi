import React from 'react';
import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  /* Base Setup - Soft Charcoal Slate Theme */
  .tp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #18191d; /* Abu-abu arang soft premium */
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;       
    max-width: 100%;    
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: #e2e4e9;
    -webkit-font-smoothing: antialiased;
  }

  /* Soft Ambient Background Aura */
  @keyframes ambient-glow {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    50% { transform: translate(-30px, 20px) scale(1.08); opacity: 0.5; }
  }
  .tp-bg-ambient {
    position: absolute; top: -10%; left: 15%;
    width: 650px; height: 650px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    animation: ambient-glow 14s infinite ease-in-out;
  }

  /* Header Minimalis & Clean */
  .tp-header {
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(24, 25, 29, 0.85);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    z-index: 10; flex-shrink: 0;
  }

  .tp-logo-group { display: flex; align-items: center; gap: 12px; }
  .tp-logo-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: #ffffff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px; color: #18191d;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  }
  .tp-logo-text { display: flex; flex-direction: column; }
  .tp-logo-name { font-weight: 600; font-size: 15px; color: #fff; letter-spacing: -0.2px; line-height: 1.2; }
  .tp-logo-by { font-size: 10px; color: rgba(255, 255, 255, 0.35); }

  /* Pill Status Bulat Elegan */
  .tp-status-pill {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 100px; padding: 5px 12px;
  }
  .tp-status-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.3); }
  .tp-status-pill.thinking .tp-status-dot {
    background: #ffffff;
    animation: pulse-dot 1.2s infinite ease-in-out;
  }
  @keyframes pulse-dot { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  .tp-status-text { font-size: 11.5px; color: rgba(255, 255, 255, 0.5); font-weight: 500; }
  .tp-status-pill.thinking .tp-status-text { color: #ffffff; }

  /* Chat Area - Scroll Container */
  .tp-messages {
    flex: 1; overflow-y: auto;
    padding: 32px 0;
    display: flex; flex-direction: column; gap: 28px;
    position: relative; z-index: 2;
    scroll-behavior: smooth;
  }

  /* KUNCI RESPONSIVITAS: Wrapper Otomatis Menyeimbangkan Lebar Laptop & HP */
  .tp-chat-wrapper {
    width: 100%;
    max-width: 720px;       /* Batas lebar ideal di laptop biar gak kepanjangan */
    margin: 0 auto;
    padding: 0 20px;        /* Jarak aman kanan-kiri di HP */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* Welcome Screen Masterpiece */
  .tp-empty {
    margin: auto; display: flex; flex-direction: column;
    align-items: center; text-align: center; max-width: 360px;
    padding: 20px;
  }
  .tp-empty-icon { font-size: 28px; margin-bottom: 12px; opacity: 0.8; }
  .tp-empty-title { font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 6px; }
  .tp-empty-sub { font-size: 13px; color: rgba(255, 255, 255, 0.35); line-height: 1.6; }

  /* Soft Bubble Chat Layout */
  .tp-msg { display: flex; gap: 14px; width: 100%; }
  .tp-msg.user { flex-direction: row-reverse; }

  .tp-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600; color: rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
  }
  .tp-msg.user .tp-avatar {
    background: #ffffff; border-color: #ffffff; color: #18191d;
  }

  .tp-bubble-container { display: flex; flex-direction: column; max-width: 80%; }
  .tp-msg.user .tp-bubble-container { align-items: flex-end; }

  .tp-bubble {
    padding: 12px 16px; border-radius: 16px;
    font-size: 14px; line-height: 1.55; color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.04);
    word-break: break-word; white-space: pre-wrap;
  }
  .tp-msg.user .tp-bubble {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.04);
    color: #ffffff;
  }

  /* Typing Loader */
  .tp-typing { display: flex; gap: 5px; align-items: center; padding: 6px 4px; }
  .tp-typing span {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    animation: blink 1.4s infinite both;
  }
  .tp-typing span:nth-child(2) { animation-delay: 0.2s; }
  .tp-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }

  /* Premium Bottom Input Area */
  .tp-bottom {
    background: rgba(24, 25, 29, 0.85);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    padding: 16px 0 env(safe-area-inset-bottom, 16px);
    z-index: 10; flex-shrink: 0;
  }

  .tp-input-row {
    display: flex; gap: 12px; align-items: flex-end;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px; padding: 8px 8px 8px 16px;
    transition: all 0.2s ease;
  }
  .tp-input-row:focus-within {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.04);
  }

  .tp-textarea {
    flex: 1; background: transparent; border: none; padding: 8px 0;
    font-size: 14px; color: #fff; font-family: inherit;
    resize: none; outline: none; line-height: 1.5;
    min-height: 22px; max-height: 120px;
  }
  .tp-textarea::placeholder { color: rgba(255, 255, 255, 0.25); }

  .tp-send {
    width: 36px; height: 36px; border-radius: 11px;
    border: none; cursor: pointer; background: #ffffff;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s ease;
  }
  .tp-send svg { stroke: #18191d; }
  .tp-send:hover { transform: scale(1.03); background: rgba(255,255,255,0.9); }
  .tp-send:disabled { opacity: 0.15; cursor: not-allowed; transform: none; background: #ffffff; }

  .tp-footer-text {
    text-align: center; margin-top: 10px;
    font-size: 10.5px; color: rgba(255, 255, 255, 0.2);
  }
  .tp-err { font-size: 12px; color: #f87171; margin-bottom: 6px; padding-left: 4px; }
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
    }, 12);

    return () => clearInterval(intervalId);
  }, [content, isUser, isTyping]);

  return (
    <div className="tp-chat-wrapper">
      <div className={`tp-msg${isUser ? " user" : ""}`}>
        <div className="tp-avatar">{isUser ? "U" : "AI"}</div>
        <div className="tp-bubble-container">
          <div className="tp-bubble">
            {isTyping ? <TypingIndicator /> : displayedText}
          </div>
        </div>
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
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tp-root">
        <div className="tp-bg-ambient" />

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
              <div className="tp-empty-sub">Simulasi interview teknis modern bersama Tech Lead. Ketik "Halo" untuk memulai.</div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} role={m.role} content={m.content} />
          ))}

          {loading && <Message role="assistant" isTyping />}
        </div>

        <div className="tp-bottom">
          <div className="tp-chat-wrapper">
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="tp-footer-text">TechPI • Elegant Charcoal Version</div>
          </div>
        </div>
      </div>
    </>
  );
}