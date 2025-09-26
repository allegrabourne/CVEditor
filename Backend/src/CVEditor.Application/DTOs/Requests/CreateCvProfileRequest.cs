namespace CVEditor.Application.DTOs.Requests;

public record CreateCvProfileRequest
{
    public string Name { get; init; } = string.Empty;
    public PersonalDetailsDto PersonalDetails { get; init; } = new();
    public string Profile { get; init; } = string.Empty;
    public List<CreateWorkExperienceRequest> WorkExperiences { get; init; } = new();
    public List<CreateEducationRequest> Educations { get; init; } = new();
    public List<CreatePersonalProjectRequest> PersonalProjects { get; init; } = new();
    public List<CreateCertificateRequest> Certificates { get; init; } = new();
    public string Courses { get; init; } = string.Empty;
    public List<string> SectionOrder { get; init; } = new();
    public List<string> HiddenSections { get; init; } = new();
    public string SelectedTemplate { get; init; } = "plain-professional";
}

public record CreateWorkExperienceRequest
{
    public string Title { get; init; } = string.Empty;
    public string Company { get; init; } = string.Empty;
    public string Dates { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public List<string> Responsibilities { get; init; } = new();
    public int Order { get; init; }
}

public record CreateEducationRequest
{
    public string Degree { get; init; } = string.Empty;
    public string University { get; init; } = string.Empty;
    public string Dates { get; init; } = string.Empty;
    public string Grade { get; init; } = string.Empty;
    public int Order { get; init; }
}

public record CreatePersonalProjectRequest
{
    public string Title { get; init; } = string.Empty;
    public string Technologies { get; init; } = string.Empty;
    public List<string> Responsibilities { get; init; } = new();
    public int Order { get; init; }
}

public record CreateCertificateRequest
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public DateTime? IssuedDate { get; init; }
    public DateTime? ExpiryDate { get; init; }
    public string Issuer { get; init; } = string.Empty;
    public int Order { get; init; }
}