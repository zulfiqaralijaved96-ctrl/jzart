"use client";

import React, { useState, useMemo } from "react";
import { Table, Space, Button, Tag, Drawer, Modal, Form, Input, Select, InputNumber, DatePicker, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createQuote, updateQuote, deleteQuote } from "@/app/actions/quote";
import dayjs from "dayjs";

type Quote = {
  id: string;
  leadId: string | null;
  clientId: string | null;
  total: number;
  status: string;
  items: string | null;
  expireAt: Date | null;
  createdAt: Date;
  lead?: { name: string } | null;
  client?: { name: string } | null;
};

type LeadsSelector = { id: string; name: string };
type ClientsSelector = { id: string; name: string };

interface QuotesTableProps {
  items: Quote[];
  leads: LeadsSelector[];
  clients: ClientsSelector[];
}

export default function QuotesTable({ items, leads, clients }: QuotesTableProps) {
  const [data, setData] = useState<Quote[]>(items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Synchronize dynamic initial data changes
  React.useEffect(() => {
    setData(items);
  }, [items]);

  const handleOpenDrawer = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsDrawerOpen(true);
  };

  const handleAddClick = () => {
    setSelectedQuote(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditClick = (quote: Quote) => {
    setSelectedQuote(quote);
    form.setFieldsValue({
      targetType: quote.clientId ? "CLIENT" : "LEAD",
      targetId: quote.clientId || quote.leadId,
      total: quote.total,
      status: quote.status,
      items: quote.items,
      expireAt: quote.expireAt ? dayjs(quote.expireAt) : null,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      leadId: values.targetType === "LEAD" ? values.targetId : null,
      clientId: values.targetType === "CLIENT" ? values.targetId : null,
      total: values.total,
      status: values.status,
      items: values.items,
      expireAt: values.expireAt ? values.expireAt.toISOString() : null,
    };

    if (selectedQuote) {
      const res = await updateQuote(selectedQuote.id, payload);
      setLoading(false);

      if (res.success) {
        message.success("Quote updated successfully!");
        setIsModalOpen(false);
        setData(prev => prev.map(item => item.id === selectedQuote.id ? { 
          ...item, 
          ...payload,
          lead: payload.leadId ? leads.find(l => l.id === payload.leadId) : null,
          client: payload.clientId ? clients.find(c => c.id === payload.clientId) : null,
        } : item));
        if (isDrawerOpen) {
          setSelectedQuote(prev => prev ? {
            ...prev,
            ...payload,
            lead: payload.leadId ? leads.find(l => l.id === payload.leadId) : null,
            client: payload.clientId ? clients.find(c => c.id === payload.clientId) : null,
          } : null);
        }
      } else {
        message.error(res.error || "Failed to update quote.");
      }
    } else {
      const res = await createQuote(payload);
      setLoading(false);

      if (res.success && res.quote) {
        message.success("Quote created successfully!");
        setIsModalOpen(false);
        const newRecord: Quote = {
          ...res.quote,
          total: Number(res.quote.total),
          lead: payload.leadId ? leads.find(l => l.id === payload.leadId) : null,
          client: payload.clientId ? clients.find(c => c.id === payload.clientId) : null,
        } as any;
        setData(prev => [newRecord, ...prev]);
      } else {
        message.error(res.error || "Failed to create quote.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      const res = await deleteQuote(id);
      if (res.success) {
        message.success("Quote deleted successfully!");
        setData(prev => prev.filter(item => item.id !== id));
        if (selectedQuote?.id === id) {
          setIsDrawerOpen(false);
        }
      } else {
        message.error(res.error || "Failed to delete quote.");
      }
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const name = item.client?.name || item.lead?.name || "";
      const matchesSearch = name.toLowerCase().includes(searchText.toLowerCase()) || item.id.includes(searchText);
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchText, statusFilter]);

  const columns: ColumnsType<Quote> = [
    {
      title: "Quote ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <strong className="font-mono text-xs">{text.substring(0, 8).toUpperCase()}</strong>,
    },
    {
      title: "Prepared For",
      key: "recipient",
      render: (_, record) => {
        if (record.client) {
          return (
            <div>
              <p className="font-bold text-slate-800">{record.client.name}</p>
              <Tag color="cyan">CLIENT</Tag>
            </div>
          );
        }
        if (record.lead) {
          return (
            <div>
              <p className="font-bold text-slate-800">{record.lead.name}</p>
              <Tag color="orange">LEAD INQUIRY</Tag>
            </div>
          );
        }
        return "—";
      },
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (amount) => <span className="font-black text-slate-800">${Number(amount).toLocaleString()}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "DRAFT") color = "default";
        if (status === "SENT") color = "gold";
        if (status === "ACCEPTED") color = "green";
        if (status === "REJECTED") color = "red";
        if (status === "EXPIRED") color = "purple";
        return <Tag color={color} className="font-bold">{status}</Tag>;
      },
    },
    {
      title: "Valid Until",
      dataIndex: "expireAt",
      key: "expireAt",
      render: (date) => date ? new Date(date).toLocaleDateString() : "No Expiry",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => handleOpenDrawer(record)}>Details</Button>
          <Button type="link" size="small" onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
        <div className="flex gap-4 w-full sm:w-auto items-center">
          <Input.Search
            placeholder="Search by recipient or ID..."
            className="w-64"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="ALL"
            className="w-40"
            onChange={setStatusFilter}
            options={[
              { value: "ALL", label: "All Statuses" },
              { value: "DRAFT", label: "DRAFT" },
              { value: "SENT", label: "SENT" },
              { value: "ACCEPTED", label: "ACCEPTED" },
              { value: "REJECTED", label: "REJECTED" },
              { value: "EXPIRED", label: "EXPIRED" },
            ]}
          />
        </div>
        <Button 
          type="primary" 
          onClick={handleAddClick}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-bold"
        >
          + Add New Quote
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No quotes found." }}
      />

      {/* Quote Drawer Details */}
      <Drawer
        title="Quote Technical Details"
        placement="right"
        size="default"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => handleEditClick(selectedQuote!)}>Edit Quote</Button>
          </Space>
        }
      >
        {selectedQuote && (
          <div className="space-y-6">
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Quote ID</span>
              <p className="text-sm font-mono font-bold mt-1 text-slate-700">{selectedQuote.id}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Prepared For</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {selectedQuote.client?.name || selectedQuote.lead?.name || "—"}
              </h3>
              <div className="mt-1">
                <Tag color={selectedQuote.clientId ? "cyan" : "orange"}>
                  {selectedQuote.clientId ? "CLIENT ACCOUNT" : "LEAD INQUIRY"}
                </Tag>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Total Cost Estimate</span>
                <p className="text-xl font-black text-slate-950 mt-1">
                  ${Number(selectedQuote.total).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Status</span>
                <div className="mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider
                    ${selectedQuote.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 
                      selectedQuote.status === 'SENT' ? 'bg-amber-100 text-amber-800' :
                      selectedQuote.status === 'DRAFT' ? 'bg-slate-100 text-slate-800' : 
                      selectedQuote.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                      selectedQuote.status === 'EXPIRED' ? 'bg-purple-100 text-purple-800' : 
                      'bg-rose-100 text-rose-800'}`}>
                    {selectedQuote.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Line Items & Services</span>
              <p className="text-sm text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed min-h-[80px]">
                {selectedQuote.items || "No specific line items cataloged."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Valid Until</span>
                <p className="text-sm text-slate-700 mt-1">
                  {selectedQuote.expireAt ? new Date(selectedQuote.expireAt).toLocaleDateString() : "No Expiration"}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Prepared Date</span>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(selectedQuote.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-between">
              <Button danger onClick={() => handleDelete(selectedQuote.id)}>
                Delete Quote
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add / Edit Form Modal */}
      <Modal
        title={selectedQuote ? "Edit Quote Parameters" : "Prepare New Estimate Quote"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
          initialValues={{
            targetType: "LEAD",
            status: "DRAFT",
            total: 3000,
          }}
        >
          <Form.Item label="Prepared Recipient Type" name="targetType" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "LEAD", label: "Active Lead Inquiries" },
                { value: "CLIENT", label: "Corporate Clients" },
              ]}
            />
          </Form.Item>

          <Form.Item 
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.targetType !== currentValues.targetType}
          >
            {({ getFieldValue }) => {
              const targetType = getFieldValue("targetType");
              const targetOptions = targetType === "CLIENT" 
                ? clients.map(c => ({ value: c.id, label: c.name }))
                : leads.map(l => ({ value: l.id, label: l.name }));

              return (
                <Form.Item 
                  label={targetType === "CLIENT" ? "Select Client Account" : "Select Lead Inbound"} 
                  name="targetId" 
                  rules={[{ required: true, message: "Please select a target recipient" }]}
                >
                  <Select options={targetOptions} placeholder="Select name..." showSearch optionFilterProp="label" />
                </Form.Item>
              );
            }}
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Quote Total Amount ($)" name="total" rules={[{ required: true, message: "Please specify total cost" }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item label="Quote Expiration Date" name="expireAt">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item label="Current Quote Status" name="status" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "DRAFT", label: "DRAFT" },
                { value: "SENT", label: "SENT" },
                { value: "ACCEPTED", label: "ACCEPTED" },
                { value: "REJECTED", label: "REJECTED" },
                { value: "EXPIRED", label: "EXPIRED" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Scope of Work / Custom Items (Details)" name="items">
            <Input.TextArea rows={4} placeholder="e.g. Double-stitched 18oz PVC Jumping Castle build, including 1HP blower, shipping, and custom brand logo..." />
          </Form.Item>

          <Form.Item className="flex justify-end gap-2 mb-0 mt-6 pt-4 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Save Settings</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
