import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import {
  Edit2,
  FileText,
  Search,
  Users,
  RefreshCw,
} from "lucide-react";

export default function CollaborateAndEdit({ setCurrentScreen, setSelectedLoanId }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
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
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch loans:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLoan = (loanId) => {
    setSelectedLoanId(loanId);
    setCurrentScreen("edit-loan");
  };

  const filteredLoans = loans.filter((loan) => {
    const borrower = loan.loanData?.parties?.borrower?.toLowerCase() || "";
    const documentName = loan.documentName?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return borrower.includes(search) || documentName.includes(search);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading loan documents...</p>
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
            {/* <Users className="w-7 h-7 text-blue-600" /> */}
            Collaborate & Edit
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a loan document to view and edit
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* <Button
            variant="outline"
            onClick={fetchLoans}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button> */}
          <Button variant="outline" onClick={() => setCurrentScreen("portfolio")}>
            Back to Portfolio
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-800">
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

      {/* Statistics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {loans.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Edited Documents</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {loans.filter((l) => l.status === "EDITED").length}
                </p>
              </div>
              <Edit2 className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Extracted</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {loans.filter((l) => l.status === "TEXT_EXTRACTED").length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Loans Grid */}
      {filteredLoans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLoans.map((loan) => (
            <Card
              key={loan.loanId}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {loan.loanData?.parties?.borrower || "Unknown Borrower"}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {loan.documentName}
                      </p>
                    </div>
                    {/* <Badge
                      variant={
                        loan.status === "EDITED" ? "warning" : "success"
                      }
                    >
                      {loan.status === "EDITED" ? "Edited" : "Extracted"}
                    </Badge> */}
                  </div>

                  {/* Loan Details */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Facility Type</span>
                      <span className="font-medium text-gray-900 text-right line-clamp-1">
                        {loan.loanData?.facility?.facilityType || "N/A"}
                      </span>
                    </div>

                    {/* <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium text-gray-900">
                        {loan.loanData?.facility?.currency}{" "}
                        {loan.loanData?.facility?.facilityAmount || "N/A"}
                      </span>
                    </div> */}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Benchmark</span>
                      <Badge variant="info">
                        {loan.loanData?.interest?.benchmark || "N/A"}
                      </Badge>
                    </div>

                    <div className="flex items-start justify-between text-sm">
                      <span className="text-gray-600">Facility Agent</span>
                      <span className="font-medium text-gray-900 text-right line-clamp-2 max-w-[60%]">
                        {loan.loanData?.parties?.facilityAgent || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between text-sm">
                      <span className="text-gray-600">Lenders</span>
                      <span className="font-medium text-gray-900 text-right line-clamp-2 max-w-[60%]">
                        {loan.loanData?.parties?.lenders?.length > 0
                          ? loan.loanData.parties.lenders.join(", ")
                          : "N/A"}
                      </span>
                    </div>

                    {/* <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Margin</span>
                      <span className="font-medium text-gray-900 text-right">
                        {loan.loanData?.interest?.margin || "N/A"}
                      </span>
                    </div> */}
                  </div>

                  {/* Edit Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleEditLoan(loan.loanId)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              {searchTerm ? "No loans found matching your search" : "No loan documents available"}
            </p>
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