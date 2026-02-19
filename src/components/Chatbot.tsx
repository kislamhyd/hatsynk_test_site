import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Download } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string; // ISO string — safe for JSON serialisation / localStorage
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LS_HISTORY_KEY  = "hatsynk_chat_history";
const LS_FOLLOWUP_KEY = "hatsynk_followup_sent";

const WELCOME_MESSAGE: Message = {
  id: 0,
  text: "👋 Hi! I'm the HatSynk assistant. Ask me anything about our services!",
  sender: "bot",
  timestamp: new Date().toISOString(),
};

const FOLLOW_UP_MESSAGE =
  "If you'd like, you can share your email or contact number (optional). Our team will get in touch with you shortly.";

const CONTACT_THANKS = "Thank you! Our team will contact you soon. 🙌";

// ---------------------------------------------------------------------------
// Q&A Data
// ---------------------------------------------------------------------------

const QA_PAIRS = [
  {
    keywords: [
      "ecommerce", "e-commerce", "online store", "shop", "time",
      "how long", "duration", "develop", "website development",
    ],
    answer:
      "A standard ecommerce website typically takes **4–8 weeks** depending on features, integrations, and complexity. Custom builds may take longer.",
  },
  {
    keywords: ["how many files", "files", "file count", "deliverables"],
    answer:
      "The number of files depends on your project scope. A typical project includes source files, assets, config files, and documentation — usually ranging from 50 to 500+ files.",
  },
  {
    keywords: ["bug", "fix", "bug fix", "issue", "debugging"],
    answer:
      "Bug fix support is provided for **30 days** after project delivery at no extra cost. Extended support plans are also available.",
  },
  {
    keywords: [
      "human", "agent", "person", "talk to someone",
      "real person", "assistant", "team",
    ],
    answer:
      "Sure! You can reach our team directly:\n\n📧 **Email:** support@hatsynk.com\n📱 **WhatsApp:** +91XXXXXXXXXX",
  },
  {
    keywords: ["email", "mail", "email address"],
    answer:
      "📧 You can reach us at **support@hatsynk.com** — we typically respond within 24 hours.",
  },
  {
    keywords: ["whatsapp", "phone", "number", "call", "contact"],
    answer:
      "📱 Our WhatsApp number is **+91XXXXXXXXXX** — available Mon–Sat, 9 AM to 6 PM IST.",
  },
  {
    keywords: [
      "project", "projects", "type of project", "what kind",
      "what type", "work done", "portfolio", "experience",
      "which field", "domain", "industry", "built", "developed",
      "finance", "food delivery", "delivery app", "seller app",
      "buyer app", "management system", "detection", "detection system",
    ],
    answer:
      "We have worked across a wide range of domains! While we don't publish an exact project count, here are the key fields we've delivered in:\n\n🏦 **Finance** — fintech platforms, payment dashboards\n🛒 **E-commerce** — buyer apps, seller apps, full-stack online stores\n📦 **Management Systems** — inventory, HR, and operations management\n🍔 **Food Delivery** — delivery apps, seller/restaurant apps, buyer apps\n🔍 **Detection Systems** — AI-assisted detection and monitoring tools\n\nEvery project is built with scalability and clean architecture in mind. Want to discuss your idea?",
  },
];

// ---------------------------------------------------------------------------
// Pricing guard — checked BEFORE QA matching
// ---------------------------------------------------------------------------

const COST_KEYWORDS = [
  "cost", "price", "pricing", "fee", "charge", "charges", "budget",
  "quote", "quotation", "rate", "rates", "how much", "afford",
  "expensive", "cheap", "cheapest", "payment", "pay", "invoice",
  "money", "amount", "estimate", "estimation",
];

const PRICING_RESPONSE =
  "For detailed pricing and quotations, please connect with our support team:\n\n📧 **Email:** support@hatsynk.com\n📱 **WhatsApp:** +91XXXXXXXXXX\n\nOur team will provide you with a customized quote based on your requirements.";

const DEFAULT_RESPONSE =
  "Thank you for your question. Our team will review this and get back to you soon.";

// ---------------------------------------------------------------------------
// Suggested questions
// ---------------------------------------------------------------------------

const SUGGESTED_QUESTIONS = [
  "Ecommerce development time?",
  "What type of projects do you do?",
  "Bug fix support duration?",
  "Contact human assistant",
  "What's your WhatsApp number?",
];

// ---------------------------------------------------------------------------
// Pure helper functions
// ---------------------------------------------------------------------------

