import { validateAddress } from "../validation";

describe("validateAddress", () => {
  // Test valid address formats
  test("should accept valid addresses", () => {
    const validAddresses = [
      "123 Main St",
      "456 Oak Avenue",
      "789 Pine Road, Apt #4",
      "1010 5th Ave, New York, NY 10028",
      "42-01 28th Street",
      "100-B Broadway",
      "12A Main Street",
    ];

    validAddresses.forEach((address) => {
      expect(validateAddress(address)).toBe(true);
    });
  });

  // Test invalid address formats
  test("should reject invalid addresses", () => {
    const invalidAddresses = [
      "", // empty string
      "   ", // whitespace only
      "abcd", // letters only
      "12345", // numbers only
      "@#$%", // special characters only
      "ab", // too short
      "www.example.com", // website URL
      "john@email.com", // email address
      "+1 123-456-7890", // phone number
    ];

    invalidAddresses.forEach((address) => {
      expect(validateAddress(address)).toBe(false);
    });
  });

  // Test edge cases and boundary values
  test("should handle edge cases", () => {
    const edgeCases = [
      { input: null, expected: false },
      { input: undefined, expected: false },
      { input: "   123 Main St   ", expected: true }, // leading/trailing spaces
      { input: "Apt. #123", expected: true }, // with special characters
      { input: "1-A Main St", expected: true }, // with hyphen
      { input: "12345".repeat(20), expected: false }, // extremely long input
      { input: "1 A", expected: false }, // too short but with number and letter
    ];

    edgeCases.forEach(({ input, expected }) => {
      // @ts-ignore - intentionally testing null/undefined cases
      expect(validateAddress(input)).toBe(expected);
    });
  });

  // Test special address formats
  test("should handle special address formats", () => {
    const specialFormats = [
      { input: "P.O. Box 12345", expected: true },
      { input: "Unit 4B, 123 Main St", expected: true },
      { input: "123-45 Queens Blvd", expected: true },
      { input: "100 Broadway #5G", expected: true },
      { input: "Apt 3B, 123 Main St", expected: true },
      { input: "Suite 500, 1000 Park Ave", expected: true },
      { input: "Floor 12, 555 5th Avenue", expected: true },
    ];

    specialFormats.forEach(({ input, expected }) => {
      expect(validateAddress(input)).toBe(expected);
    });
  });

  // Test address with different case formats
  test("should handle different case formats", () => {
    const caseFormats = [
      { input: "123 MAIN STREET", expected: true }, // all caps
      { input: "123 main street", expected: true }, // all lowercase
      { input: "123 Main Street", expected: true }, // title case
      { input: "123 mAiN StReEt", expected: true }, // mixed case
    ];

    caseFormats.forEach(({ input, expected }) => {
      expect(validateAddress(input)).toBe(expected);
    });
  });


  // Test valid inputs with complex but acceptable formats
  test("should accept complex valid addresses", () => {
    const complexValidAddresses = [
      "123 Main St, Suite 500", // address with suite
      "456 Elm Rd, Floor 12", // address with floor
      "100-B Broadway, Apt 3C", // hyphen and apartment number
      "P.O. Box 12345, City Name, ST 54321", // PO Box with full address
      "42-01 Queens Blvd", // hyphenated street number
      "Unit 1, 789 Pine Lane", // unit number
    ];

    complexValidAddresses.forEach((input) => {
      expect(validateAddress(input)).toBe(true);
    });
  });

  // Test invalid inputs resembling addresses
  test("should reject invalid address-like inputs", () => {
    const addressLikeInvalidInputs = [
      "123456", // only numbers
      "Main Street", // only street name
      "123", // only numbers with insufficient length
      "@Main St", // invalid symbol at the start
      "123 Main St.#$", // invalid symbols at the end
      "www.mainstreet.com", // URL-like input
      "john@mainstreet.com", // email-like input
    ];

    addressLikeInvalidInputs.forEach((input) => {
      expect(validateAddress(input)).toBe(false);
    });
  });

  // Test handling of boundary conditions
  test("should handle boundary conditions gracefully", () => {
    const boundaryConditions = [
      { input: "", expected: false }, // empty string
      { input: "   ", expected: false }, // whitespace-only
      { input: "a", expected: false }, // single letter
      { input: "123", expected: false }, // only numbers
      { input: "Main St", expected: false }, // only letters with a street name
      { input: "123 Main St.", expected: true }, // valid simple address
    ];

    boundaryConditions.forEach(({ input, expected }) => {
      expect(validateAddress(input)).toBe(expected);
    });
  });

  // Test large input size
  test("should reject extremely long inputs", () => {
    const longInput = "123 Main St, Apt 5B, City Name, ST 12345".repeat(50); // unrealistic length
    expect(validateAddress(longInput)).toBe(false);
  });

  // Test inputs with excessive spacing
  test("should handle excessive spacing", () => {
    const spacedInputs = [
      { input: "   123   Main   St   ", expected: true },
      { input: "   Apt   #5B   ", expected: true },
      { input: "  1000   Broadway  ", expected: true },
    ];

    spacedInputs.forEach(({ input, expected }) => {
      expect(validateAddress(input)).toBe(expected);
    });
  });
});
