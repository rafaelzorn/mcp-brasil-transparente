import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createApplicationDependencies } from '@/di'
import { DeputyTool } from './DeputyTool'
import { DeputyExpenseTool } from './DeputyExpenseTool'
import { ProposalTool } from './ProposalTool'
import { ProposalProgressTool } from './ProposalProgressTool'

export default function tools(server: McpServer): void {
  const { deputyService, deputyExpenseService, proposalService, proposalProgressService } = createApplicationDependencies()

  new DeputyTool(server, deputyService)
  new DeputyExpenseTool(server, deputyExpenseService)
  new ProposalTool(server, proposalService)
  new ProposalProgressTool(server, proposalProgressService)
}
