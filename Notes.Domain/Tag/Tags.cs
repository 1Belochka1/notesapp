using Diary.Domain.Note;
using Diary.Domain.User;
using System.Collections.ObjectModel;
using System.Text.Json.Serialization;

namespace Diary.Domain.Tag;

public class Tags
{
	public Guid Id { get; set; }

	public string Name { get; set; } = null!;

	public Guid UserId { get; set; }

	public virtual Users User { get; set; } = null!;

	[JsonIgnore]
	public virtual ICollection<Notes> Notes { get; set; } =
		new ObservableCollection<Notes>();
}