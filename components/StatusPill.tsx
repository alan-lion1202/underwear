const toneMap: Record<string, string> = {
  Active: "green",
  Emerging: "blue",
  Monitor: "amber",
  Dormant: "muted",
  Validated: "green",
  Testing: "amber",
  Gap: "red",
  New: "blue",
  Contacted: "amber",
  Researching: "blue",
  Replied: "amber",
  Qualified: "green",
  "Not Fit": "muted",
  Partner: "green",
  Nurture: "muted",
  Growing: "green",
  Stable: "blue",
  Declining: "red",
  Open: "blue",
  Sizing: "amber",
  Pilot: "green",
  Parked: "muted",
  High: "red",
  Medium: "amber",
  Low: "muted"
};

export function StatusPill({ value }: { value: string }) {
  return <span className={`pill ${toneMap[value] ?? "muted"}`}>{displayMap[value] ?? value}</span>;
}

const displayMap: Record<string, string> = {
  Active: "Active 活跃",
  Emerging: "Emerging 新兴",
  Monitor: "Monitor 观察",
  Dormant: "Dormant 沉寂",
  Validated: "Validated 已验证",
  Testing: "Testing 测试中",
  Gap: "Gap 空白机会",
  New: "New 新线索",
  Researching: "Researching",
  Contacted: "Contacted 已联系",
  Replied: "Replied",
  Qualified: "Qualified 已合格",
  "Not Fit": "Not Fit",
  Partner: "Partner",
  Nurture: "Nurture 培育",
  Growing: "Growing 增长",
  Stable: "Stable 稳定",
  Declining: "Declining 下滑",
  Open: "Open 开放",
  Sizing: "Sizing 评估规模",
  Pilot: "Pilot 试点",
  Parked: "Parked 暂缓",
  High: "High 高",
  Medium: "Medium 中",
  Low: "Low 低"
};
