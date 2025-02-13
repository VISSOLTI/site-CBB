
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../atendimento.html"
    }).catch(() => {
        alert("Erro ao fazer logOut")
    })
}


function formatDate(data) {
    return new Date(data).toLocaleDateString('pt-br')
}

