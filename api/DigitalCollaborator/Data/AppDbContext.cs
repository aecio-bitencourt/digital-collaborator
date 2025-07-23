using DigitalCollaborator.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalCollaborator.Data;

public class AppDbContext : DbContext
{
    // Abre uma sessão com o banco de dados
    public AppDbContext(DbContextOptions<AppDbContext> opts)
        : base(opts)
    {
    }

    public DbSet<Colaborador> Colaboradores { get; set; }
}