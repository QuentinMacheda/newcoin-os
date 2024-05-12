'use client'
import React from 'react'

import { useAtomValue } from 'jotai'

import { EntryViewState } from '@/constants/entryScreens'

import GetStartedScreen from '@/screens/Entry/GetStarted'
import ModeChoiceScreen from '@/screens/Entry/ModeChoice'

import { entryViewStateAtom } from '@/helpers/atoms/App.atom'

const EntryContainer: React.FC = () => {
  const entryViewState = useAtomValue(entryViewStateAtom)

  let children = null

  switch (entryViewState) {
    case EntryViewState.GetStarted:
      children = <GetStartedScreen />
      break

    case EntryViewState.ModeChoice:
      children = <ModeChoiceScreen />
      break

    default:
      children = <GetStartedScreen />
      break
  }

  return children
}

export default EntryContainer
