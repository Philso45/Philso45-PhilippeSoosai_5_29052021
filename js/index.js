const getCameras =  async function() {
    //récupération des données de l'API 
    try {
        let response = await fetch('http://localhost:3000/api/cameras/');
        if (response.ok) {
            let cameras = await response.json();
            console.log(cameras);

            for (let camera of cameras) {
                const camerasDiv = document.getElementById('cameras');

        ///////////////////CREATION DE MON CONTENU POUR CHAQUE SECTION////////////////////

                //création de plusieurs sections avec la class = "camera" pour chaque produit de mon tableau JSON
                const camerasSection = document.createElement('section');
                camerasDiv.appendChild(camerasSection);
                camerasSection.className = 'camera';
        
                //création des liens vers ma page produit.html pour chaque sections en récupérant l'iD de chaque référence
                const lien_produit = document.createElement("a");
                lien_produit.href = "produit.html?id=" + camera._id;
                camerasSection.appendChild(lien_produit);
        
                //ajout image camera + src, alt
                const cameraImg = document.createElement('img');
                lien_produit.appendChild(cameraImg);
                cameraImg.setAttribute('src', camera.imageUrl);
                cameraImg.setAttribute('alt', 'camera vintage ');
                
        
                //création de la div camerasInfo qui vas regrouper les informations concernant mon produit 
                const camerasInfo = document.createElement('div');
                lien_produit.appendChild(camerasInfo);
                camerasInfo.className = 'cameras_Info';
        
                //création h3 pour le titre de mon produit
                const h3camerasInfo = document.createElement('h3');
                camerasInfo.appendChild(h3camerasInfo);
                h3camerasInfo.textContent = camera.name;
        
                //création d'un "p" pour afficher le prix diviser par 100 pour arriver sur un prix normal
                const pcamerasInfo = document.createElement('p');
                camerasInfo.appendChild(pcamerasInfo);
                pcamerasInfo.textContent = camera.price / 100 + " €";

                //création d'un p pour la descrpition de chaque réference
                const dcamerasInfo = document.createElement("p")
                camerasInfo.appendChild(dcamerasInfo)
                dcamerasInfo.textContent = camera.description;
                
                //création du bouton en savoir plus qui mène directement vers produit.html
                const buttoncamerasInfo = document.createElement('button');
                const tcamerasInfo = document.createTextNode("En savoir plus");
                buttoncamerasInfo.appendChild(tcamerasInfo);
                camerasInfo.appendChild(buttoncamerasInfo);
                buttoncamerasInfo.className = "button1";
            }
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
}

//appel de la fonction getcameras
getCameras();
