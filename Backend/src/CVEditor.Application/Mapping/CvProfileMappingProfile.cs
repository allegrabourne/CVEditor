using AutoMapper;
using CVEditor.Application.DTOs;
using CVEditor.Domain.Entities;

namespace CVEditor.Application.Mapping;

public class CvProfileMappingProfile : Profile
{
    public CvProfileMappingProfile()
    {
        // Domain to DTO mappings
        CreateMap<CvProfile, CvProfileDto>();

        CreateMap<Domain.ValueObjects.PersonalDetails, PersonalDetailsDto>();

        CreateMap<WorkExperience, WorkExperienceDto>();

        CreateMap<Education, EducationDto>();

        CreateMap<PersonalProject, PersonalProjectDto>();

        CreateMap<Certificate, CertificateDto>()
            .ForMember(dest => dest.IsExpired, opt => opt.MapFrom(src => src.IsExpired));

        // AutoMapper automatically handles collection mappings when individual mappings are defined
        // No need to explicitly map List<T> to List<TDto>
    }
}