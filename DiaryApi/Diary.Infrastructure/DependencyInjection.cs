using Diary.Application.Common.Interfaces.Authentication;
using Diary.Application.Common.Interfaces.Note;
using Diary.Application.Common.Interfaces.Persistence;
using Diary.Application.Common.Interfaces.Services;
using Diary.Infrastructure.Authentication;
using Diary.Infrastructure.Note;
using Diary.Infrastructure.Persistence;
using Diary.Infrastructure.Persistence.Repositories;
using Diary.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Diary.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(
		this IServiceCollection services,
		ConfigurationManager configuration)
	{
		Encoding.RegisterProvider(
			CodePagesEncodingProvider.Instance);
		services
			.AddAuth(configuration)
			.AddPersistence();

		services
			.AddSingleton<IDateTimeProvider,
				DateTimeProvider>();

		return services;
	}

	public static IServiceCollection AddPersistence(
		this IServiceCollection services)
	{
		services.AddDbContext<DiaryDbContext>(
			option => option.UseNpgsql(
				"Host=localhost;Database=diary;Username=postgres;Password=Belochka0301"));
		services
			.AddScoped<IUserRepository, UserRepository>();
		services
			.AddScoped<IUserInfoRepository,
				UserInfoRepository>();
		services
			.AddScoped<INoteRepository, NoteRepository>();
		services.AddScoped<ITagRepository, TagRepository>();
		services.AddScoped<IUnitOfWork, UnitOfWork>();
		return services;
	}

	public static IServiceCollection AddAuth(
		this IServiceCollection services,
		ConfigurationManager configuration)
	{
		var jwtSettings = new JwtSettings();
		configuration.Bind(
			JwtSettings.SectionName,
			jwtSettings);

		services.AddSingleton(Options.Create(jwtSettings));
		services
			.AddSingleton<IJwtTokenGenerator,
				JwtTokenGenerator>();

		services
			.AddSingleton<IPasswordHasher,
				PasswordHasher>();
		services.AddSingleton<IExportPdf, ExportPdf>();
		services.AddAuthentication(
				JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(
				options =>
				{
					options.TokenValidationParameters =
						new TokenValidationParameters
						{
							ValidateIssuer = true,
							ValidateAudience = true,
							ValidateLifetime = true,
							ValidateIssuerSigningKey = true,
							ValidIssuer =
								jwtSettings.Issuer,
							ValidAudience =
								jwtSettings.Audience,
							IssuerSigningKey =
								new SymmetricSecurityKey(
									Encoding.UTF8.GetBytes(
										jwtSettings.Secret))
						};
					options.Events = new JwtBearerEvents
					{
						OnMessageReceived = context =>
						{
							var accessToken =
								context.Request.Query[
									"access_token"];

							var path = context.HttpContext
								.Request.Path;
							if ((!string.IsNullOrEmpty(
								     accessToken) &&
							     path.StartsWithSegments(
								     "/notes")) ||
							    path.StartsWithSegments(
								    "/noteEditor") ||
							    path.StartsWithSegments(
								    "/tags") ||
							    path.StartsWithSegments(
								    "/tag") ||
							    path.StartsWithSegments(
								    "/errors"))
								context.Token = accessToken;

							return Task.CompletedTask;
						}
					};
				}
			);
		return services;
	}
}