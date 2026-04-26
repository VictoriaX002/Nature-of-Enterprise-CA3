export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  expectedAttendance: number;
  status: 'upcoming' | 'done';
};

export const seedEvents: EventItem[] = [
  {
    id: 'evt-001',
    title: 'CS++ Hackathon Night',
    date: '2025-05-05',
    location: 'Computer Lab 3, Grangegorman',
    category: 'Technology',
    description: 'TU Dublin CS++ Society 12-hour build challenge. Open to all levels.',
    expectedAttendance: 45,
    status: 'upcoming',
  },
  {
    id: 'evt-002',
    title: 'Drama Soc End of Year Show',
    date: '2025-05-08',
    location: 'Theatre Room, Aungier Street',
    category: 'Arts',
    description: 'Drama Society presents their end of year production. Free entry for students.',
    expectedAttendance: 120,
    status: 'upcoming',
  },
  {
    id: 'evt-003',
    title: 'Media Society Photography Walk',
    date: '2025-05-10',
    location: 'Grangegorman Campus',
    category: 'Arts',
    description: 'Tallaght Media Society outdoor photography session around campus.',
    expectedAttendance: 25,
    status: 'upcoming',
  },
  {
    id: 'evt-004',
    title: 'Enactus Social Enterprise Pitch Night',
    date: '2025-05-12',
    location: 'Lecture Hall B, Grangegorman',
    category: 'Academic',
    description: 'Students pitch social enterprise ideas to a panel of judges.',
    expectedAttendance: 60,
    status: 'upcoming',
  },
  {
    id: 'evt-005',
    title: 'Music Society Open Mic Night',
    date: '2025-05-15',
    location: 'Student Bar, Aungier Street',
    category: 'Music',
    description: 'Live music open mic night hosted by TU Dublin Music Society.',
    expectedAttendance: 80,
    status: 'upcoming',
  },
  {
    id: 'evt-006',
    title: 'Dance Society Intervarsity Showcase',
    date: '2025-04-10',
    location: 'Sports Hall, Grangegorman',
    category: 'Sports',
    description: 'Dance Society showcase following their national award win at BICS 2025.',
    expectedAttendance: 200,
    status: 'done',
  },
  {
    id: 'evt-007',
    title: 'Nerd Society Game Night',
    date: '2025-04-22',
    location: 'Common Room, Tallaght Campus',
    category: 'Games',
    description: 'Board games, Pokémon GO and D&D evening hosted by the Nerd Society.',
    expectedAttendance: 30,
    status: 'done',
  },
  {
    id: 'evt-008',
    title: 'SVP Society Charity Bake Sale',
    date: '2025-04-18',
    location: 'Main Foyer, Grangegorman',
    category: 'Wellness',
    description: 'Fundraiser bake sale supporting the SVP Re-Fridge food sustainability project.',
    expectedAttendance: 150,
    status: 'done',
  },
];