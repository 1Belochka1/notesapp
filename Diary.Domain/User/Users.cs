using Diary.Domain.Note;
using Diary.Domain.Tag;
using Diary.Domain.UserInfo;
using System.Collections.ObjectModel;

namespace Diary.Domain.User;

public class Users
{
	public Guid Id { get; set; }

	public string Login { get; set; } = null!;

	public string PasswordHash { get; set; } = null!;

	public DateTime RegisterDate { get; set; }

	public virtual ICollection<Notes> Notes { get; set; } =
		new ObservableCollection<Notes>();

	public virtual ICollection<Tags> Tags { get; set; } =
		new ObservableCollection<Tags>();

	public virtual UsersInfo? UserInfo { get; set; }
}