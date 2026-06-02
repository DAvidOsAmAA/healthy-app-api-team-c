# Git & GitHub Best Practices and Conventions

This document outlines the Git and GitHub standards, workflows, and conventions to be followed in this project. Adhering to these guidelines ensures a clean git history, seamless code reviews, and high-velocity team collaboration.

---

## 🗺️ 1. Branching Strategy (GitHub Flow)

We follow a lightweight, production-ready **GitHub Flow** model. All modifications to the codebase must go through short-lived feature branches merged into `main` via Pull Requests (PRs).

### 🏷️ Branch Naming Convention

All branches must follow the strict format: `{type}/{JIRA_ID}/summary`
- **`type`**: The category of changes (e.g. `feat`, `fix`, `refactor`).
- **`JIRA_ID`**: The uppercase JIRA ticket identifier (e.g., `PROJ-123`, `API-99`).
- **`summary`**: A brief kebab-case description of the task.

| Prefix | Use Case | Example |
| :--- | :--- | :--- |
| `feat/` | A new feature or capability | `feat/PROJ-101/jwt-authentication` |
| `fix/` | A bug fix or patch | `fix/PROJ-102/user-token-expiry` |
| `refactor/` | Code structure change without changing functionality | `refactor/PROJ-103/modularize-guards` |
| `docs/` | Updates or additions to documentation | `docs/PROJ-104/add-git-guidelines` |
| `perf/` | Code changes aimed at improving performance | `perf/PROJ-105/optimize-db-queries` |
| `test/` | Adding or correcting test suites | `test/PROJ-106/add-auth-e2e` |
| `chore/` | Maintenance tasks, library upgrades, or config changes | `chore/PROJ-107/update-eslint-deps` |

> [!IMPORTANT]
> Never commit directly to the `main` branch. All commits must be made to dedicated branch names matching the pattern above. Branch names are automatically validated by our GitHub actions workflow on PR creation.

---

## ✍️ 2. Commit Message Conventions (Conventional Commits)

We strictly adhere to the **Conventional Commits** specification. This provides a readable, consistent git log and enables automated changelog generation.

### 🏗️ Commit Structure

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 📋 Rules of Thumb

1. **Type**: Must be one of:
   - `feat` (new feature)
   - `fix` (bug fix)
   - `refactor` (code improvement)
   - `docs` (documentation changes)
   - `style` (formatting, white-space - *does not affect logic*)
   - `test` (adding missing tests)
   - `chore` (updating tasks, package config; no production code changes)
2. **Scope**: Optional but highly recommended. Represents the module or layer being changed (e.g., `auth`, `user`, `common`).
3. **Imperative Tone**: Always write the description in the present imperative tense:
   - **Good**: `feat(auth): add JWT validation guard`
   - **Bad**: `feat(auth): added JWT validation guard` or `feat(auth): adds JWT validation guard`
4. **Case & Punctuation**:
   - Start the description with a lowercase letter.
   - Do not end the description with a period (`.`).
5. **Length**: Limit the subject line to **50 characters** or less. Keep the body (if present) wrapped at **72 characters**.

### 📝 Example Commits

*   **Simple feature**:
    ```text
    feat(auth): implement google OAuth2 strategy
    ```
*   **Bug fix**:
    ```text
    fix(user): resolve null pointer exception on signup profile creation
    ```
*   **Chore with body**:
    ```text
    chore(deps): upgrade NestJS dependencies to v11

    Upgrades core NestJS, common, and platform-express packages to
    the latest major release to benefit from enhanced performance.
    ```

---

## 🔀 3. Local Workflow Best Practices

Keep your local branch clean and up-to-date with upstream changes to minimize merge conflicts.

### 🔄 Keep in Sync using Rebase

Avoid generating noisy local "merge commits" (e.g. `Merge branch 'main' into feat/...`). Instead, use `git rebase` to keep your branch updated:

```bash
# Fetch latest upstream changes
git checkout main
git pull

# Go back to your feature branch and rebase
git checkout feat/your-feature
git rebase main
```

*This cleanly replays your feature commits on top of the latest version of `main`, ensuring a perfectly linear git history.*

### 🧹 Clean Up Commits Before Publishing

Use **Interactive Rebasing** to clean up, combine (squash), or reword local "wip" commits before pushing to GitHub:

```bash
# Rebase interactively the last N commits
git rebase -i HEAD~N
```

---

## 📥 4. Pull Request (PR) & Review Guidelines

A Pull Request is an invitation for your team to inspect and improve your code.

### 🏷️ Pull Request Title Convention

