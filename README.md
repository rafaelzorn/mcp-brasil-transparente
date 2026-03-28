# 🇧🇷 Brasil Transparente MCP Server

MCP server that provides access to data from the Brazilian Chamber of Deputies public API, enabling detailed queries
about deputies, their expenses, legislative proposals, and the real-time progress of those proposals through any MCP-compatible client.

### Development Commands

```bash
npm run inspect   # Launch MCP Inspector
npm run build     # Build the project
npm run dev       # Start development mode
npm run lint      # Run linter
npm run format    # Format Code
npm run check     # Lint & format check
npm run check:fix # Auto-fix issues
```

## Usage

1. Clone the project
2. Run `npm run build`
3. Configure the MCP connection in your AI assistant

## MCP Configuration

Add the following configuration to your AI assistant:

**Note:** In the `args` field, specify the path to the generated `main.js` file after building the project. Adjust the
path according to your local environment.

```json
"mcp-brasil-transparente": {
  "type": "stdio",
  "command": "node",
  "args": ["~/dev/personal/mcp-brasil-transparente/build/main.js"],
  "env": {
    "API_URL": "https://dadosabertos.camara.leg.br/api/v2"
  }
}
```

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get-deputies` | List all deputies | `name` (string), `state` (string), `party` (string) |
| `get-deputy` | Deputy details | `id` (number, required) |
| `get-deputy-expenses` | Expenses for a specific deputy | `deputyId` (number, required), `year` (number), `month` (number) |
| `get-proposals` | Deputy proposals | `deputyId` (number, required), `year` (number, required) |
| `get-proposal` | Proposal details | `id` (number, required) |What is Deputy Hattem’s email address?
| `get-proposal-progresses` | Proposal progresses | `proposalId` (number, required) |

## Example Queries

- "Tell me the details about Deputy Hattem"
- "What is Deputy Hattem’s email address?"
- "Tell me Deputy Hattem’s expenses in March 2026"
- "Give me the details of bill PL 14/2019 by Deputy Hattem"
- "Give me the latest proceedings of bill PL 14/2019 by Deputy Hattem"
