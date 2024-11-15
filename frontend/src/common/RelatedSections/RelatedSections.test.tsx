import React from "react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import * as useFetchHook from "src/hooks/useFetch/useFetch";
import * as viewportHook from "src/hooks/useViewportWidth/useViewportWidth";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import Blog from "src/types/Blog";

// Mock hooks
vi.mock("src/hooks/useFetch/useFetch");
vi.mock("src/hooks/useViewportWidth/useViewportWidth");

// Mock data
const mockCountry = {
  _id: "1",
  name: "Test Country",
  continent: "Europe",
  images: { otherImages: ["test-image.jpg"] }
};

const mockDestination = {
  _id: "1", 
  name: "Test Destination",
  continent: "Europe",
  tags: ["Wilderness"],
  images: ["test-image.jpg"]
};

const mockBlog = {
  _id: "1",
  title: "Test Blog",
  category: "travel",
  tags: ["SoloJourneys"],
  image: "test-image.jpg"
};

describe("RelatedSections", () => {
  beforeEach(() => {
    vi.mocked(viewportHook.useViewportWidth).mockReturnValue(1024);
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: null,
      error: "",
      loading: false
    });
  });

  it("renders country section", () => {
    render(
      <BrowserRouter>
        <RelatedSections type="country" data={mockCountry as Country} />
      </BrowserRouter>
    );
    expect(screen.getByText(/no related countries/i)).toBeInTheDocument();
  });

  it("renders destination section", () => {
    render(
      <BrowserRouter>
        <RelatedSections type="destination" data={mockDestination as Destination} />
      </BrowserRouter>
    );
    expect(screen.getByText(/no related destinations/i)).toBeInTheDocument();
  });

  it("renders blog section", () => {
    render(
      <BrowserRouter>
        <RelatedSections type="blog" data={mockBlog as Blog} />
      </BrowserRouter>
    );
    expect(screen.getByText(/no related articles/i)).toBeInTheDocument();
  });

  it("renders default message for invalid type", () => {
    render(
      <BrowserRouter>
        <RelatedSections type="invalid" data={mockBlog as Blog} />
      </BrowserRouter>
    );
    expect(screen.getByText(/nothing related/i)).toBeInTheDocument();
  });

  it("renders related countries when data is available", () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: {
        result: [
          { ...mockCountry, _id: "2", name: "Related Country" }
        ]
      },
      error: "",
      loading: false
    });

    render(
      <BrowserRouter>
        <RelatedSections type="country" data={mockCountry as Country} />
      </BrowserRouter>
    );
    expect(screen.getByText("Related Country")).toBeInTheDocument();
  });

  it("renders related destinations when data is available", () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: {
        result: [
          { ...mockDestination, _id: "2", name: "Related Destination" }
        ]
      },
      error: "",
      loading: false
    });

    render(
      <BrowserRouter>
        <RelatedSections type="destination" data={mockDestination as Destination} />
      </BrowserRouter>
    );
    expect(screen.getByText("Related Destination")).toBeInTheDocument();
  });

  it("renders related blogs when data is available", () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: {
        result: [
          { ...mockBlog, _id: "2", title: "Related Blog" }
        ]
      },
      error: "",
      loading: false
    });

    render(
      <BrowserRouter>
        <RelatedSections type="blog" data={mockBlog as Blog} />
      </BrowserRouter>
    );
    expect(screen.getByText("Related Blog")).toBeInTheDocument();
  });
});
