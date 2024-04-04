using System.Text;

namespace Diary.Infrastructure;

public class Windows1252EncodingProvider : EncodingProvider
{
	public override Encoding? GetEncoding(int codepage)
	{
		if (codepage == 1252) return new UTF8Encoding();

		return null;
	}

	public override Encoding? GetEncoding(string name)
	{
		throw new NotImplementedException();
	}
}