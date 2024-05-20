import React, { useEffect, useState } from 'react'

import { useActiveModel } from '@/hooks/useActiveModel'

export default function ModelReload() {
  const { stateModel } = useActiveModel()
  const [loader, setLoader] = useState(0)

  // This is fake loader please fix this when we have realtime percentage when load model
  useEffect(() => {
    if (stateModel.loading) {
      if (loader === 24) {
        setTimeout(() => {
          setLoader(loader + 1)
        }, 250)
      } else if (loader === 50) {
        setTimeout(() => {
          setLoader(loader + 1)
        }, 250)
      } else if (loader === 78) {
        setTimeout(() => {
          setLoader(loader + 1)
        }, 250)
      } else if (loader === 99) {
        setLoader(99)
      } else {
        setLoader(loader + 1)
      }
    } else {
      setLoader(0)
    }
  }, [stateModel.loading, loader])

  if (!stateModel.loading) return null

  return (
    <div className=" mb-1 mt-2 py-2 text-center">
      <div className="bg-newcoin-green/10 text-newcoin-green relative inline-block overflow-hidden rounded-lg px-4 py-2 font-semibold shadow-lg">
        <div
          className="bg-newcoin-green/50 absolute left-0 top-0 h-full"
          style={{ width: `${loader}%` }}
        />
        <span className="relative z-10">
          Reloading model {stateModel.model?.id}
        </span>
      </div>
    </div>
  )
}
