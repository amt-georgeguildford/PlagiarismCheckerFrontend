export type ServerError={
    status: string
    message: string | MessageSeries[]
}  

interface MessageSeries{
    type: string,
    value: string
    msg: string
    path: string
    location: string
}

export type Department={
    id: string
    name: string
}

export type Context={
    departments: Department[],
    setDepartments: React.Dispatch<React.SetStateAction<Department[]>>,
    userVerified: boolean, 
    setUserVerified: React.Dispatch<React.SetStateAction<boolean>>
    userAccount: UserAccount, 
    setUserAccount: React.Dispatch<React.SetStateAction<UserAccount>>
}

export type NewUserFormChange={
    firstname: boolean
    lastname: boolean
    email: boolean
    number: boolean
    qualification: boolean
    department: boolean
}
export type NewUserFormChangeStudent={
    firstname: boolean
    lastname: boolean
    email: boolean
    number: boolean
    department: boolean
}

export type UserAccount={
    id: string,
    email: string,
    role: 'ADMIN' | 'LECTURER' | 'STUDENT'
    isverified: boolean

}