import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createApplicationDependencies } from "@/di";
import { DeputyExpenseTool } from "./DeputyExpenseTool";
import { DeputyTool } from "./DeputyTool";
import { ProposalProgressTool } from "./ProposalProgressTool";
import { ProposalTool } from "./ProposalTool";

export default function tools(server: McpServer): void {
	const {
		deputyService,
		deputyExpenseService,
		proposalService,
		proposalProgressService,
	} = createApplicationDependencies();

	new DeputyTool(server, deputyService);
	new DeputyExpenseTool(server, deputyExpenseService);
	new ProposalTool(server, proposalService);
	new ProposalProgressTool(server, proposalProgressService);
}
