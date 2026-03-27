import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { NotFoundException } from "@/exceptions/NotFoundException";
import type { ProposalService } from "@/services/ProposalService";

export class ProposalTool {
	constructor(
		private server: McpServer,
		private proposalService: ProposalService,
	) {
		this.registerTools();
	}

	private registerTools(): void {
		this.registerGetProposalsTool();
		this.registerGetProposalTool();
	}

	private registerGetProposalsTool(): void {
		this.server.registerTool(
			"get-proposals",
			{
				title: "Consulta proposições de um deputado",
				description: `
          Consulta proposições de um deputado, retornando informações como data de apresentação, número, ano, ementa, e
          outras informações relevantes.

          **IMPORTANTE**: Caso não encontre proposições, retorne apenas a mensagem "Nenhuma proposição encontrada para
          o deputado no ano informado."

          **NOTA**: Os dados retornados devem sempre ser apresentados ao usuário em formato de tabela Markdown para
          facilitar a leitura.
        `,
				inputSchema: {
					deputyId: z.number().describe("ID do deputado para consulta"),
					year: z.number().describe("Ano para consulta"),
				},
				outputSchema: {
					data: z.array(
						z.object({
							id: z.number().describe("ID da proposição"),
							proposal: z.string().describe("Nome da proposição"),
							presentationDate: z
								.string()
								.describe("Data de apresentação da proposição"),
							summary: z.string().describe("Ementa da proposição"),
						}),
					),
				},
			},
			async ({ deputyId, year }) => {
				try {
					const proposals = await this.proposalService.getProposals(
						deputyId,
						year,
					);

					const data = { data: proposals };

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
								text: "Ops... Ocorreu um erro ao buscar as proposições do deputado.",
							},
						],
						structuredContent: { data: [] },
					};
				}
			},
		);
	}

	private registerGetProposalTool(): void {
		this.server.registerTool(
			"get-proposal",
			{
				title: "Consulta proposição",
				description: `
          Consulta detalhada de proposições legislativas, retornando informações como tipo e número da proposição,
          ementa, data de apresentação e a URL para acesso ao documento completo (inteiro teor).

          **IMPORTANTE**: Caso não encontre a proposição, retorne apenas a mensagem "Proposição não encontrada."

          **NOTA**: Os dados retornados devem sempre ser apresentados ao usuário em formato de tabela Markdown para
          facilitar a leitura.
        `,
				inputSchema: {
					id: z.number().describe("ID do deputado para consulta"),
				},
				outputSchema: {
					id: z.number().describe("ID da proposição"),
					proposal: z.string().describe("Nome da proposição"),
					summary: z.string().describe("Ementa da proposição"),
					urlDocument: z.string().describe("URL do documento da proposição"),
					statusProposal: z.object({
						dateTime: z
							.string()
							.describe("Data e hora da situação atual da proposição"),
						statusSituation: z
							.string()
							.describe("Situação atual da proposição"),
						descriptionSituation: z
							.string()
							.describe("Descrição da situação atual da proposição"),
						dispatch: z
							.string()
							.describe("Despacho da situação atual da proposição"),
					}),
				},
			},
			async ({ id }) => {
				const proposal = await this.proposalService.getProposal(id);

				try {
					return {
						content: [
							{ type: "text", text: JSON.stringify(proposal, null, 2) },
						],
						structuredContent: proposal,
					};
				} catch (error) {
					if (error instanceof NotFoundException) {
						return {
							content: [{ type: "text", text: error.message }],
							structuredContent: {},
						};
					}

					return {
						content: [
							{
								type: "text",
								text: "Ops... Ocorreu um erro ao consultar detalhes da proposição.",
							},
						],
						structuredContent: {},
					};
				}
			},
		);
	}
}
