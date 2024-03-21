using Microsoft.AspNetCore.SignalR;
using System.Text.Json.Serialization;

namespace Diary.Api;

public static class DependencyInjection
{
	public static IServiceCollection AddPresentation(
		this IServiceCollection services)
		{
			services.AddControllers();
			services.AddControllers()
				.AddJsonOptions(
					x =>
						x.JsonSerializerOptions
								.ReferenceHandler =
							ReferenceHandler.IgnoreCycles);

		services
			.AddSingleton<IUserIdProvider,
				CustomIdProvider>();

		services.AddSignalR(
			hubOptionsDefault =>
			{
				hubOptionsDefault.EnableDetailedErrors =
					true;
				hubOptionsDefault.KeepAliveInterval =
					TimeSpan.FromMinutes(30);
				hubOptionsDefault.HandshakeTimeout =
					TimeSpan.FromMinutes(30);
				hubOptionsDefault
						.MaximumParallelInvocationsPerClient =
					100;
				hubOptionsDefault.ClientTimeoutInterval =
					TimeSpan.FromMinutes(30);
				hubOptionsDefault.StreamBufferCapacity =
					int.MaxValue;
				hubOptionsDefault
						.MaximumReceiveMessageSize =
					long.MaxValue;
			});

		services.AddCors();
		
		return services;
	}
}