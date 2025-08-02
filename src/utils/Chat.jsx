import { useEffect, useRef, useState } from "react";
import { DoneAll, FiberManualRecord, Send } from "@mui/icons-material";
import { X } from "lucide-react";
import PhotoIcon from "@mui/icons-material/Photo";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import { login, logout } from "../redux/slices/authSlice";
import { setUser, clearUser } from "../redux/slices/userSlice";

import MessageItem from "./MessageItem";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [users, setUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  // const hasMounted = useRef(false);

  const bottomRef = useRef();

  const user = useSelector((state) => state.user);
  const ipAddress = useSelector((state) => state.ipAddress.ipAddress);
  const userId = user.id;

  const isAdmin = user.email === import.meta.env.VITE_ADMIN_GMAIL;
  const adminId = import.meta.env.VITE_ADMIN_ID;

  const [receiver_id, setReceiver_id] = useState(isAdmin ? 2 : adminId);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("user_connected", userId, receiver_id);
      setIsOnline(true);
    };

    const handleDisconnect = () => {
      setIsOnline(false);
    };

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.emit("user_disconnected", userId);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, [userId, receiver_id]);

  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      if (isAdmin && msg.user_id !== receiver_id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.user_id]: (prev[msg.user_id] || 0) + 1,
        }));
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleMessageSent = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleMessageDeleted = ({ message_id }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== message_id));
    };

    const handleMessageEdited = (updatedMsg) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMsg.id ? updatedMsg : msg))
      );
    };

    const handleMessageReadAck = (msg) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
      );
      if (msg.user_id === userId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.receiver_id]: 0,
        }));
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_sent", handleMessageSent);
    socket.on("message_deleted", handleMessageDeleted);
    socket.on("message_edited", handleMessageEdited);
    socket.on("message_read_ack", handleMessageReadAck);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_sent", handleMessageSent);
      socket.off("message_deleted", handleMessageDeleted);
      socket.off("message_edited", handleMessageEdited);
      socket.off("message_read_ack", handleMessageReadAck);
    };
  }, [userId, receiver_id, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      socket.emit("get_all_users", (usersOrError) => {
        if (usersOrError?.error) {
          console.error("Error fetching users:", usersOrError.error);
          return;
        }

        const filteredUsers = usersOrError.filter((user) => {
          setUnreadCounts((prev) => ({
            ...prev,
            [user.id]: user.unread_count || 0,
          }));
          return user.id !== adminId;
        });

        setUsers(filteredUsers);
      });
    }
  }, [isAdmin, adminId]);

  useEffect(() => {
    if (!receiver_id || !userId) return;

    socket.emit("load_messages", {
      user_id: userId,
      receiver_id: receiver_id,
    });

    const handleLoadMessages = (messages) => {
      // console.log("Loaded messages:", messages);
      setMessages(messages);
    };

    // Always remove previous listener to avoid duplicates
    socket.off("load_messages");
    socket.on("load_messages", handleLoadMessages);

    return () => {
      socket.off("load_messages", handleLoadMessages);
    };
  }, [receiver_id, userId]);

  // useEffect(() => {
  //   console.log("Messages updated:", messages);
  //   if (!hasMounted.current) {
  //     hasMounted.current = true;
  //     return;
  //   }
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = () => {
    if (!input && !file) return;

    const contentToSend = input || (file ? "File sent" : "");
    console.log(selectedReply?.id, "Selected Reply ID");
    socket.emit("send_message", {
      receiver_id,
      user_id: userId,
      content: contentToSend,
      file_url: file || null,
      ipAddress: ipAddress || "N/A",
      response_to: selectedReply?.id || null,
    });

    // Reset input, file and reply state
    setInput("");
    setFile(null);
    setSelectedReply(null);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFile(data.secure_url);
      } else {
        console.error("Cloudinary returned an error:", data);
      }
    } catch (err) {
      console.error("File upload error:", err);
    }

    setIsUploading(false);
  };

  // Handle logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
  };

  async function updateMessage() {
    if (!selectedUpdate || (!input && !file)) return;

    socket.emit("edit_message", {
      message_id: selectedUpdate.id,
      new_content: input || null,
      new_file_url: file || null,
    });

    setSelectedUpdate(null);
    setInput("");
    setFile(null);
  }

  useEffect(() => {
    if (selectedUpdate) {
      setInput(selectedUpdate.content);
    }
  }, [selectedUpdate]);

  return (
    <div
      className={`bg-white/5 col-span-7 md:col-span-2  backdrop-blur-md p-4 md:p-4 lg:p-8 rounded-2xl shadow-xl border border-white/10 grid grid-cols-4 items-center justify-center gap-10 relative`}
    >
      {isAdmin && (
        <div className=" min-h-full pr-2 border-r border-gray-700 hidden sm:block">
          <div className="text-xl font-bold mb-4">Users</div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 my-1 rounded cursor-pointer overflow-hidden "
              onClick={() => {
                const newReceiverId = user.id === userId ? adminId : user.id;
                setReceiver_id(newReceiverId);
                if (receiver_id !== newReceiverId) {
                  setReceiver_id(newReceiverId);
                }
                // console.log(newReceiverId, receiver_id, userId);
                setUnreadCounts((prev) => ({
                  ...prev,
                  [user.id]: 0,
                }));
              }}
            >
              <div className="relative">
                <img
                  src={user.profile_picture || "/default-avatar.png"}
                  alt="avatar"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                )}

                {unreadCounts[user.id] > 0 && (
                  <span
                    id={`new-message-${user.id}`}
                    className="absolute -top-1 -right-1 text-[6px]  sm:text-[10px] bg-red-500 text-white px-1 rounded-full"
                  >
                    +{unreadCounts[user.id]}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user.username}
                </p>
                <p className="user-email text-gray-400 truncate w-40 sm:w-48 md:w-56">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`flex flex-col flex-1 ${
          isAdmin ? "col-span-3" : "col-span-4"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700">
          <div className="p-4  flex items-center gap-2">
            <FiberManualRecord
              className={isOnline ? "text-green-400" : "text-gray-400"}
            />
            <span className="text-sm">
              {isOnline ? "Online" : "Connecting..."}
            </span>
          </div>
          <button onClick={handleLogout} aria-label="logout">
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3   min-h-[35vh] max-h-[40vh]  sm:min-h-[30rem] sm:max-h-[35rem]">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              msg={msg}
              userId={userId}
              receiver_id={receiver_id}
              isAdmin={isAdmin}
              user={user}
              socket={socket}
              selectedReply={selectedReply}
              setSelectedReply={setSelectedReply}
              setSelectedUpdate={setSelectedUpdate}
              selectedUpdate={selectedUpdate}
              setMessages={setMessages}
              isOwnMessage={msg.user_id === userId}
              allMessages={messages}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="w-full">
          {/* Image/File Preview Before Sending */}
          {((!isUploading && selectedUpdate?.file_url) ||
            (!isUploading && file)) && (
            <div className="relative bg-black/20 p-3 rounded-lg mb-3 text-sm text-white border border-gray-600">
              {/* Close Button */}
              <button
                onClick={() => setFile(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                aria-label="Remove File"
              >
                <X
                  className="w-4 h-4"
                  onClick={() => {
                    setFile(null);
                    setSelectedUpdate(null);
                    setInput("");
                  }}
                />
              </button>

              <div className="flex items-start gap-3">
                <img
                  src={selectedUpdate ? selectedUpdate.file_url : file}
                  alt="preview"
                  className="max-w-[120px] max-h-[120px] object-contain rounded-md border border-gray-500"
                />
                <div className="flex flex-col justify-between">
                  <p className="mb-1 break-all text-[0.8rem] sm:text-xs text-gray-300">
                    📎 Image ready to send:
                  </p>
                  <a
                    href={selectedUpdate ? selectedUpdate.file_url : file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-all text-[0.8rem] sm:text-xs"
                  >
                    {selectedUpdate ? selectedUpdate.file_url : file}
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedReply && (
            <div className="relative bg-black/30 border border-gray-700 text-white rounded-lg p-3 mb-3 shadow-sm backdrop-blur-md">
              {/* Close Button */}
              <button
                onClick={() => setSelectedReply(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-3 items-start">
                {/* Image/File Preview */}
                {selectedReply.file_url && (
                  <img
                    src={selectedReply.file_url}
                    alt="Attachment"
                    className="max-w-[100px] max-h-[100px] object-contain rounded-md border border-gray-600"
                  />
                )}

                {/* Text & Timestamp */}
                <div className="flex-1">
                  <p className="text-sm text-gray-300 break-words mb-1">
                    {selectedReply.content || "No message content"}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedReply.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Chat Input Area */}
          <div className="border-t border-gray-700 p-2 sm:p-3 flex items-center gap-2 sm:gap-3 bg-black/10 rounded-lg">
            {!isUploading && (
              <>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg, .png, .gif, .webp"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-400 hover:text-white"
                >
                  <PhotoIcon />
                </label>
              </>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-white p-2 sm:py-2 sm:px-4 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-[0.8rem] w-[100%] sm:text-base"
              placeholder="Type a message..."
            />

            <button
              onClick={() => {
                selectedUpdate ? updateMessage() : sendMessage();
              }}
              disabled={isUploading}
              className={`p-1 sm:p-2 aspect-square rounded-full transition 
        ${
          isUploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
              aria-label="Send Message"
            >
              <Send className="text-white text-[0.8rem] sm:text-base" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
