import React, { useEffect, useState } from 'react'

import { useActiveModel } from '@/hooks/useActiveModel'

export default function ModelStart() {
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
      } else if (loader === 85) {
        setLoader(85)
      } else {
        setLoader(loader + 1)
      }
    } else {
      setLoader(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateModel.loading, loader])

  if (!stateModel.loading) return null

  return (
    <div className=" mb-1 mt-2 py-2 text-center">
      <div className="bg-newcoin-green/10 text-newcoin-green relative inline-block overflow-hidden rounded-lg px-4 py-2 font-semibold shadow-lg">
        <div
          className="bg-newcoin-green/50 absolute left-0 top-0 h-full"
          style={{ width: `${loader}%` }}
          data-testid="model-loader"
        />
        <span className="relative z-10">
          {stateModel.state === 'start' ? 'Starting' : 'Stopping'}
          &nbsp;model&nbsp;
          {stateModel.model?.id}
        </span>
      </div>
    </div>
  )
}
