"use client";

import React, { useState, useMemo } from "react";
import { Table, Space, Button, Drawer, Form, Input, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { updateClient, deleteClient } from "@/app/actions/client";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  status: string;
  startDate: Date | null;
  dueDate: Date | null;
};

type Client = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  projects: Project[];
  _count: { projects: number };
};

export default function ClientsTable({ initialData }: { initialData: Client[] }) {
  const [data, setData] = useState<Client[]>(initialData);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Synchronize dynamic initialData changes
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Handle detailed Client Drawer View
  const handleOpenDrawer = (client: Client) => {
    setSelectedClient(client);
    setIsDrawerOpen(true);
  };

  // Handle Client Edit Click
  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    form.setFieldsValue({
      name: client.name,
      email: client.email,
      company: client.company,
      phone: client.phone,
      address: client.address,
    });
    setIsEditModalOpen(true);
  };

  // Submit Client Edit Form
  const handleEditSubmit = async (values: any) => {
    if (!selectedClient) return;
    setLoading(true);
    const res = await updateClient(selectedClient.id, values);
    setLoading(false);
    
    if (res.success) {
      message.success("Client metadata updated successfully!");
      setIsEditModalOpen(false);
      // Optimistically update table data
      setData(prev => prev.map(item => item.id === selectedClient.id ? { ...item, ...values } : item));
      if (isDrawerOpen) {
        setSelectedClient(prev => prev ? { ...prev, ...values } : null);
      }
    } else {
      message.error(res.error || "Failed to update client.");
    }
  };

  // Delete Client Handler
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client? This will cascade delete all linked projects and quotes!")) {
      const res = await deleteClient(id);
      if (res.success) {
        message.success("Client account removed successfully!");
        setData(prev => prev.filter(item => item.id !== id));
        if (selectedClient?.id === id) {
          setIsDrawerOpen(false);
        }
      } else {
        message.error(res.error || "Failed to remove client.");
      }
    }
  };

  // Search Filter
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [data, searchText]);

  const columns: ColumnsType<Client> = [
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
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => text || "—",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "—",
    },
    {
      title: "Projects Completed",
      dataIndex: ["_count", "projects"],
      key: "projectsCount",
      render: (count) => (
        <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full text-xs">
          {count} Build{count !== 1 ? 's' : ''}
        </span>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => handleOpenDrawer(record)}>View Details</Button>
          <Button type="link" size="small" onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
        <Input.Search
          placeholder="Search by client name, email, or company..."
          className="max-w-md w-full"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="text-xs font-semibold text-slate-400">
          Showing {filteredData.length} client accounts
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No clients found." }}
      />

      {/* Slide-out Drawer for Client Information Details */}
      <Drawer
        title="Client Corporate Account"
        placement="right"
        size="default"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => handleEditClick(selectedClient!)}>Edit Details</Button>
          </Space>
        }
      >
        {selectedClient && (
          <div className="space-y-6">
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Client Representative</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedClient.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Corporate Email</span>
                <p className="text-sm text-slate-700 mt-1">{selectedClient.email}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Office Phone</span>
                <p className="text-sm text-slate-700 mt-1">{selectedClient.phone || "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Company / Organization</span>
                <p className="text-sm text-slate-800 font-semibold mt-1">{selectedClient.company || "Individual / Private Buyer"}</p>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Delivery / Billing Address</span>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedClient.address || "No corporate billing address provided."}
              </p>
            </div>

            <div className="border-t border-slate-100 my-4 pt-4">
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-3">Linked Projects ({selectedClient.projects?.length || 0})</span>
              
              {selectedClient.projects && selectedClient.projects.length > 0 ? (
                <div className="space-y-3 mt-3">
                  {selectedClient.projects.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex justify-between items-center transition-colors"
                    >
                      <div>
                        <h5 className="font-semibold text-sm text-slate-850">{proj.title}</h5>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Start Date: {proj.startDate ? new Date(proj.startDate).toLocaleDateString() : "Pending"}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${proj.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                          proj.status === 'PLANNING' ? 'bg-amber-100 text-amber-800' :
                          proj.status === 'DESIGN' ? 'bg-purple-100 text-purple-800' :
                          proj.status === 'PRODUCTION' ? 'bg-blue-100 text-blue-800' :
                          proj.status === 'QUALITY_CHECK' ? 'bg-yellow-100 text-yellow-800' :
                          proj.status === 'READY' ? 'bg-lime-100 text-lime-800' :
                          proj.status === 'DELIVERED' ? 'bg-cyan-100 text-cyan-800' :
                          'bg-slate-100 text-slate-800'}`}>
                        {proj.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 mt-2 italic">No custom mascot or bouncer builds active for this client.</p>
              )}
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-between">
              <Button danger onClick={() => handleDelete(selectedClient.id)}>
                Delete Client Account
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Edit Form Modal */}
      <Modal
        title="Edit Client Information"
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
          <div className="space-y-4">
            <Form.Item name="name" label="Representative Full Name" rules={[{ required: true, message: "Please enter a representative name" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="company" label="Company / Team Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Contact Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Office Phone">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Physical Shipping / Billing Address">
              <Input.TextArea rows={3} placeholder="Street, City, State, ZIP, Country" />
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
