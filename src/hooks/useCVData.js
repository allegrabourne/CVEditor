import { useState, useCallback } from 'react';

export const useCVData = (initialData) => {
  const [cvData, setCvData] = useState(initialData);

  const updatePersonalDetails = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  }, []);

  const updateProfile = useCallback((value) => {
    setCvData(prev => ({ ...prev, profile: value }));
  }, []);

  const addEducation = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: "",
        university: "",
        dates: "",
        grade: ""    }]
    }));
  }, []);

  const updateEducation = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((education, i) => 
        i === index ? { ...education, [field]: value } : education
    )
  }), [])});

  const removeEducation = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  }, []);

  const updateCourses = useCallback((value) => {
    setCvData(prev => ({ ...prev, courses: value }));
  }, []);

  const addWorkExperience = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        title: "",
        company: "",
        dates: "",
        description: "",
        responsibilities: [""]
      }]
    }));
  }, []);

  const updateWorkExperience = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  }, []);

  const removeWorkExperience = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  }, []);

  const addResponsibility = useCallback((jobIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? { ...job, responsibilities: [...job.responsibilities, ""] } : job
      )
    }));
  }, []);

  const updateResponsibility = useCallback((jobIndex, respIndex, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.map((resp, j) => 
            j === respIndex ? value : resp
          )
        } : job
      )
    }));
  }, []);

  const removeResponsibility = useCallback((jobIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.filter((_, j) => j !== respIndex)
        } : job
      )
    }));
  }, []);

  // Personal projects functions
  const addPersonalProject = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      personalProjects: [...prev.personalProjects, {
        title: "",
        technologies: "",
        responsibilities: [""]
      }]
    }));
  }, []);

  const updatePersonalProject = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  }, []);

  const removePersonalProject = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.filter((_, i) => i !== index)
    }));
  }, []);

  const addProjectResponsibility = useCallback((projectIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? { ...project, responsibilities: [...project.responsibilities, ""] } : project
      )
    }));
  }, []);

  const updateProjectResponsibility = useCallback((projectIndex, respIndex, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.map((resp, j) => 
            j === respIndex ? value : resp
          )
        } : project
      )
    }));
  }, []);

  const removeProjectResponsibility = useCallback((projectIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.filter((_, j) => j !== respIndex)
        } : project
      )
    }));
  }, []);

  // Certificates functions
  const addCertificate = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        title: "",
        description: ""
      }]
    }));
  }, []);

  const updateCertificate = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  }, []);

  const removeCertificate = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  }, []);

  return {
    cvData,
    setCvData,
    updatePersonalDetails,
    updateProfile,
    addEducation,
    removeEducation,
    updateEducation,
    updateCourses,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addResponsibility,
    updateResponsibility,
    removeResponsibility,
    addPersonalProject,
    updatePersonalProject,
    removePersonalProject,
    addProjectResponsibility,
    updateProjectResponsibility,
    removeProjectResponsibility,
    addCertificate,
    updateCertificate,
    removeCertificate
  };
};