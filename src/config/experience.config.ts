export interface ExperienceItem {
  role: string
  company: string
  start: string
  end: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Co-Founder',
    company: 'Duke Pro Max',
    start: 'Jan 2021',
    end: 'Present',
    bullets: ['Co-founded and operate a business venture in Seattle, WA.'],
  },
  {
    role: 'Founder',
    company: 'Northwest Motor Club',
    start: 'Aug 2018',
    end: 'Present',
    bullets: [
      'Established Northwest Motor Club from inception, uniting the Washington car community.',
      'Grew community to over 3,500 followers and connected tens of thousands of enthusiasts.',
      'Organized 50+ car meets and significant events with prizes, sponsorships, and live entertainment.',
      'Managed large & small event planning, coordination, and on-the-spot problem solving.',
      'Oversaw event marketing, sponsor procurement, and team management.',
    ],
  },
  {
    role: 'Game Operations Manager',
    company: 'Thought Ops',
    start: 'Nov 2020',
    end: 'Present',
    bullets: [
      'Oversee all aspects of game operations and fundraising initiatives.',
      'Collaborate with reputable charities and manage volunteer recruitment.',
      'Launch and maintain weekly social media presence.',
      'Manage and launch RBO on Apple App Store, Google Play, and consoles.',
      'Supervise production of touch capability and address emerging challenges.',
    ],
  },
  {
    role: 'Small Business Owner',
    company: "Duke's Helping Hands",
    start: 'Jun 2015',
    end: 'Present',
    bullets: [
      'Honed stellar management and interpersonal skills through self-employment.',
      'Garnered numerous 5-star reviews and completed hundreds of jobs.',
      'Provided IT support, technical advising, and computer repairs.',
      'Handled small electrical repairs, creative problem solving, yardwork, and carpet cleaning.',
    ],
  },
]
