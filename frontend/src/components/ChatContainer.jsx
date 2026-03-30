import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { 
    messages, 
    getMessages, 
    isMessagesLoading, 
    selectedUser, 
    subscribeToMessages, 
    unsubscribeFromMessages 
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8F9FA] relative">
      {/* Header ko clean rakha hai */}
      <ChatHeader />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto z-10 px-4 py-6 space-y-6 custom-scrollbar">
        {/* Date Divider (Optional like in image) */}
        <div className="flex justify-center my-4">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            Today
          </span>
        </div>

        {messages.map((message) => {
          const isMe = message.senderId === authUser._id;
          
          return (
            <div key={message._id} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
              
              {/* Other User Avatar (Left side) */}
              {!isMe && (
                <div className="size-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                  <img 
                    src={selectedUser.profilePic || "/avatar.png"} 
                    alt="avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                <div 
                  className={`
                    px-4 py-2.5 shadow-sm relative text-[15px] leading-snug
                    ${isMe 
                      ? "bg-[#2563EB] text-white rounded-2xl rounded-tr-none" 
                      : "bg-white text-[#1F2937] rounded-2xl rounded-tl-none border border-gray-100"
                    }
                  `}
                >
                  {/* Media Support */}
                  {message.image && (
                    <img src={message.image} className="rounded-lg mb-2 max-h-64 w-full object-cover" alt="sent" />
                  )}
                  {message.video && (
                    <video controls className="rounded-lg mb-2 max-h-64 w-full">
                      <source src={message.video} type="video/mp4" />
                    </video>
                  )}

                  {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                </div>

                {/* Time & Status */}
                <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </span>
                  {isMe && (
                    <span className={`text-xs ${message.status === 'seen' ? 'text-blue-500' : 'text-gray-300'}`}>
                       {message.status === 'seen' ? "●" : "○"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area (Clean & Floating style) */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;