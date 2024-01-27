using Diary.Api;
using Diary.Api.Hubs;
using Diary.Application;
using Diary.Infrastructure;
using Microsoft.AspNetCore.Http.Connections;

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
	app.MapHub<NotesHub>(
		"/notes",
		o =>
		{
			o.Transports = HttpTransportType.WebSockets |
			               HttpTransportType
				               .ServerSentEvents;
			o.ApplicationMaxBufferSize = long.MaxValue;
			o.TransportMaxBufferSize = long.MaxValue;
		});
	app.MapHub<NoteEditorHub>(
		"/noteEditor",
		o =>
		{
			o.Transports = HttpTransportType.WebSockets |
			               HttpTransportType
				               .ServerSentEvents;
			o.ApplicationMaxBufferSize = long.MaxValue;
			o.TransportMaxBufferSize = long.MaxValue;
		});
	app.MapHub<TagsHub>(
		"/tags",
		o =>
		{
			o.Transports = HttpTransportType.WebSockets |
			               HttpTransportType
				               .ServerSentEvents;
			o.ApplicationMaxBufferSize = long.MaxValue;
			o.TransportMaxBufferSize = long.MaxValue;
		});
	app.MapHub<TagHub>(
		"/tag",
		o =>
		{
			o.Transports = HttpTransportType.WebSockets |
			               HttpTransportType
				               .ServerSentEvents;
			o.ApplicationMaxBufferSize = long.MaxValue;
			o.TransportMaxBufferSize = long.MaxValue;
		});
	app.MapHub<ErrorsHub>(
		"/error",
		o =>
		{
			o.Transports = HttpTransportType.WebSockets |
			               HttpTransportType
				               .ServerSentEvents;
			o.ApplicationMaxBufferSize = long.MaxValue;
			o.TransportMaxBufferSize = long.MaxValue;
		});

	app.Run();
}