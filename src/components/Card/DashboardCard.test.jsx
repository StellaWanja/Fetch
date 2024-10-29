import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("DashboardCard component", () => {
  const mockNavigate = vi.fn();
  const albums = [
    { id: 1, userId: 1, title: "Album 1" },
    { id: 2, userId: 1, title: "Album 2" },
  ];
  const user = {
    id: 1,
    name: "John Doe",
    email: "jd@example.com",
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  const renderDashboardCard = () =>
    render(
      <MemoryRouter>
        <DashboardCard user={user} albums={albums} />
      </MemoryRouter>
    );

  it("should render the user name and email", () => {
    renderDashboardCard();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jd@example.com")).toBeInTheDocument();
  });

  it("should render the number of albums", () => {
    renderDashboardCard();

    const albumCountText = screen
      .getByText(/Number of Albums:/i)
      .closest("div");
    expect(albumCountText).toHaveTextContent("2");
  });

  it("should navigate to the user's albums page when clicked", () => {
    renderDashboardCard();

    const clickableDiv = screen.getByRole("button");
    fireEvent.click(clickableDiv);
    expect(mockNavigate).toHaveBeenCalledWith("/users?uid=1");
  });
});
