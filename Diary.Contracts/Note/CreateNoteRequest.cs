namespace Diary.Contracts.Note;

public record CreateNoteRequest(
	string Content,
	string Name);