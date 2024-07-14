import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { ToggleGroupItem } from '@/entities/ToggleGroup/ToggleGroup'
import KazakhstanFlag from '@/features/KazakhstanFlagToggle/svg/KazakhstanFlag'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'

export default function KazakhstanFlagToggle() {
  const lang = useAppSelector((state) => state.lang.value)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <ToggleGroupItem className="w-16 h-16" size="edge" value="40">
            <KazakhstanFlag />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText(lang, 'kazakhstan')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
