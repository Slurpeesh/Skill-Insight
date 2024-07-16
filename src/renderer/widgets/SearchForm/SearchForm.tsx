import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { randomJob } from '@/app/lib/utils'
import getText from '@/app/locale'
import { setData } from '@/app/store/slices/statsSlice'
import {
  setError,
  setInitial,
  setReady,
  setWaiting,
} from '@/app/store/slices/statusSlice'
import { X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

interface ISearchForm {
  searchQueryName: React.MutableRefObject<string>
  searchCountries: React.MutableRefObject<string[]>
}

export default function SearchForm({
  searchQueryName,
  searchCountries,
}: ISearchForm) {
  const [searhQuery, setSearchQuery] = useState('')
  const searchInput = useRef(null)
  const status = useAppSelector((state) => state.status.value)
  const lang = useAppSelector((state) => state.lang.value)
  const countries = useAppSelector((state) => state.countries.value)
  const dispatch = useAppDispatch()

  const placeholder = useMemo(() => getText(lang, randomJob()), [lang])

  async function getStats(searchQuery: string) {
    searchQueryName.current = searchQuery
    searchCountries.current = countries
    const response = await window.api.getStats(searchQuery, lang, countries)
    dispatch(setData(response))
    return response
  }

  async function searchHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    searchInput.current.blur()
    dispatch(setWaiting())
    dispatch(setData({}))
    const response = await getStats(searhQuery.trim())
    if (response.errors) {
      dispatch(setError())
    } else if (response.terminated) {
      dispatch(setInitial())
    } else {
      dispatch(setReady())
    }
  }

  function cancelButtonHandler() {
    window.api.terminate()
    dispatch(setInitial())
  }

  return (
    <form>
      <div className="my-4 flex justify-center gap-2">
        <label htmlFor="searchInput">{getText(lang, 'searchRequest')}:</label>
        <input
          ref={searchInput}
          id="searchInput"
          type="text"
          value={searhQuery}
          placeholder={placeholder}
          className="w-1/4 min-w-40 px-1 border-[1px] border-slate-300 text-black focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="my-2 flex justify-center gap-5">
        <button
          disabled={status === 'waiting'}
          type="submit"
          onClick={(e) => searchHandler(e)}
          className={
            status === 'waiting'
              ? 'px-4 py-2 rounded-xl bg-gray-300'
              : 'px-4 py-2 rounded-xl transition-colors bg-red-400 dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700 active:bg-red-600 dark:active:bg-red-800 focus:outline-none focus:border-red-700 dark:focus:border-red-300 focus:ring-2 focus:ring-red-700 dark:focus:ring-red-300'
          }
        >
          {getText(lang, 'searchButton')}
        </button>
        {status == 'waiting' && (
          <button
            onClick={() => cancelButtonHandler()}
            className="flex justify-center items-center w-10 h-10 rounded-xl transition-colors bg-red-400 dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700 active:bg-red-600 dark:active:bg-red-800 focus-visible:outline-none focus-visible:border-red-700 dark:focus-visible:border-red-300 focus-visible:ring-2 focus-visible:ring-red-700 dark:focus-visible:ring-red-300"
          >
            <X />
          </button>
        )}
      </div>
    </form>
  )
}
