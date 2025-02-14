import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Task } from "@/app/types/tasks";
import TodoForm from "@/components/TodoForm";

// Mock TaskDetails component
vi.mock("./TaskDetails", () => ({
    default: ({ initialData }: { initialData: Task }) => (
        <div data-testid={`task-details-${initialData.id}`}>Mocked Task Details</div>
    ),
}));

const mockInitialData: Task = {
    id: "1",
    title: "Test Todo",
    description: "Test Description",
    dueDate: "2024-02-14T12:00",
    assignee: "@testuser",
    tags: "test",
    taskId: "#test123",
    status: "Todo",
};

const renderTodoForm = (props = {}) => {
    const defaultProps = {
        mode: "create" as "create" | "view" | "edit",
        onSubmit: vi.fn(),
        onClose: vi.fn(),
        onAcknowledge: vi.fn(),
    };
    return render(<TodoForm {...defaultProps} {...props} />);
};

beforeEach(() => {
    vi.clearAllMocks();
});

afterEach(() => {
    cleanup();
});

test("renders create mode with all required fields", () => {
    renderTodoForm();

    const requiredFields = ["Title", "Description", "Due Date", "Assignee", "Task ID"];
    requiredFields.forEach(field => {
        const label = screen.getByText(new RegExp(field));
        expect(label).toBeDefined();
        expect(label.nextElementSibling?.getAttribute("required")).toBe("");
    });

    expect(screen.getByText("Create a Todo")).toBeDefined();
    expect(screen.getByText("Submit")).toBeDefined();
});

test("renders edit mode with initial data", () => {
    renderTodoForm({ mode: "edit", initialData: mockInitialData });

    expect(screen.getByDisplayValue(mockInitialData.title)).toBeDefined();
    expect(screen.getByDisplayValue(mockInitialData.description)).toBeDefined();
    expect(screen.getByDisplayValue(mockInitialData.assignee)).toBeDefined();
    expect(screen.getByDisplayValue(mockInitialData.taskId)).toBeDefined();
    expect(screen.getByText("Edit Todo")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
});

test("renders view mode with TaskDetails component", () => {
    renderTodoForm({
        mode: "view",
        initialData: mockInitialData,
        onAcknowledge: vi.fn()
    });

    expect(screen.getByTestId(`task-details-${mockInitialData.id}`)).toBeDefined();
    expect(screen.queryByText("Create a Todo")).toBeNull();
    expect(screen.queryByText("Edit Todo")).toBeNull();
});

test("submits form with correct data in create mode", () => {
    const mockOnSubmit = vi.fn();
    renderTodoForm({ onSubmit: mockOnSubmit });

    const testData = {
        title: "New Todo",
        description: "New Description",
        dueDate: "2024-02-14",
        assignee: "@newuser",
        taskId: "#new123"
    };

    //fireEvent.change(screen.getByLabelText(/id/i), { target: { value: testData.title } });
    fireEvent.change(screen.getByTestId("title"), { target: { value: testData.title } });
    fireEvent.change(screen.getByTestId("description"), { target: { value: testData.description } });
    fireEvent.change(screen.getByTestId("assignee"), { target: { value: testData.assignee } });
    fireEvent.change(screen.getByTestId("task-id"), { target: { value: testData.taskId } });
    fireEvent.change(screen.getByTestId("due-date"), { target: { value: testData.dueDate } });

    fireEvent.click(screen.getByTestId("task-form-submit-button"));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining(testData));
});

test("closes form when close button is clicked", () => {
    const mockOnClose = vi.fn();
    renderTodoForm({ onClose: mockOnClose });

    fireEvent.click(screen.getByText("X"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test("validates required fields before submission", () => {
    const mockOnSubmit = vi.fn();
    renderTodoForm({ onSubmit: mockOnSubmit });

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Fill only one required field
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Title" } });

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("renders tags field as optional", () => {
    renderTodoForm();

    const tagsLabel = screen.getByText(/tags/i);
    expect(tagsLabel).toBeDefined();
    expect(tagsLabel.textContent).not.toContain("*");
    expect(tagsLabel.nextElementSibling?.getAttribute("required")).toBeNull();
});

