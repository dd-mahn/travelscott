import { getCurrentDate } from 'src/utils/getCurrentDate';

describe('getCurrentDate', () => {
  it('should return date in YYYY-MM-DD format', () => {
    // Mock the Date object
    const mockDate = new Date('2023-12-25');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const result = getCurrentDate();

    expect(result).toBe('2023-12-25');
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Verify format

    // Restore Date
    jest.restoreAllMocks();
  });

  it('should pad single digit day and month with zero', () => {
    // Mock date with single digit day and month
    const mockDate = new Date('2023-01-05');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const result = getCurrentDate();

    expect(result).toBe('2023-01-05');

    // Restore Date
    jest.restoreAllMocks();
  });
});
