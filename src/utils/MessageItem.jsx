import React, { useEffect, useRef, useState } from "react";
import { CheckCheck } from "lucide-react";
import MessageItemModal from "./MessageItemModal";

const MessageItem = ({
  msg,
  userId,
  user,
  socket,
  selectedReply,
  setSelectedReply,
  allMessages,
  setSelectedUpdate,
  selectedUpdate,
  setMessages,
}) => {
  const isOwnMessage = msg.user_id === userId;
  const messageRef = useRef();
  const modalRef = useRef();
  const wrapperRef = useRef();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (isOwnMessage || msg.status === "read") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          socket.emit("mark_as_read", { message_id: msg.id });
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => observer.disconnect();
  }, [msg, isOwnMessage, socket]);

  // Auto-close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const repliedMessage =
    msg.response_to && allMessages
      ? allMessages.find((m) => m.id === msg.response_to)
      : null;

  async function onDelete(message) {
    if (window.confirm("Are you sure you want to delete this message?")) {
      socket.emit("delete_message", { message_id: message.id });

      // Remove message locally
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    }
  }
  return (
    <div
      ref={wrapperRef}
      className={`flex items-end gap-2 relative ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && (
        <img
          src={msg.sender_profile_picture || "/default-avatar.png"}
          alt="avatar"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
        />
      )}

      <div className="flex flex-col items-start relative">
        {repliedMessage && (
          <div className="bg-white/10 text-gray-300 text-xs px-2 py-1 mb-1 rounded border-l-4 border-blue-400">
            <div className="font-semibold">
              {repliedMessage.user_id === userId
                ? "You"
                : repliedMessage.sender_name || ""}
            </div>
            <div className="truncate  max-w-40 sm:max-w-[35rem] text-[0.6rem] sm:text-sm relative break-words text-gray-400 text-xs">
              {repliedMessage.file_url ? (
                <img
                  src={repliedMessage.file_url}
                  className="w-auto max-w-full max-h-[150px] sm:max-h-[200px] rounded-lg mb-2 object-contain"
                  alt="attachment"
                />
              ) : (
                repliedMessage.content
              )}
            </div>
          </div>
        )}
        <div
          ref={messageRef}
          onClick={() => setShowModal((prev) => !prev)}
          className={`rounded-lg px-4 py-2 max-w-40 sm:max-w-[35rem] text-[0.6rem] sm:text-sm relative break-words cursor-pointer ${
            isOwnMessage
              ? "bg-blue-600/25 text-white"
              : "bg-black/10 text-white"
          }`}
        >
          {msg.file_url ? (
            <>
              <img
                src={msg.file_url}
                alt="attachment"
                className="w-auto max-w-full max-h-[150px] sm:max-h-[200px] rounded-lg mb-2 object-contain"
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
            <CheckCheck
              className={`absolute bottom-1 right-1 ${
                msg.status === "read" ? "text-green-600" : "text-gray-400"
              } w-3 h-3 sm:w-4 sm:h-4`}
            />
          )}
        </div>
        <div className="text-[6px] sm:text-[10px] mt-1 text-gray-400 w-full flex justify-end">
          {!msg.is_updated && (
            <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
          )}

          {msg.is_updated && (
            <span className="text-[6px] sm:text-[10px] mt-1 text-gray-400">
              {" "}
              *{new Date(msg.updated_at).toLocaleTimeString()}
            </span>
          )}
        </div>
        {showModal && (
          <div ref={modalRef}>
            <MessageItemModal
              msg={msg}
              isOwnMessage={isOwnMessage}
              socket={socket}
              selectedReply={selectedReply}
              setSelectedReply={setSelectedReply}
              onClose={() => setShowModal(false)}
              selectedUpdate={selectedUpdate}
              setSelectedUpdate={setSelectedUpdate}
              onDelete={onDelete}
              setShowModal={setShowModal}
            />
          </div>
        )}
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
