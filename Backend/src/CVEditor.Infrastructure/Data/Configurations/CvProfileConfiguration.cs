using CVEditor.Domain.Entities;
using CVEditor.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace CVEditor.Infrastructure.Data.Configurations;

public class CvProfileConfiguration : IEntityTypeConfiguration<CvProfile>
{
    public void Configure(EntityTypeBuilder<CvProfile> builder)
    {
        builder.ToTable("CvProfiles");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(200);

        // Configure PersonalDetails as owned entity (Value Object)
        builder.OwnsOne(p => p.PersonalDetails, pd =>
        {
            pd.Property(x => x.Name).HasMaxLength(200).HasColumnName("PersonalDetails_Name");
            pd.Property(x => x.Phone).HasMaxLength(50).HasColumnName("PersonalDetails_Phone");
            pd.Property(x => x.Address).HasMaxLength(500).HasColumnName("PersonalDetails_Address");
            pd.Property(x => x.Email).HasMaxLength(100).HasColumnName("PersonalDetails_Email");
            pd.Property(x => x.Website).HasMaxLength(200).HasColumnName("PersonalDetails_Website");
        });

        builder.Property(p => p.Profile)
            .HasMaxLength(2000);

        builder.Property(p => p.Courses)
            .HasMaxLength(1000);

        // Configure collections as JSON
        builder.Property(p => p.SectionOrder)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>())
            .HasColumnType("nvarchar(max)");

        builder.Property(p => p.HiddenSections)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>())
            .HasColumnType("nvarchar(max)");

        builder.Property(p => p.SelectedTemplate)
            .IsRequired()
            .HasMaxLength(100)
            .HasDefaultValue("plain-professional");

        builder.Property(p => p.CreatedAt)
            .IsRequired();

        builder.Property(p => p.UpdatedAt)
            .IsRequired();

        builder.Property(p => p.IsDeleted)
            .HasDefaultValue(false);

        // Configure relationships
        builder.HasMany(p => p.WorkExperiences)
            .WithOne()
            .HasForeignKey("CvProfileId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.Educations)
            .WithOne()
            .HasForeignKey("CvProfileId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.PersonalProjects)
            .WithOne()
            .HasForeignKey("CvProfileId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.Certificates)
            .WithOne()
            .HasForeignKey("CvProfileId")
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(p => p.Name);
        builder.HasIndex(p => p.CreatedAt);
        builder.HasIndex(p => p.IsDeleted);
    }
}