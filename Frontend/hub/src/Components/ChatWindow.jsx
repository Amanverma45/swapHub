import { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaPen, FaTimes, FaExchangeAlt, FaRegClock, FaArrowLeft } from "react-icons/fa";
import MessageInput from "./MessageInput";

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
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    if (window.confirm("Are you sure you want to delete this entire chat? This action cannot be undone.")) {
      onDeleteChat(activeChat._id);
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
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-tight">{otherUser.name}</h2>
            <p className="text-[10px] text-gray-400 font-medium">{otherUser.email}</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
          title="Delete Conversation"
        >
          <FaTrashAlt className="text-sm" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              <div key={msg._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"} w-full group animate-fade-in`}>
                <div className={`flex flex-col max-w-[50%] ${isMe ? "items-end" : "items-start"} min-w-[80px]`}>
                  
                  {/* Sender Name */}
                  <span className="text-[10px] text-gray-400 font-semibold mb-0.5 px-1">{senderName}</span>

                  <div className="relative flex items-center gap-2">
                    
                    {/* Message Action Menu (Visible on hover for Own messages) */}
                    {isMe && editingIndex !== index && (
                      <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-gray-100 absolute -left-16 z-20">
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
                      className={`px-4 py-2.5 rounded-2xl text-sm shadow-2xs break-all ${
                        isMe
                          ? "bg-gradient-to-br from-[#2E7D32] to-[#1E5621] text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                      }`}
                    >
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
                              onClick={() => setEditingIndex(null)}
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
                        <p className="whitespace-pre-wrap leading-relaxed break-all">{msg.text}</p>
                      )}
                    </div>

                  </div>

                  {/* Message Timestamp */}
                  <span className="text-[9px] text-gray-400 font-medium mt-1 flex items-center gap-1 px-1">
                    <FaRegClock className="text-[8px]" />
                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>
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
          <span className="ml-1">{otherUser.name} is typing...</span>
        </div>
      )}

      {/* Input Form */}
      <MessageInput onSendMessage={onSendMessage} onTyping={onTyping} />
    </div>
  );
};

export default ChatWindow;