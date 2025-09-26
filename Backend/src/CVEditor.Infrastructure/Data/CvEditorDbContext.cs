using CVEditor.Domain.Entities;
using CVEditor.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace CVEditor.Infrastructure.Data;

public class CvEditorDbContext : DbContext
{
    public DbSet<CvProfile> CvProfiles { get; set; } = null!;
    public DbSet<WorkExperience> WorkExperiences { get; set; } = null!;
    public DbSet<Education> Educations { get; set; } = null!;
    public DbSet<PersonalProject> PersonalProjects { get; set; } = null!;
    public DbSet<Certificate> Certificates { get; set; } = null!;

    public CvEditorDbContext(DbContextOptions<CvEditorDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new CvProfileConfiguration());
        modelBuilder.ApplyConfiguration(new WorkExperienceConfiguration());
        modelBuilder.ApplyConfiguration(new EducationConfiguration());
        modelBuilder.ApplyConfiguration(new PersonalProjectConfiguration());
        modelBuilder.ApplyConfiguration(new CertificateConfiguration());

        // Global query filters for soft delete
        modelBuilder.Entity<CvProfile>()
            .HasQueryFilter(p => !p.IsDeleted);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries<CvProfile>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property(nameof(CvProfile.CreatedAt)).CurrentValue = DateTime.UtcNow;
            }

            entry.Property(nameof(CvProfile.UpdatedAt)).CurrentValue = DateTime.UtcNow;
        }
    }
}