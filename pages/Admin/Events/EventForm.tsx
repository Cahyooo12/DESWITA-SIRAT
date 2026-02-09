import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { useData } from '../../../contexts/DataContext';
import { Event } from '../../../types';

const EventForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { events, addEvent, updateEvent } = useData();

    const [formData, setFormData] = useState<Event>({
        id: '',
        date: '',
        title: '',
        time: '',
        location: '',
        description: ''
    });

    useEffect(() => {
        if (id) {
            const existingEvent = events.find(e => e.id === id);
            if (existingEvent) {
                setFormData(existingEvent);
            }
        } else {
            setFormData(prev => ({ ...prev, id: 'e' + Date.now() }));
        }
    }, [id, events]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateEvent(formData);
        } else {
            await addEvent(formData);
        }
        navigate('/admin/events');
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-8">{id ? 'Edit Event' : 'Tambah Event Baru'}</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Event</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                                <input
                                    type="date"
                                    name="dateISO"
                                    value={formData.dateISO || new Date().toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        const newDateISO = e.target.value;
                                        const dateObj = new Date(newDateISO);
                                        const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

                                        setFormData(prev => ({
                                            ...prev,
                                            dateISO: newDateISO,
                                            date: formattedDate
                                        }));
                                    }}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Waktu (Jam)</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time?.replace(' WIB', '') || ''}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, time: e.target.value + ' WIB' }));
                                    }}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/events')}
                            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                        >
                            Simpan Event
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EventForm;
