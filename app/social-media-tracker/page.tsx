"use client";

import Link from "next/link";
import { DataTable, Tags } from "@/components/DataTable";
import { DistributionBars, getDistribution } from "@/components/Charts";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { socialAccounts } from "@/data/seed";

export default function SocialMediaTrackerPage() {
  const verifiedFollowerAccounts = socialAccounts.filter((account) => typeof account.followers === "number").length;
  const growing = socialAccounts.filter((account) => account.status === "Growing").length;
  const platforms = new Set(socialAccounts.map((account) => account.platform)).size;

  return (
    <div className="pageStack">
      <PageHeader
        eyebrow="Social Media Tracker 社媒追踪"
        title="Audience Growth & Content Signals 社媒增长信号"
        description="监控 platform mix 平台组合、engagement rate 互动率、creator-style signal 创作者内容信号和 social momentum 社媒动能，用于发现品牌。"
        metric={`${socialAccounts.length} accounts`}
      />
      <SummaryCards
        cards={[
          { label: "Verified follower counts 已核验粉丝数", value: String(verifiedFollowerAccounts), note: "unknown counts are blank" },
          { label: "Growing accounts 增长账号", value: String(growing), note: "status = Growing" },
          { label: "Platforms 平台", value: String(platforms), note: "verified accounts only" }
        ]}
      />
      <div className="contentGrid">
        <DistributionBars title="Platform distribution 平台分布" data={getDistribution(socialAccounts, (account) => account.platform)} />
        <DataTable
          title="Social Media Tracker 社媒追踪"
          rows={socialAccounts}
          exportName="social-media-tracker.csv"
          searchPlaceholder="Search brands, signals, platforms... 搜索品牌/信号/平台"
          statusKey="status"
          tagKey="tags"
          columns={[
            { key: "brand", label: "Brand 品牌" },
            { key: "platform", label: "Platform 平台" },
            { key: "accountUrl", label: "Account 账号", render: (row) => <Link className="sourceLink" href={row.accountUrl} target="_blank" rel="noreferrer">Open</Link> },
            { key: "followers", label: "Followers 粉丝", render: (row) => typeof row.followers === "number" ? row.followers.toLocaleString("en-US") : "Unknown" },
            { key: "engagement", label: "Engagement 互动率" },
            { key: "status", label: "Status 状态" },
            { key: "dataQuality", label: "Data Quality 数据质量" },
            { key: "tags", label: "Tags 标签", render: (row) => <Tags values={row.tags} /> },
            { key: "signal", label: "Signal 信号" }
          ]}
        />
      </div>
    </div>
  );
}
