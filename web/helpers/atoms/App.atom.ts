import { atom } from 'jotai'

import { MainViewState } from '@/constants/screens'

export const mainViewStateAtom = atom<MainViewState>(MainViewState.GetStarted)

export const defaultJanDataFolderAtom = atom<string>('')
