using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class DeleteCvProfileRequest
{
    public Guid Id { get; set; }
}

public class DeleteCvProfileEndpoint : Endpoint<DeleteCvProfileRequest>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Delete("/cvprofiles/{Id}");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Delete a CV profile";
            s.Description = "Soft deletes a CV profile by marking it as deleted";
            s.Response(204, "Successfully deleted CV profile");
            s.Response(404, "CV profile not found");
        });
    }

    public override async Task HandleAsync(DeleteCvProfileRequest req, CancellationToken ct)
    {
        var deleted = await ProfileService.DeleteAsync(req.Id, ct);

        if (!deleted)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        await SendNoContentAsync(ct);
    }
}