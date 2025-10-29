export interface ExperienceItem {
  role: string
  company: string
  start: string
  end: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Founder & CEO',
    company: 'Northwest Motor Club',
    start: 'Aug 2018',
    end: 'Present',
    bullets: [
      'Grew the community to 3,500+ followers and connected tens of thousands of enthusiasts',
      'Organized 50+ car meets and multiple large-scale events with prizes, sponsors, and live entertainment',
      'Led sponsor procurement, marketing, operations, and on-site logistics',
    ],
  },
  {
    role: 'Game Operations Manager',
    company: 'Thought Ops LLC',
    start: 'Nov 2020',
    end: 'Present',
    bullets: [
      'Managed operations, fundraising, and charity collaborations',
      'Launched and maintained social media presence across platforms',
      'Oversaw production features and launches for Rescue Bear Operation on mobile and consoles',
    ],
  },
  {
    role: "Owner & Operator",
    company: "Duke's Helping Hands",
    start: 'Jan 2012',
    end: 'Present',
    bullets: [
      'Provided IT support, technical advising and repairs; earned numerous 5-star reviews',
      'Handled varied services including minor electrical, yard maintenance, and carpet cleaning',
      'Built a business primarily through word-of-mouth referrals',
    ],
  },
  {
    role: 'Carpenter',
    company: 'P & M Construction',
    start: 'Aug 2019',
    end: 'Jan 2020',
    bullets: ['Framing, siding, foundation work, and project coordination'],
  },
  {
    role: 'Front-End Representative',
    company: 'HyVee',
    start: 'Sep 2016',
    end: 'Jan 2017',
    bullets: ['Customer service, end cap management, and cash handling'],
  },
]


