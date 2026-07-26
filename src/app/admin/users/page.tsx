'use client';

import React from 'react';
import { useCatalogStore, AdminUser } from '@/lib/store/catalog-store';
import { formatPrice } from '@/lib/utils';
import { Users, ShieldCheck, Crown, User as UserIcon } from 'lucide-react';

export default function AdminUsersPage() {
  const { users, updateUserRole, isLoaded } = useCatalogStore();

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      <div>
        <span className="text-[#C9A96E] text-xs uppercase tracking-[0.3em] font-medium block mb-1">
          Client Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
          User & Role Management
        </h1>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A96E]">
                      {u.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : u.role === 'vip' ? <Crown className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                    </div>
                    <span>{u.name}</span>
                  </td>

                  <td className="px-6 py-4 text-xs font-light text-white/70">{u.email}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                      u.role === 'admin' ? 'bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30' :
                      u.role === 'vip' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-mono">{u.ordersCount} Orders</td>

                  <td className="px-6 py-4 font-medium text-white">{formatPrice(u.totalSpent)}</td>

                  <td className="px-6 py-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value as AdminUser['role'])}
                      className="bg-black border border-white/20 text-xs text-white px-3 py-1.5 rounded-lg uppercase focus:border-[#C9A96E] focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="vip">VIP Connoisseur</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
