import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import {
  GitCompare,
  Award,
  TrendingUp,
  Shield,
  Calendar,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";

export default function LoanComparison({ setCurrentScreen }) {
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [availableLoans, setAvailableLoans] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [availableLoansLoading, setAvailableLoansLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoanSelector, setShowLoanSelector] = useState(false);

  // Fetch available loans on mount
  useEffect(() => {
    fetchAvailableLoans();
  }, []);

  const fetchAvailableLoans = async () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const cachedLoans = localStorage.getItem(`loanDocuments_compare:${userId}`);

    if (cachedLoans) {
      setAvailableLoans(JSON.parse(cachedLoans));
      setAvailableLoansLoading(false);
      return;
    }
    setAvailableLoansLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://nixora-image-latest.onrender.com/api/loans/documents/getAllLoan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetch loans response:", res);
      const data = await res.json();
      console.log("Available loans data:", data);
      setAvailableLoans(data || []);

      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).userId : "guest";
      const STORAGE_KEY = `loanDocuments_compare:${userId}`;
      // console.log("Storing recent uploads under key:", STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setAvailableLoansLoading(false);
    } catch (err) {
      console.error("Failed to fetch loans", err);
    }
  };

  const handleAddLoan = (loanId) => {
    // if (selectedLoans.length >= 3) {
    //   setError("You can compare up to 3 loans at a time");
    //   return;
    // }
    if (!selectedLoans.includes(loanId)) {
      setSelectedLoans([...selectedLoans, loanId]);
      setShowLoanSelector(false);
    }
  };

  const handleRemoveLoan = (loanId) => {
    setSelectedLoans(selectedLoans.filter((id) => id !== loanId));
    setComparisonData(null);
  };

  const runComparison = async () => {
    if (selectedLoans.length < 2) {
      setError("Please select at least 2 loans to compare");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://nixora-image-latest.onrender.com/api/loans/compare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ loanIds: selectedLoans }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to compare loans");
      }

      const data = await res.json();
      setComparisonData(data);
      console.log("Comparison data:", data);
    } catch (err) {
      setError(err.message);
      console.error("Comparison failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWinnerInfo = (field) => {
    if (!comparisonData?.comparison) return null;

    const fieldMap = {
      margin: "bestMargin",
      transferRestrictions: "mostTransferable",
      maturity: "longestMaturity",
      defaultCount: "mostLenderFriendly",
    };

    const winnerId = comparisonData.comparison[fieldMap[field]];
    return winnerId;
  };

  const isWinner = (loanId, field) => {
    return getWinnerInfo(field) === loanId;
  };

   const getLoanDetails = (loanId) => {
    if (!loanId) return null;
    return comparisonData?.loans?.find(loan => loan.loanId === loanId);
  };

  const getAvailableLoanInfo = (loanId) => {
    if (!loanId) return null;
    return availableLoans.find(loan => loan.loanId === loanId);
  };

  const getDisplayName = (loanId) => {
    if (!loanId) return "N/A";
    
    // First try to get from available loans (has borrower info)
    const availableLoan = getAvailableLoanInfo(loanId);
    if (availableLoan?.loanData?.parties?.borrower) {
      return availableLoan.loanData.parties.borrower;
    }
    
    // Fallback to showing truncated ID
    return loanId.substring(0, 8) + "...";
  };


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <GitCompare className="w-7 h-7 text-blue-600" />
            Loan Comparison
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Compare up to 3 loans side-by-side to make informed decisions
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
                <X className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan Selection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Select Loans to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Selected Loans */}
            <div className="flex flex-wrap gap-3">
              {selectedLoans.map((loanId) => {
                const loan = availableLoans.find((l) => l.loanId === loanId);
                return (
                  <div
                    key={loanId}
                    className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2"
                  >
                    <span className="text-sm font-medium text-blue-900">
                      {loan?.loanData?.parties?.borrower ||
                        loanId.substring(0, 8)}
                    </span>
                    <button
                      onClick={() => handleRemoveLoan(loanId)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Add Loan Button */}
              {/* {selectedLoans.length < 3 && ( */}
              <button
                onClick={() => {
                  setShowLoanSelector(!showLoanSelector);
                  // fetchAvailableLoans();
                }}
                className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-4 py-2 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">
                  Add Loan
                </span>
              </button>
              {/* //   )} */}
            </div>

            {/* Loan Selector Dropdown */}
            {availableLoansLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : (
              showLoanSelector && (
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-4">
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {availableLoans
                        .filter((loan) => !selectedLoans.includes(loan.loanId))
                        .map((loan) => (
                          <button
                            key={loan.loanId}
                            onClick={() => handleAddLoan(loan.loanId)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {loan.loanData.parties.borrower ||
                                "Unknown Borrower"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {loan.loanData.facility.facilityType} •{" "}
                              {loan.loanData.interest.benchmark}
                            </div>
                          </button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )
            )}

            {/* Compare Button */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={runComparison}
                disabled={selectedLoans.length < 2 || loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Comparing...
                  </>
                ) : (
                  <>
                    <GitCompare className="w-4 h-4 mr-2" />
                    Compare Loans
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparisonData && (
        <>
          {/* Winner Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-green-600 uppercase">
                      Best Margin
                    </p>
                    <p className="text-sm font-semibold text-green-900 mt-1">
                     {getDisplayName(comparisonData.comparison.bestMargin)}
                    </p>
                    {comparisonData.comparison.bestMargin && (
                      <p className="text-xs text-green-700 mt-0.5">
                        {getLoanDetails(comparisonData.comparison.bestMargin)?.margin}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-blue-600 uppercase">
                      Most Transferable
                    </p>
                    <p className="text-sm font-semibold text-blue-900 mt-1">
                      {getDisplayName(comparisonData.comparison.mostTransferable)}
                    </p>
                    {comparisonData.comparison.mostTransferable && (
                      <p className="text-xs text-blue-700 mt-0.5">
                        {getLoanDetails(comparisonData.comparison.mostTransferable)?.transferRestrictions || "null"}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-purple-600 uppercase">
                      Most Lender Friendly
                    </p>
                    <p className="text-sm font-semibold text-purple-900 mt-1">
                      {getDisplayName(comparisonData.comparison.mostLenderFriendly)}
                    </p>
                    {comparisonData.comparison.mostLenderFriendly && (
                      <p className="text-xs text-purple-700 mt-0.5">
                        {getLoanDetails(comparisonData.comparison.mostLenderFriendly)?.defaultCount} default events
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-orange-600 uppercase">
                      Longest Maturity
                    </p>
                    <p className="text-sm font-semibold text-orange-900 mt-1">
                      {comparisonData.comparison.longestMaturity 
                        ? getDisplayName(comparisonData.comparison.longestMaturity)
                        : "N/A"}
                    </p>
                    {comparisonData.comparison.longestMaturity && (
                      <p className="text-xs text-orange-700 mt-0.5">
                        {getLoanDetails(comparisonData.comparison.longestMaturity)?.maturity || 
                         `${getLoanDetails(comparisonData.comparison.longestMaturity)?.tenorMonths} months`}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50">
                        Metric
                      </th>
                      {comparisonData.loans.map((loan, index) => (
                        <th
                          key={loan.loanId}
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Loan {index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {/* Loan ID */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Loan ID
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td
                          key={loan.loanId}
                          className="px-6 py-4 text-sm text-gray-600"
                        >
                          {loan.loanId.substring(0, 13)}...
                        </td>
                      ))}
                    </tr>

                    {/* Margin */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Margin
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {loan.margin || "N/A"}
                            </span>
                            {isWinner(loan.loanId, "margin") && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Benchmark */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Benchmark
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4">
                          <Badge variant="info">
                            {loan.benchmark || "N/A"}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Maturity */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Maturity
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {loan.maturity || "Not specified"}
                            </span>
                            {isWinner(loan.loanId, "maturity") && (
                              <CheckCircle2 className="w-4 h-4 text-orange-600" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Tenor */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Tenor (Months)
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td
                          key={loan.loanId}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          {loan.tenorMonths || "N/A"}
                        </td>
                      ))}
                    </tr>

                    {/* Prepayment */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Prepayment Allowed
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td
                          key={loan.loanId}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          {loan.prepaymentAllowed === null
                            ? "Not specified"
                            : loan.prepaymentAllowed
                            ? "Yes"
                            : "No"}
                        </td>
                      ))}
                    </tr>

                    {/* Transfer Restrictions */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Transfer Restrictions
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {loan.transferRestrictions || "Not specified"}
                            </span>
                            {isWinner(loan.loanId, "transferRestrictions") && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Covenant Count */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Covenant Count
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4">
                          <Badge
                            variant={
                              loan.covenantCount > 0 ? "warning" : "success"
                            }
                          >
                            {loan.covenantCount}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Default Count */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Default Events
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td key={loan.loanId} className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                loan.defaultCount > 0 ? "danger" : "success"
                              }
                            >
                              {loan.defaultCount}
                            </Badge>
                            {isWinner(loan.loanId, "defaultCount") && (
                              <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Governing Law */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Governing Law
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td
                          key={loan.loanId}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          {loan.governingLaw || "Not specified"}
                        </td>
                      ))}
                    </tr>

                    {/* Utilisation Date */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 sticky left-0 bg-white">
                        Utilisation Date
                      </td>
                      {comparisonData.loans.map((loan) => (
                        <td
                          key={loan.loanId}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          {loan.utilisationDate || "Not specified"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
