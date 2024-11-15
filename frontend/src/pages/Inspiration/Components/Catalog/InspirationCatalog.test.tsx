import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import InspirationCatalog from "src/pages/Inspiration/Components/Catalog/InspirationCatalog";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, variants, transition, exit, ...validProps } = props;
      return <div data-testid="motion-div" {...validProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

// Mock components
vi.mock("src/common/Filters/InspirationFilter", () => ({
  InspirationFilter: ({ continentNames }: any) => (
    <div data-testid="inspiration-filter">
      {continentNames.map((name: string) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  ),
}));

vi.mock("src/common/Pagination/Pagination", () => ({
  CatalogPagination: ({ count, page, handlePageClick }: any) => (
    <div data-testid="catalog-pagination">
      <button onClick={() => handlePageClick(page + 1)}>Next</button>
    </div>
  ),
}));

vi.mock("src/pages/Inspiration/Components/Card/InspirationCard", () => ({
  default: ({ blog }: any) => (
    <div data-testid="inspiration-card">
      <h3>{blog.title}</h3>
    </div>
  ),
}));

// Mock hooks
vi.mock("src/hooks/useFetch/useFetch", () => ({
  default: () => ({
    data: {
      result: [
        {
          _id: "1",
          title: "Test Blog 1",
          content: [],
        },
        {
          _id: "2", 
          title: "Test Blog 2",
          content: [],
        },
      ],
      count: 2,
    },
    loading: false,
    error: null,
  }),
}));

vi.mock("src/hooks/usePagedData/usePagedData", () => ({
  usePagedData: () => ({
    sectionRef: { current: null },
    handlePagination: vi.fn(),
  }),
}));

// Add an interface for the blog type
interface Blog {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  content: any[];
  time: string;
  tags: string[];
  related_destination: string;
  featured: boolean;
}

// Update the store creation with proper typing
const createTestStore = (initialState = { blogs: [] as Blog[], tags: [] as string[], searchQuery: "" }) => {
  return configureStore({
    reducer: {
      blog: (state = { inspirationCatalogBlogs: [] as Blog[] }) => state,
      filter: (state = { blog: { tags: [] as string[], searchQuery: "" } }) => state,
    },
    preloadedState: {
      blog: {
        inspirationCatalogBlogs: initialState.blogs || [],
      },
      filter: {
        blog: {
          tags: initialState.tags || [],
          searchQuery: initialState.searchQuery || "",
        },
      },
    },
  });
};

describe("InspirationCatalog", () => {
  it("renders catalog with blogs correctly", () => {
    const store = createTestStore({
      blogs: [
        { 
          _id: "1", 
          title: "Test Blog 1",
          author: "Test Author",
          category: "Test Category",
          image: "test-image.jpg",
          content: [],
          time: "2023-01-01",
          tags: [],
          related_destination: "Test Destination",
          featured: false
        } ,
        { 
          _id: "2", 
          title: "Test Blog 2",
          author: "Test Author",
          category: "Test Category", 
          image: "test-image.jpg",
          content: [],
          time: "2023-01-01",
          tags: [],
          related_destination: "Test Destination",
          featured: false
        },
      ],
      tags: [],
      searchQuery: "",
    });

    render(
      <Provider store={store}>
        <InspirationCatalog currentCategory="All" />
      </Provider>
    );

    expect(screen.getByTestId("inspiration-filter")).toBeInTheDocument();
    expect(screen.getAllByTestId("inspiration-card")).toHaveLength(2);
    expect(screen.getByTestId("catalog-pagination")).toBeInTheDocument();
  });

  it("renders continent names in filter", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <InspirationCatalog currentCategory="All" />
      </Provider>
    );

    const continents = [
      "Africa",
      "Asia", 
      "Europe",
      "North America",
      "South America",
      "Australia",
      "Antarctica",
    ];

    continents.forEach(continent => {
      expect(screen.getByText(continent)).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", () => {
    const store = createTestStore({
      blogs: [
        { 
          _id: "1",
          title: "Test Blog 1",
          author: "Test Author",
          category: "Test Category",
          image: "test-image.jpg", 
          content: [],
          time: "2023-01-01",
          tags: [],
          related_destination: "Test Destination",
          featured: false
        },
        {
          _id: "2",
          title: "Test Blog 2", 
          author: "Test Author",
          category: "Test Category",
          image: "test-image.jpg",
          content: [],
          time: "2023-01-01", 
          tags: [],
          related_destination: "Test Destination",
          featured: false
        },
      ],
      tags: [],
      searchQuery: "",
    });

    render(
      <Provider store={store}>
        <InspirationCatalog currentCategory="All" />
      </Provider>
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Verify pagination component is still present
    expect(screen.getByTestId("catalog-pagination")).toBeInTheDocument();
  });
});
