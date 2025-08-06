// This is a mock CMS client that simulates fetching data from a CMS like Sanity.io
// In a real implementation, this would be replaced with actual API calls to the CMS

// Mock blackout dates from CMS
const mockBlackoutDates = [
  new Date("2025-08-05"),
  new Date("2025-08-06"),
  new Date("2025-08-07"),
  new Date("2025-09-01"),
  new Date("2025-09-02"),
  new Date("2025-09-15"),
  new Date("2025-09-16"),
  // Add more dates as needed
];

// Function to fetch blackout dates from the CMS
export const fetchBlackoutDates = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would be an API call to the CMS
  // Example with Sanity.io:
  // const query = `*[_type == "blackoutDate"] { date }`;
  // const result = await client.fetch(query);
  // return result.map(item => new Date(item.date));
  
  return mockBlackoutDates;
};

// Function to check if a date is in the blackout list
export const isBlackoutDate = (date, blackoutDates) => {
  if (!date || !blackoutDates || blackoutDates.length === 0) return false;
  
  return blackoutDates.some(blackoutDate => 
    date.getFullYear() === blackoutDate.getFullYear() &&
    date.getMonth() === blackoutDate.getMonth() &&
    date.getDate() === blackoutDate.getDate()
  );
};

// Function to check if a date range overlaps with any blackout date
export const dateRangeOverlapsBlackout = (startDate, endDate, blackoutDates) => {
  if (!startDate || !endDate || !blackoutDates || blackoutDates.length === 0) return false;
  
  // Check each day in the range
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    if (isBlackoutDate(day, blackoutDates)) {
      return true;
    }
  }
  
  return false;
};

