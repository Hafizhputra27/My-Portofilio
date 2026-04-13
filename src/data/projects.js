const projects = [
  {
    id: 'lector-id',
    title: 'LECTOR.ID',
    category: 'Research',
    tag: 'PKM-KC',
    tagColor: 'green',
    description:
      'An AI-powered digital literacy platform developed through the Student Creativity Program (PKM-KC). Designed to boost reading interest and literacy skills among Indonesian youth.',
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Python', 'TensorFlow', 'REST API'],
    caseStudy: `## LECTOR.ID — AI-Powered Digital Literacy Platform

### Background

Indonesia faces a serious literacy challenge. According to UNESCO data, Indonesia ranks 60th out of 61 surveyed countries in reading interest. LECTOR.ID was born as a response to this problem — a platform that combines artificial intelligence with gamification to make reading more engaging and personalized.

### My Role

As **Researcher & Developer (PKM-KC)**, I was responsible for:
- Designing the architecture of a machine learning-based content recommendation system
- Developing the REST API using Node.js and Express
- Integrating NLP (Natural Language Processing) models for text analysis
- Writing the PKM-KC proposal and research progress reports

### Technical Challenges

The biggest challenge was building an accurate recommendation system with a limited dataset. We used a **collaborative filtering** approach combined with **content-based filtering** to generate relevant recommendations despite sparse user data (cold-start problem).

Additionally, API performance optimization was a priority since the target users include areas with limited internet connectivity. We applied aggressive caching and response compression to ensure load times under 2 seconds even on 3G networks.

### Solution & Implementation

\`\`\`
Stack: React.js (frontend) + Node.js/Express (backend) + MongoDB (database)
       Python/TensorFlow (AI model) + REST API (integration)
\`\`\`

Key features successfully implemented:
1. **Smart Reading Tracker** — records reading progress and analyzes user habit patterns
2. **AI Content Recommender** — recommends articles and books based on history and preferences
3. **Gamification System** — points, badges, and leaderboard to boost engagement
4. **Reading Analytics Dashboard** — personal reading statistics visualization

### Results & Impact

The LECTOR.ID PKM-KC proposal passed university-level selection and received funding for prototype development. The initial prototype was tested with 50 Widyatama University students with the following results:
- 78% of users reported increased reading frequency
- Average reading time per session increased by 34%
- Net Promoter Score (NPS): 72

### Lessons Learned

This project taught me the importance of **user research** before building features. Our first iteration of the recommendation system was too complex and confused users. After usability testing and simplifying the UI/UX, feature adoption increased significantly.`,
    featured: false,
  },
  {
    id: 'club-management',
    title: 'Club Management App',
    category: 'Dev',
    tag: 'Full-Stack',
    tagColor: 'blue',
    description:
      'A web-based student club management application that simplifies member management, activity scheduling, and organizational documentation in a centralized and efficient way.',
    techStack: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'JWT'],
    caseStudy: `## Club Management App — Student Club Management System

### Background

Managing student clubs and organizations at Widyatama University was still largely done manually — using spreadsheets, WhatsApp groups, and scattered physical documents. This caused disorganized information, members frequently missing important events, and administrators struggling to track participation.

The Club Management App emerged as an integrated digital solution that simplifies all club administration processes in one platform.

### My Role

As the lead **Developer**, I handled:
- Database schema design and implementation (PostgreSQL)
- RESTful API development with Node.js/Express
- JWT-based authentication system implementation
- User interface development with React.js and Tailwind CSS
- Deployment and server configuration

### System Architecture

\`\`\`
Frontend: React.js + Tailwind CSS (SPA)
Backend:  Node.js + Express (REST API)
Database: PostgreSQL (relational data)
Auth:     JWT + bcrypt (stateless authentication)
\`\`\`

**Core database entities:**
- Users (members & administrators)
- Clubs (organization data)
- Events (activities & schedules)
- Memberships (member-club relationships)
- Attendance (event attendance records)

### Key Features

1. **Admin Dashboard** — overview of member statistics, upcoming events, and participation rates
2. **Member Management** — registration, verification, and member profile management
3. **Event Scheduler** — event creation and schedule management with automatic notifications
4. **Digital Attendance System** — QR code-based attendance tracking
5. **Reports & Analytics** — export attendance and activity data in PDF/Excel format

### Challenges & Solutions

**Challenge:** Managing many-to-many relationships between members and clubs (one member can join multiple clubs).

**Solution:** Implemented a "memberships" junction table with additional fields like "role" (member/admin/chair) and "joined_at", enabling flexible and efficient queries.

**Challenge:** Data security — preventing unauthorized access to other clubs' data.

**Solution:** Authorization middleware that verifies resource ownership before every CRUD operation, combined with row-level security in PostgreSQL.

### Results

The application was successfully used by 3 student clubs at Widyatama University as a pilot project, with 120+ active users in total. Feedback from club administrators showed a 60% reduction in administrative time compared to previous manual methods.`,
    featured: false,
  },
  {
    id: 'buzzer-basketball',
    title: 'Buzzer Basketball',
    category: 'Dev',
    tag: 'Mobile App',
    tagColor: 'amber',
    description:
      'A mobile application for basketball match management featuring a real-time scoreboard, player statistics, and a digital buzzer system for game time management.',
    techStack: ['React Native', 'Firebase', 'Expo', 'WebSocket', 'AsyncStorage'],
    caseStudy: `## Buzzer Basketball — Basketball Match Management App

### Background

Inter-campus and community basketball tournaments often face technical challenges in match management — error-prone manual scoreboards, inaccurate statistics recording, and the lack of a reliable buzzer system. Buzzer Basketball was designed to digitize all operational aspects of a basketball game.

### My Role

As **Developer**, I was responsible for:
- Cross-platform mobile app development with React Native & Expo
- Real-time synchronization implementation using Firebase Realtime Database
- State management system design for complex game logic
- Testing and debugging on Android and iOS devices

### Key Features

**1. Real-Time Scoreboard**
Scores are updated instantly and synchronized to all connected devices. Referees, scorekeepers, and spectators can see the same score simultaneously without delay.

**2. Shot Clock & Game Clock**
Precise digital timers with easy controls for referees:
- Game clock: 4 quarters × 10 minutes (FIBA) or 4 quarters × 12 minutes (NBA)
- Shot clock: 24 seconds with automatic reset
- Customizable audio buzzer

**3. Player Statistics**
Real-time per-player statistics tracking:
- Points (2-pointer, 3-pointer, free throw)
- Rebounds (offensive & defensive)
- Assists, steals, blocks, turnovers
- Foul tracking with automatic warnings

**4. Team Management**
- Roster management with player photos
- Lineup tracking (on-court vs bench players)
- Timeout management

### Technical Architecture

\`\`\`
Mobile: React Native + Expo (cross-platform)
Backend: Firebase Realtime Database (real-time sync)
State:   React Context + useReducer (game state machine)
Storage: AsyncStorage (offline data persistence)
\`\`\`

**Game State Machine:**
\`\`\`
PREGAME → LIVE → HALFTIME → LIVE → OVERTIME → FINAL
\`\`\`

Each state transition triggers an update to Firebase, ensuring all clients stay synchronized.

### Technical Challenges

**Real-Time Latency:** On crowded WiFi networks at venues, Firebase latency could reach 500ms+. We addressed this with **optimistic updates** — the UI is updated locally first, then confirmed by the server.

**Timer Accuracy:** JavaScript setInterval is not precise enough for the shot clock. We used Date.now() as an absolute time reference and calculated remaining time based on timestamp differences, not accumulated intervals.

### Results & Usage

The app was used in 2 internal campus basketball tournaments with a total of 16 teams and 48 matches. There were no score or timer errors throughout the tournaments. Feedback from referees and scorekeepers was very positive — they described the app as "far easier than a manual scoreboard".`,
    featured: false,
  },
  {
    id: 'wise-innovera',
    title: 'WISE Innovera 2026',
    category: 'Event',
    tag: 'National Event',
    tagColor: 'purple',
    description:
      'A national UI/UX Design competition organized by WISE (Widyatama Information System Event) with participants from universities across Indonesia. I served as Executive Chair.',
    techStack: ['Project Management', 'Figma', 'Notion', 'Google Workspace', 'Canva', 'Agile/Scrum'],
    caseStudy: `## WISE Innovera National UI/UX Competition 2026

### About the Event

WISE Innovera is a national UI/UX Design competition organized by the Information Systems Student Association of Widyatama University. The 2026 edition carried the theme **"Designing for Impact: Technology Solutions for Indonesia's Future"** — inviting students from across Indonesia to design digital solutions with real societal impact.

### My Role: Executive Chair

As **Executive Chair**, I led a committee of 35 active students, responsible for:

**Strategic Planning**
- Developing the competition concept and theme
- Designing the execution timeline from preparation to winner announcement
- Coordinating with the university, sponsors, and external judges
- Event budget management

**Team Coordination**
- Leading 6 divisions: Events, Publications, Sponsorship, Technical, Logistics, and Documentation
- Applying Agile methodology with weekly sprints and daily standups
- Using Notion as a centralized project management tool

**Competition Mechanics**
- Designing objective and measurable judging criteria
- Coordinating the proposal selection, preliminary round, and grand final processes
- Ensuring the submission platform ran smoothly

### Scale & Achievements

| Metric | Target | Actual |
|--------|--------|--------|
| Registered Teams | 50 teams | 87 teams |
| Participating Universities | 20 univ | 34 univ |
| Provinces Represented | 5 provinces | 12 provinces |
| Professional Judges | 3 judges | 5 judges |
| Total Prize Pool | IDR 10M | IDR 15M |

### Challenges & Lessons Learned

**Biggest Challenge:** Coordinating 35 committee members with different class schedules, plus a hybrid (online + offline) execution requiring double technical preparation.

**Solution:** Implemented a Notion-based project management system with standard templates for each division, scheduled weekly sync meetings, and a clear escalation system for quick decision-making.

**Leadership Lessons:**
Leading an event of this scale taught me that **effective leadership is not about controlling, but about empowering**. By giving autonomy to each division head and building a culture of trust, the team was able to work more productively and creatively.

### Impact

WISE Innovera 2026 became one of the largest student UI/UX competitions in West Java, with coverage from several campus media outlets and local design communities. The event also served as a valuable networking opportunity — connecting Widyatama Information Systems students with top talents from other universities across Indonesia.

> *"Organizing WISE Innovera taught me that great events are built on great teams, and great teams are built on trust, clear communication, and shared purpose."*`,
    featured: true,
  },
]

export default projects
