import { describe, test, expect } from 'vitest';
import { removeEmptyObjectPrefix } from '../../src/fix/removeEmptyObjectPrefix';

describe('removeEmptyObjectPrefix', () => {
  test('should remove empty object prefix from valid JSON string', () => {
    const input = '{}{"key": "value"}';
    const expected = '{"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with nested objects', () => {
    const input = '{}{"user": {"name": "John", "age": 30}}';
    const expected = '{"user": {"name": "John", "age": 30}}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with arrays', () => {
    const input = '{}[1, 2, 3]';
    const expected = '[1, 2, 3]';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with string values', () => {
    const input = '{}"hello world"';
    const expected = '"hello world"';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with number values', () => {
    const input = '{}123';
    const expected = '123';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with boolean values', () => {
    const input = '{}true';
    const expected = 'true';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should remove empty object prefix with null values', () => {
    const input = '{}null';
    const expected = 'null';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should not modify string without empty object prefix', () => {
    const input = '{"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(input);
  });

  test('should not modify string with non-empty object prefix', () => {
    const input = '{"existing": "data"}{"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(input);
  });

  test('should not modify string starting with empty array', () => {
    const input = '[]{"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(input);
  });

  test('should handle empty string', () => {
    const input = '';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(input);
  });

  test('should handle string with only empty object', () => {
    const input = '{}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(input);
  });

  test('should handle string with empty object prefix and whitespace', () => {
    const input = '{} {"key": "value"}';
    const expected = ' {"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should handle multiple empty object prefixes (only removes first)', () => {
    const input = '{}{}{"key": "value"}';
    const expected = '{}{"key": "value"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should handle empty object prefix with complex nested JSON', () => {
    const input = '{}{"data": [{"id": 1, "items": [{"name": "test"}]}]}';
    const expected = '{"data": [{"id": 1, "items": [{"name": "test"}]}]}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should handle empty object prefix with special characters', () => {
    const input = '{}{"key": "value with \\"quotes\\" and \\n newlines"}';
    const expected = '{"key": "value with \\"quotes\\" and \\n newlines"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });

  test('should handle empty object prefix with unicode characters', () => {
    const input = '{}{"unicode": "こんにちは 🌟"}';
    const expected = '{"unicode": "こんにちは 🌟"}';
    const result = removeEmptyObjectPrefix(input);

    expect(result).toBe(expected);
  });
});