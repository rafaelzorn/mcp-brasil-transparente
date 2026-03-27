import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createApplicationDependencies } from '@/di'
import { DeputyTool } from './DeputyTool'
import { DeputyExpenseTool } from './DeputyExpenseTool'

export default function tools(server: McpServer): void {
  const { deputyService, deputyExpenseService } = createApplicationDependencies()

  new DeputyTool(server, deputyService)
  new DeputyExpenseTool(server, deputyExpenseService)
}
