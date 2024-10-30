import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useLogin } from "./useLogin";
import { AuthContext } from "../../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

// Mock dependencies for testing
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));
vi.mock("../../context/AuthContext");
vi.mock("./useAuthContext");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("useLogin", () => {
  // Mock functions and values
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const mockOwner = {
    displayName: "Test User",
    email: "test@example.com",
    uid: "test-123",
    accessToken: "test-access-token",
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock return values
    useAuthContext.mockReturnValue({ dispatch: mockDispatch });
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Create a wrapper component that provides the AuthContext and MemoryRouter
  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ dispatch: mockDispatch }}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  it("should display loading message on login attempt", async () => {
    // Mock signInWithPopup function to return a promise that resolves after 50ms and render useLogin hook
    signInWithPopup.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ user: {} }), 50))
    );
    const { result } = renderHook(() => useLogin(), { wrapper });

    // Expect loading to be false before the login attempt
    expect(result.current.loading).toBe(false);

    // Call the login function
    await act(async () => {
      result.current.login();
    });

    // Expect loading to be true after the login attempt
    expect(result.current.loading).toBe(true);
  });

  it("should login successfully, set token and owner in localStorage and navigate to dashboard", async () => {
    // Mock signInWithPopup function to return a promise that resolves with mockOwner and render useLogin hook
    signInWithPopup.mockResolvedValue({ user: mockOwner });
    const { result } = renderHook(() => useLogin(), { wrapper });

    // Call the login function
    await act(async () => {
      result.current.login();
    });

    // Assertions
    expect(localStorage.getItem("token")).toBe("test-access-token");
    expect(localStorage.getItem("owner")).toContain("test@example.com");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN",
      payload: { token: "test-access-token", owner: mockOwner },
    });
    expect(mockNavigate).toHaveBeenCalledWith(`/dashboard?id=${mockOwner.uid}`);
    expect(result.current.loading).toBe(false);
  });

  it("should display error message if user data could not be fetched", async () => {
    // Mock signInWithPopup function to return a promise that rejects with an error and render useLogin hook
    signInWithPopup.mockRejectedValue(new Error("Login failed"));
    const { result } = renderHook(() => useLogin(), { wrapper });

    // Call the login function
    await act(async () => {
      await result.current.login();
    });

    // Assertions
    expect(result.current.error).toBe(
      "Something went wrong during login. Please try again."
    );
    expect(result.current.loading).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
