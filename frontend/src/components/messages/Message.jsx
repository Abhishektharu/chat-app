import useConversation from "../../zustand/useConversation";
import { UseAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { useState } from "react";
import { translateMessage } from "../../utils/translationUtils";

const Message = ({ message }) => {
  const { authUser } = UseAuthContext();
  const { selectedConversation } = useConversation();
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe ? "" : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const translated = await translateMessage(message.message);
      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation error:", error.message);
      setTranslatedText("Translation failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="" src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
          {translatedText || message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
          {!translatedText && !fromMe && (
            <button
              onClick={handleTranslate}
              className="text-blue-500 hover:underline text-xs ml-2"
              disabled={isTranslating}
            >
              {isTranslating ? "Translating..." : "Translate"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
