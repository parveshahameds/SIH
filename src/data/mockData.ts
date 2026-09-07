import {
  StudentProfile,
  TeacherProfile,
  Course,
  EdScrollItem,
  QuizCheckpoint,
  TimetableEntry,
  AttendanceSubject,
  SkillCredential,
  JobOpportunity,
  LearningGapDiagnostic,
  BatchInfo,
  StudentRecord,
  AssessmentItem,
  NotificationItem,
  SmartAttendanceSession,
  GDRoom,
  InterviewQuestion
} from '../types';

export const mockStudentUser: StudentProfile = {
  id: 'ncct_trainee_2026_84',
  name: 'Rajesh Kumar Patel',
  email: 'rajesh.patel@ncct.gov.in',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  institution: 'National Council for Cooperative Training (NCCT)',
  trainingCentre: 'Regional Institute of Cooperative Management (RICM), Bengaluru',
  programmeName: 'Higher Diploma in Cooperative Management & Agri-Banking (HDCM)',
  department: 'Cooperative Governance & Rural Banking',
  rollNumber: 'RICM-2026-HDCM-042',
  semester: 2,
  batch: 'HDCM Batch 2025-2026',
  cgpa: 8.92,
  attendanceRate: 94.6,
  streakDays: 19,
  xpPoints: 4820,
  level: 8,
  targetRole: 'PACS Secretary & Cooperative Rural Banking Officer',
  faceRegistered: true,
  faceBiometricTemplate: 'BIO-NCCT-VERIFIED-98421',
  skills: [
    { name: 'PACS Computerization & ERP', level: 94, verified: true, category: 'cooperative' },
    { name: 'Cooperative Accounting & Audit', level: 88, verified: true, category: 'cooperative' },
    { name: 'Dairy Cold-Chain Management', level: 82, verified: true, category: 'domain' },
    { name: 'Microfinance & SHG Banking', level: 90, verified: true, category: 'technical' },
    { name: 'Agricultural Marketing & e-NAM', level: 85, verified: true, category: 'domain' },
    { name: 'Cyber Hygiene & AePS Payments', level: 78, verified: true, category: 'technical' },
    { name: 'Gram Sabha Public Communication', level: 92, verified: true, category: 'soft' }
  ],
  nepCredits: {
    earned: 78,
    required: 120,
    major: 44,
    minor: 18,
    skillEnhancement: 10,
    internship: 6
  }
};

export const mockTeacherUser: TeacherProfile = {
  id: 'ncct_fac_301',
  name: 'Dr. Meenakshi Sundaram',
  email: 'm.sundaram@vamnicom.gov.in',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  institution: 'VAMNICOM (Vaikunth Mehta National Institute), Pune',
  department: 'Centre for Cooperative Management Studies',
  employeeId: 'EMP-NCCT-FAC-2019-14',
  designation: 'Senior Faculty & Lead Cooperative Mentor',
  batches: ['HDCM Batch 2025-2026', 'PACS Secretaries Executive Program', 'Dairy Coops Certification (Batch 4)'],
  subjects: ['Cooperative Management & Bye-Laws', 'PACS Accounting & Audit', 'Rural Financial Inclusion'],
  totalStudents: 148,
  rating: 4.92,
  pendingReviewsCount: 9
};

