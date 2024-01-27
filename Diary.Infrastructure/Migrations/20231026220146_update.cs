using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Calendar_CalendarId",
                table: "Note");

            migrationBuilder.DropTable(
                name: "Calendar");

            migrationBuilder.RenameColumn(
                name: "CalendarId",
                table: "Note",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Note_CalendarId",
                table: "Note",
                newName: "IX_Note_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_User_UserId",
                table: "Note",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_User_UserId",
                table: "Note");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Note",
                newName: "CalendarId");

            migrationBuilder.RenameIndex(
                name: "IX_Note_UserId",
                table: "Note",
                newName: "IX_Note_CalendarId");

            migrationBuilder.CreateTable(
                name: "Calendar",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calendar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Calendar_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_UserId",
                table: "Calendar",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Calendar_CalendarId",
                table: "Note",
                column: "CalendarId",
                principalTable: "Calendar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
