// Aguarda até que o DOM esteja pronto
document.addEventListener("DOMContentLoaded", () => {
  const TBODY = document.getElementById("collaborators-tbody");
  const FORM = document.getElementById("form-colaborador");
  const URL = "http://localhost:5032/api/colaboradores";

  // Função para consumir a API e exibir os dados
  async function loadCollaborators() {
    try {
      const RESPONSE = await fetch(URL, {
        method: "GET",
      });

      if (!RESPONSE.ok) {
        throw new Error("Erro na requisição: " + RESPONSE.status);
      }

      // Limpe o corpo da tabela
      const OBJ = await RESPONSE.json();

      //
      TBODY.innerHTML = "";

      // Para cada colaborador, cria um <tr> e inseri o <tbody>
      OBJ.forEach((col) => {
        const TR = document.createElement("tr");
        TR.innerHTML = `
                    <td>${col.colaboradorId}</td>
                    <td>${col.nome}</td>
                    <td>${col.departamento}</td>
                    <td>${col.andar}</td>
                    <td>${col.ramal}</td>
                `;
        TBODY.appendChild(TR);
      });

      if (OBJ.length === 0) {
        TBODY.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align:center">
                            Nenhum colaborador encontrado.
                        </td>
                    </tr>`;
      }
    } catch (err) {
      console.error(err);
      TBODY.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; color:red">
                        Falha ao carregar colaboradores.
                    </td>
                </tr>`;
    }
  }

  FORM.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    // Dados do formulário de cadastro de um novo colaborador
    const DATA = {
      nome: FORM.nome.value,
      departamento: FORM.departamento.value,
      andar: parseInt(FORM.andar.value, 10),
      ramal: parseInt(FORM.ramal.value, 10),
    };

    try {
      const RESPONSE = await fetch(URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(DATA),
      });

      if (RESPONSE.status === 201 || RESPONSE.status === 200) {
        FORM.reset();
        await loadCollaborators();
      } else {
        const MSG = await RESPONSE.text();
        alert(`Falha (${RESPONSE.status}): ${MSG}`);
      }
    } catch (err) {
      console.error(err);
      alert("Erro de rede ou servidor.");
    }
  });

  // Chama a função no início
  loadCollaborators();
});
