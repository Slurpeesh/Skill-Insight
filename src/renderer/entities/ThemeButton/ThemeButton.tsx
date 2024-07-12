import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { setDark, setLight } from '@/app/store/slices/themeSlice'

interface IThemeButton {
  className?: string
}

export default function ThemeButton({ className }: IThemeButton) {
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()

  function changeThemeHandler() {
    window.api.changeTheme()
    if (theme == 'dark') {
      dispatch(setLight())
    } else {
      dispatch(setDark())
    }
  }

  return (
    <button className={className} onClick={() => changeThemeHandler()}>
      {theme == 'light' ? (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-slate-900 stroke-2"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 2V4" strokeLinecap="round" />
          <path d="M12 20V22" strokeLinecap="round" />
          <path d="M4 12L2 12" strokeLinecap="round" />
          <path d="M22 12L20 12" strokeLinecap="round" />
          <path d="M19.7778 4.22266L17.5558 6.25424" strokeLinecap="round" />
          <path d="M4.22217 4.22266L6.44418 6.25424" strokeLinecap="round" />
          <path d="M6.44434 17.5557L4.22211 19.7779" strokeLinecap="round" />
          <path d="M19.7778 19.7773L17.5558 17.5551" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-slate-200"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        </svg>
      )}
    </button>
  )
}
