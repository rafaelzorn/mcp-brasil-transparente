import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { DeputyService } from '@/services/DeputyService'
import { DeputyRepository } from '@/repositories/DeputyRepository'

export class DeputyTool {
  constructor(private server: McpServer) {
    this.registerTools()
  }

  private registerTools(): void {
    this.registerGetDeputiesTool()
  }

  private async registerGetDeputiesTool(): Promise<void> {
    this.server.registerTool(
      'get-deputies',
      {
        title: 'Busca deputados',
        description: 'Busca os deputados pelo nome, estado ou partido',
        inputSchema: {
          name: z
            .string()
            .optional()
            .describe('Nome para buscar os parlamentares'),
          state: z
            .string()
            .optional()
            .describe('Sigla do estado para buscar os parlamentares (ex: SP, RJ, MG, etc.)'),
          party: z
            .string()
            .optional()
            .describe('Sigla do partido para buscar os parlamentares (ex: PT, PSDB, PSOL, etc.)'),
        }
      },
      async ({ name, state, party }) => {
        const deputyRepository = new DeputyRepository()
        const deputyService = new DeputyService(deputyRepository)

        const deputies = await deputyService.getDeputies(
          name,
          state,
          party,
        )

        const deputiesText = deputies
          .map((deputy) => JSON.stringify(deputy))
          .join('\n')

        return {
          content: [{ type: 'text', text: deputiesText}]
        }
      }
    )
  }
}
