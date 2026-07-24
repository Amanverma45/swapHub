import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const socket = useRef(null);
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Initialize Socket.io Connection on mount
  useEffect(() => {
    const socketHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
    socket.current = io(`http://${socketHost}:5000`);

    socket.current.on("connect", () => {
      console.log("Socket client connected:", socket.current.id);
    });

    // Real-time message receive handler
    socket.current.on("receiveMessage", (data) => {
      // 1. If it belongs to the active chat room, append to messages
      setActiveChat((currentActive) => {
        if (currentActive && currentActive._id === data.chatId) {
          setMessages((prev) => {
            const exists = prev.some((m) => m._id === data.message._id);
            if (exists) return prev;
            return [...prev, data.message];
          });
        }
        return currentActive;
      });

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
      setActiveChat((currentActive) => {
        if (currentActive && currentActive._id === data.chatId) {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === data.messageIndex ? { ...msg, text: data.text } : msg
            )
          );
        }
        return currentActive;
      });

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
      setActiveChat((currentActive) => {
        if (currentActive && currentActive._id === data.chatId) {
          setMessages((prev) => prev.filter((_, i) => i !== data.messageIndex));
        }
        return currentActive;
      });

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

    // Real-time typing status handlers
    socket.current.on("typing", (data) => {
      setTypingUsers((prev) => ({ ...prev, [data.chatId]: true }));
    });

    socket.current.on("stopTyping", (data) => {
      setTypingUsers((prev) => ({ ...prev, [data.chatId]: false }));
    });

    return () => {
      if (socket.current) {
        socket.current.off("connect");
        socket.current.off("receiveMessage");
        socket.current.off("messageUpdated");
        socket.current.off("messageDeleted");
        socket.current.off("typing");
        socket.current.off("stopTyping");
        socket.current.disconnect();
      }
    };
  }, []);

  // Emit joinRoom for active chat room whenever it is selected/changed
  useEffect(() => {
    if (socket.current && activeChat) {
      socket.current.emit("joinRoom", activeChat._id);
    }
  }, [activeChat]);

  // Emit joinRoom for all chats whenever list changes (to receive background events)
  useEffect(() => {
    if (socket.current && chats.length > 0) {
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
      const response = await axios.get(`/getMessages/${chat._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Fetch messages error:", error);
      toast.error("Could not load messages");
    }
  };

  const handleSendMessage = async (text) => {
    if (!activeChat) return;
    try {
      const response = await axios.post("/sendMessage", {
        chatId: activeChat._id,
        senderId: currentUser._id,
        text,
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
      toast.success("Chat deleted successfully");
      setActiveChat(null);
      setMessages([]);
      getChats();
    } catch (error) {
      console.error("Delete chat error:", error);
      toast.error("Could not delete conversation");
    }
  };

  const handleTypingStatus = (isTyping) => {
    if (!activeChat || !socket.current) return;
    if (isTyping) {
      socket.current.emit("typing", { chatId: activeChat._id });
    } else {
      socket.current.emit("stopTyping", { chatId: activeChat._id });
    }
  };

  return (
    <div className="w-[95%] max-w-6xl mx-auto h-[80vh] min-h-[500px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row mt-6 md:mt-10 mb-16">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        currentUser={currentUser}
      />
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
      />
    </div>
  );
};

export default Chat;