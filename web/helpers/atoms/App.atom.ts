import { atom } from 'jotai'

import { EntryViewState } from '@/constants/entryScreens'
import { MainViewState } from '@/constants/screens'

export const mainViewStateAtom = atom<MainViewState>(MainViewState.Thread)

export const entryViewStateAtom = atom<EntryViewState>(
  EntryViewState.GetStarted
)

export const defaultJanDataFolderAtom = atom<string>('')
