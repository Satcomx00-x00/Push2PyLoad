// définition de l'URL de l'API PyLoad et des identifiants d'accès

const apiUrl = 'http://172.17.0.11:8000/api/addPackage';

const username = 'pyload';
const password = 'pyload';
// ajout d'un écouteur d'événement pour détecter lorsque l'utilisateur a highlighté du texte
document.addEventListener('mouseup', event => {
    // récupération de l'URL highlightée
    const selection = window.getSelection().toString().trim();
    if (selection && isUrl(selection)) {
        // demande du nom du package à l'utilisateur
        const packageName = prompt('Entrez le nom du package :');

        // envoi de l'URL au serveur API PyLoad
        fetch(apiUrl + 'addPackage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            body: JSON.stringify({
                name: packageName,
                links: [selection]
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Lien envoyé avec succès !');
                } else {
                    alert('Erreur lors de l\'envoi du lien : ' + result.error);
                }
            })
            .catch(error => {
                alert('Erreur lors de la communication avec le serveur API : ' + error);
            });
    }
});

// fonction pour vérifier si une chaîne de caractères est une URL valide
function isUrl(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}
