"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const NavigationProgress = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div className="h-full bg-gradient-to-r from-violet-600 to-pink-600 animate-pulse" 
           style={{ width: '100%' }} />
    </div>
  );
};