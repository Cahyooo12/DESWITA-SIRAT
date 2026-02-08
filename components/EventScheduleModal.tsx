import React from 'react';


interface EventScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useData } from '../contexts/DataContext';

interface EventScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EventScheduleModal: React.FC<EventScheduleModalProps> = ({ isOpen, onClose }) => {
    const { events } = useData();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="bg-primary px-8 py-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 size-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 size-16 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-purple-200 text-2xl">calendar_month</span>
                        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">2026</span>
                    </div>
                    <h2 className="text-2xl font-black text-white leading-tight">Jadwal Festival<br />Panen Raya</h2>
                </div>

                {/* Scrollable List */}
                <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {events.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                            <p className="text-sm">Belum ada jadwal acara.</p>
                        </div>
                    ) : (
                        events.map((event, index) => (
                            <div key={index} className="flex gap-4 group">
                                {/* Date Box */}
                                <div className="shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                                    <span className="text-sm font-black text-slate-900 group-hover:text-primary">{event.date.split(' ')[0]}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{event.date.split(' ')[1]}</span>
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">{event.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            {event.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {event.location}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 pt-2 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">Jadwal dapat berubah sewaktu-waktu. Pantau terus update terbaru!</p>
                </div>
            </div>
        </div>
    );
};

export default EventScheduleModal;
