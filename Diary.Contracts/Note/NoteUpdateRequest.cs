namespace Diary.Contracts.Note;

public record NoteUpdateRequest(
	Guid NoteId,
	string? Content,
	string? Name);