import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Calendar, AlertCircle, FileText, Search } from "lucide-react";

export default function LoanList({ setCurrentScreen, setSelectedLoanId }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const cachedLoans = localStorage.getItem(`loanDocuments_timeline:${userId}`);

    if (cachedLoans) {
      setLoans(JSON.parse(cachedLoans));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://nixora-image-latest.onrender.com/api/loans/documents/getAllLoan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch loans");

      const data = await res.json();
      setLoans(data || []);
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).userId : "guest";
        const STORAGE_KEY = `loanDocuments_timeline:${userId}`;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch loans:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleViewSchedule = (loanId) => {
    setSelectedLoanId(loanId);
    setCurrentScreen("timeline-detail");
  };
  console.log("Loans fetched:", loans);

  const filteredLoans = loans.filter((loan) => {
    const searchMatch =
      loan.loanData?.parties?.borrower
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      loan.documentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });
  console.log("Filtered Loans:", filteredLoans);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <Calendar className="w-7 h-7 text-blue-600" /> */}
            Loan Timelines
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a loan to view its payment and event schedule
          </p>
        </div>
        <Button variant="outline" onClick={() => setCurrentScreen("portfolio")}>
          Back to Portfolio
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by borrower or document name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLoans.map((loan) => (
          <Card key={loan.loanId} className="hover:shadow-lg transition-shadow">
            {console.log("Rendering loan:", loan.loanId)}
            <CardContent className="h-full flex flex-col">
              <div className="flex flex-col h-full">
                {/* Loan Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {loan.loanData?.parties?.borrower || "Unknown Borrower"}
                    </h3>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Facility Type</span>
                    <span className="font-medium text-gray-900">
                      {loan.loanData?.facility?.facilityType || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Benchmark</span>
                    <Badge variant="info">
                      {loan.loanData?.interest?.benchmark || "N/A"}
                    </Badge>
                  </div>
                </div>

                {/* Button pinned */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewSchedule(loan.loanId);
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLoans.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No loans found</p>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Upload loan documents to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
