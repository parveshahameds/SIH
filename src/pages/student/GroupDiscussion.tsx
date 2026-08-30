import React, { useState, useEffect } from 'react';
import {
  Users,
  Mic,
  MicOff,
  Sparkles,
  Award,
  Clock,
  Plus,
  Play,
  Eye,
  MessageSquare,
  TrendingUp,
  Radio,
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockGDRooms } from '../../data/mockData';
import { GDRoom, GDMessage, GDParticipant } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

interface GroupDiscussionProps {
  onNavigate: (route: string) => void;
}

export const GroupDiscussion: React.FC<GroupDiscussionProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const [rooms, setRooms] = useState<GDRoom[]>(mockGDRooms);
  const [activeRoom, setActiveRoom] = useState<GDRoom | null>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'active-room'>('browse');
  const [roleMode, setRoleMode] = useState<'participate' | 'spectate'>('participate');
  
  // In-Room Speech Simulation
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInput, setSpeechInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(480);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('Artificial Intelligence');

  // Simulated AI peer speaking timer
  useEffect(() => {
    if (!activeRoom || activeRoom.status !== 'in-progress') return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoom]);

  const joinRoom = (room: GDRoom, mode: 'participate' | 'spectate') => {
    setActiveRoom(room);
    setRoleMode(mode);
    setViewMode('active-room');
    setTimeRemaining(room.timeRemainingSeconds);
  };

  const handleSendSpeech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speechInput.trim() || !activeRoom) return;

    const userMessage: GDMessage = {
      id: `msg_${Date.now()}`,
      participantId: studentData.id,
      participantName: studentData.name,
      text: speechInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'speech',
      sentiment: 'constructive'
    };

    setActiveRoom((prev: GDRoom | null) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, userMessage],
        participants: prev.participants.map((p: GDParticipant) =>
          p.id === 'p_ananya'
            ? { ...p, speakingTimeSeconds: p.speakingTimeSeconds + 15, contributionScore: Math.min(p.contributionScore + 4, 100) }
            : p
        )
      };
    });

    setSpeechInput('');
    setIsSpeaking(false);

    // Simulate AI Peer rebuttal after 2 seconds
    setTimeout(() => {
      const aiReply: GDMessage = {
        id: `msg_ai_${Date.now()}`,
        participantId: 'p_aisha',
        participantName: 'Aisha Khan (AI Peer)',
        text: 'Building on Ananya\'s point, we also have to consider latency constraints in edge robotics. Scaling laws don\'t account for real-time sensor processing at 200 FPS on 15W embedded chips.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'rebuttal',
        sentiment: 'insightful'
      };

      setActiveRoom((prev: GDRoom | null) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, aiReply]
        };
      });
    }, 2400);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const newGDRoom: GDRoom = {
      id: `gd_${Date.now()}`,
      topic: newTopic,
      category: newCategory,
      description: 'Community-led peer group discussion room.',
      status: 'in-progress',
      timeRemainingSeconds: 600,
      participants: [
        {
          id: 'p_ananya',
          name: `${studentData.name} (Host)`,
          avatar: studentData.avatar,
          role: 'student',
          isSpeaking: false,
          speakingTimeSeconds: 0,
          contributionScore: 90
        },
        {
          id: 'p_mod',
          name: 'CoLearn AI Moderator',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
          role: 'moderator',
          isSpeaking: false,
          speakingTimeSeconds: 15,
          contributionScore: 99
        }
      ],
      messages: [
        {
          id: 'm_init',
          participantId: 'p_mod',
          participantName: 'CoLearn AI Moderator',
          text: `Discussion room initialized on "${newTopic}". Participants may request the floor to begin.`,
          timestamp: 'Just now',
          type: 'ai-prompt'
        }
      ]
    };

    setRooms([newGDRoom, ...rooms]);
    setCreateModalOpen(false);
    setNewTopic('');
    joinRoom(newGDRoom, 'participate');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* View 1: Active In-Room Arena */}
      {viewMode === 'active-room' && activeRoom ? (
        <div className="space-y-6">
          {/* Active Room Header */}
          <div className="cyber-glass rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 glow-violet">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-rose-500" /> LIVE GD ARENA
                </span>
                <span className="text-xs text-slate-400 font-medium">Room #{activeRoom.id}</span>
                <span className="text-xs text-cyan-400 font-bold">• Mode: {roleMode.toUpperCase()}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {activeRoom.topic}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[110px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Time Remaining</p>
                <p className="text-lg font-mono font-extrabold text-cyan-400">
                  {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewMode('browse');
                  setActiveRoom(null);
                }}
                className="text-xs bg-slate-900 border-slate-800 text-slate-300"
              >
                Leave Room
              </Button>
            </div>
          </div>

          {/* Participant Podium Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {activeRoom.participants.map((p: GDParticipant) => (
              <div
                key={p.id}
                className={`p-4 rounded-3xl cyber-glass border transition-all text-center space-y-2 relative overflow-hidden ${
                  p.isSpeaking
                    ? 'border-cyan-500 ring-2 ring-cyan-500/40 glow-cyan'
                    : 'border-slate-800'
                }`}
              >
                {p.isSpeaking && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-700">
                    Speaking
                  </span>
                )}

                <div className="relative w-14 h-14 mx-auto">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-700 mx-auto"
                  />
                  {p.isSpeaking && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-cyan-950 px-1.5 py-0.5 rounded-md border border-cyan-600">
                      <div className="w-1 h-3 bg-cyan-400 waveform-bar" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-3 bg-cyan-400 waveform-bar" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-3 bg-cyan-400 waveform-bar" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 capitalize">{p.role.replace('-', ' ')}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Score: <strong className="text-cyan-400">{p.contributionScore}</strong></span>
                  <span>{p.speakingTimeSeconds}s</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Discussion Transcript Feed */}
          <div className="cyber-glass rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Live Discussion Transcript</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">AI Evaluator Listening</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {activeRoom.messages.map((m: GDMessage) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    m.participantId === 'p_mod'
                      ? 'bg-slate-900/90 border border-slate-700 text-cyan-200'
                      : m.participantId === studentData.id
                      ? 'bg-brand-950/80 border border-brand-700/80 text-white ml-6'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className={m.participantId === 'p_mod' ? 'text-cyan-400' : 'text-brand-300'}>
                      {m.participantName}
                    </span>
                    <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Bar (if participating) */}
            {roleMode === 'participate' ? (
              <form onSubmit={handleSendSpeech} className="pt-3 border-t border-slate-800 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`p-3 rounded-2xl transition-all ${
                    isSpeaking
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                  title={isSpeaking ? 'Mute Mic' : 'Request Floor / Speak'}
                >
                  {isSpeaking ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={speechInput}
                  onChange={(e) => setSpeechInput(e.target.value)}
                  placeholder="Type your arguments or points to speak into the GD room..."
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  disabled={!speechInput.trim()}
                  className="text-xs font-bold"
                >
                  Speak
                </Button>
              </form>
            ) : (
              <div className="p-3 text-center text-xs text-slate-400 border-t border-slate-800">
                You are currently spectating this session. Switch to participate in next round.
              </div>
            )}
          </div>

          {/* AI Moderation Telemetry Scorecard */}
          {activeRoom.moderatorScore && (
            <div className="cyber-glass rounded-3xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> AI Real-Time Group Discussion Telemetry
                </span>
                <span className="text-xs font-extrabold text-emerald-400 font-mono">
                  Grade: {activeRoom.moderatorScore.overallGrade}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Articulation</p>
                  <p className="text-base font-bold text-cyan-400">{activeRoom.moderatorScore.articulation}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Factual Backing</p>
                  <p className="text-base font-bold text-brand-400">{activeRoom.moderatorScore.factualBacking}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Listening Balance</p>
                  <p className="text-base font-bold text-emerald-400">{activeRoom.moderatorScore.collaborativeListening}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* View 2: Browse / Create / Join Lobby */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">Group Discussion (GD) Arena</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-950 text-brand-300 border border-brand-700/60">
                  AI Moderated
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice campus placement GD rounds with simulated AI peers, articulation scoring, and live spectating
              </p>
            </div>

            <Button
              variant="glow"
              size="sm"
              icon={Plus}
              onClick={() => setCreateModalOpen(true)}
              className="text-xs font-bold"
            >
              Create Discussion Room
            </Button>
          </div>

          {/* Active GD Rooms List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <Card
                key={room.id}
                variant="elevated"
                padding="lg"
                className="cyber-glass border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {room.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 animate-pulse" /> {room.status === 'in-progress' ? 'Active' : 'Waiting'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {room.topic}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      {room.participants.length} Participants
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-cyan-300">
                      <Clock className="w-3.5 h-3.5" />
                      {Math.floor(room.timeRemainingSeconds / 60)} mins
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => joinRoom(room, 'spectate')}
                    className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    Spectate
                  </Button>

                  <Button
                    variant="glow"
                    size="sm"
                    icon={Play}
                    onClick={() => joinRoom(room, 'participate')}
                    className="text-xs font-bold"
                  >
                    Join as Speaker
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Create GD Room Modal */}
      {createModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setCreateModalOpen(false)}
          title="Create Real-Time Group Discussion Room"
          subtitle="AI Moderator will evaluate speaking clarity, turn-taking, and argument rigor"
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="glow" size="sm" onClick={handleCreateRoom}>
                Launch Room
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateRoom} className="space-y-4 text-slate-100">
            <Input
              label="Discussion Topic"
              placeholder="e.g. Impact of Generative AI on Entry-Level Software Engineering Jobs"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="Artificial Intelligence">Artificial Intelligence & Ethics</option>
                <option value="Cloud & Distributed Systems">Cloud & Distributed Systems</option>
                <option value="Product & Startups">Product & Tech Startups</option>
                <option value="Campus Placements">Campus Placements Round</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
