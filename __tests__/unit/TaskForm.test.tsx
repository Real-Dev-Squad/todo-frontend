import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Task } from "@/app/types/tasks";
import TodoForm from "@/components/TodoForm";
import { initialData } from "../utils/constants/Task";
import { FORM_MODE } from "@/app/constants/Task";

// Mock TaskDetails component
vi.mock("./TaskDetails", () => ({
    default: ({ initialData }: { initialData: Task }) => (
        <div data-testid={`task-details-${initialData.id}`}>Mocked Task Details</div>
    ),
}));



const renderTodoForm = (props = {}) => {
    const defaultProps = {
        mode: FORM_MODE.CREATE as "create" | "view" | "edit",
        onSubmit: vi.fn(),
        onClose: vi.fn(),
        onAcknowledge: vi.fn(),
    };
    return render(<TodoForm {...defaultProps} {...props} />);
};


let mockOnAcknowledge: () => void;
let mockOnClose: () => void;
let mockOnSubmit: () => void;

beforeEach(() => {
    mockOnAcknowledge = vi.fn();
    mockOnClose = vi.fn();
    mockOnSubmit = vi.fn();
    cleanup();
});

afterEach(() => {
    cleanup();
});

test("should renders create mode with all required fields", () => {
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

test("should renders edit mode with initial data", () => {
    renderTodoForm({ mode: FORM_MODE.EDIT, initialData: initialData });
    expect(screen.getByDisplayValue(initialData.title)).toBeDefined();
    expect(screen.getByDisplayValue(initialData.description)).toBeDefined();
    expect(screen.getByDisplayValue(initialData.assignee)).toBeDefined();
    expect(screen.getByDisplayValue(initialData.taskId)).toBeDefined();
    expect(screen.getByText("Edit Todo")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
});

test("should renders view mode with TaskDetails component", () => {
    renderTodoForm({
        mode: FORM_MODE.VIEW,
        initialData: initialData,
        onAcknowledge: mockOnAcknowledge
    });

    expect(screen.getByTestId(`task-details-${initialData.id}`)).toBeDefined();
    expect(screen.queryByText("Create a Todo")).toBeNull();
    expect(screen.queryByText("Edit Todo")).toBeNull();
});

test("should submits form with correct data in create mode", () => {
    renderTodoForm({ onSubmit: mockOnSubmit });

    const { id, status, tags, ...testData } = initialData;

    fireEvent.input(screen.getByTestId("title"), { target: { value: testData.title } });
    fireEvent.input(screen.getByTestId("description"), { target: { value: testData.description } });
    fireEvent.input(screen.getByTestId("assignee"), { target: { value: testData.assignee } });
    fireEvent.input(screen.getByTestId("task-id"), { target: { value: testData.taskId } });
    fireEvent.input(screen.getByTestId("due-date"), { target: { value: testData.dueDate } });
    fireEvent.click(screen.getByTestId("task-form-submit-button"));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining(testData));
});

test("should closes form when close button is clicked", () => {
    renderTodoForm({ onClose: mockOnClose });

    fireEvent.click(screen.getByTestId("form-close-button"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test("should validates required fields before submission", () => {
    renderTodoForm({ onSubmit: mockOnSubmit });

    fireEvent.click(screen.getByTestId("task-form-submit-button"));
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Fill only one required field
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Title" } });

    fireEvent.click(screen.getByTestId("task-form-submit-button"));
    expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("should renders tags field as optional", () => {
    renderTodoForm();

    const tagsLabel = screen.getByText(/tags/i);
    expect(tagsLabel).toBeDefined();
    expect(tagsLabel.textContent).not.toContain("*");
    expect(tagsLabel.nextElementSibling?.getAttribute("required")).toBeNull();
});

