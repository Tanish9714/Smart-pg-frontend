import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ isOpen, onClose, onScan, type }) {
  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1.0,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(`${decodedText}`);
        scanner.clear().then(() => {
          onClose();
        });
      },
      (errorMessage) => {
        console.log("QR scan error:", errorMessage);
      }
    );

    return () => {
      scanner
        .clear()
        .catch((e) => console.error("Failed to clear scanner:", e));
    };
  }, [isOpen, onScan, onClose, type]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-[3000] animate-fade-in">
      <div className="bg-white rounded-2xl w-[90%] max-w-[500px] overflow-hidden animate-slide-up shadow-2xl border border-gray-300">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-100">
          <h3 className="text-lg font-semibold text-slate-800">
            Scan QR Code - {type}
          </h3>
          <button
            className="text-2xl text-slate-500 hover:text-slate-800 hover:bg-gray-200 transition p-2 rounded"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div id="qr-reader" className="w-full"></div>
      </div>
    </div>
  );
}
