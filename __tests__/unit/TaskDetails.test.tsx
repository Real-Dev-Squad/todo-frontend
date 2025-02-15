import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import TaskDetails from "@/components/TaskDetails";
import { initialData } from "../utils/constants/Task";

let mockOnAcknowledge: () => void;
let mockOnClose: () => void;

beforeEach(() => {
    mockOnAcknowledge = vi.fn();
    mockOnClose = vi.fn();
    cleanup();
});

afterEach(() => {
    vi.restoreAllMocks();
});

test("should renders TaskDetails component with initial data", () => {
    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);
    expect(screen.getByText("Sample Task")).not.toBeNull();
    expect(screen.getByText("This is a test task description.")).not.toBeNull();
    expect(screen.getByText("Pending")).not.toBeNull();
    expect(screen.getByText("John Doe")).not.toBeNull();
    expect(screen.getByText("#12345")).not.toBeNull();
});

test("should calls onAcknowledge when Acknowledge button is clicked", () => {
    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Acknowledge"));
    expect(mockOnAcknowledge).toHaveBeenCalledTimes(1);
});

test("should calls onClose when close button is clicked", () => {
    render(<TaskDetails onAcknowledge={mockOnAcknowledge} initialData={initialData} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("X"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test("should switches activity tabs when clicked", () => {
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