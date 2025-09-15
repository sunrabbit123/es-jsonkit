# es-json

A powerful and efficient JavaScript/TypeScript utility library for JSON manipulation and operations.

## Overview

es-json provides a comprehensive set of utilities for working with JSON data, including:

- **JSON Correction**: Automatically fix malformed JSON strings
- **JSON Merging**: Deep merge multiple JSON objects with customizable strategies
- **JSON Transformation**: Transform and manipulate JSON structures
- **Performance Optimized**: Built for high-performance JSON operations

## Installation

```bash
npm install es-json
```

## Quick Start

```javascript
import { merge, correct, transform } from 'es-json';

// Merge JSON objects
const merged = merge(obj1, obj2);

// Correct malformed JSON
const corrected = correct(malformedJsonString);

// Transform JSON structure
const transformed = transform(data, transformRules);
```

## API Documentation

### Functions

*Note: This section will be updated as functions are implemented.*

<!-- Functions will be documented here as they are added -->

## Features

- 🚀 **High Performance**: Optimized for speed and memory efficiency
- 🛡️ **Type Safe**: Full TypeScript support with comprehensive type definitions
- 🧪 **Well Tested**: Comprehensive test coverage with Vitest
- 📚 **Well Documented**: Detailed API documentation and examples
- 🔧 **Flexible**: Customizable options for various use cases
- ⚡ **Modern Tooling**: Built with TypeScript, tested with Vitest, linted with oxlint

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd es-json

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

### Scripts

- `npm test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run oxlint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run build` - Build TypeScript to JavaScript

## Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

**Note**: This library is actively under development. The API may change before the first stable release.