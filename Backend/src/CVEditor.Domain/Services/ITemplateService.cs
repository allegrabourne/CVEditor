using CVEditor.Domain.Entities;

namespace CVEditor.Domain.Services;

public interface ITemplateService
{
    Task<IEnumerable<TemplateInfo>> GetAvailableTemplatesAsync(CancellationToken cancellationToken = default);
    Task<string> GenerateHtmlAsync(CvProfile profile, string templateId, string theme = "light", CancellationToken cancellationToken = default);
    Task<byte[]> GeneratePdfAsync(CvProfile profile, string templateId, CancellationToken cancellationToken = default);
    Task<bool> IsValidTemplateAsync(string templateId, CancellationToken cancellationToken = default);
}

public record TemplateInfo
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public bool IsPremium { get; init; }
    public string PreviewImageUrl { get; init; } = string.Empty;
}