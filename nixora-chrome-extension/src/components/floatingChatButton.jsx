
// ============================================
// 1. FLOATING CHAT BUTTON (Add to LoanDetails or Portfolio)
// ============================================

import { MessageSquare } from "lucide-react";

export function FloatingChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
      title="Chat with AI about this document"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
}