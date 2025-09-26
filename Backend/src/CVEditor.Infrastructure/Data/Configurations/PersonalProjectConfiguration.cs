using CVEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace CVEditor.Infrastructure.Data.Configurations;

public class PersonalProjectConfiguration : IEntityTypeConfiguration<PersonalProject>
{
    public void Configure(EntityTypeBuilder<PersonalProject> builder)
    {
        builder.ToTable("PersonalProjects");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Technologies)
            .HasMaxLength(500);

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