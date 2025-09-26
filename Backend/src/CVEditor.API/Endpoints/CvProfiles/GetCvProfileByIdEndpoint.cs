using CVEditor.Application.DTOs;
using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class GetCvProfileByIdRequest
{
    public Guid Id { get; set; }
}

public class GetCvProfileByIdEndpoint : Endpoint<GetCvProfileByIdRequest, CvProfileDto>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Get("/cvprofiles/{Id}");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Get CV profile by ID";
            s.Description = "Retrieves a specific CV profile by its ID";
            s.Response<CvProfileDto>(200, "Successfully retrieved CV profile");
            s.Response(404, "CV profile not found");
        });
    }

    public override async Task HandleAsync(GetCvProfileByIdRequest req, CancellationToken ct)
    {
        var profile = await ProfileService.GetByIdAsync(req.Id, ct);

        if (profile == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        await SendOkAsync(profile, ct);
    }
}