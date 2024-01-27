using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Query.GetAllByUserId;

public class GetAllTagsByUserUdQueryHandler :
	IRequestHandler<GetAllTagsByUserIdQuery,
		ICollection<Tags>?>
{
	private readonly ITagRepository _tagRepository;

	public GetAllTagsByUserUdQueryHandler(
		ITagRepository tagRepository)
	{
		_tagRepository = tagRepository;
	}

	public async Task<ICollection<Tags>?> Handle(
		GetAllTagsByUserIdQuery request,
		CancellationToken cancellationToken)
	{
		return await _tagRepository.GetAllByUserId(
			request.UserId,
			request.Search);
	}
}