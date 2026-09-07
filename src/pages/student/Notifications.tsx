import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { NotificationItem } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface NotificationsProps {
  onNavigate: (route: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<NotificationItem[]>(mockNotifications);
  const [filterType, setFilterType] = useState<string>('all');

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filteredItems = items.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'academic': return <BookOpen className="w-4 h-4 text-brand-600" />;
      case 'ai-alert': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'career': return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'system': return <Sparkles className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notifications & AI Alerts</h2>
          <p className="text-xs text-slate-500">
            System notices, assignment updates, attendance warnings, and career matches
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={CheckCheck}
          onClick={markAllRead}
          className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'academic', 'ai-alert', 'career', 'system'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              filterType === type
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {type.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card variant="default" padding="lg" className="text-center py-12 border-slate-200/90 bg-white shadow-xs">
            <Bell className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No notifications in this category</p>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="md"
              className={`border-slate-200/90 bg-white shadow-xs transition-all ${
                !item.isRead ? 'bg-indigo-50/40 border-l-4 border-l-indigo-600' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
                    {getIcon(item.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      {item.priority === 'urgent' && (
                        <Badge variant="danger" size="sm">
                          Urgent
                        </Badge>
                      )}
                      {item.priority === 'high' && (
                        <Badge variant="warning" size="sm">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium font-mono">{item.timestamp}</p>
                  </div>
                </div>

                {item.actionUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const target = item.actionUrl!.replace('/student/', '');
                      onNavigate(target);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 shrink-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
