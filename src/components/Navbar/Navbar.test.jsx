import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import Navbar from "./Navbar";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

// Mock custom hooks
jest.mock("../../hooks/useAuthContext");
jest.mock("../../hooks/useLogout");

// Navbar tests
describe("Navbar", () => {
  // Mock functions and data
  const mockLogout = jest.fn();
  const mockOwner = { displayName: "Test User" };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up useLogout hook mock to return logout function
    useLogout.mockReturnValue({ logout: mockLogout });
  });

  it("renders 'Sign in' button when user is not logged in", () => {
    // Set up useAuthContext hook mock to return null for owner and token
    useAuthContext.mockReturnValue({ owner: null, token: null });

    // Render Navbar component
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Expect 'Sign in' button to be rendered
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it("renders 'Sign out' button when user is logged in", () => {
    // Set up useAuthContext hook mock to return mockOwner and token
    useAuthContext.mockReturnValue({ owner: mockOwner, token: "test-token" });

    // Render Navbar component
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Expect 'Sign out' button to be rendered
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it("calls logout function when 'Sign out' button is clicked", () => {
    // Set up useAuthContext hook mock to return mockOwner and token
    useAuthContext.mockReturnValue({ owner: mockOwner, token: "test-token" });

    // Render Navbar component
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Simulate click on 'Sign out' button
    fireEvent.click(screen.getByText(/sign out/i));

    // Expect logout function to be called
    expect(mockLogout).toHaveBeenCalled();
  });
});
