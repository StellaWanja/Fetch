import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import { useNavigate, MemoryRouter } from "react-router-dom";
import { usePhotos } from "./usePhotos";
import { ProfileContext } from "../../context/ProfileContext";
import { useProfileContext } from "./useProfileContext";

// Mock dependencies for testing
// eslint-disable-next-line no-undef
global.fetch = vi.fn();

vi.mock("../../context/ProfileContext");
vi.mock("./useProfileContext.jsx");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("usePhotos", () => {
  // Mock functions and values
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const photosData = [
    {
      id: 1,
      albumId: 1,
      title: "Photo 1",
      url: "/test-link",
      thumbnailUrl: "/test-link",
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    fetch.mockClear();
    // Mock return values
    useProfileContext.mockReturnValue({ dispatch: mockDispatch });
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Create a wrapper component that provides the AuthContext and MemoryRouter
  const wrapper = ({ children }) => (
      <ProfileContext.Provider value={{ dispatch: mockDispatch }}>
        <MemoryRouter>{children}</MemoryRouter>
      </ProfileContext.Provider>
  );

  it("should set loading to true during fetch", async () => {
    // Mock fetch implementation to return a promise that resolves after 50ms
    fetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => photosData,
              }),
            50
          )
        )
    );

    const { result } = renderHook(() => usePhotos(), { wrapper });

    act(() => {
      result.current.getPhotos();
    });

    // Loading should be true after initiating fetch
    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.getPhotos();
    });

    // Loading should be false after fetch completes
    expect(result.current.loading).toBe(false);
  });

  it("should fetch from the API and dispatch action if successful", async () => {
    // Mock return values and use usePhotos hook
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => photosData,
    });
    const { result } = renderHook(() => usePhotos(), { wrapper });

    // Call the getPhotos function
    await act(async () => {
      await result.current.getPhotos();
    });

    // Assertions
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PHOTOS",
      payload: photosData,
    });
    expect(result.current.loading).toBe(false);
  })

  it("should display error message on fetching photos failure", async () => {
    // Mock return values and use useAlbums hook
    fetch.mockRejectedValue(new Error("Failed to fetch photos"));
    const { result } = renderHook(() => usePhotos(), { wrapper });

    // Call the getAlbums function
    await act(async () => {
      await result.current.getPhotos();
    });

    // Assertions
    expect(result.current.error).toBe(
      "Something went wrong during data fetching. Please try again."
    );
    expect(result.current.loading).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
