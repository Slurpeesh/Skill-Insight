import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { setReady, setWaiting } from '@/app/statsSlice'
import { useRef, useState } from 'react'

interface ISearchForm {
  searchQueryName: React.MutableRefObject<string>
}

export default function SearchForm({ searchQueryName }: ISearchForm) {
  const [searhQuery, setSearchQuery] = useState('')
  const searchInput = useRef(null)
  const stats = useAppSelector((state) => state.stats.value)
  const dispatch = useAppDispatch()

  async function getStats(searchQuery: string) {
    searchQueryName.current = searchQuery
    const response = await window.api.getStats(searchQuery)
    dispatch(setReady(JSON.stringify(response).replaceAll(',', ', ')))
  }

  async function searchHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    searchInput.current.blur()
    dispatch(setWaiting())
    const target = e.currentTarget
    target.disabled = true
    await getStats(searhQuery)
    target.disabled = false
  }

  return (
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
  )
}