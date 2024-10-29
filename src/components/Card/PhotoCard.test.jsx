import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import PhotoCard from "./PhotoCard";
import { useProfileContext } from "../../hooks/profileHooks/useProfileContext";

global.fetch = vi.fn();

// Mock dependencies for testing
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));
vi.mock("../../hooks/profileHooks/useProfileContext");

describe("PhotoCard component", () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();

  const photo = {
    id: 1,
    title: "Photo 1",
    url: "/test-link",
    thumbnailUrl: "/test-link",
  };
  const updatedTitle = { id: photo.id, title: "Updated Title" };

  // Mock return values and clear mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    useProfileContext.mockReturnValue({ dispatch: mockDispatch });
    useNavigate.mockReturnValue(mockNavigate);
  });

  const renderPhotoCard = () =>
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} />
      </MemoryRouter>
    );

  it("should open and close the input modal", () => {
    renderPhotoCard();

    // verify modal is open
    fireEvent.click(screen.getByRole("button", { name: /edit title/i }));
    expect(screen.getByText("Edit Title:")).toBeInTheDocument();

    // close modal
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(screen.queryByText("Edit Title:")).not.toBeInTheDocument();
  });

  it("should edit the title and dispatch the update action", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTitle,
    });

    renderPhotoCard();

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /edit title/i }));

    // Input new title
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: updatedTitle.title } });

    // Save and dispatch
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /save/i }));
    });

    // assertions
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_PHOTO_TITLE",
      payload: updatedTitle,
    });
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
    expect(input.value).toBe(updatedTitle.title);
  });

  it("should render the photo url", () => {
    renderPhotoCard();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", photo.url);
    expect(image).toHaveAttribute("alt", photo.thumbnailUrl);
  });

  it("should display error message on edit failure", async () => {
    fetch.mockRejectedValueOnce(
      new Error("Failed to update the title. Please try again later.")
    );

    renderPhotoCard();

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /edit title/i }));

    // Input new title
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: updatedTitle.title } });

    await act(async () => {
      // Click "Save" without changing the title
      fireEvent.click(screen.getByRole("button", { name: /save/i }));
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(
      screen.getByText(/Something went wrong. Please try again later./i)
    ).toBeInTheDocument();
  });
});
