//datos del formulario de clientes
var formClients = document.getElementById("formClients");
var inputIdentificationClient = document.getElementById("identificacion");
var inputNameClient = document.getElementById("nombres");
var inputLastNameClient = document.getElementById("apellidos");
var inputPhoneClient = document.getElementById("telefono");
var inputEmailClient = document.getElementById("emailAg");
var inputDateClient = document.getElementById("fechaNacimiento");
var inputNationalityClient = document.getElementById("nacionalidad");

//datos del formulario de videojuegos
var formVideoGames = document.getElementById("formVideoGames");
var inputNameVG = document.getElementById("nombreVG");
var inputTematicVG = document.getElementById("tematicaVG");
var inputValueLicenceVG = document.getElementById("valorLicenciaVG");
var inputPointsVG = document.getElementById("puntosVG");

//--------------------FUNCIONES CLIENTES---------------------------//

//función para validar que la identificación del cliente sea única
function validUniqueIdentification(identificacion) {
  var clientesGuardados = localStorage.getItem("clients");

  if (clientesGuardados) {
    var listaClientes = JSON.parse(clientesGuardados);

    for (var i = 0; i < listaClientes.length; i++) {
      if (listaClientes[i].identificacion === identificacion) {
        return false; // El número de identificación ya existe
      }
    }
  }

  return true;
}

formClients.addEventListener("submit", function (e) {
  //verificar registro único
  var identification = inputIdentificationClient.value;
  if (!validUniqueIdentification(identification)) {
    e.preventDefault();

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El número de identificación ya existe",
    });

    return;
  }

  var client = {
    idC: identification,
    nameC: inputNameClient.value,
    lastnameC: inputLastNameClient.value,
    phoneC: inputPhoneClient.value,
    emailC: inputEmailClient.value,
    birthDateC: inputDateClient.value,
    nationC: inputNationalityClient.value,
    pointsC: 0,
  };

  // Obtener los datos almacenados en el Local Storage
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];
  // Agregar el nuevo cliente a la lista
  listClients.push(client);

  // Guardar la lista actualizada en el Local Storage
  localStorage.setItem("clients", JSON.stringify(listClients));

  // Limpiar el formulario
  formClients.reset();

  // Mostrar los clientes actualizados
  showClients(listClients);
});

// Obtener referencia de la lista de clientes
var btnListar = document.getElementById("btnListar");
btnListar.addEventListener("click", function () {
  var listDiv = document.getElementById("divListClients");
  listDiv.style.display = "block";
  var editDiv = document.getElementById("editClient");
  editDiv.style.display = "none";

  // Obtener la lista de clientes del Local Storage
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];

  showClients(listClients);
});

function showClients(clients) {
  var divList = document.getElementById("listClients");
  divList.innerHTML = "";

  if (clients && clients.length > 0) {
    clients.forEach(function (cl) {
      var item = document.createElement("li");
      var nameClient = document.createTextNode("Cliente: " + cl.nameC + " " + cl.lastnameC);
      var doc = document.createElement("p");
      doc.textContent = "DI: " + cl.idC;

      var email = document.createElement("p");
      email.textContent = "Email: " + cl.emailC;

      var phone = document.createElement("p");
      phone.textContent = "Teléfono" + cl.phoneC;

      var birthDate = document.createElement("p");
      birthDate.textContent = "Fecha de nacimiento: " + cl.birthDateC;

      var nation = document.createElement("p");
      nation.textContent = "Nacionalidad: " + cl.nationC;

      var botonEdit = document.createElement("button");
      botonEdit.textContent = "Editar";
      botonEdit.addEventListener("click", function () {
        editClient(cl);
      });

      var botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add('btn-delete')
      botonEliminar.addEventListener("click", function () {
        delClient(cl.idC);
      });

      item.appendChild(nameClient);
      item.appendChild(doc);
      item.appendChild(email);
      item.appendChild(phone);
      item.appendChild(birthDate);
      item.appendChild(nation);
      item.appendChild(botonEdit);
      item.appendChild(botonEliminar);

      divList.appendChild(item);
    });
  } else {
    var mensaje = document.createElement("p");
    mensaje.textContent = "No hay clientes aún :c";
    divList.appendChild(mensaje);
  }
}

