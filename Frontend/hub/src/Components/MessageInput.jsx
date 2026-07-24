import { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const quickEmojis = ["🤝", "😊", "👍", "💡", "📦", "🔥", "❓", "✅"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
    setShowEmojis(false);
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 relative">
      {/* Emoji Selector Panel */}
      {showEmojis && (
        <div className="absolute bottom-18 left-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl p-3 flex gap-2 z-50 animate-bounce-in">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              className="text-xl hover:scale-125 transition-transform p-1 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-2 focus-within:bg-white focus-within:border-[#2E7D32] focus-within:ring-4 focus-within:ring-[#2E7D32]/10 transition-all duration-200">
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          className={`text-gray-400 hover:text-[#2E7D32] transition-colors p-1 cursor-pointer ${showEmojis ? "text-[#2E7D32]" : ""}`}
          title="Insert Emoji"
        >
          <FaSmile className="text-xl" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 bg-transparent text-gray-800 text-sm outline-none border-none py-1.5"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] disabled:from-gray-300 disabled:to-gray-400 text-white p-2.5 rounded-xl shadow-md hover:scale-105 active:scale-95 disabled:scale-100 disabled:shadow-none transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
