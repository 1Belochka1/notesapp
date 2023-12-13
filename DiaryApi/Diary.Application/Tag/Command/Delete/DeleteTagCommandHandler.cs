using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Delete;

public class
	DeleteTagCommandHandler : IRequestHandler<
		DeleteTagCommand, Tags?>
{
	private readonly ITagRepository _tagRepository;

	private readonly IUnitOfWork _unitOfWork;

	public DeleteTagCommandHandler(
		ITagRepository tagRepository,
		IUnitOfWork unitOfWork)
	{
		_tagRepository = tagRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Tags?> Handle(
		DeleteTagCommand request,
		CancellationToken cancellationToken)
	{
		var tag =
			await _tagRepository.Delete(request.TagId);

		if (tag is null)
			throw new Exception("Тега не существует");

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return tag;
	}
}