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
    
    const email = form.email().value;
    const password = form.password().value;

    const users = {
        "100@vissol.com.br": { password: "!100_sup_q", page: "paginas_supervisores/pagina1.html" },
        "200@vissol.com.br": { password: "*200_sup_w", page: "paginas_supervisores/pagina2.html" },
        "250@vissol.com.br": { password: "*250_sup_p", page: "paginas_supervisores/pagina25.html" },
        "300@vissol.com.br": { password: "!300_sup_e", page: "paginas_supervisores/pagina3.html" },
        "400@vissol.com.br": { password: "*400_sup_r", page: "paginas_supervisores/pagina4.html" },
        "500@vissol.com.br": { password: "!500_sup_t", page: "paginas_supervisores/pagina5.html" },
        "550@vissol.com.br": { password: "*550_sup_k", page: "paginas_supervisores/pagina6.html" },
        "600@vissol.com.br": { password: "!600_sup_j", page: "paginas_supervisores/pagina7.html" },
        "700@vissol.com.br": { password: "*700_sup_h", page: "paginas_supervisores/pagina8.html" },
        "750@vissol.com.br": { password: "!750_sup_g", page: "paginas_supervisores/pagina9.html" },
        "geral00@vissol.com.br": { password: "*010_ger_x", page: "paginas_supervisores/pagina00.html" }
    };

    if (users[email] && users[email].password === password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                hideLoad();
                window.location.href = users[email].page; // Redireciona para a página correspondente
            })
            .catch(error => {
                hideLoad();
                alert(getErrorMessage(error));
            });
    } else {
        hideLoad();
        alert("E-mail ou senha incorretos.");
        window.location.href = "fale-conosco.html"; // Redireciona para a página padrão
    }
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
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
  
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  }

