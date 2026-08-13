import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaSmile, FaCamera, FaExchangeAlt, FaMicrophone, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const MessageInput = ({ onSendMessage, onTyping, onToggleSwapOffer }) => {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const fileInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Smileys");

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);

  const emojiCategories = {
    Smileys: ["😊", "😂", "🤣", "❤️", "😍", "😜", "😎", "🤩", "🥳", "😭", "😢", "😡", "😱", "😴", "🤔", "😇", "👍", "👎", "🤝", "🙌", "👏", "🔥", "✨", "💯", "🙏", "👀", "🤷", "🤦"],
    Nature: ["🐶", "🐱", "🦁", "🐰", "🦊", "🐻", "🐼", "🐨", "🐸", "🐵", "🦄", "🦅", "🐝", "🌸", "🌻", "🍀", "🍁", "🍂", "🌴", "🌲", "🌞", "🌙", "⭐", "⚡", "🌈", "🔥", "🌊", "❄️"],
    Food: ["🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪", "🎂", "🍰", "🍫", "🍬", "🍦", "🍎", "🍌", "🍓", "🍉", "🍇", "🥑", "🥦", "🌶️", "☕", "🍺", "🥂", "🥤", "🍋", "🍍", "🥥", "🍿"],
    Objects: ["💡", "📦", "📚", "💻", "📱", "⌚", "📷", "🎥", "🎨", "🎮", "⚽", "🚗", "🚀", "🏠", "🎁", "🎈", "✉️", "🔑", "🛠️", "⚙️", "📎", "📌", "💵", "💎", "💳", "🛒", "🎒", "🎸"],
    Symbols: ["✅", "❌", "❓", "❤️", "💔", "💯", "⚠️", "🌀", "🎵", "💬", "🔔", "💤", "💭", "👉", "👈", "👆", "👇", "🔄", "🌟", "✨", "🏳️", "🌈", "🔥", "🤝", "➕", "➖", "✖️", "✔️"]
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Could not access microphone. Please check permissions!");
    }
  };

  const stopRecording = (shouldSend) => {
    if (!mediaRecorderRef.current) return;

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    
    // We override onstop to handle sending / discarding
    recorder.onstop = () => {
      const stream = recorder.stream;
      stream.getTracks().forEach((track) => track.stop());

      if (shouldSend && audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onSendMessage(reader.result);
          }
        };
        reader.readAsDataURL(audioBlob);
      }
      
      // Cleanup
      audioChunksRef.current = [];
      mediaRecorderRef.current = null;
    };

    recorder.stop();
    setIsRecording(false);
    setRecordingTime(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRecording) {
      stopRecording(true);
      return;
    }

    if (!text.trim()) {
      startRecording();
      return;
    }

    onSendMessage(text);
    setText("");
    setShowEmojis(false);

    // Stop typing indicator on send
    if (isTyping) {
      setIsTyping(false);
      if (onTyping) onTyping(false);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setText(val);

    if (onTyping) {
      if (!isTyping) {
        setIsTyping(true);
        onTyping(true);
      }

      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
        onTyping(false);
      }, 1500); // 1.5 seconds silence to stop typing
    }
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onSendMessage(reader.result);
      }
    };
    reader.onerror = (error) => console.error("Error reading file:", error);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-transparent border-t-0 relative w-full flex items-center gap-3">
      {/* Emoji Selector Panel */}
      {showEmojis && (
        <div className="absolute bottom-18 left-4 bg-white/95 backdrop-blur-md border border-gray-250 rounded-3xl shadow-2xl p-4 w-72 h-64 z-50 animate-bounce-in flex flex-col gap-3">
          {/* Categories Tab Header with Back Arrow */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 gap-2">
            {/* Close/Back Button */}
            <button
              type="button"
              onClick={() => setShowEmojis(false)}
              className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title="Close Emojis"
            >
              <FaArrowLeft className="text-xs" />
            </button>

            <div className="flex justify-between flex-1">
              {Object.keys(emojiCategories).map((cat) => {
                const tabIcons = {
                  Smileys: "😊",
                  Nature: "🐱",
                  Food: "🍕",
                  Objects: "💡",
                  Symbols: "✅"
                };
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`text-lg p-1 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                      activeCategory === cat ? "bg-emerald-50 border border-emerald-100" : "text-gray-400 hover:bg-gray-50 border border-transparent"
                    }`}
                    title={cat}
                  >
                    {tabIcons[cat]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emojis Grid (Scrollable) */}
          <div className="grid grid-cols-6 gap-2 overflow-y-auto flex-1 pr-1 max-h-[160px] scrollbar-thin">
            {emojiCategories[activeCategory].map((emoji, idx) => (
              <button
                key={`${emoji}-${idx}`}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-125 active:scale-95 transition-transform p-1 cursor-pointer text-center flex items-center justify-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {isRecording ? (
        /* Recording HUD Bubble */
        <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2.5 min-w-0 animate-pulse">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide shrink-0">Recording</span>
            <span className="text-xs font-mono font-bold text-gray-500 ml-1 shrink-0">{formatTime(recordingTime)}</span>
          </div>

          <button
            type="button"
            onClick={() => stopRecording(false)}
            className="text-red-500 hover:text-red-700 hover:scale-110 active:scale-95 transition-all text-xs font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded-full border border-red-150 cursor-pointer shrink-0"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* White Input Bubble */
        <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#2E7D32] focus-within:ring-4 focus-within:ring-[#2E7D32]/10 transition-all duration-200 min-w-0">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className={`text-gray-400 hover:text-[#2E7D32] transition-colors p-1 cursor-pointer shrink-0 ${showEmojis ? "text-[#2E7D32]" : ""}`}
            title="Insert Emoji"
          >
            <FaSmile className="text-xl" />
          </button>

          {/* Text Input with min-w-0 to prevent flexbox width overflow on mobile */}
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Message"
            className="flex-1 min-w-0 bg-transparent text-gray-800 text-sm outline-none border-none py-1.5"
          />

          {/* Swap Offer Propose Button */}
          <button
            type="button"
            onClick={onToggleSwapOffer}
            className="text-gray-400 hover:text-[#2E7D32] transition-colors p-1 cursor-pointer shrink-0"
            title="Send Swap Offer"
          >
            <FaExchangeAlt className="text-xl" />
          </button>

          {/* Camera Upload Button - Hides when typing */}
          {!text.trim() && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-[#2E7D32] transition-all duration-300 p-1 cursor-pointer shrink-0 animate-fade-in"
              title="Send Photo/Video"
            >
              <FaCamera className="text-xl" />
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />
        </div>
      )}

      {/* Send / Microphone Button (Outside) */}
      <button
        type="submit"
        className={`w-11 h-11 text-white rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
          isRecording 
            ? "bg-red-500 hover:bg-red-600 shadow-red-200" 
            : "bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219]"
        }`}
        title={isRecording ? "Send Voice" : text.trim() ? "Send Message" : "Record Voice"}
      >
        {isRecording ? (
          <FaPaperPlane className="text-sm translate-x-[-1px]" />
        ) : text.trim() ? (
          <FaPaperPlane className="text-sm translate-x-[-1px]" />
        ) : (
          <FaMicrophone className="text-base" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
