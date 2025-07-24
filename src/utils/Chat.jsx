import { use, useEffect, useRef, useState } from "react";
import {
  AttachFile,
  DoneAll,
  FiberManualRecord,
  Send,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import { login, logout } from "../redux/slices/authSlice";
import { setUser, clearUser } from "../redux/slices/userSlice";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const bottomRef = useRef();

  const user = useSelector((state) => state.user);
  const userId = user.id;

  const isAdmin = user.email === import.meta.env.VITE_ADMIN_GMAIL;
  const adminId = import.meta.env.VITE_ADMIN_ID;

  const [receiver_id, setreceiver_id] = useState(adminId);

  // Connect socket
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();

      socket.on("connect", () => {
        console.log("Connected with socket ID:", socket.id);
        socket.emit("user_connected", userId, receiver_id);
      });
    } else {
      socket.emit("user_connected", userId);
    }

    const handleReceiveMessage = (msg) => {
      console.log("Received message", msg);
      if (isAdmin && (msg.user_id !== receiver_id)) {
        // Message is for another user — increase their unread count
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.user_id]: (prev[msg.user_id] || 0) + 1,
        }));
      } else {
       
        console.log("Received message for current user:", msg);
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleMessageSent = (msg) => {
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    };

    const handleMessageDeleted = ({ message_id }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== message_id));
    };

    const handleMessageEdited = (updatedMsg) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMsg.id ? updatedMsg : msg))
      );
    };

    socket.on("online_users", (userList) => {
      setOnlineUsers(userList);

      setIsOnline(userList.includes(adminId));

      if (isAdmin) {

        socket.emit("get_all_users", (usersOrError) => {
          if (usersOrError?.error) {
            console.error("Error fetching users:", usersOrError.error);

            return;
          }

          setUsers(usersOrError); // Set state with fetched users

        });
      }
    });
    // Add listeners
    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_sent", handleMessageSent);
    socket.on("message_deleted", handleMessageDeleted);
    socket.on("message_edited", handleMessageEdited);

    // Cleanup
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_sent", handleMessageSent);
      socket.off("message_deleted", handleMessageDeleted);
      socket.off("message_edited", handleMessageEdited);
      socket.emit("user_disconnected", userId);
      socket.disconnect();
    };
  }, [userId, adminId, receiver_id, isAdmin]);

  useEffect(() => {
    if (!receiver_id || !userId) return;

  

    socket.emit("load_messages", {
      user_id: userId,
      receiver_id: receiver_id,
    });

    const handleLoadMessages = (messages) => {
      setMessages(messages);
    };

    // Always remove previous listener to avoid duplicates
    socket.off("load_messages");
    socket.on("load_messages", handleLoadMessages);

    return () => {
      socket.off("load_messages", handleLoadMessages);
    };
  }, [receiver_id, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input && !file) return;

    const contentToSend = input || (file ? "File sent" : "");

    const msg = {
      receiver_id: receiver_id,
      user_id: userId,
      content: contentToSend,
      file_url: file || null,
      profile_photo: user.profile_picture,
      created_at: new Date().toISOString(),
    };

    // Optimistically update UI
    setMessages((prev) => [...prev, msg]);

  

    // Emit to backend
    socket.emit("send_message", {
      receiver_id: receiver_id,
      user_id: userId,
      content: contentToSend,
      file_url: file || null,
      ipAddress: "N/A",
    });

    setInput("");
    setFile(null);
  };

const handleFileUpload = async (file) => {
  if (!file) return;
  setIsUploading(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
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

  return (
    <div
      className={`bg-white/5 col-span-2 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10 grid grid-cols-4 items-center justify-center gap-10 relative`}
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
                setreceiver_id(newReceiverId);
                if (receiver_id !== newReceiverId) {
                  setreceiver_id(newReceiverId);
                }
                console.log(newReceiverId, receiver_id, userId);
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
                  className="w-12 h-8 rounded-full object-cover"
                />
                {user.is_online && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                )}

                {unreadCounts[user.id] > 0 && (
                  <span
                    id={`new-message-${user.id}`}
                    className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white px-1 rounded-full"
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
        <div className="flex justify-between items-center">
          <div className="p-4 border-b border-gray-700 flex items-center gap-2">
            <FiberManualRecord
              className={isOnline ? "text-green-400" : "text-gray-400"}
            />
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
          </div>
          <button onClick={handleLogout}> Logout</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[50vh] min-h-[50vh] max-h-[60vh]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.user_id === userId ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user_id !== userId && (
                <img
                  src={msg.sender_profile_picture || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col items-start">
                <div
                  className={`rounded-lg px-4 py-2 max-w-[35rem] text-sm relative break-words ${
                    msg.user_id === userId
                      ? "bg-blue-600 text-white"
                      : "bg-black/10 text-white"
                  }`}
                >
                  {msg.file_url ? (
                    <>
                      <a
                        href={msg.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline"
                      >
                        Photo
                      </a>
                      <span className="block text-gray-400 text-xs mt-1">
                        {msg.content}
                      </span>
                    </>
                  ) : (
                    msg.content
                  )}
                  <DoneAll
                    fontSize="small"
                    className={`absolute bottom-1 right-1 text-gray-400`}
                  />
                </div>
                <span className="text-[10px] mt-1 text-gray-400">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              {msg.user_id === userId && (
                <img
                  src={user.profile_picture || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div>
          {!isUploading && file && (
            <div className="bg-green-100 text-green-800 p-2 rounded-lg mb-3 text-sm break-all">
              📎 File uploaded:{" "}
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-900"
              >
                {file}
              </a>
            </div>
          )}

          <div className="border-t border-gray-700 p-3 flex items-center gap-3">
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
                  className="cursor-pointer text-gray-400"
                >
                  <AttachFile />
                </label>
              </>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black/10 text-white py-2 px-4 rounded-full outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              disabled={isUploading}
              className={`p-2 aspect-[1/1] rounded-full transition 
    ${
      isUploading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-black/20 hover:bg-black/30"
    }
  `}
            >
              <Send className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
