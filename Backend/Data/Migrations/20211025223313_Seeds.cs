using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Seeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Steps",
                columns: new[] { "Id", "ControlPoint", "Name", "StepNumber", "TestData", "TestProcedureId" },
                values: new object[] { new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "Now you sholud see main page", "Step #1", 1, null, null });

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RetestsRequired", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("4f4a5a7d-0157-4586-b0b9-0a19e0bd28d7"), "Authorization", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 26, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("538e4f8c-f5c2-42e6-80fe-bb6c5db6e9b8"), "Functional", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("b3a24575-970e-41c0-acdb-96d6750b0070"), "UX", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 26, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("57e59f01-abfa-4c54-b6ee-9e6038bde02d"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 26, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("13e548b0-3b29-4372-be05-44939ac824d0"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 26, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("9c95eff7-c4c1-46a5-90e6-e3c0c0ac3770"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 26, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("13e548b0-3b29-4372-be05-44939ac824d0"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("4f4a5a7d-0157-4586-b0b9-0a19e0bd28d7"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("538e4f8c-f5c2-42e6-80fe-bb6c5db6e9b8"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("57e59f01-abfa-4c54-b6ee-9e6038bde02d"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("9c95eff7-c4c1-46a5-90e6-e3c0c0ac3770"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("b3a24575-970e-41c0-acdb-96d6750b0070"));

            migrationBuilder.DeleteData(
                table: "Steps",
                keyColumn: "Id",
                keyValue: new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"));
        }
    }
}
