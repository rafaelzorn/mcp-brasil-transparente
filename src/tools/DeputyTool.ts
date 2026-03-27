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
    this.registerGetDeputyTool()
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
              id: z.number().describe('ID do deputado'),
              name: z.string().describe('Nome do deputado'),
              party: z.string().describe('Sigla do partido do deputado'),
              state: z.string().describe('Sigla do estado do deputado'),
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

          const data = { data: deputies }

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

  private registerGetDeputyTool(): void {
    this.server.registerTool(
      'get-deputy',
      {
        title: 'Consulta deputado',
        description: `
          Consulta detalhada de deputados federais e estaduais, retornando informações como nome completo, partido,
          estado e cidade de nascimento, data de nascimento, formação acadêmica, e contatos (e-mail e telefone),
          além de outros dados relevantes.
        `,
        inputSchema: {
          id: z
            .number()
            .describe('ID do deputado para consulta'),
        },
        outputSchema: {
          id: z.number().describe('ID do deputado'),
          nameCivil: z.string().describe('Nome civil do deputado'),
          lastStatus: z.object({
            name: z.string().describe('Nome do deputado'),
            party: z.string().describe('Sigla do partido do deputado'),
            state: z.string().describe('Sigla do estado do deputado'),
            electoralName: z.string().describe('Nome eleitoral do deputado'),
            office: z.object({
              name: z.string().describe('Nome do gabinete do deputado'),
              building: z.string().describe('Predio do gabinete do deputado'),
              room: z.string().describe('Sala do gabinete do deputado'),
              phone: z.string().describe('Telefone do gabinete do deputado'),
              email: z.string().describe('E-mail do gabinete do deputado'),
            }),
            status: z.string().describe('Situação do deputado'),
            electoralCondition: z.string().describe('Condição eleitoral do deputado'),
          }),
          cpf: z.string().describe('CPF do deputado'),
          socialMedia: z.array(z.string()).describe('Redes sociais do deputado'),
          birthDate: z.string().describe('Data de nascimento do deputado'),
          deathDate: z.string().nullable().describe('Data de falecimento do deputado'),
          birthState: z.string().describe('Sigla do estado de nascimento do deputado'),
          birthCity: z.string().describe('Cidade de nascimento do deputado'),
          education: z.string().describe('Formação acadêmica do deputado'),
        }
      },
      async ({ id }) => {
        const deputy = await this.deputyService.getDeputy(id)

        try {
          return {
            content: [{ type: 'text', text: JSON.stringify(deputy, null, 2) }],
            structuredContent: deputy,
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
