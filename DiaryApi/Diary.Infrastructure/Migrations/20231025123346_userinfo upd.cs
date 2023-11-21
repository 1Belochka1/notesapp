using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userinfoupd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userinfo_User_UserId",
                table: "userinfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userinfo",
                table: "userinfo");

            migrationBuilder.RenameTable(
                name: "userinfo",
                newName: "UserInfo");

            migrationBuilder.RenameIndex(
                name: "IX_userinfo_UserId",
                table: "UserInfo",
                newName: "IX_UserInfo_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInfo_User_UserId",
                table: "UserInfo",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInfo_User_UserId",
                table: "UserInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo");

            migrationBuilder.RenameTable(
                name: "UserInfo",
                newName: "userinfo");

            migrationBuilder.RenameIndex(
                name: "IX_UserInfo_UserId",
                table: "userinfo",
                newName: "IX_userinfo_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userinfo",
                table: "userinfo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_userinfo_User_UserId",
                table: "userinfo",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
