import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { randomJob } from '@/app/lib/utils'
import getText from '@/app/locale'
import { setData } from '@/app/store/slices/statsSlice'
import { setError, setReady, setWaiting } from '@/app/store/slices/statusSlice'
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
    const response = await getStats(searhQuery.trim())
    target.disabled = false
    if (response.errors) {
      dispatch(setError())
    } else {
      dispatch(setReady())
    }
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
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          onClick={(e) => searchHandler(e)}
          className={
            status === 'waiting'
              ? 'font-semibold px-4 py-2 rounded-xl bg-gray-300'
              : 'font-semibold px-4 py-2 rounded-xl transition-colors bg-red-400 dark:bg-red-600 hover:bg-red-300 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700 focus:outline-none focus:border-red-700 dark:focus:border-red-300 focus:ring-2 focus:ring-red-700 dark:focus:ring-red-300'
          }
        >
          {getText(lang, 'searchButton')}
        </button>
      </div>
    </form>
  )
}
