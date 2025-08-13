import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ isOpen, onClose, onScan }) {
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (isOpen) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            setCameras(devices);
            setSelectedCamera(devices[0].id);
          }
        })
        .catch((err) => {
          console.error("Error getting cameras:", err);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !selectedCamera) return;

    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 300,
        aspectRatio: 1.1,
        videoConstraints: {
          deviceId: selectedCamera,
        },
      },
      false
    );

    setScanner(qrScanner);

    if (isScanning) {
      qrScanner.render(
        (decodedText) => {
          onScan(decodedText);
          qrScanner.clear().then(() => {
            setIsScanning(false);
            onClose();
          });
        },
        (errorMessage) => {
          console.log("QR scan error:", errorMessage);
        }
      );
    }

    return () => {
      qrScanner
        .clear()
        .catch((e) => console.error("Failed to clear scanner:", e));
    };
  }, [isOpen, onScan, onClose, isScanning, selectedCamera]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner
        .clear()
        .then(() => {
          setIsScanning(false);
        })
        .catch((e) => console.error("Failed to stop scanner:", e));
    }
  };

  const handleCameraChange = (cameraId) => {
    if (isScanning) {
      stopScanning();
    }
    setSelectedCamera(cameraId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-2 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 ml-2">
            Scan QR Code
          </h3>
          <button
            className="w-7 h-7 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {cameras.length > 1 && (
          <div className="p-2 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">
              Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => handleCameraChange(e.target.value)}
              className="w-[96%] mx-2 px-2 py-1.5 justify-between text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {cameras.map((camera, index) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="p-2">
          <div id="qr-reader" className="w-full rounded-lg overflow-hidden" />

        </div>

        <div className="p-2 border-t border-gray-100">
          {!isScanning ? (
            <button
              onClick={startScanning}
              disabled={!selectedCamera}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors mb-1"
            >
              Start Scanning
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors mb-1"
            >
              Stop Scanning
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
