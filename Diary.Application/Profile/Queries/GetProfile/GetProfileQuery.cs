using Diary.Application.Profile.Common;
using MediatR;

namespace Diary.Application.Profile.Queries.GetProfile;

public record GetProfileQuery
	(string UserId) : IRequest<ProfileResult>;