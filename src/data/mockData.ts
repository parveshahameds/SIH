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
  id: 'std_1092',
  name: 'Ananya Sharma',
  email: 'ananya.s@colearn.edu.in',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  institution: 'National Institute of Technology',
  department: 'Computer Science & Engineering',
  rollNumber: '21CS8042',
  semester: 6,
  batch: 'CSE-A (2022-2026)',
  cgpa: 8.94,
  attendanceRate: 91.8,
  streakDays: 14,
  xpPoints: 3450,
  level: 7,
  targetRole: 'AI/ML Research Engineer',
  skills: [
    { name: 'Python & PyTorch', level: 92, verified: true, category: 'technical' },
    { name: 'Full-Stack React/TS', level: 85, verified: true, category: 'technical' },
    { name: 'Data Structures & Algorithms', level: 88, verified: true, category: 'technical' },
    { name: 'System Design', level: 74, verified: false, category: 'technical' },
    { name: 'Collaborative Problem Solving', level: 95, verified: true, category: 'soft' },
    { name: 'Technical Presentation', level: 82, verified: true, category: 'soft' },
    { name: 'Natural Language Processing', level: 79, verified: true, category: 'domain' },
  ],
  nepCredits: {
    earned: 114,
    required: 160,
    major: 68,
    minor: 22,
    skillEnhancement: 16,
    internship: 8,
  }
};

export const mockTeacherUser: TeacherProfile = {
  id: 'tch_4011',
  name: 'Dr. Rajesh Verma',
  email: 'r.verma@colearn.edu.in',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  institution: 'National Institute of Technology',
  department: 'Department of AI & Data Systems',
  employeeId: 'EMP-FAC-2018-09',
  designation: 'Associate Professor & Lead AI Mentor',
  batches: ['CSE-A (Sem 6)', 'AI-ML Specialization (Year 3)', 'ECE-Data Structures (Sem 4)'],
  subjects: ['Deep Learning & Neural Networks', 'Advanced Algorithms', 'Distributed Database Systems'],
  totalStudents: 194,
  rating: 4.88,
  pendingReviewsCount: 12
};

export const mockStudentCourses: Course[] = [
  {
    id: 'crs_dl_01',
    title: 'Deep Learning & Transformer Architectures',
    code: 'CS602',
    instructor: 'Dr. Rajesh Verma',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    category: 'Artificial Intelligence',
    progressPercentage: 68,
    totalModules: 12,
    completedModules: 8,
    totalHours: 36,
    credits: 4,
    nextLessonTitle: 'Self-Attention Mechanism & Multi-Head Attention',
    nextLessonDuration: '24 mins',
    status: 'in-progress',
    description: 'Comprehensive study of modern deep learning, focusing on attention models, transformers, and multimodal vision architectures.',
    tags: ['PyTorch', 'Transformers', 'LLMs', 'Vision'],
    learningOutcomes: [
      'Implement multi-head self-attention from scratch in PyTorch',
      'Fine-tune pre-trained LLMs using LoRA and parameter-efficient techniques',
      'Deploy inference models with low-latency GPU pipelines'
    ]
  },
  {
    id: 'crs_sys_02',
    title: 'Distributed Systems & Cloud Scale Architecture',
    code: 'CS604',
    instructor: 'Prof. Sunita Pillai',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    category: 'Cloud Engineering',
    progressPercentage: 45,
    totalModules: 10,
    completedModules: 4,
    totalHours: 30,
    credits: 3,
    nextLessonTitle: 'Consensus Protocols: Raft vs Paxos Deep Dive',
    nextLessonDuration: '32 mins',
    status: 'in-progress',
    description: 'Learn foundational concepts behind cloud infrastructure, event-driven microservices, fault tolerance, and replication.',
    tags: ['Kafka', 'Docker', 'Consensus', 'Kubernetes'],
    learningOutcomes: [
      'Design fault-tolerant distributed storage systems',
      'Implement leader election and replication logs',
      'Optimize horizontal scalability and rate limiting'
    ]
  },
  {
    id: 'crs_algo_03',
    title: 'Advanced Graph Algorithms & Dynamic Programming',
    code: 'CS601',
    instructor: 'Dr. Rajesh Verma',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    category: 'Computer Science Core',
    progressPercentage: 88,
    totalModules: 14,
    completedModules: 12,
    totalHours: 42,
    credits: 4,
    nextLessonTitle: 'Max-Flow Min-Cut: Dinic Algorithm & Matching',
    nextLessonDuration: '18 mins',
    status: 'in-progress',
    description: 'Master advanced algorithmic paradigms required for high-frequency trading, routing networks, and tier-1 tech interviews.',
    tags: ['Graphs', 'DP', 'Hard Optimization', 'Competitive'],
    learningOutcomes: [
      'Solve NP-hard reductions and network flow formulations',
      'Analyze amortized complexity of disjoint-set and advanced heaps'
    ]
  },
  {
    id: 'crs_full_04',
    title: 'Production React, Next.js & TypeScript Architecture',
    code: 'SE302',
    instructor: 'Er. Kevin Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    category: 'Software Engineering',
    progressPercentage: 100,
    totalModules: 8,
    completedModules: 8,
    totalHours: 24,
    credits: 2,
    nextLessonTitle: 'Course Completed! View Certificate',
    nextLessonDuration: '0 min',
    status: 'completed',
    description: 'End-to-end modern web application development with design systems, state management, and edge deployments.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    learningOutcomes: [
      'Architect maintainable component libraries and custom hooks',
      'Build zero-downtime server-rendered web applications'
    ]
  }
];

