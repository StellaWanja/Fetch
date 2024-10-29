import { vi, describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useNavigate, MemoryRouter } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { AuthContext } from "../../context/AuthContext";
import { useLogout } from "./useLogout";

// mock dependencies
vi.mock("../../context/AuthContext");
vi.mock("./useAuthContext");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("useLogout", () => {
  // Mock functions and values
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock return values
    useAuthContext.mockReturnValue({ dispatch: mockDispatch });
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Create a wrapper component that provides the AuthContext and MemoryRouter
  const wrapper = ({ children }) => (
    <AuthContext.Provider>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  it("should logout successfully, remove token and owner from localStorage and navigate to login page", async () => {
    // Mock return a promise that resolves and render useLogout hook
    const { result } = renderHook(() => useLogout(), { wrapper });

    // Call the logout function
    await act(async () => {
      result.current.logout();
    });

    // Assertions
    expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGOUT" });
    expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("owner")).toBe(null);
  });
});
