namespace DigitalCollaborator.Dtos;

public class ColaboradoresDto
{
    public int ColaboradorId { get; set; }
    public string Nome { get; set; }
    public string Departamento { get; set; }
    public int Andar { get; set; }
    public int Ramal { get; set; }
    public string AvatarFile { get; set; }
    public string AvatarUrl { get; set; }
}