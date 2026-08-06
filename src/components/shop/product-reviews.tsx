'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Plus, X, ThumbsUp, CheckCircle2, MessageSquare } from 'lucide-react';
import { Product, ProductReview } from '@/types/product';
import { useCatalogStore } from '@/lib/store/catalog-store';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { reviews, addReview, isLoaded } = useCatalogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Filter reviews for this specific product (only approved ones)
  const productReviews = reviews.filter(
    (r) => (r.productId === product.id || r.productId === product.slug) && (r.status === 'Approved' || !r.status)
  );

  const avgRating = productReviews.length > 0
    ? Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1))
    : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newComment || !newName) return;

    addReview({
      productId: product.id,
      productName: product.name,
      author: newName,
      email: newEmail,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      isVerified: true,
      status: 'Approved',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewTitle('');
      setNewComment('');
      setNewName('');
      setNewEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 border-t border-white/10 text-white">
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h2 className="font-serif text-3xl text-white font-medium mb-2">Customer Reviews & Ratings</h2>
          <div className="flex items-center gap-3">
            <div className="flex text-[#C9A96E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.round(avgRating) ? "currentColor" : "none"} />
              ))}
            </div>
            {productReviews.length > 0 ? (
              <>
                <span className="text-xl font-bold font-serif text-white">{avgRating} out of 5</span>
                <span className="text-xs text-white/50 font-light">({productReviews.length} Verified Client {productReviews.length === 1 ? 'Review' : 'Reviews'})</span>
              </>
            ) : (
              <span className="text-xs text-white/50 font-light">(No reviews submitted yet for this creation)</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review List */}
      {productReviews.length > 0 ? (
        <div className="space-y-6">
          {productReviews.map((rev) => (
            <div key={rev.id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex text-[#C9A96E]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-medium text-white">{rev.title}</h3>
                </div>
                <span className="text-xs text-white/40 font-light">
                  {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed">{rev.comment}</p>

              <div className="flex items-center justify-between pt-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white/90">{rev.author}</span>
                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck size={12} /> Verified Buyer
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-white/40 font-mono text-[11px]">
                  <span>Status: Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#0a0a0a] border border-white/10 rounded-2xl space-y-3">
          <MessageSquare className="w-10 h-10 text-[#C9A96E]/50 mx-auto" />
          <h3 className="font-serif text-xl text-white font-medium">Be the first to review this artwork</h3>
          <p className="text-xs text-white/50 max-w-md mx-auto">
            Share your experience with fit, materials, and craftsmanship to assist fellow connoisseurs.
          </p>
        </div>
      )}

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-2xl text-white font-medium">Write Your Review</h3>

              {submitted ? (
                <div className="py-8 text-center text-emerald-400 space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto" />
                  <p className="font-serif text-xl">Thank you for your review!</p>
                  <p className="text-xs text-white/60">Your review has been published live for this product.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Rating</label>
                    <div className="flex gap-2 text-[#C9A96E]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star size={24} fill={star <= newRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Lady Evelyn Vance"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium font-semibold">Review Title *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Unmatched Quality & Craftsmanship"
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium font-semibold">Your Feedback *</label>
                    <textarea
                      rows={4}
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share details about fit, feel, material, and craftsmanship..."
                      className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
