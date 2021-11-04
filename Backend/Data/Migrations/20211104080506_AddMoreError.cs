using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddMoreError : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("3dfdbda2-d932-446f-86da-831f9702276e"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("439141af-8254-41cb-8763-f18f56b6733a"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("5270900e-ec72-42fa-90e3-370270e430d8"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("5741899f-5e8c-4466-b474-91cc79167a74"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("8a2141bc-e9a4-46e4-ba95-dbf1074e6c46"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("8fe674f7-a428-4b6a-a92d-81a87b3e0755"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("9be6ec9c-dc14-4b72-90eb-222b7d720965"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("ae5e5244-b966-4295-9042-cf1a996a4507"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("cd5529ed-7171-4d7c-a2f4-4f1a3449eebb"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("d6e11755-073d-41d4-87cf-5eac0a51d351"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("dc35ec5d-388a-4f8b-8cc8-c0d58eaa835b"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("e761b69c-3c32-4bd9-971a-3e6bd081b9af"));

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Functionality", "Name", "ReportDate", "RetestsRequired", "StepId", "TestId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("22bd1f84-b9e5-4183-9502-036eafe67622"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Authorization", "Bug #1", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("e1c3e517-a777-47d7-8290-4eeb4d13711e"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Functional", "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("732e3666-43cd-4e3e-8e39-fdb5dbf82e25"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "UX", "Bug #3", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("32c006d0-179a-4322-bcf3-9a79eec57f22"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #4", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("bc28a86d-2e12-488d-9dde-1562b257a6fc"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #5", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("2fdd52ff-03bb-4e0b-adea-e77d5fcebfc3"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #6", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("636e8b23-d82e-4941-90cb-4c02c21839ba"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Authorization", "Bug #7", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("691dd793-63af-4cca-8f0a-cdf807536fa0"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Functional", "Bug #8", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("7d50c21c-7bd9-433a-bd1d-647e2ca4c1cd"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "UX", "Bug #9", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("ca7de2bc-78e7-46b0-a3ad-a55ee4825671"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #10", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("0bc10098-4ae2-400c-8bd7-8a17ce46bb1a"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #11", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("7927da93-68ad-473d-8e5c-1df60fd5ea7d"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #12", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("0bc10098-4ae2-400c-8bd7-8a17ce46bb1a"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("22bd1f84-b9e5-4183-9502-036eafe67622"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("2fdd52ff-03bb-4e0b-adea-e77d5fcebfc3"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("32c006d0-179a-4322-bcf3-9a79eec57f22"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("636e8b23-d82e-4941-90cb-4c02c21839ba"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("691dd793-63af-4cca-8f0a-cdf807536fa0"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("732e3666-43cd-4e3e-8e39-fdb5dbf82e25"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("7927da93-68ad-473d-8e5c-1df60fd5ea7d"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("7d50c21c-7bd9-433a-bd1d-647e2ca4c1cd"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("bc28a86d-2e12-488d-9dde-1562b257a6fc"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("ca7de2bc-78e7-46b0-a3ad-a55ee4825671"));

            migrationBuilder.DeleteData(
                table: "Errors",
                keyColumn: "Id",
                keyValue: new Guid("e1c3e517-a777-47d7-8290-4eeb4d13711e"));

            migrationBuilder.InsertData(
                table: "Errors",
                columns: new[] { "Id", "Code", "Deadline", "Description", "DeveloperId", "EndDate", "ErrorImpact", "ErrorPriority", "ErrorState", "ErrorType", "Functionality", "Name", "ReportDate", "RetestsRequired", "StepId", "TestId", "TesterId" },
                values: new object[,]
                {
                    { new Guid("9be6ec9c-dc14-4b72-90eb-222b7d720965"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Authorization", "Bug #1", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("3dfdbda2-d932-446f-86da-831f9702276e"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Functional", "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("cd5529ed-7171-4d7c-a2f4-4f1a3449eebb"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "UX", "Bug #3", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("5270900e-ec72-42fa-90e3-370270e430d8"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #4", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("d6e11755-073d-41d4-87cf-5eac0a51d351"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #5", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("439141af-8254-41cb-8763-f18f56b6733a"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #6", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("5741899f-5e8c-4466-b474-91cc79167a74"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 0, 0, "Authorization", "Bug #1", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("ae5e5244-b966-4295-9042-cf1a996a4507"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 2, 0, "Functional", "Bug #2", new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("8a2141bc-e9a4-46e4-ba95-dbf1074e6c46"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "651799e0-fccf-4e6d-a5d2-1c153ae77f72", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 2, 3, 1, "UX", "Bug #3", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("8fe674f7-a428-4b6a-a92d-81a87b3e0755"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #4", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("e761b69c-3c32-4bd9-971a-3e6bd081b9af"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #5", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" },
                    { new Guid("dc35ec5d-388a-4f8b-8cc8-c0d58eaa835b"), "B-2434343", new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Error description", "4a15e2f7-52dd-4e22-b0f4-241944216775", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0, 3, 2, "Database", "Bug #6", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Local), 2, new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"), new Guid("8c890c1a-5803-4f7b-0e6d-08d99a2156c6"), "5ffe2032-6c7c-48c6-950f-e47976b2389a" }
                });
        }
    }
}
