"use client";

import React from 'react';
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isServicesPage = pathname === '/services';
  
  return (
    <div className={`w-full ${isHomePage || isServicesPage ? '' : 'pt-[92px]'}`}>
      {children}
    </div>
  );
} 