export const mockStudentCourses: Course[] = [
  // 1. COOPERATIVE
  {
    id: 'crs_coop_01',
    title: 'Cooperative Management, Principles & PACS Workflow',
    code: 'COOP-101',
    instructor: 'Dr. Meenakshi Sundaram (VAMNICOM)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    category: 'Cooperative',
    progressPercentage: 85,
    totalModules: 6,
    completedModules: 5,
    totalHours: 28,
    credits: 4,
    nextLessonTitle: 'PACS Computerization Guidelines & National ERP Standard',
    nextLessonDuration: '22 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Foundational training on International Cooperative Alliance (ICA) principles, Primary Agricultural Credit Society (PACS) operations, and democratic member governance.',
    tags: ['ICA Principles', 'PACS Workflow', 'Governance', 'Ministry of Cooperation'],
    learningOutcomes: [
      'Master the 7 Rochdale Cooperative Principles in modern rural administration',
      'Execute standard daily voucher entries and member registry in PACS ERP',
      'Conduct statutory General Body Meetings in compliance with state Bye-laws'
    ],
    quiz: {
      id: 'quiz_coop_01',
      title: 'PACS Operations & ICA Principles Mastery Test',
      passingScore: 70,
      questions: [
        {
          id: 'q_c1',
          question: 'What is the democratic voting principle followed in a Primary Agricultural Credit Society (PACS)?',
          options: ['One Share, One Vote', 'One Member, One Vote', 'Weighted by loan size', 'Decided by Registrar only'],
          correctIndex: 1,
          explanation: 'Democratic Member Control dictates that each member has exactly one vote irrespective of their shareholding.',
          topicTag: 'Democratic Governance'
        },
        {
          id: 'q_c2',
          question: 'Under the Ministry of Cooperation national initiative, what is the core purpose of PACS computerization?',
          options: [
            'Replacing physical banks entirely',
            'Standardizing accounting on a single ERP with transparency, audit trails, and multi-service business capabilities',
            'Closing non-profitable credit societies',
            'Restricting credit to large landowners only'
          ],
          correctIndex: 1,
          explanation: 'PACS computerization brings common ERP software, transparent online audits, and diversifies PACS into multipurpose hubs (dawai shops, CSCs, petrol outlets).',
          topicTag: 'PACS Computerization'
        }
      ]
    }
  },
  {
    id: 'crs_coop_02',
    title: 'Cooperative Accounting, Audit & Statutory Compliance',
    code: 'COOP-102',
    instructor: 'Prof. Harish Chandra (RICM Lucknow)',
    instructorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    category: 'Cooperative',
    progressPercentage: 60,
    totalModules: 8,
    completedModules: 5,
    totalHours: 32,
    credits: 4,
    nextLessonTitle: 'Trial Balance Reconciliation & Bad Debt Provisioning',
    nextLessonDuration: '28 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Double-entry bookkeeping tailored for rural societies, NPA categorization, dividend calculation, and preparation for Registrar statutory audit.',
    tags: ['Double Entry', 'Statutory Audit', 'NPA Classification', 'Dividend Distribution'],
    learningOutcomes: [
      'Maintain day-books, cash ledgers, and produce verified monthly balance sheets',
      'Compute statutory reserve fund allocations (min 25% of net profits)',
      'Prepare societies for internal and State Cooperative Audit department inspections'
    ],
    quiz: {
      id: 'quiz_coop_02',
      title: 'Cooperative Bookkeeping & Audit Exam',
      passingScore: 75,
      questions: [
        {
          id: 'q_acc1',
          question: 'What percentage of net profit must every cooperative society transfer to the Statutory Reserve Fund according to typical cooperative laws?',
          options: ['10%', '15%', 'At least 25%', '50%'],
          correctIndex: 2,
          explanation: 'Under standard Cooperative Societies Acts, a minimum of 25% of annual net profit must be placed into the Statutory Reserve Fund before dividend distribution.',
          topicTag: 'Reserve Fund Allocation'
        }
      ]
    }
  },
  {
    id: 'crs_coop_03',
    title: 'Cooperative Governance & Model Bye-Laws for PACS',
    code: 'COOP-103',
    instructor: 'Smt. Kavitha Raman (RICM Bengaluru)',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    category: 'Cooperative',
    progressPercentage: 100,
    totalModules: 5,
    completedModules: 5,
    totalHours: 20,
    credits: 3,
    nextLessonTitle: 'Course Completed! Download Certificate',
    nextLessonDuration: '0 min',
    status: 'completed',
    offlineAvailable: true,
    description: 'Detailed analysis of Model Bye-Laws enabling PACS to undertake 25+ business activities including LPG distribution, CSC services, warehouse management, and retail.',
    tags: ['Model Bye-Laws', 'Multi-Purpose PACS', 'Board of Directors', 'Legal Compliance'],
    learningOutcomes: [
      'Adopt Model Bye-laws in Special General Body meetings',
      'Structure board resolutions for opening new commercial verticals'
    ]
  },

  // 2. FINANCE
  {
    id: 'crs_fin_01',
    title: 'Financial Literacy, SHG Banking & Micro-Credit',
    code: 'FIN-201',
    instructor: 'Shri Arvind Joshi (NABARD Certified Trainer)',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80',
    category: 'Finance',
    progressPercentage: 72,
    totalModules: 6,
    completedModules: 4,
    totalHours: 24,
    credits: 3,
    nextLessonTitle: 'Credit Appraisal of Joint Liability Groups (JLGs) & SHGs',
    nextLessonDuration: '18 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Empowering rural households with financial planning, SHG-Bank linkage models, savings accounts, micro-insurance (PMJJBY, PMSBY), and credit discipline.',
    tags: ['SHG Linkage', 'Microfinance', 'PMJJBY', 'Credit Discipline'],
    learningOutcomes: [
      'Evaluate loan applications using 5 Cs of credit analysis for rural borrowers',
      'Facilitate SHG internal lending and bank credit linkage under DAY-NRLM',
      'Explain social security insurance benefits to rural members'
    ],
    quiz: {
      id: 'quiz_fin_01',
      title: 'Rural Micro-Credit & SHG Linkage Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q_f1',
          question: 'What is the key principle of peer guarantee in a Joint Liability Group (JLG)?',
          options: [
            'Members pledge their land as physical collateral',
            'All members are jointly and severally liable for individual loan repayments',
            'Government pays the default',
            'No repayment is needed if rainfall fails'
          ],
          correctIndex: 1,
          explanation: 'In JLGs, mutual trust and joint liability act as social collateral for smallholders and tenant farmers.',
          topicTag: 'JLG Credit Assessment'
        }
      ]
    }
  },
  {
    id: 'crs_fin_02',
    title: 'Digital Payments, Micro-ATMs & AePS for Rural Outlets',
    code: 'FIN-202',
    instructor: 'Er. Kevin Vance & NPCI Rural Division',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=600&auto=format&fit=crop&q=80',
    category: 'Finance',
    progressPercentage: 40,
    totalModules: 5,
    completedModules: 2,
    totalHours: 18,
    credits: 2,
    nextLessonTitle: 'Aadhaar Enabled Payment System (AePS) Merchant Setup & Reconciliation',
    nextLessonDuration: '25 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Operating Micro-ATMs, Aadhaar Pay, QR-based UPI collections, and Direct Benefit Transfer (DBT) disbursement at village doorstep cooperative centers.',
    tags: ['Micro-ATM', 'AePS', 'UPI 123Pay', 'DBT', 'NPCI'],
    learningOutcomes: [
      'Operate biometric finger-scanner POS terminals securely without transaction drops',
      'Resolve failed DBT disbursement issues through NPCI mapper verification'
    ]
  },
  {
    id: 'crs_fin_03',
    title: 'Credit Management, Kisan Credit Card (KCC) & Recovery',
    code: 'FIN-203',
    instructor: 'Dr. Rajesh Verma (VAMNICOM)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    category: 'Finance',
    progressPercentage: 90,
    totalModules: 6,
    completedModules: 5,
    totalHours: 26,
    credits: 3,
    nextLessonTitle: 'Interest Subvention Scheme & Prompt Repayment Incentive (PRI)',
    nextLessonDuration: '15 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Comprehensive KCC scheme mechanics, Scale of Finance (SOF) determination by DLTC, interest subvention calculation, and ethical loan recovery protocols.',
    tags: ['KCC', 'Interest Subvention', 'Scale of Finance', 'NPA Recovery'],
    learningOutcomes: [
      'Calculate crop loan limits according to District Level Technical Committee (DLTC) scale',
      'Claim Central Government 3% prompt repayment incentive for timely repaying farmers'
    ],
    quiz: {
      id: 'quiz_fin_03',
      title: 'KCC Scale of Finance & Subvention Test',
      passingScore: 80,
      questions: [
        {
          id: 'q_kcc1',
          question: 'With 2% interest subvention and 3% prompt repayment incentive (PRI), what is the effective annual interest rate for farmers on short-term crop loans up to ₹3 Lakh?',
          options: ['9%', '7%', '4%', '0%'],
          correctIndex: 2,
          explanation: 'Standard rate is 9%. Subvention brings it to 7%, and with 3% prompt repayment incentive, the effective rate is only 4% per annum.',
          topicTag: 'KCC Subvention & PRI'
        }
      ]
    }
  },

  // 3. AGRICULTURE
  {
    id: 'crs_agri_01',
    title: 'Agricultural Marketing, e-NAM & Post-Harvest Value Chains',
    code: 'AGRI-301',
    instructor: 'Dr. B. K. Sharma (ICM Chandigarh)',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
    category: 'Agriculture',
    progressPercentage: 55,
    totalModules: 7,
    completedModules: 4,
    totalHours: 26,
    credits: 3,
    nextLessonTitle: 'Electronic National Agriculture Market (e-NAM) Assaying & Bidding',
    nextLessonDuration: '30 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Post-harvest handling, quality grading, assaying parameters, e-NAM portal trading, and establishing primary processing facilities at PACS level.',
    tags: ['e-NAM', 'Grading & Assaying', 'Value Chain', 'Post-Harvest Loss Reduction'],
    learningOutcomes: [
      'Register farmers and lots on e-NAM for competitive pan-India bidding',
      'Set up WDRA-compliant village warehousing and pledge loan financing'
    ]
  },
  {
    id: 'crs_agri_02',
    title: 'Farm Business Management & Farmer Producer Organisations (FPO)',
    code: 'AGRI-302',
    instructor: 'Dr. Meenakshi Sundaram (VAMNICOM)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    category: 'Agriculture',
    progressPercentage: 45,
    totalModules: 8,
    completedModules: 3,
    totalHours: 30,
    credits: 4,
    nextLessonTitle: 'Input Aggregation & Bulk Purchasing Economies for FPO Clusters',
    nextLessonDuration: '24 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Formation, registration under Companies Act / Cooperative Societies Act, business plan drafting, equity grant schemes, and credit guarantee coverage for FPOs.',
    tags: ['FPO Strategy', 'Agri-Business', 'Equity Grant', 'Input Supply'],
    learningOutcomes: [
      'Draft bankable FPO business plans for seed processing and fertilizer dealership',
      'Access SFAC Equity Grant and NABKISAN credit guarantees'
    ]
  },
  {
    id: 'crs_agri_03',
    title: 'Sustainable Agriculture, Organic Farming & Bio-Inputs',
    code: 'AGRI-303',
    instructor: 'Dr. Sunita Pillai & National Organic Centre',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80',
    category: 'Agriculture',
    progressPercentage: 100,
    totalModules: 5,
    completedModules: 5,
    totalHours: 22,
    credits: 3,
    nextLessonTitle: 'Course Completed! View Badge',
    nextLessonDuration: '0 min',
    status: 'completed',
    offlineAvailable: true,
    description: 'Natural farming techniques, Paramparagat Krishi Vikas Yojana (PKVY), bio-fertilizer production at village level, and PGS-India organic certification.',
    tags: ['Organic Certification', 'Natural Farming', 'PKVY', 'Bio-fertilizer'],
    learningOutcomes: [
      'Implement Participatory Guarantee System (PGS-India) for cluster certification',
      'Manage cooperative vermicompost and liquid bio-fertilizer manufacturing units'
    ]
  },

  // 4. DAIRY
  {
    id: 'crs_dairy_01',
    title: 'Dairy Cooperative Management & Village Procurement Models',
    code: 'DAIRY-401',
    instructor: 'Dr. Anand Kurien (National Dairy Development Board Panel)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy',
    progressPercentage: 92,
    totalModules: 6,
    completedModules: 5,
    totalHours: 24,
    credits: 3,
    nextLessonTitle: 'Automatic Milk Collection Unit (AMCU) Integration with Member Accounts',
    nextLessonDuration: '16 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Mastering the 3-tier Anand Pattern (Village Dairy Cooperative Society, District Milk Union, State Milk Federation), daily procurement systems, and producer bonus management.',
    tags: ['Anand Pattern', 'AMCU', 'Milk Procurement', 'NDDB', 'Dairy Federation'],
    learningOutcomes: [
      'Establish and manage a Primary Dairy Cooperative Society (DCS)',
      'Automate daily morning/evening milk intake with electronic fat testing & instant payment receipts',
      'Calculate annual price difference bonus for farmer-producers based on milk quality'
    ],
    quiz: {
      id: 'quiz_dairy_01',
      title: 'Dairy Cooperative Structure & AMCU Quiz',
      passingScore: 75,
      questions: [
        {
          id: 'q_d1',
          question: 'In the Anand 3-tier cooperative dairy model, who is the owner and sole supplier of the Primary Dairy Cooperative Society (DCS)?',
          options: ['State Government', 'Private Dairies', 'Village Milk Producers / Farmers', 'Municipal Corporation'],
          correctIndex: 2,
          explanation: 'The dairy producers themselves are the voting members and owners who supply milk and receive patronage refunds.',
          topicTag: 'Anand Pattern Ownership'
        }
      ]
    }
  },
  {
    id: 'crs_dairy_02',
    title: 'Milk Quality Testing, Hygiene, Somatic Cell Count & Cold Chain',
    code: 'DAIRY-402',
    instructor: 'Dr. Sunita Pillai (RICM Pune)',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy',
    progressPercentage: 70,
    totalModules: 5,
    completedModules: 3,
    totalHours: 20,
    credits: 3,
    nextLessonTitle: 'Bulk Milk Cooler (BMC) Maintenance & Rapid Chilling to 4°C',
    nextLessonDuration: '20 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Adulteration testing (urea, starch, detergent detection), Methylene Blue Reduction Test (MBRT), Somatic Cell Count (SCC), and Bulk Milk Cooler (BMC) operations.',
    tags: ['MBRT', 'Fat/SNF', 'Bulk Milk Cooler', 'Clean Milk Production', 'Cold Chain'],
    learningOutcomes: [
      'Perform Gerber Fat Test and Lactometer SNF calculation accurately',
      'Prevent milk souring by chilling milk to under 4°C within 3 hours of milking',
      'Identify sub-clinical mastitis using California Mastitis Test (CMT)'
    ],
    quiz: {
      id: 'quiz_dairy_02',
      title: 'Milk Quality, Adulteration & Cold Chain Diagnostics',
      passingScore: 80,
      questions: [
        {
          id: 'q_dq1',
          question: 'To preserve microbial quality and prevent bacterial multiplication, raw milk in a Bulk Milk Cooler (BMC) should be chilled to what temperature?',
          options: ['15°C', '10°C', '4°C or below', '0°C (frozen)'],
          correctIndex: 2,
          explanation: 'Chilling raw milk rapidly to 4°C or lower halts bacterial proliferation while maintaining fat emulsion.',
          topicTag: 'Cold Chain Temperature'
        },
        {
          id: 'q_dq2',
          question: 'A high Somatic Cell Count (SCC > 300,000 cells/ml) in pooled dairy milk is a primary indicator of what condition?',
          options: ['Excess water addition', 'Bovine Mastitis (udder infection)', 'High protein content', 'Low calcium levels'],
          correctIndex: 1,
          explanation: 'Elevated Somatic Cell Count indicates an immune response to udder infection (mastitis), requiring clean milking protocol intervention.',
          topicTag: 'Somatic Cell Count (SCC)'
        }
      ]
    }
  },

  // 5. ENTREPRENEURSHIP
  {
    id: 'crs_entr_01',
    title: 'Rural Entrepreneurship, SHG Enterprises & PMFME Scheme',
    code: 'ENTR-501',
    instructor: 'Shri Vikramaditya Sharma (EDII Mentor)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
    category: 'Entrepreneurship',
    progressPercentage: 65,
    totalModules: 6,
    completedModules: 4,
    totalHours: 24,
    credits: 3,
    nextLessonTitle: 'PM-FME 35% Credit-Linked Subsidy Application & One District One Product (ODOP)',
    nextLessonDuration: '25 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Starting village food processing units (oil mills, dal processing, pickle, honey packaging) under PM Formalisation of Micro food processing Enterprises (PMFME).',
    tags: ['PMFME', 'ODOP', 'Rural Enterprise', 'Food Processing'],
    learningOutcomes: [
      'Identify viable One District One Product (ODOP) value-addition opportunities',
      'Prepare credit-linked capital subsidy applications with FSSAI compliance'
    ]
  },
  {
    id: 'crs_entr_02',
    title: 'Business Planning, Detailed Project Report (DPR) & Feasibility',
    code: 'ENTR-502',
    instructor: 'Dr. Harish Chandra (RICM Lucknow)',
    instructorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    category: 'Entrepreneurship',
    progressPercentage: 50,
    totalModules: 5,
    completedModules: 2,
    totalHours: 20,
    credits: 3,
    nextLessonTitle: 'Financial Projections: DSCR, Break-Even Analysis & Working Capital',
    nextLessonDuration: '30 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Step-by-step drafting of bankable DPRs for cooperative ventures, calculating Debt Service Coverage Ratio (DSCR), Net Present Value (NPV), and payback period.',
    tags: ['DPR Formulation', 'DSCR', 'Financial Feasibility', 'Bankable Proposal'],
    learningOutcomes: [
      'Calculate Debt Service Coverage Ratio (DSCR > 1.5) to secure bank credit approval',
      'Model seasonal working capital requirements for agri-input procurement'
    ]
  },
  {
    id: 'crs_entr_03',
    title: 'Digital Marketing & Social Commerce for Rural Produce & Crafts',
    code: 'ENTR-503',
    instructor: 'Ms. Pooja Hegde (E-Commerce Specialist)',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
    category: 'Entrepreneurship',
    progressPercentage: 80,
    totalModules: 5,
    completedModules: 4,
    totalHours: 18,
    credits: 2,
    nextLessonTitle: 'Cataloguing Village Crafts on ONDC (Open Network for Digital Commerce)',
    nextLessonDuration: '18 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Selling village products through ONDC, GeM portal, WhatsApp Business catalogue, barcode packaging, and regional storytelling branding.',
    tags: ['ONDC', 'WhatsApp Commerce', 'Packaging & Branding', 'GeM Portal'],
    learningOutcomes: [
      'List SHG products on the Government e-Marketplace (GeM) Saras collection',
      'Create high-converting mobile catalogues on WhatsApp Business'
    ]
  },

  // 6. DIGITAL
  {
    id: 'crs_dig_01',
    title: 'Computer Basics, MS Office & Cloud Tools for PACS Staff',
    code: 'DIG-601',
    instructor: 'Er. Kevin Vance (Digital Literacy Lead)',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    category: 'Digital',
    progressPercentage: 100,
    totalModules: 6,
    completedModules: 6,
    totalHours: 24,
    credits: 3,
    nextLessonTitle: 'Course Completed! Download Certificate',
    nextLessonDuration: '0 min',
    status: 'completed',
    offlineAvailable: true,
    description: 'Practical spreadsheet modeling for member loans, formula automations (VLOOKUP, SUMIFS), document formatting, email protocols, and cloud backup.',
    tags: ['Spreadsheet Modeling', 'PACS Automation', 'Cloud Drive', 'Data Entry'],
    learningOutcomes: [
      'Build automated loan calculation sheets with interest amortization tables',
      'Manage secure multi-user folders in cloud storage with access permissions'
    ]
  },
  {
    id: 'crs_dig_02',
    title: 'Internet, e-Governance Portals & Rural Citizen Services',
    code: 'DIG-602',
    instructor: 'Shri Aditya Kulkarni (Common Services Center Lead)',
    instructorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    category: 'Digital',
    progressPercentage: 60,
    totalModules: 5,
    completedModules: 3,
    totalHours: 18,
    credits: 2,
    nextLessonTitle: 'Providing 50+ Citizen G2C Services through PACS as CSC Centers',
    nextLessonDuration: '22 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Transforming PACS into Common Service Centers (CSCs) delivering DigiLocker, PAN, e-Shram, PM-KISAN KYC, crop insurance registration, and railway ticketing.',
    tags: ['CSC Services', 'PM-KISAN', 'DigiLocker', 'G2C Delivery'],
    learningOutcomes: [
      'Process PM-KISAN biometric e-KYC and land record linking for farmers',
      'Issue digitally signed certificates and land revenue extracts (7/12, RTC)'
    ]
  },
  {
    id: 'crs_dig_03',
    title: 'Cybersecurity, Phishing Defense & Cyber Hygiene for Rural Banks',
    code: 'DIG-603',
    instructor: 'Dr. Rajesh Verma (CoLearn AI Systems)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    category: 'Digital',
    progressPercentage: 85,
    totalModules: 4,
    completedModules: 3,
    totalHours: 16,
    credits: 2,
    nextLessonTitle: 'Preventing Biometric Cloning & Social Engineering Scams in AePS',
    nextLessonDuration: '14 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Crucial cyber hygiene protocols for cooperative banks and PACS: password management, ransomware prevention, recognizing fraudulent calls, and RBI reporting.',
    tags: ['Cyber Hygiene', 'AePS Fraud Prevention', 'RBI Guidelines', 'Data Privacy'],
    learningOutcomes: [
      'Detect voice phishing (vishing) and fake APK loan apps targeting farmers',
      'Follow 2FA login procedures and implement daily automated database backups'
    ],
    quiz: {
      id: 'quiz_dig_03',
      title: 'Cyber Hygiene & Rural Banking Security Test',
      passingScore: 80,
      questions: [
        {
          id: 'q_sec1',
          question: 'If a caller claims to be a Cooperative Bank IT Officer asking for an OTP to unlock the PACS ERP software, what should the trainee do?',
          options: [
            'Immediately share the OTP',
            'Never share the OTP, terminate the call, and report the fraud attempt on 1930 Cyber Helpline',
            'Ask for their employee ID and then share it',
            'Write the OTP on the public notice board'
          ],
          correctIndex: 1,
          explanation: 'Legitimate bank and IT personnel will NEVER ask for OTPs or passwords. All suspected scams must be reported to 1930.',
          topicTag: 'Phishing Defense'
        }
      ]
    }
  },

  // 7. EMPLOYABILITY
  {
    id: 'crs_emp_01',
    title: 'Workplace Communication, Gram Sabha Leadership & Teamwork',
    code: 'EMP-701',
    instructor: 'Prof. Ananya Sen (Leadership Coach)',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    category: 'Employability',
    progressPercentage: 75,
    totalModules: 5,
    completedModules: 4,
    totalHours: 20,
    credits: 2,
    nextLessonTitle: 'Managing Conflict & Resolving Grievances in General Body Meetings',
    nextLessonDuration: '20 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Effective oral and written communication in regional languages and English, active listening, negotiation, and presenting annual cooperative reports with clarity.',
    tags: ['Gram Sabha Communication', 'Conflict Resolution', 'Presentation', 'Active Listening'],
    learningOutcomes: [
      'Deliver persuasive presentations during annual general body meetings',
      'Draft formal board resolutions and government correspondence'
    ]
  },
  {
    id: 'crs_emp_02',
    title: 'Resume Building, Skill Profiling & Digital Portfolio for Cooperatives',
    code: 'EMP-702',
    instructor: 'Career Foundry AI & NCCT Placement Cell',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    category: 'Employability',
    progressPercentage: 90,
    totalModules: 4,
    completedModules: 3,
    totalHours: 14,
    credits: 2,
    nextLessonTitle: 'Generating Verifiable Skill Passport Links for Job Applications',
    nextLessonDuration: '12 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Crafting high-impact resumes tailored for DCCBs, dairy federations, PACS, and agri-startups, showcasing verified NSQF credentials and practical field training.',
    tags: ['Skill Passport', 'Resume Writing', 'NCCT Certification', 'Job Search'],
    learningOutcomes: [
      'Format resumes with quantifiable achievements (e.g. "Recovered 98% of crop loans")',
      'Embed QR-linked verified Skill Passport credentials in job applications'
    ]
  },
  {
    id: 'crs_emp_03',
    title: 'Interview Skills, Board Panels & Professional Ethics',
    code: 'EMP-703',
    instructor: 'Dr. Rajesh Verma & Cooperative Recruitment Board Panel',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    category: 'Employability',
    progressPercentage: 60,
    totalModules: 5,
    completedModules: 3,
    totalHours: 18,
    credits: 2,
    nextLessonTitle: 'Mock Interview: Handling Banking Ombudsman & Audit Questions',
    nextLessonDuration: '25 mins',
    status: 'in-progress',
    offlineAvailable: true,
    description: 'Preparing for Cooperative Service Examination Board (CSEB) interviews, body language, ethics of financial stewardship, and handling situational questions.',
    tags: ['CSEB Interview', 'Professional Ethics', 'Body Language', 'Mock Interview'],
    learningOutcomes: [
      'Answer technical banking and bye-law scenarios with confidence in panel interviews',
      'Demonstrate integrity and fiduciary duty towards cooperative member funds'
    ],
    quiz: {
      id: 'quiz_emp_03',
      title: 'Cooperative Fiduciary Ethics & Interview Preparedness',
      passingScore: 75,
      questions: [
        {
          id: 'q_e1',
          question: 'In a situation where a relative asks for loan sanction without following required KYC documentation, what is the ethically correct response?',
          options: [
            'Approve the loan quietly because they are family',
            'Politely refuse and mandate complete KYC compliance as required by RBI and Cooperative Bye-laws',
            'Ask for a cash bribe',
            'Ignore the PACS audit rules'
          ],
          correctIndex: 1,
          explanation: 'Fiduciary responsibility and equal compliance for all members ensure the safety and trust of the cooperative ecosystem.',
          topicTag: 'Fiduciary Responsibility'
        }
      ]
    }
  }
];

