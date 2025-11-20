import styles from './styles/App.module.css';
import rawData from './data/data.json';

import * as htmlToImage from "html-to-image";
import { useRef, useState } from "react";

import { prepareChartData, type ChartDataEntry } from './utils/prepareChartData';
import { groupByWeek, type AggregatedWeekData } from './utils/groupByWeek';
import { variationColors } from './utils/colors';

import { VariationSelector } from './components/VariationSelector/VariationSelector';
import { PeriodSelector, type PeriodMode } from './components/PeriodSelector/PeriodSelector';

import {
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';

import { CustomTooltip } from './components/CustomTooltip/CustomTooltip';
import { ChartTypeSelector, type ChartMode } from './components/ChartTypeSelector/ChartTypeSelector';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';

interface DayEntry {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

function App() {
  const dayData: ChartDataEntry[] = prepareChartData(rawData.data as DayEntry[]);
  const weekData: AggregatedWeekData[] = groupByWeek(rawData.data as DayEntry[]);


  const [mode, setMode] = useState<PeriodMode>("day");
  const chartData = mode === "day" ? dayData : weekData;

  const variations = rawData.variations;

  const [chartType, setChartType] = useState<ChartMode>("monotone");

  const chartRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState<Record<number, boolean>>(
    variations.reduce((acc: Record<number, boolean>, v) => {
      const id = v.id ?? 0;
      acc[id] = true;
      return acc;
    }, {})
  );

  const toggleVariation = (id: number) => {
    const enabledCount = Object.values(enabled).filter(Boolean).length;
    if (enabled[id] && enabledCount === 1) return;

    setEnabled(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exportPNG = () => {
    if (!chartRef.current) return;

    htmlToImage.toPng(chartRef.current, { backgroundColor: "white" })
      .then(dataUrl => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectors}>
        <h1>A/B Test Conversion Rates</h1>

        <PeriodSelector mode={mode} setMode={setMode} />

        <VariationSelector
          variations={variations}
          enabled={enabled}
          toggle={toggleVariation}
        />

        <ChartTypeSelector mode={chartType} onChange={setChartType} />

        <ThemeSwitcher />

        <button onClick={exportPNG} style={{ marginLeft: 10 }}>
          📥 Export PNG
        </button>

        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={chartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

              <XAxis dataKey="date" />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(v: number) => v.toFixed(1) + '%'}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#000', strokeWidth: 1 }}
              />

              <Legend />

              {variations.map(v => {
                const id = v.id;
                if (id === undefined) return null;
                if (!enabled[id]) return null;
                const color = variationColors[id];

                if (chartType === "area") {
                  return (
                    <Area
                      key={id}
                      type="monotone"
                      name={v.name}
                      dataKey={String(id)}
                      stroke={color}
                      fill={color + "33"}
                      strokeWidth={2}
                    />
                  );
                }

                if (chartType === "fat") {
                  return (
                    <Line
                      key={id}
                      name={v.name}
                      dataKey={String(id)}
                      type="monotone"
                      stroke={color}
                      strokeWidth={6}
                      opacity={0.45}
                      dot={false}
                    />
                  );
                }

                return (
                  <Line
                    key={id}
                    name={v.name}
                    dataKey={String(id)}
                    type={
                      chartType === "natural"
                        ? "natural"
                        : chartType === "step"
                          ? "step"
                          : chartType === "line"
                            ? "linear"
                            : "monotone"
                    }
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
