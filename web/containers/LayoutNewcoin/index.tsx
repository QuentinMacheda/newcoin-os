'use client'
import React from 'react'

import EntryScreen from '@/screens/Entry/Home'

const BaseLayoutNewcoin = () => {
  return (
    <div className="flex h-screen w-screen flex-1 overflow-hidden">
      <EntryScreen />
    </div>
  )
}

export default BaseLayoutNewcoin
