# Git Workflow Guide for Blog Module

This guide outlines the Git workflow and best practices for the Dadson Logistics blog module development.

## Branch Strategy

### Main Branches

- `main`: Production-ready code
- `develop`: Integration branch for features
- `blog-testing-branch`: Dedicated branch for blog testing

### Feature Branches

- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes
- `release/*`: Release preparation

## Workflow

### 1. Starting Development

1. Create a new feature branch:
```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
```

2. Follow branch naming convention:
- Features: `feature/descriptive-name`
- Bug fixes: `bugfix/issue-description`
- Hotfixes: `hotfix/issue-description`

### 2. Development Process

1. Make atomic commits:
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add category filtering to blog listing"
```

2. Commit message format:
```
<type>: <description>

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

### 3. Keeping Up to Date

1. Regularly sync with develop:
```bash
# Get latest changes
git fetch origin

# Rebase on develop
git rebase origin/develop

# Resolve conflicts if any
git add .
git rebase --continue
```

2. Push changes:
```bash
# Push feature branch
git push origin feature/your-feature-name
```

### 4. Code Review

1. Create Pull Request:
- Source: `feature/your-feature-name`
- Target: `develop`
- Add description of changes
- Link related issues
- Request reviewers

2. Address review comments:
```bash
# Make changes
git add .
git commit -m "fix: address review comments"

# Push changes
git push origin feature/your-feature-name
```

### 5. Merging

1. Squash and merge:
```bash
# Update develop
git checkout develop
git pull origin develop

# Merge feature branch
git merge --squash feature/your-feature-name
git commit -m "feat: add category filtering to blog listing"
git push origin develop
```

2. Delete feature branch:
```bash
# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

## Best Practices

### 1. Commit Messages

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Limit first line to 72 characters
- Reference issues when applicable

Example:
```
feat: add category filtering to blog listing

- Add CategoryFilter component
- Implement category selection logic
- Update API to handle category filtering

Closes #123
```

### 2. Code Organization

- Keep changes focused and atomic
- One logical change per commit
- Don't mix different types of changes
- Keep commits small and manageable

### 3. Pull Requests

- Clear title describing the change
- Detailed description of changes
- Link to related issues
- Screenshots for UI changes
- Test instructions if applicable

### 4. Review Process

- Code review checklist:
  - [ ] Follows coding standards
  - [ ] Includes tests
  - [ ] Documentation updated
  - [ ] No console logs
  - [ ] No commented code
  - [ ] Proper error handling
  - [ ] Performance considered

### 5. Testing

- Write tests for new features
- Update tests for changes
- Ensure all tests pass
- Test edge cases
- Test error scenarios

## Common Tasks

### 1. Undoing Changes

1. Discard local changes:
```bash
git checkout -- .
```

2. Reset to last commit:
```bash
git reset --hard HEAD
```

3. Revert a commit:
```bash
git revert <commit-hash>
```

### 2. Stashing

1. Save changes:
```bash
git stash save "work in progress"
```

2. Apply stashed changes:
```bash
git stash pop
```

### 3. Conflict Resolution

1. During rebase:
```bash
# Resolve conflicts
git add .
git rebase --continue

# Or abort rebase
git rebase --abort
```

2. During merge:
```bash
# Resolve conflicts
git add .
git commit

# Or abort merge
git merge --abort
```

## Release Process

### 1. Release Preparation

1. Create release branch:
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

2. Version bump:
```bash
# Update version in package.json
npm version 1.0.0
```

3. Final testing:
- Run all tests
- Check documentation
- Verify deployment

### 2. Release

1. Merge to main:
```bash
git checkout main
git merge release/v1.0.0
git push origin main
```

2. Tag release:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

3. Merge back to develop:
```bash
git checkout develop
git merge main
git push origin develop
```

## Troubleshooting

### 1. Common Issues

1. Detached HEAD:
```bash
git checkout develop
```

2. Wrong branch:
```bash
git checkout correct-branch
```

3. Lost commits:
```bash
git reflog
git reset --hard HEAD@{n}
```

### 2. Git Configuration

1. Set up user:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@dadson.com"
```

2. Set up aliases:
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

## Support

For Git workflow support:
- Development Team: dev@dadson.com
- DevOps Team: devops@dadson.com 