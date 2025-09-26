using CVEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace CVEditor.Infrastructure.Data.Configurations;

public class WorkExperienceConfiguration : IEntityTypeConfiguration<WorkExperience>
{
    public void Configure(EntityTypeBuilder<WorkExperience> builder)
    {
        builder.ToTable("WorkExperiences");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Company)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Dates)
            .HasMaxLength(100);

        builder.Property(e => e.Description)
            .HasMaxLength(2000);

        // Configure Responsibilities as JSON
        builder.Property(e => e.Responsibilities)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>())
            .HasColumnType("nvarchar(max)");

        builder.Property(e => e.Order)
            .HasDefaultValue(0);

        // Shadow property for foreign key
        builder.Property<Guid>("CvProfileId");

        builder.HasIndex("CvProfileId");
        builder.HasIndex(e => e.Order);
    }
}