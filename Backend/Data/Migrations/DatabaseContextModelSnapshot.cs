﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Data.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Data.Models.Attachment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ErrorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FileExtension")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Photo")
                        .HasColumnType("ntext");

                    b.HasKey("Id");

                    b.HasIndex("ErrorId");

                    b.ToTable("Attachment");
                });

            modelBuilder.Entity("Data.Models.Error", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeveloperId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ErrorImpact")
                        .HasColumnType("int");

                    b.Property<int>("ErrorPriority")
                        .HasColumnType("int");

                    b.Property<int>("ErrorState")
                        .HasColumnType("int");

                    b.Property<int>("ErrorType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReportDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RetestsRequired")
                        .HasColumnType("int");

                    b.Property<Guid?>("StepId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TesterId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("DeveloperId");

                    b.HasIndex("StepId");

                    b.HasIndex("TesterId");

                    b.ToTable("Errors");

                    b.HasData(
                        new
                        {
                            Id = new Guid("3fe3a816-fca8-45fd-9e1e-5584a37d1a8c"),
                            Category = "Authorization",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "651799e0-fccf-4e6d-a5d2-1c153ae77f72",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 0,
                            ErrorPriority = 2,
                            ErrorState = 0,
                            ErrorType = 0,
                            Name = "Bug #1",
                            ReportDate = new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        },
                        new
                        {
                            Id = new Guid("993aafba-09f1-4152-afa5-ce492bee26b3"),
                            Category = "Functional",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 0,
                            ErrorPriority = 2,
                            ErrorState = 2,
                            ErrorType = 0,
                            Name = "Bug #2",
                            ReportDate = new DateTime(2020, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        },
                        new
                        {
                            Id = new Guid("5b4f5558-4a60-4938-8308-d1bf4c9c30d6"),
                            Category = "UX",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "651799e0-fccf-4e6d-a5d2-1c153ae77f72",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 0,
                            ErrorPriority = 2,
                            ErrorState = 3,
                            ErrorType = 1,
                            Name = "Bug #3",
                            ReportDate = new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        },
                        new
                        {
                            Id = new Guid("569cfff5-27ef-4c9f-ad0a-b3b3a6d4323d"),
                            Category = "Database",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 1,
                            ErrorPriority = 0,
                            ErrorState = 3,
                            ErrorType = 2,
                            Name = "Bug #4",
                            ReportDate = new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        },
                        new
                        {
                            Id = new Guid("5e96c419-4866-4f40-8a94-d6a0d4df47aa"),
                            Category = "Database",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 1,
                            ErrorPriority = 0,
                            ErrorState = 3,
                            ErrorType = 2,
                            Name = "Bug #5",
                            ReportDate = new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        },
                        new
                        {
                            Id = new Guid("3d1feae7-d47f-4bec-b25a-4df031657954"),
                            Category = "Database",
                            Deadline = new DateTime(2021, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Error description",
                            DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                            EndDate = new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ErrorImpact = 1,
                            ErrorPriority = 0,
                            ErrorState = 3,
                            ErrorType = 2,
                            Name = "Bug #6",
                            ReportDate = new DateTime(2021, 10, 23, 0, 0, 0, 0, DateTimeKind.Local),
                            RetestsRequired = 2,
                            StepId = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                        });
                });

            modelBuilder.Entity("Data.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Data.Models.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ErrorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActual")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TesterId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("ErrorId");

                    b.HasIndex("TesterId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Data.Models.Step", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ControlPoint")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StepNumber")
                        .HasColumnType("int");

                    b.Property<string>("TestData")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TestProcedureId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TestProcedureId");

                    b.ToTable("Steps");

                    b.HasData(
                        new
                        {
                            Id = new Guid("b36f4804-5713-4e63-04d2-08d98ef5f25b"),
                            ControlPoint = "Now you sholud see main page",
                            Name = "Step #1",
                            StepNumber = 1
                        });
                });

            modelBuilder.Entity("Data.Models.Test", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ExecutionCounter")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TestCaseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("TestProcedureId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("TestSuiteId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TestCaseId");

                    b.HasIndex("TestProcedureId");

                    b.HasIndex("TestSuiteId");

                    b.ToTable("Tests");
                });

            modelBuilder.Entity("Data.Models.TestCase", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EntryData")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Preconditions")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TestCases");
                });

            modelBuilder.Entity("Data.Models.TestPlan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("TestPlans");
                });

            modelBuilder.Entity("Data.Models.TestProcedure", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Result")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TestCaseId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TestCaseId");

                    b.ToTable("TestProcedures");
                });

            modelBuilder.Entity("Data.Models.TestSuite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TestPlanId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TestPlanId");

                    b.ToTable("TestSuites");
                });

            modelBuilder.Entity("Data.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Data.Models.Developer", b =>
                {
                    b.HasBaseType("Data.Models.User");

                    b.HasDiscriminator().HasValue("Developer");
                });

            modelBuilder.Entity("Data.Models.Tester", b =>
                {
                    b.HasBaseType("Data.Models.User");

                    b.HasDiscriminator().HasValue("Tester");
                });

            modelBuilder.Entity("Data.Models.Attachment", b =>
                {
                    b.HasOne("Data.Models.Error", "Error")
                        .WithMany("Attachment")
                        .HasForeignKey("ErrorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Error");
                });

            modelBuilder.Entity("Data.Models.Error", b =>
                {
                    b.HasOne("Data.Models.Developer", "Developer")
                        .WithMany("Errors")
                        .HasForeignKey("DeveloperId");

                    b.HasOne("Data.Models.Step", "Step")
                        .WithMany("Errors")
                        .HasForeignKey("StepId");

                    b.HasOne("Data.Models.Tester", "Tester")
                        .WithMany("Errors")
                        .HasForeignKey("TesterId");

                    b.Navigation("Developer");

                    b.Navigation("Step");

                    b.Navigation("Tester");
                });

            modelBuilder.Entity("Data.Models.Review", b =>
                {
                    b.HasOne("Data.Models.Error", "Error")
                        .WithMany("Reviews")
                        .HasForeignKey("ErrorId");

                    b.HasOne("Data.Models.Tester", null)
                        .WithMany("Reviews")
                        .HasForeignKey("TesterId");

                    b.Navigation("Error");
                });

            modelBuilder.Entity("Data.Models.Step", b =>
                {
                    b.HasOne("Data.Models.TestProcedure", "TestProcedure")
                        .WithMany("Steps")
                        .HasForeignKey("TestProcedureId");

                    b.Navigation("TestProcedure");
                });

            modelBuilder.Entity("Data.Models.Test", b =>
                {
                    b.HasOne("Data.Models.TestCase", "TestCase")
                        .WithMany("Tests")
                        .HasForeignKey("TestCaseId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Data.Models.TestProcedure", "TestProcedure")
                        .WithMany("Tests")
                        .HasForeignKey("TestProcedureId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Data.Models.TestSuite", "TestSuite")
                        .WithMany("Tests")
                        .HasForeignKey("TestSuiteId");

                    b.Navigation("TestCase");

                    b.Navigation("TestProcedure");

                    b.Navigation("TestSuite");
                });

            modelBuilder.Entity("Data.Models.TestPlan", b =>
                {
                    b.HasOne("Data.Models.Product", "Produkt")
                        .WithMany("TestPlans")
                        .HasForeignKey("ProductId");

                    b.Navigation("Produkt");
                });

            modelBuilder.Entity("Data.Models.TestProcedure", b =>
                {
                    b.HasOne("Data.Models.TestCase", "TestCase")
                        .WithMany("TestProcedures")
                        .HasForeignKey("TestCaseId");

                    b.Navigation("TestCase");
                });

            modelBuilder.Entity("Data.Models.TestSuite", b =>
                {
                    b.HasOne("Data.Models.TestPlan", "TestPlan")
                        .WithMany("TestSuites")
                        .HasForeignKey("TestPlanId");

                    b.Navigation("TestPlan");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Data.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Data.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Data.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Data.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.Error", b =>
                {
                    b.Navigation("Attachment");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("Data.Models.Product", b =>
                {
                    b.Navigation("TestPlans");
                });

            modelBuilder.Entity("Data.Models.Step", b =>
                {
                    b.Navigation("Errors");
                });

            modelBuilder.Entity("Data.Models.TestCase", b =>
                {
                    b.Navigation("TestProcedures");

                    b.Navigation("Tests");
                });

            modelBuilder.Entity("Data.Models.TestPlan", b =>
                {
                    b.Navigation("TestSuites");
                });

            modelBuilder.Entity("Data.Models.TestProcedure", b =>
                {
                    b.Navigation("Steps");

                    b.Navigation("Tests");
                });

            modelBuilder.Entity("Data.Models.TestSuite", b =>
                {
                    b.Navigation("Tests");
                });

            modelBuilder.Entity("Data.Models.Developer", b =>
                {
                    b.Navigation("Errors");
                });

            modelBuilder.Entity("Data.Models.Tester", b =>
                {
                    b.Navigation("Errors");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
