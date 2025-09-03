using System.ComponentModel.DataAnnotations;

namespace TaxRecordManager.Models
{
    public class TaxRecord
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string RecordTitle { get; set; } = string.Empty;
        
        [Required]
        [Range(1900, 3000)]
        public int TaxYear { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal IncomeAmount { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal DeductionsAmount { get; set; }
        
        [StringLength(1000)]
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}