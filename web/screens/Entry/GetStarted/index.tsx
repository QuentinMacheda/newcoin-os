'use client'

import { useAtom, useSetAtom } from 'jotai'

import { EntryViewState } from '@/constants/entryScreens'

import { entryViewStateAtom } from '@/helpers/atoms/App.atom'

const EntryScreen = () => {
  const [entryViewState, setEntryViewState] = useAtom(entryViewStateAtom)

  const onButtonClick = (state: EntryViewState) => {
    if (entryViewState === state) return
    setEntryViewState(state)
  }

  return (
    <div className="flex h-screen w-screen flex-1 overflow-hidden">
      <div className="w-full">
        <button onClick={() => onButtonClick(EntryViewState.ModeChoice)}>
          Get started
        </button>
      </div>
    </div>
  )
}

export default EntryScreen
