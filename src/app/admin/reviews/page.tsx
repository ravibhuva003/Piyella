'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCatalogStore } from '@/lib/store/catalog-store';
import { ProductReview } from '@/types/product';
import {
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Search,
  MessageSquare,
  ShieldCheck,
  Check,
  Ban,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export default function AdminReviewsPage() {
  const { products, reviews, addReview, deleteReview, toggleReviewStatus, clearAllReviews, isLoaded } = useCatalogStore();
  const [search, setSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Review Form State
  const [targetProductId, setTargetProductId] = useState(products[0]?.id || '');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [status, setStatus] = useState<'Approved' | 'Pending'>('Approved');

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !title || !comment) {
      alert('Please fill in author name, review title, and comment body');
      return;
    }

    const prodId = targetProductId || products[0]?.id || 'general';
    const prod = products.find((p) => p.id === prodId);

    addReview({
      productId: prodId,
      productName: prod?.name || 'General Product',
      author,
      rating,
      title,
      comment,
      isVerified,
      status,
    });

    alert('New review created successfully and synchronized live!');
    setIsAddModalOpen(false);
    setAuthor('');
    setTitle('');
    setComment('');
  };

  const filteredReviews = reviews.filter((r) => {
    const matchSearch =
      r.author.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      (r.productName && r.productName.toLowerCase().includes(search.toLowerCase()));

    const matchProduct = selectedProductId === 'all' || r.productId === selectedProductId;
    return matchSearch && matchProduct;
  });

  const approvedCount = reviews.filter((r) => r.status === 'Approved' || !r.status).length;
  const pendingCount = reviews.filter((r) => r.status === 'Pending').length;
  const avgCatalogRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Customer Feedback Management ({reviews.length} Reviews)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
            Product Reviews & Ratings
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {reviews.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete ALL reviews from the website? This action cannot be undone.')) {
                  clearAllReviews();
                }
              }}
              className="px-4 py-2.5 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Reviews</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-surface border border-border rounded-2xl space-y-1 shadow-md">
          <span className="text-xs uppercase tracking-widest text-foreground-muted font-medium block">Total Store Reviews</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-serif text-foreground font-medium">{reviews.length}</span>
            <MessageSquare className="w-6 h-6 text-[#C9A96E]" />
          </div>
        </div>

        <div className="p-6 bg-surface border border-border rounded-2xl space-y-1 shadow-md">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium block">Approved & Published</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-serif text-emerald-400 font-medium">{approvedCount}</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="p-6 bg-surface border border-border rounded-2xl space-y-1 shadow-md">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-medium block">Average Rating</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif text-foreground font-medium">{avgCatalogRating}</span>
              <div className="flex text-[#C9A96E]">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-[#C9A96E]" />
          </div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface border border-border p-4 rounded-xl shadow-md">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews by customer name, title, or review text..."
            className="w-full bg-transparent text-sm text-foreground pl-10 pr-4 py-2 placeholder:text-foreground-muted focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
          >
            <option value="all">All Catalog Products ({products.length})</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.sku})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Table / Card List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4">
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((rev) => {
              const targetProd = products.find((p) => p.id === rev.productId || p.slug === rev.productId);

              return (
                <div
                  key={rev.id}
                  className="p-5 bg-background/60 border border-border rounded-xl space-y-3 transition-colors hover:border-border/80"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="flex text-[#C9A96E]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < rev.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <h4 className="font-serif text-base font-medium text-foreground">{rev.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-foreground-muted font-mono">
                        {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border ${
                          rev.status === 'Approved' || !rev.status
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {rev.status || 'Approved'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-foreground-muted leading-relaxed font-light">{rev.comment}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-medium text-foreground">{rev.author}</span>
                      {rev.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <ShieldCheck size={12} /> Verified Purchaser
                        </span>
                      )}
                      <span className="text-foreground-muted font-mono text-[11px]">
                        Item: <b className="text-[#C9A96E] font-medium">{rev.productName || targetProd?.name || rev.productId}</b>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleReviewStatus(rev.id)}
                        className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-lg border transition-colors inline-flex items-center gap-1 ${
                          rev.status === 'Approved' || !rev.status
                            ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                            : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                      >
                        {rev.status === 'Approved' || !rev.status ? (
                          <>
                            <Ban className="w-3 h-3" />
                            <span>Set Pending</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Approve Live</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete review "${rev.title}" by ${rev.author}?`)) {
                            deleteReview(rev.id);
                          }
                        }}
                        className="p-1.5 text-foreground-muted hover:text-red-400 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-[#C9A96E]/40 mx-auto" />
            <h3 className="font-serif text-lg text-foreground font-medium">No reviews found</h3>
            <p className="text-xs text-foreground-muted font-light max-w-sm mx-auto">
              No customer reviews submitted for the selected filter. You can add a verified client review manually above.
            </p>
          </div>
        )}
      </div>

      {/* Add New Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-foreground">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Create Customer Review</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Add Verified Review</h2>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Target Product *</label>
                <select
                  value={targetProductId || products[0]?.id}
                  onChange={(e) => setTargetProductId(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-[#C9A96E] font-medium focus:border-[#C9A96E] focus:outline-none rounded-xl"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Author Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Lady Eleanor Sterling"
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Star Rating</label>
                <div className="flex gap-2 text-[#C9A96E] pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star size={22} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Review Headline Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Impeccable Italian Craftsmanship"
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Review Feedback Comment *</label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Details about craftsmanship, drape, packaging..."
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-light"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="w-4 h-4 accent-[#C9A96E]"
                  />
                  <span>Verified Purchaser Badge</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
