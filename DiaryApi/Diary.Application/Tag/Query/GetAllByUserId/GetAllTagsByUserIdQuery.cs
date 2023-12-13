using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Query.GetAllByUserId;

public record
	GetAllTagsByUserId : IRequest<ICollection<Tags>>;