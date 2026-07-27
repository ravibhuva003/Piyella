'use client';

import React, { useState } from 'react';
import { useCatalogStore, AdminOrder } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Gift, X, Edit3, Check, Trash2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, saveOrders, isLoaded } = useCatalogStore();
  const [activeGiftModal, setActiveGiftModal] = useState<AdminOrder['giftPackaging'] | null>(null);
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSaveOrderEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    const updated = orders.map((o) => (o.id === editingOrder.id ? editingOrder : o));
    saveOrders(updated);
    setEditingOrder(null);
    alert(`Order ${editingOrder.id} updated successfully!`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
      const updated = orders.filter((o) => o.id !== orderId);
      saveOrders(updated);
      if (editingOrder?.id === orderId) setEditingOrder(null);
      alert(`Order ${orderId} has been deleted successfully.`);
    }
  };

  return (
    <div className="space-y-8 text-foreground">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Fulfillment & Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Order Management Processor ({orders.length} Orders)
        </h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-widest text-foreground-muted border-b border-border">
              <tr>
                <th className="px-6 py-4">Order Reference</th>
                <th className="px-6 py-4">Client Name & Email</th>
                <th className="px-6 py-4">Gift Options</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#C9A96E] font-medium">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{o.customerName}</div>
                    <div className="text-[11px] text-foreground-muted font-light">{o.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    {o.giftPackaging?.enabled ? (
                      <button
                        onClick={() => setActiveGiftModal(o.giftPackaging || null)}
                        className="px-3 py-1 bg-[#C9A96E]/20 hover:bg-[#C9A96E]/30 text-[#C9A96E] border border-[#C9A96E]/40 text-[10px] uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Gift Wrapped</span>
                      </button>
                    ) : (
                      <span className="text-xs text-foreground-muted font-light">Standard Box</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                      o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      o.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{formatPrice(o.totalAmount)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingOrder(o)}
                        className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                        title="Edit Order Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(o.id)}
                        className="p-1.5 text-foreground-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setEditingOrder(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit Order</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify Order Details ({editingOrder.id})</h2>
            </div>

            <form onSubmit={handleSaveOrderEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editingOrder.customerName}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Customer Email</label>
                <input
                  type="email"
                  required
                  value={editingOrder.customerEmail}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerEmail: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Total Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingOrder.totalAmount}
                    onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Fulfillment Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as AdminOrder['status'] })}
                    className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Tracking AWB Number</label>
                <input
                  type="text"
                  value={editingOrder.trackingNumber || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                  placeholder="e.g. AWB-9912048"
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleDeleteOrder(editingOrder.id)}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Order</span>
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Order</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gift Details Modal */}
      {activeGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveGiftModal(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Bespoke Gift Service</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Bespoke Gift Card & Note</h2>
            </div>

            <div className="space-y-4 p-4 bg-background border border-border rounded-xl">
              <div>
                <span className="text-[10px] uppercase text-foreground-muted block font-semibold">Recipient Name:</span>
                <span className="text-sm font-medium text-foreground">{activeGiftModal.recipientName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-foreground-muted block font-semibold">Sender Name:</span>
                <span className="text-sm font-medium text-foreground">{activeGiftModal.senderName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-foreground-muted block font-semibold">Packaging Style:</span>
                <span className="text-sm font-medium text-[#C9A96E]">{activeGiftModal.boxStyleName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-foreground-muted block font-semibold">Gift Message:</span>
                <p className="text-xs font-serif italic text-foreground leading-relaxed pt-1 bg-surface p-3 rounded-lg border border-border">
                  &ldquo;{activeGiftModal.message}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
