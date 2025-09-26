using CVEditor.Application.DTOs;
using CVEditor.Application.Services;
using FastEndpoints;

namespace CVEditor.API.Endpoints.CvProfiles;

public class SearchCvProfilesRequest
{
    public string Name { get; set; } = string.Empty;
}

public class SearchCvProfilesEndpoint : Endpoint<SearchCvProfilesRequest, List<CvProfileDto>>
{
    public ICvProfileService ProfileService { get; set; } = null!;

    public override void Configure()
    {
        Get("/cvprofiles/search");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Search CV profiles by name";
            s.Description = "Searches for CV profiles that contain the specified name";
            s.Response<List<CvProfileDto>>(200, "Successfully retrieved matching CV profiles");
        });
    }

    public override async Task HandleAsync(SearchCvProfilesRequest req, CancellationToken ct)
    {
        var profiles = await ProfileService.SearchByNameAsync(req.Name, ct);
        await SendOkAsync(profiles.ToList(), ct);
    }
}