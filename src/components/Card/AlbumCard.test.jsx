import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import AlbumCard from "./AlbumCard";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("AlbumCard component", () => {
  const mockNavigate = vi.fn();
  const album = { title: "Album 1", id: 1 };
  const photos = [
    { id: 1, title: "Photo 1", url: "/test-link", thumbnailUrl: "/test-link" },
    { id: 2, title: "Photo 2", url: "/test-link", thumbnailUrl: "/test-link" },
  ];

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  const renderAlbumCard = () =>
    render(
      <MemoryRouter>
        <AlbumCard album={album} photos={photos} />
      </MemoryRouter>
    );

  it("should render album title", () => {
    renderAlbumCard();
    expect(screen.getByText("Album 1")).toBeInTheDocument();
  });

  it("should render photos with title and url", () => {
    renderAlbumCard();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(photos.length);

    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", photos[index].url);
      expect(image).toHaveAttribute("alt", photos[index].thumbnailUrl);
      expect(screen.getByText(photos[index].title)).toBeInTheDocument();
    });
  });

  it("should navigate to photo page when photo is clicked", () => {
    renderAlbumCard();

    const photo = screen.getByText("Photo 1");
    fireEvent.click(photo);
    expect(mockNavigate).toHaveBeenCalledWith("/photos?photoId=1");
  });
});
