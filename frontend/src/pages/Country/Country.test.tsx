import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Country from "src/pages/Country/Country";
import countryReducer from "src/store/slices/countrySlice";
import themeReducer from "src/store/slices/themeSlice";
import useFetch from "src/hooks/useFetch/useFetch";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";
import { ThemeProvider } from "@material-tailwind/react";

// Mock hooks
vi.mock("src/hooks/useFetch/useFetch");
vi.mock("src/hooks/useStackedSections/useStackedSections");

// Mock Material Tailwind components
vi.mock("@material-tailwind/react", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Carousel: ({ children, ...props }: any) => (
    <div data-testid="mock-carousel" {...props}>{children}</div>
  ),
  Card: ({ children, ...props }: any) => (
    <div data-testid="mock-card" {...props}>{children}</div>
  ),
  CardBody: ({ children, ...props }: any) => (
    <div data-testid="mock-card-body" {...props}>{children}</div>
  ),
  CardHeader: ({ children, ...props }: any) => (
    <div data-testid="mock-card-header" {...props}>{children}</div>
  )
}));

// Mock Country components
vi.mock("src/pages/Country/Components/CountryGuide", () => ({
  default: ({ country }: any) => (
    <div data-testid="country-guide">
      <h2>When to visit?</h2>
      <p>{country.additionalInfo.whenToVisit[0]}</p>
      <h2>Transportation</h2>
      <p>{country.additionalInfo.transportation[0]}</p>
      <h2>Health & Safety</h2>
      <p>{country.additionalInfo.healthAndSafety[0]}</p>
    </div>
  )
}));

vi.mock("src/pages/Country/Components/CountryArticles", () => ({
  default: ({ country }: any) => (
    <section data-testid="country-articles">
      <h1>Latest articles in {country.name}</h1>
      <div data-testid="featured-blogs" />
    </section>
  )
}));

vi.mock("src/pages/Country/Components/CountryDestinations", () => ({
  default: ({ country }: any) => (
    <section data-testid="country-destinations">
      <h1>{country.name}'s destinations</h1>
      <div data-testid="destination-catalog" />
    </section>
  )
}));

vi.mock("src/pages/Country/Components/CountryOverview", () => ({
  default: ({ country }: any) => (
    <section data-testid="country-overview">
      {country.description.map((desc: string, index: number) => (
        <p key={index}>{desc}</p>
      ))}
      <div>
        <div>Language: {country.language}</div>
        <div>Currency: {country.currency}</div>
        <div>Capital: {country.capital}</div>
        <div>Visa requirement: {country.visaRequirement}</div>
        <div>Dial-in code: {country.dialInCode}</div>
        <div>Time zone: {country.timeZone}</div>
      </div>
    </section>
  )
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 1,
  useSpring: () => ({ current: 1 })
}));

// Mock common components
vi.mock("src/components/Loading/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>
}));

vi.mock("src/components/NotFoundPage/NotFoundPage", () => ({
  default: () => <div>The page you are looking for does not exist.</div>
}));

vi.mock("src/common/Buttons/Button", () => ({
  PrimaryButton: ({ text, onClick, type, title }: any) => (
    <button onClick={onClick} type={type} title={title}>{text}</button>
  ),
  SecondaryButton: ({ text, onClick, type, title }: any) => (
    <button onClick={onClick} type={type} title={title}>
      {text}
      <img src="plane-icon.svg" alt="" />
    </button>
  ),
  NoirButton: ({ text, onClick, type, title }: any) => (
    <button onClick={onClick} type={type} title={title}>{text}</button>
  )
}));

vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} />
  )
}));

// Test data
const mockCountryData = {
  id: "1",
  name: "Test Country",
  description: ["First paragraph", "Second paragraph"],
  images: {
    heroImages: ["hero.jpg"],
    mapImages: ["map-light.jpg", "map-dark.jpg"], 
    overviewImages: ["overview.jpg"],
    otherImages: ["other1.jpg", "other2.jpg"],
    flagImages: ["flag.jpg"]
  },
  overview: {
    title: "Overview Title",
    description: "Overview description"
  },
  additionalInfo: {
    whenToVisit: ["Best time to visit is spring"],
    transportation: ["Transportation details"],
    healthAndSafety: ["Health and safety information"],
    accommodation: ["Accommodation information"],
    foodAndDrink: ["Food and drink details"],
    culture: ["Cultural information"]
  },
  guide: { sections: [] },
  articles: [],
  destinations: []
};

// Test utilities
const createMockStore = () => {
  return configureStore({
    reducer: {
      country: countryReducer,
      theme: themeReducer
    }
  });
};

const renderCountry = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>{component}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe("Country", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useStackedSections as any).mockReturnValue({
      refs: { current: [] },
      setRef: vi.fn((index) => (el: any) => {})
    });
  });

  it("renders loading state initially", () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: true,
      error: null
    });
    renderCountry();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders 404 page when country not found", () => {
    (useFetch as any).mockReturnValue({
      data: null,
      loading: false,
      error: "Not found"
    });
    renderCountry();
    expect(screen.getByText(/the page you are looking for/i)).toBeInTheDocument();
  });

  it("renders country content when data is loaded", () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });
    renderWithProviders(<Country />);
    expect(screen.getByRole("main")).toHaveClass("country");
  });

  it("initializes with correct hooks and store", () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });
    renderCountry();
    expect(useFetch).toHaveBeenCalled();
    expect(useStackedSections).toHaveBeenCalled();
  });

  it("renders all major country components", () => {
    (useFetch as any).mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null
    });
    renderCountry();
    const mainElement = screen.getByRole("main");
    expect(mainElement).toContainElement(screen.getByAltText(`${mockCountryData.name} map`));
    expect(screen.getByText("More countries")).toBeInTheDocument();
  });
});
