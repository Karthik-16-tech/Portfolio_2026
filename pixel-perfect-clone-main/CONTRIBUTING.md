# Contributing to Pixel Perfect Portfolio

First off, thank you for considering contributing to this portfolio project! It's people like you that make this project such a great tool.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**
- **Specify your environment** (OS, Node version, npm version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the styleguides
- End all files with a newline
- Avoid large pull requests (try to keep them < 500 lines of changes)

## 🎨 Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript/TypeScript Styleguide

- Use ESLint configuration provided
- Run `npm run format` before committing
- Use TypeScript for type safety
- Add comments for complex logic

```typescript
// Good
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Avoid
const calculateTotal = (items) => {
  let total = 0;
  items.forEach(item => {
    total += item.price;
  });
  return total;
};
```

### React Component Styleguide

- Use functional components with hooks
- One component per file
- Use descriptive component names
- Add prop types/interfaces

```typescript
interface ComponentProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
}

export function MyComponent({ title, isVisible, onClose }: ComponentProps) {
  return (
    <div>
      {title}
    </div>
  );
}
```

### CSS/Tailwind Styleguide

- Use Tailwind CSS utility classes
- Group related utilities
- Use `@apply` for reusable styles
- Keep specificity low

```css
/* Good */
.card {
  @apply rounded-lg border border-white/12 bg-gradient-to-br p-6 shadow-lg transition-all duration-300;
}

/* Avoid inline complex styles - use Tailwind instead */
```

## 📝 Development Workflow

### 1. Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pixel-perfect-clone.git
cd pixel-perfect-clone

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

```bash
# Run development server
npm run dev

# In another terminal, run linter
npm run lint

# Format code
npm run format
```

### 3. Test Your Changes

```bash
# Build production version
npm run build

# Preview production build
npm run preview

# Check performance
# Open DevTools and check:
# - Network tab for asset sizes
# - Performance tab for rendering
# - Console for errors
```

### 4. Commit & Push

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add feature: description"

# Push to your fork
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub and create a PR
- Fill in the PR template
- Link any related issues
- Wait for review

## 🔍 Code Review

All submissions are subject to review. Reviewers will check for:

- ✅ Code quality and style compliance
- ✅ Performance impact
- ✅ Security considerations
- ✅ Documentation
- ✅ Tests (if applicable)
- ✅ No breaking changes

## 📚 Project Structure

Know what you're modifying:

```
src/
├── routes/          # Page components (TanStack Router)
├── components/      # Reusable React components
├── lib/            # Utilities and helpers
├── hooks/          # Custom React hooks
├── types/          # TypeScript types
└── styles/         # Global CSS and Tailwind config
```

## 🚀 Deployment

After your PR is merged to `main`:

1. GitHub Actions runs CI/CD pipeline
2. Tests and builds verified
3. Automatic deployment to Vercel
4. Live on production (if all checks pass)

## 📋 PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2

## Testing
Describe testing done

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Ran `npm run lint`
- [ ] Ran `npm run format`
- [ ] Build succeeds (`npm run build`)
- [ ] No breaking changes
- [ ] Documentation updated
```

## ❓ Questions?

- Check existing issues and discussions
- Review the README and documentation
- Open a GitHub discussion
- Contact maintainer

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Happy contributing! 🎉**
