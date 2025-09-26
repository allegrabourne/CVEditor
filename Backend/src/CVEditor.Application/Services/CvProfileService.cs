using AutoMapper;
using CVEditor.Application.DTOs;
using CVEditor.Application.DTOs.Requests;
using CVEditor.Domain.Entities;
using CVEditor.Domain.Repositories;
using CVEditor.Domain.Services;
using CVEditor.Domain.ValueObjects;

namespace CVEditor.Application.Services;

public interface ICvProfileService
{
    Task<CvProfileDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<CvProfileDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<CvProfileDto> CreateAsync(CreateCvProfileRequest request, CancellationToken cancellationToken = default);
    Task<CvProfileDto> UpdateAsync(Guid id, CreateCvProfileRequest request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<CvProfileDto>> SearchByNameAsync(string name, CancellationToken cancellationToken = default);
    Task<ValidationResult> ValidateProfileAsync(Guid id, CancellationToken cancellationToken = default);
}

public class CvProfileService : ICvProfileService
{
    private readonly ICvProfileRepository _repository;
    private readonly IProfileValidationService _validationService;
    private readonly IMapper _mapper;

    public CvProfileService(
        ICvProfileRepository repository,
        IProfileValidationService validationService,
        IMapper mapper)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _validationService = validationService ?? throw new ArgumentNullException(nameof(validationService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<CvProfileDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var profile = await _repository.GetByIdAsync(id, cancellationToken);
        return profile != null ? _mapper.Map<CvProfileDto>(profile) : null;
    }

    public async Task<IEnumerable<CvProfileDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var profiles = await _repository.GetAllAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<CvProfileDto>>(profiles);
    }

    public async Task<CvProfileDto> CreateAsync(CreateCvProfileRequest request, CancellationToken cancellationToken = default)
    {
        var personalDetails = new PersonalDetails(
            request.PersonalDetails.Name,
            request.PersonalDetails.Phone,
            request.PersonalDetails.Address,
            request.PersonalDetails.Email,
            request.PersonalDetails.Website);

        var profile = new CvProfile(request.Name, personalDetails);

        // Update profile data
        profile.UpdateProfile(request.Profile);

        // Add work experiences
        foreach (var we in request.WorkExperiences)
        {
            var workExperience = new WorkExperience(we.Title, we.Company, we.Dates, we.Description, we.Responsibilities, we.Order);
            profile.AddWorkExperience(workExperience);
        }

        // Add educations
        foreach (var edu in request.Educations)
        {
            var education = new Education(edu.Degree, edu.University, edu.Dates, edu.Grade, edu.Order);
            profile.AddEducation(education);
        }

        // Add personal projects
        foreach (var proj in request.PersonalProjects)
        {
            var project = new PersonalProject(proj.Title, proj.Technologies, proj.Responsibilities, proj.Order);
            profile.AddPersonalProject(project);
        }

        // Add certificates
        foreach (var cert in request.Certificates)
        {
            var certificate = new Certificate(cert.Title, cert.Description, cert.IssuedDate, cert.ExpiryDate, cert.Issuer, cert.Order);
            profile.AddCertificate(certificate);
        }

        // Update configuration
        if (request.SectionOrder.Any())
            profile.UpdateSectionOrder(request.SectionOrder);

        if (request.HiddenSections.Any())
            profile.UpdateHiddenSections(request.HiddenSections);

        if (!string.IsNullOrWhiteSpace(request.SelectedTemplate))
            profile.UpdateSelectedTemplate(request.SelectedTemplate);

        var createdProfile = await _repository.AddAsync(profile, cancellationToken);
        return _mapper.Map<CvProfileDto>(createdProfile);
    }

    public async Task<CvProfileDto> UpdateAsync(Guid id, CreateCvProfileRequest request, CancellationToken cancellationToken = default)
    {
        var profile = await _repository.GetByIdAsync(id, cancellationToken);
        if (profile == null)
            throw new InvalidOperationException($"CV Profile with ID {id} not found");

        // Update basic info
        profile.UpdateName(request.Name);

        var personalDetails = new PersonalDetails(
            request.PersonalDetails.Name,
            request.PersonalDetails.Phone,
            request.PersonalDetails.Address,
            request.PersonalDetails.Email,
            request.PersonalDetails.Website);

        profile.UpdatePersonalDetails(personalDetails);
        profile.UpdateProfile(request.Profile);

        // Clear and re-add collections using domain methods
        profile.ClearWorkExperiences();
        foreach (var we in request.WorkExperiences)
        {
            var workExperience = new WorkExperience(we.Title, we.Company, we.Dates, we.Description, we.Responsibilities, we.Order);
            profile.AddWorkExperience(workExperience);
        }

        profile.ClearEducations();
        foreach (var edu in request.Educations)
        {
            var education = new Education(edu.Degree, edu.University, edu.Dates, edu.Grade, edu.Order);
            profile.AddEducation(education);
        }

        profile.ClearPersonalProjects();
        foreach (var proj in request.PersonalProjects)
        {
            var project = new PersonalProject(proj.Title, proj.Technologies, proj.Responsibilities, proj.Order);
            profile.AddPersonalProject(project);
        }

        profile.ClearCertificates();
        foreach (var cert in request.Certificates)
        {
            var certificate = new Certificate(cert.Title, cert.Description, cert.IssuedDate, cert.ExpiryDate, cert.Issuer, cert.Order);
            profile.AddCertificate(certificate);
        }

        // Update configuration
        profile.UpdateSectionOrder(request.SectionOrder);
        profile.UpdateHiddenSections(request.HiddenSections);
        profile.UpdateSelectedTemplate(request.SelectedTemplate);

        await _repository.UpdateAsync(profile, cancellationToken);
        return _mapper.Map<CvProfileDto>(profile);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        if (!await _repository.ExistsAsync(id, cancellationToken))
            return false;

        await _repository.DeleteAsync(id, cancellationToken);
        return true;
    }

    public async Task<IEnumerable<CvProfileDto>> SearchByNameAsync(string name, CancellationToken cancellationToken = default)
    {
        var profiles = await _repository.SearchByNameAsync(name, cancellationToken);
        return _mapper.Map<IEnumerable<CvProfileDto>>(profiles);
    }

    public async Task<ValidationResult> ValidateProfileAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var profile = await _repository.GetByIdAsync(id, cancellationToken);
        if (profile == null)
            return ValidationResult.Failure("Profile not found");

        return _validationService.ValidateProfile(profile);
    }
}