import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import Button from "./Button";

// styles for the buttons
const baseStyles =
  "font-semibold rounded-full px-6 py-2 transition-colors ease-in delay-150";
const lightgreenOutlineStyles =
  "bg-transparent text-lightgreen border-lightgreen border-2 hover:bg-lightgreen hover:text-green";
const lightgreenFilledStyles =
  "bg-lightgreen text-green border-lightgreen border-2 hover:text-lightgreen hover:border-lightgreen  hover:bg-transparent";
const greenOutlineStyles =
  "bg-transparent text-green border-green border-2 hover:bg-green hover:text-white";
const greenFilledStyles =
  "bg-green text-white border-green border-2 hover:text-green hover:border-green hover:bg-transparent";

describe("Button Component", () => {
  it("should render with lightgreen outline button style", () => {
    render(
      <Button variant="outline" btnStyle="lightgreen">
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(`${baseStyles} ${lightgreenOutlineStyles}`);
  });

  it("should render with green filled button style", () => {
    render(
      <Button variant="filled" btnStyle="green">
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(`${baseStyles} ${greenFilledStyles}`);
  });

  it("should render with lightgreen filled button style", () => {
    render(
      <Button variant="filled" btnStyle="lightgreen">
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(`${baseStyles} ${lightgreenFilledStyles}`);
  });

  it("should render with green outline button style", () => {
    render(
      <Button variant="outline" btnStyle="green">
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(`${baseStyles} ${greenOutlineStyles}`);
  });

  it("should apply the disabled attribute if provided", () => {
    render(<Button variant="filled" btnStyle="green" disabled>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeDisabled();
  })

  it("should not call the onClick function if the button is disabled", () => {
    const onClickMock = vi.fn();
    render(<Button variant="filled" btnStyle="green" onClick={onClickMock} disabled>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  })
  
  it("should call onClick when clicked", () => {
    const onClickMock = vi.fn();
    render(<Button variant="filled" btnStyle="green" onClick={onClickMock}>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
