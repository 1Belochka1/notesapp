using MediatR;

namespace Diary.Application.Note.Queries.ExportPdfNote;

public record ExportPdfNoteQuery(string Html)
	: IRequest<string>;