import { useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { ToggleGroupItem } from '@/entities/ToggleGroup/ToggleGroup'
import KyrgyzstanFlag from '@/features/KyrgyzstanFlagToggle/svg/KyrgyzstanFlag'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'

export default function KyrgyzstanFlagToggle() {
  const lang = useAppSelector((state) => state.lang.value)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <ToggleGroupItem className="w-16 h-16" size="edge" value="48">
            <KyrgyzstanFlag />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText(lang, 'kyrgyzstan')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
