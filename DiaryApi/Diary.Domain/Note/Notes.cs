using Diary.Domain.Tag;
using Diary.Domain.User;

namespace Diary.Domain.Note;

public class Notes
{
	public Guid Id { get; set; } = Guid.NewGuid();

	public string Name { get; set; } = null!;

	public string Content { get; set; } = null!;

	public DateTime CreateDate { get; set; }

	public Guid UserId { get; set; }

	public virtual Users User { get; set; } = null!;

	public virtual ICollection<Tags> Tags { get; set; } =
		null!;
}