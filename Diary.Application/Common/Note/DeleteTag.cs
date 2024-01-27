namespace Diary.Application.Common.Note;

public record DeleteTag(
	string NoteId,
	string TagId);