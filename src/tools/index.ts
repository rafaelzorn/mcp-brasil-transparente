import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { DeputyTool } from './DeputyTool'

export default function tools(server: McpServer): void {
  new DeputyTool(server)
}
