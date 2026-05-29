"use client";

import React, { useState, useMemo } from "react";
import { Table, Tag, Space, Button, Drawer, Form, Input, Select, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { updateLead, deleteLead, convertLeadToClient } from "@/app/actions/lead";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  mascotType: string | null;
  budget: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
  
  // Additive Events Fields
  websiteSource?: string | null;
  serviceType?: string | null;
  eventType?: string | null;
  eventDate?: Date | null;
  eventTime?: string | null;
  eventLocation?: string | null;
  setupLocation?: string | null;
  city?: string | null;
  guestCount?: number | null;
  childAge?: string | null;
  eventDuration?: string | null;
  selectedPackage?: string | null;
  selectedTheme?: string | null;
  selectedAddons?: string | null;
  productType?: string | null;
  budgetRange?: string | null;
  referenceImageUrl?: string | null;

  // Logistics
  deliveryArea?: string | null;
  deliveryCharges?: any | null;
  setupFloor?: string | null;
  elevatorAvailable?: boolean | null;
  parkingAvailable?: boolean | null;
  accessNotes?: string | null;
  setupSpaceAvailable?: string | null;
  powerAvailable?: boolean | null;

  // Finance
  advanceRequired?: any | null;
  advanceReceived?: any | null;
  balanceDue?: any | null;
  paymentStatus?: string | null;
  paymentMethod?: string | null;
  paymentReference?: string | null;
};

