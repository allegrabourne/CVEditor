using CVEditor.Application.DTOs;
using CVEditor.Application.DTOs.Requests;
using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class UpdateCvProfileRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public PersonalDetailsDto PersonalDetails { get; set; } = new();
    public string Profile { get; set; } = string.Empty;
    public List<CreateWorkExperienceRequest> WorkExperiences { get; set; } = new();
    public List<CreateEducationRequest> Educations { get; set; } = new();
    public List<CreatePersonalProjectRequest> PersonalProjects { get; set; } = new();
    public List<CreateCertificateRequest> Certificates { get; set; } = new();
    public string Courses { get; set; } = string.Empty;
    public List<string> SectionOrder { get; set; } = new();
    public List<string> HiddenSections { get; set; } = new();
    public string SelectedTemplate { get; set; } = "plain-professional";
}

public class UpdateCvProfileEndpoint : Endpoint<UpdateCvProfileRequest, CvProfileDto>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Put("/cvprofiles/{Id}");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Update a CV profile";
            s.Description = "Updates an existing CV profile with the provided data";
            s.Response<CvProfileDto>(200, "Successfully updated CV profile");
            s.Response(404, "CV profile not found");
            s.Response(400, "Invalid request data");
        });
    }

    public override async Task HandleAsync(UpdateCvProfileRequest req, CancellationToken ct)
    {
        try
        {
            // Create base request without ID for service call
            var baseRequest = new CreateCvProfileRequest
            {
                Name = req.Name,
                PersonalDetails = req.PersonalDetails,
                Profile = req.Profile,
                WorkExperiences = req.WorkExperiences,
                Educations = req.Educations,
                PersonalProjects = req.PersonalProjects,
                Certificates = req.Certificates,
                Courses = req.Courses,
                SectionOrder = req.SectionOrder,
                HiddenSections = req.HiddenSections,
                SelectedTemplate = req.SelectedTemplate
            };

            var updatedProfile = await ProfileService.UpdateAsync(req.Id, baseRequest, ct);
            await SendOkAsync(updatedProfile, ct);
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("not found"))
        {
            await SendNotFoundAsync(ct);
        }
        catch (ArgumentException ex)
        {
            ThrowError(ex.Message, 400);
        }
        catch (Exception ex)
        {
            ThrowError("An error occurred while updating the profile", 500);
        }
    }
}