// Sequential NCCT EdScroll micro-learning reels
export const mockEdScrollFeed: EdScrollItem[] = [
  {
    id: 'ed_01',
    order: 1,
    creatorName: 'NCCT Learning Lab',
    creatorRole: 'Ministry of Cooperation Mentor',
    creatorAvatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&auto=format&fit=crop&q=80',
    title: '1. What is the Core Power of PACS Computerization?',
    description: 'Primary Agricultural Credit Societies (PACS) are the bedrock of India rural credit. By connecting 63,000+ PACS onto a single cloud ERP, transparency surges, audits occur in real-time, and PACS become multi-purpose business hubs (dawai shops, petrol outlets, and CSCs)!',
    tag: '#PACSComputerization',
    category: 'Cooperative',
    readTime: '45s Reel',
    likesCount: 2450,
    sharesCount: 680,
    isLiked: true,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'Common ERP software eliminates bookkeeping lags and opens 25+ new revenue lines for village cooperatives.',
    codeSnippet: `// Standard Daily Cash Balance Check:
Total_Daily_Receipts - Total_Daily_Disbursements == Closing_Cash_In_Safe;
// Auto-synced to District Central Cooperative Bank (DCCB) nightly!`,
    interactiveQuiz: {
      question: 'How many operational PACS are being onboarded onto the National Common ERP software?',
      options: ['1,000', '10,000', '63,000+', '500'],
      correctIndex: 2,
      explanation: 'Over 63,000 functional PACS across India are being modernized under the National PACS Computerization project.'
    }
  },
  {
    id: 'ed_02',
    order: 2,
    creatorName: 'Dr. Anand Kurien (NDDB)',
    creatorRole: 'Dairy Cooperative Scientist',
    creatorAvatar: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=100&auto=format&fit=crop&q=80',
    title: '2. The 4°C Golden Rule in Dairy Cold Chains',
    description: 'When milk is collected at the village society, bacteria double every 20 minutes at 30°C! Chilling milk to 4°C within 3 hours in a Bulk Milk Cooler (BMC) puts bacteria into dormant state, preserving fat structure and boosting producer earnings.',
    tag: '#DairyTechnology',
    category: 'Dairy',
    readTime: '50s Reel',
    likesCount: 1820,
    sharesCount: 410,
    isLiked: true,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'Rapid chilling to 4°C halts bacterial proliferation and protects milk freshness for up to 48 hours.',
    interactiveQuiz: {
      question: 'What is the maximum ideal temperature for raw milk storage in a Village Bulk Milk Cooler?',
      options: ['18°C', '12°C', '4°C', '25°C'],
      correctIndex: 2,
      explanation: '4°C is the internationally certified chilling temperature for maintaining raw milk grade.'
    }
  },
  {
    id: 'ed_03',
    order: 3,
    creatorName: 'Fintech Rural Cell',
    creatorRole: 'Digital Payments Specialist',
    creatorAvatar: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=100&auto=format&fit=crop&q=80',
    title: '3. Why KCC Prompt Repayments yield 4% Effective Interest',
    description: 'The standard bank loan rate is 9%. The Central Government grants a 2% interest subvention, bringing it to 7%. For farmers who repay on or before the due date, an additional 3% Prompt Repayment Incentive (PRI) is awarded, slashing the net interest to just 4% per year!',
    tag: '#RuralFinance',
    category: 'Finance',
    readTime: '40s Reel',
    likesCount: 3100,
    sharesCount: 920,
    isLiked: true,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'Prompt repayment saves farmers more than 50% on interest costs under the Kisan Credit Card scheme.',
    interactiveQuiz: {
      question: 'What is the prompt repayment incentive (PRI) rebate for timely KCC borrowers?',
      options: ['1%', '3%', '5%', '10%'],
      correctIndex: 1,
      explanation: 'Borrowers who repay crop loans on time receive an extra 3% rebate from the Government.'
    }
  },
  {
    id: 'ed_04',
    order: 4,
    creatorName: 'Agri-Tech Mission',
    creatorRole: 'e-NAM Coordinator',
    creatorAvatar: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=100&auto=format&fit=crop&q=80',
    title: '4. How e-NAM Unlocks Pan-India Buyers for Farmers',
    description: 'Instead of being locked into a single village mandi with 3 local traders, e-NAM allows farmers to get their produce scientifically tested (moisture, foreign matter, grain size) and bid on by 2 Lakh+ registered buyers across India!',
    tag: '#AgriMarketing',
    category: 'Agriculture',
    readTime: '55s Reel',
    likesCount: 1540,
    sharesCount: 360,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'Scientific assaying combined with electronic pan-India bidding ensures maximum price realization.',
    interactiveQuiz: {
      question: 'What is the primary prerequisite before a farmer lot is listed for online bidding on e-NAM?',
      options: ['Paying a cash deposit', 'Quality Assaying & Lot Grading', 'Owning 10 acres of land', 'Buying special software'],
      correctIndex: 1,
      explanation: 'Quality assaying provides objective grade standards that remote online buyers can trust.'
    }
  },
  {
    id: 'ed_05',
    order: 5,
    creatorName: 'Dr. Meenakshi Sundaram',
    creatorRole: 'Senior Faculty (VAMNICOM)',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    title: '5. Double Entry Balancing in Cooperative Day-Books',
    description: 'Every rupee entering or leaving the society must balance: Total Debits = Total Credits. When disbursing a crop loan of ₹50,000, debit Member Crop Loan Account and credit Cash/Bank Account. Never mix reserve fund investments with operational cash!',
    tag: '#CoopAccounting',
    category: 'Cooperative',
    readTime: '60s Reel',
    likesCount: 2890,
    sharesCount: 710,
    isCompleted: false,
    isLocked: false,
    checkpointRequired: true,
    keyTakeaway: 'Strict separation of Statutory Reserve Funds from daily operational cash ensures financial solvency.',
    codeSnippet: `// Daily Journal Voucher entry:
Debit: Member_Loan_Ledger (Asset Increase) ₹50,000
Credit: Bank_Disbursement_Account (Asset Decrease) ₹50,000`,
    interactiveQuiz: {
      question: 'When a member repays principal loan with cash, how is it recorded in the day-book?',
      options: [
        'Debit Cash, Credit Member Loan Account',
        'Credit Cash, Debit Member Loan Account',
        'Debit Profit & Loss, Credit Reserve Fund',
        'Credit Dividend Account, Debit Bank'
      ],
      correctIndex: 0,
      explanation: 'Cash increases (Debit Asset), while outstanding Loan Receivable decreases (Credit Asset).'
    }
  },
  {
    id: 'ed_06',
    order: 6,
    creatorName: 'Rural Cyber Guardian',
    creatorRole: 'Digital Security Trainer',
    creatorAvatar: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80',
    title: '6. Spotting Biometric Spoofing in AePS Cash Outlets',
    description: 'Micro-ATM and AePS operators must always enable Liveness Detection on fingerprint scanners. Never accept pre-recorded silicone casts or allow customers to sign blank withdrawal slips. Always verify SMS confirmation before handing over physical currency.',
    tag: '#CyberHygiene',
    category: 'Digital',
    readTime: '50s Reel',
    likesCount: 1980,
    sharesCount: 520,
    isCompleted: false,
    isLocked: true,
    keyTakeaway: 'Live biometric verification and transaction SMS verification protect both customer and PACS secretary.',
    interactiveQuiz: {
      question: 'What should the operator verify BEFORE handing cash to an AePS customer?',
      options: [
        'Only oral agreement',
        'Success status on screen and transaction reference ID receipt',
        'Customer signature on blank sheet',
        'Ask the customer to come back tomorrow'
      ],
      correctIndex: 1,
      explanation: 'Physical cash should only be disbursed after the POS terminal confirms Success and prints/shows the reference ID.'
    }
  }
];

