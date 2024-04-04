using static Diary.Application.Authentication.Commands.
	Register.RegisterCommandHandler;

namespace Diary.Tests;

public class Tests
{
	[TestCase(
		"",
		"",
		"",
		"",
		"",
		"не заполненные поля инициализированы")]
	[TestCase(
		null,
		null,
		null,
		null,
		null,
		"не заполненные поля не инециализированы")]
	[TestCase(
		"123456789123456789123456789123456789123456789123456",
		"1",
		"email@email.com",
		"Belive",
		"Michkael",
		"51 символ в логине")]
	[TestCase(
		"yami",
		"123456789123456789123456789123456789123456789123456",
		"email@email.com",
		"Belive",
		"Michkael",
		"51 символ в пароле")]
	[TestCase(
		"yami2",
		"1",
		"123456789123456789123456789123456789123456789123456",
		"Belive",
		"Michkael",
		"51 символ в почте")]
	[TestCase(
		"login",
		"1",
		"login@gmail.com",
		"123456789123456789123456789123456789123456789123456",
		"Michkael",
		"51 символ в фамилии")]
	[TestCase(
		"login",
		"1",
		"login@gmail.com",
		"Belive",
		"123456789123456789123456789123456789123456789123456",
		"51 символ в имени")]
	[TestCase(
		"login",
		"1",
		"login@gmail.com",
		"Belive",
		"Michkael",
		"все поля заполнены верно(регистрация)")]
	public void
		Authorization_ValidUser_LoginAndRegSuccessful(
			string? login,
			string? password,
			string? email,
			string? lastName,
			string? firstName,
			string? message)
	{
		var valid_result = Validation_User(
			login,
			password,
			email,
			lastName,
			firstName);

		Assert.That(valid_result.Item2, Is.True, message);
	}
}