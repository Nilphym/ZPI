using Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Data.Seed;

namespace Data
{
    public class DatabaseContext : IdentityDbContext<User, IdentityRole, string>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<TestPlan> TestPlans { get; set; }
        public DbSet<TestSuite> TestSuites { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestProcedure> TestProcedures { get; set; }
        public DbSet<TestCase> TestCases { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasKey(x => x.Id);

            builder.Entity<Test>()
                .HasOne(p => p.TestCase)
                .WithMany(b => b.Tests)
                .HasForeignKey(p => p.TestCaseId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Test>()
              .HasOne(p => p.TestProcedure)
              .WithMany(p => p.Tests)
              .HasForeignKey(p => p.TestProcedureId)
              .OnDelete(DeleteBehavior.NoAction);

            // builder.Seed();
        }
    }
}
