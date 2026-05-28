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
};

export default function LeadsTable({ initialData }: { initialData: Lead[] }) {
  const [data, setData] = useState<Lead[]>(initialData);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
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
      return matchesSearch && matchesStatus;
    });
  }, [data, searchText, statusFilter]);

  const columns: ColumnsType<Lead> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <button 
          onClick={() => handleOpenDrawer(record)} 
          className="text-left font-bold text-slate-800 hover:text-blue-600 cursor-pointer block"
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
      title: "Mascot Type",
      dataIndex: "mascotType",
      key: "mascotType",
      render: (text) => text || "—",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (text) => text || "—",
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
        )}
      </Drawer>

      {/* Edit Form Modal */}
      <Modal
        title="Edit Lead Parameters"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnClose
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
