'use client';

import React, { useState } from 'react';
import { useCatalogStore, AdminUser } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Users, ShieldCheck, Crown, User as UserIcon, UserPlus, ShieldAlert, KeyRound, Edit3, X, Check } from 'lucide-react';

export default function AdminUsersPage() {
  const { users, updateUserRole, addAdminUser, saveUsers, isLoaded } = useCatalogStore();
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'vip' | 'user'>('admin');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail) return;

    addAdminUser(newAdminName, newAdminEmail, newAdminRole);
    setNewAdminName('');
    setNewAdminEmail('');
    setShowAddForm(false);
    alert(`Successfully granted ${newAdminRole.toUpperCase()} permissions to ${newAdminEmail}!`);
  };

  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    saveUsers(updated);
    setEditingUser(null);
    alert(`User "${editingUser.name}" updated successfully!`);
  };

  return (
    <div className="space-y-8 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
            Executive Permission Delegation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
            User & Admin Role Manager ({users.length} Users)
          </h1>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Create New Administrator</span>
        </button>
      </div>

      {/* Parent Admin Credentials Banner */}
      <div className="p-6 bg-surface border border-[#C9A96E]/40 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg text-foreground font-medium">Parent Super Admin (Owner)</h2>
              <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#C9A96E] text-black rounded-full">
                Root Account
              </span>
            </div>
            <p className="text-xs text-foreground-muted font-light">
              Primary Account: <span className="text-foreground font-mono font-medium">piyella@gmail.com</span> &bull; Password: <span className="text-[#C9A96E] font-mono font-medium">piyella@123</span>
            </p>
          </div>
        </div>
        <span className="text-[11px] text-foreground-muted font-mono bg-background border border-border px-3 py-1.5 rounded-lg w-fit">
          Full Executive Rights Enabled
        </span>
      </div>

      {/* Create New Admin Form (Expandable) */}
      {showAddForm && (
        <form onSubmit={handleCreateAdmin} className="bg-surface border border-border p-6 rounded-2xl space-y-6 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-foreground font-medium flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#C9A96E]" />
              <span>Assign & Create New Administrator</span>
            </h2>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-foreground-muted hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Admin Full Name *</label>
              <input
                type="text"
                required
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder="e.g. Marco Bernardi"
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Admin Email Address *</label>
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="e.g. admin@piyella.com"
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2 font-medium">Permission Tier</label>
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as AdminUser['role'])}
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
              >
                <option value="admin">Administrator (Full Access)</option>
                <option value="vip">VIP Concierge</option>
                <option value="user">Standard Client</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Grant Executive Role</span>
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-widest text-foreground-muted border-b border-border">
              <tr>
                <th className="px-6 py-4">Client / Admin Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-[#C9A96E] shrink-0">
                      {u.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : u.role === 'vip' ? <Crown className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{u.name}</span>
                        {u.isParentAdmin && (
                          <span className="px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 rounded-full">
                            Parent Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs font-mono text-foreground-muted">{u.email}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                      u.role === 'admin' ? 'bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30' :
                      u.role === 'vip' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-surface-elevated text-foreground-muted'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-mono">{u.ordersCount} Orders</td>

                  <td className="px-6 py-4 font-medium text-foreground">{formatPrice(u.totalSpent)}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(u)}
                        disabled={u.isParentAdmin}
                        className="px-3 py-1.5 bg-[#C9A96E]/10 hover:bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit User</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-widest font-semibold block">Edit User Account</span>
              <h2 className="font-serif text-2xl text-foreground font-medium">Modify User Credentials & Role</h2>
            </div>

            <form onSubmit={handleSaveUserEdit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-1 font-medium">Assigned Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as AdminUser['role'] })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm text-foreground focus:border-[#C9A96E] focus:outline-none rounded-xl uppercase"
                >
                  <option value="user">User (Standard Client)</option>
                  <option value="vip">VIP Connoisseur</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-2.5 border border-border text-foreground text-xs uppercase tracking-wider rounded-xl hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
