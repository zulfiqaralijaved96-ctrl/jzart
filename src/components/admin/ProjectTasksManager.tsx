"use client";

import React, { useState } from "react";
import { Checkbox, Input, Button, Space, List, message } from "antd";
import { toggleTaskStatus, addProjectTask, deleteProjectTask } from "@/app/actions/project";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

interface ProjectTasksManagerProps {
  projectId: string;
  initialTasks: Task[];
  onTasksUpdate?: () => void;
}

export default function ProjectTasksManager({ projectId, initialTasks, onTasksUpdate }: ProjectTasksManagerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleToggle = async (taskId: string, checked: boolean) => {
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: checked } : t));
    
    const res = await toggleTaskStatus(taskId, checked, projectId);
    if (!res.success) {
      message.error(res.error || "Failed to update task status.");
      // Rollback
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !checked } : t));
    } else {
      if (onTasksUpdate) onTasksUpdate();
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);
    const res = await addProjectTask(projectId, newTaskTitle.trim());
    setLoading(false);

    if (res.success) {
      message.success("Checklist task added successfully!");
      setNewTaskTitle("");
      if (onTasksUpdate) onTasksUpdate();
      // Wait for revalidation or manually reload
      window.location.reload();
    } else {
      message.error(res.error || "Failed to add task.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm("Remove this checklist item?")) {
      const res = await deleteProjectTask(taskId, projectId);
      if (res.success) {
        message.success("Task deleted successfully!");
        setTasks(prev => prev.filter(t => t.id !== taskId));
        if (onTasksUpdate) onTasksUpdate();
      } else {
        message.error(res.error || "Failed to delete task.");
      }
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-gray-800">Manufacturing Checklist</h3>
        <span className="text-xs font-bold text-slate-400">
          {tasks.filter(t => t.isCompleted).length} of {tasks.length} Completed
        </span>
      </div>

      {/* Checklist list */}
      <List
        size="small"
        dataSource={tasks}
        renderItem={task => (
          <List.Item 
            actions={[
              <Button 
                key="delete" 
                type="link" 
                size="small" 
                danger 
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </Button>
            ]}
          >
            <Checkbox 
              checked={task.isCompleted} 
              onChange={(e) => handleToggle(task.id, e.target.checked)}
              className={`text-slate-700 text-sm ${task.isCompleted ? 'line-through text-slate-400' : ''}`}
            >
              {task.title}
            </Checkbox>
          </List.Item>
        )}
        locale={{ emptyText: "No task checkers defined for this build." }}
      />

      {/* Form to add task */}
      <form onSubmit={handleAddTask} className="pt-4 border-t border-gray-100 flex gap-2">
        <Input
          placeholder="Add custom build task item..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={loading}
        />
        <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 font-bold">
          Add
        </Button>
      </form>
    </div>
  );
}
