using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class ChangeNameInError : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("301110ce-8810-4347-a51c-a40913035cba"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("4c3a303a-18a2-4c6b-b92e-60d87b7f2a11"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("5f4f4507-93b7-4cfe-a5cb-c5537c9e63c2"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("f4a6c88f-3af3-4936-ba1f-1a9a1f5fb277"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("f8defb30-7ede-4126-ad2a-eeeac2914d5d"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("fc5e849c-39e3-4d99-b154-a7e576b97bb0"));

            migrationBuilder.RenameColumn(
                name: "RequiredReviewCounter",
                table: "Errors",
                newName: "RetestsRequired");

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RetestsRequired", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("3fe3a816-fca8-45fd-9e1e-5584a37d1a8c"), "Authorization", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("993aafba-09f1-4152-afa5-ce492bee26b3"), "Functional", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("5b4f5558-4a60-4938-8308-d1bf4c9c30d6"), "UX", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("569cfff5-27ef-4c9f-ad0a-b3b3a6d4323d"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("5e96c419-4866-4f40-8a94-d6a0d4df47aa"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("3d1feae7-d47f-4bec-b25a-4df031657954"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("3d1feae7-d47f-4bec-b25a-4df031657954"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("3fe3a816-fca8-45fd-9e1e-5584a37d1a8c"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("569cfff5-27ef-4c9f-ad0a-b3b3a6d4323d"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("5b4f5558-4a60-4938-8308-d1bf4c9c30d6"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("5e96c419-4866-4f40-8a94-d6a0d4df47aa"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("993aafba-09f1-4152-afa5-ce492bee26b3"));

            migrationBuilder.RenameColumn(
                name: "RetestsRequired",
                table: "Errors",
                newName: "RequiredReviewCounter");

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RequiredReviewCounter", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("f8defb30-7ede-4126-ad2a-eeeac2914d5d"), "Authorization", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 22, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("f4a6c88f-3af3-4936-ba1f-1a9a1f5fb277"), "Functional", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("fc5e849c-39e3-4d99-b154-a7e576b97bb0"), "UX", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 22, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("301110ce-8810-4347-a51c-a40913035cba"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 22, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("4c3a303a-18a2-4c6b-b92e-60d87b7f2a11"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 22, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("5f4f4507-93b7-4cfe-a5cb-c5537c9e63c2"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 22, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }
    }
}
