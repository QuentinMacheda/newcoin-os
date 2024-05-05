import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@janhq/uikit'
import { useAtomValue } from 'jotai'

import { FaGithub, FaDiscord } from 'react-icons/fa'

import DownloadingState from '@/containers/Layout/BottomBar/DownloadingState'

import CommandListDownloadedModel from '@/containers/Layout/TopBar/CommandListDownloadedModel'
import ProgressBar from '@/containers/ProgressBar'

import { appDownloadProgress } from '@/containers/Providers/Jotai'

import ImportingModelState from './ImportingModelState'
import InstallingExtension from './InstallingExtension'
import SystemMonitor from './SystemMonitor'
import UpdatedFailedModal from './UpdateFailedModal'

const menuLinks = [
  {
    name: 'Discord',
    icon: <FaDiscord size={20} className="flex-shrink-0" />,
    link: 'https://discord.gg/FTk2MvZwJH',
  },
  {
    name: 'Github',
    icon: <FaGithub size={16} className="flex-shrink-0" />,
    link: 'https://github.com/janhq/jan',
  },
]

const BottomBar = () => {
  const progress = useAtomValue(appDownloadProgress)

  return (
    <div className="fixed bottom-0 left-16 z-50 flex h-12 w-[calc(100%-64px)] items-center justify-between border-t border-border bg-background/80 px-3">
      <div className="flex flex-shrink-0 items-center gap-x-2">
        <div className="flex items-center space-x-2">
          {progress && progress > 0 ? (
            <ProgressBar total={100} used={progress} />
          ) : null}
        </div>
        <ImportingModelState />
        <DownloadingState />
        <UpdatedFailedModal />
        <InstallingExtension />
      </div>
      <div className="flex items-center gap-x-3">
        <SystemMonitor />
      </div>
      <CommandListDownloadedModel />
    </div>
  )
}

export default BottomBar
