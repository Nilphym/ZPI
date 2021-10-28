using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddConectionBetweenProductAndTestCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("24753115-2fba-443b-baf7-44b6866328de"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("7ebfae20-e170-4045-b45f-4de1ac30b557"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("a37ae294-4d8f-4a78-9e44-d482c32ab483"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("d3e6c09b-7426-44bf-ae1d-ef2e30fc5baf"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("ef6a4b18-95eb-44b8-a495-c47e0049d77f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("fea42f48-3a7f-4b4a-bd40-974a283f57c8"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProductId",
                table: "TestCases",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RetestsRequired", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("03562429-5371-4c2a-aab5-c73391f4a09d"), "Authorization", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("0f16365f-0292-45f4-8388-7430ec5f2de9"), "Functional", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("a17537e0-5246-4f33-99ea-87973e44ead2"), "UX", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("af94b298-bb63-4290-8e13-c12f3cec7ac1"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("070100fd-6f2a-4275-a525-e11858e8ddd1"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("473fa2b2-f2ab-48b2-a0c7-6fb8cb4489ff"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestCases_ProductId",
                table: "TestCases",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestCases_Products_ProductId",
                table: "TestCases",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestCases_Products_ProductId",
                table: "TestCases");

            migrationBuilder.DropIndex(
                name: "IX_TestCases_ProductId",
                table: "TestCases");

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("03562429-5371-4c2a-aab5-c73391f4a09d"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("070100fd-6f2a-4275-a525-e11858e8ddd1"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("0f16365f-0292-45f4-8388-7430ec5f2de9"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("473fa2b2-f2ab-48b2-a0c7-6fb8cb4489ff"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("a17537e0-5246-4f33-99ea-87973e44ead2"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("af94b298-bb63-4290-8e13-c12f3cec7ac1"));

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "TestCases");

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RetestsRequired", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("fea42f48-3a7f-4b4a-bd40-974a283f57c8"), "Authorization", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("ef6a4b18-95eb-44b8-a495-c47e0049d77f"), "Functional", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("7ebfae20-e170-4045-b45f-4de1ac30b557"), "UX", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("24753115-2fba-443b-baf7-44b6866328de"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("a37ae294-4d8f-4a78-9e44-d482c32ab483"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("d3e6c09b-7426-44bf-ae1d-ef2e30fc5baf"), "Database", "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 28, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }
    }
}
