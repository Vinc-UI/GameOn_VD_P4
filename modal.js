function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  // DOM Elements - Ce code JavaScript contient plusieurs instructions qui définissent des variables et sélectionnent des éléments HTML dans la page
  const modalbg = document.querySelector(".bground"); 
  const modalBtn = document.querySelectorAll(".modal-btn"); 
  const formData = document.querySelectorAll(".formData");
  const closeModalBtn = document.querySelector(".close");
  const firstName = document.querySelector("#first");
  const lastName = document.querySelector("#last");
  const email = document.querySelector("#email");
  const birthdate = document.querySelector("#birthdate");
  const quantity = document.querySelector("#quantity");
  const formDataNodeList = document.querySelectorAll(".formData");
  const radioLocationDiv = formDataNodeList[5];
  const radioLocationNodeList =
    radioLocationDiv.querySelectorAll(".checkbox-input");
  const firstRadio = radioLocationNodeList[1];
  const cguCheckbox = document.querySelector("#checkbox1");
  const newsletterCheckbox = document.querySelector("#checkbox2");
  const submitBtn = document.querySelector(".btn-submit");
  const modalBody = document.querySelector(".modal-body");
  const closeCross = document.querySelector(".content .close");
  
  // Tableau des éléments sur lesquels itérer pour form verif
  const domElemArr = [firstName, lastName, email, birthdate, quantity];
  
  // Liste des regex requises
  const regexName = new RegExp(/^[a-zA-Z]{2,}$/); // Cette ligne crée une nouvelle instance de l'objet RegExp qui est utilisé pour représenter une expression régulière. L'expression régulière créée ici est /^[a-zA-Z]{2,}$/, qui vérifie si une chaîne de caractères contient uniquement des lettres (majuscules ou minuscules) et a une longueur d'au moins 2 caractères.
  const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/); // Cette ligne crée une autre instance de l'objet RegExp. L'expression régulière ici est /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, qui vérifie si une chaîne de caractères est une adresse e-mail valide. L'expression régulière utilise une combinaison de caractères spéciaux pour s'assurer que la chaîne contient un nom d'utilisateur, un "@" et un domaine valide.
  const regexDate = new RegExp(
    /^(19\d{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  ); //Cette ligne crée une autre instance de l'objet RegExp. L'expression régulière ici est /^(19\d{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, qui vérifie si une chaîne de caractères représente une date au format "AAAA-MM-JJ" valide. L'expression régulière s'assure que l'année est soit "19" suivi de 2 chiffres, soit "2" suivi de 3 chiffres, que le mois est compris entre "01" et "12" et que le jour est compris entre "01" et "31".
  const regexNumber = new RegExp(/^\d{1,3}$/); // cette ligne crée une dernière instance de l'objet RegExp. L'expression régulière ici est /^\d{1,3}$/, qui vérifie si une chaîne de caractères représente un nombre entier à 1, 2 ou 3 chiffres. L'expression régulière s'assure que la chaîne commence et se termine par un chiffre et que la longueur de la chaîne est comprise entre 1 et 3 caractères.
  
  // Tableau des éléments à comparer et msg d'erreur associés
  const errorMessages = [
    { msg: "Merci de saisir votre prénom au format valide", regex: regexName },
    { msg: "Merci de saisir votre nom au format valide", regex: regexName },
    { msg: "Merci de saisir votre email au format valide", regex: regexEmail },
    { msg: "Merci de saisir votre date au format valide", regex: regexDate },
    { msg: "Merci de saisir un chiffre (si 0, saisissez 0)", regex: regexNumber },
    { msg: "Merci de cochez l'une des options" },
    { msg: "Pour vous inscrire l'acceptation de nos CGU est obligatoire" },
  ];
  
  // fonction pour affichage erreur (max 1 msg par element) - Cette fonction est utilisée pour afficher des messages d'erreur à côté des champs de formulaire lorsque les données soumises ne sont pas valides.
  const putErrorMsg = (index, parentElement) => {
    let textAlreadyExist = parentElement.querySelector(".errorMsg");
    if (textAlreadyExist) {
      return;
    } //vérifie s'il y a déjà un élément HTML avec la classe "errorMsg" dans parentElement, qui est l'élément parent du champ de formulaire. Si un tel élément existe déjà, cela signifie qu'un message d'erreur a déjà été affiché et la fonction s'arrête avec return, évitant ainsi d'afficher le même message plusieurs fois.
    const text = document.createElement("p"); //Si aucun élément "errorMsg" n'existe dans parentElement, la fonction crée un nouvel élément HTML <p> avec la classe "errorMsg" et le texte du message d'erreur correspondant à l'index spécifié dans le tableau errorMessages.
    text.classList.add("errorMsg");
    text.textContent = errorMessages[index].msg;
    parentElement.appendChild(text);
    parentElement.querySelector("input").style.border = "solid red 2px"; // la fonction sélectionne l'élément <input> à l'intérieur de parentElement en utilisant la méthode querySelector, et définit sa bordure avec la couleur rouge pour indiquer visuellement que le champ n'est pas valide.
  };
  
  //fonction pour supprimer affichage erreur si réctifiée - Cette fonction est utilisée pour supprimer les messages d'erreur qui ont été affichés précédemment pour un champ de formulaire spécifique.
  
  const removeErrorMsg = (parentElement) => {
    let textAlreadyExist = parentElement.querySelector(".errorMsg"); //La première ligne de la fonction vérifie s'il y a déjà un élément HTML avec la classe "errorMsg" dans parentElement, qui est l'élément parent du champ de formulaire. Si un tel élément existe déjà, la fonction passe à la ligne suivante, sinon elle s'arrête avec return.
    if (textAlreadyExist) {
      textAlreadyExist.remove(); //Si un élément "errorMsg" existe dans parentElement, la fonction le supprime en appelant la méthode remove() sur l'élément.
    }
    parentElement.querySelector("input").style.border = "none";
  }; //Ensuite, la fonction sélectionne l'élément <input> à l'intérieur de parentElement en utilisant la méthode querySelector, et définit sa bordure avec la valeur "none" pour la supprimer et ainsi réinitialiser la mise en forme visuelle du champ.
  
  // fonction de verif radio check
  // Vérifie si au moins un bouton radio est sélectionné
  const radioCheck = () => {
    let oneIsChecked = false;
    radioLocationNodeList.forEach((radio) => {
      if (radio.checked) {  // Si un bouton radio est sélectionné
        oneIsChecked = true; // Met la variable à true
      }
    });
    return oneIsChecked ? true : false; // Retourne true si au moins un bouton radio est sélectionné, sinon false
  };
  
  // Récupère la ville sélectionnée par l'utilisateur
  const wichCityOnRadio = () => 
  {
    let selectedCity = ""; // Initialise la variable
    radioLocationNodeList.forEach((radio) => 
    {
      if (radio.checked) 
      { // Si le bouton radio est sélectionné
        selectedCity = radio.value; // Récupère la valeur de l'attribut "value" de l'élément
      }
    });
    return selectedCity; // Retourne la valeur de la ville sélectionnée
  };
  // launch modal event
  // Associe la fonction launchModal() à chaque bouton qui a la classe "modal-btn"
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  
  // launch modal form
  // Affiche la fenêtre modale en modifiant le style CSS de l'élément correspondant
  function launchModal() 
  {
    modalbg.style.display = "block";
  }
  // Close modal form
  // Masque la fenêtre modale en modifiant le style CSS de l'élément correspondant
  const closeModal = () => 
  {
    modalbg.style.display = "none";
  };
  
  // fermeture du modal en dehors de la fenetre 
  // Ajoute un event listener à la fenêtre modale pour masquer celle-ci lorsque l'utilisateur clique en dehors de la boîte de dialogue
  modalbg.addEventListener("click", function(event) 
  {
    if (event.target === modalbg) 
    {
      modalbg.style.display = "none";
    }
  });
  
  
  // Event Listener close modal event
  // Ajoute un event listener au bouton de fermeture de la fenêtre modale pour fermer celle-ci lorsqu'il est cliqué
  closeModalBtn.addEventListener("click", closeModal);
  
  // Ajoute un event listener à la croix de fermeture de la fenêtre modale pour fermer celle-ci lorsqu'il est cliqué
  closeCross.addEventListener("click", closeModal);
  
  // Form check function
  function validate() 
  {
    const datas = {}; // initialisation de l'objet à envoyer au backend
  
    let containError = false; // variable de check d'erreur final pour le return
  
    // Pour chaque élément, on vérifie via la regex et si erreur, on affiche le msg d'erreur correspondant et passe la variable check à true (err)
    domElemArr.forEach((elem, index) => 
    {
      if (!elem.value.match(errorMessages[index].regex)) 
      {
        putErrorMsg(index, elem.parentElement);
        containError = true;
      } 
      else 
      {
        removeErrorMsg(elem.parentElement);
      }
    });
  
    if (!radioCheck()) { // Vérifie si aucun des boutons radio n'est coché, si oui affiche un message d'erreur
      putErrorMsg(5, firstRadio.parentElement);
      containError = true;
    } else {
      removeErrorMsg(firstRadio.parentElement);
    }
  
    if (!cguCheckbox.checked) { // Vérifie si les CGU sont acceptées, sinon affiche un message d'erreur
      putErrorMsg(6, cguCheckbox.parentElement);
      containError = true;
    } else {
      removeErrorMsg(cguCheckbox.parentElement);
    }
  
    if (containError) { // Si une erreur est trouvée, retourne false
      return false;
    } else { // Sinon, constitue l'objet à envoyer au backend et retourne ce dernier
      datas.firstName = firstName.value;
      datas.lastName = lastName.value;
      datas.email = email.value;
      datas.birthdate = birthdate.value;
      datas.quantity = parseInt(quantity.value);
      datas.city = wichCityOnRadio();
      datas.cguCheckbox = cguCheckbox.checked;
      datas.subscribeNewsletter = newsletterCheckbox.checked;
  
      return datas;
    }
  }
  
  // fonction qui affiche le message de validation d'inscription si form validate ok (pourrait aussi envoyer form au backend)
  const sendDatas = () => {
    const validateResult = validate(); // appel de la fonction validate() pour récupérer les données du formulaire
    if (validateResult !== false) { // si validate() renvoie des données, on continue
      const jsonValidateResult = JSON.stringify({ validateResult }); // conversion des données au format JSON
      console.log(jsonValidateResult); // affichage des données dans la console (en temps normal on les enverrait au backend)
  
      // //Si envoie form au backend, fonction qui envoie les datas
      // sendToBackend(jsonValidateResult);
  
      // mise à jour du contenu du corps de la modal pour afficher un message de remerciement
      const modalBodyWidth = modalBody.offsetWidth;
      const modalBodyHeight = modalBody.offsetHeight;
      modalBody.style.width = `${modalBodyWidth}px`;
      modalBody.style.height = `${modalBodyHeight}px`;
      modalBody.innerHTML = "";
      modalBody.innerHTML =
        '<div class="modalBody--after__textContent"><p>Merci pour votre inscription</p></div><button class="btn-submit modalBody--after__btn-submit" id="btn-closeModal">Fermer</button>';
      modalBody.classList.add("modalBody--after");
  
      // ajout d'un écouteur d'événement pour le bouton de fermeture de la modal
      const closeModalBtn = document.querySelector("#btn-closeModal");
      closeModalBtn.addEventListener("click", closeModal);
    } else {
      return false; // si validate() ne renvoie pas de données, on arrête l'exécution de la fonction
    }
  };
  
  // Fonction pour envoi futur au backend
  const sendToBackend = (jsonObject) => {
    fetch("http://something.com/api/endpoint", { // envoi de la requête POST vers l'endpoint de l'API
      method: "POST",
      headers: {
        "Content-Type": "application/json", // type de contenu JSON pour la requête
      },
      body: JSON.stringify(jsonObject), // conversion de l'objet JSON en chaîne de caractères pour l'envoi dans la requête
    })
      .then((response) => {
        // traitement de la réponse si la requête est réussie
      })
      .catch((error) => {
        // traitement de l'erreur si la requête échoue
      });
  };
  
  // ajout du prevent default et validation du form
  document
    .querySelector("form[name='reserve']")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      sendDatas();
    });
  