//Función para editar clientes, no se muestra el doc de identificación porque es el id del registro jaja
function editClient(cl) {
  var listDiv = document.getElementById("divListClients");
  listDiv.style.display = "none";
  var editDiv = document.getElementById("editClient");
  editDiv.style.display = "block";
  // Obtener referencias a los elementos del formulario de editar
  var inputNameEdit = document.getElementById("nombresEdit");
  var inputLastnameEdit = document.getElementById("apellidosEdit");
  var inputPhoneEdit = document.getElementById("telefonoEdit");
  var inputEmailEdit = document.getElementById("emailEdit");
  var inputBithDateEdit = document.getElementById("fechaNacimientoEdit");
  var inputNationEdit = document.getElementById("nacionalidadEdit");

  // Rellenar los campos del formulario con los datos del cliente
  inputNameEdit.value = cl.nameC;
  inputLastnameEdit.value = cl.lastnameC;
  inputPhoneEdit.value = cl.phoneC;
  inputEmailEdit.value = cl.emailC;
  inputBithDateEdit.value = cl.birthDateC;
  inputNationEdit.value = cl.nationC;

  // Agregar un evento al botón de guardar cambios
  var btnGuardarCambios = document.getElementById("submitEdit");
  btnGuardarCambios.addEventListener("click", function (e) {
    e.preventDefault();
    // Obtener los nuevos valores editados del formulario
    var newNames = inputNameEdit.value;
    var newLastName = inputLastnameEdit.value;
    var newPhone = inputPhoneEdit.value;
    var newEmail = inputEmailEdit.value;
    var newBirthDate = inputBithDateEdit.value;
    var newNation = inputNationEdit.value;

    // Actualizar los datos del cliente en la lista
    cl.nameC = newNames;
    cl.lastnameC = newLastName;
    cl.phoneC = newPhone;
    cl.emailC = newEmail;
    cl.birthDateC = newBirthDate;
    cl.nationC = newNation;

    // Obtener los datos almacenados en el Local Storage
    var clientsSave = localStorage.getItem("clients");
    var listClients = clientsSave ? JSON.parse(clientsSave) : [];

    // Actualizar los datos del cliente en la lista del Local Storage
    var clientIndex = listClients.findIndex(function (c) {
      return c.idC === cl.idC;
    });
    if (clientIndex !== -1) {
      listClients[clientIndex] = cl;
    }
    // Guardar la lista actualizada en el Local Storage
    localStorage.setItem("clients", JSON.stringify(listClients));
    // Mostrar la lista actualizada
    showClients(listClients);
    var listDiv = document.getElementById("divListClients");
    listDiv.style.display = "block";
    var editDiv = document.getElementById("editClient");
    editDiv.style.display = "none";
  });
}

//Función para eliminar clientes, el parámetro es el id del registro
function delClient(cl) {
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];

  // Filtrar el cliente que se desea eliminar
  listClients = listClients.filter(function (client) {
    return client.idC !== cl;
  });

  // Actualizar el localStorage
  localStorage.setItem("clients", JSON.stringify(listClients));

  // Mostrar lista actualizada
  showClients(listClients);
}

//Función para buscar por nombre, apellidos o documento a los clientes
function lookCLients() {
  var inputBusqueda = document.getElementById("inputBusqueda");
  var filtro = inputBusqueda.value.toLowerCase();

  var clientsSave = localStorage.getItem("clients");
  if (clientsSave) {
    var listClients = JSON.parse(clientsSave);
    var clientesFiltrados = listClients.filter(function (cliente) {
      var nameLook = cliente.nameC.toLowerCase();
      var lastNameLook = cliente.lastnameC.toLowerCase();
      var identificationLook = cliente.idC.toLowerCase();
      var filtroMinusculas = filtro.toLowerCase();

      return (
        nameLook.includes(filtroMinusculas) ||
        lastNameLook.includes(filtroMinusculas) ||
        identificationLook.includes(filtroMinusculas)
      );
    });

    showClients(clientesFiltrados);
  }
}
// capturar el input de búsqueda
var btnLook = document.getElementById("btnBuscar");
btnLook.addEventListener("click", lookCLients);

