import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-pink-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-violet-600 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
}