using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Category", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Name", "ReportDate", "RetestsRequired", "StepId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("ef6d3e57-b636-4fa8-ac75-22a25fb00edb"), "Authorization", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("664ef667-24b3-4a79-986f-e8c32a5bc506"), "Functional", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("467af0df-b9b0-4b4b-89e5-ec6345d6a71f"), "UX", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("fc221c29-bce9-40c6-a5e8-ec6a2a6aabd1"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("402b0ba8-b3a8-4179-9f36-dbfc4107a07c"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("a3f0ab49-20b7-4222-92c9-8bd8ddc8a231"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("402b0ba8-b3a8-4179-9f36-dbfc4107a07c"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("467af0df-b9b0-4b4b-89e5-ec6345d6a71f"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("664ef667-24b3-4a79-986f-e8c32a5bc506"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("a3f0ab49-20b7-4222-92c9-8bd8ddc8a231"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("ef6d3e57-b636-4fa8-ac75-22a25fb00edb"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("fc221c29-bce9-40c6-a5e8-ec6a2a6aabd1"));

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
    }
}
