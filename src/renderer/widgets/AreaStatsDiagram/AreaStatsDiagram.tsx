import { useAppSelector } from '@/app/hooks/useActions'
import { IDiagram } from '@/global'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/Chart/Chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
  vacancies: {
    label: 'Vacancies',
    color: 'darkblue',
  },
} satisfies ChartConfig

export default function KeySkillsDiagram({ title }: IDiagram) {
  let stats = useAppSelector((state) => state.stats.value)

  const data = []
  let counter = 1
  for (const [key, value] of Object.entries(stats.areas)) {
    if (counter <= 15) {
      data.push({ name: key, vacancies: value })
      counter += 1
    } else {
      break
    }
  }

  return (
    <>
      <div className="mt-2 font-medium text-lg text-center">{title}</div>
      <ChartContainer
        config={chartConfig}
        className="w-full h-full [&_.recharts-cartesian-grid_line]:stroke-gray-300 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-gray-300 [&_.recharts-cartesian-grid_line]:dark:stroke-gray-400 [&_.recharts-rectangle.recharts-tooltip-cursor]:dark:fill-gray-400"
      >
        <BarChart
          accessibilityLayer
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 50,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" fill="white" fillOpacity={0.5} />
          <XAxis type="number" dataKey="vacancies" />
          <YAxis type="category" dataKey="name" />
          <ChartTooltip
            content={<ChartTooltipContent hideIndicator />}
            labelClassName="dark:text-black"
          />
          <Bar
            dataKey="vacancies"
            fill="var(--color-vacancies)"
            radius={[0, 5, 5, 0]}
          />
        </BarChart>
      </ChartContainer>
    </>
  )
}
