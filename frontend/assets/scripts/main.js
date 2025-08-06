// Aguarda até que o DOM esteja pronto
document.addEventListener("DOMContentLoaded", () => {
  const URL = "http://localhost:5502/api/colaboradores";
  const CONTAINER = document.getElementById("tickets-container");

  // Função para consumir a API e exibir os dados
  async function loadCollaborators() {
    try {
      const RES = await fetch(URL);
      if (!RES.ok) throw new Error(RES.status);
      const OBJ = await RES.json();

      // limpa antes de redenrizar
      CONTAINER.innerHTML = "";

      if (OBJ.length === 0) {
        CONTAINER.innerHTML = `
          <div class="alert alert-info">Nenhum colaborador encontrado.</div>
        `;
        return;
      }

      OBJ.forEach((col) => {
        const TICKET = document.createElement("div");
        TICKET.className = "card ticket-card mb-4 position-relative";
        TICKET.innerHTML = `
          <div class="status-dot"></div>
          <div class="row g-0">
            <div class="col-auto">
              <div class="ticket-avatar">
                ${col.nome.charAt(0).toUpperCase()}
              </div>
            </div>
            <div class="col">
              <div class="card-body">
                <h5 class="card-title mb-1">${col.nome}</h5>
                <p class="card-text mb-1">
                  <i class="bi bi-envelope-fill me-1"></i>
                  ${col.email}
                </p>
                <p class="card-text text-muted mb-2">
                  <i class="bi bi-briefcase-fill me-1"></i>
                  ${col.contrato}
                </p>
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-outline-secondary">
                    ${col.nome.charAt(0).toUpperCase()}
                  </button>
                  <button class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-clock-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        CONTAINER.appendChild(TICKET);
      });
    } catch (err) {
      console.error(err);
      CONTAINER.innerHTML = `
        <div class="alert alert-danger">
          Falha ao carregar colaboradores.
        </div>
      `;
    }
  }
  // Chama a função no início
  loadCollaborators();
});
