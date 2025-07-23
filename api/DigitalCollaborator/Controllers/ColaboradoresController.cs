using DigitalCollaborator.Data;
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
            var colaboradores = await _appDbContext.Colaboradores.ToListAsync();
            return Ok(colaboradores);
        }
    }
}