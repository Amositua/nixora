import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
// import Modal from "../components/ui/Modal"; // assume you have a modal component

export default function LoanDetails({ loanId, setCurrentScreen }) {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [traceData, setTraceData] = useState(null);
  const [traceField, setTraceField] = useState("");
  const [showTraceModal, setShowTraceModal] = useState(false);

  useEffect(() => {
    if (!loanId) return;

    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const CACHE_KEY = `loanDetail:${userId}:${loanId}`;

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setLoan(JSON.parse(cached));
      setLoading(false);
    }

    const fetchLoan = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(
          `https://nixora-image-latest.onrender.com/api/loans/documents/getLoan/${loanId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setLoan(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error("Failed to fetch loan", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId]);

  const fetchTrace = async (loanId, fieldPath) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://nixora-image-latest.onrender.com/api/loans/trace/${loanId}/${fieldPath}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch trace");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleTraceClick = async (fieldPath, label) => {
    const trace = await fetchTrace(loanId, fieldPath);
    if (trace) {
      setTraceData(trace);
      setTraceField(label);
      setShowTraceModal(true);
    }
  };

  if (loading && !loan)
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );

  if (!loan) return <p className="p-6">Loan not found</p>;

  const parties = loan.loanData?.parties || {};
  const facility = loan.loanData?.facility || {};
  const pricing = loan.loanData?.interestPricing || {};

  const fields = [
    { label: "Borrower", value: parties.borrower, path: "loanData.parties.borrower.value" },
    { label: "Lender", value: parties.lenders[0], path: "loanData.parties.lenders[0].value" },
    { label: "Facility Agent", value: parties.facilityAgent, path: "loanData.parties.facilityAgent.value" },
    { label: "Arranger", value: parties.arranger, path: "loanData.parties.arranger.value" },
    { label: "Guarantor", value: parties.guarantor, path: "loanData.parties.guarantor.value" },
    { label: "Facility Type", value: facility.facilityType, path: "loanData.facilityDetails.facilityType.value" },
    { label: "Currency", value: facility.currency, path: "loanData.facilityDetails.currency.value" },
    { label: "Benchmark", value: pricing.benchmark, path: "loanData.interestPricing.benchmark.value" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Loan Document</h1>
        <Button variant="outline" onClick={() => setCurrentScreen("portfolio")}>
          Back
        </Button>
      </div>

      <Card className="p-6 space-y-4">
        {fields.map(({ label, value, path }) => (
          <Detail
            key={label}
            label={label}
            value={value}
            onTrace={() => handleTraceClick(path, label)}
          />
        ))}

        <Badge variant="success">{loan.status}</Badge>
      </Card>

      {showTraceModal && traceData && (
        <Modal onClose={() => setShowTraceModal(false)}>
          <h2 className="text-lg font-semibold mb-2">{traceField} Trace</h2>
          <p>
            <span className="font-medium">Value:</span> {traceData.value || "-"}
          </p>
          <p>
            <span className="font-medium">Page:</span> {traceData.source?.page ?? "-"}
          </p>
          <p>
            <span className="font-medium">Clause:</span> {traceData.source?.clause || "-"}
          </p>
          <p>
            <span className="font-medium">Snippet:</span> {traceData.source?.textSnippet || "-"}
          </p>
          <Button variant="outline" onClick={() => setShowTraceModal(false)} className="mt-4">
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}

function Detail({ label, value, onTrace }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 uppercase">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value || "-"}</p>
      </div>
      {onTrace && (
        <Button size="xs" variant="outline" onClick={onTrace}>
          Trace
        </Button>
      )}
    </div>
  );
}