// Sequential EdScroll items with order 1-6 and checkpoint requirements
export const mockEdScrollFeed: EdScrollItem[] = [
  {
    id: 'ed_01',
    order: 1,
    creatorName: 'AI Research Lab @ CoLearn',
    creatorRole: 'Automated Micro-Tutor',
    creatorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    title: '1. Why Self-Attention scales as O(N²)',
    description: 'In vanilla Transformer attention, every token computes dot-products with all other tokens. Multiplying Q by K^T yields an N x N matrix. As sequence length N doubles from 2k to 4k tokens, memory footprint quadruples!',
    tag: '#DeepLearning',
    category: 'AI/ML',
    readTime: '45s Reel',
    likesCount: 1420,
    sharesCount: 382,
    isLiked: true,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'FlashAttention optimizes GPU memory I/O without materializing the full N x N matrix in HBM.',
    codeSnippet: `// Standard Scaled Dot-Product Attention:
attention_scores = (Q @ K.T) / math.sqrt(d_k)
attention_weights = softmax(attention_scores, dim=-1)
output = attention_weights @ V // O(N^2) memory!`,
    interactiveQuiz: {
      question: 'If a sequence has 4,000 tokens, what is the size of the attention score matrix?',
      options: ['4,000 elements', '16 Million elements', '8,000 elements', '64,000 elements'],
      correctIndex: 1,
      explanation: 'N x N = 4,000 x 4,000 = 16,000,000 matrix elements!'
    }
  },
  {
    id: 'ed_02',
    order: 2,
    creatorName: 'Dr. Rajesh Verma',
    creatorRole: 'Professor of Computer Science',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    title: '2. The Secret Behind Raft Consensus',
    description: 'Distributed systems cannot trust a single clock. Raft decomposes consensus into Leader Election, Log Replication, and Safety invariants. The elected leader handles all client writes and broadcasts heartbeats.',
    tag: '#SystemDesign',
    category: 'System Design',
    readTime: '60s Reel',
    likesCount: 980,
    sharesCount: 215,
    isLiked: false,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'A Raft cluster of 2F + 1 nodes tolerates F simultaneous node crashes without losing writes.',
    codeSnippet: `// Raft Heartbeat check:
if (currentTerm > lastKnownTerm) {
  role = Follower;
  acknowledgedLeader = leaderId;
}`,
    interactiveQuiz: {
      question: 'How many node failures can a 5-node Raft cluster tolerate while remaining operational?',
      options: ['1 node', '2 nodes', '3 nodes', '4 nodes'],
      correctIndex: 1,
      explanation: 'With 2F + 1 = 5, F = 2. A majority of 3 nodes is required for quorum.'
    }
  },
  {
    id: 'ed_03',
    order: 3,
    creatorName: 'Career Foundry AI',
    creatorRole: 'Talent Acceleration Lead',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    title: '3. STAR Method for Tech Behavioral Rounds',
    description: 'Structure behavioral answers into Situation (20%), Task (10%), Action (50%), and Result (20% with quantitative metrics). Always highlight your specific execution decisions.',
    tag: '#InterviewHacks',
    category: 'Career Hacks',
    readTime: '30s Reel',
    likesCount: 2310,
    sharesCount: 654,
    isLiked: true,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'Focus 50% of your time explaining the technical actions YOU personally took.',
    interactiveQuiz: {
      question: 'Which component of the STAR method should consume the majority of your speaking time?',
      options: ['Situation', 'Task', 'Action', 'Result'],
      correctIndex: 2,
      explanation: 'The Action section showcases your technical decision-making directly!'
    }
  },
  {
    id: 'ed_04',
    order: 4,
    creatorName: 'Elena Rostova',
    creatorRole: 'Web3 Core Contributor',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    title: '4. Zero Knowledge Proofs in 45 Seconds',
    description: 'Proving you possess a secret without leaking the secret. ZK-SNARKs enable complex computations to be executed off-chain while producing tiny, easily verified proofs on-chain.',
    tag: '#Web3',
    category: 'Web3',
    readTime: '45s Reel',
    likesCount: 1890,
    sharesCount: 440,
    isCompleted: true,
    isLocked: false,
    keyTakeaway: 'ZK proofs guarantee privacy while maintaining complete mathematical verifiability.',
    interactiveQuiz: {
      question: 'What does the "Z" in ZK-SNARK stand for?',
      options: ['Zero Knowledge', 'Zone Kernel', 'Zip Knapsack', 'Zepto Kinetic'],
      correctIndex: 0,
      explanation: 'Zero Knowledge ensures no private data is revealed to the verifier.'
    }
  },
  {
    id: 'ed_05',
    order: 5,
    creatorName: 'Dr. Rajesh Verma',
    creatorRole: 'Professor of Computer Science',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    title: '5. Residual Connections & Gradient Vanishing',
    description: 'Why can modern ResNets train with 152 layers while plain networks die at 20 layers? The skip connection F(x) + x provides a direct identity gradient highway where d(x)/dx = 1, completely preventing gradient vanishing!',
    tag: '#DeepLearning',
    category: 'AI/ML',
    readTime: '55s Reel',
    likesCount: 3104,
    sharesCount: 780,
    isCompleted: false,
    isLocked: false,
    checkpointRequired: true,
    keyTakeaway: 'Identity shortcut gradients d(F(x)+x)/dx = dF/dx + 1 ensure the signal never shrinks to 0.',
    codeSnippet: `class ResBlock(nn.Module):
    def forward(self, x):
        return F.relu(self.conv2(self.conv1(x)) + x) // +x identity highway`,
    interactiveQuiz: {
      question: 'What is the derivative of the identity addition term x with respect to x?',
      options: ['0', '1', 'x', 'W'],
      correctIndex: 1,
      explanation: 'dx/dx = 1, ensuring a non-zero gradient term always flows backwards!'
    }
  },
  {
    id: 'ed_06',
    order: 6,
    creatorName: 'Algorithmic Systems Lab',
    creatorRole: 'Lead Architect',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    title: '6. Dinic Max-Flow Algorithm in Level Graphs',
    description: 'Ford-Fulkerson can be slow with bad augmenting paths. Dinic constructs a Level Graph using BFS in O(E), then finds blocking flows using DFS in O(VE), achieving an optimal total bound of O(V²E)!',
    tag: '#Algorithms',
    category: 'Algorithms',
    readTime: '50s Reel',
    likesCount: 1220,
    sharesCount: 198,
    isCompleted: false,
    isLocked: true,
    keyTakeaway: 'Level graphs prevent cycles and guarantee monotonic path length expansion.',
    codeSnippet: `// Dinic BFS Layer construction
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (Edge& e : adj[u]) {
    if (e.capacity > e.flow && level[e.v] == -1) {
      level[e.v] = level[u] + 1;
      q.push(e.v);
    }
  }
}`,
    interactiveQuiz: {
      question: 'Which graph traversal is used by Dinic algorithm to construct the level graph?',
      options: ['DFS', 'BFS', 'Dijkstra', 'Topological Sort'],
      correctIndex: 1,
      explanation: 'Breadth-First Search (BFS) is used to calculate shortest distance levels from source.'
    }
  }
];

