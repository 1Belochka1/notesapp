using Diary.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Diary.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<Users>
{
	public void Configure(EntityTypeBuilder<Users> builder)
	{
		ConfigureUsersTable(builder);
	}

	private void ConfigureUsersTable(EntityTypeBuilder<Users> builder)
	{
		builder.ToTable("User");

		builder.HasKey(u => u.Id);

		builder.Property(u => u.Id)
			.ValueGeneratedNever();

		builder.Property(e => e.Login)
			.HasMaxLength(50)
			.IsRequired();

		builder.HasIndex(u => u.Login)
			.IsUnique();

		builder.Property(e => e.PasswordHash)
			.HasMaxLength(100)
			.IsRequired();

		builder.Property(e => e.RegisterDate)
			.HasDefaultValueSql("CURRENT_TIMESTAMP")
			.HasColumnType("timestamp without time zone");
	}
}