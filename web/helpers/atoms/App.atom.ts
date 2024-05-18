import { atom } from 'jotai'

import { MainViewState } from '@/constants/screens'

let defaultMainViewstate = MainViewState.GetStarted

if (!localStorage.getItem('firstLaunch')) {
  localStorage.setItem('firstLaunch', 'true')
} else {
  if (localStorage.getItem('firstLaunch') === 'false') {
    defaultMainViewstate = MainViewState.Thread
  } else {
    defaultMainViewstate = MainViewState.GetStarted
  }
}

export const mainViewStateAtom = atom<MainViewState>(defaultMainViewstate)

export const defaultJanDataFolderAtom = atom<string>('')
