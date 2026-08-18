# GITGUD // WEB

An AI-fabricated GitHub Repository History Generator. This tool generates commits and code structures dynamically using LLMs (Groq and Gemini) and publishes them directly to GitHub via the GitHub REST API.

## Features

- **Dynamic Code Generation**: Automatically creates multi-file project concepts and writes complete, working code using LLM clients.
- **Empty-Repository Initialization**: Automatically detects if the target GitHub repository is empty (i.e., has no commits/refs). If so, it creates an empty blob, builds a tree referencing it at `.gitkeep`, makes an "Initial empty commit", and initializes the branch before fabricating subsequent commit history.
- **Backdated & Custom Timestamps**: Stamps every commit realistically.
- **Date Range Selection**: Choose how commit timestamps are distributed across history:
  - **Presets**: Choose predefined ranges like `Today`, `Last Week`, `Last Month`, or `Last Year`.
  - **Custom Range**: Provide explicit start and end dates (e.g., `2023-01-01 to 2023-01-31`). Commit timestamps will be distributed proportionally within this range.

## Getting Started

1. Clone or download this project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Authenticate using your GitHub Token (with `repo` scope) or GitHub OAuth, configure Groq or Gemini API keys in the dashboard, select your parameters, and start fabricating repositories!
