const saveToken= (token:{accessToken: string; refreshToken: string})=>{
    localStorage.setItem('accessToken', token.accessToken)
    localStorage.setItem('accessToken', token.refreshToken)
}

const retrieveaccessToken= ()=>{
    return {
        headers:{
            "authorization": `session ${localStorage.getItem('accessToken')}`
        }
    }
}

export {saveToken, retrieveaccessToken}