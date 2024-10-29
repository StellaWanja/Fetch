import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AlbumProfile from "./AlbumProfile";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { usePhotos } from "../../../hooks/profileHooks/usePhotos";

// Mock dependencies for testing
vi.mock("../../../hooks/authHooks/useAuthContext");
vi.mock("../../../hooks/profileHooks/useAlbums");
vi.mock("../../../hooks/profileHooks/useProfileContext");
vi.mock("../../../hooks/profileHooks/usePhotos");

describe("AlbumProfile", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  const renderAlbumProfile = () => {
    render(
      <MemoryRouter>
        <AlbumProfile />
      </MemoryRouter>
    );
  };

  it("should render loading message when loading", () => {
    // Mock auth and album and photo loading state
    useAuthContext.mockReturnValue({ loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: true });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: true });
    useProfileContext.mockReturnValue({ albums: [], photos: [] });

    renderAlbumProfile();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render 'No album found' when there are no albums", async () => {
    // Simulate successful data fetching (albums and photos empty)
    useAuthContext.mockReturnValue({ loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ albums: [], photos: [] });

    renderAlbumProfile();

    expect(screen.getByText("No album found")).toBeInTheDocument();
  });

  it("displays error message if there is an error", () => {
    // Mock error state
    useAuthContext.mockReturnValue({ loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    usePhotos.mockReturnValue({
      getPhotos: vi.fn(),
      loading: false,
      error: "Failed to load photos",
    });
    useProfileContext.mockReturnValue({ albums: [], photos: [] });

    renderAlbumProfile();

    expect(screen.getByText("Failed to load photos")).toBeInTheDocument();
  });

  it("should render album and photos after successful data fetching", async () => {
    // Mock successful data fetching
    useAuthContext.mockReturnValue({ loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({
      albums: [{ id: 1, title: "Test Album" }],
      photos: [{ id: 1, albumId: 1, title: "Test Photo" }],
    });

    renderAlbumProfile();

    expect(screen.getByText(/Album details/i)).toBeInTheDocument();
  });
});
