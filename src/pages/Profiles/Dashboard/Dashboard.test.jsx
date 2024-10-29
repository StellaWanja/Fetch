import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { useUsersProfile } from "../../../hooks/profileHooks/useUsersProfile";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import Dashboard from "./Dashboard";

// Mock dependencies
vi.mock("../../../hooks/authHooks/useAuthContext");
vi.mock("../../../hooks/profileHooks/useUsersProfile");
vi.mock("../../../hooks/profileHooks/useProfileContext");
vi.mock("../../../hooks/profileHooks/useAlbums");

describe("Dashboard", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  const renderDashboard = () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  };

  it("should render loading message when loading", () => {
    // Mock auth and album and user loading state
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: true });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderDashboard();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render 'No users found' when there are no users", async () => {
    // Simulate successful data fetching (albums and users empty)
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderDashboard();

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("displays error message if there is an error", () => {
    // Mock error state
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({
        getUsers: vi.fn(),
        loading: false,
        error: "Failed to load users",
      });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderDashboard();

    expect(screen.getByText("Failed to load users")).toBeInTheDocument();
  });

  it("should render users and albums after successful data fetching", async () => {
    // Mock successful data fetching
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({
      users: [{ id: 1, name: "Test User" }],
      albums: [{ id: 1, title: "Test Album" }],
    });

    renderDashboard();

    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });
});
