import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  Share2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  XCircle,
  Code2,
  BookOpen,
  Filter,
  Layers,
  Globe
} from 'lucide-react';
import { useEdScroll } from '../../hooks/useEdScroll';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface EdScrollProps {
  onNavigate: (route: string) => void;
}

// Multilingual translations dictionary
const multilingualContent: Record<string, Record<'hi' | 'ta', { title: string; description: string; takeaway: string }>> = {
  'ed_01': {
    hi: {
      title: 'मल्टी-हेड अटेंशन और ट्रांसफॉर्मर आर्किटेक्चर',
      description: 'मल्टी-हेड अटेंशन मॉडल को अलग-अलग पोजीशन पर विभिन्न सब-स्पेस से जानकारी पर संयुक्त रूप से ध्यान देने की अनुमति देता है। यह जटिल भाषा संदर्भों को समझने के लिए आवश्यक है।',
      takeaway: 'मल्टी-हेड अटेंशन टोकन के बीच समानांतर संबंधों को प्रभावी ढंग से कैप्चर करता है।'
    },
    ta: {
      title: 'மல்டி-ஹெட் அட்டென்ஷன் மற்றும் டிரான்ஸ்ஃபார்மர் கட்டமைப்பு',
      description: 'மல்டி-ஹெட் அட்டென்ஷன் மாடலை வெவ்வேறு இடங்களில் உள்ள துணை இடைவெளிகளிலிருந்து தகவல்களில் கூட்டாக கவனம் செலுத்த அனுமதிக்கிறது.',
      takeaway: 'மல்டி-ஹெட் அட்டென்ஷன் ஒரே நேரத்தில் பல டோக்கன் உறவுகளை பகுப்பாய்வு செய்கிறது.'
    }
  }
};

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

  const [language, setLanguage] = useState<'en' | 'hi' | 'ta'>('en');

  const categories = ['All', 'AI/ML', 'System Design', 'Algorithms', 'Career Hacks', 'Web3'];

  if (!currentItem) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">No micro-learning reels in this category yet.</p>
        <Button variant="outline" size="sm" onClick={() => setFilterCategory('All')} className="mt-4 bg-slate-800 border-slate-700 text-slate-300">
          Reset Filter
        </Button>
      </div>
    );
  }

  const isSaved = savedIds.has(currentItem.id);
  const selectedAnswer = quizAnswers[currentItem.id];

  // Apply multilingual content if available
  const localizedData = language !== 'en' ? multilingualContent[currentItem.id]?.[language] : null;
  const displayTitle = localizedData?.title || currentItem.title;
  const displayDescription = localizedData?.description || currentItem.description;
  const displayTakeaway = localizedData?.takeaway || currentItem.keyTakeaway;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in text-slate-900">
      {/* Category Pills & Multilingual Switch Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">EdScroll Micro-Feed</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Small English / Hindi / Tamil switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <Globe className="w-3.5 h-3.5 ml-1 text-indigo-600 shrink-0" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                language === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                language === 'hi' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                language === 'ta' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Reel Card Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left / Center: The Vertical Reel Card */}
        <div className="md:col-span-10">
          <div className="relative rounded-3xl bg-white text-slate-900 border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Reel Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentItem.creatorAvatar}
                  alt={currentItem.creatorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{currentItem.creatorName}</h4>
                  <p className="text-[11px] text-slate-500">{currentItem.creatorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentItem.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  {currentItem.readTime}
                </span>
              </div>
            </div>

            {/* Title & Body */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
                {displayTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {displayDescription}
              </p>
            </div>

            {/* Optional Code Snippet Block */}
            {currentItem.codeSnippet && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-sky-300 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Micro-Concept Trace</span>
                  </div>
                  <span className="text-emerald-400 font-sans">Verified Syntax</span>
                </div>
                <pre>{currentItem.codeSnippet}</pre>
              </div>
            )}

            {/* Interactive In-Feed Quiz */}
            {currentItem.interactiveQuiz && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> 30-Second Rapid Mastery Check
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">+50 XP for Correct Answer</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  {currentItem.interactiveQuiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {currentItem.interactiveQuiz.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentItem.interactiveQuiz?.correctIndex;

                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';
                    if (selectedAnswer !== undefined) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500 ring-2 ring-emerald-500/40'
                          : 'bg-rose-600 text-white font-bold border-rose-500 ring-2 ring-rose-500/40';
                      } else if (isCorrect) {
                        btnStyle = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
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
                  <div className="mt-2 p-3 rounded-xl bg-white border border-slate-200 text-xs animate-fade-in space-y-1">
                    <p className="font-semibold text-emerald-700">
                      Diagnostic Explanation:
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {currentItem.interactiveQuiz.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Takeaway Banner */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2.5">
              <span className="text-indigo-700 font-bold shrink-0">Key Concept:</span>
              <span className="text-[11px] sm:text-xs leading-relaxed text-indigo-950 font-medium">
                {displayTakeaway}
              </span>
            </div>

            {/* Action Bar Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => toggleLike(currentItem.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    currentItem.isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${currentItem.isLiked ? 'fill-rose-600' : ''}`} />
                  <span>{currentItem.likesCount}</span>
                </button>

                <button
                  onClick={() => toggleSave(currentItem.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    isSaved ? 'text-amber-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
                  <span>{isSaved ? 'Saved to Notes' : 'Save'}</span>
                </button>

                <button
                  onClick={() => alert('Link copied to clipboard for peer study group sharing!')}
                  className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{currentItem.sharesCount}</span>
                </button>
              </div>

              <button
                onClick={() => onNavigate('my-learning')}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
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
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous micro-reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <div className="text-center px-2">
            <span className="text-xs font-bold text-slate-900">{currentIndex + 1}</span>
            <span className="text-xs text-slate-500"> / {feed.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === feed.length - 1}
            className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next micro-reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
