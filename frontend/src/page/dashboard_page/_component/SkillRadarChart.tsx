/* src/page/dashboard_page/_component/SkillRadarChart.tsx */

/* Library */
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

/* Type */
import { SKILL_META, type SkillDataType } from '../../../type';

type SkillRadarChartProps = {
  data: SkillDataType[];
};

const SkillRadarChart = ({ data }: SkillRadarChartProps) => {
  const chartData = data.map((item) => ({
    label: SKILL_META[item.skill].label,
    value: item.value,
  }));

  return (
    <ResponsiveContainer width={'100%'} aspect={1}>
      <RadarChart data={chartData} outerRadius={'70%'}>
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis dataKey={'label'} tick={{ fontSize: 14, fontWeight: '500' }} />
        <Radar
          dataKey="value"
          stroke="#155dfc"
          strokeWidth={2}
          fill="#155dfc"
          fillOpacity={0.3}
          dot={{ r: 4, fill: '#155dfc', stroke: '#fff', strokeWidth: 2 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadarChart;
