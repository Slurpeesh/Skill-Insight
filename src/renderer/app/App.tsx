import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import Loader from '@/entities/Loader/Loader'
import ThemeButton from '@/entities/ThemeButton/ThemeButton'
import SelectLang from '@/features/SelectLang/SelectLang'
import Diagram from '@/widgets/Diagram/Diagram'
import SearchForm from '@/widgets/SearchForm/SearchForm'
import TextAreaResults from '@/widgets/TextAreaResults/TextAreaResults'
import ToggleGroupCountries from '@/widgets/ToggleGroupCountries/ToggleGroupCountries'
import { useRef } from 'react'
import { decodeCountry } from './lib/utils'

export default function App() {
  const status = useAppSelector((state) => state.status.value)
  const stats = useAppSelector((state) => state.stats.value)
  const lang = useAppSelector((state) => state.lang.value)
  const searchQueryName = useRef('')
  const searchCountries = useRef([])

  return (
    <div className="p-5 bg-slate-200 dark:bg-slate-900 dark:text-slate-200 max-w-screen min-h-screen">
      <div className="text-3xl font-bold text-center mb-4">Skill Insight</div>
      <ThemeButton className="absolute top-5 right-5 p-2 w-10 h-10 rounded-full transition-colors hover:bg-slate-300 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700" />
      <SelectLang
        classNameTrigger="absolute top-5 right-20 w-30 dark:bg-slate-700 border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
        classNameContent="w-10 text-slate-900 dark:text-slate-200 dark:bg-slate-700 border-none"
      />
      <ToggleGroupCountries />
      <SearchForm
        searchQueryName={searchQueryName}
        searchCountries={searchCountries}
      />
      <div className="flex justify-center flex-col items-center mx-20 my-2">
        {status == 'waiting' && (
          <>
            <Loader />
            <div className="my-2">{getText(lang, 'waitStats')}</div>
          </>
        )}
        {(status == 'error' || status == 'ready') && (
          <>
            <div className="my-2 font-semibold text-xl">
              {getText(lang, 'results')} ({searchQueryName.current})
            </div>
            <div className="font-medium text-base text-center">
              {getText(lang, 'fromCountries')}:{' '}
              {searchCountries.current.length
                ? searchCountries.current
                    .map((id) => {
                      const key = decodeCountry(id)
                      return getText(lang, key)
                    })
                    .join(', ')
                : getText(lang, 'allRegions')}
            </div>
          </>
        )}
        {status == 'error' && (
          <div className="text-rose-600 text-lg lg:text-2xl font-bold text-center min-w-20">
            {getText(lang, 'error')}: {stats}
          </div>
        )}
        {status == 'ready' && (
          <>
            <TextAreaResults />
            {stats !== '{}' && (
              <div className="mb-2 min-w-[400px] w-3/4 h-[500px] md:h-[600px]">
                <Diagram title={getText(lang, 'diagramTitle')} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
