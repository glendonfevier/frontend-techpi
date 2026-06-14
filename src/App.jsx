import React from 'react';
import { useState, useRef, useEffect } from "react";
import techpiLogo from "./assets/techpi.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  /* Base Setup - Elegant Minimalist Light Theme */
  .tp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #f7f9fc; /* Putih keabuan super soft premium */
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

  /* Soft Ambient Background Aura - Ungu Lembut */
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

  /* Header Minimalis & Clean */
  .tp-header {
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    z-index: 10; flex-shrink: 0;
  }

  .tp-logo-group { display: flex; align-items: center; gap: 12px; }
  
  /* Kotak Logo Menggunakan Gambar Logo Baru Lu */
  .tp-logo-box {
    width: 36px; height: 36px; border-radius: 10px;
    overflow: hidden; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(170, 59, 255, 0.1);
    background: #fff;
  }
  .tp-logo-box img {
    width: 100%; height: 100%; object-fit: cover;
  }

  .tp-logo-text { display: flex; flex-direction: column; }
  .tp-logo-name { font-weight: 700; font-size: 16px; color: #1a1c20; letter-spacing: -0.2px; line-height: 1.2; }
  .tp-logo-by { font-size: 11px; color: rgba(0, 0, 0, 0.4); font-weight: 500; }

  /* Pill Status Biru Neon untuk Ready, Putih-Ungu untuk Thinking */
  .tp-status-pill {
    display: flex; align-items: center; gap: 6px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 100px; padding: 6px 14px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    transition: all 0.3s ease;
  }
  
  /* DEFAULT STATUS READY: Biru Elegan Sesuai Request Lu */
  .tp-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2563eb; transition: all 0.3s ease; }
  .tp-status-text { font-size: 12px; color: #2563eb; font-weight: 600; transition: all 0.3s ease; }
  
  /* STATUS THINKING: Berubah Ungu Berdenyut */
  .tp-status-pill.thinking {
    border-color: rgba(170, 59, 255, 0.2);
    background: rgba(170, 59, 255, 0.05);
  }
  .tp-status-pill.thinking .tp-status-dot {
    background: #aa3bff;
    animation: pulse-dot 1.2s infinite ease-in-out;
  }
  .tp-status-pill.thinking .tp-status-text { color: #aa3bff; }
  @keyframes pulse-dot { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* Chat Area - Scroll Container */
  .tp-messages {
    flex: 1; overflow-y: auto;
    padding: 32px 0;
    display: flex; flex-direction: column; gap: 24px;
    position: relative; z-index: 2;
    scroll-behavior: smooth;
  }

  /* Wrapper Keseimbangan Lebar Layar */
  .tp-chat-wrapper {
    width: 100%;
    max-width: 720px;       
    margin: 0 auto;
    padding: 0 20px;        
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* Welcome Screen Masterpiece - Cetakan Light Mode */
  .tp-empty {
    margin: auto; display: flex; flex-direction: column;
    align-items: center; text-align: center; max-width: 400px;
    padding: 24px; background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.03); border-radius: 24px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  }
  .tp-empty-icon { font-size: 32px; margin-bottom: 12px; }
  .tp-empty-title { font-size: 19px; font-weight: 700; color: #1a1c20; margin-bottom: 6px; }
  .tp-empty-sub { font-size: 13.5px; color: #64748b; line-height: 1.6; }

  /* Soft Bubble Chat Layout */
  .tp-msg { display: flex; gap: 14px; width: 100%; }
  .tp-msg.user { flex-direction: row-reverse; }

  .tp-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #64748b;
    flex-shrink: 0; box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    overflow: hidden;
  }
  .tp-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .tp-msg.user .tp-avatar {
    background: #1a1c20; border-color: #1a1c20; color: #ffffff;
  }

  .tp-bubble-container { display: flex; flex-direction: column; max-width: 80%; }
  .tp-msg.user .tp-bubble-container { align-items: flex-end; }

  /* Bubble AI: Putih Bersih dengan Border Lembut */
  .tp-bubble {
    padding: 12px 18px; border-radius: 18px;
    font-size: 14.5px; line-height: 1.6; color: #334155;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.04);
    word-break: break-word; white-space: pre-wrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.015);
  }
  /* Bubble User: Ungu Transparan Sangat Lembut & Premium */
  .tp-msg.user .tp-bubble {
    background: rgba(170, 59, 255, 0.08);
    border: 1px solid rgba(170, 59, 255, 0.12);
    color: #6d28d9;
    font-weight: 500;
  }

  /* Typing Loader */
  .tp-typing { display: flex; gap: 5px; align-items: center; padding: 6px 4px; }
  .tp-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: #aa3bff;
    animation: blink 1.4s infinite both;
  }
  .tp-typing span:nth-child(2) { animation-delay: 0.2s; }
  .tp-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }

  /* Bottom Input Area */
  .tp-bottom {
    background: rgba(247, 249, 252, 0.85);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    padding: 16px 0 env(safe-area-inset-bottom, 16px);
    z-index: 10; flex-shrink: 0;
  }

  .tp-input-row {
    display: flex; gap: 12px; align-items: flex-end;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px; padding: 8px 8px 8px 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.015);
    transition: all 0.22s ease;
  }
  .tp-input-row:focus-within {
    border-color: rgba(170, 59, 255, 0.4);
    box-shadow: 0 4px 16px rgba(170, 59, 255, 0.06);
  }

  .tp-textarea {
    flex: 1; background: transparent; border: none; padding: 8px 0;
    font-size: 14.5px; color: #1a1c20; font-family: inherit;
    resize: none; outline: none; line-height: 1.5;
    min-height: 22px; max-height: 120px;
  }
  .tp-textarea::placeholder { color: #94a3b8; }

  /* Tombol Send Ungu Gradasi Menyala Sesuai Gambar Konsep */
  .tp-send {
    width: 38px; height: 38px; border-radius: 13px;
    border: none; cursor: pointer; 
    background: linear-gradient(135deg, #b85cff 0%, #aa3bff 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(170, 59, 255, 0.25);
  }
  .tp-send svg { stroke: #ffffff; }
  .tp-send:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(170, 59, 255, 0.35); }
  .tp-send:disabled { opacity: 0.2; cursor: not-allowed; transform: none; box-shadow: none; background: #94a3b8; }

  .tp-footer-text {
    text-align: center; margin-top: 10px;
    font-size: 11px; color: #94a3b8; font-weight: 500;
  }
  .tp-err { font-size: 12.5px; color: #ef4444; margin-bottom: 6px; padding-left: 4px; font-weight: 500; }
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
        <div className="tp-avatar">
          {isUser ? "U" : <img src={techpiLogo} alt="TechPI Logo" />}
        </div>
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

      setMessages([...newMsgs, { role: "model", content: reply }]);
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
            <div className="tp-logo-box">
              <img src={techpiLogo} alt="TechPI Logo" />
            </div>
            <div className="tp-logo-text">
              <span className="tp-logo-name">TechPI AI</span>
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
              <div className="tp-logo-box">
                <img src={techpiLogo} alt="TechPI Logo" />
              </div>
              <div className="tp-empty-title">TechPI AI</div>
              <div className="tp-empty-sub">Simulasi interview teknis modern bersama Tech Lead. Ketik "Halo" untuk memulai.</div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} role={m.role} content={m.content} />
          ))}

          {loading && <Message role="model" isTyping />}
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
            <div className="tp-footer-text">TechPI • Made by Glendon</div>
          </div>
        </div>
      </div>
    </>
  );
}