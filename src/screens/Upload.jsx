import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Upload as UploadIcon,
  CheckCircle,
  XCircle,
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
  
  // New states for progress and popups
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [uploadError, setUploadError] = useState("");

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
    setUploadProgress(0);
    setShowSuccessPopup(false);
    setShowFailurePopup(false);
    setUploadError("");

    const startTime = Date.now();

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        // Calculate progress for multiple files
        const baseProgress = (i / files.length) * 100;

        try {
          const res = await api.post("/loans/documents/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                // Upload progress accounts for 70% of each file's progress
                const fileProgress = (progressEvent.loaded / progressEvent.total) * 70;
                const totalProgress = baseProgress + (fileProgress / files.length);
                setUploadProgress(Math.round(totalProgress));
              }
            },
          });

          // Simulate processing time (30% of progress per file)
          const processingProgress = baseProgress + (70 / files.length);
          setUploadProgress(Math.round(processingProgress));
          
          // Add small delay to show processing state
          await new Promise(resolve => setTimeout(resolve, 300));

          console.log("Upload response:", res);
          const document_name = res.data?.documentName || {}
          const parties = res.data?.loanData?.parties || {};
          const interest = res.data?.loanData?.interest || {};
         
          setRecentUploads((prev) => {
            const updated = [
              {
                id: res.data.loanId,
                document_name: document_name || "-",
                borrower: parties.borrower || "-",
                lender: parties.lenders[0] || "-",
                // facilityAgent: parties.facilityAgent || "-",
                // arranger: parties.arranger || "-",
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

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        } catch (error) {
          console.error("Upload failed for file:", file.name, error);
          throw error; // Throw to trigger failure popup
        }
      }

      // All files uploaded successfully
      setUploadProgress(100);
      setShowSuccessPopup(true);
      
      // Hide success popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 8000);

    } catch (error) {
      console.error("Upload failed", error);
      setUploadError(error.response?.data?.message || error.message || "Upload failed. Please try again.");
      setShowFailurePopup(true);
    } finally {
      setUploading(false);
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 3000);
    }
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
          const document_name = doc.documentName || {}
          const parties = doc.loanData?.parties || {};
           const interest = doc.loanData?.interest || {};
          return {
            id: doc.loanId,
            document_name: document_name || "-",
            borrower: parties.borrower || "-",
            lender: parties.lenders[0] || "-",
            // facilityAgent: parties.facilityAgent || "-",
            // arranger: parties.arranger || "-",
            guarantor: parties.guarantor || "-",
            benchmark: interest.benchmark || "-",
            status: doc.status,
          };
        });

        setRecentUploads(normalized);
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).userId : "guest";
        const STORAGE_KEY = `loanDocuments:${userId}`;
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
    <>
    <div className="p-6 space-y-4">
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
            className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
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
              className="absolute inset-0  opacity-0 cursor-pointer"
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
              <Button variant="primary" disabled={uploading}>
                {uploading ? "Uploading..." : "Select Files"}
              </Button>

              {/* Upload Progress Bar */}
              {uploading && uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Uploading...
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
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
                      "Document Name",
                      "Borrower",
                      "Lender",
                      // "Facility Agent",
                      // "Arranger",
                      "Guarantor",
                      "Benchmark",
                      "Actions",
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
                    return (
                      <tr
                        key={doc.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLoanId(doc.id);
                              setCurrentScreen("loan-details");
                            }}
                      >

                        <td className="px-4 py-3">{doc.document_name}</td>
                        <td className="px-4 py-3">{doc.borrower}</td>
                        <td className="px-4 py-3">{doc.lender}</td>
                        {/* <td className="px-4 py-3">{doc.facilityAgent}</td> */}
                        {/* <td className="px-4 py-3">{doc.arranger}</td> */}
                        <td className="px-4 py-3">{doc.guarantor}</td>
                        <td className="px-4 py-3">
                          <Badge variant="info">{doc.benchmark}</Badge>
                        </td>
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
    
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Successful!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your document{files.length > 1 ? 's have' : ' has'} been uploaded and is being processed.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Failure Popup */}
      {showFailurePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Failed
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {uploadError || "Something went wrong while uploading your document. Please try again."}
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowFailurePopup(false)}
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </>
  );
}