export const mockQuizCheckpoint: QuizCheckpoint = {
  id: 'checkpoint_01',
  title: 'Section 1 Checkpoint: Core AI & Systems Competency',
  requiredAfterLessonOrder: 5,
  unlocked: true,
  passed: false,
  questions: [
    {
      id: 'cp_q1',
      question: 'Why does FlashAttention drastically accelerate Transformer training?',
      options: [
        'It reduces the theoretical O(N^2) complexity to O(N)',
        'It tiles the Softmax computation to maximize GPU SRAM usage and minimize High-Bandwidth Memory I/O',
        'It skips attention computation for every odd token',
        'It compresses float32 weights into int4 quantization'
      ],
      correctIndex: 1,
      explanation: 'FlashAttention is an exact attention algorithm that restructures operations using GPU SRAM tiling without materializing the N x N attention matrix.'
    },
    {
      id: 'cp_q2',
      question: 'In a 7-node Raft cluster, what is the minimum quorum required to commit a log entry?',
      options: ['3 nodes', '4 nodes', '5 nodes', '7 nodes'],
      correctIndex: 1,
      explanation: 'Quorum is floor(N / 2) + 1 = floor(7 / 2) + 1 = 4 nodes.'
    },
    {
      id: 'cp_q3',
      question: 'How do residual skip connections resolve the vanishing gradient problem?',
      options: [
        'They double the learning rate at deeper layers',
        'They add an identity shortcut term x whose derivative is 1, preserving backpropagated gradient magnitude',
        'They replace all non-linear activation functions with Linear transforms',
        'They eliminate negative weight matrices'
      ],
      correctIndex: 1,
      explanation: 'The derivative d(F(x) + x)/dx = dF/dx + 1. The constant +1 guarantees gradient flow even when dF/dx approaches 0.'
    }
  ]
};

