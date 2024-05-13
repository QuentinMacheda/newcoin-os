'use client'

import React from 'react'

import Link from 'next/link'

import { useLoadURL } from '@/hooks/useLoadURL'

import ChoiceItem from '@/screens/Entry/ModeChoice/ChoiceItem'

const choicesList = [
  [
    '/jan',
    'Private Mode',
    'Run the OS on your local computer. This mode is not connected to the Internet, which means all the data is private.',
  ],
  [
    'https://os.newcoin.org',
    'Online Mode',
    'Data will be stored on a remote server. You still have control over who can access it and you can decide to monetize your data.',
  ],
]

const EntryChoiceScreen = () => {
  const onClickMode = useLoadURL()

  return (
    <main className="relative min-h-screen">
      <div className="flex h-screen w-screen gap-x-6 p-6">
        <Link href={choicesList[0][0]} className="block h-full w-full">
          <ChoiceItem name={choicesList[0][1]} text={choicesList[0][2]} />
        </Link>
        <button
          onClick={() => {
            onClickMode(choicesList[1][0])
          }}
          className="block h-full w-full"
        >
          <ChoiceItem name={choicesList[1][1]} text={choicesList[1][2]} />
        </button>
      </div>
    </main>
  )
}

export default EntryChoiceScreen
