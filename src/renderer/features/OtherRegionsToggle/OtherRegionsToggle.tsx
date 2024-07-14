import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { ToggleGroupItem } from '@/entities/ToggleGroup/ToggleGroup'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'

export default function OtherRegionsToggle() {
  const lang = useAppSelector((state) => state.lang.value)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <ToggleGroupItem className="w-16 h-16" size="edge" value="1001">
            <div className="w-full h-full bg-white shadow rounded-xl"></div>
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText(lang, 'otherRegions')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
