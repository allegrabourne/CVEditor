using CVEditor.Domain.Entities;
using CVEditor.Domain.ValueObjects;
using CVEditor.Infrastructure.Data;
using CVEditor.Infrastructure.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CVEditor.Tests.Infrastructure;

public class CvProfileRepositoryTests : IDisposable
{
    private readonly CvEditorDbContext _context;
    private readonly CvProfileRepository _repository;

    public CvProfileRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<CvEditorDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new CvEditorDbContext(options);
        _repository = new CvProfileRepository(_context);
    }

    [Fact]
    public async Task AddAsync_WithValidProfile_ShouldAddToDatabase()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);

        // Act
        var result = await _repository.AddAsync(profile);

        // Assert
        result.Should().Be(profile);
        var savedProfile = await _context.CvProfiles.FindAsync(profile.Id);
        savedProfile.Should().NotBeNull();
        savedProfile!.Name.Should().Be("Test Profile");
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingProfile_ShouldReturnProfile()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);
        await _repository.AddAsync(profile);

        // Act
        var result = await _repository.GetByIdAsync(profile.Id);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(profile.Id);
        result.Name.Should().Be("Test Profile");
    }

    [Fact]
    public async Task GetByIdAsync_WithNonExistentProfile_ShouldReturnNull()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();

        // Act
        var result = await _repository.GetByIdAsync(nonExistentId);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllNonDeletedProfiles()
    {
        // Arrange
        var personalDetails1 = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var personalDetails2 = new PersonalDetails("Jane Smith", "987-654-3210", "456 Oak St", "jane@example.com", "https://janesmith.com");
        var personalDetails3 = new PersonalDetails("Bob Wilson", "555-123-4567", "789 Pine St", "bob@example.com", "https://bobwilson.com");

        var profile1 = new CvProfile("Profile 1", personalDetails1);
        var profile2 = new CvProfile("Profile 2", personalDetails2);
        var profile3 = new CvProfile("Profile 3", personalDetails3);

        profile3.MarkAsDeleted();

        await _repository.AddAsync(profile1);
        await _repository.AddAsync(profile2);
        await _repository.AddAsync(profile3);

        // Act
        var result = await _repository.GetAllAsync();

        // Assert
        result.Should().HaveCount(2);
        result.Should().Contain(p => p.Name == "Profile 1");
        result.Should().Contain(p => p.Name == "Profile 2");
        result.Should().NotContain(p => p.Name == "Profile 3");
    }

    [Fact]
    public async Task DeleteAsync_WithExistingProfile_ShouldMarkAsDeleted()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);
        await _repository.AddAsync(profile);

        // Act
        await _repository.DeleteAsync(profile.Id);

        // Assert
        var deletedProfile = await _context.CvProfiles.IgnoreQueryFilters()
            .FirstOrDefaultAsync(p => p.Id == profile.Id);

        deletedProfile.Should().NotBeNull();
        deletedProfile!.IsDeleted.Should().BeTrue();
    }

    [Fact]
    public async Task ExistsAsync_WithExistingProfile_ShouldReturnTrue()
    {
        // Arrange
        var personalDetails = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var profile = new CvProfile("Test Profile", personalDetails);
        await _repository.AddAsync(profile);

        // Act
        var result = await _repository.ExistsAsync(profile.Id);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task ExistsAsync_WithNonExistentProfile_ShouldReturnFalse()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();

        // Act
        var result = await _repository.ExistsAsync(nonExistentId);

        // Assert
        result.Should().BeFalse();
    }

    [Fact]
    public async Task SearchByNameAsync_WithMatchingNames_ShouldReturnMatchingProfiles()
    {
        // Arrange
        var personalDetails1 = new PersonalDetails("John Doe", "123-456-7890", "123 Main St", "john@example.com", "https://johndoe.com");
        var personalDetails2 = new PersonalDetails("Jane Smith", "987-654-3210", "456 Oak St", "jane@example.com", "https://janesmith.com");
        var personalDetails3 = new PersonalDetails("Mike Johnson", "444-555-6666", "321 Elm St", "mike@example.com", "https://mikejohnson.com");

        var profile1 = new CvProfile("Software Developer", personalDetails1);
        var profile2 = new CvProfile("Senior Software Developer", personalDetails2);
        var profile3 = new CvProfile("Marketing Manager", personalDetails3);

        await _repository.AddAsync(profile1);
        await _repository.AddAsync(profile2);
        await _repository.AddAsync(profile3);

        // Act
        var result = await _repository.SearchByNameAsync("Developer");

        // Assert
        result.Should().HaveCount(2);
        result.Should().Contain(p => p.Name == "Software Developer");
        result.Should().Contain(p => p.Name == "Senior Software Developer");
        result.Should().NotContain(p => p.Name == "Marketing Manager");
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}