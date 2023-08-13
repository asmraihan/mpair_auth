

export function saveUserToLocalStorage(user) {
    // Convert the user object to a JSON string

    const name = user.name;
    const email = user.email;

    const userSafe = {
        name,
        email
    }
    
    const userJSON = JSON.stringify(userSafe);

    // Save the JSON string to localStorage under a specific key
    localStorage.setItem('user', userJSON);
}


export function getUserFromLocalStorage() {
    // Get the JSON string from localStorage
    const userJSON = localStorage.getItem('user');

    // Parse the JSON string back to an object
    const user = JSON.parse(userJSON);

    return user;
}


export function clearUserFromLocalStorage() {
    localStorage.removeItem('user');
}