using Diary.Domain.Tag;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Diary.Infrastructure.Persistence.Configurations;

public class
	TagConfiguration : IEntityTypeConfiguration<Tags>
{
	public void Configure(EntityTypeBuilder<Tags> builder)
	{
		ConfigureTagsTable(builder);
	}

	private void ConfigureTagsTable(
		EntityTypeBuilder<Tags> builder)
	{
		builder.ToTable("Tag");

		builder.HasKey(t => t.Id);

		builder.Property(t => t.Id)
			.ValueGeneratedNever()
			.IsRequired();

		builder.Property(t => t.Name)
			.HasMaxLength(50)
			.IsRequired();

		builder.HasOne(t => t.User)
			.WithMany(c => c.Tags)
			.HasForeignKey(t => t.UserId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}