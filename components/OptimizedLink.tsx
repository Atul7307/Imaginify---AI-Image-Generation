"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}

export const OptimizedLink = ({ 
  href, 
  children, 
  className = "",
  prefetch = true 
}: OptimizedLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  }, [href, router]);

  return (
    <Link 
      href={href}
      className={`${className} ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      prefetch={prefetch}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};