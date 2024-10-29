import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { useUsersProfile } from "../../../hooks/profileHooks/useUsersProfile";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import UserProfile from "./UserProfile";

vi.mock("../../../hooks/authHooks/useAuthContext");
vi.mock("../../../hooks/profileHooks/useUsersProfile");
vi.mock("../../../hooks/profileHooks/useProfileContext");
vi.mock("../../../hooks/profileHooks/useAlbums");

describe("UserProfile", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  const renderUserProfile = () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );
  };

  it("should render loading message when loading", () => {
    // Mock auth and album and user loading state
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: true });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: true });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderUserProfile();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render 'No user found' when there are no user", async () => {
    // Simulate successful data fetching (albums and users empty)
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderUserProfile();

    expect(screen.getByText("No user found")).toBeInTheDocument();
  });

  it("displays error message if there is an error", () => {
    // Mock error state
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({
        getUsers: vi.fn(),
        loading: false,
        error: "Failed to load user",
      });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ users: [], albums: [] });

    renderUserProfile();

    expect(screen.getByText("Failed to load user")).toBeInTheDocument();
  });

  it("should render albums and user after successful data fetching", async () => {
    // Mock successful data fetching
    useAuthContext.mockReturnValue({ loading: false });
    useUsersProfile.mockReturnValue({ getUsers: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({
      users: [{ id: 1, name: "Test User" }],
      albums: [{ id: 1, title: "Test Album" }],
    });

    renderUserProfile();

    expect(screen.getByText(/user details/i)).toBeInTheDocument();
  });

});
