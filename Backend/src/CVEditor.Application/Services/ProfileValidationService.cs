using CVEditor.Domain.Entities;
using CVEditor.Domain.Services;

namespace CVEditor.Application.Services;

public class ProfileValidationService : IProfileValidationService
{
    public ValidationResult ValidateProfile(CvProfile profile)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        // Basic profile validation
        if (string.IsNullOrWhiteSpace(profile.Name))
            errors.Add("Profile name is required");

        // Personal details validation
        var personalDetailsResult = ValidatePersonalDetails(profile);
        errors.AddRange(personalDetailsResult.Errors);
        warnings.AddRange(personalDetailsResult.Warnings);

        // Work experience validation
        foreach (var experience in profile.WorkExperiences)
        {
            var experienceResult = ValidateWorkExperience(experience);
            errors.AddRange(experienceResult.Errors);
            warnings.AddRange(experienceResult.Warnings);
        }

        // Education validation
        foreach (var education in profile.Educations)
        {
            var educationResult = ValidateEducation(education);
            errors.AddRange(educationResult.Errors);
            warnings.AddRange(educationResult.Warnings);
        }

        // Personal projects validation
        foreach (var project in profile.PersonalProjects)
        {
            var projectResult = ValidatePersonalProject(project);
            errors.AddRange(projectResult.Errors);
            warnings.AddRange(projectResult.Warnings);
        }

        // Certificates validation
        foreach (var certificate in profile.Certificates)
        {
            var certificateResult = ValidateCertificate(certificate);
            errors.AddRange(certificateResult.Errors);
            warnings.AddRange(certificateResult.Warnings);
        }

        // Section order validation
        if (!profile.SectionOrder.Any())
            warnings.Add("No section order defined");

        // Template validation
        if (string.IsNullOrWhiteSpace(profile.SelectedTemplate))
            warnings.Add("No template selected");

        if (errors.Any())
        {
            return new ValidationResult
            {
                IsValid = false,
                Errors = errors,
                Warnings = warnings
            };
        }

        return new ValidationResult
        {
            IsValid = true,
            Warnings = warnings
        };
    }

    public ValidationResult ValidatePersonalDetails(CvProfile profile)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        if (profile.PersonalDetails.IsEmpty)
        {
            warnings.Add("Personal details are empty");
        }
        else
        {
            if (string.IsNullOrWhiteSpace(profile.PersonalDetails.Name))
                warnings.Add("Personal name is missing");

            if (string.IsNullOrWhiteSpace(profile.PersonalDetails.Email))
                warnings.Add("Email address is missing");

            if (!string.IsNullOrWhiteSpace(profile.PersonalDetails.Email) &&
                (!profile.PersonalDetails.Email.Contains('@') || !profile.PersonalDetails.Email.Contains('.')))
                errors.Add("Email address format is invalid");

            if (string.IsNullOrWhiteSpace(profile.PersonalDetails.Phone))
                warnings.Add("Phone number is missing");
        }

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors,
            Warnings = warnings
        };
    }

    public ValidationResult ValidateWorkExperience(WorkExperience experience)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        if (string.IsNullOrWhiteSpace(experience.Title))
            errors.Add($"Work experience title is required");

        if (string.IsNullOrWhiteSpace(experience.Company))
            errors.Add($"Work experience company is required");

        if (string.IsNullOrWhiteSpace(experience.Dates))
            warnings.Add($"Work experience dates are missing for {experience.Title}");

        if (string.IsNullOrWhiteSpace(experience.Description) && !experience.Responsibilities.Any())
            warnings.Add($"Work experience {experience.Title} has no description or responsibilities");

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors,
            Warnings = warnings
        };
    }

    public ValidationResult ValidateEducation(Education education)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        if (string.IsNullOrWhiteSpace(education.Degree))
            errors.Add($"Education degree is required");

        if (string.IsNullOrWhiteSpace(education.University))
            errors.Add($"Education university is required");

        if (string.IsNullOrWhiteSpace(education.Dates))
            warnings.Add($"Education dates are missing for {education.Degree}");

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors,
            Warnings = warnings
        };
    }

    public ValidationResult ValidatePersonalProject(PersonalProject project)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        if (string.IsNullOrWhiteSpace(project.Title))
            errors.Add($"Personal project title is required");

        if (string.IsNullOrWhiteSpace(project.Technologies))
            warnings.Add($"Personal project technologies are missing for {project.Title}");

        if (!project.Responsibilities.Any())
            warnings.Add($"Personal project {project.Title} has no responsibilities listed");

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors,
            Warnings = warnings
        };
    }

    public ValidationResult ValidateCertificate(Certificate certificate)
    {
        var errors = new List<string>();
        var warnings = new List<string>();

        if (string.IsNullOrWhiteSpace(certificate.Title))
            errors.Add($"Certificate title is required");

        if (certificate.IsExpired)
            warnings.Add($"Certificate {certificate.Title} has expired");

        if (certificate.ExpiryDate.HasValue && certificate.ExpiryDate.Value.AddMonths(-3) <= DateTime.UtcNow)
            warnings.Add($"Certificate {certificate.Title} expires soon");

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors,
            Warnings = warnings
        };
    }
}