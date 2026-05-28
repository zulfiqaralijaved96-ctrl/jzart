"use client";

import React, { useState, useMemo } from "react";
import { Table, Space, Button, Tag, Modal, Form, Input, Select, DatePicker, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createProject, deleteProject, updateProject } from "@/app/actions/project";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  clientId: string;
  title: string;
  status: string;
  startDate: Date | null;
  dueDate: Date | null;
  client?: { name: string; company: string | null } | null;
};

type ClientSelector = { id: string; name: string };

interface ProjectsTableProps {
  items: Project[];
  clients: ClientSelector[];
}

export default function ProjectsTable({ items, clients }: ProjectsTableProps) {
  const router = useRouter();
  const [data, setData] = useState<Project[]>(items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Sync state with incoming initial data changes
  React.useEffect(() => {
    setData(items);
  }, [items]);

  const handleAddClick = () => {
    setEditingProject(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    form.setFieldsValue({
      title: project.title,
      clientId: project.clientId,
      status: project.status,
      startDate: project.startDate ? dayjs(project.startDate) : null,
      dueDate: project.dueDate ? dayjs(project.dueDate) : null,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      title: values.title,
      clientId: values.clientId,
      status: values.status,
      startDate: values.startDate ? values.startDate.toISOString() : null,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    };

    let res;
    if (editingProject) {
      res = await updateProject(editingProject.id, payload);
    } else {
      res = await createProject(payload);
    }
    setLoading(false);

    if (res.success) {
      message.success(editingProject ? "Project updated successfully!" : "Project created successfully! Default manufacturing checklist seeded.");
      setIsModalOpen(false);
      // Instantly refresh server data without full browser reload
      router.refresh();
    } else {
      message.error(res.error || "Failed to save project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? All tasks and uploaded media will be deleted permanently!")) {
      const res = await deleteProject(id);
      if (res.success) {
        message.success("Project deleted successfully!");
        setData(prev => prev.filter(item => item.id !== id));
      } else {
        message.error(res.error || "Failed to delete project.");
      }
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const clientName = item.client?.name || "";
      const companyName = item.client?.company || "";
      const matchesSearch = 
        item.title.toLowerCase().includes(searchText.toLowerCase()) || 
        clientName.toLowerCase().includes(searchText.toLowerCase()) ||
        companyName.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchText, statusFilter]);

  const columns: ColumnsType<Project> = [
    {
      title: "Project Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link href={`/projects/${record.id}`} className="font-bold text-slate-800 hover:text-blue-600 cursor-pointer block">
          {text}
        </Link>
      ),
    },
    {
      title: "Corporate Client",
      key: "client",
      render: (_, record) => (
        <div>
          <p className="font-semibold text-slate-700">{record.client?.name || "—"}</p>
          {record.client?.company && <span className="text-xs text-slate-400 font-medium">{record.client.company}</span>}
        </div>
      ),
    },
    {
      title: "Manufacturing Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "PLANNING") color = "orange";
        if (status === "DESIGN") color = "purple";
        if (status === "PRODUCTION") color = "processing";
        if (status === "QUALITY_CHECK") color = "gold";
        if (status === "READY") color = "lime";
        if (status === "DELIVERED") color = "cyan";
        if (status === "COMPLETED") color = "success";
        return <Tag color={color} className="font-bold">{status}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => date ? new Date(date).toLocaleDateString() : "Pending",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => date ? new Date(date).toLocaleDateString() : "Pending",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/projects/${record.id}`}>
            <Button type="link" size="small">Workspace</Button>
          </Link>
          <Button type="link" size="small" onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header operations */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
        <div className="flex gap-4 w-full sm:w-auto items-center">
          <Input.Search
            placeholder="Search by title, client, or company..."
            className="w-64"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="ALL"
            className="w-48"
            onChange={setStatusFilter}
            options={[
              { value: "ALL", label: "All Statuses" },
              { value: "PLANNING", label: "PLANNING" },
              { value: "DESIGN", label: "DESIGN" },
              { value: "PRODUCTION", label: "PRODUCTION" },
              { value: "QUALITY_CHECK", label: "QUALITY_CHECK" },
              { value: "READY", label: "READY" },
              { value: "DELIVERED", label: "DELIVERED" },
              { value: "COMPLETED", label: "COMPLETED" },
            ]}
          />
        </div>
        <Button 
          type="primary" 
          onClick={handleAddClick}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-bold"
        >
          + Add New Project
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No active projects found." }}
      />

      {/* Add / Edit Form Modal */}
      <Modal
        title={editingProject ? "Edit Project Details" : "Launch New Custom Build Project"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
          initialValues={{
            status: "PLANNING",
          }}
        >
          <Form.Item label="Project / Custom Build Title" name="title" rules={[{ required: true, message: "Please enter a project title" }]}>
            <Input placeholder="e.g. Castle Bouncer for Wilson Group" />
          </Form.Item>

          <Form.Item label="Link Corporate Client Account" name="clientId" rules={[{ required: true, message: "Please select client" }]}>
            <Select 
              options={clients.map(c => ({ value: c.id, label: c.name }))}
              placeholder="Select client representative..." 
              showSearch 
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item label="Manufacturing Status" name="status" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "PLANNING", label: "PLANNING (Specifications)" },
                { value: "DESIGN", label: "DESIGN (Conceptual Blueprinting)" },
                { value: "PRODUCTION", label: "PRODUCTION (Active Stitching & Build)" },
                { value: "QUALITY_CHECK", label: "QUALITY_CHECK (Testing & QC)" },
                { value: "READY", label: "READY (Finished & Packed)" },
                { value: "DELIVERED", label: "DELIVERED (En Route / Handed Over)" },
                { value: "COMPLETED", label: "COMPLETED (Archived & Closed)" },
              ]}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Production Start Date" name="startDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Project Target Due Date" name="dueDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end gap-2 mb-0 mt-6 pt-4 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Save Project</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
