import { create } from "zustand";

// Creating the Zustand store
const useConversation = create((set) => ({
  // State: holds the selected conversation
  selectedConversation: null,

  // Action: Updates the selected conversation
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  // State: holds the array of messages
  messages: [],

  // Action: Updates the messages array
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;