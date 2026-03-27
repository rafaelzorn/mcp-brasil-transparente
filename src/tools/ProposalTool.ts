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
    this.registerGetProposalTool()
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

  private registerGetProposalTool(): void {
    this.server.registerTool(
      'get-proposal',
      {
        title: 'Consulta proposição',
        description: `
          Consulta detalhada de proposições legislativas, retornando informações como tipo e número da proposição,
          ementa, data de apresentação e a URL para acesso ao documento completo (inteiro teor).
        `,
        inputSchema: {
          id: z
            .number()
            .describe('ID do deputado para consulta'),
        },
        outputSchema: {
          id: z.number().describe('ID da proposição'),
          proposal: z.string().describe('Nome da proposição'),
          summary: z.string().describe('Ementa da proposição'),
          urlDocument: z.string().describe('URL do documento da proposição'),
        }
      },
      async ({ id }) => {
        const proposal = await this.proposalService.getProposal(id)

        try {
          return {
            content: [{ type: 'text', text: JSON.stringify(proposal, null, 2) }],
            structuredContent: proposal,
          }
        } catch (error) {
          if (error instanceof NotFoundException) {
            return {
              content: [{ type: 'text', text: error.message }],
              structuredContent: {},
            }
          }

          return {
            content: [{ type: 'text', text: 'Ops... Ocorreu um erro ao consultar detalhes do deputado.' }],
            structuredContent: {},
          }
        }
      }
    )
  }
}
