# Contributing to SpamGuard AI

Thank you for your interest in contributing to SpamGuard AI! We welcome contributions from the community and appreciate your help in making this project better.

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:
- Python 3.11+
- Node.js 16+
- Git
- Basic knowledge of React and Flask

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/SpamGuard-AI.git
   cd SpamGuard-AI
   ```

2. **Set up the development environment**
   ```bash
   ./setup.sh
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. **Search existing issues** to avoid duplicates
2. **Create a detailed issue** with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - System information (OS, Python version, etc.)
   - Screenshots (if applicable)

### Submitting Pull Requests

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow the coding standards below
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Test backend
   python -m pytest tests/
   
   # Test frontend
   cd frontend && npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## 📋 Coding Standards

### Python (Backend)

- Follow [PEP 8](https://pep8.org/) style guide
- Use type hints where appropriate
- Write docstrings for functions and classes
- Keep functions small and focused
- Use meaningful variable names

```python
def preprocess_text(text: str) -> str:
    """Clean and preprocess text data for ML models.
    
    Args:
        text: Raw text input
        
    Returns:
        Cleaned and processed text
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    # ... rest of processing
    
    return text
```

### JavaScript/React (Frontend)

- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Keep components small and reusable
- Use proper prop types

```jsx
const EmailComposer = ({ onSubmit, isLoading, disabled }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  // Component logic here...

  return (
    // JSX here...
  );
};
```

### Git Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(ml): add neural network model
fix(ui): resolve dark theme button colors
docs(readme): update installation instructions
```

## 🧪 Testing

### Backend Tests

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
python -m pytest tests/ -v

# Run with coverage
python -m pytest tests/ --cov=app
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Manual Testing

1. **Test the application flow**:
   - Model training
   - Email classification
   - UI responsiveness

2. **Test with various inputs**:
   - Different spam examples
   - Various legitimate emails
   - Edge cases (empty inputs, special characters)

## 📚 Documentation

When contributing:

1. **Update README.md** if you change functionality
2. **Add docstrings** to new functions
3. **Update API documentation** for endpoint changes
4. **Include examples** for new features

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### 🐛 Bug Fixes
- UI/UX improvements
- Performance optimizations
- Cross-browser compatibility
- Mobile responsiveness

### ✨ New Features
- Additional ML models
- Email attachment analysis
- Real-time monitoring
- API rate limiting
- Docker containerization

### 📖 Documentation
- Tutorial videos
- API documentation
- Code examples
- Translation to other languages

### 🧪 Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

## 💡 Feature Requests

For new features:

1. **Check existing issues** and discussions
2. **Create a feature request** with:
   - Clear use case
   - Proposed implementation
   - Benefits to users
   - Potential challenges

3. **Discuss with maintainers** before starting work

## 🔍 Code Review Process

1. **Automated checks** must pass:
   - Linting
   - Tests
   - Build process

2. **Manual review** by maintainers:
   - Code quality
   - Functionality
   - Documentation

3. **Feedback incorporation**:
   - Address review comments
   - Update tests if needed
   - Maintain clean commit history

## 🎉 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Special mentions for significant contributions

## 📞 Getting Help

If you need help:

1. **Check the documentation** first
2. **Search existing issues**
3. **Join our discussions** on GitHub
4. **Ask questions** in new issues

## 📋 Checklist

Before submitting a PR:

- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No merge conflicts
- [ ] Related issues are referenced

Thank you for contributing to SpamGuard AI! 🚀 