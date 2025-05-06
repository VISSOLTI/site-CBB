function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}    

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
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


function login() {
    load();
    
    const email = form.email().value;
    const password = form.password().value;

    const users = {
        "100@vissol.com.br": { password: "!100_sup_q", page: "paginas_supervisores/sup-100/00_pag.html" },
        "200@vissol.com.br": { password: "*200_sup_w", page: "paginas_supervisores/sup-200/00_pag.html" },
        "250@vissol.com.br": { password: "*250_sup_p", page: "paginas_supervisores/sup-250/00_pag.html" },
        "300@vissol.com.br": { password: "!300_sup_e", page: "paginas_supervisores/sup-300/00_pag.html" },
        "400@vissol.com.br": { password: "*400_sup_r", page: "paginas_supervisores/sup-400/00_pag.html" },
        "500@vissol.com.br": { password: "!500_sup_t", page: "paginas_supervisores/sup-500/00_pag.html" },
        "550@vissol.com.br": { password: "*550_sup_k", page: "paginas_supervisores/sup-550/00_pag.html" },
        "600@vissol.com.br": { password: "!600_sup_j", page: "paginas_supervisores/sup-600/00_pag.html" },
        "700@vissol.com.br": { password: "*700_sup_h", page: "paginas_supervisores/sup-700/00_pag.html" },
        "750@vissol.com.br": { password: "!750_sup_g", page: "paginas_supervisores/sup-750/00_pag.html" },
        "geral00@vissol.com.br": { password: "*010_ger_x", page: "paginas_supervisores/privado-Consolidado/00_pag.html" },
        "101@vissol.com.br": { password: "q101_vend_t", page: "paginas_supervisores/pagina_101.html" },
        "102@vissol.com.br": { password: "g102_vend_u", page: "paginas_supervisores/pagina_102.html" },
        "103@vissol.com.br": { password: "y103_vend_i", page: "paginas_supervisores/pagina_103.html" },
        "105@vissol.com.br": { password: "p105_vend_o", page: "paginas_supervisores/pagina_105.html" },
        "106@vissol.com.br": { password: "m106_vend_p", page: "paginas_supervisores/pagina_106.html" },
        "107@vissol.com.br": { password: "a107_vend_h", page: "paginas_supervisores/pagina_107.html" },

        "000promotores@vissol.com.br": { password: "*-promo_tores!v", page: "paginas_supervisores/promotores/pag_promotores.html" },

        "logistica@skvissol.com.br" : { password: "Jpcbb2204*", page: "paginas_supervisores/NFD/00_pag.html" },
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
        window.location.href = "../../atendimento.html"; // Redireciona para a página padrão
    }
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
    const toggleIcon = document.getElementById('fechado');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.src = 'imagens/aberto.png'; // Replace with the path to your open eye image
    } else {
        passwordField.type = 'password';
        toggleIcon.src = 'imagens/fechado.png'; // Replace with the path to your closed eye image
    }


}

