namespace CVEditor.Domain.Entities;

public class Education
{
    public Guid Id { get; private set; }
    public string Degree { get; private set; } = string.Empty;
    public string University { get; private set; } = string.Empty;
    public string Dates { get; private set; } = string.Empty;
    public string Grade { get; private set; } = string.Empty;
    public int Order { get; private set; }

    protected Education() { } // EF Core constructor

    public Education(string degree, string university, string dates, string grade = "", int order = 0)
    {
        Id = Guid.NewGuid();
        Degree = degree?.Trim() ?? string.Empty;
        University = university?.Trim() ?? string.Empty;
        Dates = dates?.Trim() ?? string.Empty;
        Grade = grade?.Trim() ?? string.Empty;
        Order = order;
    }

    public void UpdateDetails(string degree, string university, string dates, string grade)
    {
        Degree = degree?.Trim() ?? string.Empty;
        University = university?.Trim() ?? string.Empty;
        Dates = dates?.Trim() ?? string.Empty;
        Grade = grade?.Trim() ?? string.Empty;
    }

    public void UpdateOrder(int newOrder)
    {
        Order = newOrder;
    }
}