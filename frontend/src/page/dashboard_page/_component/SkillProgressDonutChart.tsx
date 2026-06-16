/* src/page/dashboard_page/_component/SkillProgressDonutChart.tsx */

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

type SkillProgressDonutChartProps = {
  percent: number;
};

const SkillProgressDonutChart = ({ percent }: SkillProgressDonutChartProps) => {
  const chartData = [
    { name: '달성', value: percent, fill: '#155dfc' },
    { name: '남음', value: 100 - percent, fill: '#e5e5e5' },
  ];

  return (
    <div className="relative w-full aspect-square">
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 300, height: 300 }}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius="78%" // 도넛 구멍 크기 (얇은 링)
            outerRadius="100%"
            startAngle={90} // 12시 방향에서 시작
            endAngle={-270} // 시계방향 한 바퀴(360°)
            cornerRadius={50} // 막대 끝 둥글게 (목업 느낌)
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* 가운데 텍스트 오버레이 (SVG가 아니라 HTML) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-h2 font-bold">{percent}%</span>
        <span className="text-sm text-neutral-400">목표 대비 달성</span>
      </div>
    </div>
  );
};

export default SkillProgressDonutChart;
