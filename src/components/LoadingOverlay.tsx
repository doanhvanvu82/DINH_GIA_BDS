import React from "react";

interface LoadingOverlayProps {
  loadingStep: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loadingStep }) => (
  <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white/20 via-white/30 to-white/20 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
    <div className="relative mb-4">
      <div className="h-16 w-16 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
      <div
        className="absolute top-2 left-2 h-12 w-12 border-4 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border-b-transparent rounded-full animate-spin shadow-md"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-sm"></div>
      <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
    </div>
    <div className="text-sm font-medium text-gray-600 text-center flex flex-col gap-1">
      <span>Bạn vui lòng chờ trong giây lát, hệ thống đang xử lý dữ liệu...</span>
      <span className="block text-primary animate-pulse">{loadingStep}</span>
    </div>
  </div>
);

export default LoadingOverlay;