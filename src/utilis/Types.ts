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
    setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
}