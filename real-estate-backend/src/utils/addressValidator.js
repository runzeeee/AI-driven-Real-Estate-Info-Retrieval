exports.isValid = (address) => {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // Basic validation: check if address has at least street number and street name
  const trimmedAddress = address.trim();
  return trimmedAddress.length >= 5 && /\d+\s+\w+/.test(trimmedAddress);
}; 