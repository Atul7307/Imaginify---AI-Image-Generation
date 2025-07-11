export const ImageSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg w-full h-64 mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);
