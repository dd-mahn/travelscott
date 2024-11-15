import { describe, it, expect } from 'vitest';
import type { ApiResponse } from 'src/types/ApiResponse';

describe('ApiResponse', () => {
  it('should match the expected interface structure', () => {
    const mockResponse: ApiResponse<string> = {
      message: 'Success',
      data: 'Test data'
    };

    expect(mockResponse).toHaveProperty('message');
    expect(mockResponse).toHaveProperty('data');
    expect(typeof mockResponse.message).toBe('string');
  });

  it('should work with different data types', () => {
    const numberResponse: ApiResponse<number> = {
      message: 'Success',
      data: 42
    };

    const objectResponse: ApiResponse<{id: number}> = {
      message: 'Success', 
      data: {id: 1}
    };

    expect(typeof numberResponse.data).toBe('number');
    expect(typeof objectResponse.data).toBe('object');
    expect(objectResponse.data).toHaveProperty('id');
  });
});
