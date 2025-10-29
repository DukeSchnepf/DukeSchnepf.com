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
    credential: 'Computer Science (Business Intelligence Analyst Certification earned)',
    start: 'Sep 2018',
    end: 'Present',
    details:
      'Focus on SQL Server, data manipulation/visualization, and Excel; GPA 3.5+ while working full time.',
  },
  {
    school: 'Peninsula College',
    credential: 'Associate of Arts in General Studies',
    start: 'Sep 2015',
    end: 'Jun 2018',
    details: 'Coursework in marketing and business management.',
  },
]


