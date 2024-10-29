import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import * as authHooks from "../../hooks/authHooks/useLogout";
import { AuthContext } from "../../context/AuthContext";

// Mock logout function and authcontext value
const mockLogout = vi.fn();
const mockAuthContextValue = (owner = null) => ({
  owner,
  token: owner ? "test-token" : null, // Mock token if owner exists
  loading: false, // loading is false for testing
});
const mockOwner = {
  displayName: "Test User",
  email: "test@example.com",
  uid: "test-123",
};

// Navbar tests
describe("Navbar", () => {
  // Render Navbar component with mock authcontext value
  const renderNavbar = (owner = null) => {
    render(
      <AuthContext.Provider value={mockAuthContextValue(owner)}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  // Mock the useLogout hook before each test
  beforeEach(() => {
    vi.spyOn(authHooks, "useLogout").mockReturnValue({ logout: mockLogout });
  });

  // Reset mocks after each test
  afterEach(async () => {
    vi.clearAllMocks();
  });

  it("should render 'Sign in' button when user is not logged in", () => {
    renderNavbar(); //no owner provided

    // Expect 'Sign in' button to be rendered
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign Out/i)).not.toBeInTheDocument();
  });

  it("should render 'Sign out' button when user is logged in", () => {
    renderNavbar(mockOwner);

    // Expect 'Sign out' button to be rendered
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it("should call logout function when 'Sign out' button is clicked", () => {
    renderNavbar(mockOwner);

    // Simulate click on 'Sign out' button
    fireEvent.click(screen.getByText(/sign out/i));

    // Expect logout function to be called
    expect(mockLogout).toHaveBeenCalled();
  });
});
