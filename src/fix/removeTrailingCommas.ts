/**
 * Remove trailing commas from JSON-like strings while:
 * - respecting string literals (commas inside strings are kept)
 * - handling escape sequences correctly (\\, \")
 * - preserving whitespace before closing ']' or '}'
 *
 * Declarative, immutable, single-pass (reduce-based) implementation.
 */
export function removeTrailingCommas(json: string): string {
  const chars = Array.from(json);

  // ---- small, declarative helpers ----
  const isQuote = (c: string) => c === '"';
  const isBackslash = (c: string) => c === "\\";
  const isWhitespace = (c: string) => /\s/.test(c);
  const isClosing = (c: string | null) => c === "]" || c === "}";
  const nextMeaningfulChar = (arr: string[], start: number): string | null =>
    start >= arr.length || arr[start] === undefined
      ? null
      : isWhitespace(arr[start]) || arr[start] === ","
      ? nextMeaningfulChar(arr, start + 1)
      : arr[start];

  type State = { 
    out: string; 
    inString: boolean; 
    escaping: boolean; 
    skippingTrailingCommas: boolean;
  };

  const initial: State = { 
    out: "", 
    inString: false, 
    escaping: false, 
    skippingTrailingCommas: false 
  };

  const final = chars.reduce<State>((s, ch, i, arr) => {
    // Inside a quoted string
    if (s.inString) {
      const out = s.out + ch;

      if (isBackslash(ch)) {
        // toggle: odd/even backslashes
        return { ...s, out, escaping: !s.escaping };
      }
      if (isQuote(ch) && !s.escaping) {
        // end of string when quote is not escaped
        return { ...s, out, inString: false, escaping: false };
      }
      // regular char inside string resets escaping
      return { ...s, out, escaping: false };
    }

    // Currently skipping trailing commas
    if (s.skippingTrailingCommas) {
      if (ch === ",") {
        // Continue skipping consecutive commas
        return s;
      }
      if (isWhitespace(ch)) {
        // Check if this whitespace is followed by closing bracket
        const nextChar = nextMeaningfulChar(arr, i + 1);
        if (isClosing(nextChar)) {
          // Keep whitespace before closing bracket
          return { ...s, out: s.out + ch };
        }
        // Skip whitespace between commas
        return s;
      }
      if (isClosing(ch)) {
        // Found closing bracket, stop skipping and include it
        return { ...s, out: s.out + ch, skippingTrailingCommas: false };
      }
      // Found non-comma, non-whitespace, non-closing char - stop skipping
      return { ...s, out: s.out + ch, skippingTrailingCommas: false };
    }

    // Entering a quoted string
    if (isQuote(ch)) {
      return { ...s, out: s.out + ch, inString: true, escaping: false };
    }

    // Potential trailing comma (outside string)
    if (ch === ",") {
      const next = nextMeaningfulChar(arr, i + 1);
      // drop the comma iff the next meaningful token closes the container
      if (isClosing(next)) {
        return { ...s, skippingTrailingCommas: true };
      }
    }

    // Default: append the character
    return { ...s, out: s.out + ch };
  }, initial);

  return final.out;
}
