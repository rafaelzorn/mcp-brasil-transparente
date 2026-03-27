import { FetchErrorException } from '@/exceptions/FetchErrorException'
import { ApiProposalsResponse } from '@/types'

export class ProposalRepository {
  public async getProposals(params: URLSearchParams): Promise<ApiProposalsResponse> {
    const response = await fetch(`${process.env.API_URL}/proposicoes?${params}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar despesas do deputado.')
    }

    const data = await response.json()

    return data.dados
  }
}
