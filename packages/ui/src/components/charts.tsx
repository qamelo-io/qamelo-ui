"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

import { cn } from "../tokens/cn";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./chart";

// Default chart token colors (CSS custom properties from the design system)
const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

// ---------------------------------------------------------------------------
// LineChartWidget
// ---------------------------------------------------------------------------

interface LineChartWidgetProps {
  data: Record<string, unknown>[];
  categories: string[];
  index: string;
  config: ChartConfig;
  className?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function LineChartWidget({
  data,
  categories,
  index,
  config,
  className,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
}: LineChartWidgetProps) {
  return (
    <ChartContainer config={config} className={cn("w-full", className)} style={{ height }}>
      <RechartsLineChart data={data} accessibilityLayer>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={index} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// BarChartWidget
// ---------------------------------------------------------------------------

interface BarChartWidgetProps {
  data: Record<string, unknown>[];
  categories: string[];
  index: string;
  config: ChartConfig;
  className?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function BarChartWidget({
  data,
  categories,
  index,
  config,
  className,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
}: BarChartWidgetProps) {
  return (
    <ChartContainer config={config} className={cn("w-full", className)} style={{ height }}>
      <RechartsBarChart data={data} accessibilityLayer>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={index} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={CHART_COLORS[i % CHART_COLORS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// AreaChartWidget
// ---------------------------------------------------------------------------

interface AreaChartWidgetProps {
  data: Record<string, unknown>[];
  categories: string[];
  index: string;
  config: ChartConfig;
  className?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function AreaChartWidget({
  data,
  categories,
  index,
  config,
  className,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
}: AreaChartWidgetProps) {
  return (
    <ChartContainer config={config} className={cn("w-full", className)} style={{ height }}>
      <RechartsAreaChart data={data} accessibilityLayer>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={index} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={CHART_COLORS[i % CHART_COLORS.length]}
            fillOpacity={0.2}
            stroke={CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// PieChartWidget
// ---------------------------------------------------------------------------

interface PieChartWidgetProps {
  data: { name: string; value: number; fill?: string }[];
  config: ChartConfig;
  className?: string;
  height?: number;
  innerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}

function PieChartWidget({
  data,
  config,
  className,
  height = 300,
  innerRadius = 0,
  showLegend = false,
  showTooltip = true,
}: PieChartWidgetProps) {
  return (
    <ChartContainer config={config} className={cn("w-full", className)} style={{ height }}>
      <RechartsPieChart accessibilityLayer>
        {showTooltip && <ChartTooltip content={<ChartTooltipContent hideLabel />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="name" />} />}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius="80%"
        >
          {data.map((entry, i) => (
            <Cell
              key={entry.name}
              fill={entry.fill ?? CHART_COLORS[i % CHART_COLORS.length]}
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}

export { LineChartWidget, BarChartWidget, AreaChartWidget, PieChartWidget };
export type {
  LineChartWidgetProps,
  BarChartWidgetProps,
  AreaChartWidgetProps,
  PieChartWidgetProps,
};
