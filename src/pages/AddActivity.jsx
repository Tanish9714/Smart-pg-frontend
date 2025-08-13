import { useState } from "react";
import QRScanner from "../components/ui/QRScanner";

export default function AddActivity() {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  function handleOpenQRScanner() {
    setIsQRScannerOpen(true);
  }

  function handleCloseQRScanner() {
    setIsQRScannerOpen(false);
  }

  async function handleQRScan(data) {
    try {
      const decodedText = atob(data);
      const [uuid, email, name, pg_id, floor, roomNumber, joinDate] =
        decodedText.split(":");

      console.log("Scanned Data:", {
        uuid,
        email,
        name,
        pg_id,
        floor,
        roomNumber,
        joinDate,
      });

      const response = await axiosInstance.post("", {
        query: `
        mutation AddQrScanLog {
          addQrScanLog(
            data: {
              tenantId: "${uuid}",
              mealType: "lunch",
            }
          ) {
            id
            tenantId
            pgId
            mealType
            currDate
          }
        }
      `,
      });

      console.log("GraphQL Response:", response.data);
      if (response.data.errors?.length > 0) {
        showToast(response.data.errors[0].message, "error");
      } else {
        showToast("QR Code scanned successfully!", "success");
      }
    } catch (error) {
      console.error("Error scanning QR or sending data:", error);
    }
    setIsQRScannerOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f5f4] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            Add Activity
          </h1>
          <p className="text-slate-600 text-lg">
            Scan QR codes to log activities quickly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#5E81F4] px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Quick Actions
            </h2>
          </div>

          <div className="p-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#5E81F4]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4m12 0h2M4 20h4m12 0h2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Scan QR Code
                </h3>
                <p className="text-slate-600">
                  Point your camera at a QR code to log activity
                </p>
              </div>

              <button
                onClick={handleOpenQRScanner}
                className="bg-[#5E81F4] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto hover:bg-blue-600 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4m12 0h2M4 20h4m12 0h2"
                  />
                </svg>
                Start Scanning
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">
                How it works
              </h4>
              <p className="text-slate-600 text-sm">
                Scan the QR code to automatically log meal activities. The
                system will decode tenant information and record the activity
                timestamp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={handleCloseQRScanner}
        onScan={handleQRScan}
      />
    </div>
  );
}
