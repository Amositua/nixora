import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Upload as UploadIcon,
  // File,
  // X,
} from "lucide-react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

import api from "../api/api";

export default function Upload({ setCurrentScreen, setSelectedLoanId }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);

  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);

  console.log("Files state:", files);
  console.log("Uploading state:", uploading);
  console.log("Recent uploads:", recentUploads);

  const handleFileSelect = (e) => {
    console.log("File select event:", e);
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    uploadFiles(selectedFiles);
    console.log("Selected files:", selectedFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      console.log("Drag event:", e.type);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    uploadFiles(droppedFiles);
  };

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  const uploadFiles = async (files) => {
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await api.post("/loans/documents/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Upload response:", res);
        // const data = res.data;
        const parties = res.data?.loanData?.parties || {};
        // const facility = res.data?.loanData?.facility || {};
        const interest = res.data?.loanData?.interest || {};
       
        setRecentUploads((prev) => {
          const updated = [
            {
              id: res.data.documentId,
              // name: file.name,
              borrower: parties.borrower || "-",
              lender: parties.lenders[0] || "-",
              facilityAgent: parties.facilityAgent || "-",
              arranger: parties.arranger || "-",
              guarantor: parties.guarantor || "-",
              benchmark: interest.benchmark || "-",
              status: res.data.status || "processing",
            },
            ...prev,
          ];
          const user = localStorage.getItem("user");
          const userId = user ? JSON.parse(user).userId : "guest";
          const STORAGE_KEY = `loanDocuments:${userId}`;
          console.log("Storing recent uploads under key:", STORAGE_KEY);

          // localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    setUploading(false);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).userId : "guest";
      const cachedLoans = localStorage.getItem(`loanDocuments:${userId}`);

      if (cachedLoans) {
        setRecentUploads(JSON.parse(cachedLoans));
        setIsLoadingDocuments(false);
        return;
      }
      try {
        setIsLoadingDocuments(true);

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
        console.log("Fetched documents:", data);

        const normalized = data.map((doc) => {
          const parties = doc.loanData?.parties || {};
          //  const facility = doc.loanData?.facilities || {};
           const interest = doc.loanData?.interest || {};
          return {
            id: doc.loanId,
            // name: doc.documentUrl.split("/").pop(),
            borrower: parties.borrower || "-",
            lender: parties.lenders[0] || "-",
            facilityAgent: parties.facilityAgent || "-",
            arranger: parties.arranger || "-",
            guarantor: parties.guarantor || "-",
            benchmark: interest.benchmark || "-",
            status: doc.status,
          };
        });

        setRecentUploads(normalized);
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).userId : "guest";
        const STORAGE_KEY = `loanDocuments:${userId}`;
        // console.log("Storing recent uploads under key:", STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setIsLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Upload Loan Documents
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload PDF or Word documents to extract structured loan data
        </p>
      </div>

      <Card>
        <CardContent className="py-12">
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <UploadIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-base font-medium text-gray-900">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports PDF and Word documents up to 50MB
                </p>
              </div>
              {/* <div className="flex justify-center">
                <Button variant="primary">Select Files</Button>
              </div> */}
              <Button variant="primary" disabled={uploading}>
                {uploading ? "Uploading..." : "Select Files"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Uploads</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Track the status of your uploaded documents
              </p>
            </div>
            <Button
              onClick={() => setCurrentScreen("portfolio")}
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoadingDocuments ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">
                  Loading your documents...
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      // "Document",
                      "Borrower",
                      "Lender",
                      "Facility Agent",
                      "Arranger",
                      "Guarantor",
                      "Benchmark",
                      "Actions",
                      // "Status",
                      // "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-medium text-gray-600"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentUploads.map((doc) => {
                    console.log("lender value:", doc.lender);
                    // const StatusIcon = getStatusConfig(doc.status).icon;
                    return (
                      <tr
                        key={doc.id}
                        // onClick={() => {
                        //   setSelectedLoanId(doc.id);
                        //   setCurrentScreen("loan-details");
                        // }}
                        className="hover:bg-gray-50"
                      >
                        {/* <td className="px-4 py-3 flex items-center gap-2">
                          <File className="w-4 h-4 text-blue-600" />
                          {doc.name}
                        </td> */}
                        <td className="px-4 py-3">{doc.borrower}</td>
                        <td className="px-4 py-3">{doc.lender}</td>
                        <td className="px-4 py-3">{doc.facilityAgent}</td>
                        <td className="px-4 py-3">{doc.arranger}</td>
                        <td className="px-4 py-3">{doc.guarantor}</td>
                        <td className="px-4 py-3">
                          <Badge variant="info">{doc.benchmark}</Badge>
                        </td>
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
                          <Badge variant={getStatusConfig(doc.status).variant}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusConfig(doc.status).label}
                          </Badge>
                        </td> */}
                        {/* <td className="px-4 py-3">
                          <button className="text-gray-400 hover:text-red-600">
                            <X size={14} />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="overflow-x-auto"></div>
        </CardContent>
      </Card>
    </div>
  );
}
