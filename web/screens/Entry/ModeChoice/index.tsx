'use client'

import Link from 'next/link'

const EntryChoiceScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-1 overflow-hidden">
      <div className="w-full">
        <Link href="/jan">
          <button>Private Mode</button>
        </Link>
        <button>Online Mode</button>
      </div>
    </div>
  )
}

export default EntryChoiceScreen
