import { useAppSelector } from '@/app/hooks/useActions'

interface ITextAreaResults {
  searchQueryName: React.MutableRefObject<string>
}

export default function TextAreaResults({ searchQueryName }: ITextAreaResults) {
  const stats = useAppSelector((state) => state.stats.value)
  return (
    <>
      <div className="my-2 font-semibold text-xl">
        Results ({searchQueryName.current})
      </div>
      <div className="my-2 w-2/3 min-w-96 max-h-[300px] overflow-y-auto break-words p-2 px-3 border-2 border-zinc-950 bg-white">
        {stats}
      </div>
    </>
  )
}
