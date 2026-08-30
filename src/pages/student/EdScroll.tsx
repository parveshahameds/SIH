import React from 'react';
import {
  Heart,
  Bookmark,
  Share2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  Code2,
  BookOpen,
  Filter,
  Layers
} from 'lucide-react';
import { useEdScroll } from '../../hooks/useEdScroll';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface EdScrollProps {
  onNavigate: (route: string) => void;
}

export const EdScroll: React.FC<EdScrollProps> = ({ onNavigate }) => {
  const {
    feed,
    currentIndex,
    currentItem,
    filterCategory,
    savedIds,
    quizAnswers,
    setFilterCategory,
    handleNext,
    handlePrev,
    toggleLike,
    toggleSave,
    answerQuiz
  } = useEdScroll();

  const categories = ['All', 'AI/ML', 'System Design', 'Algorithms', 'Career Hacks', 'Web3'];

  if (!currentItem) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-500">No micro-learning reels in this category yet.</p>
        <Button variant="outline" size="sm" onClick={() => setFilterCategory('All')} className="mt-4">
          Reset Filter
        </Button>
      </div>
    );
  }

  const isSaved = savedIds.has(currentItem.id);
  const selectedAnswer = quizAnswers[currentItem.id];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold text-slate-900">EdScroll Micro-Feed</h2>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${filterCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reel Card Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left / Center: The Vertical Reel Card */}
        <div className="md:col-span-10">
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Reel Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentItem.creatorAvatar}
                  alt={currentItem.creatorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{currentItem.creatorName}</h4>
                  <p className="text-[11px] text-slate-400">{currentItem.creatorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {currentItem.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                  {currentItem.readTime}
                </span>
              </div>
            </div>

            {/* Title & Body */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            {/* Optional Code Snippet Block */}
            {currentItem.codeSnippet && (
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-sky-300 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Micro-Concept Trace</span>
                  </div>
                  <span className="text-emerald-400 font-sans">Verified Syntax</span>
                </div>
                <pre>{currentItem.codeSnippet}</pre>
              </div>
            )}

            {/* Interactive In-Feed Quiz */}
            {currentItem.interactiveQuiz && (
              <div className="rounded-2xl bg-slate-800/90 border border-slate-700/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 30-Second Rapid Mastery Check
                  </span>
                  <span className="text-[10px] text-slate-400">+50 XP for Correct Answer</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-white">
                  {currentItem.interactiveQuiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {currentItem.interactiveQuiz.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentItem.interactiveQuiz?.correctIndex;

                    let btnStyle = 'bg-slate-900/90 hover:bg-slate-700/80 text-slate-300 border-slate-700';
                    if (selectedAnswer !== undefined) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? 'bg-emerald-600 text-white font-bold border-emerald-400 ring-2 ring-emerald-400/50'
                          : 'bg-rose-600 text-white font-bold border-rose-400 ring-2 ring-rose-400/50';
                      } else if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 text-emerald-300 border-emerald-700';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== undefined}
                        onClick={() => answerQuiz(currentItem.id, idx)}
                        className={`p-3 rounded-xl text-xs font-medium text-left border transition-all ${btnStyle}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{option}</span>
                          {selectedAnswer !== undefined && isSelected && (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-white shrink-0" />
                            )
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== undefined && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs animate-fade-in space-y-1">
                    <p className="font-semibold text-emerald-400">
                      💡 Diagnostic Explanation:
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {currentItem.interactiveQuiz.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Takeaway Banner */}
            <div className="p-3.5 rounded-2xl bg-brand-950/80 border border-brand-800/60 text-xs text-brand-200 flex items-start gap-2.5">
              <span className="text-brand-400 font-bold shrink-0">📌 Takeaway:</span>
              <span className="text-[11px] sm:text-xs leading-relaxed text-slate-200">
                {currentItem.keyTakeaway}
              </span>
            </div>

            {/* Action Bar Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => toggleLike(currentItem.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${currentItem.isLiked ? 'text-rose-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${currentItem.isLiked ? 'fill-rose-400' : ''}`} />
                  <span>{currentItem.likesCount}</span>
                </button>

                <button
                  onClick={() => toggleSave(currentItem.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${isSaved ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                  <span>{isSaved ? 'Saved to Notes' : 'Save'}</span>
                </button>

                <button
                  onClick={() => alert('Link copied to clipboard for peer study group sharing!')}
                  className="flex items-center gap-1.5 font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{currentItem.sharesCount}</span>
                </button>
              </div>

              <button
                onClick={() => onNavigate('my-learning')}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View in Course</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Vertical Navigation Controller */}
        <div className="md:col-span-2 flex md:flex-col items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous micro-reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <div className="text-center px-2">
            <span className="text-xs font-bold text-slate-900">{currentIndex + 1}</span>
            <span className="text-xs text-slate-400"> / {feed.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === feed.length - 1}
            className="p-3.5 rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next micro-reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
