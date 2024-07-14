import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { ToggleGroupItem } from '@/entities/ToggleGroup/ToggleGroup'
import RussianFlag from '@/features/RussianFlagToggle/svg/RussianFlag'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'

export default function RussianFlagToggle() {
  const lang = useAppSelector((state) => state.lang.value)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <ToggleGroupItem className="w-16 h-16" size="edge" value="113">
            <RussianFlag />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText(lang, 'russia')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
