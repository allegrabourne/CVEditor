import React, { useState, useRef } from 'react';
import { Download, Edit3, Eye, FileText, Palette } from 'lucide-react';

const CVEditor = () => {
  const [cvData, setCvData] = useState({
    personalDetails: {
      name: "Allegra Bourne",
      phone: "(+44) 7854 943 193",
      address: "14 Lewis Road, Northallerton, North Yorkshire, UK. DL6 3RX",
      email: "allegrabourne@gmail.com",
      website: "allegrabourne.github.io/"
    },
    profile: "Software Engineer with 15+ years of experience delivering event driven, AI powered and scalable solutions for local, national and multinational businesses in both the private and public sectors across diverse industries, including finance, supply chain and transportation systems.\n\nAdept at translating business requirements into technical solutions and working with modern development frameworks, cloud services, and enterprise messaging solutions with an emphasis on test-driven development and design patterns.\n\nRecognised for mentoring, collaboration, and building systems that enhance operational performance.",
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Ligentia, Leeds, England, United Kingdom",
        dates: "Jun 2022 - Present",
        description: "Ligentia is a leading supply chain technology and services provider specialising in manufacturing, consumer brands, pharmaceuticals and the retail sector.",
        responsibilities: [
          "Development of new Consignment Delivery Management portal with API development utilising Fast Endpoints, messaging via Azure ServiceBus and Angular for UI development.",
          "Worked to develop the new Landed Cost portal, a project which helped to retain Myer; Australia's largest department store, as a customer. Providing Myer with accurate landed cost and end-to-end visibility of their supply chain, from production confirmation, to freight booking, through to delivery to stores spanning Australia.",
          "Azure DevOps / Octopus Deploy for CI and release management, creation and maintenance of deployment pipelines inline with industry practice.",
          "Blazor utilised for the developmental concept for the new Client onboarding web application.",
          "Business analysis of legacy processes where knowledge had been lost with a view of replacing them with newer tech stacks."
        ]
      },
      {
        title: "Full Stack Developer",
        company: "Refract - an Allego company, Newcastle upon Tyne, England, United Kingdom",
        dates: "Apr 2021 - Jun 2022",
        description: "Refract Utilising AI technology to deliver personalised insight, based on the business and their reps, showing the actions and words that align with top performers and results. Allego Sets out to improve onboarding and messaging consistency with high-quality, reliable and secure video learning, communication and collaboration. Engaging new hires quickly, developing critical skills and driving faster results for an organisation.",
        responsibilities: [
          "Introduced multilingual capabilities to the Refract platform.",
          "Worked on introducing new 'road map' features to the Refract platform such as Call Analytics, Platform Usage and Deal Intelligence dashboards.",
          ".Net, Angular and SQL utilising code first and EF migrations.",
          "Azure development utilising blob containers.",
          "Emphasis on TDD and design patterns to ensure quality of work."
        ]
      },
      {
        title: "Integrations Developer",
        company: "XCM, York, England, United Kingdom",
        dates: "Apr 2020 - Apr 2021",
        description: "XCM are marketing specialists working with some of the biggest retailers in the UK to leverage competitive advantage via the use of specialist data tools, analysis and CRM services.",
        responsibilities: [
          "Client integration utilising .Net Core and Kafka to ensure real time distributed streaming of big data from Google PubSub.",
          "Docker used for Kafka containerisation.",
          "TSQL / KSQL development.",
          "Google Cloud / PubSub integration.",
          "Apache AVRO for binary serialisation of messages for faster processing.",
          "Data migration and integration.",
          "Single Customer View.",
          "Development of the XCM Horizon data warehouse.",
          "Web Services development using .Net Core hosted in Kestrel."
        ]
      },
      {
        title: "Software Engineer",
        company: "Cubic Corporation, Stockton-On-Tees, United Kingdom",
        dates: "Jan 2019 - Apr 2020",
        description: "Cubic Transportation Systems is one arm of Cubic Corporation that produces public transport solutions, traffic management platforms and fare reading and payment systems.",
        responsibilities: [
          "Development of ICMP - the traffic management platform utilised by New South Wales, Australia. The platform formed part of TfNSW's $123 million intelligent congestion management program which enabled better traffic management through real-time data and predictive technology.",
          "Frontend development utilising Angular / Typescript / SignalR.",
          "Enterprise messaging conducted utilising NServiceBus / RabbitMQ.",
          "Micro service development utilising AZURE Service Fabric / Topshelf / WebAPI services.",
          "Continuous integration via Jenkins with SonarCube code smells and Octopus.",
          "Development undertaken accordingly with Agile/SCRUM methodologies."
        ]
      },
      {
        title: "Solution Developer",
        company: "Vianet Group plc, Stockton-On-Tees, United Kingdom",
        dates: "Jun 2017 - Dec 2018",
        description: "Vianet are UK leader in providing draught beer quality and waste management services.",
        responsibilities: [
          "Worked on the IDraught IOT platform on the consumption of data that would empower customer's strategic decisions on metrics and business intelligence, these insights were then used to measure metrics such as wastage, temperature, in identifying missing drinks and improving drink quality.",
          "Frontend development on the new 'Vianet IOT Portal' utilising AngularJS 2 / Typescript.",
          "WebAPI services via the use of .Net Core and hosted using Kestrel.",
          "AZURE web app services and message queueing.",
          "Big data processing via HBASE.",
          "JAVA / Apache SPARK / Hadoop number crunching business logic utilising IntelliJ GUI and taking on a TDD approach.",
          "Introduced an emphasis on TDD and introduced concepts attaining to Agile/SCRUM and mentoring junior members of the team."
        ]
      }
    ],
    personalProjects: [
      {
        title: "AI-Powered Wildlife Health Monitoring Field Lab",
        technologies: "Python, PyTorch, Raspberry Pi, FastAPI, librosa, Deep Learning, Bioacoustics",
        responsibilities: [
          "Developed an IoT edge field lab using Python, Raspberry Pi 4, and PyTorch with a custom convolutional neural network to detect hedgehog respiratory illness from acoustic signals, supporting faster interventions and conservation efforts.",
          "Designed a real-time audio analysis pipeline that records 5-second clips, converts them into spectrograms, and classifies breathing patterns using a neural network, achieving ~75% accuracy and 0.91 precision.",
          "Engineered a modular architecture with FastAPI, automated night-time recording, remote inference server on GPU hardware, and Pushbullet alerting.",
          "Applied non-invasive bioacoustic monitoring aligned with UK conservation ethics, demonstrating cross-disciplinary innovation with potential applications in both wildlife conservation and healthcare."
        ]
      }
    ],
    certificates: [
      {
        title: "IBM Data Science Professional Certificate",
        description: "A comprehensive, ACE-recommended (12 college credits) and FIBAA-accredited (6 ECTS credits) program covering key data science skills, including Python, regression analysis, statistical modeling, and machine learning."
      },
      {
        title: "IBM AI Developer Professional Certificate",
        description: "A comprehensive program focused on the essential skills for developing AI applications, including machine learning, deep learning, and natural language processing."
      }
    ],
    education: {
      degree: "BSc (HONS) BUSINESS COMPUTING",
      university: "University of Teesside",
      dates: "2004 - 2008",
      grade: "With Second Class Honours Division One (2:1)"
    }
  });

  const [editMode, setEditMode] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('styled');
  const printRef = useRef();

  const updatePersonalDetails = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  };

  const updateProfile = (value) => {
    setCvData(prev => ({ ...prev, profile: value }));
  };

  const addWorkExperience = () => {
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
  };

  const updateWorkExperience = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  };

  const addResponsibility = (jobIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? { ...job, responsibilities: [...job.responsibilities, ""] } : job
      )
    }));
  };

  const updateResponsibility = (jobIndex, respIndex, value) => {
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
  };

  const removeResponsibility = (jobIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.filter((_, j) => j !== respIndex)
        } : job
      )
    }));
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    const content = generatePrintableHTML();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const generatePrintableHTML = () => {
    const richCSS = `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
        background: white;
        font-size: 12px;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      .header h1 {
        font-size: 2em;
        margin: 0;
        color: #2c5aa0;
        font-weight: bold;
      }
      .personal-details {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 25px;
      }
      .personal-details h2 {
        color: #2c5aa0;
        font-size: 1.2em;
        margin-top: 0;
        padding-bottom: 5px;
      }
      .contact-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .contact-item {
        margin: 5px 0;
      }
      .contact-item strong {
        color: #2c5aa0;
      }
      .section {
        margin-bottom: 30px;
      }
      .section h2 {
        color: #2c5aa0;
        font-size: 1.3em;
        padding-bottom: 5px;
        margin-bottom: 15px;
      }
      .profile {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        font-size: 1.05em;
        line-height: 1.7;
      }
      .job {
        margin-bottom: 25px;
        border-left: 4px solid #2c5aa0;
        padding-left: 15px;
      }
      .job-title {
        font-size: 1.1em;
        font-weight: bold;
        color: #2c5aa0;
        margin-bottom: 5px;
      }
      .company {
        font-weight: bold;
        font-size: 1em;
        margin-bottom: 3px;
      }
      .dates {
        font-style: italic;
        color: #666;
        margin-bottom: 8px;
      }
      .company-description {
        font-style: italic;
        color: #666;
        margin-bottom: 10px;
        background: #f8f9fa;
        padding: 8px;
        border-radius: 4px;
      }
    `;

    const plainCSS = `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #000;
        background: white;
        font-size: 12px;
      }
      .header h1 {
        font-size: 1.8em;
        margin: 0 0 20px 0;
        font-weight: bold;
        text-align: center;
      }
      .section h2 {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 20px;
      }
      .job-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .company {
        font-weight: bold;
        margin-bottom: 3px;
      }
      .dates {
        font-style: italic;
        margin-bottom: 8px;
      }
      .contact-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 20px;
      }
      .contact-item strong {
        font-weight: bold;
      }
      .personal-details h2 {
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 10px;
      }
      .job {
        margin-bottom: 20px;
      }
      .company-description {
        font-style: italic;
        margin-bottom: 10px;
      }
    `;

    const css = selectedStyle === 'styled' ? richCSS : plainCSS;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${cvData.personalDetails.name} - CV</title>
          <style>
            ${css}
            @media print {
              body { font-size: 11px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Curriculum Vitae</h1>
          </div>
          
          <div class="personal-details">
            <h2>PERSONAL DETAILS</h2>
            <div class="contact-info">
              <div class="contact-item"><strong>Name:</strong> ${cvData.personalDetails.name}</div>
              <div class="contact-item"><strong>Phone:</strong> ${cvData.personalDetails.phone}</div>
              <div class="contact-item"><strong>Address:</strong> ${cvData.personalDetails.address}</div>
              <div class="contact-item"><strong>Email:</strong> ${cvData.personalDetails.email}</div>
              <div class="contact-item" style="grid-column: 1/-1;"><strong>Website:</strong> ${cvData.personalDetails.website}</div>
            </div>
          </div>
          
          <div class="section">
            <h2>PROFILE</h2>
            <div class="profile">
              ${cvData.profile.split('\n').map(p => p.trim()).filter(p => p).join('<br><br>')}
            </div>
          </div>
          
          <div class="section">
            <h2>WORK EXPERIENCE</h2>
            ${cvData.workExperience.map(job => `
              <div class="job">
                <div class="job-title">${job.title}</div>
                <div class="company">${job.company}</div>
                <div class="dates">${job.dates}</div>
                ${job.description ? `<div class="company-description">${job.description}</div>` : ''}
                <ul>
                  ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
          
          ${cvData.personalProjects.length > 0 ? `
            <div class="section">
              <h2>PERSONAL PROJECTS</h2>
              ${cvData.personalProjects.map(project => `
                <div class="job">
                  <div class="job-title">${project.title}</div>
                  <div class="dates">Technologies: ${project.technologies}</div>
                  <ul>
                    ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${cvData.certificates.length > 0 ? `
            <div class="section">
              <h2>CERTIFICATES</h2>
              ${cvData.certificates.map(cert => `
                <div class="certificate">
                  <div class="job-title">${cert.title}</div>
                  <p>${cert.description}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div class="section">
            <h2>EDUCATION</h2>
            <div class="job">
              <div class="job-title">${cvData.education.degree}</div>
              <div class="company">${cvData.education.university}</div>
              <div class="dates">${cvData.education.dates}</div>
              <p>${cvData.education.grade}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            CV Editor
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <select 
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="styled">Rich Professional</option>
                <option value="plain">Plain Professional</option>
              </select>
            </div>
            
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                editMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {editMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              {editMode ? 'Preview' : 'Edit'}
            </button>
            
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          {editMode && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Edit CV Content</h2>
              
              {/* Personal Details */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-blue-600">Personal Details</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={cvData.personalDetails.name}
                    onChange={(e) => updatePersonalDetails('name', e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={cvData.personalDetails.phone}
                    onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    value={cvData.personalDetails.address}
                    onChange={(e) => updatePersonalDetails('address', e.target.value)}
                    placeholder="Address"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <input
                    type="email"
                    value={cvData.personalDetails.email}
                    onChange={(e) => updatePersonalDetails('email', e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={cvData.personalDetails.website}
                    onChange={(e) => updatePersonalDetails('website', e.target.value)}
                    placeholder="Website"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Profile */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-blue-600">Profile</h3>
                <textarea
                  value={cvData.profile}
                  onChange={(e) => updateProfile(e.target.value)}
                  placeholder="Professional profile..."
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Work Experience */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-blue-600">Work Experience</h3>
                  <button
                    onClick={addWorkExperience}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Job
                  </button>
                </div>
                
                {cvData.workExperience.map((job, jobIndex) => (
                  <div key={jobIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => updateWorkExperience(jobIndex, 'title', e.target.value)}
                      placeholder="Job Title"
                      className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={job.company}
                      onChange={(e) => updateWorkExperience(jobIndex, 'company', e.target.value)}
                      placeholder="Company"
                      className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={job.dates}
                      onChange={(e) => updateWorkExperience(jobIndex, 'dates', e.target.value)}
                      placeholder="Employment Dates"
                      className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={job.description}
                      onChange={(e) => updateWorkExperience(jobIndex, 'description', e.target.value)}
                      placeholder="Company Description"
                      rows="2"
                      className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Responsibilities:</label>
                        <button
                          onClick={() => addResponsibility(jobIndex)}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      {job.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex gap-2 mb-2">
                          <textarea
                            value={resp}
                            onChange={(e) => updateResponsibility(jobIndex, respIndex, e.target.value)}
                            placeholder="Responsibility description..."
                            rows="2"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                          />
                          <button
                            onClick={() => removeResponsibility(jobIndex, respIndex)}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors self-start"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${editMode ? '' : 'lg:col-span-2'}`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div 
                className="cv-preview"
                style={{
                  fontFamily: selectedStyle === 'styled' ? "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" : 'Arial, sans-serif',
                  lineHeight: '1.6',
                  color: '#333',
                  fontSize: '14px'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: generatePrintableHTML()
                    .replace(/<!DOCTYPE[^>]*>/, '')
                    .replace(/<html[^>]*>/, '')
                    .replace(/<\/html>/, '')
                    .replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
                    .replace(/<body[^>]*>/, '')
                    .replace(/<\/body>/, '')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;