export const mockSmartAttendanceSession: SmartAttendanceSession = {
  code: '849 201',
  subject: 'CS602: Deep Learning & Neural Networks',
  batch: 'CSE-A (Semester 6)',
  classroom: 'Lab 402 (NVIDIA AI Center)',
  expiresInSeconds: 300,
  isActive: true,
  securityRequirements: {
    gpsGeofence: true,
    campusWifi: true,
    faceScanBiometrics: true
  },
  verifiedCount: 42,
  totalEnrolled: 64
};

export const mockGDRooms: GDRoom[] = [
  {
    id: 'gd_01',
    topic: 'Is AGI Feasible with Current Transformer & LLM Scaling Laws?',
    category: 'Artificial Intelligence',
    description: 'Analyze whether brute-force compute scaling, synthetic data, and reasoning RL are sufficient to reach artificial general intelligence.',
    status: 'in-progress',
    timeRemainingSeconds: 480,
    participants: [
      {
        id: 'p_ananya',
        name: 'Ananya Sharma (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        role: 'student',
        isSpeaking: false,
        speakingTimeSeconds: 45,
        contributionScore: 88
      },
      {
        id: 'p_rohan',
        name: 'Rohan Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        role: 'ai-peer',
        isSpeaking: true,
        speakingTimeSeconds: 62,
        contributionScore: 84
      },
      {
        id: 'p_aisha',
        name: 'Aisha Khan',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        role: 'ai-peer',
        isSpeaking: false,
        speakingTimeSeconds: 38,
        contributionScore: 79
      },
      {
        id: 'p_mod',
        name: 'CoLearn AI Moderator',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        role: 'moderator',
        isSpeaking: false,
        speakingTimeSeconds: 20,
        contributionScore: 99
      }
    ],
    messages: [
      {
        id: 'm1',
        participantId: 'p_mod',
        participantName: 'CoLearn AI Moderator',
        text: 'Welcome to GD Room #104. Each participant has up to 90 seconds per speech block. Rohan Deshmukh currently has the floor.',
        timestamp: '14:02',
        type: 'ai-prompt'
      },
      {
        id: 'm2',
        participantId: 'p_rohan',
        participantName: 'Rohan Deshmukh',
        text: 'I argue that scaling compute and parameter count is hitting a data wall. Synthetic data introduces mode collapse unless grounded in verifiable search environments like test-time compute in OpenAI o1.',
        timestamp: '14:03',
        type: 'speech',
        sentiment: 'constructive'
      }
    ],
    moderatorScore: {
      articulation: 86,
      factualBacking: 90,
      collaborativeListening: 84,
      overallGrade: 'A+'
    }
  },
  {
    id: 'gd_02',
    topic: 'Centralized vs Decentralized Cloud: Where will 2030 Compute Reside?',
    category: 'Cloud & Web3',
    description: 'Explore the trade-offs between hyperscalers (AWS, Azure) and decentralized GPU clusters for edge inference.',
    status: 'waiting',
    timeRemainingSeconds: 900,
    participants: [],
    messages: []
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq_01',
    question: 'How does Multi-Head Attention allow a model to jointly attend to information from different representation subspaces?',
    category: 'Deep Learning Core',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'Multiple projection heads linearly map Query, Key, and Value into distinct d_k dimensional subspaces, enabling parallel focus on syntax, semantics, and distance.',
    rubric: {
      technicalAccuracy: 95,
      communicationClarity: 90,
      problemSolvingStructure: 92
    }
  },
  {
    id: 'iq_02',
    question: 'Describe how you would debug a CUDA Out of Memory (OOM) error occurring during PyTorch distributed training.',
    category: 'ML Engineering & Systems',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'Check batch size, enable activation checkpointing (gradient checkpointing), apply mixed precision (torch.cuda.amp), and profile using torch.cuda.memory_summary().',
    rubric: {
      technicalAccuracy: 92,
      communicationClarity: 88,
      problemSolvingStructure: 94
    }
  },
  {
    id: 'iq_03',
    question: 'Explain the difference between Strong Consistency and Eventual Consistency in distributed databases using PACELC theorem.',
    category: 'Distributed Systems',
    targetDurationSeconds: 90,
    sampleAnswerSummary: 'PACELC states that in a partitioned system one chooses between Availability and Consistency, else between Latency and Consistency.',
    rubric: {
      technicalAccuracy: 90,
      communicationClarity: 86,
      problemSolvingStructure: 90
    }
  }
];