export const mockQuizCheckpoint: QuizCheckpoint = {
  id: 'checkpoint_ncct_01',
  title: 'Section 1 Checkpoint: Core Cooperative & Rural Financial Competency',
  requiredAfterLessonOrder: 5,
  unlocked: true,
  passed: false,
  questions: [
    {
      id: 'cp_q1',
      question: 'Under the National PACS Computerization project, what is the mandated accounting method for all societies?',
      options: [
        'Single entry cash system on paper',
        'Accrual-based double-entry bookkeeping on National Common ERP',
        'No accounting required for small PACS',
        'Informal ledger managed by local committee'
      ],
      correctIndex: 1,
      explanation: 'Accrual-based double-entry bookkeeping on standardized ERP provides transparency and direct integration with NABARD and state cooperative banks.'
    },
    {
      id: 'cp_q2',
      question: 'What is the required milk chilling temperature in Bulk Milk Coolers (BMCs) to prevent souring?',
      options: ['15°C', '10°C', '4°C or below', '25°C'],
      correctIndex: 2,
      explanation: 'Chilling to 4°C within 3 hours stops bacterial growth and protects quality.'
    },
    {
      id: 'cp_q3',
      question: 'What is the effective interest rate on short-term crop loans up to ₹3 Lakh when a farmer repays on time?',
      options: ['9%', '7%', '4%', '0%'],
      correctIndex: 2,
      explanation: '7% minus 3% Prompt Repayment Incentive (PRI) equals 4% net interest rate.'
    }
  ]
};

