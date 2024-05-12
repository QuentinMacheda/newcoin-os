import React from 'react'

type Props = {
  name: string
  text: string
}

const ChoiceItem: React.FC<Props> = ({ name, text }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  )
}

export default ChoiceItem
