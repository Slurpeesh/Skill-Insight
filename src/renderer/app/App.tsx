import { useAppSelector } from '@/app/hooks/useActions'
import Loader from '@/entities/Loader/Loader'
import Diagram from '@/widgets/Diagram/Diagram'
import SearchForm from '@/widgets/SearchForm/SearchForm'
import TextAreaResults from '@/widgets/TextAreaResults/TextAreaResults'
import { useRef } from 'react'

export default function App() {
  const stats = useAppSelector((state) => state.stats.value)
  const searchQueryName = useRef('')

  return (
    <div className="p-5 bg-slate-200 max-w-screen min-h-screen">
      <div className="text-3xl font-bold text-center">Skill Insight</div>
      <SearchForm searchQueryName={searchQueryName} />
      <div className="flex justify-center flex-col items-center mx-20 my-2">
        {stats === 'Getting stats...' && <Loader />}
        {stats === 'Here are some results...' ||
        stats === 'Getting stats...' ? (
          <div className="my-2">{stats}</div>
        ) : (
          <>
            <TextAreaResults searchQueryName={searchQueryName} />
            {stats !== '{}' && (
              <>
                <div className="mt-2 font-medium text-lg">
                  Number of key skills in vacancies
                </div>
                <div className="mb-2 min-w-[400px] w-3/4 h-[500px] md:h-[600px]">
                  <Diagram stats={JSON.parse(stats)}></Diagram>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
