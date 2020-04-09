import React from "react"

export const PureThing = ({text, onClick}:{text: string, onClick: () => void}) => <div onClick={onClick}>
  {text}
</div>
