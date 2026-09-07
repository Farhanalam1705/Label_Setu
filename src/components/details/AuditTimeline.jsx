import React from 'react';
import { 
  FilePlus, 
  Upload, 
  ScanLine, 
  ClipboardCheck, 
  Eye, 
  UserCheck, 
  FileText, 
  Bot, 
  User, 
  Clock 
} from 'lucide-react';

const AUDIT_EVENTS = [
  {
    id: 'ev_1',
    name: 'Inspection Created',
    date: '05 Sep 2026',
    time: '10:24 AM',
    description: 'New inspection created by Officer.',
    actor: 'Officer',
    actorType: 'officer',
    icon: FilePlus,
    color: 'slate',
  },
  {
    id: 'ev_2',
    name: 'Product Image Uploaded',
    date: '05 Sep 2026',
    time: '10:25 AM',
    description: 'Product label image uploaded for inspection.',
    actor: 'Officer',
    actorType: 'officer',
    icon: Upload,
    color: 'slate',
  },
  {
    id: 'ev_3',
    name: 'AI Analysis Completed',
    date: '05 Sep 2026',
    time: '10:26 AM',
    description: 'Image processing and AI-assisted analysis completed.',
    actor: 'LABEL SETU AI-Assisted System',
    actorType: 'ai',
    icon: ScanLine,
    color: 'cyan',
  },
  {
    id: 'ev_4',
    name: 'Compliance Assessment Generated',
    date: '05 Sep 2026',
    time: '10:27 AM',
    description: 'Compliance findings generated from the analyzed product information.',
    actor: 'LABEL SETU AI-Assisted System',
    actorType: 'ai',
    icon: ClipboardCheck,
    color: 'cyan',
  },
  {
    id: 'ev_5',
    name: 'Evidence Reviewed',
    date: '05 Sep 2026',
    time: '10:29 AM',
    description: 'Evidence associated with findings was reviewed.',
    actor: 'Officer',
    actorType: 'officer',
    icon: Eye,
    color: 'slate',
  },
  {
    id: 'ev_6',
    name: 'Officer Review Submitted',
    date: '05 Sep 2026',
    time: '10:32 AM',
    description: 'Officer review and final assessment submitted.',
    actor: 'Officer',
    actorType: 'officer',
    icon: UserCheck,
    color: 'emerald',
  },
  {
    id: 'ev_7',
    name: 'Report Generated',
    date: '05 Sep 2026',
    time: '10:35 AM',
    description: 'Inspection compliance report generated.',
    actor: 'Officer',
    actorType: 'officer',
    icon: FileText,
    color: 'emerald',
  },
];

export const AuditTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inspection Activity</h3>
            <p className="text-xs text-slate-500">
              Audit trail and chronological event timeline.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium">
          <span className="flex items-center gap-1 text-cyan-700">
            <Bot className="w-3.5 h-3.5" />
            AI-Assisted Action
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-700">
            <User className="w-3.5 h-3.5" />
            Officer Action
          </span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {AUDIT_EVENTS.map((event) => {
          const Icon = event.icon;
          const isAI = event.actorType === 'ai';

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Marker Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-xs ${
                  isAI
                    ? 'bg-cyan-600 text-white'
                    : event.color === 'emerald'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0c1e33] text-cyan-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Event Content Card */}
              <div className="bg-slate-50/80 hover:bg-slate-50 p-4 rounded-xl border border-slate-200/80 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{event.name}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                        isAI
                          ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isAI ? 'AI-Assisted' : 'Officer'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    {event.date} • {event.time}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span className="font-semibold text-slate-600">Actor:</span>
                  <span
                    className={`font-semibold ${
                      isAI ? 'text-cyan-800 font-mono text-[10px]' : 'text-slate-800'
                    }`}
                  >
                    {event.actor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
