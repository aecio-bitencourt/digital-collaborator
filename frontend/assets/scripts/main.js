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

    divRow.className = "row g-0";
    divColAuto.className = "col-auto";
    divTicketAvatar.className = "ticket-avatar";

    divTickets.append(divRow);
    divRow.append(divColAuto);
    divColAuto.append(divTicketAvatar);
    ticketsContainer.append(divTickets);
  });
}

// Chamando a função
getAllCollaborators();
