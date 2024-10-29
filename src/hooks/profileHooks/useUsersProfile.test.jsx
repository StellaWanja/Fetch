import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import { useNavigate, MemoryRouter } from "react-router-dom";
import { useUsersProfile } from "./useUsersProfile";
import { ProfileContext } from "../../context/ProfileContext";
import { useProfileContext } from "./useProfileContext";

// Mock dependencies for testing
global.fetch = vi.fn();

vi.mock("../../context/ProfileContext");
vi.mock("./useProfileContext.jsx");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("useUsersProfile", () => {
  // Mock functions and values
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const usersData = [
    {
      id: 1,
      name: "John Doe",
      username: "John",
      email: "jd@example.com",
      address: {
        street: "Street 1",
        suite: "Suite 1",
        city: "City 1",
        zipcode: "0000-0000",
        geo: {
          lat: "-32.0932",
          lng: "86.1643",
        },
      },
      phone: "1-234-736-5678 x99442",
      website: "company.org",
      company: {
        name: "company name",
        catchPhrase: "phrase of the company",
        bs: "bs of the company",
      },
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
                json: async () => usersData,
              }),
            50
          )
        )
    );

    const { result } = renderHook(() => useUsersProfile(), { wrapper });

    act(() => {
      result.current.getUsers();
    });

    // Loading should be true after initiating fetch
    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.getUsers();
    });

    // Loading should be false after fetch completes
    expect(result.current.loading).toBe(false);
  });

  it("should fetch from the API and dispatch action if successful", async () => {
    // Mock return values and use useUsersProfile hook
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => usersData,
    });
    const { result } = renderHook(() => useUsersProfile(), { wrapper });

    // Call the getUsers function
    await act(async () => {
      await result.current.getUsers();
    });

    // Assertions
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_USERS",
      payload: usersData,
    });
    expect(result.current.loading).toBe(false);
  });

  it("should display error message on fetching users failure", async () => {
    // Mock return values and use useUsersProfile hook
    fetch.mockRejectedValueOnce(new Error("Failed to fetch users"));
    const { result } = renderHook(() => useUsersProfile(), { wrapper });

    // Call the getAlbums function
    await act(async () => {
      await result.current.getUsers();
    });

    // Assertions
    expect(result.current.error).toBe(
      "Something went wrong during data fetching. Please try again."
    );
    expect(result.current.loading).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
