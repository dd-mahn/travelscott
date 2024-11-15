import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CountryHero from "src/pages/Country/Components/Hero/CountryHero";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <section data-testid="motion-section" {...validProps}>{children}</section>;
    },
    img: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <img data-testid="motion-img" {...validProps}>{children}</img>;
    },
    h1: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, ...validProps } = props;
      return <h1 data-testid="motion-h1" {...validProps}>{children}</h1>;
    },
  },
}));

// Mock material-tailwind carousel
vi.mock("@material-tailwind/react", () => ({
  Carousel: ({ children }: any) => (
    <div data-testid="carousel">{children}</div>
  ),
}));

// Mock OptimizedImage component
vi.mock("src/common/OptimizedImage/OptimizedImage", () => ({
  default: ({ src, alt, className }: any) => (
    <img data-testid="optimized-image" src={src} alt={alt} className={className} />
  ),
}));

describe("CountryHero", () => {
  const mockCountry = {
    _id: "test-id",
    name: "Test Country",
    images: {
      flagImages: ["flag-image.jpg"],
      otherImages: ["image1.jpg", "image2.jpg"],
      mapImages: []
    },
    description: [],
    capital: "",
    continent: "",
    currency: "",
    language: "",
    visaRequirement: "",
    dialInCode: "",
    timeZone: "",
    additionalInfo: {
      whenToVisit: "",
      transportation: "",
      healthAndSafety: ""
    },
    totalDestinations: 0
  };

  it("renders country images in carousel", () => {
    render(<CountryHero country={mockCountry} />);
    
    const images = screen.getAllByTestId("optimized-image");
    expect(images).toHaveLength(mockCountry.images.otherImages.length);
    
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", mockCountry.images.otherImages[index]);
      expect(image).toHaveAttribute("alt", `${mockCountry.name} image`);
    });
  });

  it("renders country flag correctly", () => {
    render(<CountryHero country={mockCountry} />);
    
    const flag = screen.getByTestId("motion-img");
    expect(flag).toHaveAttribute("src", mockCountry.images.flagImages[0]);
    expect(flag).toHaveAttribute("alt", `${mockCountry.name} flag`);
    expect(flag).toHaveClass("w-1/4", "md:w-1/6", "rounded-lg", "md:rounded-xl");
  });

  it("renders country name with animation", () => {
    render(<CountryHero country={mockCountry} />);
    
    const nameLetters = screen.getAllByTestId("motion-h1");
    expect(nameLetters).toHaveLength(mockCountry.name.length);
    
    nameLetters.forEach((letter, index) => {
      expect(letter).toHaveClass("inline-block");
      expect(letter.textContent).toBe(mockCountry.name[index]);
    });
  });

  it("applies correct layout classes", () => {
    render(<CountryHero country={mockCountry} />);
    
    const heroSection = screen.getByTestId("motion-section");
    expect(heroSection).toHaveClass("hero", "flex", "h-[95svh]", "md:h-screen", "flex-col", "gap-4", "md:gap-8");
  });
});
