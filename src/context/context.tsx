import React, {createContext, useState} from 'react'
import { Context, Department, UserAccount } from '../utilis/Types'


export const InitialContext= createContext({} as Context)
const DataContext = ({children}: {children: React.ReactNode}) => {
    const [departments, setDepartments] = useState<Department[]>([])
    const [userVerified, setUserVerified] = useState(false)
    const [userAccount, setUserAccount] = useState({} as UserAccount)
  return (
    <InitialContext.Provider value={{departments, setDepartments, userVerified, setUserVerified, userAccount,setUserAccount}}>
        {children}
    </InitialContext.Provider>
  )
}

export default DataContext