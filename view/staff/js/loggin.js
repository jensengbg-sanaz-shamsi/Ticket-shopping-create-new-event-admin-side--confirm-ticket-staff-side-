const loginButton = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');

function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}

//Check the credentials to login
async function login(username, password) {
    const url = 'http://localhost:4000/auth/login';

    const account = {
        username: username,
        password: password
    }

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return await data;
}

//When the user is logged in
async function loggedin() {
    const token = getToken();
    const url = 'http://localhost:4000/auth/loggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    });
    const data = await response.json();
    return await data;
}


//Send the user to correct page when logged in, otherwise send error
loginButton.addEventListener('click', async () => {
    const username = inputUser.value;
    const password = inputPass.value;    

    let loggedin = await login(username, password);

    if (!loggedin.success) {
        document.querySelector('#errormessage').classList.toggle('hide');
    } else if (loggedin.success && loggedin.role === 'admin') {
        saveToken(loggedin.token);
        setTimeout(() => {
            location.href = 'http://localhost:4000/admin/admin.html'
        }, 100);
    }
    else {
        saveToken(loggedin.token);
        setTimeout(() => {
            location.href = 'http://localhost:4000/staff/verify.html';
        }, 100);
    }
});

loggedin();