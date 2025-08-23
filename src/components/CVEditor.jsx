import React, { useState, useRef } from 'react';
import { Download, Edit3, Eye, FileText, Palette, Plus, Trash2, GripVertical } from 'lucide-react';

const CVEditor = () => {
  const [cvData, setCvData] = useState({
    personalDetails: {
      name: "Allegra Bourne",
      phone: "(+44) 7854 943 193",
      address: "14 Lewis Road, Northallerton, North Yorkshire, UK. DL6 3RX",
      email: "alleweston@gmail.com",
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
      },
      {
        title: "Lead Software Developer",
        company: "ZyroFisher, Darlington, United Kingdom",
        dates: "Apr 2017 - Jun 2017",
        description: "ZyroFisher are the leading distributor of Parts, Accessories and Clothing to the UK and Irish cycling markets.",
        responsibilities: [
          "Integrated new Altura Cycling customer facing commercial website with their backend ordering system and payment provider (included implementing Sage/SagePay API) utilising RabbitMQ, RESTful API services and HMAC authentication enabling customers to make online purchases for the first time.",
          "Front-end development utilising NodeJS.",
          "Emphasis on quality test driven development utilising NCrunch and MOQ."
        ]
      },
      {
        title: "Software Developer",
        company: "Lowell Group, Leeds, United Kingdom",
        dates: "Apr 2012 - Apr 2017",
        description: "Lowell are one of Europe's largest credit management companies, operating in the UK and the DACH and Nordic regions.",
        responsibilities: [
          "RESTful Web API services self hosted utilising Topshelf.",
          "MVC5/Rest/CMS Umbraco - development of the new Lowell website, designed to give customers control over their accounts and manage payments securely through Verifone, similar to leading banking websites. In its first year, the platform saw over 150,000 customer registrations.",
          "Automated deployment via Octopus deploy and continuous builds using TeamCity.",
          "Test driven .Net development. NCrunch, MOQ.",
          "Service Orientated Architecture - development of person matching and address cleansing services utilising WCF and RabbitMQ.",
          "T-SQL utilising CLR functions.",
          "ORM implemented using NHibernate.",
          "Agile software development utilising SCRUM.",
          "Development of LIMA - Lowell's main tracing application.",
          "Provided third line support as required."
        ]
      },
      {
        title: "Collections Development Analyst",
        company: "Lowell, Leeds, United Kingdom",
        dates: "Feb 2011 - Apr 2012",
        description: "",
        responsibilities: [
          "Core business process mapping and improvement.",
          "Business process automation utilising SSIS, T-SQL and C#/VB.net in order to create dynamic DTSX packages.",
          "Data analysis utilising Crystal Reports and SSAS.",
          "Systems support, project and change management.",
          "Automated de-duping processes for enabling single view of customers with multiple accounts saving Lowell £40k (quoted by system supplier to scope out possible automation).",
          "Mentored colleagues in the use of source control, TFS, .NET and SSIS."
        ]
      },
      {
        title: "Integrated Systems Officer",
        company: "North Yorkshire County Council, Northallerton, United Kingdom",
        dates: "Feb 2009 - Feb 2011",
        description: "",
        responsibilities: [
          "Project managed the deployment of CACI's 'Children's Centre Management System to the 40 Children's Centres throughout North Yorkshire.",
          "Project managed the deployment of North Yorkshire's new integrated online Admissions system.",
          "Aided in the deployment and integration of IMPULSE; the integrated system for children in North Yorkshire.",
          "Instigated a drive in data quality, this included the creation of a number of XML cleansing macros utilising VBA and xpath to cleanse data received from Schools.",
          "Aided with the implementation and accreditation of the prescribed national child reference system - ContactPoint and took the lead during Instance Accreditation for North Yorkshire and partners.",
          "Provided augmented services when required."
        ]
      },
      {
        title: "Systems Administrative Assistant (Internship)",
        company: "State Street, Luxembourg",
        dates: "Sep 2006 - Sep 2007",
        description: "State Street Corporation is a financial services company that provides investment management services for institutional investors.",
        responsibilities: [
          "Data warehousing / mining and core applications development for fund compliance.",
          "Java, Oracle and PL/SQL development.",
          "VBA (Contingency macros).",
          "Worked on the development of a data warehousing solution which pooled various assets, funds and investment information from different locations throughout the world. This information would then be used for investment analysis, fund accounting and various other investment strategies."
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
        description: ""
      },
      {
        title: "IBM AI Developer Professional Certificate",
        description: ""
      }
    ],
    education: {
      degree: "BSc (HONS) BUSINESS COMPUTING",
      university: "University of Teesside",
      dates: "2004 - 2008",
      grade: "With Second Class Honours Division One (2:1)"
    },
    courses: "Please see LinkedIn for a comprehensive list of completed courses and qualifications"
  });

  const [editMode, setEditMode] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('styled');
  const [activeSection, setActiveSection] = useState('personal');
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

  const updateEducation = (field, value) => {
    setCvData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const updateCourses = (value) => {
    setCvData(prev => ({ ...prev, courses: value }));
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

  const removeWorkExperience = (index) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
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

  const addPersonalProject = () => {
    setCvData(prev => ({
      ...prev,
      personalProjects: [...prev.personalProjects, {
        title: "",
        technologies: "",
        responsibilities: [""]
      }]
    }));
  };

  const updatePersonalProject = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const removePersonalProject = (index) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.filter((_, i) => i !== index)
    }));
  };

  const addProjectResponsibility = (projectIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? { ...project, responsibilities: [...project.responsibilities, ""] } : project
      )
    }));
  };

  const updateProjectResponsibility = (projectIndex, respIndex, value) => {
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
  };

  const removeProjectResponsibility = (projectIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.filter((_, j) => j !== respIndex)
        } : project
      )
    }));
  };

  const addCertificate = () => {
    setCvData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        title: "",
        description: ""
      }]
    }));
  };

  const updateCertificate = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertificate = (index) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
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
        border-bottom: 2px solid #667eea;
      }
      .header h1 {
        font-size: 2em;
        margin: 0;
        color: #2c5aa0;
        font-weight: bold;
      }
      .personal-details {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 25px;
        border: 1px solid #e9ecef;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      .personal-details h2 {
        color: #2c5aa0;
        font-size: 1.2em;
        margin-top: 0;
        padding-bottom: 5px;
        border-bottom: 1px solid #667eea;
      }
      .contact-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .contact-item {
        margin: 2px 0;
        display: flex;
        align-items: center;
      }
      .contact-item strong {
        color: #2c5aa0;
        min-width: 70px;
      }
      .section {
        margin-bottom: 30px;
        position: relative;
      }
      .section h2 {
        color: #2c5aa0;
        font-size: 1.3em;
        padding-bottom: 8px;
        margin-bottom: 20px;
        border-bottom: 2px solid #667eea;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent);
        padding-left: 10px;
        margin-left: -10px;
        border-radius: 5px 0 0 0;
      }
      .profile {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
        padding: 25px;
        border-radius: 12px;
        font-size: 1.05em;
        line-height: 1.7;
        border-left: 4px solid #667eea;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      .job {
        margin-bottom: 25px;
        border-left: 4px solid #667eea;
        padding-left: 20px;
        position: relative;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.03), transparent);
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 0 8px 8px 0;
        margin-left: -5px;
        padding-left: 25px;
      }
      .job::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 15px;
        width: 8px;
        height: 8px;
        background: #667eea;
        border-radius: 50%;
        box-shadow: 0 0 0 3px white, 0 0 0 6px #667eea;
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
        color: #333;
      }
      .dates {
        font-style: italic;
        color: #666;
        margin-bottom: 8px;
        font-size: 0.95em;
      }
      .company-description {
        font-style: italic;
        color: #666;
        margin-bottom: 12px;
        background: rgba(102, 126, 234, 0.08);
        padding: 10px;
        border-radius: 6px;
        border-left: 2px solid #667eea;
      }
      .project {
        margin-bottom: 25px;
        border-left: 4px solid #764ba2;
        padding-left: 20px;
        position: relative;
        background: linear-gradient(90deg, rgba(118, 75, 162, 0.03), transparent);
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 0 8px 8px 0;
        margin-left: -5px;
        padding-left: 25px;
      }
      .project::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 15px;
        width: 8px;
        height: 8px;
        background: #764ba2;
        border-radius: 50%;
        box-shadow: 0 0 0 3px white, 0 0 0 6px #764ba2;
      }
      .technologies {
        font-style: italic;
        color: #764ba2;
        margin-bottom: 8px;
        font-size: 0.95em;
        font-weight: 500;
      }
      .certificate {
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }
      .certificate .job-title {
        color: #667eea;
        margin-bottom: 10px;
      }
      ul {
        margin: 0;
        padding-left: 18px;
      }
      li {
        margin-bottom: 6px;
        line-height: 1.6;
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
      .job, .project {
        margin-bottom: 20px;
      }
      .company-description {
        font-style: italic;
        margin-bottom: 10px;
      }
      .technologies {
        font-style: italic;
        margin-bottom: 8px;
      }
      .certificate {
        margin-bottom: 15px;
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
            <h1>${cvData.personalDetails.name}</h1>
          </div>
          
          <div class="personal-details">
            <h2>CONTACT DETAILS</h2>
            <div class="contact-info">
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
                <div class="project">
                  <div class="job-title">${project.title}</div>
                  <div class="technologies">Technologies: ${project.technologies}</div>
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

          ${cvData.courses ? `
            <div class="section">
              <h2>ADDITIONAL COURSES</h2>
              <p>${cvData.courses}</p>
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  const sections = [
    { id: 'personal', name: 'Personal Details', icon: '👤' },
    { id: 'profile', name: 'Profile', icon: '📝' },
    { id: 'experience', name: 'Work Experience', icon: '💼' },
    { id: 'projects', name: 'Personal Projects', icon: '🚀' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'courses', name: 'Additional Courses', icon: '📚' }
  ];

  const renderEditSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={cvData.personalDetails.name}
                  onChange={(e) => updatePersonalDetails('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={cvData.personalDetails.phone}
                  onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <textarea
                  value={cvData.personalDetails.address}
                  onChange={(e) => updatePersonalDetails('address', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={cvData.personalDetails.email}
                  onChange={(e) => updatePersonalDetails('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                <input
                  type="text"
                  value={cvData.personalDetails.website}
                  onChange={(e) => updatePersonalDetails('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Professional Profile</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Description</label>
              <textarea
                value={cvData.profile}
                onChange={(e) => updateProfile(e.target.value)}
                rows="8"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                placeholder="Write your professional profile here..."
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Work Experience</h3>
              <button
                onClick={addWorkExperience}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Job
              </button>
            </div>
            
            {cvData.workExperience.map((job, jobIndex) => (
              <div key={jobIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Job #{jobIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removeWorkExperience(jobIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    value={job.title}
                    onChange={(e) => updateWorkExperience(jobIndex, 'title', e.target.value)}
                    placeholder="Job Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => updateWorkExperience(jobIndex, 'company', e.target.value)}
                    placeholder="Company"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={job.dates}
                    onChange={(e) => updateWorkExperience(jobIndex, 'dates', e.target.value)}
                    placeholder="Employment Dates"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <textarea
                    value={job.description}
                    onChange={(e) => updateWorkExperience(jobIndex, 'description', e.target.value)}
                    placeholder="Company Description"
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsibilities:</label>
                    <button
                      onClick={() => addResponsibility(jobIndex)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                  {job.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-3">
                      <textarea
                        value={resp}
                        onChange={(e) => updateResponsibility(jobIndex, respIndex, e.target.value)}
                        placeholder="Responsibility description..."
                        rows="2"
                        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
                      />
                      <button
                        onClick={() => removeResponsibility(jobIndex, respIndex)}
                        className="px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Projects</h3>
              <button
                onClick={addPersonalProject}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
            
            {cvData.personalProjects.map((project, projectIndex) => (
              <div key={projectIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Project #{projectIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removePersonalProject(projectIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updatePersonalProject(projectIndex, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => updatePersonalProject(projectIndex, 'technologies', e.target.value)}
                    placeholder="Technologies Used"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Details:</label>
                    <button
                      onClick={() => addProjectResponsibility(projectIndex)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                  {project.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-3">
                      <textarea
                        value={resp}
                        onChange={(e) => updateProjectResponsibility(projectIndex, respIndex, e.target.value)}
                        placeholder="Project detail description..."
                        rows="2"
                        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
                      />
                      <button
                        onClick={() => removeProjectResponsibility(projectIndex, respIndex)}
                        className="px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Certificates</h3>
              <button
                onClick={addCertificate}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Certificate
              </button>
            </div>
            
            {cvData.certificates.map((cert, certIndex) => (
              <div key={certIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Certificate #{certIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removeCertificate(certIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCertificate(certIndex, 'title', e.target.value)}
                    placeholder="Certificate Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <textarea
                    value={cert.description}
                    onChange={(e) => updateCertificate(certIndex, 'description', e.target.value)}
                    placeholder="Certificate Description"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Education</h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Degree</label>
                  <input
                    type="text"
                    value={cvData.education.degree}
                    onChange={(e) => updateEducation('degree', e.target.value)}
                    placeholder="Degree Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University</label>
                  <input
                    type="text"
                    value={cvData.education.university}
                    onChange={(e) => updateEducation('university', e.target.value)}
                    placeholder="University Name"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dates</label>
                  <input
                    type="text"
                    value={cvData.education.dates}
                    onChange={(e) => updateEducation('dates', e.target.value)}
                    placeholder="Study Period"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Classification</label>
                  <input
                    type="text"
                    value={cvData.education.grade}
                    onChange={(e) => updateEducation('grade', e.target.value)}
                    placeholder="Grade or Classification"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Additional Courses</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Courses Information</label>
              <textarea
                value={cvData.courses}
                onChange={(e) => updateCourses(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                placeholder="Information about additional courses, training, or qualifications..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              CV Editor Pro
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
                <Palette className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
                >
                  <option value="styled">Rich Professional</option>
                  <option value="plain">Plain Professional</option>
                </select>
              </div>
              
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                  editMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 dark:from-gray-600 dark:to-gray-700 dark:text-gray-200'
                }`}
              >
                {editMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                {editMode ? 'Preview Mode' : 'Edit Mode'}
              </button>
              
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Panel */}
          {editMode && (
            <div className="lg:col-span-5 space-y-6">
              {/* Section Navigation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Sections</h2>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edit Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                {renderEditSection()}
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${editMode ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h2>
              </div>
              <div className="p-8 max-h-screen overflow-y-auto">
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
    </div>
  );
};

export default CVEditor;