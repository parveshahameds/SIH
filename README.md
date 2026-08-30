# CoLearn — AI-Enabled Training, Learning & Employment Ecosystem

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026%20Initiative-indigo.svg)](https://sih.gov.in/)
[![React 18](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)

**CoLearn** is an AI-powered education and career ecosystem aligned with **National Education Policy (NEP 2020)**. It seamlessly bridges classroom curricula, micro-learning, automated educator gap diagnostics, and verifiable employment pathways.

---

## 🌟 Key Architecture & Experience Overview

CoLearn features completely distinct, fully scaffolded experiences for **Students** and **Educators/Faculty**, built on top of a shared modern design system and realistic domain mock dataset.

### 🎓 Student Ecosystem (10 Dedicated Routes)
1. **Dashboard (`/student/dashboard`)**: Daily AI recommendations, continue learning progress, streak tracker (🔥 14 Days), and today's timetable strip.
2. **EdScroll (`/student/edscroll`)**: Vertical micro-learning reels/cards with interactive 30s quiz checks, code syntax traces, topic chips, and notes bookmarking.
3. **AI Assistant (`/student/ai-assistant`)**: 24/7 conversational AI tutor with prompt shortcuts, math/code explainer, and course syllabus linking.
4. **My Learning (`/student/my-learning`)**: Course progress, module checklists, and mock video lecture player.
5. **Timetable (`/student/timetable`)**: Day-by-day academic schedule with live lab links.
6. **Attendance (`/student/attendance`)**: Aggregate biometric attendance %, subject-wise health thresholds (<75% alerts), and leave application modal.
7. **Career Lab (`/student/career-lab`)**: AI resume score (94%), skill readiness radar, matched internships, and 1-click AI mock technical interviewer.
8. **Skill Passport (`/student/skill-passport`)**: Verifiable cryptographic badges, NEP 2020 Credit Bank (ABC) breakdown, and shareable portfolio links.
9. **Notifications (`/student/notifications`)**: Academic, career, system, and AI diagnostic alert streams.
10. **Profile (`/student/profile`)**: Student bio, roll number, NEP ID, and AI learning preference configurator.

### 👨‍🏫 Teacher / Faculty Suite (9 Dedicated Routes)
1. **Dashboard (`/teacher/dashboard`)**: Faculty KPIs, batch overviews, attendance quick triggers, and flagged AI gap notifications.
2. **Batches (`/teacher/batches`)**: Cohort cards with student counts, average GPA, attendance health, and new batch creator modal.
3. **Students (`/teacher/students`)**: Searchable student directory with drawer inspector, attendance tracking, and AI Risk Level flags.
4. **Timetable (`/teacher/timetable`)**: Master teaching schedule, room allocations, and slot booking.
5. **Attendance (`/teacher/attendance`)**: Rapid batch attendance logger with 1-click **"Mark All Present"** and absent/late toggles.
6. **Learning Gaps (`/teacher/learning-gaps`)**: AI diagnostic telemetry identifying weak concepts (>40% failure rate) and 1-click remedial dispatch.
7. **Courses (`/teacher/courses`)**: Curriculum syllabus manager, module builder, and lecture notes uploader.
8. **Assessments (`/teacher/assessments`)**: Diagnostic quiz builder, AI question generator, and auto-rubric grading overview.
9. **Reports (`/teacher/reports`)**: Class grade distributions, NBA/NAAC outcome-based education (OBE) dossier preview, and PDF exports.

---

## 🛠️ Project Structure

```
SIH/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── README.md
└── src/
    ├── main.tsx                  # App entry
    ├── App.tsx                   # Central router & SIH Jury role switcher
    ├── index.css                 # Tailwind directives & glassmorphism utilities
    ├── types/
    │   ├── index.ts              # Domain entities (User, Student, Course, etc.)
    │   └── navigation.ts         # Navigation items & route configs
    ├── context/
    │   └── AuthContext.tsx       # Dual-role Auth state & demo credentials
    ├── data/
    │   └── mockData.ts           # Realistic SIH mock data store
    ├── hooks/
    │   ├── useAuth.ts            # Auth hook
    │   ├── useAIAssistant.ts     # Conversational AI simulation hook
    │   └── useEdScroll.ts        # Reel navigation & interactive quiz hook
    ├── services/
    │   └── api.ts                # Future backend service contracts
    ├── components/
    │   ├── common/               # Reusable UI Primitives (Design System)
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── Avatar.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── StatCard.tsx
    │   │   └── EmptyState.tsx
    │   └── layout/               # Shells, Headers & Sidebars
    │       ├── LandingNavbar.tsx
    │       ├── LandingFooter.tsx
    │       ├── StudentSidebar.tsx
    │       ├── StudentHeader.tsx
    │       ├── StudentLayout.tsx
    │       ├── TeacherSidebar.tsx
    │       ├── TeacherHeader.tsx
    │       └── TeacherLayout.tsx
    └── pages/
        ├── landing/
        │   └── LandingPage.tsx   # SaaS landing page with teasers
        ├── auth/
        │   ├── StudentLogin.tsx  # Student 1-click Demo login
        │   └── TeacherLogin.tsx  # Teacher 1-click Demo login
        ├── student/              # 10 student route components
        └── teacher/              # 9 teacher route components
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Type-Check and Build Bundle
```bash
npm run build
```

---

## 🎯 Instant SIH Demonstration Guide

For hackathon jury evaluations:
1. Navigate to `/` (Landing Page).
2. Click **"Launch Student Portal"** or navigate to `/login/student` and press **"1-Click Demo Student Sign In"** to experience Ananya Sharma's dashboard.
3. Test **EdScroll** at `/student/edscroll` to try the interactive quizzes and micro-learning reels.
4. Test the **Conversational AI Tutor** at `/student/ai-assistant` with the pre-built prompt chips.
5. Use the floating **SIH Jury Bar** (bottom right) to switch instantaneously into **Teacher Mode (Dr. Rajesh Verma)**.
6. Explore **AI Learning Gaps** (`/teacher/learning-gaps`) and trigger 1-click remedial dispatches.
7. Test **Rapid Batch Attendance** (`/teacher/attendance`) with 1-click Mark All Present.

---

## 🔌 Future Backend Integration Blueprint

All data fetching is decoupled into `src/services/api.ts` and custom hooks:
- **LLM Streaming**: Connect `useAIAssistant` to OpenAI / Gemini / Ollama endpoints via WebSocket or Server-Sent Events.
- **Attendance IoT**: Hook `TeacherAttendance` into campus biometric / RFID / QR gateway APIs.
- **Skill Passport**: Connect `SkillPassport` to Polygon / Hyperledger / DigiLocker / ABC API for on-chain verifiable credential hashes.
