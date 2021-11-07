using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddTestIdToErrorSeeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
               table: "Errors",
               keyColumn: "Id",
               keyValue: new Guid("24aaaecd-82cd-4969-98bb-b0b94687557f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("362c140f-d463-4086-8b61-b470d74aa2f6"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("671dc60c-396d-47d5-b32e-c80863c2601f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("73bf71ed-e96d-4424-9751-674dd9154c13"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("7f7fdbf2-fdfc-413c-b4ce-480704981d44"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("e8af5fcc-b092-4bf4-8528-dbdaae1ce254"));    

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Functionality", "Name", "ReportDate", "RetestsRequired", "StepId", "TestId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("671dc60c-396d-47d5-b32e-c80863c2601f"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Authorization", "Bug #1", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("e8af5fcc-b092-4bf4-8528-dbdaae1ce254"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Functional", "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("362c140f-d463-4086-8b61-b470d74aa2f6"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "UX", "Bug #3", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("73bf71ed-e96d-4424-9751-674dd9154c13"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #4", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("7f7fdbf2-fdfc-413c-b4ce-480704981d44"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #5", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("24aaaecd-82cd-4969-98bb-b0b94687557f"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #6", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("24aaaecd-82cd-4969-98bb-b0b94687557f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("362c140f-d463-4086-8b61-b470d74aa2f6"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("671dc60c-396d-47d5-b32e-c80863c2601f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("73bf71ed-e96d-4424-9751-674dd9154c13"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("7f7fdbf2-fdfc-413c-b4ce-480704981d44"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("e8af5fcc-b092-4bf4-8528-dbdaae1ce254"));
        }
    }
}
