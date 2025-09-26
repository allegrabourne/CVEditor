namespace CVEditor.Domain.Entities;

public class WorkExperience
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Company { get; private set; } = string.Empty;
    public string Dates { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public List<string> Responsibilities { get; private set; } = new();
    public int Order { get; private set; }

    protected WorkExperience()
    {
        Responsibilities = new List<string>();
    }

    public WorkExperience(string title, string company, string dates, string description, List<string>? responsibilities = null, int order = 0)
    {
        Id = Guid.NewGuid();
        Title = title?.Trim() ?? string.Empty;
        Company = company?.Trim() ?? string.Empty;
        Dates = dates?.Trim() ?? string.Empty;
        Description = description?.Trim() ?? string.Empty;
        Responsibilities = responsibilities?.Where(r => !string.IsNullOrWhiteSpace(r)).ToList() ?? new List<string>();
        Order = order;
    }

    public void UpdateDetails(string title, string company, string dates, string description)
    {
        Title = title?.Trim() ?? string.Empty;
        Company = company?.Trim() ?? string.Empty;
        Dates = dates?.Trim() ?? string.Empty;
        Description = description?.Trim() ?? string.Empty;
    }

    public void UpdateResponsibilities(List<string> responsibilities)
    {
        Responsibilities = responsibilities?.Where(r => !string.IsNullOrWhiteSpace(r)).ToList() ?? new List<string>();
    }

    public void AddResponsibility(string responsibility)
    {
        if (!string.IsNullOrWhiteSpace(responsibility))
        {
            Responsibilities.Add(responsibility.Trim());
        }
    }

    public void RemoveResponsibility(string responsibility)
    {
        Responsibilities.Remove(responsibility);
    }

    public void UpdateOrder(int newOrder)
    {
        Order = newOrder;
    }
}