import React, { useRef, useState } from 'react';

interface ImageUploadProps {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    label?: string;
    multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "Upload Gambar", multiple = false }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);

    // Normalize value to array for easier handling
    const images = Array.isArray(value) ? value : (value ? [value] : []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []) as File[];
        processFiles(files);
    };

    const processFiles = (files: File[]) => {
        setError('');
        if (files.length === 0) return;

        let errorMsg = '';
        const validFiles: File[] = [];

        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                errorMsg = 'Mohon upload file gambar (JPG, PNG, GIF).';
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // Increased limit to 5MB for server upload
                errorMsg = 'Ukuran file terlalu besar. Maksimal 5MB.';
                return;
            }
            validFiles.push(file);
        });

        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        // Upload files to server
        Promise.all(validFiles.map(file => {
            const formData = new FormData();
            formData.append('image', file);

            return fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
                .then(res => {
                    if (!res.ok) throw new Error('Upload failed');
                    return res.json();
                })
                .then(data => data.url);
        }))
            .then(results => {
                if (multiple) {
                    // Ensure value is treated as array
                    const currentImages = Array.isArray(value) ? value : (value ? [value] : []);
                    onChange([...currentImages, ...results]);
                } else {
                    onChange(results[0]);
                }
            })
            .catch(err => {
                console.error(err);
                setError('Gagal mengupload gambar ke server.');
            });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        processFiles(files);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        if (multiple) {
            const newImages = [...images];
            newImages.splice(index, 1);
            onChange(newImages);
        } else {
            onChange('');
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>

            <div
                className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 cursor-pointer group
                    ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-primary hover:bg-slate-50'}
                    ${error ? 'border-red-500 bg-red-50' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple={multiple}
                    className="hidden"
                />

                {images.length > 0 ? (
                    <div className={`grid gap-4 ${multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'}`}>
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group/item">
                                <img
                                    src={img}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemove(e, idx)}
                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        title="Hapus Gambar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {multiple && (
                            <div className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-slate-400">+</span>
                                <span className="text-xs text-slate-500 font-bold mt-1">Tambah</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <div className="text-center">
                            <p className="font-semibold text-slate-600">Klik atau drag & drop</p>
                            <p className="text-xs mt-1">PNG, JPG, GIF (Max 500KB)</p>
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
