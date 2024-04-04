using Diary.Domain.User;
using System.Text.Json.Serialization;

namespace Diary.Domain.UserInfo;

public class UsersInfo
{
	public Guid Id { get; set; } = Guid.NewGuid();

	public Guid UserId { get; set; }

	public string Email { get; set; } = null!;

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	[JsonIgnore]
	public virtual Users User { get; set; } = null!;
}