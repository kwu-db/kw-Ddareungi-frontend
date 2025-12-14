import React from "react";
import { Card } from "../atom/Card";

interface StatsChartProps {
  title: string;
  data?: Array<{ label: string; value: number; displayValue?: string }>;
  type?: "bar" | "line" | "pie";
}

export const StatsChart: React.FC<StatsChartProps> = ({ title, data = [], type = "bar" }) => {
  if (!data || data.length === 0 || (data.length === 1 && data[0].value === 0 && data[0].label === "데이터 없음")) {
    return (
      <Card className="p-4 mb-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
          <p className="text-sm">데이터가 없습니다</p>
        </div>
      </Card>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value), 1);

  const renderBarChart = () => {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 font-medium truncate flex-1 mr-2">{item.label}</span>
              <span className="text-gray-900 font-semibold">{item.displayValue || item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#00a651] h-full rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLineChart = () => {
    return (
      <div className="relative h-56 pb-10">
        {/* 차트 영역 */}
        <div className="absolute inset-0 top-0 bottom-10 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* 연결선과 점 */}
            <svg className="w-full h-full absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00a651" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#00a651" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {/* 영역 채우기 */}
              <polygon
                points={`0,100 ${data
                  .map((item, index) => {
                    const x = (index / (data.length - 1 || 1)) * 100;
                    const y = 100 - (item.value / maxValue) * 75;
                    return `${x},${y}`;
                  })
                  .join(" ")} 100,100`}
                fill="url(#lineGradient)"
              />
              {/* 연결선 */}
              <polyline
                points={data
                  .map((item, index) => {
                    const x = (index / (data.length - 1 || 1)) * 100;
                    const y = 100 - (item.value / maxValue) * 75;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#00a651"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 점 */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1 || 1)) * 100;
                const y = 100 - (item.value / maxValue) * 75;
                return (
                  <circle key={index} cx={x} cy={y} r="2.5" fill="#00a651" className="hover:r-3.5 transition-all" />
                );
              })}
            </svg>
          </div>
        </div>
        {/* 하단 요일 레이블 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* 작은 점 */}
              <div className="w-1.5 h-1.5 bg-[#00a651] rounded-full mb-1.5"></div>
              <span className="text-xs text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const colors = ["#00a651", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534"];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-48 h-48">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle = endAngle;

              const startAngleRad = (startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (endAngle - 90) * (Math.PI / 180);

              const x1 = 50 + 40 * Math.cos(startAngleRad);
              const y1 = 50 + 40 * Math.sin(startAngleRad);
              const x2 = 50 + 40 * Math.cos(endAngleRad);
              const y2 = 50 + 40 * Math.sin(endAngleRad);

              const largeArcFlag = angle > 180 ? 1 : 0;

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{item.value}</span>
                  <span className="text-gray-400">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="min-h-[200px]">
        {type === "bar" && renderBarChart()}
        {type === "line" && renderLineChart()}
        {type === "pie" && renderPieChart()}
      </div>
    </Card>
  );
};
