namespace CVEditor.Domain.Entities;

public class Certificate
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public DateTime? IssuedDate { get; private set; }
    public DateTime? ExpiryDate { get; private set; }
    public string Issuer { get; private set; } = string.Empty;
    public int Order { get; private set; }

    protected Certificate() { } // EF Core constructor

    public Certificate(string title, string description, DateTime? issuedDate = null, DateTime? expiryDate = null, string issuer = "", int order = 0)
    {
        Id = Guid.NewGuid();
        Title = title?.Trim() ?? string.Empty;
        Description = description?.Trim() ?? string.Empty;
        IssuedDate = issuedDate;
        ExpiryDate = expiryDate;
        Issuer = issuer?.Trim() ?? string.Empty;
        Order = order;

        if (expiryDate.HasValue && issuedDate.HasValue && expiryDate < issuedDate)
            throw new ArgumentException("Expiry date cannot be before issued date");
    }

    public void UpdateDetails(string title, string description, DateTime? issuedDate = null, DateTime? expiryDate = null, string issuer = "")
    {
        if (expiryDate.HasValue && issuedDate.HasValue && expiryDate < issuedDate)
            throw new ArgumentException("Expiry date cannot be before issued date");

        Title = title?.Trim() ?? string.Empty;
        Description = description?.Trim() ?? string.Empty;
        IssuedDate = issuedDate;
        ExpiryDate = expiryDate;
        Issuer = issuer?.Trim() ?? string.Empty;
    }

    public void UpdateOrder(int newOrder)
    {
        Order = newOrder;
    }

    public bool IsExpired => ExpiryDate.HasValue && ExpiryDate < DateTime.UtcNow;
}