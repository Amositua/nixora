import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Loader,
  FileText,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function LoanDocumentChat({ loanId, loan, setCurrentScreen }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem(`loan_chat_${loanId}`);
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      // Add welcome message
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          content: `Hello! I'm your AI assistant for the ${
            loan?.loanData?.parties?.borrower || "loan document"
          }. Feel free to ask me anything about this document, such as interest rates, repayment terms, covenants, or any other details.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [loanId]);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`loan_chat_${loanId}`, JSON.stringify(messages));
    }
  }, [messages, loanId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://nixora-image-latest.onrender.com/api/loan-chat/chat/${loanId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userMessage.content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your question. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      localStorage.removeItem(`loan_chat_${loanId}`);
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          content: `Chat cleared! How can I help you with the ${
            loan?.loanData?.parties?.borrower || "loan document"
          }?`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const suggestedQuestions = [
    "What is the interest rate?",
    "What are the repayment terms?",
    "Are there any covenants?",
    "Who are the parties involved?",
    "What is the maturity date?",
  ];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen("portfolio")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Document Chat
                </h1>
                <p className="text-sm text-gray-500">
                  {loan?.loanData?.parties?.borrower || "Loan Document"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </Badge>
            <Button variant="outline" size="sm" onClick={clearChat}>
              Clear Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Document Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">
            <span className="font-medium">Document:</span>{" "}
            {loan?.documentName || "Loan Agreement"}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-700">
            <span className="font-medium">Facility:</span>{" "}
            {loan?.loanData?.facility?.facilityType || "N/A"}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-700">
            <span className="font-medium">Amount:</span>{" "}
            {loan?.loanData?.facility?.currency}{" "}
            {loan?.loanData?.facility?.facilityAmount || "N/A"}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-[70%] ${
                  message.role === "user" ? "order-first" : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : message.isError
                      ? "bg-red-50 text-red-900 border border-red-200"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 mt-1 px-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>

              {message.role === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions (show when chat is empty or at start) */}
      {messages.length <= 1 && !loading && (
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Suggested Questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question about this loan document..."
                disabled={loading}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
              {inputMessage.trim() && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {inputMessage.length}
                </span>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={!inputMessage.trim() || loading}
              className="px-6"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are generated based on the loan document content. Always
            verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}