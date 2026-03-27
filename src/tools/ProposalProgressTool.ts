import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { NotFoundException } from "@/exceptions/NotFoundException";
import type { ProposalProgressService } from "@/services/ProposalProgressService";

export class ProposalProgressTool {
	constructor(
		private server: McpServer,
		private proposalProgressService: ProposalProgressService,
	) {
		this.registerTools();
	}

	private registerTools(): void {
		this.registerGetProposalProgressesTool();
	}

	private registerGetProposalProgressesTool(): void {
		this.server.registerTool(
			"get-proposal-progresses",
			{
				title: "Consulta tramitações de uma proposição",
				description: `
          Consulta a tramitação de uma proposição legislativa, retornando informações como data e hora dos eventos,
          situação atual, descrição das movimentações e outros detalhes relevantes do andamento.
        `,
				inputSchema: {
					proposalId: z
						.number()
						.describe("ID da proposição para consultar as tramitações"),
				},
				outputSchema: {
					data: z.array(
						z.object({
							statusSituation: z.string().describe("Situação da tramitação"),
							descriptionSituation: z
								.string()
								.describe("Descrição da situação da tramitação"),
							dispatch: z.string().describe("Despacho da tramitação"),
							dateTime: z.string().describe("Data e hora"),
						}),
					),
				},
			},
			async ({ proposalId }) => {
				try {
					const proposalProgresses =
						await this.proposalProgressService.getProposalProgresses(
							proposalId,
						);

					const data = { data: proposalProgresses };

					return {
						content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
						structuredContent: data,
					};
				} catch (error) {
					if (error instanceof NotFoundException) {
						return {
							content: [{ type: "text", text: error.message }],
							structuredContent: { data: [] },
						};
					}

					return {
						content: [
							{
								type: "text",
								text: "Ops... Ocorreu um erro ao buscar as tramitações da proposição.",
							},
						],
						structuredContent: { data: [] },
					};
				}
			},
		);
	}
}
