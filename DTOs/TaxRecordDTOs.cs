using System.ComponentModel.DataAnnotations;

namespace TaxRecordManager.DTOs
{
    public class TaxRecordDto
    {
        public int Id { get; set; }
        public string RecordTitle { get; set; } = string.Empty;
        public int TaxYear { get; set; }
        public decimal IncomeAmount { get; set; }
        public decimal DeductionsAmount { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateTaxRecordDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
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
    }

    public class UpdateTaxRecordDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
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
    }
}