### User

```json
{
	"Id": "00000000-0000-0000-0000-0000000000",
	"NikName": "1.Belochka.1",
	"PasswordHash": "2as3asdf3hus12whd312foi23u4hc094yh9asdf",
	"RegisterDate": "2023-02-20T13:30:00.0000000"
}
```

### UserInfo

```json
{
	"Id": "00000000-0000-0000-0000-0000000000",
	"UserId": "00000000-0000-0000-0000-0000000000",
	"Email": "belochkaGnom@yandex.ru",
	"FirstName": "Mikhail",
	"LastName": "Belov",
    "Calendars": [
      "Calendar",
      "Calendar"
    ]
}
```

### Calendar

```json
{
	"Id": "00000000-0000-0000-0000-0000000000",
	"Name": "Ежедневник",
	"UserId": "00000000-0000-0000-0000-0000000000",
	"Notes": [
		{ "NotesId": "00000000-0000-0000-0000-0000000000" },
		{ "NotesId": "00000000-0000-0000-0000-0000000000" }
	],
	"CreateDate": "2023-02-20T13:30:00.0000000"
}
```

### Notes

```json
{
	"Id": "00000000-0000-0000-0000-0000000000",
	"Name": "Ежедневник",
	"UserId": "00000000-0000-0000-0000-0000000000",
	"Content": {},
	"CreateDate": "2023-02-20T13:30:00.0000000"
}
```

```csharp
public class User 
{
    public Guid Id { get; set; }
    public string NickName { get; set; }
    public string PasswordHash { get; set; }  
    public DateTime RegisterDate { get; set; }
    
    public UserInfo UserInfo { get; set; }
}

public class UserInfo
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public List<Guid> CalendarIds { get; set; }
    public List<Calendar> Calendars { get; set; }
}

public class Calendar
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid UserInfoId { get; set; }
    
    public List<Note> Notes { get; set; }
    
    public DateTime CreateDate { get; set; }
}

public class Note 
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid UserId { get; set; }
    public string Content { get; set; }
    public DateTime CreateDate { get; set; }
}
```
