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
  stats: object[]
}

export default function Diagram({ stats }: IDiagram) {
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
  )
}
