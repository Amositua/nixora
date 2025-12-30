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
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  Calendar,
  PieChart,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";

export default function LoanReports({ setCurrentScreen }) {
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [maturityData, setMaturityData] = useState([]);
  const [highRiskLoans, setHighRiskLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const cachedData = localStorage.getItem(`reportData:${userId}`);

    if (cachedData) {
      const { portfolio, maturity, highRisk } = JSON.parse(cachedData);
      setPortfolioStats(portfolio);
      setMaturityData(maturity);
      setHighRiskLoans(highRisk);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = "https://nixora-image-latest.onrender.com/api/reports";

      // Fetch all reports in parallel
      const [portfolioRes, maturityRes, highRiskRes] = await Promise.all([
        fetch(`${baseUrl}/portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/maturity`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/high-risk`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!portfolioRes.ok || !maturityRes.ok || !highRiskRes.ok) {
        throw new Error("Failed to fetch reports");
      }

      const portfolio = await portfolioRes.json();
      const maturity = await maturityRes.json();
      const highRisk = await highRiskRes.json();

      setPortfolioStats(portfolio);
      setMaturityData(maturity);
      setHighRiskLoans(highRisk);

      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).userId : "guest";
      localStorage.setItem(
        `reportData:${userId}`,
        JSON.stringify({ portfolio, maturity, highRisk })
      );
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (reportType, format) => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = `https://nixora-image-latest.onrender.com/api/reports/export/${reportType}/${format}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Create blob and download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${reportType}-report.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      setError(`Export failed: ${err.message}`);
      console.error("Export error:", err);
    }
  };

  const ExportButtons = ({ reportType }) => (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport(reportType, "pdf")}
      >
        <FileText className="w-4 h-4 mr-1" />
        PDF
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport(reportType, "excel")}
      >
        <FileSpreadsheet className="w-4 h-4 mr-1" />
        Excel
      </Button>
    </div>
  );

  if (loading && !portfolioStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
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
            <FileText className="w-7 h-7 text-blue-600" />
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive insights into your loan portfolio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchAllReports}
            disabled={loading}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => setCurrentScreen("portfolio")}>
            Back
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "overview", label: "Portfolio Overview", icon: PieChart },
          { id: "maturity", label: "Maturity Analysis", icon: Calendar },
          { id: "high-risk", label: "High Risk Loans", icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Portfolio Overview Tab */}
      {activeTab === "overview" && portfolioStats && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 uppercase">
                      Total Loans
                    </p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      {portfolioStats.totalLoans}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 uppercase">
                      Avg Margin
                    </p>
                    <p className="text-3xl font-bold text-green-900 mt-2">
                      {portfolioStats.averageMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600 uppercase">
                      High Risk Loans
                    </p>
                    <p className="text-3xl font-bold text-red-900 mt-2">
                      {portfolioStats.highRiskLoans}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 uppercase">
                      Transferable
                    </p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                      {portfolioStats.transferableLoans}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Download className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Portfolio Summary</CardTitle>
                <ExportButtons reportType="portfolio" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Risk Distribution */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Risk Distribution
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Low Risk</span>
                        <span className="text-sm font-medium text-gray-900">
                          {portfolioStats.totalLoans -
                            portfolioStats.highRiskLoans}{" "}
                          loans
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${
                              ((portfolioStats.totalLoans -
                                portfolioStats.highRiskLoans) /
                                portfolioStats.totalLoans) *
                                100 || 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">High Risk</span>
                        <span className="text-sm font-medium text-gray-900">
                          {portfolioStats.highRiskLoans} loans
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{
                            width: `${
                              (portfolioStats.highRiskLoans /
                                portfolioStats.totalLoans) *
                                100 || 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transferability */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Transferability Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-2xl font-bold text-purple-900">
                        {portfolioStats.transferableLoans}
                      </p>
                      <p className="text-sm text-purple-600 mt-1">
                        Transferable Loans
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-2xl font-bold text-gray-900">
                        {portfolioStats.totalLoans -
                          portfolioStats.transferableLoans}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Non-Transferable
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Maturity Analysis Tab */}
      {activeTab === "maturity" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Loan Maturity Distribution</CardTitle>
                <ExportButtons reportType="maturity" />
              </div>
            </CardHeader>
            <CardContent>
              {maturityData.length > 0 ? (
                <div className="space-y-6">
                  {/* Bar Chart Visualization */}
                  <div className="space-y-4">
                    {maturityData.map((item) => (
                      <div key={item.year}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {item.year}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {item.loanCount} loans
                          </span>
                        </div>
                        <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center px-3 transition-all duration-500"
                            style={{
                              width: `${
                                (item.loanCount /
                                  Math.max(
                                    ...maturityData.map((d) => d.loanCount)
                                  )) *
                                100
                              }%`,
                            }}
                          >
                            <span className="text-xs font-medium text-white">
                              {item.loanCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {maturityData.length}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Maturity Years
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {maturityData.reduce(
                          (sum, item) => sum + item.loanCount,
                          0
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Total Loans</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.max(...maturityData.map((d) => d.loanCount))}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Peak Year Count
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No maturity data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* High Risk Loans Tab */}
      {activeTab === "high-risk" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>High Risk Loan Analysis</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Loans with elevated covenant or default counts
                  </p>
                </div>
                <ExportButtons reportType="high-risk" />
              </div>
            </CardHeader>
            <CardContent>
              {highRiskLoans.length > 0 ? (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-2xl font-bold text-red-900">
                        {highRiskLoans.length}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        High Risk Loans
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-2xl font-bold text-orange-900">
                        {highRiskLoans.reduce(
                          (sum, loan) => sum + loan.covenantCount,
                          0
                        )}
                      </p>
                      <p className="text-sm text-orange-600 mt-1">
                        Total Covenants
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-2xl font-bold text-yellow-900">
                        {highRiskLoans.reduce(
                          (sum, loan) => sum + loan.defaultCount,
                          0
                        )}
                      </p>
                      <p className="text-sm text-yellow-600 mt-1">
                        Total Defaults
                      </p>
                    </div>
                  </div>

                  {/* High Risk Loans Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Loan ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Covenant Count
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Default Count
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Risk Level
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {highRiskLoans.map((loan) => {
                          const totalRisk =
                            loan.covenantCount + loan.defaultCount;
                          const riskLevel =
                            totalRisk > 10
                              ? "Critical"
                              : totalRisk > 5
                              ? "High"
                              : "Medium";
                          const riskColor =
                            totalRisk > 10
                              ? "danger"
                              : totalRisk > 5
                              ? "warning"
                              : "info";

                          return (
                            <tr key={loan.loanId} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {loan.loanId.substring(0, 13)}...
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant={
                                    loan.covenantCount > 5 ? "warning" : "info"
                                  }
                                >
                                  {loan.covenantCount}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant={
                                    loan.defaultCount > 5 ? "danger" : "warning"
                                  }
                                >
                                  {loan.defaultCount}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant={riskColor}>{riskLevel}</Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No high risk loans found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your portfolio is in good standing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}