export const mockTimetable: TimetableEntry[] = [
  {
    id: 'tt_01',
    subject: 'Deep Learning & Neural Networks',
    code: 'CS602',
    instructor: 'Dr. Rajesh Verma',
    classroom: 'Lab 402 (NVIDIA AI Center)',
    batch: 'CSE-A',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    type: 'Lab',
    isLiveNow: true,
    meetingLink: 'https://meet.colearn.edu.in/cs602-lab',
    attendanceMarked: false
  },
  {
    id: 'tt_02',
    subject: 'Distributed Systems',
    code: 'CS604',
    instructor: 'Prof. Sunita Pillai',
    classroom: 'LH-301',
    batch: 'CSE-A',
    day: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    type: 'Lecture',
    isLiveNow: false
  },
  {
    id: 'tt_03',
    subject: 'Advanced Graph Algorithms',
    code: 'CS601',
    instructor: 'Dr. Rajesh Verma',
    classroom: 'LH-102',
    batch: 'CSE-A',
    day: 'Monday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    type: 'Lecture',
    isLiveNow: false
  },
  {
    id: 'tt_04',
    subject: 'Career Lab: Mock Technical Interview',
    code: 'EMP102',
    instructor: 'Industry Mentor Panel',
    classroom: 'Virtual Studio 2',
    batch: 'CSE-A',
    day: 'Tuesday',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    type: 'Seminar',
    isLiveNow: false
  },
  {
    id: 'tt_05',
    subject: 'Software Engineering & Cloud Deployments',
    code: 'SE302',
    instructor: 'Er. Kevin Vance',
    classroom: 'Computing Lab 3',
    batch: 'CSE-A',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    type: 'Lab',
    isLiveNow: false
  },
  {
    id: 'tt_06',
    subject: 'AI Mini-Project Mentorship Review',
    code: 'PRJ601',
    instructor: 'Dr. Rajesh Verma',
    classroom: 'Conference Hall A',
    batch: 'CSE-A',
    day: 'Friday',
    startTime: '03:00 PM',
    endTime: '05:00 PM',
    type: 'Assessment',
    isLiveNow: false
  }
];

export const mockAttendanceRecords: AttendanceSubject[] = [
  {
    subjectCode: 'CS602',
    subjectName: 'Deep Learning & Neural Networks',
    facultyName: 'Dr. Rajesh Verma',
    totalClasses: 28,
    attendedClasses: 27,
    percentage: 96.4,
    status: 'safe',
    lastClassDate: 'Today, 09:00 AM'
  },
  {
    subjectCode: 'CS604',
    subjectName: 'Distributed Systems Architecture',
    facultyName: 'Prof. Sunita Pillai',
    totalClasses: 24,
    attendedClasses: 22,
    percentage: 91.6,
    status: 'safe',
    lastClassDate: 'Yesterday, 11:00 AM'
  },
  {
    subjectCode: 'CS601',
    subjectName: 'Advanced Graph Algorithms',
    facultyName: 'Dr. Rajesh Verma',
    totalClasses: 26,
    attendedClasses: 24,
    percentage: 92.3,
    status: 'safe',
    lastClassDate: '28 Aug 2026'
  },
  {
    subjectCode: 'SE302',
    subjectName: 'Production Web Engineering',
    facultyName: 'Er. Kevin Vance',
    totalClasses: 20,
    attendedClasses: 17,
    percentage: 85.0,
    status: 'safe',
    lastClassDate: '26 Aug 2026'
  },
  {
    subjectCode: 'ENV201',
    subjectName: 'Environmental Studies & Sustainability',
    facultyName: 'Dr. Meenakshi Sundaram',
    totalClasses: 18,
    attendedClasses: 13,
    percentage: 72.2,
    status: 'warning',
    lastClassDate: '25 Aug 2026'
  }
];

