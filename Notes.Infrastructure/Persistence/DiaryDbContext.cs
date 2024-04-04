using Diary.Domain.Note;
using Diary.Domain.Tag;
using Diary.Domain.User;
using Diary.Domain.UserInfo;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence;

public class DiaryDbContext : DbContext
{
	public DiaryDbContext(
		DbContextOptions<DiaryDbContext> options) : base(
		options)
	{
	}

	public DbSet<Users> Users { get; set; } = null!;
	public DbSet<Notes> Notes { get; set; } = null!;
	public DbSet<UsersInfo> UsersInfo { get; set; } = null!;

	public DbSet<Tags> Tags { get; set; } = null!;

	protected override void OnModelCreating(
		ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfigurationsFromAssembly(
			typeof(DiaryDbContext).Assembly);

		base.OnModelCreating(modelBuilder);
	}
}