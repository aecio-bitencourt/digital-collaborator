// Aguarda até que o DOM esteja pronto
document.addEventListener("DOMContentLoaded", () => {
  const URL = "http://localhost:5502/api/colaboradores";
  const CONTAINER = document.getElementById("tickets-container");
  const NAV_DEPARTMENT = document.getElementById("nav-department");
  const PLACEHOLDER =
    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

  // Função para consumir a API e exibir os dados
  async function loadCollaborators() {
    try {
      const RES = await fetch(URL);
      if (!RES.ok) {
        throw new Error(RES.status);
      }
      const OBJ = await RES.json();

      // Limpa antes de redenrizar
      CONTAINER.innerHTML = "";
      NAV_DEPARTMENT.innerHTML = "";

      if (OBJ.length === 0) {
        CONTAINER.innerHTML = `
          <div class="alert alert-info">Nenhum colaborador encontrado.</div>
        `;
        return;
      }

      OBJ.forEach((col) => {
        // Obtendo URL diretamente sem concatenação, dica do Otavio
        const avatarUrl = col.avatarUrl;
        const TICKET = document.createElement("div");
        const ITEM_DEPARTMENT = document.createElement("li");

        TICKET.className = "card ticket-card mb-4 position-relative";
        TICKET.innerHTML = `
          <div class="row g-0">
            <div class="col-auto">
              <div class="ticket-avatar">
              <img
                  src="${avatarUrl}"
                  alt="${col.nome}"
                  class="img-fluid rounded-circle"
                  width="100" height="100"
                  onerror="this.onerror=null;this.src='${PLACEHOLDER}';"
                />
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
                  <i class="bi bi-telephone-fill"></i>
                  ${col.ramal}
                </p>
                <p class="card-text text-muted mb-2">
                  <i class="bi bi-building"></i>
                  ${col.departamento}
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

        ITEM_DEPARTMENT.className = "nav-item";
        ITEM_DEPARTMENT.innerHTML = `<a class="nav-link active" aria-current="page" href="#">${col.departamento}</a>`; //Atualizar para capturar os departamentos cadastrados na tabela departamentos
        NAV_DEPARTMENT.appendChild(ITEM_DEPARTMENT);
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
