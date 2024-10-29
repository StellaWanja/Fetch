import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { usePhotos } from "../../../hooks/profileHooks/usePhotos";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import PhotoProfile from "./PhotoProfile";

vi.mock("../../../hooks/authHooks/useAuthContext");
vi.mock("../../../hooks/profileHooks/usePhotos");
vi.mock("../../../hooks/profileHooks/useAlbums");
vi.mock("../../../hooks/profileHooks/useProfileContext");

describe("PhotoProfile", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  const renderPhotoProfile = () => {
    render(
      <MemoryRouter>
        <PhotoProfile />
      </MemoryRouter>
    );
  };

  it("should render loading message when loading", () => {
    // Mock auth and albums and photos loading state
    useAuthContext.mockReturnValue({ loading: false });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: true });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: true });
    useProfileContext.mockReturnValue({ photos: [], albums: [] });

    renderPhotoProfile();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render 'No album found' when there are no albums", async () => {
    // Simulate successful data fetching (albums and photos empty)
    useAuthContext.mockReturnValue({ loading: false });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ photos: [], albums: [] });

    renderPhotoProfile();

    expect(screen.getByText("No photo found")).toBeInTheDocument();
  });

  it("displays error message if there is an error", () => {
    // Mock error state
    useAuthContext.mockReturnValue({ loading: false });
    usePhotos.mockReturnValue({
      getPhotos: vi.fn(),
      loading: false,
      error: "Failed to load photos",
    });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({ photos: [], albums: [] });

    renderPhotoProfile();

    expect(screen.getByText("Failed to load photos")).toBeInTheDocument();
  });

  it("should render album and photos after successful data fetching", async () => {
    // Mock successful data fetching
    useAuthContext.mockReturnValue({ loading: false });
    usePhotos.mockReturnValue({ getPhotos: vi.fn(), loading: false });
    useAlbums.mockReturnValue({ getAlbums: vi.fn(), loading: false });
    useProfileContext.mockReturnValue({
      photos: [
        {
          id: 1,
          albumId: 1,
          title: "Test Photo",
          url: "/test-link",
          thumbnailUrl: "Example thumbnail URL",
        },
      ],
    });

    renderPhotoProfile();

    expect(screen.getByText(/photo details/i)).toBeInTheDocument();
  });
});
