import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { ProposalService } from '@/services/ProposalService'
import { NotFoundException } from '@/exceptions/NotFoundException'

export class ProposalTool {
  constructor(
    private server: McpServer,
    private proposalService: ProposalService,
  ) {
    this.registerTools()
  }

  private registerTools(): void {
    this.registerGetProposalsTool()
  }

  private registerGetProposalsTool(): void {
    this.server.registerTool(
      'get-proposals',
      {
        title: 'Consulta proposições de um deputado',
        description: `
          Consulta proposições de um deputado, retornando informações como data de apresentação, número, ano, ementa, e
          outras informações relevantes.
        `,
        inputSchema: {
          deputyId: z
            .number()
            .describe('ID do deputado para consulta'),
          year: z
            .number()
            .describe('Ano para consulta'),
        },
        outputSchema: {
          data: z.array(
            z.object({
              id: z.number().describe('ID da proposição'),
              proposal: z.string().describe('Nome da proposição'),
              presentationDate: z.string().describe('Data de apresentação da proposição'),
              summary: z.string().describe('Ementa da proposição'),
            }),
          )
        },
      },
      async ({ deputyId, year }) => {
        try {
          const proposals = await this.proposalService.getProposals(
            deputyId,
            year,
          )

          const data = { data: proposals }

          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
            structuredContent: data,
          }
        } catch (error) {
          if (error instanceof NotFoundException) {
            return {
              content: [{ type: 'text', text: error.message }],
              structuredContent: {data: []},
            }
          }

          return {
            content: [{ type: 'text', text: 'Ops... Ocorreu um erro ao buscar as proposições do deputado.' }],
            structuredContent: {data: []},
          }
        }
      }
    )
  }
}
