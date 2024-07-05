import Diagram from '@/widgets/diagram'
import { useRef, useState } from 'react'

export default function App() {
  const [stats, setStats] = useState('Here are some results...')
  const [searhQuery, setSearchQuery] = useState('')
  const searchQueryName = useRef('')
  const searchInput = useRef(null)

  async function getStats(searchQuery: string) {
    searchQueryName.current = searchQuery
    const response = await window.api.getStats(searchQuery)
    setStats(JSON.stringify(response).replaceAll(',', ', '))
  }

  async function searchHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    searchInput.current.blur()
    setStats('Getting stats...')
    const target = e.currentTarget
    target.disabled = true
    await getStats(searhQuery)
    target.disabled = false
  }

  return (
    <div className="p-5 bg-slate-200 max-w-screen min-h-screen">
      <div className="text-3xl font-bold text-center">Skill Insight</div>
      <form>
        <div className="my-2 flex justify-center gap-2">
          <label htmlFor="searchInput">Your search request:</label>
          <input
            ref={searchInput}
            id="searchInput"
            type="text"
            value={searhQuery}
            className="w-1/4 min-w-40 px-1 border-[1px] border-black focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            type="submit"
            onClick={(e) => searchHandler(e)}
            className={
              stats === 'Getting stats...'
                ? 'font-semibold px-4 py-2 border-[1px] border-black rounded-xl bg-gray-300'
                : 'font-semibold px-4 py-2 border-[1px] border-black rounded-xl bg-red-300 hover:bg-red-400 active:bg-red-500 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700'
            }
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-center flex-col items-center mx-20 my-2">
        {stats === 'Here are some results...' ||
        stats === 'Getting stats...' ? (
          <div className="my-2">{stats}</div>
        ) : (
          <>
            <div className="my-2 font-semibold text-xl">
              Results ({searchQueryName.current})
            </div>
            <div className="my-2 w-2/3 min-w-96 max-h-[300px] overflow-y-auto break-words p-2 px-3 border-2 border-zinc-950 bg-white">
              {stats}
            </div>
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
