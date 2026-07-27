import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 600
  );
  const [previewImage, setPreviewImage] = useState(null);
  
  const socket = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Keep references to the latest chats and activeChat state
  // to avoid stale closures inside the socket events (like connection/reconnection)
  const chatsRef = useRef([]);
  const activeChatRef = useRef(null);

  const [viewportOffsetTop, setViewportOffsetTop] = useState(0);

  const handleViewAvatar = (profileImage) => {
    if (profileImage) {
      setPreviewImage(profileImage);
    } else {
      toast.error("No profile photo uploaded by this user");
    }
  };

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Strict layout reset for html, body, and root elements
  // to remove any default margins, paddings, or browser-specific offsets
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalMargin = document.body.style.margin;
    const originalPadding = document.body.style.padding;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";

    // Stop any manual browser body scrolling gestures
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.margin = originalMargin;
      document.body.style.padding = originalPadding;
      document.body.style.height = originalHeight;
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize Socket.io Connection on mount
  useEffect(() => {
    const socketHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const socketUrl = `http://${socketHost}:5000`;
    console.log("DEBUG: Initializing socket connection to:", socketUrl);
    
    socket.current = io(socketUrl);

    socket.current.on("connect", () => {
      console.log("DEBUG: Socket connected successfully! ID:", socket.current.id);
      
      // Rejoin active room on connect/reconnect
      if (activeChatRef.current) {
        console.log("DEBUG: Rejoining active room on connect:", activeChatRef.current._id);
        socket.current.emit("joinRoom", activeChatRef.current._id);
      }

      // Rejoin all chat rooms on connect/reconnect to listen to background messages
      console.log("DEBUG: Rejoining all rooms on connect:", chatsRef.current.map(c => c._id));
      chatsRef.current.forEach((chat) => {
        socket.current.emit("joinRoom", chat._id);
      });
    });

    socket.current.on("connect_error", (error) => {
      console.error("DEBUG: Socket connection error:", error);
    });

    // Real-time message receive handler
    socket.current.on("receiveMessage", (data) => {
      console.log("DEBUG: receiveMessage socket event received!", data);
      const active = activeChatRef.current;
      console.log("DEBUG: activeChatRef.current is:", active);

      if (active) {
        console.log(`DEBUG: Comparing active._id (${active._id}) with data.chatId (${data.chatId}):`, active._id === data.chatId);
      }

      // 1. If it belongs to the active chat room, append to messages
      if (active && active._id === data.chatId) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === data.message._id);
          if (exists) return prev;
          return [...prev, data.message];
        });
        if (data.message.sender._id !== currentUser._id) {
          axios.put("/markAsRead", { chatId: data.chatId, userId: currentUser._id })
            .catch((e) => console.error("Error marking message as read on receive:", e));
        }
      }

      // 2. Fresh snippet update in the sidebar chats list
      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c._id === data.chatId) {
            const hasMsg = c.messages.some((m) => m._id === data.message._id);
            const updatedMessages = hasMsg ? c.messages : [...c.messages, data.message];
            return { ...c, messages: updatedMessages };
          }
          return c;
        })
      );
    });

    // Real-time message edit handler
    socket.current.on("messageUpdated", (data) => {
      console.log("DEBUG: messageUpdated socket event received!", data);
      const active = activeChatRef.current;

      if (active && active._id === data.chatId) {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === data.messageIndex ? { ...msg, text: data.text } : msg
          )
        );
      }

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c._id === data.chatId) {
            const updatedMessages = c.messages.map((msg, i) =>
              i === data.messageIndex ? { ...msg, text: data.text } : msg
            );
            return { ...c, messages: updatedMessages };
          }
          return c;
        })
      );
    });

    // Real-time message delete handler
    socket.current.on("messageDeleted", (data) => {
      console.log("DEBUG: messageDeleted socket event received!", data);
      const active = activeChatRef.current;

      if (active && active._id === data.chatId) {
        setMessages((prev) => prev.filter((_, i) => i !== data.messageIndex));
      }

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c._id === data.chatId) {
            const updatedMessages = c.messages.filter((_, i) => i !== data.messageIndex);
            return { ...c, messages: updatedMessages };
          }
          return c;
        })
      );
    });

    // Real-time message read status handler
    socket.current.on("messagesRead", (data) => {
      console.log("DEBUG: messagesRead socket event received!", data);
      const active = activeChatRef.current;
      if (active && active._id === data.chatId) {
        setMessages((prev) =>
          prev.map((msg) => {
            const isMe = (msg.sender?._id || msg.sender) === currentUser?._id;
            if (isMe && !msg.isRead) {
              return { ...msg, isRead: true };
            }
            return msg;
          })
        );
      }
    });

    // Real-time chat clear handler
    socket.current.on("chatCleared", (data) => {
      console.log("DEBUG: chatCleared socket event received!", data);
      const active = activeChatRef.current;
      if (active && active._id === data.chatId) {
        setMessages([]);
      }
      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c._id === data.chatId) {
            return { ...c, messages: [] };
          }
          return c;
        })
      );
    });

    // Real-time typing status handlers
    socket.current.on("typing", (data) => {
      console.log("DEBUG: typing socket event received from sender!", data);
      setTypingUsers((prev) => ({ ...prev, [data.chatId]: true }));
    });

    socket.current.on("stopTyping", (data) => {
      console.log("DEBUG: stopTyping socket event received from sender!", data);
      setTypingUsers((prev) => ({ ...prev, [data.chatId]: false }));
    });

    return () => {
      if (socket.current) {
        socket.current.off("connect");
        socket.current.off("connect_error");
        socket.current.off("receiveMessage");
        socket.current.off("messageUpdated");
        socket.current.off("messageDeleted");
        socket.current.off("messagesRead");
        socket.current.off("chatCleared");
        socket.current.off("typing");
        socket.current.off("stopTyping");
        socket.current.disconnect();
      }
    };
  }, []);

  // Handle mobile keyboard and address bar resizing dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(window.visualViewport.height);
      setViewportOffsetTop(window.visualViewport.offsetTop);
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    window.addEventListener("scroll", handleResize);

    handleResize();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      }
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  // Emit joinRoom for active chat room whenever it is selected/changed
  useEffect(() => {
    if (socket.current && activeChat) {
      console.log("DEBUG: Emitting joinRoom for activeChat:", activeChat._id);
      socket.current.emit("joinRoom", activeChat._id);
    }
  }, [activeChat]);

  // Emit joinRoom for all chats whenever list changes (to receive background events)
  useEffect(() => {
    if (socket.current && chats.length > 0) {
      console.log("DEBUG: Emitting joinRoom for all chats:", chats.map(c => c._id));
      chats.forEach((chat) => {
        socket.current.emit("joinRoom", chat._id);
      });
    }
  }, [chats]);

  // Fetch all chats user is part of
  const getChats = async (selectChatIdAfterFetch = null) => {
    if (!currentUser?._id) return;
    try {
      const response = await axios.get(`/myChats/${currentUser._id}`);
      setChats(response.data);

      // Join rooms for all fetched chats immediately
      if (socket.current) {
        console.log("DEBUG: Immediately joining rooms for fetched chats:", response.data.map(c => c._id));
        response.data.forEach((chat) => {
          socket.current.emit("joinRoom", chat._id);
        });
      }

      if (selectChatIdAfterFetch) {
        const matchingChat = response.data.find((c) => c._id === selectChatIdAfterFetch);
        if (matchingChat) {
          handleSelectChat(matchingChat);
        }
      }
    } catch (error) {
      console.error("Fetch chats error:", error);
      toast.error("Could not fetch conversations");
    }
  };

  useEffect(() => {
    // If we have a redirected activeChatId from router state, load it automatically
    const targetChatId = location.state?.activeChatId;
    getChats(targetChatId);
  }, [location.state]);

  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
    try {
      const response = await axios.get(`/getMessages/${chat._id}?userId=${currentUser._id}`);
      setMessages(response.data);

      // Explicitly emit joinRoom on select click for safety
      if (socket.current) {
        console.log("DEBUG: Explicitly joining room on select click:", chat._id);
        socket.current.emit("joinRoom", chat._id);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      toast.error("Could not load messages");
    }
  };

  const handleSendMessage = async (text, replyTo = null) => {
    if (!activeChat) return;
    try {
      const response = await axios.post("/sendMessage", {
        chatId: activeChat._id,
        senderId: currentUser._id,
        text,
        replyTo,
      });

      // Instantly append for lag-free performance on the sender side
      const populatedChat = response.data;
      const newSavedMsg = populatedChat.messages[populatedChat.messages.length - 1];
      const formattedMessage = {
        ...newSavedMsg,
        sender: {
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
        },
      };

      setMessages((prev) => {
        const exists = prev.some((m) => m._id === formattedMessage._id);
        if (exists) return prev;
        return [...prev, formattedMessage];
      });

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c._id === activeChat._id) {
            const hasMsg = c.messages.some((m) => m._id === formattedMessage._id);
            const updatedMessages = hasMsg ? c.messages : [...c.messages, formattedMessage];
            return { ...c, messages: updatedMessages };
          }
          return c;
        })
      );
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Message send failed");
    }
  };

  const handleUpdateMessage = async (messageIndex, text) => {
    if (!activeChat) return;
    try {
      await axios.put("/updateMessage", {
        chatId: activeChat._id,
        messageIndex,
        text,
      });
    } catch (error) {
      console.error("Update message error:", error);
      toast.error("Message update failed");
    }
  };

  const handleDeleteMessage = async (messageIndex) => {
    if (!activeChat) return;
    try {
      await axios.delete("/deleteMessage", {
        data: {
          chatId: activeChat._id,
          messageIndex,
        },
      });
    } catch (error) {
      console.error("Delete message error:", error);
      toast.error("Message delete failed");
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await axios.delete(`/deleteChat/${chatId}`);
      toast.success("Chat cleared successfully");
      setMessages([]);
      getChats(chatId);
    } catch (error) {
      console.error("Clear chat error:", error);
      toast.error("Could not clear conversation");
    }
  };

  const handleTypingStatus = (isTyping) => {
    if (!activeChat || !socket.current) return;
    if (isTyping) {
      console.log("DEBUG: Emitting typing status: true");
      socket.current.emit("typing", { chatId: activeChat._id });
    } else {
      console.log("DEBUG: Emitting typing status: false");
      socket.current.emit("stopTyping", { chatId: activeChat._id });
    }
  };

  return (
    <div
      style={{
        height: `${viewportHeight}px`,
        transform: `translateY(${viewportOffsetTop}px)`,
      }}
      className="fixed inset-0 w-full bg-white overflow-hidden flex flex-col md:flex-row z-50 transition-transform duration-100 ease-out"
    >
      <div className={`h-full md:w-80 md:border-r border-gray-200/80 shrink-0 shadow-xs ${activeChat ? "hidden md:flex" : "w-full flex"}`}>
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          currentUser={currentUser}
          onExitChat={() => navigate("/welcome")}
          onViewAvatar={handleViewAvatar}
        />
      </div>
      <div className={`h-full flex-grow min-w-0 ${activeChat ? "w-full flex flex-col" : "hidden md:flex"}`}>
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          onUpdateMessage={handleUpdateMessage}
          onDeleteMessage={handleDeleteMessage}
          onDeleteChat={handleDeleteChat}
          isTyping={!!typingUsers[activeChat?._id]}
          onTyping={handleTypingStatus}
          onBackToList={() => setActiveChat(null)}
        />
      </div>

      {/* Direct Zoom Image Modal */}
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

export default Chat;