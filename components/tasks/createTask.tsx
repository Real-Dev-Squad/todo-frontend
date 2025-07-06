"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, Users, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const PREDEFINED_LABELS = [
  "Bug",
  "Enhancement",
  "Feature",
  "Documentation",
  "Research",
  "Support",
];

interface TaskFormData {
  taskName: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

const taskSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
});

export default function CreateTaskModal() {
  const [open, setOpen] = useState(false);
  const [labelPopoverOpen, setLabelPopoverOpen] = useState(false);
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [tags, setTags] = useState<{ name: string; color: string }[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#000000");

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      description: "",
      dueDate: "",
      status: "",
      priority: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Task created:", {
      ...data,
      labels: selectedLabels,
      tags,
    });
    setOpen(false);
    form.reset();
    setSelectedLabels([]);
    setTags([]);
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
    setSelectedLabels([]);
    setTags([]);
  };

  const handleLabelSelect = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleRemoveLabel = (label: string) => {
    setSelectedLabels((prev) => prev.filter((l) => l !== label));
  };

  const handleAddTag = () => {
    if (tagName.trim() && tagColor) {
      setTags((prev) => [...prev, { name: tagName.trim(), color: tagColor }]);
      setTagName("");
      setTagColor("#000000");
      setTagPopoverOpen(false);
    }
  };

  const handleRemoveTag = (name: string) => {
    setTags((prev) => prev.filter((t) => t.name !== name));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-medium">Task name</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="px-6 py-4 space-y-4">
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-600">
                      Task name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task name"
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-600">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description"
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">
                        Due
                      </FormLabel>
                      <FormControl>
                        <Input type="date" className="text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-600">
                        Priority
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Selected Labels */}
              {selectedLabels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedLabels.map((label) => (
                    <Badge
                      key={label}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {label}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveLabel(label)}
                        aria-label={`Remove label ${label}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.name}
                      variant="outline"
                      className="flex items-center gap-1"
                      style={{
                        backgroundColor: tag.color,
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      {tag.name}
                      <button
                        type="button"
                        className="ml-1 text-white hover:text-red-200"
                        onClick={() => handleRemoveTag(tag.name)}
                        aria-label={`Remove tag ${tag.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-6">
                {/* Add Label Popover */}
                <Popover
                  open={labelPopoverOpen}
                  onOpenChange={setLabelPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Tag className="h-4 w-4" />
                      Add Label
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-48 p-2">
                    <div className="flex flex-col gap-1">
                      {PREDEFINED_LABELS.map((label) => (
                        <button
                          key={label}
                          type="button"
                          className={`text-left px-2 py-1 rounded hover:bg-gray-100 w-full ${
                            selectedLabels.includes(label)
                              ? "bg-blue-100 text-blue-700"
                              : ""
                          }`}
                          onClick={() => handleLabelSelect(label)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Add Tag Popover */}
                <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Tag className="h-4 w-4" />
                      Add Tag
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-64 p-4">
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="Tag name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        className="text-base"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Color:</span>
                        <Input
                          type="color"
                          value={tagColor}
                          onChange={(e) => setTagColor(e.target.value)}
                          className="w-8 h-8 p-0 border-none bg-transparent"
                          style={{ minWidth: 32 }}
                        />
                        <span className="text-xs text-gray-600">
                          {tagColor}
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddTag}
                        disabled={!tagName.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Add Team Button (no popover for now) */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Users className="h-4 w-4" />
                  Add Team
                </Button>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="text-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
