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
  ArrowLeft,
  Filter,
} from "lucide-react";

export default function LoanTimelineDetail({ loanId, setCurrentScreen }) {
  const [loan, setLoan] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all");

  console.log("Selected Loan ID in TimelineDetail:", loanId);
  console.log("Loan Data:", loan);
  console.log("Schedule Data:", schedule);

  useEffect(() => {
    if (!loanId) return;
    fetchLoanDetails();
    fetchSchedule();
  }, [loanId]);

  const fetchLoanDetails = async () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const cachedLoan = localStorage.getItem(`loanDocument:${userId}:${loanId}`);

    if (cachedLoan) {
      setLoan(JSON.parse(cachedLoan));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://nixora-image-latest.onrender.com/api/loans/documents/getLoan/${loanId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch loan details");

      const data = await res.json();
      setLoan(data);
      setLoading(false);
        const STORAGE_KEY = `loanDocument:${userId}:${loanId}`;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch loan details:", err);
    }
  };

  const fetchSchedule = async () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const cachedSchedule = localStorage.getItem(
      `loanSchedule:${userId}:${loanId}`
    );  
    if (cachedSchedule) {
      setSchedule(JSON.parse(cachedSchedule));
      return;
    }

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
        const STORAGE_KEY = `loanSchedule:${userId}:${loanId}`;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch schedule:", err);
    } finally {
      setLoading(false);
    }
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

  const getEventBadgeVariant = (type) => {
    switch (type) {
      case "INTEREST_PAYMENT":
        return "success";
      case "COVENANT_TEST":
        return "warning";
      case "MATURITY":
        return "info";
      default:
        return "secondary";
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

  const filteredSchedule = schedule.filter((event) => {
    if (filterType === "all") return true;
    return event.type === filterType;
  });

  const upcomingEvents = filteredSchedule.filter((event) =>
    isUpcoming(event.date)
  );
  const pastEvents = filteredSchedule.filter(
    (event) => !isUpcoming(event.date)
  );

  if (loading && !loan) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen("timeline")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              {/* <Calendar className="w-7 h-7 text-blue-600" /> */}
              Loan Schedule
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {loan?.loanData?.parties?.borrower}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setCurrentScreen("timeline")}>
          Back to Loans
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

      {loan && (
        <>
          {/* Loan Info Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Borrower
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {loan.loanData?.parties?.borrower || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Facility Type
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {loan.loanData?.facility?.facilityType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Benchmark
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {loan.loanData?.interest?.benchmark || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase mb-1">
                    Margin
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {loan.loanData?.interest?.margin || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Summary */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter by type:
                </span>
                <div className="flex gap-2 flex-wrap">
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
                  {upcomingEvents.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Upcoming Events
                      </h3>
                      <div className="relative border-l-2 border-blue-200 pl-8 space-y-6">
                        {upcomingEvents.map((event, index) => (
                          <div key={index} className="relative">
                            {/* Timeline Dot */}
                            <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>

                            {/* Event Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                                  {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1">
                                      <Badge
                                        variant={getEventBadgeVariant(
                                          event.type
                                        )}
                                      >
                                        {event.type.replace(/_/g, " ")}
                                      </Badge>
                                      <p className="text-sm font-medium text-gray-900 mt-2">
                                        {event.description}
                                      </p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                      {formatDate(event.date)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Events */}
                  {pastEvents.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Past Events
                      </h3>
                      <div className="relative border-l-2 border-gray-200 pl-8 space-y-6 opacity-60">
                        {pastEvents.map((event, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                  {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1">
                                      <Badge variant="secondary">
                                        {event.type.replace(/_/g, " ")}
                                      </Badge>
                                      <p className="text-sm font-medium text-gray-700 mt-2">
                                        {event.description}
                                      </p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                      {formatDate(event.date)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No schedule events found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {filterType !== "all"
                      ? "Try selecting a different filter"
                      : "This loan has no scheduled events"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
