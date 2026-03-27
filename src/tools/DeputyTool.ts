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
        title: 'Busca deputados',
        description: 'Busca os deputados pelo nome, estado ou partido',
        inputSchema: {
          name: z
            .string()
            .min(5)
            .optional()
            .describe('Nome para buscar os parlamentares'),
          state: z
            .string()
            .min(2)
            .max(2)
            .optional()
            .describe('Sigla do estado para buscar os parlamentares (ex: SP, RJ, MG, etc.)'),
          party: z
            .string()
            .max(5)
            .optional()
            .describe('Sigla do partido para buscar os parlamentares (ex: PT, PSDB, PSOL, etc.)'),
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
