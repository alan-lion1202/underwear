"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, Building2, ChartNoAxesCombined, Database, Gauge, Handshake, Palette, PackageSearch, Share2 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard 总览", description: "关键指标", icon: Gauge },
  { href: "/brand-database", label: "Brand Database 品牌库", description: "品牌与联系人", icon: Database },
  { href: "/brand-tone", label: "Brand Intelligence 品牌情报", description: "调性与定位", icon: Palette },
  { href: "/product-research", label: "Product Research 产品研究", description: "品类与SKU", icon: PackageSearch },
  { href: "/b2b-leads", label: "B2B Leads 客户线索", description: "开发管线", icon: Handshake },
  { href: "/social-media-tracker", label: "Social Tracker 社媒追踪", description: "账号信号", icon: Share2 },
  { href: "/opportunity-analysis", label: "Opportunity Analysis 机会分析", description: "市场机会", icon: ChartNoAxesCombined }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link href="/brand-database" className="brandLockup" aria-label="Dashboard home">
          <div className="brandMark">
            <Building2 size={22} />
          </div>
          <div>
            <strong>Underwear Intel</strong>
            <span>LGBTQ+ Market OS</span>
          </div>
        </Link>

        <nav className="navList" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link className={active ? "navItem active" : "navItem"} href={item.href} key={item.href}>
                <Icon size={18} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebarPanel">
          <BarChart3 size={18} />
          <div>
            <strong>Research Mode 研究模式</strong>
            <span>Tables、filters、CSV workflow 和 charts 都基于 seed / imported data。</span>
          </div>
        </div>
      </aside>
      <main className="mainContent">{children}</main>
    </div>
  );
}
