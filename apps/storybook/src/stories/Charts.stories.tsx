import type { Meta, StoryObj } from "@storybook/react";
import {
  LineChartWidget,
  BarChartWidget,
  AreaChartWidget,
  PieChartWidget,
} from "@qamelo-io/ui";
import type { ChartConfig } from "@qamelo-io/ui";

const meta = {
  title: "Components/Charts",
} satisfies Meta;

export default meta;
type Story = StoryObj;

// -- Sample data --

const monthlyData = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
  { month: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
];

const lineConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  profit: { label: "Profit", color: "var(--chart-3)" },
};

const barConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
};

const areaConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  profit: { label: "Profit", color: "var(--chart-3)" },
};

const pieData = [
  { name: "Chrome", value: 275 },
  { name: "Safari", value: 200 },
  { name: "Firefox", value: 187 },
  { name: "Edge", value: 173 },
  { name: "Other", value: 90 },
];

const pieConfig: ChartConfig = {
  Chrome: { label: "Chrome", color: "var(--chart-1)" },
  Safari: { label: "Safari", color: "var(--chart-2)" },
  Firefox: { label: "Firefox", color: "var(--chart-3)" },
  Edge: { label: "Edge", color: "var(--chart-4)" },
  Other: { label: "Other", color: "var(--chart-5)" },
};

// -- Stories --

export const LineChart: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChartWidget
        data={monthlyData}
        categories={["revenue", "expenses", "profit"]}
        index="month"
        config={lineConfig}
        showLegend
      />
    </div>
  ),
};

export const BarChart: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChartWidget
        data={monthlyData}
        categories={["revenue", "expenses"]}
        index="month"
        config={barConfig}
        showLegend
      />
    </div>
  ),
};

export const AreaChart: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChartWidget
        data={monthlyData}
        categories={["revenue", "profit"]}
        index="month"
        config={areaConfig}
        showLegend
      />
    </div>
  ),
};

export const PieChart: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <PieChartWidget
        data={pieData}
        config={pieConfig}
        showLegend
      />
    </div>
  ),
};

export const DonutChart: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <PieChartWidget
        data={pieData}
        config={pieConfig}
        innerRadius={60}
        showLegend
      />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid w-full grid-cols-2 gap-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-semibold">Revenue Trend</h3>
        <LineChartWidget
          data={monthlyData}
          categories={["revenue"]}
          index="month"
          config={lineConfig}
          height={200}
        />
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-semibold">Revenue vs Expenses</h3>
        <BarChartWidget
          data={monthlyData}
          categories={["revenue", "expenses"]}
          index="month"
          config={barConfig}
          height={200}
        />
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-semibold">Profit Area</h3>
        <AreaChartWidget
          data={monthlyData}
          categories={["revenue", "profit"]}
          index="month"
          config={areaConfig}
          height={200}
        />
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-semibold">Browser Share</h3>
        <PieChartWidget
          data={pieData}
          config={pieConfig}
          innerRadius={40}
          height={200}
          showLegend
        />
      </div>
    </div>
  ),
};