export const mockSkillPassportData: SkillCredential[] = [
  {
    id: 'cred_01',
    title: 'Certified PyTorch Deep Learning Specialist',
    issuer: 'CoLearn x National AI Mission',
    issueDate: 'August 14, 2026',
    verificationHash: '0x8f7d...4a12ec9',
    badgeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    score: 94,
    skills: ['PyTorch', 'CNNs', 'Transfer Learning', 'Backpropagation Calculus'],
    creditsAllocated: 3,
    status: 'verified'
  },
  {
    id: 'cred_02',
    title: 'Advanced Graph Algorithms & Data Structures',
    issuer: 'NIT Academic Council & CoLearn',
    issueDate: 'July 28, 2026',
    verificationHash: '0x3c2a...9b48e11',
    badgeUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&auto=format&fit=crop&q=80',
    score: 89,
    skills: ['Dynamic Programming', 'Flow Networks', 'Bipartite Matching', 'NP Reductions'],
    creditsAllocated: 4,
    status: 'verified'
  },
  {
    id: 'cred_03',
    title: 'Enterprise React & TypeScript Architect',
    issuer: 'Frontend Guild Verified',
    issueDate: 'June 10, 2026',
    verificationHash: '0x11a9...7f53cb2',
    badgeUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80',
    score: 96,
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'State Management'],
    creditsAllocated: 2,
    status: 'verified'
  },
  {
    id: 'cred_04',
    title: 'Distributed Systems & Cloud Fault Tolerance',
    issuer: 'CoLearn Cloud Consortium',
    issueDate: 'In Progress (Target: Oct 2026)',
    verificationHash: '0xPENDING_AUDIT',
    badgeUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&auto=format&fit=crop&q=80',
    score: 76,
    skills: ['Raft Protocol', 'Kafka Streaming', 'Sharding Strategies'],
    creditsAllocated: 3,
    status: 'in-progress'
  }
];

export const mockCareerJobs: JobOpportunity[] = [
  {
    id: 'job_01',
    title: 'AI/ML Engineering Intern (Foundational Models)',
    company: 'NeuralScale Technologies',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India (Hybrid)',
    type: 'Internship',
    stipendOrSalary: '₹60,000 - ₹85,000 / month',
    skillMatchPercentage: 94,
    matchedSkills: ['PyTorch', 'Transformers', 'Python', 'Attention Models'],
    missingSkills: ['Triton GPU Kernels'],
    applyDeadline: 'Sept 15, 2026',
    description: 'Work with our foundational AI team fine-tuning multi-modal diffusion and large language models on distributed GPU clusters.'
  },
  {
    id: 'job_02',
    title: 'Graduate Software Engineer (High Performance Systems)',
    company: 'OptiRoute Systems',
    logo: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=80&auto=format&fit=crop&q=80',
    location: 'Hyderabad, India (On-site)',
    type: 'Full-time',
    stipendOrSalary: '₹18,00,000 - ₹24,00,000 / annum',
    skillMatchPercentage: 88,
    matchedSkills: ['Algorithms', 'Data Structures', 'System Design', 'C++ / Rust'],
    missingSkills: ['Low-latency IPC'],
    applyDeadline: 'Sept 30, 2026',
    description: 'Develop next-generation routing pipelines handling millions of concurrent geospatial queries with sub-millisecond latencies.'
  },
  {
    id: 'job_03',
    title: 'Full-Stack Product Engineering Intern',
    company: 'Credence Fintech',
    logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&auto=format&fit=crop&q=80',
    location: 'Remote (Pan-India)',
    type: 'Internship',
    stipendOrSalary: '₹45,000 - ₹60,000 / month',
    skillMatchPercentage: 92,
    matchedSkills: ['React', 'TypeScript', 'Tailwind', 'REST APIs'],
    missingSkills: ['GraphQL Federation'],
    applyDeadline: 'Oct 05, 2026',
    description: 'Build responsive financial dashboard micro-frontends with high test coverage and real-time transaction streams.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'nt_01',
    title: 'Live Lab Session Starting Now',
    message: 'Deep Learning & Neural Networks lab session with Dr. Rajesh Verma is now open in NVIDIA AI Center. Check in with code 849 201.',
    timestamp: '5 mins ago',
    type: 'academic',
    isRead: false,
    priority: 'urgent',
    actionUrl: '/student/attendance'
  },
  {
    id: 'nt_02',
    title: 'AI Diagnostic Alert: Attention Needed in ENV201',
    message: 'Your attendance in Environmental Studies is at 72.2% (below the 75% threshold). 2 upcoming sessions required to restore safe standing.',
    timestamp: '2 hours ago',
    type: 'ai-alert',
    isRead: false,
    priority: 'high',
    actionUrl: '/student/attendance'
  },
  {
    id: 'nt_03',
    title: 'New High Skill-Match Opportunity',
    message: 'NeuralScale Technologies posted "AI/ML Engineering Intern" with a 94% match to your Skill Passport.',
    timestamp: '1 day ago',
    type: 'career',
    isRead: true,
    priority: 'normal',
    actionUrl: '/student/career-lab'
  },
  {
    id: 'nt_04',
    title: 'Group Discussion Invitation: AGI Feasibility',
    message: 'You have been matched into GD Room #104. Topic: "Is AGI Feasible with Transformer Scaling?"',
    timestamp: '1 hour ago',
    type: 'academic',
    isRead: false,
    priority: 'high',
    actionUrl: '/student/gd'
  }
];

