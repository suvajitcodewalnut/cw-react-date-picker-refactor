import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Checkbox, CheckboxProps } from "./Checkbox";

describe("Checkbox", () => {
  const defaultProps: CheckboxProps = {
    label: "Accept terms",
    id: "accept-terms",
    checked: false,
    onChange: jest.fn(),
  };

  const renderComponent = (additionalProps?: Partial<CheckboxProps>) => {
    render(<Checkbox {...defaultProps} {...additionalProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without an error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("should render the label correctly", () => {
    renderComponent();
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("should render checkbox with correct id", () => {
    renderComponent();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "accept-terms");
  });

  it("should render label with htmlFor attribute matching checkbox id", () => {
    renderComponent();
    const label = screen.getByText("Accept terms");
    expect(label).toHaveAttribute("for", "accept-terms");
  });

  it("should render unchecked by default when checked is false", () => {
    renderComponent({ checked: false });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should render checked when checked prop is true", () => {
    renderComponent({ checked: true });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should invoke onChange when checkbox is clicked", () => {
    const handleChange = jest.fn();
    renderComponent({ onChange: handleChange });
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should render hint text when hint prop is provided", () => {
    renderComponent({ hint: "(required)" });
    expect(screen.getByText("(required)")).toBeInTheDocument();
  });

  it("should not render hint text when hint prop is not provided", () => {
    renderComponent();
    expect(screen.queryByText("(required)")).not.toBeInTheDocument();
  });

  it("should render disabled checkbox when disabled prop is true", () => {
    renderComponent({ disabled: true });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("should render enabled checkbox when disabled prop is false", () => {
    renderComponent({ disabled: false });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeEnabled();
  });
});