export const mockSmartAttendanceSession: SmartAttendanceSession = {
  code: 'NCCT-8492',
  subject: 'COOP-101: Cooperative Management & PACS Governance',
  batch: 'HDCM Batch 2025-2026 (Sem 2)',
  classroom: 'Seminar Hall 1 (VAMNICOM / RICM Campus)',
  expiresInSeconds: 300,
  isActive: true,
  securityRequirements: {
    gpsGeofence: true,
    campusWifi: true,
    faceScanBiometrics: true
  },
  verifiedCount: 38,
  totalEnrolled: 44
};

export const mockGDRooms: GDRoom[] = [
  {
    id: 'gd_01',
    topic: 'Can Multi-Purpose PACS Solve Rural Youth Unemployment?',
    category: 'Cooperative Governance',
    description: 'Analyze how diversifying PACS into drone spraying hubs, Common Service Centers, consumer retail, and cold storage creates direct technical jobs for rural youth.',
    status: 'in-progress',
    timeRemainingSeconds: 480,
    participants: [
      {
        id: 'p_rajesh',
        name: 'Rajesh Kumar Patel (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        role: 'student',
        isSpeaking: false,
        speakingTimeSeconds: 52,
        contributionScore: 92
      },
      {
        id: 'p_priya',
        name: 'Priya Sharma (RICM Lucknow)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        role: 'ai-peer',
        isSpeaking: true,
        speakingTimeSeconds: 68,
        contributionScore: 86
      },
      {
        id: 'p_mod',
        name: 'NCCT AI Discussion Moderator',
        avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&auto=format&fit=crop&q=80',
        role: 'moderator',
        isSpeaking: false,
        speakingTimeSeconds: 24,
        contributionScore: 99
      }
    ],
    messages: [
      {
        id: 'm1',
        participantId: 'p_mod',
        participantName: 'NCCT AI Moderator',
        text: 'Welcome to Cooperative Leadership GD #204. Each participant has 90 seconds to present economic rationale.',
        timestamp: '14:00',
        type: 'ai-prompt'
      },
      {
        id: 'm2',
        participantId: 'p_priya',
        participantName: 'Priya Sharma',
        text: 'PACS model bye-laws now permit CSC operations and Jan Aushadhi generic pharmacy stores, turning every village credit society into a multi-revenue employer.',
        timestamp: '14:02',
        type: 'speech',
        sentiment: 'constructive'
      }
    ],
    moderatorScore: {
      articulation: 90,
      factualBacking: 94,
      collaborativeListening: 88,
      overallGrade: 'A+'
    }
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq_01',
    question: 'How do you handle a situation where a loan applicant in a PACS has an overdue balance in a commercial bank (CIBIL default)?',
    category: 'Cooperative Banking & Credit',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'Check whether the default is wilful or due to genuine crop failure. Verify state debt relief status, discuss restructuring under RBI guidelines, and evaluate collateral/guarantees before presenting to the PACS Loan Sub-Committee.',
    rubric: {
      technicalAccuracy: 95,
      communicationClarity: 92,
      problemSolvingStructure: 94
    }
  },
  {
    id: 'iq_02',
    question: 'Explain the protocol for testing milk quality and detecting urea or starch adulteration at a village dairy collection center.',
    category: 'Dairy Operations & Hygiene',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'Conduct organoleptic test, Lactometer density test (SNF), Gerber acid butyrometer test (Fat), and apply iodine reagent for starch detection and DMAB reagent for urea. Reject contaminated milk immediately.',
    rubric: {
      technicalAccuracy: 94,
      communicationClarity: 90,
      problemSolvingStructure: 92
    }
  },
  {
    id: 'iq_03',
    question: 'What steps would you take to promote digital adoption of AePS and UPI in a remote tribal village with low literacy?',
    category: 'Financial Inclusion & Communication',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'Conduct hands-on live demonstrations in weekly haats (village markets), utilize local language audio prompts (UPI 123Pay), train SHG Bank Sakhis as trusted ambassadors, and educate members on biometric fraud prevention.',
    rubric: {
      technicalAccuracy: 92,
      communicationClarity: 96,
      problemSolvingStructure: 90
    }
  }
];

