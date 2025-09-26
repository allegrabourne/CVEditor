using AutoMapper;
using CVEditor.Application.DTOs;
using CVEditor.Application.DTOs.Requests;
using CVEditor.Application.Mapping;
using CVEditor.Application.Services;
using CVEditor.Domain.Entities;
using CVEditor.Domain.Repositories;
using CVEditor.Domain.Services;
using CVEditor.Domain.ValueObjects;
using FluentAssertions;
using Moq;
using Xunit;

namespace CVEditor.Tests.Application;

public class CvProfileServiceTests
{
    private readonly Mock<ICvProfileRepository> _mockRepository;
    private readonly Mock<IProfileValidationService> _mockValidationService;
    private readonly IMapper _mapper;
    private readonly CvProfileService _service;

    public CvProfileServiceTests()
    {
        _mockRepository = new Mock<ICvProfileRepository>();
        _mockValidationService = new Mock<IProfileValidationService>();

        var config = new MapperConfiguration(cfg => cfg.AddProfile<CvProfileMappingProfile>());
        config.AssertConfigurationIsValid();
        _mapper = config.CreateMapper();

        _service = new CvProfileService(_mockRepository.Object, _mockValidationService.Object, _mapper);
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingProfile_ShouldReturnProfileDto()
    {
        // Arrange
        var profileId = Guid.NewGuid();
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);

        _mockRepository.Setup(r => r.GetByIdAsync(profileId, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(profile);

        // Act
        var result = await _service.GetByIdAsync(profileId);

        // Assert
        result.Should().NotBeNull();
        result!.Name.Should().Be("Test Profile");
        result.PersonalDetails.Name.Should().Be("John Doe");
    }

    [Fact]
    public async Task GetByIdAsync_WithNonExistingProfile_ShouldReturnNull()
    {
        // Arrange
        var profileId = Guid.NewGuid();
        _mockRepository.Setup(r => r.GetByIdAsync(profileId, It.IsAny<CancellationToken>()))
                      .ReturnsAsync((CvProfile?)null);

        // Act
        var result = await _service.GetByIdAsync(profileId);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateAsync_WithValidRequest_ShouldCreateProfile()
    {
        // Arrange
        var request = new CreateCvProfileRequest
        {
            Name = "Test Profile",
            PersonalDetails = new PersonalDetailsDto
            {
                Name = "John Doe",
                Phone = "123-456-7890",
                Address = "123 Main St",
                Email = "john@example.com",
                Website = "https://johndoe.com"
            },
            Profile = "Software Engineer with 5 years experience",
            SelectedTemplate = "modern-creative"
        };

        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var createdProfile = new CvProfile("Test Profile", personalDetails);

        _mockRepository.Setup(r => r.AddAsync(It.IsAny<CvProfile>(), It.IsAny<CancellationToken>()))
                      .ReturnsAsync((CvProfile p, CancellationToken ct) => p);

        // Act
        var result = await _service.CreateAsync(request);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be(request.Name);
        result.PersonalDetails.Name.Should().Be(request.PersonalDetails.Name);
        result.Profile.Should().Be(request.Profile);
        result.SelectedTemplate.Should().Be(request.SelectedTemplate);

        _mockRepository.Verify(r => r.AddAsync(It.IsAny<CvProfile>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_WithExistingProfile_ShouldReturnTrue()
    {
        // Arrange
        var profileId = Guid.NewGuid();
        _mockRepository.Setup(r => r.ExistsAsync(profileId, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(true);

        // Act
        var result = await _service.DeleteAsync(profileId);

        // Assert
        result.Should().BeTrue();
        _mockRepository.Verify(r => r.DeleteAsync(profileId, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_WithNonExistingProfile_ShouldReturnFalse()
    {
        // Arrange
        var profileId = Guid.NewGuid();
        _mockRepository.Setup(r => r.ExistsAsync(profileId, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(false);

        // Act
        var result = await _service.DeleteAsync(profileId);

        // Assert
        result.Should().BeFalse();
        _mockRepository.Verify(r => r.DeleteAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task ValidateProfileAsync_WithValidProfile_ShouldReturnValidationResult()
    {
        // Arrange
        var profileId = Guid.NewGuid();
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);
        var validationResult = ValidationResult.Success();

        _mockRepository.Setup(r => r.GetByIdAsync(profileId, It.IsAny<CancellationToken>()))
                      .ReturnsAsync(profile);
        _mockValidationService.Setup(v => v.ValidateProfile(profile))
                            .Returns(validationResult);

        // Act
        var result = await _service.ValidateProfileAsync(profileId);

        // Assert
        result.Should().Be(validationResult);
        result.IsValid.Should().BeTrue();
    }
}