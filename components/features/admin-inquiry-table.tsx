'use client';

import React, { useState, useTransition } from 'react';
import { InquiryData } from '@/lib/db';
import { InquiryStatus } from '@prisma/client';
import { updateInquiryStatusAction, deleteInquiryAction } from '@/app/actions/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Eye,
  Filter,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface AdminInquiryTableProps {
  initialInquiries: InquiryData[];
}

export function AdminInquiryTable({ initialInquiries }: AdminInquiryTableProps) {
  const [inquiries, setInquiries] = useState<InquiryData[]>(initialInquiries);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filterStatus === 'ALL') return true;
    return inq.status === filterStatus;
  });

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    setActionError(null);
    startTransition(async () => {
      const res = await updateInquiryStatusAction(id, newStatus);
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        setActionError(res.error || 'Failed to update status.');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you certain you wish to remove this inquiry record from the archive?')) return;
    setActionError(null);
    startTransition(async () => {
      const res = await deleteInquiryAction(id);
      if (res.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      } else {
        setActionError(res.error || 'Failed to delete inquiry.');
      }
    });
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="pending">Pending Review</Badge>;
      case 'REVIEWED':
        return <Badge variant="reviewed">Under Consultation</Badge>;
      case 'RESOLVED':
        return <Badge variant="resolved">Completed / Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6" id="admin-inquiries-manager">
      {/* Header & Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E3DA]">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#8C827A]" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#141414]">
            Filter Inquiries:
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto">
          {['ALL', 'PENDING', 'REVIEWED', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#141414] text-[#FAF8F5]'
                  : 'bg-white text-[#78716C] border border-[#DDD7CD] hover:border-[#141414]'
              }`}
            >
              {status === 'ALL' ? `All Records (${inquiries.length})` : status}
            </button>
          ))}
        </div>
      </div>

      {actionError && (
        <div className="p-3 border border-rose-300 bg-rose-50 text-rose-800 text-xs">
          {actionError}
        </div>
      )}

      {/* Inquiry Records Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#DDD7CD] bg-white space-y-3">
          <Clock className="w-8 h-8 text-[#8C827A] mx-auto stroke-1" />
          <h4 className="font-serif text-xl text-[#141414]">No Inquiries in this Category</h4>
          <p className="text-xs text-[#78716C]">
            Any consultation or commission requests received from the public portal will appear here.
          </p>
        </div>
      ) : (
        <div className="border border-[#DDD7CD] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E3DA] bg-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] text-[#78716C]">
                  <th className="py-3.5 px-6 font-medium">Patron / Client</th>
                  <th className="py-3.5 px-6 font-medium">Context / Creation</th>
                  <th className="py-3.5 px-6 font-medium">Status</th>
                  <th className="py-3.5 px-6 font-medium">Received Date</th>
                  <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E3DA] text-xs">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* Client Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-[#141414]">{item.clientName}</p>
                        <p className="text-[11px] text-[#78716C] flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#C5A880]" />
                          <span>{item.clientEmail}</span>
                        </p>
                        {item.phone && (
                          <p className="text-[11px] text-[#78716C] flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-[#8C827A]" />
                            <span>{item.phone}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Context / Item */}
                    <td className="py-4 px-6">
                      <div className="space-y-1 max-w-xs">
                        {item.productItem ? (
                          <p className="font-serif text-sm text-[#141414] font-medium truncate">
                            {item.productItem.title}
                          </p>
                        ) : (
                          <p className="text-xs text-[#141414] font-medium">
                            {item.serviceType || 'General Consultation'}
                          </p>
                        )}
                        <p className="text-[11px] text-[#78716C] line-clamp-1 italic">
                          &ldquo;{item.message}&rdquo;
                        </p>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-[#78716C]">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInquiry(item)}
                          className="h-8 px-2.5 text-[10px]"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Review
                        </Button>

                        <select
                          value={item.status}
                          disabled={isPending}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as InquiryStatus)
                          }
                          className="h-8 border border-[#DDD7CD] bg-white px-2 text-[10px] uppercase tracking-wider text-[#141414] focus:border-[#C5A880] focus:outline-none cursor-pointer"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWED">Consulting</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                          disabled={isPending}
                          className="h-8 w-8 text-[#8C827A] hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                  Patron Dossier & Request
                </span>
                {getStatusBadge(selectedInquiry.status)}
              </div>
              <DialogTitle>{selectedInquiry.clientName}</DialogTitle>
              <DialogDescription>
                Received {new Date(selectedInquiry.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-4 text-xs font-sans">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF8F5] border border-[#E8E3DA]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">Email</span>
                  <a href={`mailto:${selectedInquiry.clientEmail}`} className="font-medium text-[#141414] hover:underline">
                    {selectedInquiry.clientEmail}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">Phone</span>
                  <span className="font-medium text-[#141414]">{selectedInquiry.phone || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">Timing / Season</span>
                  <span className="font-medium text-[#141414]">{selectedInquiry.preferredDate || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">Target Creation</span>
                  <span className="font-medium text-[#141414]">
                    {selectedInquiry.productItem?.title || selectedInquiry.serviceType || 'General Consultation'}
                  </span>
                </div>
              </div>

              {/* Message Payload */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                  Client Confidential Brief
                </span>
                <div className="p-4 bg-white border border-[#DDD7CD] text-sm text-[#333] leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Quick Bar in Modal */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8E3DA]">
                <span className="text-xs text-[#78716C]">Update Liaison Status:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={selectedInquiry.status === 'PENDING' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedInquiry.id, 'PENDING')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={selectedInquiry.status === 'REVIEWED' ? 'luxury' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedInquiry.id, 'REVIEWED')}
                  >
                    Consulting
                  </Button>
                  <Button
                    variant={selectedInquiry.status === 'RESOLVED' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(selectedInquiry.id, 'RESOLVED')}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
