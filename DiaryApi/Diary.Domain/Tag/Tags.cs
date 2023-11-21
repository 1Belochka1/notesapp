using Diary.Domain.Note;

namespace Diary.Domain.Tag;

public class Tags
{
	public Guid Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<Notes> Notes { get; set; }
}