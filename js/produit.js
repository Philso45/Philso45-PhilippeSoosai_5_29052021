//récupération de l'ID de la caméra de la page
const recupID = window.location.search;
const url = new URLSearchParams(recupID);
const id = url.get('id');
console.log(id);

const getCameras = async function() {
     // récupération des données de la camera sélectionnée par son id
    try {
        let response = await fetch('http://localhost:3000/api/cameras/' + id);
        if (response.ok) {
            let camera = await response.json();
            console.log(camera);

            // création de la div de la caméra séléctionné
            const cameraMain = document.getElementById('pageproduit');
            const cameraDiv = document.createElement('div');
            cameraMain.appendChild(cameraDiv);
            cameraDiv.className = 'camera_Info';

            //ajout de l'image à la div de la caméra séléctionné
            const cameraImg = document.createElement('img');
            cameraDiv.appendChild(cameraImg);
            cameraImg.setAttribute('src', camera.imageUrl);
            cameraImg.setAttribute('alt', 'Camera vintage ');

            //création div de fiche produit
            const cameraDivInfo = document.createElement('div');
            cameraDiv.appendChild(cameraDivInfo);
            cameraDivInfo.className = 'camera_info';

            // ajout du nom de la camera
            const cameraH3 = document.createElement('h3');
            cameraDivInfo.appendChild(cameraH3);
            cameraH3.textContent = camera.name;

            // ajout de la description
            const cameradescription = document.createElement('p');
            cameraDivInfo.appendChild(cameradescription);
            cameradescription.textContent = camera.description;

            // ajout du prix
            const cameraPrice = document.createElement('p');
            cameraDivInfo.appendChild(cameraPrice);
            cameraPrice.textContent = "Prix : " + camera.price / 100 + " €" + " TTC";
            cameraPrice.className = 'prixcamera';

            // création choix de lentilles dans une balise form
            const choixlentilles = document.createElement('form');
            cameraDivInfo.appendChild(choixlentilles);
            const choixlentillesDiv = document.createElement('div');
            choixlentilles.appendChild(choixlentillesDiv);
            choixlentillesDiv.className = 'lentilles';

            // création du label à coté du form
            const choix = document.createElement('label');
            choixlentillesDiv.appendChild(choix);
            choix.textContent = "Personnalisez votre lentille : ";
            
            const select = document.createElement('select');
            choixlentillesDiv.appendChild(select);
            /*select.setAttribute('name', "Choix de lentiles de " + camera.name);
            select.setAttribute('id', "select_1 "); A RETIRER SI PAS BESOIN */

            // ajout de la liste des lentilles disponible
            const lentilles = camera.lenses;

            for (i = 0; i < lentilles.length; i++) {
                const lentilleSelect = document.createElement('option');
                select.appendChild(lentilleSelect);
                lentilleSelect.textContent = lentilles[i];
            }
            
            // création bouton ajout panier
            let ajoutpanier = document.createElement('button');
            choixlentilles.appendChild(ajoutpanier);
            ajoutpanier.type = 'submit';
            ajoutpanier.name = 'add';
            ajoutpanier.id = 'submit';
            ajoutpanier.textContent = "Ajouter au panier"

            // récupérations données et envoie au panier
            ajoutpanier.addEventListener("click", function (event) {
                event.preventDefault();//l'action par défaut n'est pas pris en compte si il n'y a pas de clique.

            // stockage des données du/des camera souhaité dans localStorage
                let cameraselect = {
                    nom: camera.name,
                    Id: camera._id,
                    lentilles: select.value,
                    quantité: 1,
                    prix: camera.price / 100,
                };
                console.log(cameraselect);

                let cameralocalstorage = JSON.parse(localStorage.getItem('newArticle'));
                const cameraLenses = select.value;
                if(cameralocalstorage) {
                    cameralocalstorage.push(cameraselect);
                    localStorage.setItem('newArticle', JSON.stringify(cameralocalstorage));
                    console.log(cameralocalstorage);
                    if (window.confirm(camera.name + " " + cameraLenses + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    cameralocalstorage = [];
                    cameralocalstorage.push(cameraselect);
                    localStorage.setItem('newArticle', JSON.stringify(cameralocalstorage));
                    console.log(cameralocalstorage);
                    if (window.confirm(camera.name + " " + cameraLenses + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
            });
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
};

//appel de la fonction getCameras
getCameras();
