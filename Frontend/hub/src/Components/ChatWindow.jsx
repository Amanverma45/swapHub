import { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaPen, FaTimes, FaExchangeAlt, FaRegClock, FaArrowLeft, FaReply, FaEllipsisV, FaCamera } from "react-icons/fa";
import MessageInput from "./MessageInput";

// WhatsApp-style double check marks SVG
const DoubleCheckSVG = ({ isRead, className }) => (
  <svg
    className={`${className} ${isRead ? "text-sky-400" : "text-gray-400"}`}
    width="15"
    height="11"
    viewBox="0 0 15 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L4.5 8.5L9.5 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 5L9 8.5L14 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Preset wallpapers (colors and gradients)
const WALLPAPER_PRESETS = [
  { id: "default", name: "Default Light", value: "#efeae2" },
  { id: "emerald", name: "Mint Emerald", value: "#e5ddd5" },
  { id: "lavender", name: "Soft Lavender", value: "#e3e3ff" },
  { id: "dark", name: "Dark Slate", value: "#1e293b" },
  { id: "sunset", name: "Sunset Pink", value: "linear-gradient(to bottom right, #fecdd3, #ffedd5)" },
  { id: "sky", name: "Sky Gradient", value: "linear-gradient(to bottom right, #e0f2fe, #f0fdf4)" }
];

// Individual Message Item with Swipe to Reply gesture control
const MessageItem = ({
  msg,
  index,
  isMe,
  senderName,
  editingIndex,
  editText,
  setEditText,
  handleStartEdit,
  handleSaveEdit,
  handleDelete,
  setReplyingTo,
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const touchStart = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current || editingIndex === index) return;
    const diff = e.touches[0].clientX - touchStart.current;
    // Only allow swipe right for replying
    if (diff > 0 && diff < 100) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    isSwiping.current = false;
    if (dragOffset > 50) {
      setReplyingTo({
        text: msg.text,
        senderName: isMe ? "You" : (senderName ? senderName.split(" ")[0] : ""),
      });
    }
    setDragOffset(0);
  };

  const displaySenderName = isMe ? "You" : (senderName ? senderName.split(" ")[0] : "");

  return (
    <div
      className="w-full relative group animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Background Reply Icon */}
      {dragOffset > 10 && (
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-emerald-600 transition-opacity"
          style={{ opacity: Math.min(dragOffset / 50, 1) }}
        >
          <FaReply className="text-base animate-pulse" />
        </div>
      )}

      <div
        className={`flex ${isMe ? "justify-end" : "justify-start"} w-full transition-transform duration-100 ease-out`}
        style={{ transform: `translateX(${dragOffset}px)` }}
      >
        <div className={`flex flex-col max-w-[70%] sm:max-w-[50%] ${isMe ? "items-end" : "items-start"} min-w-[80px]`}>
          
          {/* Sender Name */}
          <span className="text-[10px] text-gray-400 font-semibold mb-0.5 px-1">
            {displaySenderName}
          </span>

          <div className="relative flex items-center gap-2 w-full">
            
            {/* Message Action Menu (Visible on hover for Own messages) */}
            {isMe && editingIndex !== index && (
              <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-gray-100 absolute -left-20 z-20">
                <button
                  onClick={() => setReplyingTo({ text: msg.text, senderName: "You" })}
                  className="text-gray-400 hover:text-blue-500 transition-colors p-0.5 cursor-pointer"
                  title="Reply"
                >
                  <FaReply className="text-[10px]" />
                </button>
                <button
                  onClick={() => handleStartEdit(index, msg.text)}
                  className="text-gray-400 hover:text-[#2E7D32] transition-colors p-0.5 cursor-pointer"
                  title="Edit"
                >
                  <FaPen className="text-[10px]" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                  title="Delete"
                >
                  <FaTrashAlt className="text-[10px]" />
                </button>
              </div>
            )}

            {/* Bubble Content */}
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm shadow-2xs break-words w-full ${
                isMe
                  ? "bg-gradient-to-br from-[#2E7D32] to-[#1E5621] text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              {/* Quoted Message (if replying) */}
              {msg.replyTo && msg.replyTo.text && (
                <div className={`mb-2 p-2 rounded-lg border-l-4 text-xs text-left ${
                  isMe
                    ? "bg-[#1E5621]/45 border-emerald-300 text-emerald-100"
                    : "bg-gray-50 border-[#2E7D32] text-gray-600"
                }`}>
                  <p className="font-bold text-[9px] mb-0.5 opacity-90">
                    {msg.replyTo.senderName}
                  </p>
                  <p className="line-clamp-2 truncate opacity-85">
                    {msg.replyTo.text}
                  </p>
                </div>
              )}

              {editingIndex === index ? (
                <div className="flex flex-col gap-2 min-w-[200px] sm:min-w-[260px] py-1">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-white text-gray-800 text-xs rounded-xl px-3 py-2 outline-none border border-gray-200 focus:border-[#2E7D32] text-left"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(null, "")}
                      className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 font-bold bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(index)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-left leading-relaxed break-all">{msg.text}</p>
              )}
            </div>

            {/* Message Action Menu (Visible on hover for Other messages) */}
            {!isMe && (
              <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-gray-100 absolute -right-8 z-20">
                <button
                  onClick={() => setReplyingTo({ text: msg.text, senderName: displaySenderName })}
                  className="text-gray-400 hover:text-blue-500 transition-colors p-0.5 cursor-pointer"
                  title="Reply"
                >
                  <FaReply className="text-[10px]" />
                </button>
              </div>
            )}

          </div>

          {/* Message Timestamp and Read Status */}
          <span className="text-[9px] text-gray-400 font-medium mt-1 flex items-center gap-1.5 px-1 select-none">
            <FaRegClock className="text-[8px]" />
            {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {isMe && (
              <DoubleCheckSVG isRead={msg.isRead} className="ml-1 shrink-0" />
            )}
          </span>

        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({
  activeChat,
  messages,
  currentUser,
  onSendMessage,
  onUpdateMessage,
  onDeleteMessage,
  onDeleteChat,
  isTyping,
  onTyping,
  onBackToList,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  // Wallpaper and Dropdown states
  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem("chat_wallpaper") || "#efeae2";
  });
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Click outside menu handler to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowConfirmClear(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  // Auto-scroll when keyboard opens/resizes viewport
  useEffect(() => {
    const handleResize = () => {
      setTimeout(scrollToBottom, 150);
    };
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (!activeChat) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center bg-gray-50/50 p-6 text-center select-none">
        <div className="w-20 h-20 bg-emerald-50 text-[#2E7D32] rounded-3xl flex items-center justify-center text-4xl mb-5 border border-emerald-100/50 shadow-md animate-pulse">
          💬
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Swap Inbox</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm font-medium leading-relaxed">
          Select an active chat from the sidebar or visit any product page to chat with a seller and start swapping!
        </p>
      </div>
    );
  }

  const otherUser = activeChat.users.find((u) => u._id !== currentUser?._id) || {
    name: "Deleted User",
    email: "deleted@swaphub.com",
  };

  const handleStartEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = (index) => {
    if (!editText.trim()) return;
    onUpdateMessage(index, editText.trim());
    setEditingIndex(null);
    setEditText("");
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      onDeleteMessage(index);
    }
  };

  const handleClearChat = () => {
    onDeleteChat(activeChat._id);
  };

  const handleSendMessageWithReply = (text) => {
    onSendMessage(text, replyingTo ? { text: replyingTo.text, senderName: replyingTo.senderName } : null);
    setReplyingTo(null);
  };

  const selectPresetWallpaper = (value) => {
    setWallpaper(value);
    localStorage.setItem("chat_wallpaper", value);
  };

  const handleCustomWallpaperUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        const cssValue = `url(${base64Url})`;
        setWallpaper(cssValue);
        localStorage.setItem("chat_wallpaper", cssValue);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitialsAvatar = (name) => {
    if (!name) return { initials: "?", gradient: "from-gray-400 to-gray-500" };
    const parts = name.split(" ");
    const initials = parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
    const colorIndex = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % 6;
    const gradients = [
      "from-emerald-400 to-teal-500",
      "from-amber-400 to-orange-500",
      "from-blue-400 to-indigo-500",
      "from-purple-400 to-pink-500",
      "from-rose-400 to-red-500",
      "from-cyan-400 to-blue-500",
    ];
    return { initials, gradient: gradients[colorIndex] };
  };

  const { initials, gradient } = getInitialsAvatar(otherUser.name);

  // Background style computation
  const isImageWallpaper = wallpaper.startsWith("url");
  const isGradientWallpaper = wallpaper.includes("gradient");

  const messageListStyle = {
    backgroundImage: isImageWallpaper || isGradientWallpaper ? wallpaper : undefined,
    backgroundColor: isImageWallpaper || isGradientWallpaper ? undefined : wallpaper,
    backgroundSize: isImageWallpaper ? "cover" : undefined,
    backgroundPosition: isImageWallpaper ? "center" : undefined,
    backgroundRepeat: isImageWallpaper ? "no-repeat" : undefined,
  };

  return (
    <div className="flex-1 w-full min-w-0 h-full flex flex-col bg-slate-50/40 relative overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-gray-100 bg-white px-4 flex items-center justify-between shadow-xs shrink-0 z-10">
        <div className="flex items-center gap-3">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="md:hidden text-gray-500 hover:text-[#2E7D32] p-1.5 rounded-xl hover:bg-gray-100 cursor-pointer flex items-center justify-center shrink-0"
              title="Back to conversations"
            >
              <FaArrowLeft className="text-base" />
            </button>
          )}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${gradient}`}>
            {initials}
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-gray-900 leading-tight">{otherUser.name}</h2>
            <p className="text-[10px] text-gray-400 font-medium">{otherUser.email}</p>
          </div>
        </div>

        {/* 3-Dot Options Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setShowConfirmClear(false);
            }}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Chat Options"
          >
            <FaEllipsisV className="text-sm" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fade-in text-left">
              {/* Presets Grid */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Wallpaper</p>
              <div className="grid grid-cols-6 gap-2 mb-3.5">
                {WALLPAPER_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => selectPresetWallpaper(preset.value)}
                    title={preset.name}
                    className={`w-7 h-7 rounded-full border border-gray-200 cursor-pointer hover:scale-110 active:scale-95 transition-transform ${
                      wallpaper === preset.value ? "ring-2 ring-emerald-500 ring-offset-1" : ""
                    }`}
                    style={{
                      backgroundImage: preset.value.includes("gradient") ? preset.value : undefined,
                      backgroundColor: preset.value.includes("gradient") ? undefined : preset.value
                    }}
                  />
                ))}
              </div>

              {/* Camera Upload Button */}
              <div className="mb-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCustomWallpaperUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#2E7D32] rounded-xl text-xs font-bold transition-colors cursor-pointer border border-emerald-100"
                >
                  <FaCamera className="text-xs" />
                  Choose from Gallery
                </button>
              </div>

              <div className="border-t border-gray-100 my-2" />

              {/* Clear Chat Buttons */}
              {!showConfirmClear ? (
                <button
                  onClick={() => setShowConfirmClear(true)}
                  className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Clear Chat
                </button>
              ) : (
                <div className="flex flex-col gap-1.5 p-1 bg-red-50/50 rounded-xl">
                  <p className="text-[10px] text-red-600 font-bold leading-tight px-2 mt-1">Are you sure you want to clear all messages?</p>
                  <button
                    onClick={() => {
                      handleClearChat();
                      setShowMenu(false);
                      setShowConfirmClear(false);
                    }}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-xs"
                  >
                    Confirm Clear Chat
                  </button>
                  <button
                    onClick={() => setShowConfirmClear(false)}
                    className="w-full py-1 text-gray-500 hover:bg-gray-100 rounded-xl text-[10px] font-semibold transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Message List */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={messageListStyle}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 h-full text-center">
            <span className="text-3xl">👋</span>
            <h3 className="text-sm font-bold text-gray-800 mt-2">Say Hello to {otherUser.name}!</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[240px]">Start the conversation about exchanging items.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = (msg.sender?._id || msg.sender) === currentUser?._id;
            const senderName = msg.sender?.name || (isMe ? currentUser?.name : otherUser.name);

            return (
              <MessageItem
                key={msg._id || index}
                msg={msg}
                index={index}
                isMe={isMe}
                senderName={senderName}
                editingIndex={editingIndex}
                editText={editText}
                setEditText={setEditText}
                handleStartEdit={handleStartEdit}
                handleSaveEdit={handleSaveEdit}
                handleDelete={handleDelete}
                setReplyingTo={setReplyingTo}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold px-6 py-1.5 animate-pulse shrink-0 bg-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="ml-1">{otherUser.name.split(" ")[0]} is typing...</span>
        </div>
      )}

      {/* Replying Preview Bar */}
      {replyingTo && (
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 flex items-center justify-between animate-fade-in shrink-0">
          <div className="border-l-4 border-[#2E7D32] pl-3 py-1 text-left">
            <p className="text-[10px] font-bold text-[#2E7D32]">Replying to {replyingTo.senderName}</p>
            <p className="text-xs text-gray-600 line-clamp-1 truncate">{replyingTo.text}</p>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      )}

      {/* Input Form */}
      <MessageInput onSendMessage={handleSendMessageWithReply} onTyping={onTyping} />
    </div>
  );
};

export default ChatWindow;