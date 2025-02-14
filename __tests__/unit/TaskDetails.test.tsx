import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Task } from "@/app/types/tasks";
import TaskDetails from "@/components/TaskDetails";

beforeEach(() => {
    cleanup();
});

afterEach(() => {
    vi.restoreAllMocks();
});

test("renders TaskDetails component with initial data", () => {
    const mockOnAcknowledge = vi.fn();
    const mockOnClose = vi.fn();

    const initialData: Task = {
        id: "1",
        title: "Sample Task",
        description: "This is a test task description.",
        dueDate: "2024-12-31T23:59:59Z",
        assignee: "John Doe",
        status: "Pending",
        tags: "Urgent",
        taskId: "12345",
    };

    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    expect(screen.getByText("Sample Task")).not.toBeNull();
    expect(screen.getByText("This is a test task description.")).not.toBeNull();
    expect(screen.getByText("Pending")).not.toBeNull();
    expect(screen.getByText("John Doe")).not.toBeNull();
    expect(screen.getByText("#12345")).not.toBeNull();
});

test("calls onAcknowledge when Acknowledge button is clicked", () => {
    const mockOnAcknowledge = vi.fn();
    const mockOnClose = vi.fn();
    const initialData: Task = {
        id: "1",
        title: "Sample Task",
        description: "Test description.",
        dueDate: "2024-12-31T23:59:59Z",
        assignee: "John Doe",
        status: "Pending",
        tags: "Urgent",
        taskId: "12345",
    };

    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Acknowledge"));
    expect(mockOnAcknowledge).toHaveBeenCalledTimes(1);
});

test("calls onClose when close button is clicked", () => {
    const mockOnAcknowledge = vi.fn();
    const mockOnClose = vi.fn();
    const initialData: Task = {
        id: "1",
        title: "Sample Task",
        description: "Test description.",
        dueDate: "2024-12-31T23:59:59Z",
        assignee: "John Doe",
        status: "Pending",
        tags: "Urgent",
        taskId: "12345",
    };

    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("X"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test("switches activity tabs when clicked", () => {
    const mockOnAcknowledge = vi.fn();
    const mockOnClose = vi.fn();
    const initialData: Task = {
        id: "1",
        title: "Sample Task",
        description: "Test description.",
        dueDate: "2024-12-31T23:59:59Z",
        assignee: "John Doe",
        status: "Pending",
        tags: "Urgent",
        taskId: "12345",
    };

    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("History"));
    const historyTab = screen.getByText("History");
    expect(historyTab.classList.contains("border-indigo-500")).toBe(true);
    expect(historyTab.classList.contains("text-indigo-600")).toBe(true);

    fireEvent.click(screen.getByText("Comments"));
    const commentsTab = screen.getByText("Comments");
    expect(commentsTab.classList.contains("border-indigo-500")).toBe(true);
    expect(commentsTab.classList.contains("text-indigo-600")).toBe(true);
});