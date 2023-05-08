import React, {createContext, useState} from 'react'
import { Context, Department } from '../utilis/Types'


export const InitialContext= createContext({} as Context)
const DataContext = ({children}: {children: React.ReactNode}) => {
    const [departments, setDepartments] = useState<Department[]>([])
  return (
    <InitialContext.Provider value={{departments, setDepartments}}>
        {children}
    </InitialContext.Provider>
  )
}

export default DataContext