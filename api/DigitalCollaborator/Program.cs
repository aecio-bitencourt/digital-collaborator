using DigitalCollaborator.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Faz a leitura da string de conexão com o banco de dados
//var connString = builder.Configuration.GetConnectionString("DefaultConnection");

// CORS
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowFrontend", p => p
        .WithOrigins("")
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Registra o DbContext
builder.Services.AddDbContextFactory<AppDbContext>(opts =>
    opts.UseMySQL(builder.Configuration["MySQL"]));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Variavel de ambiente na Railway
if (builder.Environment.IsProduction() && builder.Configuration.GetValue<int?>("PORT") is not null)
{
    builder.WebHost.UseUrls($"http://*:{builder.Configuration.GetValue<int>("PORT")}");
}

app.UseCors("AllowFrontend");

app.UseSwagger();
app.UseSwaggerUI();

// Configura o pipeline de solicitação HTTP
app.UseAuthorization();
app.MapControllers();
app.Run();