import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPen, FaTimes, FaExchangeAlt, FaRegClock, FaArrowLeft, FaReply, FaEllipsisV, FaCamera, FaCheckSquare, FaRegCopy, FaTrash } from "react-icons/fa";
import MessageInput from "./MessageInput";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

// WhatsApp-style double check marks SVG
const DoubleCheckSVG = ({ isRead, className, isMe }) => (
  <svg
    className={`${className} ${isRead
      ? "text-sky-400"
      : isMe
        ? "text-white/60"
        : "text-gray-400"
      }`}
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

// Helper to format date headers (Today, Yesterday, Day Name, or DD-Month-YYYY)
const getMessageDateHeader = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const today = new Date();

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msgMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = todayMidnight.getTime() - msgMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  } else {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
};

// Helper to format message time (e.g., 5.02 pm instead of 05:02 PM)
const formatMessageTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}.${minutes} ${ampm}`;
};

const getMessagePreviewText = (text) => {
  if (!text) return "";
  if (text.startsWith('{"type":"swapOffer"')) {
    try {
      const offer = JSON.parse(text);
      return `⇄ Swap Proposal: ${offer.offerProductName} for ${offer.targetProductName}`;
    } catch (e) {
      return text;
    }
  }
  return text;
};

// Preset wallpapers (colors, gradients, devotional and nature images)
const WALLPAPER_PRESETS = [
  { id: "default", name: "Default Light", value: "#efeae2" },
  { id: "dark", name: "Dark Slate", value: "#1e293b" },
  { id: "sunset", name: "Sunset Pink", value: "linear-gradient(to bottom right, #fecdd3, #ffedd5)" },
  { id: "sky", name: "Sky Gradient", value: "linear-gradient(to bottom right, #e0f2fe, #f0fdf4)" },
  // Devotional Presets
  { id: "hanuman", name: "Lord Hanuman", value: "url(/wallpapers/hanuman.png)" },
  { id: "krishna", name: "Lord Krishna", value: "url(/wallpapers/krishna.png)" },
  { id: "shiva", name: "Lord Shiva", value: "url(/wallpapers/shiva.png)" },
  // Nature Presets
  { id: "forest", name: "Forest Path", value: "url(/wallpapers/forest.png)" },
  { id: "mountains", name: "Mountains Sunset", value: "url(/wallpapers/mountains.png)" },
  { id: "beach", name: "Tropical Beach", value: "url(/wallpapers/beach.png)" }
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
  setPreviewImage,
  onUpdateSwapStatus,
  isSelectionMode,
  isSelected,
  onToggleSelect,
  onReactMessage,
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const touchStart = useRef(0);
  const isSwiping = useRef(false);
  const displaySenderName = isMe ? "You" : (senderName ? senderName.split(" ")[0] : "");
  const isSwapOffer = msg.text.startsWith('{"type":"swapOffer"');
  const isMedia = msg.text.startsWith("data:image/") || msg.text.startsWith("data:video/");
  const longPressTimeout = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
    isSwiping.current = true;
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      onToggleSelect();
    }, 600);
  };

  const handleTouchMove = (e) => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    if (!isSwiping.current) return;
    const diff = e.touches[0].clientX - touchStart.current;
    if (diff > 0 && diff < 80) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    isSwiping.current = false;
    if (dragOffset > 45) {
      setReplyingTo({
        text: msg.text.startsWith("data:image/")
          ? "📷 Photo"
          : msg.text.startsWith("data:video/")
            ? "🎥 Video"
            : msg.text,
        senderName: isMe ? "You" : (senderName ? senderName.split(" ")[0] : ""),
      });
    }
    setDragOffset(0);
  };

  const handleMouseDown = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      onToggleSelect();
    }, 600);
  };

  const handleMouseUp = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handleRowClick = (e) => {
    if (isSelectionMode) {
      e.stopPropagation();
      onToggleSelect();
    }
  };

  return (
    <div
      className={`w-full relative group animate-fade-in py-1.5 transition-colors duration-150 ${isSelected ? "bg-[#2E7D32]/10" : ""} ${isSelectionMode ? "cursor-pointer" : ""} ${msg.reactions && msg.reactions.length > 0 ? "mb-2.5" : ""}`}
      onTouchStart={isSelectionMode ? undefined : handleTouchStart}
      onTouchMove={isSelectionMode ? undefined : handleTouchMove}
      onTouchEnd={isSelectionMode ? undefined : handleTouchEnd}
      onMouseDown={isSelectionMode ? undefined : handleMouseDown}
      onMouseUp={isSelectionMode ? undefined : handleMouseUp}
      onDoubleClick={isSelectionMode ? undefined : onToggleSelect}
      onClick={handleRowClick}
    >
      {dragOffset > 10 && (
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-emerald-600 transition-opacity"
          style={{ opacity: Math.min(dragOffset / 50, 1) }}
        >
          <FaReply className="text-base animate-pulse" />
        </div>
      )}

      <div
        className="flex items-center w-full transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${dragOffset}px)` }}
      >
        {/* Checkbox (Visible in Selection Mode) */}
        {isSelectionMode && (
          <div className="flex items-center justify-center pr-3 pl-2 shrink-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onToggleSelect();
              }}
              className="w-4 h-4 rounded-sm accent-[#2E7D32] border-gray-300 text-[#2E7D32] focus:ring-[#2E7D32] cursor-pointer"
            />
          </div>
        )}

        <div className={`flex ${isMe ? "justify-end" : "justify-start"} flex-1 min-w-0`}>
          <div className={`flex flex-col ${isSwapOffer ? "max-w-[90%] sm:max-w-[70%]" : "max-w-[70%] sm:max-w-[50%]"} ${isMe ? "items-end" : "items-start"} min-w-[80px]`}>

            {/* Sender Name */}
            <span className="text-[10px] text-gray-400 font-semibold mb-0.5 px-1">
              {displaySenderName}
            </span>

            <div className={`relative flex items-center gap-2 w-full ${isMe ? "justify-end" : "justify-start"}`}>

              {/* Message Action Menu (Visible on hover for Own messages) */}
              {isMe && editingIndex !== index && !isSelectionMode && (
                <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-gray-100 absolute -left-24 z-20">
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

              {/* Emojis Reactions Picker (Visible on hover above bubble) */}
              {!isSelectionMode && editingIndex !== index && (
                <div className={`opacity-0 group-hover:opacity-100 absolute -top-8.5 ${isMe ? "right-2" : "left-2"} flex gap-1 bg-white border border-gray-150 shadow-md px-1.5 py-0.5 rounded-full z-30 transition-opacity`}>
                  {["👍", "❤️", "😂", "😮", "😢", "🙏"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReactMessage(index, emoji);
                      }}
                      className="hover:scale-130 transition-transform cursor-pointer text-xs leading-none p-0.5"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* Bubble Content */}
              <div
                className={`rounded-2xl text-sm shadow-2xs break-words w-fit max-w-full relative ${isMedia
                    ? "p-1 bg-white border border-gray-200/80 shadow-xs"
                    : isMe
                      ? "px-4 py-2.5 bg-gradient-to-br from-[#2E7D32] to-[#1E5621] text-white"
                      : "px-4 py-2.5 bg-white text-gray-800 border border-gray-100"
                  }`}
              >
                {/* Quoted Message (if replying) */}
                {msg.replyTo && msg.replyTo.text && (
                  <div className={`mb-2 p-2 rounded-lg border-l-4 text-xs text-left ${isMe
                    ? "bg-[#1E5621]/45 border-emerald-300 text-emerald-100"
                    : "bg-gray-50 border-[#2E7D32] text-gray-600"
                    }`}>
                    <p className="font-bold text-[9px] mb-0.5 opacity-90">
                      {msg.replyTo.senderName}
                    </p>
                    <p className="line-clamp-2 truncate opacity-85">
                      {getMessagePreviewText(msg.replyTo.text)}
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
                  <>
                    {msg.text.startsWith('{"type":"swapOffer"') ? (() => {
                      try {
                        const offer = JSON.parse(msg.text);
                        return (
                          <div className={`flex flex-col gap-3 w-[220px] sm:w-[280px] p-1.5 text-left ${isMe ? "text-white" : "text-gray-850"}`}>
                            <div className={`flex items-center gap-1.5 text-xs font-extrabold border-b pb-2 ${isMe ? "text-emerald-100 border-white/20" : "text-[#2E7D32] border-gray-150"}`}>
                              <FaExchangeAlt className="text-sm" />
                              <span>SWAP PROPOSAL</span>
                            </div>

                            <div className="grid grid-cols-5 gap-1.5 items-center my-1.5">
                              <div className="col-span-2 flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden border border-gray-150 shadow-2xs">
                                  <img src={offer.offerProductImage} alt={offer.offerProductName} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-[10px] font-bold truncate w-full mt-1.5 ${isMe ? "text-white" : "text-gray-700"}`}>{offer.offerProductName}</span>
                                <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${isMe ? "text-emerald-100/80" : "text-gray-400"}`}>Offered</span>
                              </div>

                              <div className={`col-span-1 flex justify-center text-lg ${isMe ? "text-emerald-200/80" : "text-gray-400"}`}>
                                ⇄
                              </div>

                              <div className="col-span-2 flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden border border-gray-150 shadow-2xs">
                                  <img src={offer.targetProductImage} alt={offer.targetProductName} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-[10px] font-bold truncate w-full mt-1.5 ${isMe ? "text-white" : "text-gray-700"}`}>{offer.targetProductName}</span>
                                <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${isMe ? "text-emerald-100/80" : "text-gray-400"}`}>Requested</span>
                              </div>
                            </div>

                            <div className={`mt-1 border-t pt-2.5 flex flex-col gap-2 ${isMe ? "border-white/20" : "border-gray-150"}`}>
                              {offer.status === "pending" ? (
                                !isMe ? (
                                  <div className="flex gap-2 w-full">
                                    <button
                                      onClick={() => onUpdateSwapStatus("declined")}
                                      className="flex-1 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-extrabold cursor-pointer transition-colors text-center"
                                    >
                                      Decline
                                    </button>
                                    <button
                                      onClick={() => onUpdateSwapStatus("accepted")}
                                      className="flex-1 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#1E5621] text-white text-[10px] font-extrabold cursor-pointer transition-all shadow-xs text-center"
                                    >
                                      Accept Swap
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center py-1 bg-yellow-50 border border-yellow-100 rounded-xl">
                                    <span className="text-[9px] font-extrabold text-yellow-600 uppercase tracking-wide">Waiting for response</span>
                                  </div>
                                )
                              ) : offer.status === "accepted" ? (
                                <div className="text-center py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                  <span className="text-[9px] font-extrabold text-[#2E7D32] uppercase tracking-wide">Swap Accepted</span>
                                </div>
                              ) : (
                                <div className="text-center py-1.5 bg-red-50 border border-red-100 rounded-xl">
                                  <span className="text-[9px] font-extrabold text-red-600 uppercase tracking-wide">Swap Declined</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      } catch (e) {
                        return <p className="whitespace-pre-wrap text-left leading-relaxed break-all inline">{msg.text}</p>;
                      }
                    })() : msg.text.startsWith("data:image/") ? (
                      <div className="relative rounded-xl overflow-hidden cursor-pointer max-w-[240px] sm:max-w-[300px]" onClick={() => setPreviewImage(msg.text)}>
                        <img src={msg.text} alt="Shared Photo" className="w-full h-auto object-cover max-h-60 rounded-xl" />
                      </div>
                    ) : msg.text.startsWith("data:video/") ? (
                      <div className="relative rounded-xl overflow-hidden max-w-[245px] sm:max-w-[320px] bg-black">
                        <video src={msg.text} controls className="w-full h-auto max-h-60 rounded-xl" />
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-left leading-relaxed break-all inline">{msg.text}</p>
                    )}

                    {/* Message Timestamp and Read Status inside the bubble */}
                    <span className={isMedia
                      ? "absolute bottom-3 right-3 bg-black/50 text-white backdrop-blur-xs px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 text-[9px] font-bold select-none z-10"
                      : `inline-flex items-center gap-0.5 text-[9px] font-bold select-none float-right ml-2.5 mt-2.5 -mr-1 -mb-1 translate-y-[3px] opacity-75 ${isMe ? "text-emerald-100/90" : "text-gray-400"}`
                    }>
                      {formatMessageTime(msg.createdAt)}
                      {isMe && (
                        <DoubleCheckSVG isRead={msg.isRead} isMe={isMe} className={`shrink-0 scale-90 ${isMedia ? "text-sky-350" : ""}`} />
                      )}
                    </span>
                  </>
                )}

                {/* Reactions Badge */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div
                    className={`absolute -bottom-2.5 ${isMe ? "left-3.5" : "right-3.5"} flex items-center gap-0.5 bg-white border border-gray-150 shadow-2xs px-1.5 py-0.5 rounded-full z-20 text-[10px] select-none hover:scale-105 transition-transform cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const myReaction = msg.reactions.find((r) => r.senderId === currentUser?._id);
                      if (myReaction) {
                        onReactMessage(index, myReaction.emoji);
                      }
                    }}
                  >
                    {Array.from(new Set(msg.reactions.map((r) => r.emoji))).slice(0, 3).map((emoji) => (
                      <span key={emoji} className="leading-none">{emoji}</span>
                    ))}
                    {msg.reactions.length > 1 && (
                      <span className="text-[8px] font-extrabold text-gray-500 ml-0.5 leading-none">{msg.reactions.length}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Message Action Menu (Visible on hover for Other messages) */}
              {!isMe && !isSelectionMode && (
                <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-gray-100 absolute -right-14 z-20">
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
          </div>

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
  isLoading,
  onReactMessage,
}) => {
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Selected Message & Deletion States
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMsgIndices, setSelectedMsgIndices] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletedMsgIds, setDeletedMsgIds] = useState([]);

  // Swap Offer States
  const [showSwapOffer, setShowSwapOffer] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [theirProducts, setTheirProducts] = useState([]);
  const [selectedMyProduct, setSelectedMyProduct] = useState(null);
  const [selectedTheirProduct, setSelectedTheirProduct] = useState(null);
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

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

  const otherUser = activeChat?.users?.find((u) => u._id !== currentUser?._id) || {
    name: "Deleted User",
    email: "deleted@swaphub.com",
  };

  // Close profile view when activeChat changes
  useEffect(() => {
    setShowProfile(false);
    setUserProducts([]);
  }, [activeChat?._id]);

  // Load deleted for me messages on activeChat load
  useEffect(() => {
    if (activeChat?._id) {
      const saved = JSON.parse(localStorage.getItem(`deleted_msgs_${activeChat._id}`) || "[]");
      setDeletedMsgIds(saved);
      setIsSelectionMode(false);
      setSelectedMsgIndices([]);
    }
  }, [activeChat?._id]);

  // Fetch listed products when swap offer is toggled open
  useEffect(() => {
    if (showSwapOffer && currentUser?._id && otherUser?._id) {
      axios.get("/getProduct")
        .then((res) => {
          const mine = res.data.filter((p) => p.owner === currentUser._id);
          const theirs = res.data.filter((p) => p.owner === otherUser._id);
          setMyProducts(mine);
          setTheirProducts(theirs);
          if (mine.length > 0) setSelectedMyProduct(mine[0]);
          if (theirs.length > 0) setSelectedTheirProduct(theirs[0]);
        })
        .catch((err) => console.error("Error fetching products for swap offer:", err));
    }
  }, [showSwapOffer, currentUser?._id, otherUser?._id]);

  // Fetch listed products of the other user when profile view is opened
  useEffect(() => {
    if (showProfile && otherUser?._id) {
      axios.get("/getProduct")
        .then((res) => {
          const filtered = res.data.filter((p) => p.owner === otherUser._id);
          setUserProducts(filtered);
        })
        .catch((err) => console.error("Error fetching user products:", err));
    }
  }, [showProfile, otherUser?._id]);

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

  const handleToggleSelectMessage = (index) => {
    setSelectedMsgIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleDeleteForEveryone = () => {
    if (selectedMsgIndices.length === 0) return;

    const sortedIndices = [...selectedMsgIndices].sort((a, b) => b - a);
    sortedIndices.forEach((idx) => {
      onDeleteMessage(idx);
    });

    setShowDeleteDialog(false);
    setIsSelectionMode(false);
    setSelectedMsgIndices([]);
    toast.success("Selected messages deleted for everyone");
  };

  const handleDeleteForMe = () => {
    if (selectedMsgIndices.length === 0) return;

    const updated = [...deletedMsgIds];
    selectedMsgIndices.forEach((idx) => {
      const msg = messages[idx];
      const msgKey = msg._id || idx;
      if (!updated.includes(msgKey)) {
        updated.push(msgKey);
      }
    });

    setDeletedMsgIds(updated);
    localStorage.setItem(`deleted_msgs_${activeChat._id}`, JSON.stringify(updated));

    setShowDeleteDialog(false);
    setIsSelectionMode(false);
    setSelectedMsgIndices([]);
    toast.success("Selected messages deleted for you");
  };

  const handleCopySelectedMessages = () => {
    if (selectedMsgIndices.length === 0) return;

    const sortedIndices = [...selectedMsgIndices].sort((a, b) => a - b);
    const textPieces = sortedIndices.map((idx) => {
      const msg = messages[idx];
      const isMe = (msg.sender?._id || msg.sender) === currentUser?._id;
      const senderName = msg.sender?.name || (isMe ? currentUser?.name : otherUser.name);

      let bodyText = msg.text;
      if (msg.text.startsWith('{"type":"swapOffer"')) {
        try {
          const offer = JSON.parse(msg.text);
          bodyText = `⇄ Swap Proposal: ${offer.offerProductName} for ${offer.targetProductName}`;
        } catch (e) {
          bodyText = msg.text;
        }
      }
      return `[${senderName}]: ${bodyText}`;
    });

    navigator.clipboard.writeText(textPieces.join("\n"));
    toast.success("Messages copied!");
    setIsSelectionMode(false);
    setSelectedMsgIndices([]);
  };

  const handleClearChat = () => {
    onDeleteChat(activeChat._id);
  };

  const handleSendMessageWithReply = (text) => {
    onSendMessage(text, replyingTo ? { text: replyingTo.text, senderName: replyingTo.senderName } : null);
    setReplyingTo(null);
  };

  const handleSendSwapOffer = async () => {
    if (!selectedMyProduct || !selectedTheirProduct) {
      toast.error("Please select both products to propose a swap!");
      return;
    }

    setIsSubmittingOffer(true);
    try {
      const response = await axios.post("/swapProduct", {
        receiver: otherUser._id,
        requestedProduct: selectedTheirProduct._id,
        offeredProduct: selectedMyProduct._id,
      });

      const swapItem = response.data.swapItem;

      const offerPayload = {
        type: "swapOffer",
        swapRequestId: swapItem._id,
        offerProductId: selectedMyProduct._id,
        offerProductName: selectedMyProduct.productName,
        offerProductImage: selectedMyProduct.image,
        targetProductId: selectedTheirProduct._id,
        targetProductName: selectedTheirProduct.productName,
        targetProductImage: selectedTheirProduct.image,
        status: "pending"
      };

      onSendMessage(JSON.stringify(offerPayload));

      setShowSwapOffer(false);
      setSelectedMyProduct(null);
      setSelectedTheirProduct(null);
      toast.success("Swap proposal sent successfully!");
    } catch (err) {
      console.error("Error sending swap offer:", err);
      toast.error(err.response?.data?.message || "Failed to send swap proposal");
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  const handleUpdateSwapOfferStatus = async (msg, msgIndex, newStatus) => {
    try {
      const offer = JSON.parse(msg.text);

      if (newStatus === "accepted") {
        await axios.put(`/acceptSwapRequest/${offer.swapRequestId}`);
      } else {
        await axios.put(`/rejectSwapRequest/${offer.swapRequestId}`);
      }

      offer.status = newStatus;

      await axios.put("/updateMessage", {
        chatId: activeChat._id,
        messageIndex: msgIndex,
        text: JSON.stringify(offer)
      });

      toast.success(`Swap offer ${newStatus}!`);
    } catch (err) {
      console.error("Error updating swap status:", err);
      toast.error(err.response?.data?.message || "Failed to update proposal");
    }
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

  if (!activeChat) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center bg-[#f8f9fa] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-2xl mb-3 shadow-xs border border-emerald-100/50">
          💬
        </div>
        <h3 className="text-sm font-extrabold text-gray-800">Select a Conversation</h3>
        <p className="text-xs text-gray-500 mt-1.5 max-w-[240px] leading-relaxed">
          Choose a contact from the sidebar to view their profile and start swapping items.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex-1 w-full min-w-0 h-full flex flex-col bg-slate-50/40 relative overflow-hidden"
      style={messageListStyle}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200/60 bg-white px-4 flex items-center justify-between shadow-xs shrink-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowProfile(true)} title="View Profile">
          {onBackToList && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBackToList();
              }}
              className="md:hidden text-gray-500 hover:text-[#2E7D32] p-1.5 rounded-xl hover:bg-gray-100 cursor-pointer flex items-center justify-center shrink-0"
              title="Back to conversations"
            >
              <FaArrowLeft className="text-base" />
            </button>
          )}
          <div className="relative">
            {otherUser.profileImage ? (
              <img
                src={otherUser.profileImage}
                alt={otherUser.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-100 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform`}>
                {initials}
              </div>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#2E7D32] transition-colors">{otherUser.name}</h2>
            <p className="text-[10px] text-gray-400 font-medium">{otherUser.email}</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
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
                <div className="grid grid-cols-5 gap-2 mb-3.5">
                  {WALLPAPER_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => selectPresetWallpaper(preset.value)}
                      title={preset.name}
                      className={`w-7 h-7 rounded-full border border-gray-200 cursor-pointer hover:scale-110 active:scale-95 transition-transform ${wallpaper === preset.value ? "ring-2 ring-emerald-500 ring-offset-1" : ""
                        }`}
                      style={{
                        backgroundImage: preset.value.includes("gradient") || preset.value.startsWith("url") ? preset.value : undefined,
                        backgroundColor: preset.value.includes("gradient") || preset.value.startsWith("url") ? undefined : preset.value,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
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

                <button
                  onClick={() => {
                    setIsSelectionMode(true);
                    setSelectedMsgIndices([]);
                    setShowMenu(false);
                  }}
                  className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold transition-all cursor-pointer mb-1"
                >
                  Select Messages
                </button>

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
      </div>

      {/* Message List */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full h-full justify-start p-2 animate-pulse">
            {/* Shimmer Incoming Message */}
            <div className="flex justify-start w-full">
              <div className="flex flex-col items-start gap-1.5 max-w-[70%]">
                <div className="h-3 w-16 bg-gray-300/40 rounded-md" />
                <div className="h-10 w-44 bg-gray-250/50 rounded-2xl" />
              </div>
            </div>
            {/* Shimmer Outgoing Message */}
            <div className="flex justify-end w-full">
              <div className="flex flex-col items-end gap-1.5 max-w-[70%]">
                <div className="h-12 w-60 bg-emerald-300/20 rounded-2xl" />
              </div>
            </div>
            {/* Shimmer Incoming Message */}
            <div className="flex justify-start w-full">
              <div className="flex flex-col items-start gap-1.5 max-w-[70%]">
                <div className="h-3 w-20 bg-gray-300/40 rounded-md" />
                <div className="h-14 w-52 bg-gray-250/50 rounded-2xl" />
              </div>
            </div>
            {/* Shimmer Outgoing Message */}
            <div className="flex justify-end w-full">
              <div className="flex flex-col items-end gap-1.5 max-w-[70%]">
                <div className="h-10 w-36 bg-emerald-300/20 rounded-2xl" />
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 h-full text-center">
            <span className="text-3xl">👋</span>
            <h3 className="text-sm font-bold text-gray-800 mt-2">Say Hello to {otherUser.name}!</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[240px]">Start the conversation about exchanging items.</p>
          </div>
        ) : (() => {
          let lastDateHeader = null;
          return messages.map((msg, index) => {
            const msgKey = msg._id || index;
            if (deletedMsgIds.includes(msgKey)) return null;

            const isMe = (msg.sender?._id || msg.sender) === currentUser?._id;
            const senderName = msg.sender?.name || (isMe ? currentUser?.name : otherUser.name);
            const dateHeader = getMessageDateHeader(msg.createdAt);
            const showDateDivider = dateHeader !== lastDateHeader;
            lastDateHeader = dateHeader;

            return (
              <div key={msg._id || index} className="w-full flex flex-col shrink-0">
                {showDateDivider && (
                  <div className="flex justify-center my-3 shrink-0">
                    <span className="bg-white/85 backdrop-blur-xs text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-xs border border-gray-200/50 uppercase tracking-wide">
                      {dateHeader}
                    </span>
                  </div>
                )}
                <MessageItem
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
                  setPreviewImage={setPreviewImage}
                  onUpdateSwapStatus={(status) => handleUpdateSwapOfferStatus(msg, index, status)}
                  isSelectionMode={isSelectionMode}
                  isSelected={selectedMsgIndices.includes(index)}
                  onToggleSelect={() => handleToggleSelectMessage(index)}
                  onReactMessage={onReactMessage}
                />
              </div>
            );
          });
        })()}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold px-6 py-1.5 animate-pulse shrink-0 bg-transparent">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="ml-1">{otherUser.name.split(" ")[0]} is typing...</span>
        </div>
      )}

      {isSelectionMode ? (
        <div className="h-16 bg-[#f0f2f5] border-t border-gray-200 px-6 flex items-center justify-between shadow-xs shrink-0 animate-fade-in">
          <div className="flex items-center gap-4.5">
            <button
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedMsgIndices([]);
              }}
              className="text-gray-500 hover:text-red-500 transition-colors p-1.5 hover:bg-gray-200/50 rounded-xl cursor-pointer flex items-center justify-center"
              title="Cancel Selection"
            >
              <FaTimes className="text-base" />
            </button>
            <span className="text-sm font-bold text-gray-700 select-none">
              {selectedMsgIndices.length} selected
            </span>
          </div>

          <div className="flex items-center gap-5">
            {selectedMsgIndices.length > 0 && (
              <>
                <button
                  onClick={handleCopySelectedMessages}
                  className="text-gray-500 hover:text-[#00a884] p-2 hover:bg-gray-250/20 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  title="Copy Messages"
                >
                  <FaRegCopy className="text-base" />
                </button>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-gray-500 hover:text-red-600 p-2 hover:bg-gray-250/20 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  title="Delete Messages"
                >
                  <FaTrash className="text-base" />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Replying Preview Bar */}
          {replyingTo && (
            <div className="px-4 py-2 bg-white/50 backdrop-blur-md border-t border-white/20 flex items-center justify-between animate-fade-in shrink-0">
              <div className="border-l-4 border-[#2E7D32] pl-3 py-1 text-left">
                <p className="text-[10px] font-bold text-[#2E7D32]">Replying to {replyingTo.senderName}</p>
                <p className="text-xs text-gray-600 line-clamp-1 truncate">
                  {getMessagePreviewText(replyingTo.text)}
                </p>
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
          <MessageInput
            onSendMessage={handleSendMessageWithReply}
            onTyping={onTyping}
            onToggleSwapOffer={() => setShowSwapOffer(!showSwapOffer)}
          />
        </>
      )}

      {/* Swap Offer Creation Modal */}
      {showSwapOffer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowSwapOffer(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-bounce-in text-left border border-gray-150 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <FaExchangeAlt className="text-[#2E7D32]" />
                Propose Swap Trade
              </h3>
              <button onClick={() => setShowSwapOffer(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer p-1">
                <FaTimes />
              </button>
            </div>

            {/* Step 1: Select Their Product */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select {otherUser.name}'s Item You Want</label>
              {theirProducts.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No products listed by this user.</p>
              ) : (
                <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin">
                  {theirProducts.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => setSelectedTheirProduct(p)}
                      className={`flex flex-col items-center text-center p-2 rounded-2xl border-2 cursor-pointer shrink-0 w-24 hover:scale-105 transition-all relative ${selectedTheirProduct?._id === p._id
                        ? "border-[#2E7D32] bg-emerald-50/30 shadow-xs"
                        : "border-gray-150 bg-white"
                        }`}
                    >
                      {/* Checkmark Circle on top-right */}
                      {selectedTheirProduct?._id === p._id && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-[9px] font-extrabold shadow-sm animate-scale-in">
                          ✓
                        </div>
                      )}
                      <img src={p.image} alt={p.productName} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                      <span className="text-[9px] font-extrabold text-gray-700 truncate w-full mt-1.5">{p.productName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2: Select My Product */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Your Offered Item in Exchange</label>
              {myProducts.length === 0 ? (
                <p className="text-xs text-red-500 italic font-semibold">You don't have any listed products. Please list an item first.</p>
              ) : (
                <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin">
                  {myProducts.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => setSelectedMyProduct(p)}
                      className={`flex flex-col items-center text-center p-2 rounded-2xl border-2 cursor-pointer shrink-0 w-24 hover:scale-105 transition-all relative ${selectedMyProduct?._id === p._id
                        ? "border-[#2E7D32] bg-emerald-50/30 shadow-xs"
                        : "border-gray-150 bg-white"
                        }`}
                    >
                      {/* Checkmark Circle on top-right */}
                      {selectedMyProduct?._id === p._id && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-[9px] font-extrabold shadow-sm animate-scale-in">
                          ✓
                        </div>
                      )}
                      <img src={p.image} alt={p.productName} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                      <span className="text-[9px] font-extrabold text-gray-700 truncate w-full mt-1.5">{p.productName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setShowSwapOffer(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-250 text-gray-600 font-extrabold text-xs cursor-pointer hover:bg-gray-50 text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmittingOffer || !selectedMyProduct || !selectedTheirProduct}
                onClick={handleSendSwapOffer}
                className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1E5621] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold text-xs cursor-pointer transition-all shadow-md text-center"
              >
                {isSubmittingOffer ? "Sending..." : "Send Proposal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Read-Only Member Profile Overlay View */}
      {showProfile && (
        <div className="absolute inset-0 bg-gray-50 flex flex-col z-40 animate-fade-in text-left">
          {/* Profile Header */}
          <div className="h-16 border-b border-gray-100 bg-white px-4 flex items-center gap-3 shadow-xs shrink-0">
            <button
              onClick={() => setShowProfile(false)}
              className="text-gray-500 hover:text-[#2E7D32] p-1.5 rounded-xl hover:bg-gray-100 cursor-pointer flex items-center justify-center shrink-0"
              title="Back to Chat"
            >
              <FaArrowLeft className="text-base" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">About {otherUser.name.split(" ")[0]}</h2>
          </div>

          {/* Profile Content Body */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 max-w-2xl mx-auto w-full">

            {/* Top Section: Avatar, Name & Email */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200">
              <div className="relative group cursor-pointer mb-4" onClick={() => {
                if (otherUser.profileImage) {
                  setPreviewImage(otherUser.profileImage);
                } else {
                  toast.error("No profile photo uploaded by this user");
                }
              }}>
                {otherUser.profileImage ? (
                  <img
                    src={otherUser.profileImage}
                    alt={otherUser.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-extrabold bg-gradient-to-br ${gradient} shadow-md`}>
                    {initials}
                  </div>
                )}
                {otherUser.profileImage && (
                  <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                    🔍 View Photo
                  </div>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{otherUser.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-semibold">{otherUser.email}</p>
            </div>

            {/* Middle Section: Phone & Location Details */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left border-b border-gray-100 sm:border-b-0 pb-3 sm:pb-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</span>
                  <p className="text-sm font-extrabold text-gray-800 mt-0.5">
                    {otherUser.phone || "Not Shared"}
                  </p>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location / City</span>
                  <p className="text-sm font-extrabold text-gray-800 mt-0.5">
                    {otherUser.location || "Not Specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Listed Products */}
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-gray-900 text-left uppercase tracking-wider text-gray-400">
                Listed items ({userProducts.length})
              </h4>

              {userProducts.length === 0 ? (
                <div className="bg-gray-100 rounded-3xl p-8 text-center shadow-xs">
                  <p className="text-xs font-bold text-gray-400">No active listings posted by this member.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userProducts.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        setShowProfile(false);
                        navigate(`/product/${p._id}`);
                      }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-3 cursor-pointer text-left"
                    >
                      <div className="w-full h-24 sm:h-28 rounded-xl bg-gray-50 overflow-hidden border border-gray-50">
                        <img
                          src={p.image}
                          alt={p.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h5 className="text-xs font-bold text-gray-900 mt-2 truncate">
                        {p.productName}
                      </h5>
                      <span className="text-[10px] font-semibold text-gray-400 mt-0.5 inline-block">
                        {p.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp-Style Deletion Dialog */}
      {showDeleteDialog && (() => {
        const allSelectedAreMine = selectedMsgIndices.length > 0 && selectedMsgIndices.every((idx) => {
          const msg = messages[idx];
          const msgSenderId = msg?.sender?._id || msg?.sender;
          return msgSenderId === currentUser?._id;
        });

        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowDeleteDialog(false)}>
            <div className="bg-white rounded-[24px] shadow-2xl max-w-sm w-full p-6 animate-bounce-in text-left border border-gray-100 flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
              <h4 className="text-sm font-bold text-gray-800">Delete message?</h4>

              <div className="flex justify-end items-center gap-3">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-250 text-[#00a884] hover:bg-[#00a884]/5 font-bold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>

                {allSelectedAreMine && (
                  <button
                    onClick={handleDeleteForEveryone}
                    className="px-5 py-2.5 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white font-bold text-xs cursor-pointer transition-colors shadow-2xs"
                  >
                    Delete for everyone
                  </button>
                )}

                <button
                  onClick={handleDeleteForMe}
                  className="px-5 py-2.5 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white font-bold text-xs cursor-pointer transition-colors shadow-2xs"
                >
                  Delete for me
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white text-xl flex items-center justify-center hover:bg-white/40 transition font-bold cursor-pointer z-50"
          >
            ✕
          </button>
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[85vh] rounded-3xl shadow-2xl border border-white/20 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;