export const mockTimetable: TimetableEntry[] = [
  {
    id: 'tt_01',
    subject: 'Cooperative Management & PACS Governance',
    code: 'COOP-101',
    instructor: 'Dr. Meenakshi Sundaram',
    classroom: 'Hall 1 (Academic Block A)',
    batch: 'HDCM Batch 2025-2026',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    type: 'Lecture',
    isLiveNow: true,
    meetingLink: 'https://meet.ncct.gov.in/coop101',
    attendanceMarked: false
  },
  {
    id: 'tt_02',
    subject: 'PACS Computerization & ERP Lab',
    code: 'COOP-102',
    instructor: 'Prof. Harish Chandra',
    classroom: 'Computer Lab 2 (RICM Campus)',
    batch: 'HDCM Batch 2025-2026',
    day: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    type: 'Lab',
    isLiveNow: false
  },
  {
    id: 'tt_03',
    subject: 'Dairy Cold-Chain & Quality Control',
    code: 'DAIRY-402',
    instructor: 'Dr. Anand Kurien',
    classroom: 'Dairy Demonstration Center',
    batch: 'HDCM Batch 2025-2026',
    day: 'Tuesday',
    startTime: '09:30 AM',
    endTime: '11:00 AM',
    type: 'Lab',
    isLiveNow: false
  },
  {
    id: 'tt_04',
    subject: 'Financial Literacy & Micro-Credit',
    code: 'FIN-201',
    instructor: 'Shri Arvind Joshi',
    classroom: 'Hall 2 (Finance Wing)',
    batch: 'HDCM Batch 2025-2026',
    day: 'Wednesday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    type: 'Lecture',
    isLiveNow: false
  },
  {
    id: 'tt_05',
    subject: 'Field Attachment: District Central Cooperative Bank (DCCB)',
    code: 'FLD-501',
    instructor: 'DCCB Lead Mentor Panel',
    classroom: 'DCCB Main Branch',
    batch: 'HDCM Batch 2025-2026',
    day: 'Friday',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    type: 'Assessment',
    isLiveNow: false
  }
];

export const mockAttendanceRecords: AttendanceSubject[] = [
  {
    subjectCode: 'COOP-101',
    subjectName: 'Cooperative Management & PACS Governance',
    facultyName: 'Dr. Meenakshi Sundaram',
    totalClasses: 32,
    attendedClasses: 31,
    percentage: 96.8,
    status: 'safe',
    lastClassDate: 'Today, 09:00 AM (Live)'
  },
  {
    subjectCode: 'COOP-102',
    subjectName: 'PACS Computerization & ERP Lab',
    facultyName: 'Prof. Harish Chandra',
    totalClasses: 28,
    attendedClasses: 27,
    percentage: 96.4,
    status: 'safe',
    lastClassDate: 'Yesterday, 11:00 AM'
  },
  {
    subjectCode: 'FIN-201',
    subjectName: 'Financial Literacy & SHG Banking',
    facultyName: 'Shri Arvind Joshi',
    totalClasses: 24,
    attendedClasses: 23,
    percentage: 95.8,
    status: 'safe',
    lastClassDate: '28 Aug 2026'
  },
  {
    subjectCode: 'DAIRY-402',
    subjectName: 'Dairy Quality Testing & Cold Chain',
    facultyName: 'Dr. Sunita Pillai',
    totalClasses: 22,
    attendedClasses: 20,
    percentage: 90.9,
    status: 'safe',
    lastClassDate: '26 Aug 2026'
  },
  {
    subjectCode: 'DIG-603',
    subjectName: 'Cybersecurity & Cyber Hygiene for Rural Banking',
    facultyName: 'Dr. Rajesh Verma',
    totalClasses: 18,
    attendedClasses: 16,
    percentage: 88.8,
    status: 'safe',
    lastClassDate: '24 Aug 2026'
  }
];

