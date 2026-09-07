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
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* View 1: Active In-Room Arena */}
      {viewMode === 'active-room' && activeRoom ? (
        <div className="space-y-6">
          {/* Active Room Header */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-rose-600" /> LIVE GD ARENA
                </span>
                <span className="text-xs text-slate-500 font-medium">Room #{activeRoom.id}</span>
                <span className="text-xs text-indigo-600 font-bold">• Mode: {roleMode.toUpperCase()}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {activeRoom.topic}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Time Remaining</p>
                <p className="text-lg font-mono font-extrabold text-indigo-600">
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
                className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
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
                className={`p-4 rounded-3xl bg-white border transition-all text-center space-y-2 relative overflow-hidden shadow-xs ${
                  p.isSpeaking
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'border-slate-200/90'
                }`}
              >
                {p.isSpeaking && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    Speaking
                  </span>
                )}

                <div className="relative w-14 h-14 mx-auto">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200 mx-auto shadow-xs"
                  />
                  {p.isSpeaking && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-indigo-600 px-1.5 py-0.5 rounded-md text-white">
                      <div className="w-1 h-3 bg-white waveform-bar" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-3 bg-white waveform-bar" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-3 bg-white waveform-bar" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                  <p className="text-[10px] text-slate-500 capitalize">{p.role.replace('-', ' ')}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Score: <strong className="text-indigo-600">{p.contributionScore}</strong></span>
                  <span>{p.speakingTimeSeconds}s</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Discussion Transcript Feed */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Live Discussion Transcript</h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">AI Evaluator Listening</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {activeRoom.messages.map((m: GDMessage) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    m.participantId === 'p_mod'
                      ? 'bg-slate-100 border border-slate-200 text-slate-800'
                      : m.participantId === studentData.id
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 ml-6'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className={m.participantId === 'p_mod' ? 'text-indigo-700' : 'text-slate-900'}>
                      {m.participantName}
                    </span>
                    <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Bar (if participating) */}
            {roleMode === 'participate' ? (
              <form onSubmit={handleSendSpeech} className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`p-3 rounded-2xl transition-all ${
                    isSpeaking
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
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
                  className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!speechInput.trim()}
                  className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Speak
                </Button>
              </form>
            ) : (
              <div className="p-3 text-center text-xs text-slate-500 border-t border-slate-100">
                You are currently spectating this session. Switch to participate in next round.
              </div>
            )}
          </div>

          {/* AI Moderation Telemetry Scorecard */}
          {activeRoom.moderatorScore && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> AI Real-Time Group Discussion Telemetry
                </span>
                <span className="text-xs font-extrabold text-emerald-700 font-mono">
                  Grade: {activeRoom.moderatorScore.overallGrade}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500">Articulation</p>
                  <p className="text-base font-bold text-indigo-600">{activeRoom.moderatorScore.articulation}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500">Factual Backing</p>
                  <p className="text-base font-bold text-indigo-600">{activeRoom.moderatorScore.factualBacking}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500">Listening Balance</p>
                  <p className="text-base font-bold text-emerald-700">{activeRoom.moderatorScore.collaborativeListening}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* View 2: Browse / Create / Join Lobby */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-slate-900">Group Discussion (GD) Arena</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  AI Moderated
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice campus placement GD rounds with simulated AI peers, articulation scoring, and live spectating
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setCreateModalOpen(true)}
              className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
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
                className="bg-white border-slate-200/90 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {room.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 animate-pulse" /> {room.status === 'in-progress' ? 'Active' : 'Waiting'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {room.topic}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      {room.participants.length} Participants
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-indigo-700 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {Math.floor(room.timeRemainingSeconds / 60)} mins
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => joinRoom(room, 'spectate')}
                    className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Spectate
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={Play}
                    onClick={() => joinRoom(room, 'participate')}
                    className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
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
              <Button variant="primary" size="sm" onClick={handleCreateRoom} className="bg-indigo-600 text-white">
                Launch Room
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateRoom} className="space-y-4 text-slate-900">
            <Input
              label="Discussion Topic"
              placeholder="e.g. Impact of Generative AI on Entry-Level Software Engineering Jobs"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
