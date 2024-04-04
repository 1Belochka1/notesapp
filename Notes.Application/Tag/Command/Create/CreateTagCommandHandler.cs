using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Create;

public class
	CreateTagCommandHandler : IRequestHandler<
	CreateTagCommand, Tags?>
{
	private readonly ITagRepository _tagRepository;

	private readonly IUnitOfWork _unitOfWork;

	public CreateTagCommandHandler(
		ITagRepository tagRepository,
		IUnitOfWork unitOfWork)
	{
		_tagRepository = tagRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Tags?> Handle(
		CreateTagCommand request,
		CancellationToken cancellationToken)
	{
		if (await _tagRepository.GetByNameTagUser(
			    request.UserId,
			    request.Name) is not null)
			throw new Exception(
				"Тег с таким названием уже существует");

		var tag = new Tags
		{
			Id = Guid.NewGuid(),
			UserId = request.UserId,
			Name = request.Name
		};

		await _tagRepository.Add(tag);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return await _tagRepository.GetById(tag.Id);
	}
}