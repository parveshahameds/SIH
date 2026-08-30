import { useState } from 'react';
import { EdScrollItem } from '../types';
import { mockEdScrollFeed } from '../data/mockData';

export const useEdScroll = () => {
  const [feed, setFeed] = useState<EdScrollItem[]>(mockEdScrollFeed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(['ed_01']));
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const filteredFeed = filterCategory === 'All'
    ? feed
    : feed.filter(item => item.category === filterCategory);

  const currentItem = filteredFeed[currentIndex] || filteredFeed[0];

  const handleNext = () => {
    if (currentIndex < filteredFeed.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleLike = (id: string) => {
    setFeed(prev =>
      prev.map(item => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likesCount: isLiked ? item.likesCount + 1 : item.likesCount - 1
          };
        }
        return item;
      })
    );
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const answerQuiz = (itemId: string, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [itemId]: optionIndex }));
  };

  return {
    feed: filteredFeed,
    rawFeed: feed,
    currentIndex,
    currentItem,
    filterCategory,
    savedIds,
    quizAnswers,
    setFilterCategory: (cat: string) => {
      setFilterCategory(cat);
      setCurrentIndex(0);
    },
    handleNext,
    handlePrev,
    toggleLike,
    toggleSave,
    answerQuiz
  };
};
