import { describe, test, expect } from 'vitest';
import { removeTrailingCommas } from './removeTrailingCommas';

describe('removeTrailingCommas', () => {
  describe('valid JSON - should remain unchanged', () => {
    test('should not modify valid JSON object without trailing comma', () => {
      const input = '{"key": "value", "number": 123}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should not modify valid JSON array without trailing comma', () => {
      const input = '[1, 2, 3, "test"]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should not modify nested valid JSON', () => {
      const input = '{"data": [{"id": 1}, {"id": 2}], "meta": {"count": 2}}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should not modify empty object and array', () => {
      expect(removeTrailingCommas('{}')).toBe('{}');
      expect(removeTrailingCommas('[]')).toBe('[]');
    });
  });

  describe('trailing commas in objects', () => {
    test('should remove trailing comma from simple object', () => {
      const input = '{"key": "value",}';
      const expected = '{"key": "value"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma with whitespace', () => {
      const input = '{"key": "value", }';
      const expected = '{"key": "value" }';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma with multiple spaces', () => {
      const input = '{"key": "value",   }';
      const expected = '{"key": "value"   }';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma with newlines', () => {
      const input = '{\n  "key": "value",\n}';
      const expected = '{\n  "key": "value"\n}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle multiple properties with trailing comma', () => {
      const input = '{"first": "value1", "second": "value2",}';
      const expected = '{"first": "value1", "second": "value2"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });
  });

  describe('trailing commas in arrays', () => {
    test('should remove trailing comma from simple array', () => {
      const input = '[1, 2, 3,]';
      const expected = '[1, 2, 3]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma from string array', () => {
      const input = '["first", "second", "third",]';
      const expected = '["first", "second", "third"]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma with whitespace in array', () => {
      const input = '[1, 2, 3, ]';
      const expected = '[1, 2, 3 ]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing comma with newlines in array', () => {
      const input = '[\n  1,\n  2,\n  3,\n]';
      const expected = '[\n  1,\n  2,\n  3\n]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });
  });

  describe('nested structures with trailing commas', () => {
    test('should remove trailing commas from nested objects', () => {
      const input = '{"outer": {"inner": "value",},}';
      const expected = '{"outer": {"inner": "value"}}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should remove trailing commas from nested arrays', () => {
      const input = '[[1, 2,], [3, 4,],]';
      const expected = '[[1, 2], [3, 4]]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle complex nested structure', () => {
      const input = '{"users": [{"name": "John", "age": 30,}, {"name": "Jane", "skills": ["js", "ts",],},],}';
      const expected = '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "skills": ["js", "ts"]}]}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle deeply nested structures', () => {
      const input = '{"a": {"b": {"c": [{"d": "value",},],},},}';
      const expected = '{"a": {"b": {"c": [{"d": "value"}]}}}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });
  });

  describe('string handling', () => {
    test('should not remove commas inside strings', () => {
      const input = '{"message": "Hello, world!"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should handle trailing comma with comma inside string', () => {
      const input = '{"message": "Hello, world!",}';
      const expected = '{"message": "Hello, world!"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle escaped quotes in strings', () => {
      const input = '{"escaped": "She said \\"Hello, world!\\"",}';
      const expected = '{"escaped": "She said \\"Hello, world!\\""}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle escaped backslashes', () => {
      const input = '{"path": "C:\\\\folder\\\\file,txt",}';
      const expected = '{"path": "C:\\\\folder\\\\file,txt"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle strings with closing braces', () => {
      const input = '{"template": "Hello {name}, welcome!",}';
      const expected = '{"template": "Hello {name}, welcome!"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle strings with closing brackets', () => {
      const input = '["item[0]", "item[1]",]';
      const expected = '["item[0]", "item[1]"]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });
  });

  describe('edge cases', () => {
    test('should handle empty string', () => {
      const input = '';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should handle single comma', () => {
      const input = ',';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should handle only whitespace', () => {
      const input = '   \\n\\t  ';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should not modify comma not followed by closing brace', () => {
      const input = '{"key": "value", "another": "value"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });

    test('should handle multiple trailing commas in sequence', () => {
      const input = '{"key": "value",,}';
      const expected = '{"key": "value"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle many consecutive trailing commas', () => {
      const input = '{"key": "value",,,,,}';
      const expected = '{"key": "value"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle multiple trailing commas with whitespace', () => {
      const input = '{"key": "value", , , }';
      const expected = '{"key": "value"   }'; // 공백은 보존됨
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle multiple trailing commas in arrays', () => {
      const input = '[1, 2, 3,,,]';
      const expected = '[1, 2, 3]';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle multiple trailing commas in nested structures', () => {
      const input = '{"outer": {"inner": "value",,,},,}';
      const expected = '{"outer": {"inner": "value"}}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle unclosed strings gracefully', () => {
      const input = '{"unclosed": "string value,}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(input);
    });
  });

  describe('real-world scenarios', () => {
    test('should fix trailing comma in configuration object', () => {
      const input = '{"host": "localhost", "port": 3000, "ssl": false,}';
      const expected = '{"host": "localhost", "port": 3000, "ssl": false}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should fix trailing commas in API response', () => {
      const input = '{"users": [{"id": 1, "name": "John",}, {"id": 2, "name": "Jane",},], "total": 2,}';
      const expected = '{"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}], "total": 2}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should fix formatted JSON with trailing commas', () => {
      const input = `{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21",
    "axios": "^0.27.2",
  },
  "scripts": {
    "start": "node index.js",
    "test": "jest",
  },
}`;
      const expected = `{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21",
    "axios": "^0.27.2"
  },
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  }
}`;
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });

    test('should handle mixed valid and invalid trailing commas', () => {
      const input = '{"valid": [1, 2, 3], "invalid": {"key": "value",}, "another": "normal"}';
      const expected = '{"valid": [1, 2, 3], "invalid": {"key": "value"}, "another": "normal"}';
      const result = removeTrailingCommas(input);

      expect(result).toBe(expected);
    });
  });
});