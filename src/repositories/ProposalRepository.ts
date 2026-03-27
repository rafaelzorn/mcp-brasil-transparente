import { FetchErrorException } from '@/exceptions/FetchErrorException'
import { ApiProposalsResponse, ApiProposalDetailsResponse } from '@/types'

export class ProposalRepository {
  public async getProposals(params: URLSearchParams): Promise<ApiProposalsResponse> {
    const response = await fetch(`${process.env.API_URL}/proposicoes?${params}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar despesas do deputado.')
    }

    const data = await response.json()

    return data.dados
  }

  public async getProposal(id: number): Promise<ApiProposalDetailsResponse> {
    const response = await fetch(`${process.env.API_URL}/proposicoes/${id}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar detalhes da proposição.')
    }

    const data = await response.json()

    return data.dados
  }
}