All Pull Requests must strictly follow the format: `{type}(JIRA_ID): summary`
- **`type`**: The category of changes (e.g. `feat`, `fix`, `refactor`).
- **`JIRA_ID`**: The uppercase JIRA ticket identifier enclosed in parentheses (e.g., `(PROJ-123)`, `(API-99)`).
- **`summary`**: A concise explanation starting with a lowercase letter, keeping it imperative.

**Examples:**
- `feat(PROJ-101): implement google OAuth2 strategy`
- `fix(PROJ-102): resolve null pointer exception on signup`
- `chore(PROJ-107): upgrade NestJS dependencies to v11`

> [!IMPORTANT]
> PR titles are automatically checked by our GitHub actions workflow on PR creation and updates. Violating PR titles will block the merging pipeline.

### 📐 PR Size (Single Responsibility)

- **Keep PRs small**: Ideally under **250 lines of code**. Large PRs are slow to review, hard to debug, and prone to hidden bugs.
- If a feature is large, break it down into smaller, sequential PRs (e.g., first PR adds database entities, second PR adds controllers/services).

### 📝 Writing a Good Pull Request

Every Pull Request must have a clear, structured description detailing the changes. To make this effortless, we use an automated **Pull Request Template**.

#### 📋 Pull Request Description Template

GitHub automatically reads a file named `pull_request_template.md` in the `.github/` folder of the repository. When you open a new Pull Request, the body of the PR is pre-filled with this template.

We have pre-configured a PR template in [.github/pull_request_template.md](file:///Users/mo/work/personal/boilerplate/.github/pull_request_template.md) which prompts developers to provide:
1. **Description**: High-level summary of changes.
2. **JIRA Ticket**: Clickable link to the JIRA ticket (e.g. `[PROJ-123](https://your-domain.atlassian.net/browse/PROJ-123)`).
3. **Type of Change**: Checklist indicating `feat`, `fix`, `refactor`, etc.
4. **How It Was Tested**: Proof of unit/integration testing or manual verification.
5. **PR Checklist**: Verification of branch and title conventions, local lint checking, documentation updates, and self-review.

#### 🔧 How to Create or Modify a PR Template

If you need to create a new template or customize the existing one:
1. Create or edit a markdown file at `.github/pull_request_template.md` in your repository.
2. Add the markdown structure you want developers to follow.
3. Commit and push the file to the default branch (e.g., `main`).
4. Any newly created PRs will now automatically load that template structure.

Here is an example of what a completed PR description looks like using the template:

```markdown
## 📝 Description
Implements the JWT authentication strategy and hooks it up to the `/auth/login` endpoint.

## 🔗 JIRA Ticket
- **Ticket**: [PROJ-123](https://company.atlassian.net/browse/PROJ-123)

## 🛠️ Type of Change
- [x] `feat` (New feature)

## 🧪 How Has This Been Tested?
- [x] **Automated Tests**: Wrote unit and e2e integration tests. Run via `npm run test:e2e` (All passed).
- [x] **Manual Verification**: Inspected JWT token response format and validated signature manually.

## ✅ PR Checklist
- [x] My branch name follows the convention: `feat/PROJ-123/jwt-auth`
- [x] My PR title follows the convention: `feat(PROJ-123): implement jwt authentication`
- [x] I have run `npm run lint:check` locally and it passes.
- [x] I have updated documentation accordingly.
- [x] I have self-reviewed my changes on GitHub.
```

### 🤝 Code Review Etiquette

#### For the Reviewer:
- **Be constructive and empathetic**: Focus on the code, not the author.
- **Categorize feedback**: Use tags to clarify the severity of your comments:
  - `[BLOCKER]` Critical issues that must be fixed before merging (e.g. security risk, broken logic).
  - `[RECOMMENDED]` Good practices or refactor suggestions, but not strictly blocking.
  - `[NITPICK]` Minor stylistic preferences or typos.

#### For the Author:
- Self-review your code on GitHub before requesting reviews to spot obvious typos or leftover debug statements.
- Welcome feedback as an opportunity to build a better system.

---

## 🔒 5. Branch Protection & GitHub Settings

To maintain software quality, we configure the following settings on our GitHub repository:

1. **Branch Protection on `main`**:
   - **Require Approvals**: At least one approved review is required before merging.
   - **Require Status Checks**: Continuous Integration (CI) test suites and linter runs (`npm run lint:check` via Husky/CI) must pass before merging.
   - **No Direct Pushes**: Bypassing the PR flow is strictly disabled for all members.
2. **Merge Strategy**:
   - **Squash and Merge**: Preferred for feature branches to keep the `main` branch commit history clean and high-level.
