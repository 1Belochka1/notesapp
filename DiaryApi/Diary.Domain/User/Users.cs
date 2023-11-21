using Diary.Domain.Note;
using Diary.Domain.UserInfo;

namespace Diary.Domain.User;

public class Users
{
	public Guid Id { get; set; }

	public string Login { get; set; } = null!;

	public string PasswordHash { get; set; } = null!;

	public DateTime RegisterDate { get; set; }

	public virtual ICollection<Notes> Notes { get; set; } = new List<Notes>();

	public virtual UsersInfo? UserInfo { get; set; }
}