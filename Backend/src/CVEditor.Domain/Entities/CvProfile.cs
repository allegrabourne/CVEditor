using CVEditor.Domain.ValueObjects;

namespace CVEditor.Domain.Entities;

public class CvProfile
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public PersonalDetails PersonalDetails { get; private set; }
    public string Profile { get; private set; } = string.Empty;
    public List<WorkExperience> WorkExperiences { get; private set; } = new();
    public List<Education> Educations { get; private set; } = new();
    public List<PersonalProject> PersonalProjects { get; private set; } = new();
    public List<Certificate> Certificates { get; private set; } = new();
    public string Courses { get; private set; } = string.Empty;
    public List<string> SectionOrder { get; private set; } = new();
    public List<string> HiddenSections { get; private set; } = new();
    public string SelectedTemplate { get; private set; } = "plain-professional";
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public bool IsDeleted { get; private set; }

    protected CvProfile()
    {
        // Initialize collections for EF Core and AutoMapper
        WorkExperiences = new List<WorkExperience>();
        Educations = new List<Education>();
        PersonalProjects = new List<PersonalProject>();
        Certificates = new List<Certificate>();
        SectionOrder = new List<string>();
        HiddenSections = new List<string>();
    }

    public CvProfile(string name, PersonalDetails personalDetails)
    {
        Id = Guid.NewGuid();
        Name = ValidateName(name);
        PersonalDetails = personalDetails ?? throw new ArgumentNullException(nameof(personalDetails));
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        InitializeDefaultSectionOrder();
    }

    public void UpdateName(string name)
    {
        Name = ValidateName(name);
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdatePersonalDetails(PersonalDetails personalDetails)
    {
        PersonalDetails = personalDetails ?? throw new ArgumentNullException(nameof(personalDetails));
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateProfile(string profile)
    {
        Profile = profile ?? string.Empty;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AddWorkExperience(WorkExperience workExperience)
    {
        WorkExperiences.Add(workExperience ?? throw new ArgumentNullException(nameof(workExperience)));
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoveWorkExperience(Guid workExperienceId)
    {
        var experience = WorkExperiences.FirstOrDefault(we => we.Id == workExperienceId);
        if (experience != null)
        {
            WorkExperiences.Remove(experience);
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public void AddEducation(Education education)
    {
        Educations.Add(education ?? throw new ArgumentNullException(nameof(education)));
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoveEducation(Guid educationId)
    {
        var education = Educations.FirstOrDefault(e => e.Id == educationId);
        if (education != null)
        {
            Educations.Remove(education);
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public void AddPersonalProject(PersonalProject project)
    {
        PersonalProjects.Add(project ?? throw new ArgumentNullException(nameof(project)));
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemovePersonalProject(Guid projectId)
    {
        var project = PersonalProjects.FirstOrDefault(p => p.Id == projectId);
        if (project != null)
        {
            PersonalProjects.Remove(project);
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public void AddCertificate(Certificate certificate)
    {
        Certificates.Add(certificate ?? throw new ArgumentNullException(nameof(certificate)));
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoveCertificate(Guid certificateId)
    {
        var certificate = Certificates.FirstOrDefault(c => c.Id == certificateId);
        if (certificate != null)
        {
            Certificates.Remove(certificate);
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public void UpdateSectionOrder(List<string> newOrder)
    {
        SectionOrder = newOrder ?? throw new ArgumentNullException(nameof(newOrder));
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateHiddenSections(List<string> hiddenSections)
    {
        HiddenSections = hiddenSections ?? new List<string>();
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateSelectedTemplate(string templateName)
    {
        SelectedTemplate = !string.IsNullOrWhiteSpace(templateName) ? templateName : "plain-professional";
        UpdatedAt = DateTime.UtcNow;
    }

    public void ClearWorkExperiences()
    {
        WorkExperiences.Clear();
        UpdatedAt = DateTime.UtcNow;
    }

    public void ClearEducations()
    {
        Educations.Clear();
        UpdatedAt = DateTime.UtcNow;
    }

    public void ClearPersonalProjects()
    {
        PersonalProjects.Clear();
        UpdatedAt = DateTime.UtcNow;
    }

    public void ClearCertificates()
    {
        Certificates.Clear();
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkAsDeleted()
    {
        IsDeleted = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Restore()
    {
        IsDeleted = false;
        UpdatedAt = DateTime.UtcNow;
    }

    private static string ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Profile name cannot be empty", nameof(name));

        return name.Trim();
    }

    private void InitializeDefaultSectionOrder()
    {
        SectionOrder = new List<string>
        {
            "personal",
            "profile",
            "experience",
            "projects",
            "certificates",
            "education",
            "courses"
        };
    }
}