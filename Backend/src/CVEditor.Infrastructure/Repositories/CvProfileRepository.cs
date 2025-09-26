using CVEditor.Domain.Entities;
using CVEditor.Domain.Repositories;
using CVEditor.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CVEditor.Infrastructure.Repositories;

public class CvProfileRepository : ICvProfileRepository
{
    private readonly CvEditorDbContext _context;

    public CvProfileRepository(CvEditorDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<CvProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.CvProfiles
            .Include(p => p.WorkExperiences)
            .Include(p => p.Educations)
            .Include(p => p.PersonalProjects)
            .Include(p => p.Certificates)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<CvProfile>> GetAllAsync(bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        var query = _context.CvProfiles
            .Include(p => p.WorkExperiences)
            .Include(p => p.Educations)
            .Include(p => p.PersonalProjects)
            .Include(p => p.Certificates)
            .AsQueryable();

        if (includeDeleted)
        {
            query = query.IgnoreQueryFilters();
        }

        return await query
            .OrderByDescending(p => p.UpdatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<CvProfile>> GetByUserIdAsync(string userId, bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        // Note: This assumes you'll add a UserId property to CvProfile later for multi-user support
        // For now, this returns all profiles
        return await GetAllAsync(includeDeleted, cancellationToken);
    }

    public async Task<CvProfile> AddAsync(CvProfile profile, CancellationToken cancellationToken = default)
    {
        _context.CvProfiles.Add(profile);
        await _context.SaveChangesAsync(cancellationToken);
        return profile;
    }

    public async Task UpdateAsync(CvProfile profile, CancellationToken cancellationToken = default)
    {
        _context.Entry(profile).State = EntityState.Modified;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var profile = await _context.CvProfiles.FindAsync(new object[] { id }, cancellationToken);
        if (profile != null)
        {
            profile.MarkAsDeleted();
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.CvProfiles
            .AnyAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<CvProfile>> SearchByNameAsync(string name, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Enumerable.Empty<CvProfile>();
        }

        return await _context.CvProfiles
            .Include(p => p.WorkExperiences)
            .Include(p => p.Educations)
            .Include(p => p.PersonalProjects)
            .Include(p => p.Certificates)
            .Where(p => p.Name.Contains(name))
            .OrderByDescending(p => p.UpdatedAt)
            .ToListAsync(cancellationToken);
    }
}