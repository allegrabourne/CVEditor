namespace CVEditor.Application.DTOs;

public record CvProfileDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public PersonalDetailsDto PersonalDetails { get; init; } = new();
    public string Profile { get; init; } = string.Empty;
    public List<WorkExperienceDto> WorkExperiences { get; init; } = new();
    public List<EducationDto> Educations { get; init; } = new();
    public List<PersonalProjectDto> PersonalProjects { get; init; } = new();
    public List<CertificateDto> Certificates { get; init; } = new();
    public string Courses { get; init; } = string.Empty;
    public List<string> SectionOrder { get; init; } = new();
    public List<string> HiddenSections { get; init; } = new();
    public string SelectedTemplate { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}

public record PersonalDetailsDto
{
    public string Name { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Website { get; init; } = string.Empty;
}

public record WorkExperienceDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Company { get; init; } = string.Empty;
    public string Dates { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public List<string> Responsibilities { get; init; } = new();
    public int Order { get; init; }
}

public record EducationDto
{
    public Guid Id { get; init; }
    public string Degree { get; init; } = string.Empty;
    public string University { get; init; } = string.Empty;
    public string Dates { get; init; } = string.Empty;
    public string Grade { get; init; } = string.Empty;
    public int Order { get; init; }
}

public record PersonalProjectDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Technologies { get; init; } = string.Empty;
    public List<string> Responsibilities { get; init; } = new();
    public int Order { get; init; }
}

public record CertificateDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public DateTime? IssuedDate { get; init; }
    public DateTime? ExpiryDate { get; init; }
    public string Issuer { get; init; } = string.Empty;
    public int Order { get; init; }
    public bool IsExpired { get; init; }
}