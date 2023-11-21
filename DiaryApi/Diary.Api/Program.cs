using Diary.Api;
using Diary.Api.Hubs;
using Diary.Application;
using Diary.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
	builder.Services
		.AddPresentation()
		.AddApplication()
		.AddInfrastructure(builder.Configuration);
}

var app = builder.Build();
{
	app.UseCors(
		x => x
			.AllowAnyMethod()
			.AllowAnyHeader()
			.SetIsOriginAllowed(_ => true)
			.AllowCredentials());
	app.UseHttpsRedirection();
	app.UseAuthentication();
	app.UseAuthorization();
	app.MapControllers();
	app.MapHub<NotesHub>("/note");
	app.Run();
}