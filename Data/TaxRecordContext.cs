using Microsoft.EntityFrameworkCore;
using TaxRecordManager.Models;

namespace TaxRecordManager.Data
{
    public class TaxRecordContext : DbContext
    {
        public TaxRecordContext(DbContextOptions<TaxRecordContext> options)
            : base(options)
        {
        }

        public DbSet<TaxRecord> TaxRecords { get; set; }

        // Seed some sample data (optional)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaxRecord>().HasData(
                new TaxRecord
                {
                    Id = 1,
                    RecordTitle = "Freelance Income",
                    TaxYear = 2024,
                    IncomeAmount = 50000m,
                    DeductionsAmount = 5000m,
                    Notes = "Freelance projects"
                },
                new TaxRecord
                {
                    Id = 2,
                    RecordTitle = "Full-time Job",
                    TaxYear = 2024,
                    IncomeAmount = 75000m,
                    DeductionsAmount = 8000m,
                    Notes = "Employer XYZ"
                }
            );
        }
    }
}