/** Detects email addresses */
function isEmail(text: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

/** Detects phone numbers (7–15 digits, optional + prefix / spaces / dashes) */
function isPhone(text: string): boolean {
  return /^[+]?[\d\s\-().]{7,15}$/.test(text.trim());
}

function isContactDetail(text: string): boolean {
  return isEmail(text) || isPhone(text);
}

/** Core keyword-based reply logic */
function getBotReply(input: string): string {
  const lower = input.toLowerCase();

  // 1. Pricing guard
  if (COST_KEYWORDS.some((kw) => lower.includes(kw))) return PRICING_RESPONSE;

  // 2. QA matching
  for (const pair of QA_PAIRS) {
    if (pair.keywords.some((kw) => lower.includes(kw))) return pair.answer;
  }

  // 3. Default
  return DEFAULT_RESPONSE;
}

/** Renders **bold** markers and \n line breaks inline */
function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

// ---------------------------------------------------------------------------
// localStorage utilities — all wrapped in try/catch for private-mode safety
// ---------------------------------------------------------------------------

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(LS_HISTORY_KEY);
    if (!raw) return [WELCOME_MESSAGE];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [WELCOME_MESSAGE];
    // Timestamps are already ISO strings — no conversion needed
    return parsed as Message[];
  } catch {
    return [WELCOME_MESSAGE];
  }
}

function saveHistory(messages: Message[]): void {
  try {
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(messages));
  } catch {
    // Quota exceeded or private browsing — fail silently
  }
}

function wasFollowUpSent(): boolean {
  try {
    return localStorage.getItem(LS_FOLLOWUP_KEY) === "true";
  } catch {
    return false;
  }
}

function markFollowUpSent(): void {
  try {
    localStorage.setItem(LS_FOLLOWUP_KEY, "true");
  } catch {
    // fail silently
  }
}

// ---------------------------------------------------------------------------
// Export — pure browser API, no backend, fully Vercel-compatible
// ---------------------------------------------------------------------------

function exportConversation(messages: Message[]): void {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const header = [
    "HatSynk Chat Export",
    `Date: ${dateStr}  Time: ${timeStr}`,
    "─".repeat(40),
    "",
  ].join("\n");

  const body = messages
    .map((m) => {
      const label = m.sender === "user" ? "User" : "Bot ";
      const ts = new Date(m.timestamp).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      // Strip markdown bold markers for plain-text export
      const plain = m.text.replace(/\*\*/g, "");
      return `[${ts}] ${label}: ${plain}`;
    })
    .join("\n");

  const blob = new Blob([header + body], { type: "text/plain;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `hatsynk-chat-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Chatbot() {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput]     = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Persists whether the one-time follow-up prompt was already sent
  const followUpSentRef = useRef<boolean>(wasFollowUpSent());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // ── Persist to localStorage on every message update ──────────────────────
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Focus input when panel opens ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ── Deliver bot message after typing delay ────────────────────────────────
  const deliverBotMessage = useCallback(
    (text: string, onDone?: () => void) => {
      setIsTyping(true);
      setTimeout(
        () => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text,
              sender: "bot",
              timestamp: new Date().toISOString(),
            },
          ]);
          setIsTyping(false);
          onDone?.();
        },
        1000 + Math.random() * 500,
      );
    },
    [],
  );

  // ── Main send handler ─────────────────────────────────────────────────────
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const trimmed = text.trim();

      // Append user bubble
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          sender: "user",
          timestamp: new Date().toISOString(),
        },
      ]);
      setInput("");

      // If user replied to follow-up with contact detail
      if (followUpSentRef.current && isContactDetail(trimmed)) {
        deliverBotMessage(CONTACT_THANKS);
        return;
      }

      // Normal QA flow
      const reply              = getBotReply(trimmed);
      const needsFollowUp      = !followUpSentRef.current;

      deliverBotMessage(reply, () => {
        if (needsFollowUp) {
          followUpSentRef.current = true;
          markFollowUpSent();

          // Small extra delay so follow-up feels like a separate thought
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 2,
                text: FOLLOW_UP_MESSAGE,
                sender: "bot",
                timestamp: new Date().toISOString(),
              },
            ]);
          }, 900);
        }
      });
    },
    [deliverBotMessage],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = messages.length <= 1;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Chat Panel ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className={[
            "fixed z-50 flex flex-col overflow-hidden",
            "inset-0",
            "md:inset-auto md:bottom-24 md:right-6",
            "md:w-[380px] md:h-[600px] md:rounded-2xl",
            "glass-card border border-border",
          ].join(" ")}
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  HatSynk Assistant
                </p>
                <p className="text-white/70 text-xs">Always here to help</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Download button — shown only when conversation has started */}
              {messages.length > 1 && (
                <button
                  onClick={() => exportConversation(messages)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Download conversation"
                  title="Download chat as .txt"
                >
                  <Download size={15} className="text-white" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === "bot"
                      ? "bg-primary/20 text-primary"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {msg.sender === "bot" ? <Bot size={14} /> : <User size={14} />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-sm text-white"
                      : "rounded-bl-sm bg-secondary text-foreground border border-border"
                  }`}
                  style={
                    msg.sender === "user"
                      ? { background: "var(--gradient-primary)" }
                      : undefined
                  }
                >
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-secondary border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested chips — only at conversation start */}
          {showSuggestions && (
            <div className="px-4 py-2 bg-background/60 border-t border-border shrink-0">
              <p className="text-xs text-muted-foreground mb-2">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-border bg-background/80 shrink-0 flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 shrink-0"
              style={{ background: "var(--gradient-primary)" }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating toggle button ─────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-transform glow-effect flex items-center justify-center"
        style={{ background: "var(--gradient-primary)" }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}