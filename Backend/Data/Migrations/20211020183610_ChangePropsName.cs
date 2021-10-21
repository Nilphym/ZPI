using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class ChangePropsName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FinishDate",
                table: "Errors",
                newName: "ReportDate");

            migrationBuilder.RenameColumn(
                name: "FilingDate",
                table: "Errors",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "ErrorCategory",
                table: "Errors",
                newName: "ErrorType");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "TestProcedures",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "TestCases",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "TestProcedures");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "TestCases");

            migrationBuilder.RenameColumn(
                name: "ReportDate",
                table: "Errors",
                newName: "FinishDate");

            migrationBuilder.RenameColumn(
                name: "ErrorType",
                table: "Errors",
                newName: "ErrorCategory");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Errors",
                newName: "FilingDate");
        }
    }
}
