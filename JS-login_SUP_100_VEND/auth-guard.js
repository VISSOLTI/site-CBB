firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "fale-conosco.html"
   }
})
