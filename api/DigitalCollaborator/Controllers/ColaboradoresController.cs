using DigitalCollaborator.Data;
using DigitalCollaborator.Dtos;
using DigitalCollaborator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalCollaborator.Controllers
{
    // Habilita recursos automáticos de APIs REST no .NET
    [ApiController]
    // Define a rota base para todos os métodos
    [Route("api/[controller]")]
    public class ColaboradoresController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ColaboradoresController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddColaborador(Colaborador colaborador)
        {
            _appDbContext.Colaboradores.Add(colaborador);
            await _appDbContext.SaveChangesAsync();
            return Ok(colaborador);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Colaborador>>> GetAllColaboradores()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
            var colaboradores = await _appDbContext.Colaboradores.ToListAsync();
            // Mapeamento em ColaboradoresDto já construindo a URL de acesso aos arquivos de imagens
            var colaboradoresDto = colaboradores.Select(c => new ColaboradoresDto
            {
                ColaboradorId = c.ColaboradorId,
                Nome = c.Nome,
                Departamento = c.Departamento,
                Andar = c.Andar,
                Ramal = c.Ramal,
                AvatarFile = c.AvatarFile
            });
            return Ok(colaboradores);
        }
    }
}