using CVEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CVEditor.Infrastructure.Data.Configurations;

public class CertificateConfiguration : IEntityTypeConfiguration<Certificate>
{
    public void Configure(EntityTypeBuilder<Certificate> builder)
    {
        builder.ToTable("Certificates");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Description)
            .HasMaxLength(1000);

        builder.Property(e => e.Issuer)
            .HasMaxLength(200);

        builder.Property(e => e.IssuedDate);

        builder.Property(e => e.ExpiryDate);

        builder.Property(e => e.Order)
            .HasDefaultValue(0);

        // Shadow property for foreign key
        builder.Property<Guid>("CvProfileId");

        builder.HasIndex("CvProfileId");
        builder.HasIndex(e => e.Order);
        builder.HasIndex(e => e.IssuedDate);
        builder.HasIndex(e => e.ExpiryDate);
    }
}