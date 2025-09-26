using CVEditor.Domain.Entities;
using CVEditor.Domain.ValueObjects;
using FluentAssertions;
using Xunit;

namespace CVEditor.Tests.Domain;

public class CvProfileTests
{
    [Fact]
    public void Constructor_WithValidData_ShouldCreateCvProfile()
    {
        // Arrange
        var name = "Test Profile";
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");

        // Act
        var profile = new CvProfile(name, personalDetails);

        // Assert
        profile.Name.Should().Be(name);
        profile.PersonalDetails.Should().Be(personalDetails);
        profile.Id.Should().NotBeEmpty();
        profile.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        profile.UpdatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        profile.SectionOrder.Should().NotBeEmpty();
        profile.IsDeleted.Should().BeFalse();
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData(null)]
    public void Constructor_WithInvalidName_ShouldThrowArgumentException(string invalidName)
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");

        // Act & Assert
        Assert.Throws<ArgumentException>(() => new CvProfile(invalidName, personalDetails));
    }

    [Fact]
    public void Constructor_WithNullPersonalDetails_ShouldThrowArgumentNullException()
    {
        // Arrange
        var name = "Test Profile";

        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => new CvProfile(name, null!));
    }

    [Fact]
    public void UpdateName_WithValidName_ShouldUpdateName()
    {
        // Arrange
        var profile = CreateTestProfile();
        var newName = "Updated Profile Name";

        // Act
        profile.UpdateName(newName);

        // Assert
        profile.Name.Should().Be(newName);
    }

    [Fact]
    public void AddWorkExperience_WithValidExperience_ShouldAddToCollection()
    {
        // Arrange
        var profile = CreateTestProfile();
        var workExperience = new WorkExperience("Software Developer", "Tech Corp", "2020-2023", "Development work");

        // Act
        profile.AddWorkExperience(workExperience);

        // Assert
        profile.WorkExperiences.Should().Contain(workExperience);
        profile.WorkExperiences.Count.Should().Be(1);
    }

    [Fact]
    public void RemoveWorkExperience_WithExistingExperience_ShouldRemoveFromCollection()
    {
        // Arrange
        var profile = CreateTestProfile();
        var workExperience = new WorkExperience("Software Developer", "Tech Corp", "2020-2023", "Development work");
        profile.AddWorkExperience(workExperience);

        // Act
        profile.RemoveWorkExperience(workExperience.Id);

        // Assert
        profile.WorkExperiences.Should().NotContain(workExperience);
        profile.WorkExperiences.Count.Should().Be(0);
    }

    [Fact]
    public void MarkAsDeleted_ShouldSetIsDeletedToTrue()
    {
        // Arrange
        var profile = CreateTestProfile();

        // Act
        profile.MarkAsDeleted();

        // Assert
        profile.IsDeleted.Should().BeTrue();
    }

    [Fact]
    public void Restore_ShouldSetIsDeletedToFalse()
    {
        // Arrange
        var profile = CreateTestProfile();
        profile.MarkAsDeleted();

        // Act
        profile.Restore();

        // Assert
        profile.IsDeleted.Should().BeFalse();
    }

    private static CvProfile CreateTestProfile()
    {
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        return new CvProfile("Test Profile", personalDetails);
    }
}