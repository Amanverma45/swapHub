import { useState } from "react";
import { FaSearch, FaComments } from "react-icons/fa";

const ChatList = ({ chats, activeChat, onSelectChat, currentUser }) => {
  const [search, setSearch] = useState("");

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

  const filteredChats = chats.filter((chat) => {
    const otherUser = chat.users.find((u) => u._id !== currentUser?._id) || {};
    return (
      otherUser.name?.toLowerCase().includes(search.toLowerCase()) ||
      otherUser.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-full md:w-80 h-full border-r border-gray-100 flex flex-col bg-white shrink-0">
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-100 space-y-3 shrink-0">
        <div className="flex items-center gap-2 text-[#2E7D32]">
          <FaComments className="text-xl" />
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900">Conversations</h2>
        </div>

        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:bg-white focus-within:border-[#2E7D32] transition-colors">
          <FaSearch className="text-gray-400 text-xs mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-xs text-gray-700"
          />
        </div>
      </div>

      {/* Chat Room items list */}
      <div className="flex-grow overflow-y-auto divide-y divide-gray-50">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center h-48">
            <span className="text-2xl text-gray-300">💬</span>
            <p className="text-xs text-gray-400 mt-2 font-medium">No chats found.</p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const otherUser = chat.users.find((u) => u._id !== currentUser?._id) || { name: "Deleted User" };
            const lastMsg = chat.messages?.[chat.messages.length - 1];
            const isActive = activeChat?._id === chat._id;
            const { initials, gradient } = getInitialsAvatar(otherUser.name);

            return (
              <button
                key={chat._id}
                onClick={() => onSelectChat(chat)}
                className={`w-full text-left p-4 flex items-start gap-3 transition-colors hover:bg-gray-50/70 border-l-4 cursor-pointer ${
                  isActive
                    ? "bg-emerald-50/40 border-l-[#2E7D32]"
                    : "border-l-transparent bg-white"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold text-xs shadow-xs`}
                >
                  {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-1">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {otherUser.name}
                    </h3>
                    {lastMsg && (
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(lastMsg.createdAt || chat.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{otherUser.email}</p>
                  <p className="text-xs text-gray-500 font-semibold truncate mt-1.5 flex items-center gap-1">
                    {lastMsg ? (
                      <>
                        {lastMsg.sender === currentUser?._id && <span className="text-[#2E7D32]">You:</span>}
                        <span>{lastMsg.text}</span>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">No messages yet</span>
                    )}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;