export const mockSkillPassportData: SkillCredential[] = [
  {
    id: 'cred_ncct_01',
    title: 'Certified PACS Secretary & Rural ERP Specialist',
    issuer: 'National Council for Cooperative Training (NCCT) & Ministry of Cooperation',
    issueDate: 'August 18, 2026',
    verificationHash: '0xNCCT-PACS-8942-B8E9',
    badgeUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&auto=format&fit=crop&q=80',
    score: 96,
    skills: ['PACS National ERP', 'Double Entry Bookkeeping', 'Model Bye-Laws', 'Registrar Audit Compliance'],
    creditsAllocated: 4,
    status: 'verified'
  },
  {
    id: 'cred_ncct_02',
    title: 'Dairy Cooperative Quality & Cold-Chain Supervisor',
    issuer: 'NCCT x National Dairy Development Board (NDDB)',
    issueDate: 'July 24, 2026',
    verificationHash: '0xNDDB-DAIRY-7741-98AF',
    badgeUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=100&auto=format&fit=crop&q=80',
    score: 91,
    skills: ['Bulk Milk Cooler (BMC) Maintenance', 'MBRT & Fat/SNF Testing', 'Anand Pattern Procurement'],
    creditsAllocated: 3,
    status: 'verified'
  },
  {
    id: 'cred_ncct_03',
    title: 'Rural Micro-Banking & AePS Financial Inclusion Lead',
    issuer: 'VAMNICOM x NABARD Financial Inclusion Mission',
    issueDate: 'June 15, 2026',
    verificationHash: '0xNABARD-FIN-1284-CA55',
    badgeUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=100&auto=format&fit=crop&q=80',
    score: 94,
    skills: ['Micro-ATM Operation', 'SHG Credit Appraisal', 'KCC Subvention Calculation', 'Cyber Hygiene'],
    creditsAllocated: 3,
    status: 'verified'
  },
  {
    id: 'cred_ncct_04',
    title: 'Agri-Business Planning & FPO Executive Certification',
    issuer: 'Regional Institute of Cooperative Management (RICM)',
    issueDate: 'Target: October 2026 (In Progress)',
    verificationHash: '0xPENDING-RICM-AUDIT',
    badgeUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&auto=format&fit=crop&q=80',
    score: 82,
    skills: ['FPO DPR Formulation', 'e-NAM Trading', 'Post-Harvest Loss Prevention'],
    creditsAllocated: 4,
    status: 'in-progress'
  }
];

export const mockCareerJobs: JobOpportunity[] = [
  {
    id: 'job_coop_01',
    title: 'PACS Secretary & Multi-Service Business Manager',
    company: 'District Cooperative Central Union (Kolar / Bengaluru Rural)',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&auto=format&fit=crop&q=80',
    location: 'Karnataka (Multiple Districts) • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹32,000 - ₹45,000 / month + Performance Incentives',
    skillMatchPercentage: 94,
    matchedSkills: ['PACS Computerization & ERP', 'Cooperative Accounting & Audit', 'Model Bye-Laws', 'Gram Sabha Public Communication'],
    missingSkills: ['WDRA Warehouse E-Receipt Trading'],
    applyDeadline: 'Sept 25, 2026',
    description: 'Lead the modernization of a Tier-1 Primary Agricultural Credit Society. Manage the national ERP bookkeeping, disburse seasonal KCC loans, operate the CSC citizen service counter, and manage fertiliser distribution.'
  },
  {
    id: 'job_coop_02',
    title: 'Dairy Cooperative Plant Supervisor & Milk Procurement Head',
    company: 'Karnataka Milk Federation (KMF - Nandini / Amul Network)',
    logo: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=80&auto=format&fit=crop&q=80',
    location: 'Mandya & Mysuru Dairy Union (On-site)',
    type: 'Full-time',
    stipendOrSalary: '₹38,000 - ₹52,000 / month',
    skillMatchPercentage: 88,
    matchedSkills: ['Dairy Cold-Chain Management', 'AMCU Automation', 'Milk Quality & Hygiene'],
    missingSkills: ['Automated CIP Cleaning Protocols', 'Somatic Cell Count Quality Testing'],
    applyDeadline: 'Oct 10, 2026',
    description: 'Oversee milk collection centers across 28 village dairy societies, ensure Bulk Milk Cooler (BMC) uptime at 4°C, conduct daily Gerber fat testing, and disburse producer bonus payments.'
  },
  {
    id: 'job_coop_03',
    title: 'Rural Credit Appraisal Officer & Banking Correspondent Lead',
    company: 'Apex State Cooperative Bank (Apex Bank)',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80&auto=format&fit=crop&q=80',
    location: 'Bengaluru / Hassan • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹42,000 - ₹60,000 / month',
    skillMatchPercentage: 91,
    matchedSkills: ['Microfinance & SHG Banking', 'KCC Subvention Calculation', 'Cyber Hygiene & AePS Payments'],
    missingSkills: ['Mortgage Title Deed Search'],
    applyDeadline: 'Oct 05, 2026',
    description: 'Evaluate agricultural credit proposals, monitor Joint Liability Group (JLG) repayment cycles, audit rural branch cash books, and facilitate PMFBY crop insurance claims.'
  },
  {
    id: 'job_coop_04',
    title: 'FPO Marketing & Value Chain Coordinator',
    company: 'National Agricultural Cooperative Marketing Federation (NAFED Cluster)',
    logo: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=80&auto=format&fit=crop&q=80',
    location: 'Pan-India (Regional Hubs) • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹35,000 - ₹48,000 / month',
    skillMatchPercentage: 82,
    matchedSkills: ['Agricultural Marketing & e-NAM', 'Rural Entrepreneurship & SHG Models'],
    missingSkills: ['FPO DPR Formulation', 'Export Quality Certification'],
    applyDeadline: 'Oct 15, 2026',
    description: 'Drive market linkage for Farmer Producer Organisations, onboard collective farm harvest onto e-NAM and ONDC, negotiate bulk input supplies with IFFCO and KRIBHCO.'
  }
];

