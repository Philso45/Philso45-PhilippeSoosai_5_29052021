// récupération de l'id de la commande
let orderId = localStorage.getItem('responseOrder');
console.log(orderId);

// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);

//création page de confirmation et remerciement
const cameraconfirm = document.getElementById('pageproduit');
const cameraDiv = document.createElement('div');
cameraconfirm.appendChild(cameraDiv);
cameraDiv.className = 'order_confirm';

const cameraH3 = document.createElement('h3');
cameraDiv.appendChild(cameraH3);
cameraH3.textContent = "Nous vous remercions pour votre commande !";

const cameraText = document.createElement('p');
cameraDiv.appendChild(cameraText);
cameraText.textContent = "Votre commande a bien été enregistrée.";

const cameraText2 = document.createElement('p');
cameraDiv.appendChild(cameraText2);
cameraText2.innerHTML = "Votre commande sera expédié dans les 48h."

// récapitulatif de votre commande
const cameraDivConfirm = document.createElement('div');
cameraDiv.appendChild(cameraDivConfirm);
cameraDivConfirm.className = 'confirm';

const cameraH3Bis = document.createElement('h3');
cameraDivConfirm.appendChild(cameraH3Bis);
cameraH3Bis.textContent = "Récapitulatif de votre commande : ";

const cameraText5 = document.createElement('p');
cameraDivConfirm.appendChild(cameraText5);
cameraText5.textContent = "Numéro de commande : " + orderId;
cameraText5.className = "confirm_par";

const cameraText6 = document.createElement('p');
cameraDivConfirm.appendChild(cameraText6);
cameraText6.textContent = "Montant total de votre commande : " + totalPrice + " €";
cameraText6.className = "confirm_par";

// Efface localStorage
localStorage.clear();