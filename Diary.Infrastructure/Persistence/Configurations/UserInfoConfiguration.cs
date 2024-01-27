using Diary.Domain.UserInfo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Diary.Infrastructure.Persistence.Configurations;

public class UserInfoConfiguration : IEntityTypeConfiguration<UsersInfo>
{
	public void Configure(EntityTypeBuilder<UsersInfo> builder)
	{
		ConfigureUserInfoTables(builder);
	}

	private void ConfigureUserInfoTables(EntityTypeBuilder<UsersInfo> builder)
	{
		builder.ToTable("UserInfo");

		builder.HasKey(u => u.Id);

		builder.Property(u => u.Id)
			.ValueGeneratedNever();

		builder.Property(u => u.Email)
			.IsRequired();

		builder.Property(u => u.FirstName)
			.IsRequired()
			.HasMaxLength(50);

		builder.Property(u => u.LastName)
			.IsRequired()
			.HasMaxLength(50);

		builder.Property(u => u.UserId);

		builder.HasOne(u => u.User)
			.WithOne(u => u.UserInfo)
			.HasForeignKey<UsersInfo>(u => u.UserId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}