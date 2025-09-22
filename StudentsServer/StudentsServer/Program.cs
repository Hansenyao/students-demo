
using Microsoft.EntityFrameworkCore;
using StudentsServer.DAL;

namespace StudentsServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            //cors
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            //cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                policy =>
                {
                    // Allow this Frontend App request APIs, set AllowAnyOrigin() if no any limits
                    policy.WithOrigins("https://students-demo.fly.dev")
                    .AllowAnyMethod()   //if not mentioned only get will be allowed
                    .AllowAnyHeader(); // x-pagination
                });
            });

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors(MyAllowSpecificOrigins);

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

            // Make sure using server's root path can return a message to 
            // demonstrate server is running!
            app.MapGet("/", () => "Server is running!");

            app.Run();
        }
    }
}
