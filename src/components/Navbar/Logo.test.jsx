import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import Logo from "./Logo";

// logo styles
const baseStyles =
  "flex items-center gap-[1ch] transition-colors ease-in delay-150";
const lightgreenStyles = "text-lightgreen hover:text-white";
const greenStyles = "text-green hover:text-green";

describe("Logo", () => {
  it("should render logo with lightgreen styles", () => {
    render(<Logo variant="lightgreen" />);
    const logo = screen.getByRole("link", { name: "Logo" });
    expect(logo).toHaveClass(`${baseStyles} ${lightgreenStyles}`);
  });

  it("should render logo with green styles", () => {
    render(<Logo variant="green" />);
    const logo = screen.getByRole("link", { name: "Logo" });
    expect(logo).toHaveClass(`${baseStyles} ${greenStyles}`);
  });
});
