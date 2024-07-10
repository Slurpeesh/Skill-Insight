import { useAppSelector } from '@/app/hooks/useActions'
import Loader from '@/entities/Loader/Loader'
import Diagram from '@/widgets/Diagram/Diagram'
import SearchForm from '@/widgets/SearchForm/SearchForm'
import TextAreaResults from '@/widgets/TextAreaResults/TextAreaResults'
import { useRef } from 'react'

export default function App() {
  const status = useAppSelector((state) => state.status.value)
  const stats = useAppSelector((state) => state.stats.value)
  const searchQueryName = useRef('')

  return (
    <div className="p-5 bg-slate-200 max-w-screen min-h-screen">
      <div className="text-3xl font-bold text-center">Skill Insight</div>
      <SearchForm searchQueryName={searchQueryName} />
      <div className="flex justify-center flex-col items-center mx-20 my-2">
        {status == 'waiting' && (
          <>
            <Loader />
            <div className="my-2">Getting stats...</div>
          </>
        )}
        {status == 'error' && (
          <div className="text-rose-600 text-lg lg:text-2xl font-bold text-center min-w-20">
            ERROR: {stats}
          </div>
        )}
        {status == 'ready' && (
          <>
            <TextAreaResults searchQueryName={searchQueryName} />
            {stats !== '{}' && (
              <div className="mb-2 min-w-[400px] w-3/4 h-[500px] md:h-[600px]">
                <Diagram title="Number of key skills in vacancies" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
