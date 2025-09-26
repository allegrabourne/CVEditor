namespace CVEditor.Domain.Entities;

public class PersonalProject
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Technologies { get; private set; } = string.Empty;
    public List<string> Responsibilities { get; private set; } = new();
    public int Order { get; private set; }

    protected PersonalProject()
    {
        Responsibilities = new List<string>();
    }

    public PersonalProject(string title, string technologies, List<string>? responsibilities = null, int order = 0)
    {
        Id = Guid.NewGuid();
        Title = title?.Trim() ?? string.Empty;
        Technologies = technologies?.Trim() ?? string.Empty;
        Responsibilities = responsibilities?.Where(r => !string.IsNullOrWhiteSpace(r)).ToList() ?? new List<string>();
        Order = order;
    }

    public void UpdateDetails(string title, string technologies)
    {
        Title = title?.Trim() ?? string.Empty;
        Technologies = technologies?.Trim() ?? string.Empty;
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