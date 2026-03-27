import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createApplicationDependencies } from '@/di'
import { DeputyTool } from './DeputyTool'
import { DeputyExpenseTool } from './DeputyExpenseTool'
import { ProposalTool } from './ProposalTool'

export default function tools(server: McpServer): void {
  const { deputyService, deputyExpenseService, proposalService } = createApplicationDependencies()

  new DeputyTool(server, deputyService)
  new DeputyExpenseTool(server, deputyExpenseService)
  new ProposalTool(server, proposalService)
}
