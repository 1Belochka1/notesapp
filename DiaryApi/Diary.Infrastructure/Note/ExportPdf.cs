using Diary.Application.Common.Interfaces.Note;
using PdfSharp;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace Diary.Infrastructure.Note;

public class ExportPdf : IExportPdf
{
	public string Export(string html)
	{
		html =
			$"<html><body>{html}</body></html>";

		var stream = new MemoryStream();

		byte[] pdfBytes = null;
		using (var ms = new MemoryStream())
		{
			var pdf = PdfGenerator.GeneratePdf(
				html,
				PageSize.A4);

			pdf.Save(ms);
			pdfBytes = ms.ToArray();
		}

		return Convert.ToBase64String(pdfBytes);
	}
}