//--------------------FUNCIONES VIDEOJUEGOS---------------------------//
formVideoGames.addEventListener("submit", function (e) {
  //ASignar un identificador único por medio de la fecha con milisegundos jeje
  var idVideoGame = new Date();
  idVideoGame = idVideoGame.getDate();

  var videogame = {
    id: idVideoGame,
    name: inputNameVG.value,
    tematic: inputTematicVG.value,
    valueLicence: inputValueLicenceVG.value,
    points: inputPointsVG.value,
  };
  // Mostrar el nuevo viedojuego
  addCard(videogame);
  // Obtener los datos almacenados en el Local Storage
  var videogameSave = localStorage.getItem("videogames");
  var listVG = videogameSave ? JSON.parse(videogameSave) : [];
  // Agregar el nuevo videojuego a la lista
  listVG.push(videogame);

  // Guardar la lista actualizada en el Local Storage
  localStorage.setItem("videogames", JSON.stringify(listVG));

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalRoutes")
  );
  modal.hide();

  // Limpiar el formulario
  formVideoGames.reset();
});

function addCard(vg) {
  const cardContainer = document.querySelector(".card__container");

  const card = document.createElement("div");
  card.classList.add("card");
  card.id = vg.id;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = vg.name;
  cardBody.appendChild(title);

  const iconCard = document.createElement("div");
  iconCard.classList.add("card-icon");
  iconCard.innerHTML = `<i class="fa-brands fa-playstation"></i>`;
  cardBody.appendChild(iconCard);


  const tematic = document.createElement("p");
  tematic.classList.add("card-text--tematic");
  tematic.textContent = "Temática: " + vg.tematic;
  cardBody.appendChild(tematic);

  const valueLicence = document.createElement("p");
  valueLicence.classList.add("card-text--valueLicence");
  valueLicence.textContent = "Licencia $: " + vg.valueLicence;
  cardBody.appendChild(valueLicence);

  const points = document.createElement("p");
  points.classList.add("card-text--points");
  points.textContent = "Puntos: " + vg.points;
  cardBody.appendChild(points);

  const buyBtn = document.createElement("a");
  buyBtn.classList.add("btn", "btn-primary", "btn-buy");
  buyBtn.textContent = "Comprar";
  buyBtn.addEventListener("click", () => buyVG(vg));
  cardBody.appendChild(buyBtn);
  const deleteBtn = document.createElement("a");
  deleteBtn.classList.add("btn", "btn-primary", "btn-delete");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.addEventListener('click', () => deleteVG(vg.id));
  cardBody.appendChild(deleteBtn);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
}

