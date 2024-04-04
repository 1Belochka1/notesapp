using Diary.Application.Common.Interfaces.Note;
using MediatR;

namespace Diary.Application.Note.Queries.ExportPdfNote;

public class
	ExportPdfNoteQueryHandler : IRequestHandler<
	ExportPdfNoteQuery, string>
{
	private readonly IExportPdf _exportPdf;

	public ExportPdfNoteQueryHandler(IExportPdf exportPdf)
	{
		_exportPdf = exportPdf;
	}

	public async Task<string> Handle(
		ExportPdfNoteQuery request,
		CancellationToken cancellationToken)
	{
		return _exportPdf.Export(request.Html);
	}
}