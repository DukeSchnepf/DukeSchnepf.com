export interface EducationItem {
  school: string
  credential: string
  start: string
  end: string
  details?: string
}

export const education: EducationItem[] = [
  {
    school: 'Bellevue College',
    credential: "Bachelor's degree, Computer Science",
    start: '2022',
    end: '2026',
    details:
      'Skills: HTML, Java, Software, Computer Science, Computer Hardware, Computer Maintenance',
  },
  {
    school: 'Bellevue College',
    credential: 'Business Intelligence Analyst Certification',
    start: '2018',
    end: '2020',
    details:
      'Skills: SQL, Microsoft Power BI, Tableau, Microsoft Excel, SQL Server Analysis Services (SSAS), SQL Server Reporting Services (SSRS), SQL Server Integration Services (SSIS), SQL Server Management Studio',
  },
  {
    school: 'Lake Washington Institute of Technology',
    credential: 'CAD/CADD Drafting and/or Design Technology/Technician',
    start: '2018',
    end: '2019',
    details: 'Skills: SOLIDWORKS, Computer-Aided Design (CAD)',
  },
  {
    school: 'Peninsula College',
    credential: "Associate's degree",
    start: '2015',
    end: '2018',
    details:
      'Skills: Business Strategy, Business Development, Business Analysis, Business Marketing',
  },
]
