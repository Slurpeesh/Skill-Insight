import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { ToggleGroupItem } from '@/entities/ToggleGroup/ToggleGroup'
import UzbekistanFlag from '@/features/UzbekistanFlagToggle/svg/UzbekistanFlag'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'

export default function UzbekistanFlagToggle() {
  const lang = useAppSelector((state) => state.lang.value)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <ToggleGroupItem className="w-16 h-16" size="edge" value="97">
            <UzbekistanFlag />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText(lang, 'uzbekistan')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
