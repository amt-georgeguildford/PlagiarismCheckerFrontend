type ServerError={
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

export default ServerError