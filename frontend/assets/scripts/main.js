// Endpoint de colaboradores
const url = "http://localhost:5502/api/colaboradores";
// Container dos colaboradores
const ticketsContainer = document.querySelector("#tickets-container");
const placeHolder =
  "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

// Obter todos os colaboradores
async function getAllCollaborators() {
  const response = await fetch(url);
  // Extração dos dados em JSON
  const data = await response.json();

  // Mapeamento do array
  data.map((ticket) => {
    // div de tickets
    const divTickets = document.createElement("div");
    divTickets.className = "card ticket-card mb-4 position-relative";

    // Elementos dentro da div de tickets
    const divRow = document.createElement("div");
    const divColAuto = document.createElement("div");
    const divTicketAvatar = document.createElement("div");
    const imgAvatar = document.createElement("img");
    const divCol = document.createElement("div");
    const divCard = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const pCardEmail = document.createElement("p");

    divRow.className = "row g-0";
    divColAuto.className = "col-auto";
    divTicketAvatar.className = "ticket-avatar";
    imgAvatar.className = "img-fluid rounded-circle";
    divCol.className = "col";
    divCard.className = "card-body";
    cardTitle.className = "card-title mb-1";
    pCardEmail.className = "card-text mb-1";

    imgAvatar.setAttribute("src", `${ticket.avatarUrl}`);
    imgAvatar.setAttribute("alt", `${ticket.nome}`);
    imgAvatar.setAttribute("width", "100");
    imgAvatar.setAttribute("height", "100");
    cardTitle.innerText = ticket.nome;
    pCardEmail.innerText = ticket.email;

    divTickets.append(divRow);
    divRow.append(divColAuto, divCol);
    divColAuto.append(divTicketAvatar);
    divTicketAvatar.append(imgAvatar);
    divCol.append(divCard);
    divCard.append(cardTitle, pCardEmail);
    ticketsContainer.append(divTickets);
  });
}
// Chamando a função
getAllCollaborators();
