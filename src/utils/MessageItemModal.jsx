import React, { useRef } from "react";
import { Trash2, Reply, Pencil } from "lucide-react";

function MessageItemModal({
  msg,
  isOwnMessage,
  onDelete,
  setSelectedUpdate,
  setSelectedReply,
  setShowModal,
}) {
  const messageRef = useRef(null);

  return (
    <div
      ref={messageRef}
      className={`flex flex-col absolute z-50 p-4 rounded-xl shadow-xl backdrop-blur-md space-y-2 text-white ${
        isOwnMessage ? "-bottom-10 -left-48" : "top-0 -right-48"
      } bg-zinc-900 border border-white/10`}
    >
      {isOwnMessage && (
        <>
          <button
            onClick={() => onDelete(msg)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium  hover:bg-red-500 transition-all duration-200 shadow-md"
          >
            <Trash2 size={16} />
            Delete
          </button>

          <button
            onClick={() => {
              setSelectedReply(null);
              setSelectedUpdate(msg);
                setShowModal(false);
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-500 transition-all duration-200 shadow-md"
          >
            <Pencil size={16} />
            Update
          </button>
        </>
      )}

      <button
        onClick={() => {
          setSelectedUpdate(null);
          setSelectedReply(msg);
            setShowModal(false);
        }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-500 transition-all duration-200 shadow-md"
      >
        <Reply size={16} />
        Reply
      </button>
    </div>
  );
}

export default MessageItemModal;
