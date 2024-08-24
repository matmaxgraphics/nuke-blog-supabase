import { useState } from "react"


function Button() {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = ()=>{
        setIsLoading(!isLoading);
    }
  return (
    <div>Button</div>
  )
}

export default Button