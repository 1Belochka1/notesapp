namespace Diary.Application.Common.Interfaces.Note;

public interface IExportPdf
{
	public string Export(string html);
}