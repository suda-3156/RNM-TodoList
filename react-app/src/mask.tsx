import { useAtom } from "jotai"
import { historyAtom } from "./store"
import { animated, useSpring } from "@react-spring/web"

export const Mask = () => {
  const [ toggle, setToggle ] = useAtom(historyAtom)

  const handleToggle = () => {
    setToggle(prev => !prev)
  }

  const styles = useSpring({
    opacity: toggle ? 0.2 : 0,

  })

  return (
    <animated.div 
      style={styles} 
      className={toggle? "absolute top-0 right-0 w-screen h-screen z-10 bg-black": "absolute top-0 right-0 w-screen h-screen z-10 bg-black hidden"} 
      onClick={handleToggle}
    />
  )
}