export const mockLearningGaps: LearningGapDiagnostic[] = [
  {
    id: 'gap_ncct_01',
    subject: 'COOP-102: Cooperative Accounting & Audit',
    batch: 'HDCM Batch 2025-2026',
    topic: 'PACS Double-Entry Reconciliation & Trial Balance Discrepancies',
    difficultyRating: 'High',
    strugglingStudentsCount: 14,
    totalStudents: 44,
    failureRatePercentage: 31.8,
    recommendedRemedialAction: 'AI generated 12-minute interactive simulation on balancing day-book cash entries with DCCB core banking ledger.',
    suggestedResources: [
      'Interactive PACS Day-Book Ledger Simulator',
      '5-Question Practice Diagnostic Drill on Cash-in-Safe',
      'VAMNICOM Explainer Video on Statutory Reserve 25% Allocation'
    ],
    status: 'flagged',
    strugglingStudentList: [
      { id: 'ncct_std_09', name: 'Suresh Gowda', score: 48, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
      { id: 'ncct_std_14', name: 'Manjula Devi', score: 54, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gap_ncct_02',
    subject: 'DAIRY-402: Milk Quality Testing & Cold Chain',
    batch: 'HDCM Batch 2025-2026',
    topic: 'Somatic Cell Count & Cold-Chain Bacterial Latency',
    difficultyRating: 'Medium',
    strugglingStudentsCount: 18,
    totalStudents: 44,
    failureRatePercentage: 40.9,
    recommendedRemedialAction: 'Micro-lesson on California Mastitis Test (CMT) scoring and Bulk Milk Cooler (BMC) temperature logging.',
    suggestedResources: [
      'BMC Temperature Log & Rapid Chilling Interactive Model',
      'Milk Adulteration Reagent Testing Chart (Urea & Starch)'
    ],
    status: 'remedial-assigned',
    strugglingStudentList: [
      { id: 'ncct_std_09', name: 'Suresh Gowda', score: 52, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gap_ncct_03',
    subject: 'FIN-203: Credit Management & Recovery',
    batch: 'HDCM Batch 2025-2026',
    topic: 'Kisan Credit Card (KCC) Scale of Finance & PRI Interest Rebate',
    difficultyRating: 'Medium',
    strugglingStudentsCount: 11,
    totalStudents: 44,
    failureRatePercentage: 25.0,
    recommendedRemedialAction: 'EdScroll Reel #3 interactive practice calculation for 2% subvention + 3% prompt repayment incentive.',
    suggestedResources: [
      'KCC Loan Calculator Widget (DLTC Scale of Finance)',
      'NABARD Scheme Handbook 2026'
    ],
    status: 'flagged',
    strugglingStudentList: []
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'nt_01',
    title: 'Live Lab Session: Cooperative Management & Bye-Laws',
    message: 'Morning lecture with Dr. Meenakshi Sundaram is now live in Hall 1. Mark your attendance using Facial Biometric Scanner or QR Check-in.',
    timestamp: '5 mins ago',
    type: 'academic',
    isRead: false,
    priority: 'urgent',
    actionUrl: '/student/attendance'
  },
  {
    id: 'nt_02',
    title: 'High Skill Match: PACS Secretary Opening',
    message: 'Kolar District Cooperative Union posted "PACS Secretary & Business Manager" with a 94% match to your Skill Passport credentials.',
    timestamp: '2 hours ago',
    type: 'career',
    isRead: false,
    priority: 'high',
    actionUrl: '/student/jobs'
  },
  {
    id: 'nt_03',
    title: 'AI Diagnostic Notice: Remedial Module Available',
    message: 'Review your quiz feedback on "Somatic Cell Count in Dairy Milk". Complete the 8-minute micro-module to restore mastery.',
    timestamp: '1 day ago',
    type: 'ai-alert',
    isRead: true,
    priority: 'normal',
    actionUrl: '/student/my-learning'
  },
  {
    id: 'nt_04',
    title: 'Hostel Room & Mess Schedule Update',
    message: 'Your hostel room (Block B - Room 204) allotment for the VAMNICOM executive training session is confirmed.',
    timestamp: '2 days ago',
    type: 'system',
    isRead: true,
    priority: 'normal',
    actionUrl: '/student/hostel'
  }
];

export const mockBatches: BatchInfo[] = [
  {
    id: 'batch_hdcm_2026',
    name: 'HDCM Batch 2025-2026 (Semester 2)',
    code: 'NCCT-HDCM-2025-A',
    department: 'Cooperative Governance & Rural Banking',
    semester: 2,
    totalStudents: 44,
    averageAttendance: 94.2,
    averageGpa: 8.64,
    healthStatus: 'Excellent',
    representative: 'Rajesh Kumar Patel',
    nextSessionTime: 'Today, 09:00 AM (Cooperative Management)'
  },
  {
    id: 'batch_pacs_exec',
    name: 'PACS Secretaries Executive Upskilling (Batch 12)',
    code: 'NCCT-PACS-EXEC-12',
    department: 'National PACS Computerization Mission',
    semester: 1,
    totalStudents: 52,
    averageAttendance: 91.5,
    averageGpa: 8.42,
    healthStatus: 'Good',
    representative: 'Suresh Gowda',
    nextSessionTime: 'Tomorrow, 10:00 AM (PACS National ERP Lab)'
  },
  {
    id: 'batch_dairy_coop',
    name: 'Dairy Cooperative Supervisors Certification',
    code: 'NCCT-NDDB-DAIRY-04',
    department: 'Dairy Cooperative Management Studies',
    semester: 1,
    totalStudents: 38,
    averageAttendance: 88.0,
    averageGpa: 7.95,
    healthStatus: 'Good',
    representative: 'Anand Shinde',
    nextSessionTime: 'Wednesday, 09:30 AM (Cold Chain Logistics)'
  }
];

export const mockTeacherStudents: StudentRecord[] = [
  {
    id: 'ncct_trainee_2026_84',
    name: 'Rajesh Kumar Patel',
    rollNumber: 'RICM-2026-HDCM-042',
    email: 'rajesh.patel@ncct.gov.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    batch: 'HDCM Batch 2025-2026',
    attendancePercentage: 96.8,
    cgpa: 8.92,
    aiRiskLevel: 'Low',
    riskFactors: [],
    lastActive: '10 mins ago',
    completedAssignments: 18,
    totalAssignments: 18
  },
  {
    id: 'ncct_std_09',
    name: 'Suresh Gowda',
    rollNumber: 'RICM-2026-HDCM-019',
    email: 'suresh.g@ncct.gov.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    batch: 'HDCM Batch 2025-2026',
    attendancePercentage: 73.4,
    cgpa: 6.84,
    aiRiskLevel: 'High',
    riskFactors: ['Attendance below 75%', 'Failed Quiz on PACS Double-Entry', 'Late Field Attachment Report'],
    lastActive: '3 days ago',
    completedAssignments: 12,
    totalAssignments: 18
  },
  {
    id: 'ncct_std_14',
    name: 'Manjula Devi',
    rollNumber: 'RICM-2026-HDCM-027',
    email: 'manjula.d@ncct.gov.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    batch: 'HDCM Batch 2025-2026',
    attendancePercentage: 88.5,
    cgpa: 7.92,
    aiRiskLevel: 'Moderate',
    riskFactors: ['Needs practice on Dairy Somatic Cell Count testing'],
    lastActive: '2 hours ago',
    completedAssignments: 16,
    totalAssignments: 18
  }
];

export const mockTeacherAssessments: AssessmentItem[] = [
  {
    id: 'asm_01',
    title: 'Mid-Term Exam: PACS Governance & National ERP Compliance',
    batch: 'HDCM Batch 2025-2026',
    subject: 'COOP-101 Cooperative Management',
    dueDate: 'Sept 14, 2026',
    durationMinutes: 90,
    totalMarks: 100,
    submissionsCount: 42,
    totalStudents: 44,
    averageScorePercentage: 84.6,
    status: 'grading'
  },
  {
    id: 'asm_02',
    title: 'Practical Lab: Gerber Milk Fat Testing & Lactometer SNF Calculation',
    batch: 'HDCM Batch 2025-2026',
    subject: 'DAIRY-402 Milk Quality Testing',
    dueDate: 'Sept 20, 2026',
    durationMinutes: 60,
    totalMarks: 50,
    submissionsCount: 0,
    totalStudents: 44,
    averageScorePercentage: 0,
    status: 'scheduled'
  },
  {
    id: 'asm_03',
    title: 'Diagnostic Test: KCC Scale of Finance & Prompt Repayment Rebate',
    batch: 'PACS Secretaries Executive Program',
    subject: 'FIN-203 Credit Management',
    dueDate: 'Aug 28, 2026',
    durationMinutes: 45,
    totalMarks: 40,
    submissionsCount: 52,
    totalStudents: 52,
    averageScorePercentage: 88.2,
    status: 'completed'
  }
];
