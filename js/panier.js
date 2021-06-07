//récupération données localStorage
let camerastorage = JSON.parse(localStorage.getItem('newArticle'));
console.log(camerastorage);

// création de la page panier
const cameraOne = document.getElementById('page_produit');
const cameraDiv = document.createElement('div');
cameraOne.appendChild(cameraDiv);
cameraDiv.className = 'camera_Info';

const cameraDivCart = document.createElement('div');
cameraDiv.appendChild(cameraDivCart);
cameraDivCart.className = 'camera_cart';

if(camerastorage == null || camerastorage.length === 0){
    // si le panier est vide 
    const emptyCart = document.createElement('p');
    cameraDivCart.appendChild(emptyCart);
    emptyCart.className = "empty_cart";
    emptyCart.textContent = "Panier vide ! Ajouter des produits à votre panier. "
} else {
    // si des éléments sont présents dans le panier : récupération des éléments du panier
    let i = 0;
    for (cameraStorage of camerastorage) {
        const eachcamera = document.createElement('div');
        cameraDivCart.appendChild(eachcamera);
        eachcamera.className = 'each_camera';
        
        //Récupération de la quantité, nom de la caméra et choix de lentilles
        const camerasCart = document.createElement('p');
        eachcamera.appendChild(camerasCart);
        camerasCart.textContent = cameraStorage.quantité + " " + cameraStorage.nom + " , " + cameraStorage.lentilles;

        // Récupératio et affichage du prix dans la div prix_caméra
        const cameraPrice = document.createElement('div');
        eachcamera.appendChild(cameraPrice);
        cameraPrice.className = 'prix_camera';
        cameraPrice.id = i++;

        // Affichage du TTC
        const price = document.createElement('p');
        cameraPrice.appendChild(price);
        price.textContent = cameraStorage.prix + " €" + " TTC"

        // création bouton suppression du produit
        const supprbutton = document.createElement('button');
        cameraPrice.appendChild(supprbutton);
        supprbutton.className = 'suppr_button';

        // Ajout du font awesome croix pour supprimer le produit
        const iconButton = document.createElement('i');
        supprbutton.appendChild(iconButton);
        iconButton.className = "fas fa-times";

    };

    // on récupére l'article associé au bouton croix
    let supprbutton = document.getElementsByClassName('suppr_button');
    for (let i = 0 ; i < supprbutton.length; i++) {
        supprbutton[i].addEventListener('click' , function (event) { 
            event.preventDefault();
            let id = this.closest('.prix_camera').id;

            //on supprime l'article du localStorage
            camerastorage.splice(id, 1);

            //on enregistre le nouveau localStorage
            localStorage.setItem('newArticle', JSON.stringify(camerastorage));
            JSON.parse(localStorage.getItem('newArticle'));

            alert('Produit supprimé !');
            window.location.href = "panier.html";   
        }); 
    };

    //calcul du montant total
    let calculPrice = []
    for (cameraStorage of camerastorage) {
        let article = cameraStorage.prix;
        calculPrice.push(article);
    };

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = calculPrice.reduce(reducer, 0);
    console.log(totalPrice);

    const total = document.createElement('p');
    cameraDivCart.appendChild(total);
    total.className = 'total';
    total.textContent = "Montant total : " + totalPrice + " €" + " TTC";

    //création d'un bouton pour supprimer les articles du panier
    const suppression = document.createElement('button');
    cameraDivCart.appendChild(suppression);
    suppression.className = 'button_suppression';

    //Création d'un lien sur le boutton supprimer et son libellé
    const cartLink = document.createElement('a');
    suppression.appendChild(cartLink);
    cartLink.href = "panier.html";
    cartLink.id = "cart_link"
    cartLink.textContent = "Supprimer mes articles";

    // Event supprimer les articles du panier avec redirection vers page panier.html
    suppression.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem('newArticle');
        alert('Votre panier a été supprimé !')
        window.location.href = "panier.html";
    });

    //création du formulaire de commande
    const form = document.createElement('form');
    form.className = 'contact_form';
    cameraDivCart.appendChild(form);

    const camerah33 = document.createElement('h3');
    form.appendChild(camerah33);
    camerah33.textContent = "Veuillez compléter le formulaire de commande ";

    // création fonctions de validité prénom, nom, ville
    function isValid(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    };

    // création fonctions de validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    };

    // création fonctions de validité mail
    function validMail(value){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    };

    // ajout formulaire "prénom"
    const divFirstName = document.createElement('div');
    form.appendChild(divFirstName);
    divFirstName.className = 'div_name';

    const labelFirstName = document.createElement('label');
    divFirstName.appendChild(labelFirstName);
    labelFirstName.setAttribute('for', 'prénom');
    labelFirstName.textContent = 'Prénom : ';

    //Input type text
    const firstName = document.createElement('input');
    divFirstName.appendChild(firstName);
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('class', 'name');
    firstName.name = "Prénom"
    firstName.required = true;

    // Vérification de la validité du prénom
    firstName.addEventListener("change", function (event) {
        if (isValid(firstName.value)) {
        } else {
            alert( "Caractère spécial non autorisé")
            event.preventDefault()
        }
    });

    // ajout formulaire "nom"
    const divLastName = document.createElement('div');
    form.appendChild(divLastName);
    divLastName.className = 'div_name';

    const labelLastName = document.createElement('label');
    divLastName.appendChild(labelLastName);
    labelLastName.setAttribute('for', 'nom');
    labelLastName.textContent = 'Nom : ';
    
    //Input type text
    const lastName = document.createElement('input');
    divLastName.appendChild(lastName);
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('class', 'name');
    lastName.name = "Nom"
    lastName.required = true;

    // Vérification de la validité du nom
    lastName.addEventListener("change", function (event) {
        if (isValid(lastName.value)) {
        } else {
            alert("Caractère spécial non autorisé")
            event.preventDefault()
        }
    });

    // ajout formulaire "adresse"
    const Adresse = document.createElement('div');
    form.appendChild(Adresse);
    Adresse.className = 'div_name';

    const labelAdress = document.createElement('label');
    Adresse.appendChild(labelAdress);
    labelAdress.setAttribute('for', 'adresse');
    labelAdress.textContent = 'Adresse de livraison : ';

    //Textarea 
    const address = document.createElement('textarea');
    Adresse.appendChild(address);
    address.setAttribute('type', 'text');
    address.setAttribute('class', 'name');
    address.name = "Adresse"
    address.required = true;

    // Vérification de la validité de l'adresse
    address.addEventListener("change", function (event) {
        if (validAddress(address.value)){
        } else {
            
        }
    });

    // ajout formulaire "ville"
    const ville = document.createElement('div');
    form.appendChild(ville);
    ville.className = 'div_name';

    const labelville = document.createElement('label');
    ville.appendChild(labelville);
    labelville.setAttribute('for', 'ville');
    labelville.textContent = 'Votre ville : ';

    //Input type text
    const villa = document.createElement('input');
    ville.appendChild(villa);
    villa.setAttribute('type', 'text');
    villa.setAttribute('class', 'name');
    villa.name = "Ville"
    villa.required = true;

    // Vérification de la validité de la ville
    villa.addEventListener("change", function (event) {
        if (isValid(villa.value)) {
        } else {
            alert("Caractère spécial non autorisé")
            event.preventDefault()
        }
    });

    // ajout formulaire "email"
    const email = document.createElement('div');
    form.appendChild(email);
    email.className = 'div_name';

    const labelEmail = document.createElement('label');
    email.appendChild(labelEmail);
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = 'Votre adresse mail : ';

    //Input type mail
    const mail = document.createElement('input');
    email.appendChild(mail);
    mail.setAttribute('type', 'email');
    mail.setAttribute('class', 'name');
    mail.name = "Adresse mail"
    mail.required = true;

    // Vérification de la validité du mail
    mail.addEventListener("change", function (event) {
        if (validMail(mail.value)){
        } else {
            event.preventDefault()
            alert("Veuillez saisir une adresse email valide");
        }
    });

    // création bouton validation
    const validation = document.createElement('div');
    form.appendChild(validation);
    validation.className = 'div_name';

    let soumettre = document.createElement('button');
    validation.appendChild(soumettre);
    soumettre.type = 'soumettre';
    soumettre.name = 'add';
    soumettre.id = 'valid';
    soumettre.textContent = "Commander";

    // envoie des données panier + contact au serveur si le formulaire est valide
    soumettre.addEventListener("click", function (event) {
        if(isValid(firstName.value) && isValid(lastName.value) && validAddress(address.value) && isValid(villa.value) && validMail(mail.value)){
            event.preventDefault();

            // envoie du prix total au localStorage
            localStorage.setItem('totalPrice', totalPrice);
            const storagePrice = localStorage.getItem('totalPrice');
            console.log(storagePrice);

            //Création de l'objet "contact"
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                villa: villa.value,
                email: mail.value,
            }
            console.log(contact);

            // création du tableau products (id des caméras)
            let products = [];
            for (cameraStorage of camerastorage) {
                let productsId = cameraStorage.cameraId;
                products.push((productsId));
            }
            console.log(products);

            // création d'un objet regroupant contact et produits
            let send = {
                contact,
                products,
            }
            console.log(send);

            // envoie des données au serveur
            const post = async function (data){
                try {
                    let response = await fetch('http://localhost:3000/api/cameras', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if(response.ok) {
                        let data = await response.json();
                        console.log(data.orderId);
                        localStorage.setItem("responseOrder", data.orderId);
                        window.location = "confirmation.html";
                        localStorage.removeItem("newArticle");

                    } else {
                        event.preventDefault();
                        console.error('Retour du serveur : ', response.status);
                        alert('Erreur rencontrée : ' + response.status);
                    } 
                } catch (error) {
                    alert("Erreur : " + error);
                } 
            };
            post(send);
        }
    });
};