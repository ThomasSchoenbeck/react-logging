import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export interface NavContextInterface {
  // activeRoute: string
  // setActiveRoute: (v: string) => void
  // value: {
  activeRoute: string[]
  // setActiveRoute: Dispatch<SetStateAction<string>>
  setActiveRoute: (v: string[]) => void
  // }
}

export const NavContext = createContext({} as NavContextInterface)
// export const NavContext = createContext<Partial<NavContextInterface>>({})
// export const NavContext = createContext({})
// export const NavContext = createContext({
//   activeRoute: [] as string[],
//   setActiveRoute: (v: string[]) => {},
//   // setActiveRoute: (v: string[]) => {} as Dispatch<SetStateAction<string[]>>,
//   // setActiveRoute: Dispatch<SetStateAction<string[]>> => {},
// })

export default function NavStore({ children }) {
  const [activeRoute, setActiveRoute] = useState<string[]>([])

  let location = useLocation()

  useEffect(() => {
    console.log("we are in location", location)

    const routesFromURL = location.pathname.substring(1).split("/")

    setActiveRoute(routesFromURL)
  }, [location])

  // const value = useMemo<{ activeRoute: string; setActiveRoute: Dispatch<SetStateAction<string>> }>(() => ({ activeRoute, setActiveRoute }), [activeRoute])
  // const value = useMemo<{ activeRoute: string[]; setActiveRoute: (v: string[]) => void }>(() => ({ activeRoute, setActiveRoute }), [activeRoute])

  return <NavContext.Provider value={{ activeRoute, setActiveRoute }}>{children}</NavContext.Provider>
}
