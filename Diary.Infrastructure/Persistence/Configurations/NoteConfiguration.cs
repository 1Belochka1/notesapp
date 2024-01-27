using Diary.Domain.Note;
using Diary.Domain.Tag;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Diary.Infrastructure.Persistence.Configurations;

public class
	NoteConfiguration : IEntityTypeConfiguration<Notes>
{
	public void Configure(EntityTypeBuilder<Notes> builder)
	{
		ConfigureNotesTable(builder);
	}

	private void ConfigureNotesTable(
		EntityTypeBuilder<Notes> builder)
	{
		builder.ToTable("Note");

		builder.HasKey(n => n.Id);

		builder.Property(n => n.Id)
			.ValueGeneratedNever();

		builder.Property(n => n.Name)
			.HasMaxLength(100);

		builder.Property(n => n.Content)
			.IsRequired();

		builder.Property(n => n.CreateDate)
			.HasDefaultValueSql("CURRENT_TIMESTAMP")
			.HasColumnType("timestamp without time zone");

		builder.HasOne(n => n.User)
			.WithMany(c => c.Notes)
			.HasForeignKey(n => n.UserId)
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasMany(n => n.Tags)
			.WithMany(t => t.Notes)
			.UsingEntity<Dictionary<string, object>>(
				"TagNote",
				j =>
					j.HasOne<Tags>()
						.WithMany()
						.HasForeignKey("TagId")
						.OnDelete(DeleteBehavior.Cascade),
				j =>
					j.HasOne<Notes>()
						.WithMany()
						.HasForeignKey("NoteId")
						.OnDelete(DeleteBehavior.Cascade)
			);
	}
}