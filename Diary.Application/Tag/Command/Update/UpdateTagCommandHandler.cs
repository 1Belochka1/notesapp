using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Update;

public class
	UpdateTagCommandHandler : IRequestHandler<
		UpdateTagCommand, Tags?>
{
	private readonly ITagRepository _tagRepository;

	private readonly IUnitOfWork _unitOfWork;

	public UpdateTagCommandHandler(
		ITagRepository tagRepository,
		IUnitOfWork unitOfWork)
	{
		_tagRepository = tagRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Tags?> Handle(
		UpdateTagCommand request,
		CancellationToken cancellationToken)
	{
		var tag = await _tagRepository.Update(
			request.TagId,
			request.Name);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return tag;
	}
}