import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createApplicationDependencies } from '@/di'
import { DeputyTool } from './DeputyTool'

export default function tools(server: McpServer): void {
  const { deputyService } = createApplicationDependencies()

  new DeputyTool(server, deputyService)
}
