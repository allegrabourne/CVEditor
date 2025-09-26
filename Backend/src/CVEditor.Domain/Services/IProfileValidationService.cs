using CVEditor.Domain.Entities;

namespace CVEditor.Domain.Services;

public interface IProfileValidationService
{
    ValidationResult ValidateProfile(CvProfile profile);
    ValidationResult ValidatePersonalDetails(CvProfile profile);
    ValidationResult ValidateWorkExperience(WorkExperience experience);
    ValidationResult ValidateEducation(Education education);
    ValidationResult ValidatePersonalProject(PersonalProject project);
    ValidationResult ValidateCertificate(Certificate certificate);
}

public record ValidationResult
{
    public bool IsValid { get; init; }
    public List<string> Errors { get; init; } = new();
    public List<string> Warnings { get; init; } = new();

    public static ValidationResult Success() => new() { IsValid = true };
    public static ValidationResult Failure(params string[] errors) => new()
    {
        IsValid = false,
        Errors = errors.ToList()
    };
    public static ValidationResult Warning(params string[] warnings) => new()
    {
        IsValid = true,
        Warnings = warnings.ToList()
    };
}