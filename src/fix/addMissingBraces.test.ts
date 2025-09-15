import { describe, test, expect } from 'vitest';
import { addMissingBraces } from './addMissingBraces';

describe('addMissingBraces', () => {
  describe('valid JSON - should remain unchanged', () => {
    test('should not modify valid complete JSON object', () => {
      const input = '{"key": "value", "number": 123}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should not modify valid complete JSON array', () => {
      const input = '[1, 2, 3, "test"]';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should not modify nested valid JSON', () => {
      const input = '{"data": [{"id": 1}, {"id": 2}], "meta": {"count": 2}}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should not modify empty object and array', () => {
      expect(addMissingBraces('{}')).toBe('{}');
      expect(addMissingBraces('[]')).toBe('[]');
    });
  });

  describe('missing closing braces', () => {
    test('should add missing closing brace for object', () => {
      const input = '{"key": "value"';
      const expected = '{"key": "value"}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should add missing closing bracket for array', () => {
      const input = '[1, 2, 3';
      const expected = '[1, 2, 3]';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should add multiple missing closing braces in correct order', () => {
      const input = '{"outer": {"inner": [1, 2';
      const expected = '{"outer": {"inner": [1, 2]}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle complex nested structure with missing braces', () => {
      const input = '{"users": [{"name": "John", "data": {"age": 30';
      const expected = '{"users": [{"name": "John", "data": {"age": 30}}]}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should add missing braces for deeply nested structures', () => {
      const input = '{"a": {"b": {"c": [{"d": "value"';
      const expected = '{"a": {"b": {"c": [{"d": "value"}]}}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });
  });

  describe('extra closing braces', () => {
    test('should remove extra closing brace', () => {
      const input = '{"key": "value"}}';
      const expected = '{"key": "value"}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should remove extra closing bracket', () => {
      const input = '[1, 2, 3]]';
      const expected = '[1, 2, 3]';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should remove multiple extra closing braces', () => {
      const input = '{"key": "value"}}}]';
      const expected = '{"key": "value"}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });
  });

  describe('mismatched braces', () => {
    test('should fix mismatched closing brace (array opened, object closed)', () => {
      const input = '[1, 2, 3}';
      const expected = '[1, 2, 3]';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should fix mismatched closing brace (object opened, array closed)', () => {
      const input = '{"key": "value"]';
      const expected = '{"key": "value"}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should fix multiple mismatched braces', () => {
      const input = '{"array": [1, 2}, "object": {"key": "value"]]';
      const expected = '{"array": [1, 2], "object": {"key": "value"}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle complex mismatch scenario', () => {
      const input = '{"data": [{"nested": [1, 2}]';
      const expected = '{"data": [{"nested": [1, 2]}]}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });
  });

  describe('string handling', () => {
    test('should ignore braces inside strings', () => {
      const input = '{"message": "Hello {world} [test]"}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should handle escaped quotes in strings', () => {
      const input = '{"escaped": "She said \\"Hello {world}\\""}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should handle escaped backslashes in strings', () => {
      const input = '{"path": "C:\\\\folder\\\\{file}"}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should fix braces when string is not properly closed - return original', () => {
      const input = '{"unclosed": "string value';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should handle strings with newlines', () => {
      const input = '{"multiline": "line1\\nline2 {brace}"}';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should fix missing brace with complex string content', () => {
      const input = '{"data": {"message": "Contains } and ] chars"';
      const expected = '{"data": {"message": "Contains } and ] chars"}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });
  });

  describe('edge cases', () => {
    test('should handle empty string', () => {
      const input = '';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });

    test('should handle single opening brace', () => {
      const input = '{';
      const expected = '{}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle single opening bracket', () => {
      const input = '[';
      const expected = '[]';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle only closing braces', () => {
      const input = '}]}';
      const expected = '';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle whitespace only', () => {
      const input = '   \\t\\n  ';
      const result = addMissingBraces(input);

      expect(result).toBe(input);
    });
  });

  describe('real-world scenarios', () => {
    test('should fix truncated API response', () => {
      const input = '{"status": "success", "data": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"';
      const expected = '{"status": "success", "data": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should fix malformed configuration object', () => {
      const input = '{"config": {"database": {"host": "localhost", "port": 5432}, "cache": {"enabled": true';
      const expected = '{"config": {"database": {"host": "localhost", "port": 5432}, "cache": {"enabled": true}}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should fix array of objects with missing brackets', () => {
      const input = '[{"type": "user", "active": true}, {"type": "admin", "permissions": ["read", "write"';
      const expected = '[{"type": "user", "active": true}, {"type": "admin", "permissions": ["read", "write"]}]';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });

    test('should handle complex nested structure from real data', () => {
      const input = '{"response": {"users": [{"profile": {"personal": {"name": "Test"}, "work": {"title": "Dev"';
      const expected = '{"response": {"users": [{"profile": {"personal": {"name": "Test"}, "work": {"title": "Dev"}}}]}}';
      const result = addMissingBraces(input);

      expect(result).toBe(expected);
    });
  });
});