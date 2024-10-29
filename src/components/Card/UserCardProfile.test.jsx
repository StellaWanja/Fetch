import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import UserCardProfile from "./UserCardProfile";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => children,
}));

describe("UserCardProfile component", () => {
  const mockNavigate = vi.fn();
  const user = {
    id: 1,
    name: "John Doe",
    email: "jd@example.com",
    username: "john",
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
  };
  const albums = [
    { id: 1, userId: 1, title: "Album 1" },
    { id: 2, userId: 1, title: "Album 2" },
  ];

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  const renderUserCard = () =>
    render(
      <MemoryRouter>
        <UserCardProfile albums={albums} user={user} />
      </MemoryRouter>
    );

  it("should render user details", () => {
    renderUserCard();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jd@example.com")).toBeInTheDocument();
  });

  it("should render albums and their title", () => {
    renderUserCard();

    const albumList = screen.getByRole("list");

    albumList.querySelectorAll("li").forEach((album, index) => {
      expect(album).toHaveTextContent(albums[index].title);
    });
  });

  it("should navigate to album page when album is clicked", () => {
    renderUserCard();

    const album = screen.getByText("Album 1");
    fireEvent.click(album);
    expect(mockNavigate).toHaveBeenCalledWith("/albums?albumId=1");
  });
});
