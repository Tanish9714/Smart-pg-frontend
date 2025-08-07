import React, { useState } from "react";
import { useToast } from "../components/ui/Toast";
import QRScanner from "../components/ui/QRScanner";
import axiosInstance from "../api/axiosInstance";

export default function AddActivity() {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { showToast } = useToast();

  function handleOpenQRScanner() {
    setIsQRScannerOpen(true);
  }

  function handleCloseQRScanner() {
    setIsQRScannerOpen(false);
  }

  async function handleQRScan(data) {
    try {
      const decodedText = atob(data);
      const [uuid, email, name, pg_id, floor, roomNumber, joinDate] = decodedText.split(":");

      console.log("Scanned Data:", {
        uuid,
        email,
        name,
        pg_id,
        floor,
        roomNumber,
        joinDate
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>

          <button
            onClick={handleOpenQRScanner}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            Scan QR Code
          </button>
        </div>

        <QRScanner
          isOpen={isQRScannerOpen}
          onClose={handleCloseQRScanner}
          onScan={handleQRScan}
          type="Activity"
        />
      </div>
    </div>
  );
}
