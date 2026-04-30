import type { MockDashboard } from "@/mocks";

export type DashboardRangeKey = "30d" | "3m" | "6m" | "12m";

export type DashboardRangeOption = {
  label: string;
  value: DashboardRangeKey;
};

export type DashboardChartPoint = {
  label: string;
  income: number;
  expenses: number;
  profit: number;
};

export type DashboardRangeData = MockDashboard & {
  chart: DashboardChartPoint[];
};
