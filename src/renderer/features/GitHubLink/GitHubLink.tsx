import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/Tooltip/Tooltip'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import GitHubLogo from './svg/GitHubLogo'

interface IGitHubLink {
  className?: string
}

export default function GitHubLink({ className }: IGitHubLink) {
  const [isVisited, setIsVisited] = useState(false)

  function linkHandler() {
    if (!isVisited) {
      setIsVisited(true)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://github.com/Slurpeesh/Skill-Insight"
            target="_blank"
            onClick={() => linkHandler()}
            className={className}
          >
            <GitHubLogo />
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">
          <a
            href="https://github.com/Slurpeesh/Skill-Insight"
            target="_blank"
            tabIndex={-1}
            onClick={() => linkHandler()}
            className={
              isVisited
                ? 'flex justify-between items-center gap-2 hover:underline hover:underline-offset-4 text-purple-900'
                : 'flex justify-between items-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-900'
            }
          >
            <p>https://github.com/Slurpeesh/Skill-Insight</p>
            <ExternalLink className="w-4 h-4 stroke-[1.5]" />
          </a>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
