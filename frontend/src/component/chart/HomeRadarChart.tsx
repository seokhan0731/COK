// frontend/src/components/chars/HomeRadarChart.tsx
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'

/* Type */
import type { CompetencyData } from '../../type'
import { CompetencyLabel } from '../../type/chart'

type Props = {
  data: CompetencyData[]
}

const HomeRadarChart = ({ data }: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const chartData = data.map((d) => ({
    subject: CompetencyLabel[d.subject],
    value: d.value,
  }))

  return (
    <div ref={ref}>
      <ResponsiveContainer width={'100%'} height={200}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              color: getComputedStyle(
                document.documentElement,
              ).getPropertyValue('--color-font-black'),
              fontSize: 14,
            }}
          />
          {isInView && (
            <Radar
              dataKey="value"
              fill="#155dfc"
              fillOpacity={0.3}
              stroke="#155dfc"
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HomeRadarChart