export const mockBatches: BatchInfo[] = [
  {
    id: 'batch_cse_a',
    name: 'CSE-A (Semester 6)',
    code: 'BTECH-CSE-2022-A',
    department: 'Computer Science & Engineering',
    semester: 6,
    totalStudents: 64,
    averageAttendance: 91.2,
    averageGpa: 8.42,
    healthStatus: 'Excellent',
    representative: 'Ananya Sharma',
    nextSessionTime: 'Today, 02:00 PM (Advanced Graph Algorithms)'
  },
  {
    id: 'batch_ai_ml',
    name: 'AI-ML Honors Specialization (Year 3)',
    code: 'HONORS-AIML-Y3',
    department: 'AI & Data Systems',
    semester: 6,
    totalStudents: 48,
    averageAttendance: 87.5,
    averageGpa: 8.78,
    healthStatus: 'Good',
    representative: 'Rohan Deshmukh',
    nextSessionTime: 'Tomorrow, 09:00 AM (Deep Learning Lab)'
  },
  {
    id: 'batch_ece_ds',
    name: 'ECE Data Structures & Algorithms (Sem 4)',
    code: 'BTECH-ECE-2023-B',
    department: 'Electronics & Communication',
    semester: 4,
    totalStudents: 82,
    averageAttendance: 76.8,
    averageGpa: 7.34,
    healthStatus: 'Attention Needed',
    representative: 'Priya Nambiar',
    nextSessionTime: 'Thursday, 11:00 AM (Trees & Heaps Lecture)'
  }
];

export const mockTeacherStudents: StudentRecord[] = [
  {
    id: 'std_1092',
    name: 'Ananya Sharma',
    rollNumber: '21CS8042',
    email: 'ananya.s@colearn.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    batch: 'CSE-A (Semester 6)',
    attendancePercentage: 96.4,
    cgpa: 8.94,
    aiRiskLevel: 'Low',
    riskFactors: [],
    lastActive: '10 mins ago',
    completedAssignments: 14,
    totalAssignments: 14
  },
  {
    id: 'std_1044',
    name: 'Rohan Deshmukh',
    rollNumber: '21CS8019',
    email: 'rohan.d@colearn.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    batch: 'CSE-A (Semester 6)',
    attendancePercentage: 88.2,
    cgpa: 8.12,
    aiRiskLevel: 'Low',
    riskFactors: [],
    lastActive: '1 hour ago',
    completedAssignments: 13,
    totalAssignments: 14
  },
  {
    id: 'std_1081',
    name: 'Vikramaditya Rao',
    rollNumber: '21CS8058',
    email: 'vikram.r@colearn.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    batch: 'CSE-A (Semester 6)',
    attendancePercentage: 71.4,
    cgpa: 6.82,
    aiRiskLevel: 'High',
    riskFactors: ['Attendance below 75%', 'Failed Quiz 3 (Attention Matrices)', 'Incomplete Lab 5'],
    lastActive: '3 days ago',
    completedAssignments: 8,
    totalAssignments: 14
  },
  {
    id: 'std_1052',
    name: 'Pooja Hegde',
    rollNumber: '21CS8027',
    email: 'pooja.h@colearn.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    batch: 'CSE-A (Semester 6)',
    attendancePercentage: 79.5,
    cgpa: 7.45,
    aiRiskLevel: 'Moderate',
    riskFactors: ['Struggling with Dynamic Programming concepts', '1 late assignment submission'],
    lastActive: '5 hours ago',
    completedAssignments: 12,
    totalAssignments: 14
  },
  {
    id: 'std_1067',
    name: 'Aditya Kulkarni',
    rollNumber: '21CS8035',
    email: 'aditya.k@colearn.edu.in',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    batch: 'CSE-A (Semester 6)',
    attendancePercentage: 94.0,
    cgpa: 8.65,
    aiRiskLevel: 'Low',
    riskFactors: [],
    lastActive: '25 mins ago',
    completedAssignments: 14,
    totalAssignments: 14
  }
];

