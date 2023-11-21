using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nikname",
                table: "user",
                newName: "login");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "login",
                table: "user",
                newName: "nikname");
        }
    }
}
