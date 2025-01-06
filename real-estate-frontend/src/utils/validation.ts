export const validateAddress = (input: string): boolean => {
  // Assume this product only supports US addresses
  if (!input || input.trim().length < 5) return false;

  const cleanInput = input.trim().toLowerCase();

  // Ensure the input contains both letters and numbers
  const hasLetters = /[a-z]/i.test(cleanInput);
  const hasNumbers = /\d/.test(cleanInput);

  // Prevent invalid characters (e.g., only symbols)
  const invalidCharsRegex = /[^\w\s.,#-]/;
  const hasInvalidChars = invalidCharsRegex.test(cleanInput);

  // Check for URLs
  const isUrl = /www\.|\.com$/.test(cleanInput);

  // Check for emails
  const isEmail = /@\w+\./.test(cleanInput);

  // Check for phone numbers
  const isPhoneNumber = /^\+?\d{1,4}[\s\d-]+$/.test(cleanInput);

  // Reject extremely long inputs
  if (cleanInput.length > 200) return false;

  // General check: contains letters, and either numbers or some address-like punctuation
  const isGeneralAddress = hasLetters && (hasNumbers || /[.,#-]/.test(cleanInput));

  return isGeneralAddress && !hasInvalidChars && !isUrl && !isEmail && !isPhoneNumber;
};