export const mockLearningGaps: LearningGapDiagnostic[] = [
  {
    id: 'gap_01',
    subject: 'Deep Learning & Neural Networks',
    batch: 'CSE-A (Semester 6)',
    topic: 'Gradient Vanishing & Residual Connection Derivations',
    difficultyRating: 'High',
    strugglingStudentsCount: 26,
    totalStudents: 64,
    failureRatePercentage: 40.6,
    recommendedRemedialAction: 'AI generated 15-minute visual walkthrough on backprop pathways with interactive computational graph demo.',
    suggestedResources: [
      'Interactive Residual Flow Simulator',
      '5-Question Practice Diagnostic Drill',
      'Supplementary Video by Dr. Rajesh Verma'
    ],
    status: 'flagged',
    strugglingStudentList: [
      { id: 'std_1081', name: 'Vikramaditya Rao', score: 38, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
      { id: 'std_1052', name: 'Pooja Hegde', score: 52, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gap_02',
    subject: 'Advanced Graph Algorithms',
    batch: 'CSE-A (Semester 6)',
    topic: 'Dinic Max-Flow Algorithm Level Graph & Dead Ends',
    difficultyRating: 'High',
    strugglingStudentsCount: 31,
    totalStudents: 64,
    failureRatePercentage: 48.4,
    recommendedRemedialAction: 'Schedule a 30-min live tutorial & release auto-graded step-by-step trace assignment.',
    suggestedResources: [
      'Augmenting Path Step-by-Step Visualizer',
      'Peer Collaboration Study Group Invitation'
    ],
    status: 'remedial-assigned',
    strugglingStudentList: [
      { id: 'std_1081', name: 'Vikramaditya Rao', score: 42, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gap_03',
    subject: 'Data Structures & Algorithms',
    batch: 'ECE-Data Structures (Sem 4)',
    topic: 'AVL Tree Double Rotations (RL & LR Cases)',
    difficultyRating: 'Medium',
    strugglingStudentsCount: 38,
    totalStudents: 82,
    failureRatePercentage: 46.3,
    recommendedRemedialAction: 'Push EdScroll micro-learning card and 3 interactive rotation quiz widgets.',
    suggestedResources: [
      'EdScroll Reel #482 (Tree Rotations Explained with Pendulum Analogy)',
      'Mini Quiz with Instant Feedback'
    ],
    status: 'flagged',
    strugglingStudentList: []
  }
];

export const mockTeacherAssessments: AssessmentItem[] = [
  {
    id: 'asm_01',
    title: 'Mid-Term Exam: Neural Architectures & Optimization',
    batch: 'CSE-A (Semester 6)',
    subject: 'CS602 Deep Learning',
    dueDate: 'Sept 04, 2026',
    durationMinutes: 90,
    totalMarks: 100,
    submissionsCount: 61,
    totalStudents: 64,
    averageScorePercentage: 78.4,
    status: 'grading'
  },
  {
    id: 'asm_02',
    title: 'Lab Quiz 4: Dinic Flow & Bipartite Matching',
    batch: 'CSE-A (Semester 6)',
    subject: 'CS601 Graph Algorithms',
    dueDate: 'Sept 10, 2026',
    durationMinutes: 45,
    totalMarks: 40,
    submissionsCount: 0,
    totalStudents: 64,
    averageScorePercentage: 0,
    status: 'scheduled'
  },
  {
    id: 'asm_03',
    title: 'Coding Diagnostic: Raft Leader Election Implementation',
    batch: 'AI-ML Honors Specialization',
    subject: 'CS604 Distributed Systems',
    dueDate: 'Aug 24, 2026',
    durationMinutes: 120,
    totalMarks: 50,
    submissionsCount: 48,
    totalStudents: 48,
    averageScorePercentage: 86.2,
    status: 'completed'
  }
];
