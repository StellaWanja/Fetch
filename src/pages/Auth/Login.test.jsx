import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { useLogin } from "../../hooks/authHooks/useLogin";

vi.mock("../../hooks/authHooks/useLogin");

describe("Login", () => {
  const mockLogin = vi.fn();

  // Mock the useLogin hook return value
  beforeEach(() => {
    useLogin.mockReturnValue({
      login: mockLogin,
      loading: false,
      error: null,
    });
  });

  // Reset mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  it("should call the login function when the button is clicked", async () => {
    renderLogin();

    // Click the button
    const button = screen.getByRole("button", { name: /Sign in with Google/i });
    fireEvent.click(button);

    // assert that the login function was called
    expect(mockLogin).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it("displays an error message when login fails", async () => {
    // mock the login function to throw an error
    useLogin.mockReturnValueOnce({
      login: mockLogin,
      loading: false,
      error: "Login failed!",
    });

    renderLogin();

    expect(screen.getByText(/login failed!/i)).toBeInTheDocument();
  });
});
