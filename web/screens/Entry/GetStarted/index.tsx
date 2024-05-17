'use client'

import { useAtom, useSetAtom } from 'jotai'

import LogoMark from '@/containers/Brand/Logo/Mark'

import Video from '@/containers/Video'

import { EntryViewState } from '@/constants/entryScreens'

import { entryViewStateAtom } from '@/helpers/atoms/App.atom'

const EntryScreen = () => {
  const [entryViewState, setEntryViewState] = useAtom(entryViewStateAtom)

  const onButtonClick = (state: EntryViewState) => {
    if (entryViewState === state) return
    setEntryViewState(state)
  }

  return (
    <main className="relative min-h-screen bg-white">
      <div className="flex items-center justify-center px-6 py-10">
        <Video url="videos/welcome.mp4" />
      </div>
      <div className="absolute bottom-0 w-full p-6">
        <div className="flex w-full items-center justify-between rounded-xl bg-newcoin-gray-bg px-10 py-8">
          <div className="flex items-center gap-x-6">
            <div className="dark:invert">
              <LogoMark width={58} height={58} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase leading-4 dark:text-black">
                Welcome to <br /> Newcoin OS - V ALPHA
              </p>
            </div>
          </div>
          <button
            className="bg-newcoin-blue rounded-full bg-white px-11 py-2 text-base font-medium dark:text-black"
            style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)' }}
            onClick={() => onButtonClick(EntryViewState.ModeChoice)}
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}

export default EntryScreen
