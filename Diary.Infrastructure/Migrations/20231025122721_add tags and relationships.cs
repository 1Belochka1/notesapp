using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addtagsandrelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "user_info_id",
                table: "calendar");

            migrationBuilder.DropForeignKey(
                name: "FK_notes_calendar_calendar_id",
                table: "notes");

            migrationBuilder.DropForeignKey(
                name: "FK_userinfo_user_userid",
                table: "userinfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "PK_calendar",
                table: "calendar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_notes",
                table: "notes");

            migrationBuilder.RenameTable(
                name: "user",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "calendar",
                newName: "Calendar");

            migrationBuilder.RenameTable(
                name: "notes",
                newName: "Note");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "userinfo",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "userinfo",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_userinfo_userid",
                table: "userinfo",
                newName: "IX_userinfo_UserId");

            migrationBuilder.RenameColumn(
                name: "login",
                table: "User",
                newName: "Login");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "User",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "register_date",
                table: "User",
                newName: "RegisterDate");

            migrationBuilder.RenameColumn(
                name: "password_hash",
                table: "User",
                newName: "PasswordHash");

            migrationBuilder.RenameIndex(
                name: "IX_user_login",
                table: "User",
                newName: "IX_User_Login");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Calendar",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Calendar",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "create_date",
                table: "Calendar",
                newName: "CreateDate");

            migrationBuilder.RenameColumn(
                name: "UserInfoId",
                table: "Calendar",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_calendar_UserInfoId",
                table: "Calendar",
                newName: "IX_Calendar_UserId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Note",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "Note",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Note",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "create_date",
                table: "Note",
                newName: "CreateDate");

            migrationBuilder.RenameColumn(
                name: "calendar_id",
                table: "Note",
                newName: "CalendarId");

            migrationBuilder.RenameIndex(
                name: "IX_notes_calendar_id",
                table: "Note",
                newName: "IX_Note_CalendarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Calendar",
                table: "Calendar",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Note",
                table: "Note",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TagNote",
                columns: table => new
                {
                    NoteId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagNote", x => new { x.NoteId, x.TagId });
                    table.ForeignKey(
                        name: "FK_TagNote_Note_TagId",
                        column: x => x.TagId,
                        principalTable: "Note",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagNote_Tag_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagNote_TagId",
                table: "TagNote",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_Calendar_User_UserId",
                table: "Calendar",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Calendar_CalendarId",
                table: "Note",
                column: "CalendarId",
                principalTable: "Calendar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_userinfo_User_UserId",
                table: "userinfo",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Calendar_User_UserId",
                table: "Calendar");

            migrationBuilder.DropForeignKey(
                name: "FK_Note_Calendar_CalendarId",
                table: "Note");

            migrationBuilder.DropForeignKey(
                name: "FK_userinfo_User_UserId",
                table: "userinfo");

            migrationBuilder.DropTable(
                name: "TagNote");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Calendar",
                table: "Calendar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Note",
                table: "Note");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "user");

            migrationBuilder.RenameTable(
                name: "Calendar",
                newName: "calendar");

            migrationBuilder.RenameTable(
                name: "Note",
                newName: "notes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "userinfo",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "userinfo",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_userinfo_UserId",
                table: "userinfo",
                newName: "IX_userinfo_userid");

            migrationBuilder.RenameColumn(
                name: "Login",
                table: "user",
                newName: "login");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "user",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "RegisterDate",
                table: "user",
                newName: "register_date");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "user",
                newName: "password_hash");

            migrationBuilder.RenameIndex(
                name: "IX_User_Login",
                table: "user",
                newName: "IX_user_login");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "calendar",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "calendar",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "CreateDate",
                table: "calendar",
                newName: "create_date");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "calendar",
                newName: "UserInfoId");

            migrationBuilder.RenameIndex(
                name: "IX_Calendar_UserId",
                table: "calendar",
                newName: "IX_calendar_UserInfoId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "notes",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "notes",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "notes",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "CreateDate",
                table: "notes",
                newName: "create_date");

            migrationBuilder.RenameColumn(
                name: "CalendarId",
                table: "notes",
                newName: "calendar_id");

            migrationBuilder.RenameIndex(
                name: "IX_Note_CalendarId",
                table: "notes",
                newName: "IX_notes_calendar_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_user",
                table: "user",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_calendar",
                table: "calendar",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_notes",
                table: "notes",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "user_info_id",
                table: "calendar",
                column: "UserInfoId",
                principalTable: "userinfo",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_notes_calendar_calendar_id",
                table: "notes",
                column: "calendar_id",
                principalTable: "calendar",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_userinfo_user_userid",
                table: "userinfo",
                column: "userid",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
