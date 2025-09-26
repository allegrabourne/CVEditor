using CVEditor.Domain.Entities;

namespace CVEditor.Domain.Repositories;

public interface ICvProfileRepository
{
    Task<CvProfile?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<CvProfile>> GetAllAsync(bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<IEnumerable<CvProfile>> GetByUserIdAsync(string userId, bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<CvProfile> AddAsync(CvProfile profile, CancellationToken cancellationToken = default);
    Task UpdateAsync(CvProfile profile, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<CvProfile>> SearchByNameAsync(string name, CancellationToken cancellationToken = default);
}