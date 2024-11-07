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
        "101@vissol.com.br": { password: "q101_vend_t", page: "paginas_Sup_100_Vendedores/pagina101.html" },
        "102@vissol.com.br": { password: "g102_vend_u", page: "paginas_Sup_100_Vendedores/pagina102.html" },
        "103@vissol.com.br": { password: "y103_vend_i", page: "paginas_Sup_100_Vendedores/pagina103.html" },
        "105@vissol.com.br": { password: "p105_vend_o", page: "paginas_Sup_100_Vendedores/pagina105.html" },
        "106@vissol.com.br": { password: "m106_vend_p", page: "paginas_Sup_100_Vendedores/pagina106.html" },
        "107@vissol.com.br": { password: "a107_vend_h", page: "paginas_Sup_100_Vendedores/pagina107.html" },
        
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