//--------------------FUNCIONES COMPRAS---------------------------//
//función para comprar desde la tarjeta en el DOM
function buyVG(vg) {
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];

  if (listClients.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "No hay clientes registrados",
      text: "No se pueden realizar compras sin clientes registrados",
    });
    return;
  }

  // Obtener el select del modal
  var selectCliente = document.getElementById("selectCliente");

  // Limpiar opciones previas del select
  selectCliente.innerHTML = "";

  // Generar las opciones del select con la información de los clientes
  listClients.forEach(function (client) {
    var option = document.createElement("option");
    option.value = client.idC;
    option.textContent =
      client.nameC +
      " " +
      client.lastnameC +
      " - " +
      client.idC;
    selectCliente.appendChild(option);
  });

  // Obtener el precio y puntos de la ruta seleccionada
  var valueLicence = vg.valueLicence;
  var valueFLoat = parseFloat(valueLicence);
  var iva = valueFLoat * 0.16;
  var impuestoEspecial = valueFLoat * 0.04;
  var valueLicenceTotal =  valueFLoat + iva + impuestoEspecial;
  var points = vg.points;

  // Mostrar el modal para confirmar la compra
  Swal.fire({
    title: "Confirmar compra",
    html: `
        <p>Resumen de la compra:</p>
        <p>Precio $: ${valueLicence}</p>
        <p>IVA $: ${iva}</p>
        <p>Impuesto adicional $: ${impuestoEspecial}</p>
        <p>Puntos por la compra: ${points}</p>
        <p>Seleccione un cliente:</p>
        <select id="selectCliente">${selectCliente.innerHTML}</select>
      `,
    showCancelButton: true,
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
    preConfirm: function () {
      debugger;
      var selectedClientId = document.getElementById("selectCliente");
      selectedClientId = selectedClientId.value;
      console.log(selectedClientId);
      var selectedClient = listClients.find(function (client) {
        return client.idC === selectedClientId;
      });
      debugger;
      var selectedClientId = document.getElementById("selectCliente");
      selectedClientId = selectedClientId.value;
      // Actualizar el saldo de puntos del cliente
      selectedClient.pointsC = selectedClient.pointsC + parseInt(vg.points);

      // Guardar la lista de clientes actualizada en el localStorage
      localStorage.setItem("clients", JSON.stringify(listClients));

      Swal.fire({
        icon: "success",
        title: "Compra realizada",
        html: `
            <p>Resumen de la compra:</p>
            <p>Precio total $: ${valueLicenceTotal}</p>
            <p>Puntos acumulados: ${selectedClient.pointsC}</p>
            <p>Cliente: ${selectedClient.nameC} ${selectedClient.lastnameC}</p>
          `,
      });
    },
  });
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];

  showPointsList(listClients);
}
// función para eliminar un videojuego desde la tarjeta en el DOM
function deleteVG(vgId){
    var videogameSave = localStorage.getItem("videogames");
    var listVG = videogameSave ? JSON.parse(videogameSave) : [];
    // Buscar el índice a eliminar en la lista
  var index = listVG.findIndex(function (vg) {
    return vg.id === vgId;
  });

  // Si se encontró eliminarla
  if (index !== -1) {
    listVG.splice(index, 1);

    // Guardar la lista actualizada en el Local Storage
    localStorage.setItem("videogames", JSON.stringify(listVG));
  }

  // Eliminar la tarjeta del DOM
  var cardDelete = document.getElementById(vgId);
  if (cardDelete) {
    cardDelete.remove();
  }
}

//--------------------FUNCIÓN PUNTOS---------------------------//
function showPointsList(clients){
    var listPoints = document.getElementById("lisPoints");
    listPoints.innerHTML = "";
 
  if (clients && clients.length > 0) {
    
    clients.forEach(function (cl) {
      var item = document.createElement("li");
      var nameClient = document.createTextNode("Cliente: " + cl.nameC + " " + cl.lastnameC);
      var doc = document.createElement("p");
      doc.textContent = "DI: " + cl.idC;
      var points = document.createElement("p");
      points.classList.add('printPoints');
      points.textContent = "Puntos: " + cl.pointsC;
      item.appendChild(nameClient);
      item.appendChild(doc);
      item.appendChild(points);
      listPoints.appendChild(item);
    });
  } else {
    var m = document.createElement("p");
    m.textContent = "No hay clientes";
    listPoints.appendChild(m);
  }
}

//tener la info lista cuando todo esté cargado
window.addEventListener("DOMContentLoaded", function () {
  // Obtener los datos almacenados en el Local Storage
  var videogameSave = localStorage.getItem("videogames");
  var listVG = videogameSave ? JSON.parse(videogameSave) : [];
  // Crear las tarjetas para cada video juego en el Local Storage
  listVG.forEach(function (vg) {
    addCard(vg);
  });

  // Obtener la lista de clientes del Local Storage
  var clientsSave = localStorage.getItem("clients");
  var listClients = clientsSave ? JSON.parse(clientsSave) : [];
  // Mostrar los clientes al cargar la página
  console;
  showClients(listClients);
  showPointsList(listClients);
});
