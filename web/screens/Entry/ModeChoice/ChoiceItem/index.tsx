import React from 'react'

type Props = {
  name: string
  text: string
}

const ChoiceItem: React.FC<Props> = ({ name, text }) => {
  return (
    <div className="bg-newcoin-gray-bg flex h-full w-full flex-col items-center justify-center gap-y-8 rounded-xl text-center">
      <h3 className="text-2xl">{name}</h3>
      <p className="w-36 text-xs">{text}</p>
    </div>
  )
}

export default ChoiceItem
