using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updcascadedelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Calendar_User_UserId",
                table: "Calendar");

            migrationBuilder.DropForeignKey(
                name: "FK_TagNote_Note_TagId",
                table: "TagNote");

            migrationBuilder.DropForeignKey(
                name: "FK_TagNote_Tag_NoteId",
                table: "TagNote");

            migrationBuilder.AddForeignKey(
                name: "FK_Calendar_User_UserId",
                table: "Calendar",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagNote_Note_NoteId",
                table: "TagNote",
                column: "NoteId",
                principalTable: "Note",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagNote_Tag_TagId",
                table: "TagNote",
                column: "TagId",
                principalTable: "Tag",
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
                name: "FK_TagNote_Note_NoteId",
                table: "TagNote");

            migrationBuilder.DropForeignKey(
                name: "FK_TagNote_Tag_TagId",
                table: "TagNote");

            migrationBuilder.AddForeignKey(
                name: "FK_Calendar_User_UserId",
                table: "Calendar",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TagNote_Note_TagId",
                table: "TagNote",
                column: "TagId",
                principalTable: "Note",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagNote_Tag_NoteId",
                table: "TagNote",
                column: "NoteId",
                principalTable: "Tag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
