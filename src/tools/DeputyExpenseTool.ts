import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { NotFoundException } from "@/exceptions/NotFoundException";
import type { DeputyExpenseService } from "@/services/DeputyExpenseService";

export class DeputyExpenseTool {
	constructor(
		private server: McpServer,
		private deputyExpenseService: DeputyExpenseService,
	) {
		this.registerTools();
	}

	private registerTools(): void {
		this.registerGetDeputyExpensesTool();
	}

	private registerGetDeputyExpensesTool(): void {
		this.server.registerTool(
			"get-deputy-expenses",
			{
				title: "Consulta despesas de um deputado",
				description: `
          Consulta despesas de um deputado, retornando informações como data, valor, fornecedor, tipo de despesa, e
          outras informações relevantes. NOTA: Os dados retornados por esta ferramenta devem sempre ser
          apresentados ao usuário em formato de tabela Markdown para facilitar a leitura.
        `,
				inputSchema: z
					.object({
						deputyId: z.number().describe("ID do deputado para consulta"),
						year: z.number().optional().describe("Ano para consulta"),
						month: z.number().optional().describe("Mês para consulta"),
					})
					.refine(
						(data) => data.year !== undefined || data.month !== undefined,
					),
				outputSchema: {
					data: z.array(
						z.object({
							typeExpense: z.string().describe("Tipo de despesa"),
							providerName: z.string().describe("Nome do fornecedor"),
							providerCnpjCpf: z.string().describe("CNPJ/CPF do fornecedor"),
							documentDate: z.string().describe("Data do documento"),
							documentValue: z.number().describe("Valor do documento"),
							urlDocument: z.string().nullable().describe("URL do documento"),
						}),
					),
				},
			},
			async ({ deputyId, year, month }) => {
				try {
					const deputyExpenses =
						await this.deputyExpenseService.getDeputyExpenses(
							deputyId,
							year,
							month,
						);

					const data = { data: deputyExpenses };

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
								text: "Ops... Ocorreu um erro ao buscar as despesas do deputado.",
							},
						],
						structuredContent: { data: [] },
					};
				}
			},
		);
	}
}
