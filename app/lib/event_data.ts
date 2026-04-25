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
    title: 'Chess Club Meeting',
    date: '2025-05-05',
    location: 'Room 204',
    category: 'Games',
    description: 'Weekly chess club open to all skill levels.',
    expectedAttendance: 12,
    status: 'upcoming',
  },
  {
    id: 'evt-002',
    title: 'Photography Society Showcase',
    date: '2025-05-08',
    location: 'Main Hall',
    category: 'Arts',
    description: 'Student photo exhibition and public voting.',
    expectedAttendance: 80,
    status: 'upcoming',
  },
  {
    id: 'evt-003',
    title: 'Coding Hackathon',
    date: '2025-05-10',
    location: 'Computer Lab A',
    category: 'Technology',
    description: '24-hour build challenge open to all students.',
    expectedAttendance: 40,
    status: 'upcoming',
  },
  {
    id: 'evt-004',
    title: 'Drama Society Auditions',
    date: '2025-05-12',
    location: 'Theatre Room',
    category: 'Arts',
    description: 'Auditions for the end-of-year stage production.',
    expectedAttendance: 30,
    status: 'upcoming',
  },
  {
    id: 'evt-005',
    title: 'Debate Club Open Night',
    date: '2025-05-15',
    location: 'Lecture Hall B',
    category: 'Academic',
    description: 'Open debate on technology and society.',
    expectedAttendance: 50,
    status: 'upcoming',
  },
  {
    id: 'evt-006',
    title: 'Football Tournament',
    date: '2025-04-20',
    location: 'Sports Ground',
    category: 'Sports',
    description: 'Inter-society 5-a-side football competition.',
    expectedAttendance: 60,
    status: 'done',
  },
  {
    id: 'evt-007',
    title: 'Music Night',
    date: '2025-04-25',
    location: 'Student Bar',
    category: 'Music',
    description: 'Open mic night for student musicians.',
    expectedAttendance: 70,
    status: 'done',
  },
  {
    id: 'evt-008',
    title: 'Yoga & Mindfulness Session',
    date: '2025-04-18',
    location: 'Sports Hall',
    category: 'Wellness',
    description: 'Beginner-friendly yoga and breathing session.',
    expectedAttendance: 25,
    status: 'done',
  },
];