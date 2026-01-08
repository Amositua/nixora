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
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  ArrowLeft,
  Filter,
  Search,
} from "lucide-react";

export default function LoanTimeline({ setCurrentScreen }) {
  const [view, setView] = useState("list"); // 'list' or 'timeline'
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  const fetchSchedule = async (loanId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://nixora-image-latest.onrender.com/api/loans/${loanId}/schedule`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch schedule");

      const data = await res.json();
      setSchedule(data || []);
      setView("timeline");
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
    fetchSchedule(loan.loanId);
  };

  const handleBack = () => {
    setView("list");
    setSelectedLoan(null);
    setSchedule([]);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "INTEREST_PAYMENT":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "COVENANT_TEST":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case "MATURITY":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "INTEREST_PAYMENT":
        return "green";
      case "COVENANT_TEST":
        return "orange";
      case "MATURITY":
        return "blue";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const filteredLoans = loans.filter((loan) => {
    const searchMatch =
      loan.loanData?.parties?.borrower
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      loan.documentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });

  const filteredSchedule = schedule.filter((event) => {
    if (filterType === "all") return true;
    return event.type === filterType;
  });

  const upcomingEvents = schedule.filter((event) => isUpcoming(event.date));
  const pastEvents = schedule.filter((event) => !isUpcoming(event.date));

  if (loading && loans.length === 0) {
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
            {view === "timeline" && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <Calendar className="w-7 h-7 text-blue-600" />
            {view === "list" ? "Loan Timelines" : "Loan Schedule"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {view === "list"
              ? "Select a loan to view its payment and event schedule"
              : `Timeline for ${
                  selectedLoan?.loanData?.parties?.borrower || "Selected Loan"
                }`}
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

      {/* Loan List View */}
      {view === "list" && (
        <div className="space-y-6">
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
              <Card
                key={loan.loanId}
                className="hover:shadow-lg transition-shadow "
              >
                <CardContent className="h-full flex flex-col">
                  <div className="flex flex-col h-full">
                    {/* Loan Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {loan.loanData?.parties?.borrower ||
                            "Unknown Borrower"}
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
                          handleLoanClick(loan);
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

          {filteredLoans.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No loans found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your search criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Timeline View */}
      {view === "timeline" && selectedLoan && (
        <div className="space-y-6">
          {/* Loan Info Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Borrower
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {selectedLoan.loanData?.parties?.borrower}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Facility Type
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {selectedLoan.loanData?.facility?.facilityType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Interest Rate
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {selectedLoan.loanData?.interest?.benchmark}{" "}
                    {selectedLoan.loanData?.interest?.margin &&
                      `+ ${selectedLoan.loanData.interest.margin}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Summary
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {schedule.length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">
                      {upcomingEvents.length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interest Payments</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">
                      {
                        schedule.filter((e) => e.type === "INTEREST_PAYMENT")
                          .length
                      }
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Covenant Tests</p>
                    <p className="text-2xl font-bold text-orange-900 mt-1">
                      {
                        schedule.filter((e) => e.type === "COVENANT_TEST")
                          .length
                      }
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div> */}

          {/* Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter by type:
                </span>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All Events" },
                    { value: "INTEREST_PAYMENT", label: "Interest" },
                    { value: "COVENANT_TEST", label: "Covenants" },
                    { value: "MATURITY", label: "Maturity" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setFilterType(filter.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        filterType === filter.value
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSchedule.length > 0 ? (
                <div className="space-y-8">
                  {/* Upcoming Events */}
                  {filteredSchedule.filter((e) => isUpcoming(e.date)).length >
                    0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Upcoming Events
                      </h3>
                      <div className="relative border-l-2 border-blue-200 pl-8 space-y-6">
                        {filteredSchedule
                          .filter((event) => isUpcoming(event.date))
                          .map((event, index) => {
                            const color = getEventColor(event.type);
                            return (
                              <div key={index} className="relative">
                                {/* Timeline Dot */}
                                <div
                                  className={`absolute -left-10 top-0 w-4 h-4 rounded-full bg-${color}-500 border-4 border-white`}
                                ></div>

                                {/* Event Card */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                  <div className="flex items-start gap-4">
                                    <div
                                      className={`p-2 bg-${color}-50 rounded-lg`}
                                    >
                                      {getEventIcon(event.type)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <Badge
                                            variant={
                                              color === "green"
                                                ? "success"
                                                : color === "orange"
                                                ? "warning"
                                                : "info"
                                            }
                                          >
                                            {event.type.replace(/_/g, " ")}
                                          </Badge>
                                          <p className="text-sm font-medium text-gray-900 mt-2">
                                            {event.description}
                                          </p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">
                                          {formatDate(event.date)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Past Events */}
                  {filteredSchedule.filter((e) => !isUpcoming(e.date)).length >
                    0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Past Events
                      </h3>
                      <div className="relative border-l-2 border-gray-200 pl-8 space-y-6 opacity-60">
                        {filteredSchedule
                          .filter((event) => !isUpcoming(event.date))
                          .map((event, index) => {
                            const color = getEventColor(event.type);
                            return (
                              <div key={index} className="relative">
                                <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                      {getEventIcon(event.type)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <Badge variant="secondary">
                                            {event.type.replace(/_/g, " ")}
                                          </Badge>
                                          <p className="text-sm font-medium text-gray-700 mt-2">
                                            {event.description}
                                          </p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">
                                          {formatDate(event.date)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No schedule events found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    This loan has no scheduled events
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
