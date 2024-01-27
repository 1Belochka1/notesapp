using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userupdateloginunique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_user_login",
                table: "user",
                column: "login",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_user_login",
                table: "user");
        }
    }
}
