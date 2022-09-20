export const userService = {
    login,
    logout,
    getLoggedInUser
}

var gUser = '';
const STORAGE_KEY = 'username'
const API_LOGIN = 'api/login'
const API_LOGOUT = 'api/logout'
function login(userName) {
    var gUser = userName
    // var possibleUser = getLoggedInUser()
    // if(possibleUser === null){
    //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userName));
    //     return axios.post(API_LOGIN, {username:userName}).then((res) => res.data);
    // }
    // else{
    //     gUser = possibleUser
    //     return axios.post(API_LOGIN, {username:possibleUser}).then((res) => res.data);
    // }

    return axios.post(API_LOGIN, { username: userName }).then((res) => res.data).then(user => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    });
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function logout() {
    // var userName = gUser
    // gUser = ''
    sessionStorage.removeItem(STORAGE_KEY);
    return axios.post(API_LOGOUT)//.then((res) => res.data);
}



//   function getLoggedInUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
//   }
