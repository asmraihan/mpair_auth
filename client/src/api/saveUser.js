

export const saveUser = async(user) => {
     const res = await fetch(`http://localhost:5000/users`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        const data = await res.json()
        return data
}