export default function LeadsTable({ initialData }: { initialData: Lead[] }) {
  const [data, setData] = useState<Lead[]>(initialData);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Synchronize dynamic initialData changes
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Handle detailed Lead Drawer View
  const handleOpenDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  // Handle Lead Edit Click
  const handleEditClick = (lead: Lead) => {
    setSelectedLead(lead);
    form.setFieldsValue({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      mascotType: lead.mascotType,
      budget: lead.budget,
      status: lead.status,
      notes: lead.notes,
    });
    setIsEditModalOpen(true);
  };

  // Submit Lead Edit Form
  const handleEditSubmit = async (values: any) => {
    if (!selectedLead) return;
    setLoading(true);
    const res = await updateLead(selectedLead.id, values);
    setLoading(false);
    
    if (res.success) {
      message.success("Lead updated successfully!");
      setIsEditModalOpen(false);
      // Optimistically update table data
      setData(prev => prev.map(item => item.id === selectedLead.id ? { ...item, ...values } : item));
      if (isDrawerOpen) {
        setSelectedLead(prev => prev ? { ...prev, ...values } : null);
      }
    } else {
      message.error(res.error || "Failed to update lead.");
    }
  };

  // Delete Lead Handler
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const res = await deleteLead(id);
      if (res.success) {
        message.success("Lead deleted successfully!");
        setData(prev => prev.filter(item => item.id !== id));
        if (selectedLead?.id === id) {
          setIsDrawerOpen(false);
        }
      } else {
        message.error(res.error || "Failed to delete lead.");
      }
    }
  };

  // Convert Lead to Client Pipeline
  const handleConvert = async (leadId: string) => {
    setLoading(true);
    const res = await convertLeadToClient(leadId);
    setLoading(false);
 
    if (res.success) {
      message.success("Lead successfully converted to Client! Initial project created in PLANNING stage.");
      setIsDrawerOpen(false);
      // Optimistically update status to WON
      setData(prev => prev.map(item => item.id === leadId ? { ...item, status: "WON" } : item));
    } else {
      message.error(res.error || "Failed to convert lead.");
    }
  };

  // Filter Data Dynamically
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        (item.company && item.company.toLowerCase().includes(searchText.toLowerCase()));
      
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      const itemSource = item.websiteSource || "JZ_ARTS";
      const matchesSource = sourceFilter === "ALL" || itemSource === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [data, searchText, statusFilter, sourceFilter]);

  const columns: ColumnsType<Lead> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <button 
          onClick={() => handleOpenDrawer(record)} 
          className="text-left font-bold text-slate-800 hover:text-orange-600 cursor-pointer block"
        >
          {text}
        </button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => text || "—",
    },
    {
      title: "Category / Package",
      key: "categoryPackage",
      render: (_, record) => {
        if (record.websiteSource === "JZ_EVENTS") {
          return (
            <span className="font-semibold text-indigo-700">
              {record.selectedPackage || "Custom Event"}
            </span>
          );
        }
        return <span className="text-slate-600 font-medium">{record.mascotType || "—"}</span>;
      }
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (text, record) => record.budgetRange || text || "—",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "blue";
        if (status === "NEW") color = "gold";
        if (status === "CONTACTED") color = "cyan";
        if (status === "QUALIFIED") color = "blue";
        if (status === "QUOTED") color = "purple";
        if (status === "WON") color = "green";
        if (status === "LOST") color = "red";
        
        return (
          <Tag color={color} key={status} className="font-bold">
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => handleOpenDrawer(record)}>View</Button>
          <Button type="link" size="small" onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Source Pipeline Tabs */}
      <div className="flex border-b border-slate-200 mb-6 bg-slate-50 p-1.5 rounded-xl max-w-lg border border-slate-100">
        <button
          onClick={() => setSourceFilter("ALL")}
          className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
            sourceFilter === "ALL" 
              ? "bg-white text-orange-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          All Leads ({data.length})
        </button>
        <button
          onClick={() => setSourceFilter("JZ_ARTS")}
          className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
            sourceFilter === "JZ_ARTS" 
              ? "bg-white text-orange-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          JZ Mascots ({data.filter(item => (item.websiteSource || "JZ_ARTS") === "JZ_ARTS").length})
        </button>
        <button
          onClick={() => setSourceFilter("JZ_EVENTS")}
          className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
            sourceFilter === "JZ_EVENTS" 
              ? "bg-white text-orange-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          JZ Events ({data.filter(item => item.websiteSource === "JZ_EVENTS").length})
        </button>
      </div>

      {/* Search & Filter Options */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
        <Input.Search
          placeholder="Search by name, email, or company..."
          className="max-w-md w-full"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">Filter Status:</span>
          <Select
            defaultValue="ALL"
            className="w-40"
            onChange={setStatusFilter}
            options={[
              { value: "ALL", label: "All Statuses" },
              { value: "NEW", label: "NEW" },
              { value: "CONTACTED", label: "CONTACTED" },
              { value: "QUALIFIED", label: "QUALIFIED" },
              { value: "QUOTED", label: "QUOTED" },
              { value: "WON", label: "WON" },
              { value: "LOST", label: "LOST" },
            ]}
          />
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No active leads found." }}
      />

      {/* Slide-out Drawer for Details */}
      <Drawer
        title="Lead Information Details"
        placement="right"
        size="default"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => handleEditClick(selectedLead!)}>Edit</Button>
            {selectedLead?.status !== "QUALIFIED" && selectedLead?.status !== "WON" && (
              <Button type="primary" onClick={() => handleConvert(selectedLead!.id)} loading={loading}>
                Convert to Client
              </Button>
            )}
          </Space>
        }
      >
        {selectedLead && (
          selectedLead.websiteSource === "JZ_EVENTS" ? (
            <div className="space-y-6">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Name</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedLead.name}</h3>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                  JZ Events Lead
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Email</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.email}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Phone (WhatsApp)</span>
                  <p className="text-sm text-slate-700 mt-1 font-semibold text-slate-900">{selectedLead.phone || "—"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Company</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.company || "—"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Event Type</span>
                  <p className="text-sm text-slate-700 mt-1 font-semibold text-slate-900">{selectedLead.eventType || "—"}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Event Schedule & Setup</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Date & Time</span>
                    <p className="text-sm text-slate-700 mt-1 font-medium text-slate-950">
                      {selectedLead.eventDate ? new Date(selectedLead.eventDate).toLocaleDateString() : "—"} {selectedLead.eventTime ? `at ${selectedLead.eventTime}` : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">City & Location</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.eventLocation ? `${selectedLead.eventLocation}, ${selectedLead.city || "Karachi"}` : "—"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Setup Venue Type</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.setupLocation || "—"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Delivery Area</span>
                    <p className="text-sm text-slate-700 mt-1 font-medium text-indigo-700">{selectedLead.deliveryArea || "—"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Guest Count</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.guestCount || "—"} guests</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Child Age (Birthday)</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.childAge ? `${selectedLead.childAge} years` : "—"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Site Access Parameters</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Floor / Elevator</span>
                    <p className="text-sm text-slate-700 mt-1">Floor: {selectedLead.setupFloor || "Ground"} {selectedLead.elevatorAvailable ? "(Elevator Yes)" : "(No Elevator)"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Parking & Access Notes</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.parkingAvailable ? "Parking OK" : "No Parking"} {selectedLead.accessNotes ? `| ${selectedLead.accessNotes}` : ""}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Setup Space Dimensions</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.setupSpaceAvailable || "—"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Power Available</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.powerAvailable ? "Yes, Outlets Ready" : "No Power (Gen required)"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Selected Package & Theme</h4>
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 space-y-3">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Package Tier</span>
                    <p className="text-base font-bold text-slate-900 mt-0.5">{selectedLead.selectedPackage || "Custom Setup"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Theme Concept</span>
                    <p className="text-base font-bold text-indigo-700 mt-0.5">{selectedLead.selectedTheme || "Custom Concept"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Add-on Selection Checklist</span>
                <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed text-sm text-slate-700">
                  {selectedLead.selectedAddons ? (
                    (() => {
                      try {
                        const addons = JSON.parse(selectedLead.selectedAddons);
                        if (Array.isArray(addons) && addons.length > 0) {
                          return (
                            <ul className="space-y-1.5 list-disc list-inside">
                              {addons.map((addon: any, i: number) => (
                                <li key={i} className="font-semibold text-slate-800">
                                  {addon.addonName} <span className="text-xs text-slate-500 font-medium">({addon.category})</span> x{addon.quantity || 1}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                      } catch (e) {}
                      return <p className="text-slate-500 text-xs italic">{selectedLead.selectedAddons}</p>;
                    })()
                  ) : (
                    <span className="text-xs text-slate-400 italic">No add-ons selected.</span>
                  )}
                </div>
              </div>

              {/* Event Operations Checklist */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold mb-2">Event Operations Checklist</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedLead.status === "WON" ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className={selectedLead.status === "WON" ? "line-through text-slate-400 font-semibold" : "text-slate-700 font-bold"}>
                      Client Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedLead.paymentStatus && selectedLead.paymentStatus !== "UNPAID" ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className={selectedLead.paymentStatus && selectedLead.paymentStatus !== "UNPAID" ? "line-through text-slate-400 font-semibold" : "text-slate-700 font-bold"}>
                      Advance Received
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedLead.selectedTheme ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className={selectedLead.selectedTheme ? "line-through text-slate-400 font-semibold" : "text-slate-700 font-bold"}>
                      Theme Finalized
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedLead.selectedAddons ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className={selectedLead.selectedAddons ? "line-through text-slate-400 font-semibold" : "text-slate-700 font-bold"}>
                      Inventory Assigned
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-slate-700 font-bold">Staff Assigned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-slate-700 font-bold">Transport Arranged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-slate-700 font-bold">Setup Completed on Venue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-slate-700 font-bold">Event Live</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-slate-700 font-bold">Teardown Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedLead.paymentStatus === "FULLY_PAID" ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className={selectedLead.paymentStatus === "FULLY_PAID" ? "line-through text-slate-400 font-semibold" : "text-slate-700 font-bold"}>
                      Balance Collected
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Payment & Booking Tracking</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Budget Range / Total Quote</span>
                    <p className="text-sm text-slate-700 mt-1 font-bold">{selectedLead.budgetRange || selectedLead.budget || "—"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Payment Status</span>
                    <div className="mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider
                        ${selectedLead.paymentStatus === 'FULLY_PAID' ? 'bg-green-100 text-green-800' : 
                          selectedLead.paymentStatus === 'ADVANCE_RECEIVED' ? 'bg-blue-100 text-blue-800' :
                          selectedLead.paymentStatus === 'PARTIAL_PAID' ? 'bg-cyan-100 text-cyan-800' : 
                          'bg-amber-100 text-amber-800'}`}>
                        {selectedLead.paymentStatus || "UNPAID"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Deposit Received / Due</span>
                    <p className="text-sm text-slate-700 mt-1">
                      Rec: Rs. {selectedLead.advanceReceived ? String(selectedLead.advanceReceived) : "0.00"} | Due: Rs. {selectedLead.balanceDue ? String(selectedLead.balanceDue) : "0.00"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider font-semibold">Method / Reference</span>
                    <p className="text-sm text-slate-700 mt-1">{selectedLead.paymentMethod || "—"} {selectedLead.paymentReference ? `(Ref: ${selectedLead.paymentReference})` : ""}</p>
                  </div>
                </div>
              </div>

              {selectedLead.referenceImageUrl && (
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Inspiration / Reference Image</span>
                  <div className="mt-2 relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <img src={selectedLead.referenceImageUrl} alt="Event Inspiration" className="max-h-48 object-contain" />
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Inquiry Notes & Details</span>
                <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed min-h-[80px]">
                  {selectedLead.notes || "No additional follow-up notes provided."}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Submission Date</span>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div className="pt-6 border-t border-slate-100 flex justify-between">
                <Button danger onClick={() => handleDelete(selectedLead.id)}>
                  Delete Lead
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Name</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedLead.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Email</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.email}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Phone</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.phone || "—"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Company</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.company || "—"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Mascot Category Type</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.mascotType || "—"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Budget Range</span>
                  <p className="text-sm text-slate-700 mt-1">{selectedLead.budget || "—"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Current Pipeline Status</span>
                  <div className="mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider
                      ${selectedLead.status === 'NEW' ? 'bg-amber-100 text-amber-800' : 
                        selectedLead.status === 'CONTACTED' ? 'bg-cyan-100 text-cyan-800' :
                        selectedLead.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' : 
                        selectedLead.status === 'QUOTED' ? 'bg-purple-100 text-purple-800' : 
                        selectedLead.status === 'WON' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 my-4 pt-4">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Inquiry Notes & Details</span>
                <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed min-h-[80px]">
                  {selectedLead.notes || "No additional follow-up notes provided."}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Submission Date</span>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div className="pt-6 border-t border-slate-100 flex justify-between">
                <Button danger onClick={() => handleDelete(selectedLead.id)}>
                  Delete Lead
                </Button>
              </div>
            </div>
          )
        )}
      </Drawer>

      {/* Edit Form Modal */}
      <Modal
        title="Edit Lead Parameters"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          className="mt-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter a name" }]} className="col-span-2">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="company" label="Company / Team">
              <Input />
            </Form.Item>
            <Form.Item name="mascotType" label="Mascot Type">
              <Input />
            </Form.Item>
            <Form.Item name="budget" label="Budget Range">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Pipeline Status" rules={[{ required: true }]}>
              <Select
                options={[
                  { value: "NEW", label: "NEW" },
                  { value: "CONTACTED", label: "CONTACTED" },
                  { value: "QUALIFIED", label: "QUALIFIED" },
                  { value: "QUOTED", label: "QUOTED" },
                  { value: "WON", label: "WON" },
                  { value: "LOST", label: "LOST" },
                ]}
              />
            </Form.Item>
            <Form.Item name="notes" label="Notes / Follow-up Details" className="col-span-2">
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end gap-2 mb-0 mt-6 pt-4 border-t border-slate-100">
            <Button onClick={() => setIsEditModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Save Settings</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
