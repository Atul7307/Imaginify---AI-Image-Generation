
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePreloadRoute = (routes: string[]) => {
  const router = useRouter();

  useEffect(() => {
    routes.forEach(route => {
      router.prefetch(route);
    });
  }, [routes, router]);
};