import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { setCopied, setCopy } from '@/app/store/slices/copySlice'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'
import { ClipboardCheck, ClipboardCopy } from 'lucide-react'
import { MutableRefObject, useRef } from 'react'

export default function TextAreaResults() {
  const stats = useAppSelector((state) => state.stats.value)
  const lang = useAppSelector((state) => state.lang.value)
  const copy = useAppSelector((state) => state.copy.value)
  const dispatch = useAppDispatch()
  const timeoutID: MutableRefObject<ReturnType<typeof setTimeout>> =
    useRef(undefined)

  function copyButtonHandler() {
    navigator.clipboard.writeText(
      JSON.stringify(stats.keySkills).replaceAll(',', ', ')
    )
    dispatch(setCopied())

    if (timeoutID.current) {
      clearTimeout(timeoutID.current)
    }
    timeoutID.current = setTimeout(() => dispatch(setCopy()), 3000)
  }

  return (
    <div className="relative my-2 w-2/3 min-w-[300px] max-h-[300px] overflow-y-auto break-words p-2 px-3 border-2 border-zinc-950 bg-white dark:text-black dark:bg-opacity-90">
      <div className="sticky top-0 right-0 overflow-visible h-0">
        {copy == 'copy' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="float-right" tabIndex={-1}>
                <button
                  onClick={() => copyButtonHandler()}
                  className="p-1 rounded-md bg-slate-300 opacity-20 hover:opacity-85 transition-opacity focus-visible:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 "
                >
                  <ClipboardCopy />
                </button>
                <TooltipContent>
                  <div>{getText(lang, 'copyToClipboard')}</div>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        )}
        {copy == 'copied' && (
          <TooltipProvider>
            <Tooltip open>
              <TooltipTrigger className="float-right" tabIndex={-1}>
                <button
                  onClick={() => copyButtonHandler()}
                  className="p-1 rounded-md bg-green-200 dark:bg-green-300 opacity-85 focus-visible:outline-none focus-visible:ring-2 focus:ring-green-700"
                >
                  <ClipboardCheck />
                </button>
                <TooltipContent>
                  <div>{getText(lang, 'copiedToClipboard')}!</div>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="h-full">
        {JSON.stringify(stats.keySkills).replaceAll(',', ', ')}
      </div>
    </div>
  )
}
