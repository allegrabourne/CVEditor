using CVEditor.Application.DTOs;
using CVEditor.Application.DTOs.Requests;
using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class CreateCvProfileEndpoint : Endpoint<CreateCvProfileRequest, CvProfileDto>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Post("/cvprofiles");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Create a new CV profile";
            s.Description = "Creates a new CV profile with the provided data";
            s.Response<CvProfileDto>(201, "Successfully created CV profile");
            s.Response(400, "Invalid request data");
        });
    }

    public override async Task HandleAsync(CreateCvProfileRequest req, CancellationToken ct)
    {
        try
        {
            var createdProfile = await ProfileService.CreateAsync(req, ct);
            await SendCreatedAtAsync<GetCvProfileByIdEndpoint>(
                new { Id = createdProfile.Id },
                createdProfile,
                cancellation: ct);
        }
        catch (ArgumentException ex)
        {
            ThrowError(ex.Message, 400);
        }
        catch (Exception ex)
        {
            ThrowError("An error occurred while creating the profile", 500);
        }
    }
}