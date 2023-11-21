using Diary.Application.Common.Interfaces.Services;

namespace Diary.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}