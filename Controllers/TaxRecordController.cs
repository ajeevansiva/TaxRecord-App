using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxRecordManager.Data;
using TaxRecordManager.DTOs;
using TaxRecordManager.Models;

namespace TaxRecordManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxRecordsController : ControllerBase
    {
        private readonly TaxRecordContext _context;

        public TaxRecordsController(TaxRecordContext context)
        {
            _context = context;
        }

        // GET: api/taxrecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxRecordDto>>> GetTaxRecords()
        {
            var records = await _context.TaxRecords
                .OrderByDescending(r => r.TaxYear)
                .ThenBy(r => r.RecordTitle)
                .ToListAsync();

            var recordDtos = records.Select(r => new TaxRecordDto
            {
                Id = r.Id,
                RecordTitle = r.RecordTitle,
                TaxYear = r.TaxYear,
                IncomeAmount = r.IncomeAmount,
                DeductionsAmount = r.DeductionsAmount,
                Notes = r.Notes,
                CreatedAt = r.CreatedAt,
                UpdatedAt = r.UpdatedAt
            }).ToList();

            return Ok(recordDtos);
        }

        // GET: api/taxrecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaxRecordDto>> GetTaxRecord(int id)
        {
            var record = await _context.TaxRecords.FindAsync(id);

            if (record == null)
            {
                return NotFound(new { message = $"Tax record with ID {id} not found." });
            }

            var recordDto = new TaxRecordDto
            {
                Id = record.Id,
                RecordTitle = record.RecordTitle,
                TaxYear = record.TaxYear,
                IncomeAmount = record.IncomeAmount,
                DeductionsAmount = record.DeductionsAmount,
                Notes = record.Notes,
                CreatedAt = record.CreatedAt,
                UpdatedAt = record.UpdatedAt
            };

            return Ok(recordDto);
        }

        // POST: api/taxrecords
        [HttpPost]
        public async Task<ActionResult<TaxRecordDto>> CreateTaxRecord(CreateTaxRecordDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = new TaxRecord
            {
                RecordTitle = createDto.RecordTitle,
                TaxYear = createDto.TaxYear,
                IncomeAmount = createDto.IncomeAmount,
                DeductionsAmount = createDto.DeductionsAmount,
                Notes = createDto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.TaxRecords.Add(record);
            await _context.SaveChangesAsync();

            var recordDto = new TaxRecordDto
            {
                Id = record.Id,
                RecordTitle = record.RecordTitle,
                TaxYear = record.TaxYear,
                IncomeAmount = record.IncomeAmount,
                DeductionsAmount = record.DeductionsAmount,
                Notes = record.Notes,
                CreatedAt = record.CreatedAt,
                UpdatedAt = record.UpdatedAt
            };

            return CreatedAtAction(nameof(GetTaxRecord), new { id = record.Id }, recordDto);
        }

        // PUT: api/taxrecords/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaxRecord(int id, UpdateTaxRecordDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.TaxRecords.FindAsync(id);
            if (record == null)
            {
                return NotFound(new { message = $"Tax record with ID {id} not found." });
            }

            record.RecordTitle = updateDto.RecordTitle;
            record.TaxYear = updateDto.TaxYear;
            record.IncomeAmount = updateDto.IncomeAmount;
            record.DeductionsAmount = updateDto.DeductionsAmount;
            record.Notes = updateDto.Notes;
            record.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/taxrecords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaxRecord(int id)
        {
            var record = await _context.TaxRecords.FindAsync(id);
            if (record == null)
            {
                return NotFound(new { message = $"Tax record with ID {id} not found." });
            }

            _context.TaxRecords.Remove(record);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaxRecordExists(int id)
        {
            return _context.TaxRecords.Any(e => e.Id == id);
        }
    }
}