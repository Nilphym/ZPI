using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddTestIdInError : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TestId",
                table: "Errors",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Errors_TestId",
                table: "Errors",
                column: "TestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Errors_Tests_TestId",
                table: "Errors",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Errors_Tests_TestId",
                table: "Errors");

            migrationBuilder.DropIndex(
                name: "IX_Errors_TestId",
                table: "Errors");

            migrationBuilder.DropColumn(
                name: "TestId",
                table: "Errors");
        }
    }
}
