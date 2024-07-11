import { useAppSelector } from '@/app/hooks/useActions'
import * as en from '@/app/locale/en.json'
import * as ru from '@/app/locale/ru.json'
import Loader from '@/entities/Loader/Loader'
import ThemeButton from '@/entities/ThemeButton/ThemeButton'
import SelectLang from '@/features/SelectLang/SelectLang'
import Diagram from '@/widgets/Diagram/Diagram'
import SearchForm from '@/widgets/SearchForm/SearchForm'
import TextAreaResults from '@/widgets/TextAreaResults/TextAreaResults'
import { useRef } from 'react'

export default function App() {
  const status = useAppSelector((state) => state.status.value)
  const stats = useAppSelector((state) => state.stats.value)
  const lang = useAppSelector((state) => state.lang.value)
  const searchQueryName = useRef('')

  return (
    <div className="p-5 bg-slate-200 dark:bg-slate-900 dark:text-slate-200 max-w-screen min-h-screen">
      <div className="text-3xl font-bold text-center">Skill Insight</div>
      <ThemeButton className="absolute top-5 right-5 p-2 w-10 h-10 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-700" />
      <SelectLang
        classNameTrigger="absolute top-5 right-20 w-30 dark:bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-red-700"
        classNameContent="w-10 text-slate-900 dark:text-slate-200 dark:bg-slate-700 border-none"
      />
      <SearchForm searchQueryName={searchQueryName} />
      <div className="flex justify-center flex-col items-center mx-20 my-2">
        {status == 'waiting' && (
          <>
            <Loader />
            <div className="my-2">
              {lang == 'en' ? en.waitStats : ru.waitStats}
            </div>
          </>
        )}
        {(status == 'error' || status == 'ready') && (
          <div className="my-2 font-semibold text-xl">
            {lang == 'en' ? en.results : ru.results} ({searchQueryName.current})
          </div>
        )}
        {status == 'error' && (
          <div className="text-rose-600 text-lg lg:text-2xl font-bold text-center min-w-20">
            {lang == 'en' ? en.error : ru.error}: {stats}
          </div>
        )}
        {status == 'ready' && (
          <>
            <TextAreaResults />
            {stats !== '{}' && (
              <div className="mb-2 min-w-[400px] w-3/4 h-[500px] md:h-[600px]">
                <Diagram
                  title={
                    lang == 'en'
                      ? 'Number of key skills in vacancies'
                      : 'Число ключевых навыков в вакансиях'
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
