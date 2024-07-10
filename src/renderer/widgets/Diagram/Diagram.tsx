import { useAppSelector } from '@/app/hooks/useActions'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface IDiagram {
  title: string
}

export default function Diagram({ title }: IDiagram) {
  let stats = useAppSelector((state) => state.stats.value)
  stats = JSON.parse(stats)

  const data = []
  let counter = 1
  for (const [key, value] of Object.entries(stats)) {
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={600}
          layout={'vertical'}
          data={data}
          margin={{
            top: 5,
            right: 60,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" fill="white" />
          <XAxis type={'number'} />
          <YAxis dataKey="name" type={'category'} />
          <Tooltip />
          <Bar dataKey="vacancies" fill="darkred" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
