'use client';

import React, { useState } from 'react';
import { Place, Review } from '@/types';
import { Star, Upload, X, MessageSquarePlus, Image as ImageIcon } from 'lucide-react';

interface ReviewModalProps {
  place: Place;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (placeId: string, review: Review) => void;
}

export default function ReviewModal({ place, isOpen, onClose, onAddReview }: ReviewModalProps) {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      authorName: authorName.trim() || 'Anonymous Explorer',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      photoUrl: photoPreview || undefined,
    };

    onAddReview(place.id, newReview);
    onClose();
    setComment('');
    setAuthorName('');
    setPhotoPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-teal-600" />
              Community Reviews & Photos
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">{place.name} · {place.area}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Visitor Feedback ({place.reviews?.length || 0})
          </h4>
          
          {(!place.reviews || place.reviews.length === 0) ? (
            <p className="text-xs text-zinc-400 italic bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl text-center">
              No community reviews yet. Share your experience and photos below.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {place.reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{rev.authorName}</span>
                    <span className="text-[10px] text-zinc-400">{rev.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{rev.comment}</p>

                  {rev.photoUrl && (
                    <img
                      src={rev.photoUrl}
                      alt="Review attachment"
                      className="w-16 h-16 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700 mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Leave Feedback & Photos
          </h4>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Explorer"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-xs bg-transparent outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition"
                >
                  <Star
                    className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Feedback / Visitor Tip</label>
            <textarea
              required
              rows={2}
              placeholder="Share details on seating, ambiance, or visit tips..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-xs bg-transparent outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
              Upload Photo (Optional)
            </label>
            
            <label className="flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-3 cursor-pointer hover:border-teal-600 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {photoPreview ? (
                <div className="flex items-center gap-2">
                  <img src={photoPreview} alt="Preview" className="w-10 h-10 object-cover rounded-md" />
                  <span className="text-xs text-teal-600 font-semibold">Photo attached</span>
                </div>
              ) : (
                <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-zinc-400" /> Click to select an image
                </span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition shadow-sm"
          >
            Submit Feedback & Photo
          </button>
        </form>
      </div>
    </div>
  );
}