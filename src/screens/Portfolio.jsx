import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
// import { Eye } from "lucide-react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

console.log("Rendering Portfolio screen...");

export default function Portfolio({ setCurrentScreen, setSelectedLoanId }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching loan documents for portfolio...");
    const fetchLoans = async () => {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).userId : "guest";
      const cachedLoans = localStorage.getItem(`loanDocuments:${userId}`);

      if (cachedLoans) {
        setDocuments(JSON.parse(cachedLoans));
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch(
          "https://nixora-image-latest.onrender.com/api/loans/documents/getAllLoan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("loan data:", data);

        const normalized = data.map((doc) => {
          const document_name = doc.documentName || {}
          const parties = doc.loanData?.parties || {};
          // const facility = doc.loanData?.facility || {};
          // const pricing = doc.loanData?.interestPricing || {};
          const interest = doc.loanData?.interest || {};

          return {
            id: doc.loanId,
            document_name: document_name || "-",
            borrower: parties.borrower || "-",
            lender: parties.lenders[0] || "-",
            // facilityAgent: parties.facilityAgent || "-",
            // arranger: parties.arranger || "-",
            guarantor: parties.guarantor || "-",

            // facilityId: facility[0]?.facilityId || "-",
            // facilityType: facility[0].facilityType || "-",
            // facilityName: facility[0].facilityName || "-",
            // currency: facility[0].currency || "-",
            // facilityAmount: facility[0].facilityAmount || "-",
            // availabilityPeriod: facility[0].availabilityPeriod || "-",
            benchmark: interest.benchmark || "-",
            // status: doc.status,
          };
        });

        setDocuments(normalized);
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).userId : "guest";
        const STORAGE_KEY = `loanDocuments:${userId}`;
        // console.log("Storing recent uploads under key:", STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch (err) {
        console.error("Failed to fetch portfolio", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const prefetchLoanDetails = async (loanId) => {
    if (!loanId) return;

    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).userId : "guest";
    const CACHE_KEY = `loanDetail:${userId}:${loanId}`;

    // ✅ Do not refetch if already cached
    if (localStorage.getItem(CACHE_KEY)) return;

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `https://nixora-image-latest.onrender.com/api/loans/documents/getLoan/${loanId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn("Prefetch failed for loan:", loanId);
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Loan Portfolio
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Extracted loan agreements and counterparties
          </p>
        </div>
        <div className="flex space-x-3">
          {/* <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button> */}
          <Button
            onClick={() => setCurrentScreen("upload")}
            variant="primary"
          >
            Add Loan
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loans</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* ✅ NEW HEADERS */}
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      // "Document ID",
                      "Document Name",
                      "Borrower",
                      "Lender",
                      // "Facility Agent",
                      // "arranger",
                      "guarantor",
                      "Benchmark",
                      "Actions",
                      // "Status",
                      // "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* ✅ REAL DATA */}
                <tbody className="divide-y">
                  {documents.map((doc) => (
                    <tr
                      key={doc.id}
                      onMouseEnter={() => prefetchLoanDetails(doc.id)} // 👈 PREFETCH
                      onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLoanId(doc.id);
                              setCurrentScreen("loan-details");
                            }}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {/* <td className="px-4 py-3 text-sm font-mono text-gray-700">
                        {doc.id.slice(0, 8)}…
                      </td> */}
                      <td className="px-4 py-3">{doc.document_name}</td>
                      <td className="px-4 py-3">{doc.borrower}</td>
                      <td className="px-4 py-3">{doc.lender}</td>
                      {/* <td className="px-4 py-3">{doc.facilityAgent}</td> */}
                      {/* <td className="px-4 py-3">{doc.arranger}</td> */}
                      <td className="px-4 py-3">{doc.guarantor}</td>
                      <td className="px-4 py-3">
                        <Badge variant="info">{doc.benchmark}</Badge>
                      </td>
                      {/* <td className="px-4 py-3">{doc.facilityType}</td>
                      <td className="px-4 py-3">{doc.facilityName}</td>
                      <td className="px-4 py-3">{doc.facilityAmount}</td>
                      <td className="px-4 py-3">{doc.currency}</td> */}

                      {/* ✅ ACTION COLUMN */}
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLoanId(doc.id);
                            setCurrentScreen("loan-details");
                          }}
                        >
                          More Details
                        </Button>
                      </td>
                      {/* <td className="px-4 py-3">
                        <Badge
                          variant={
                            doc.status === "TEXT_EXTRACTED"
                              ? "success"
                              : "processing"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </td> */}
                      {/* <td className="px-4 py-3">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to {documents.length} of {documents.length} results
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
