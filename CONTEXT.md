# Project Context and Guidelines

This document contains essential guidelines and context for the es-json project. All contributors (agents and humans) must follow these guidelines when working on this project.

## Project Overview

es-json is a JavaScript/TypeScript utility library focused on JSON manipulation, including:
- JSON correction and validation
- JSON merging operations
- JSON transformation utilities
- Performance-optimized JSON operations

## Tech Stack

### Package Manager
- **npm**: Official package manager for dependency management
- Use `npm` for all package operations (install, update, scripts)

### Programming Language
- **TypeScript**: Primary language for all source code
- Strict TypeScript configuration for maximum type safety
- Use latest stable TypeScript features

### Testing Framework
- **Vitest**: Fast and modern testing framework
- Write comprehensive unit tests for all functions
- Use Vitest's built-in assertion library
- Test commands: `npm test`, `npm run test:watch`

### Linting
- **oxlint**: Ultra-fast JavaScript/TypeScript linter
- Must pass all linting checks before commits
- Lint command: `npm run lint`
- Auto-fix when possible: `npm run lint:fix`

## Development Guidelines

### Language Requirements
- **ALL documentation, comments, code, issues, commits, and PRs MUST be written in English**
- No exceptions - this includes inline comments, JSDoc, commit messages, and PR descriptions

### Documentation Management
- **README.md**: Must be updated whenever new functions or features are added
- **CONTEXT.md**: Must be updated whenever project guidelines or development processes change
- **CLAUDE.md**: Contains instructions for AI assistants working on this project

### Code Standards
- Use TypeScript with strict configuration
- Follow existing code patterns and conventions
- Include comprehensive JSDoc comments for all public APIs
- Write comprehensive Vitest unit tests for all new functionality
- Ensure all code passes oxlint and TypeScript compilation
- Use npm scripts for all development tasks

### Commit Guidelines
- Use conventional commit format
- Write clear, descriptive commit messages in English
- Include function/feature updates in commit descriptions
- Reference related issues when applicable

### Function Development Process
When adding new functions:
1. Implement the function with proper TypeScript types
2. Add comprehensive JSDoc documentation
3. Write unit tests
4. Update README.md with function documentation
5. Run linting and type checking
6. Update CONTEXT.md if development processes change

### Testing Requirements
- All new functions must have Vitest unit tests
- Tests should cover edge cases and error conditions
- Maintain high test coverage using Vitest coverage tools
- Use consistent Vitest testing patterns
- Test files should be located in `test/` directory or `*.test.ts` files
- Run tests with `npm test` before committing

### Performance Considerations
- Optimize for common JSON operations
- Consider memory usage for large JSON objects
- Benchmark performance-critical functions
- Document any performance characteristics

## File Structure
```
es-json/
├── src/           # Source code
├── test/          # Test files
├── docs/          # Additional documentation
├── README.md      # Project introduction and API docs
├── CONTEXT.md     # This file - project guidelines
├── CLAUDE.md      # AI assistant instructions
└── package.json   # Project configuration
```

## Maintenance Tasks
- Regularly update dependencies
- Keep documentation synchronized with code changes
- Review and update examples
- Maintain backward compatibility when possible

## Quality Assurance
- All code must pass TypeScript compilation (`npm run build`)
- All Vitest tests must pass (`npm test`)
- Code must pass oxlint rules (`npm run lint`)
- Documentation must be up-to-date
- Follow semantic versioning for releases

## Development Commands
- `npm install` - Install dependencies
- `npm run build` - Build TypeScript to JavaScript
- `npm test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run oxlint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run dev` - Development mode (if applicable)