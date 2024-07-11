import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { setData } from '@/app/store/statsSlice'
import { setError, setReady, setWaiting } from '@/app/store/statusSlice'
import { useRef, useState } from 'react'

interface ISearchForm {
  searchQueryName: React.MutableRefObject<string>
}

export default function SearchForm({ searchQueryName }: ISearchForm) {
  const [searhQuery, setSearchQuery] = useState('')
  const searchInput = useRef(null)
  const status = useAppSelector((state) => state.status.value)
  const dispatch = useAppDispatch()

  async function getStats(searchQuery: string) {
    searchQueryName.current = searchQuery
    const response = await window.api.getStats(searchQuery)
    dispatch(setData(JSON.stringify(response).replaceAll(',', ', ')))
    return response
  }

  async function searchHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    searchInput.current.blur()
    dispatch(setWaiting())
    const target = e.currentTarget
    target.disabled = true
    const response = await getStats(searhQuery)
    target.disabled = false
    if (response.errors) {
      dispatch(setError())
    } else {
      dispatch(setReady())
    }
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
          className="w-1/4 min-w-40 px-1 border-[1px] border-black text-black focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          onClick={(e) => searchHandler(e)}
          className={
            status === 'waiting'
              ? 'font-semibold px-4 py-2 rounded-xl bg-gray-300'
              : 'font-semibold px-4 py-2 rounded-xl bg-red-300 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-600 active:bg-red-500 dark:active:bg-red-700 focus:outline-none focus:border-red-700 dark:focus:border-red-300 focus:ring-2 focus:ring-red-700 dark:focus:ring-red-300'
          }
        >
          Search
        </button>
      </div>
    </form>
  )
}
