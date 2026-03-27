import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { DeputyService } from '@/services/DeputyService'
import { NotFoundException } from '@/exceptions/NotFoundException'

export class DeputyTool {
  constructor(
    private server: McpServer,
    private deputyService: DeputyService,
  ) {
    this.registerTools()
  }

  private registerTools(): void {
    this.registerGetDeputiesTool()
  }

  private registerGetDeputiesTool(): void {
    this.server.registerTool(
      'get-deputies',
      {
        title: 'Consulta deputados',
        description: `
          Consulta deputados federais ou estaduais pelo nome, estado ou partido, retornando informações
          básicas como nome, partido e estado.
        `,
        inputSchema: {
          name: z
            .string()
            .min(5)
            .optional()
            .describe('Nome completo ou parcial do deputado para busca'),
          state: z
            .string()
            .min(2)
            .max(2)
            .optional()
            .describe('Sigla do estado para filtrar deputados (ex: SP, RJ, MG)'),
          party: z
            .string()
            .max(5)
            .optional()
            .describe('Sigla do partido para filtrar deputados (ex: PT, PSDB, PSOL)'),
        },
        outputSchema: {
          data: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              party: z.string(),
              state: z.string(),
            }),
          )
        },
      },
      async ({ name, state, party }) => {
        try {
          const deputies = await this.deputyService.getDeputies(
            name,
            state,
            party,
          )

          const data = { data:deputies }

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
            content: [{ type: 'text', text: 'Ops... Ocorreu um erro ao buscar os deputados.' }],
            structuredContent: {data: []},
          }
        }
      }
    )
  }
}
