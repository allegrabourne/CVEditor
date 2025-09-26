using AutoMapper;
using CVEditor.Application.DTOs;
using CVEditor.Application.Mapping;
using CVEditor.Domain.Entities;
using CVEditor.Domain.ValueObjects;
using FluentAssertions;
using Xunit;

namespace CVEditor.Tests.Application;

public class AutoMapperTests
{
    private readonly IMapper _mapper;

    public AutoMapperTests()
    {
        var config = new MapperConfiguration(cfg => cfg.AddProfile<CvProfileMappingProfile>());
        config.AssertConfigurationIsValid(); // This will throw if configuration is invalid
        _mapper = config.CreateMapper();
    }

    [Fact]
    public void AutoMapper_Configuration_ShouldBeValid()
    {
        // Arrange & Act & Assert
        // If we get here without exception, the configuration is valid
        Assert.True(true);
    }

    [Fact]
    public void Should_Map_CvProfile_To_CvProfileDto()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);

        // Add some test data
        var workExperience = new WorkExperience("Software Developer", "Tech Corp", "2020-2023", "Development work");
        profile.AddWorkExperience(workExperience);

        var education = new Education("BSc Computer Science", "University", "2016-2020", "First Class");
        profile.AddEducation(education);

        // Act
        var dto = _mapper.Map<CvProfileDto>(profile);

        // Assert
        dto.Should().NotBeNull();
        dto.Id.Should().Be(profile.Id);
        dto.Name.Should().Be(profile.Name);
        dto.PersonalDetails.Should().NotBeNull();
        dto.PersonalDetails.Name.Should().Be("John Doe");
        dto.WorkExperiences.Should().HaveCount(1);
        dto.Educations.Should().HaveCount(1);
    }

    [Fact]
    public void Should_Map_PersonalDetails_To_PersonalDetailsDto()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");

        // Act
        var dto = _mapper.Map<PersonalDetailsDto>(personalDetails);

        // Assert
        dto.Should().NotBeNull();
        dto.Name.Should().Be("John Doe");
        dto.Phone.Should().Be("123-456-7890");
        dto.Address.Should().Be("123 Main St");
        dto.Email.Should().Be("john@example.com");
        dto.Website.Should().Be("https://johndoe.com");
    }

    [Fact]
    public void Should_Map_WorkExperience_To_WorkExperienceDto()
    {
        // Arrange
        var workExperience = new WorkExperience("Software Developer", "Tech Corp", "2020-2023", "Development work", new List<string> { "Coding", "Testing" });

        // Act
        var dto = _mapper.Map<WorkExperienceDto>(workExperience);

        // Assert
        dto.Should().NotBeNull();
        dto.Title.Should().Be("Software Developer");
        dto.Company.Should().Be("Tech Corp");
        dto.Dates.Should().Be("2020-2023");
        dto.Description.Should().Be("Development work");
        dto.Responsibilities.Should().HaveCount(2);
    }
}