import createRegexArray from 'src/utils/createRegexArray';

describe('createRegexArray', () => {
  it('should create regex array from comma-separated string', () => {
    const input = 'test,sample,example';
    const result = createRegexArray(input);

    expect(result).toHaveLength(3);
    expect(result[0]).toBeInstanceOf(RegExp);
    expect('test').toMatch(result[0]);
    expect('TEST').toMatch(result[0]);
    expect('testing').not.toMatch(new RegExp(`^${result[0].source}$`));
  });

  it('should create regex array from string array', () => {
    const input = ['test', 'sample', 'example'];
    const result = createRegexArray(input);

    expect(result).toHaveLength(3);
    expect(result[0]).toBeInstanceOf(RegExp);
    expect('test').toMatch(result[0]);
    expect('TEST').toMatch(result[0]);
    expect('testing').not.toMatch(new RegExp(`^${result[0].source}$`));
  });

  it('should handle single item input', () => {
    const input = 'test';
    const result = createRegexArray(input);

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(RegExp);
    expect('test').toMatch(result[0]);
    expect('TEST').toMatch(result[0]);
    expect('testing').not.toMatch(new RegExp(`^${result[0].source}$`));
  });

  it('should be case insensitive', () => {
    const input = 'Test,SAMPLE,ExAmPlE';
    const result = createRegexArray(input);

    expect(result).toHaveLength(3);
    result.forEach((regex, index) => {
      expect(input.split(',')[index].toLowerCase()).toMatch(regex);
      expect(input.split(',')[index].toUpperCase()).toMatch(regex);
    });
  });
});
