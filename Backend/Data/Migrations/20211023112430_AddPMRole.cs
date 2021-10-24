using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddPMRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { new Guid("21c5eb96-7e94-4e76-a8e9-f48d7d1e8eda"), "Authorization", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Bug #1", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("ab0e98e8-3b6a-45c7-9342-4a586536c926"), "Functional", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("d5c811a3-6e0f-44aa-8db3-129567c8ef2d"), "UX", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "Bug #3", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("97622c8c-af98-478a-acc3-bdfe1c31d1c4"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #4", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("c40d757a-0ac1-4689-ba5c-f35eff0f04cd"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #5", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("aca3aef0-25ae-4e71-9402-a1f48fe0490e"), "Database", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Bug #6", new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("21c5eb96-7e94-4e76-a8e9-f48d7d1e8eda"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("97622c8c-af98-478a-acc3-bdfe1c31d1c4"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("ab0e98e8-3b6a-45c7-9342-4a586536c926"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("aca3aef0-25ae-4e71-9402-a1f48fe0490e"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("c40d757a-0ac1-4689-ba5c-f35eff0f04cd"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("d5c811a3-6e0f-44aa-8db3-129567c8ef2d"));

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
    }
}
