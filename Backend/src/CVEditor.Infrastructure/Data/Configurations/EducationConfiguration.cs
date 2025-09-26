using CVEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CVEditor.Infrastructure.Data.Configurations;

public class EducationConfiguration : IEntityTypeConfiguration<Education>
{
    public void Configure(EntityTypeBuilder<Education> builder)
    {
        builder.ToTable("Educations");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Degree)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.University)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Dates)
            .HasMaxLength(100);

        builder.Property(e => e.Grade)
            .HasMaxLength(100);

        builder.Property(e => e.Order)
            .HasDefaultValue(0);

        // Shadow property for foreign key
        builder.Property<Guid>("CvProfileId");

        builder.HasIndex("CvProfileId");
        builder.HasIndex(e => e.Order);
    }
}