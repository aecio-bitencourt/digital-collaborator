using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalCollaborator.Models;

// Mapeia a Classe para a tabela
[Table("colaborador")]
public class Colaborador
{
    // Mapeia a propriedade para a coluna da tabela
    [Column("colaborador_id")] public int ColaboradorId { get; private set; }
    [Column("nome")] public string Nome { get; private set; }
    [Column("departamento")] public string Departamento { get; private set; }
    [Column("andar")] public int Andar { get; private set; }
    [Column("ramal")] public int Ramal { get; private set; }

    public Colaborador(string nome, string departamento, int andar, int ramal)
    {
        Nome = nome;
        Departamento = departamento;
        Andar = andar;
        Ramal = ramal;
    }
}