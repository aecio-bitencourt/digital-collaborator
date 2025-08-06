using DigitalCollaborator.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Faz a leitura da string de conexão com o banco de dados
var connString = builder.Configuration.GetConnectionString("DefaultConnection");

// CORS
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowFrontend", p => p
        .WithOrigins("http://127.0.0.1:5501")
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Registra o DbContext
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseMySQL(connString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Executa APENAS em ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowFrontend");
}

// Configura o pipeline de solicitação HTTP
app.UseAuthorization();
app.MapControllers();
app.Run();