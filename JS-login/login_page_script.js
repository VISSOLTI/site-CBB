function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}    

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}

function login() {
    load();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoad();
        window.location.href ="01home.html";
      }).catch(error => {
        hideLoad();
        alert(getErrorMessage(error))
      });
}

function getErrorMessage(error) { 
    if (error.code  == "auth/invalid-email") {
        return "Digite seu Email"
    }
    if (error.code  == "auth/invalid-credential") {
        return "Usuário não encontrado"
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida"
        }
    if(error.code == "auth/missing-password") {
        return "Digite sua senha"
        }
    return error.message;
}


function isEmailValido() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validarEmail(email)
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validarEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonDisable() {
    const emailValido = isEmailValido();
    form.recoverPassword().disabled = !emailValido;

    const passwordValido = isPasswordValid();
    form.loginButton().disabled = !emailValido || !passwordValido;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;   
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button'),
}

