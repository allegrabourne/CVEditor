namespace CVEditor.Domain.ValueObjects;

public record PersonalDetails
{
    public string Name { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Website { get; init; } = string.Empty;

    public PersonalDetails() { }

    public PersonalDetails(string name, string phone, string address, string email, string website)
    {
        Name = name?.Trim() ?? string.Empty;
        Phone = phone?.Trim() ?? string.Empty;
        Address = address?.Trim() ?? string.Empty;
        Email = ValidateEmail(email?.Trim() ?? string.Empty);
        Website = website?.Trim() ?? string.Empty;
    }

    private static string ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return string.Empty;

        // Basic email validation
        if (!email.Contains('@') || !email.Contains('.'))
            throw new ArgumentException("Invalid email format", nameof(email));

        return email;
    }

    public bool IsEmpty => string.IsNullOrWhiteSpace(Name) &&
                          string.IsNullOrWhiteSpace(Phone) &&
                          string.IsNullOrWhiteSpace(Address) &&
                          string.IsNullOrWhiteSpace(Email) &&
                          string.IsNullOrWhiteSpace(Website);
}