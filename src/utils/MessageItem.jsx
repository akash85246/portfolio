import React, { useEffect, useRef } from "react";
import { DoneAll } from "@mui/icons-material";

const MessageItem = ({ msg, userId, user, socket }) => {
  const isOwnMessage = msg.user_id === userId;
  const messageRef = useRef();

  useEffect(() => {
    if (isOwnMessage || msg.status == "read") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Emit mark_as_read to server
          socket.emit("mark_as_read", { message_id: msg.id });
          observer.disconnect(); 
        }
      },
      { threshold: 0.6 }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [msg, isOwnMessage, socket]);

  return (
    <div
      ref={messageRef}
      key={msg.id}
      className={`flex items-end gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      {!isOwnMessage && (
        <img
          src={msg.sender_profile_picture || "/default-avatar.png"}
          alt="avatar"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
        />
      )}

      <div className="flex flex-col items-start">
        <div
          className={`rounded-lg px-4 py-2 max-w-40  sm:max-w-[35rem] text-[0.6rem] sm:text-sm relative break-words ${
            isOwnMessage ? "bg-blue-600/25 text-white" : "bg-black/10 text-white"
          }`}
        >
          {msg.file_url ? (
            <>
            <img src={msg.file_url} 
                alt="attachment"
                className="w-auto max-w-full max-h-[150px]  sm:max-h-[200px] rounded-lg mb-2 object-contain"
            />
              <a
                href={msg.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                Photo
              </a>
              <span className="block text-gray-400 text-[0.6rem] mt-1">
                {msg.content}
              </span>
            </>
          ) : (
            msg.content
          )}

          {isOwnMessage && (
            <DoneAll
              fontSize="small"
              className={`absolute bottom-1 right-1 ${
                msg.status == "read" ? "text-green-600" : "text-gray-400"
              }`}
            />
          )}
        </div>
        <span className="text-[6px] sm:text-[10px] mt-1 text-gray-400">
          {new Date(msg.created_at).toLocaleTimeString()}
        </span>
      </div>

      {isOwnMessage && (
        <img
          src={user?.profile_picture || "/default-avatar.png"}
          alt="avatar"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default MessageItem;