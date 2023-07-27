import MainNav from "@/components/main-nav";
import { adminConfig } from "@/config/admin";
import { UserButton, auth } from "@clerk/nextjs";

import React from "react";
import SidebarNav from "../nav/sidebar-nav";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {

  return (
    <div className="">
      {children}
    </div>
  )
}