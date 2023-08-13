

export const getUsers = async()=>{
    const response = await fetch(`http://localhost:5000/users`)
    const data = await response.json()
    return data
}


export const getSingleUser = async(email, password)=>{
    const response = await fetch(`http://localhost:5000/users/${email}/${password}`)
    const data = await response.json()
    return data
}