import React, {createContext, useState} from 'react'
import { DashDataContextType } from '../utilis/Types'

const InitialContext= createContext({} as DashDataContextType)

const DashDataContextProvider = ({children}: {children: React.ReactNode}) => {
    const [dashBoardPage, setDashBoardPage] = useState("")
  return (
    <InitialContext.Provider value={{dashBoardPage,setDashBoardPage}}>
            {children}
    </InitialContext.Provider>
  )
}

export default DashDataContextProvider