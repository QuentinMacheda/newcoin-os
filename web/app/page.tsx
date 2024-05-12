import React from 'react'

import EntryContainer from '@/containers/EntryContainer'

import Providers from '@/containers/Providers'

export default function Page() {
  return (
    <Providers>
      <EntryContainer />
    </Providers>
  )
}
