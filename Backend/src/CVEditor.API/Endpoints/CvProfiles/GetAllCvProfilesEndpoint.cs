using CVEditor.Application.DTOs;
using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class GetAllCvProfilesEndpoint : EndpointWithoutRequest<List<CvProfileDto>>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Get("/cvprofiles");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Get all CV profiles";
            s.Description = "Retrieves all CV profiles in the system";
            s.Response<List<CvProfileDto>>(200, "Successfully retrieved CV profiles");
        });
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var profiles = await ProfileService.GetAllAsync(ct);
        await SendOkAsync(profiles.ToList(), ct);
    }
}