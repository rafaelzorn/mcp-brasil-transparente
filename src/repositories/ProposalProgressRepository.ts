import { FetchErrorException } from '@/exceptions/FetchErrorException'
import { ApiProposalProgressesResponse } from '@/types'

export class ProposalProgressRepository {
  public async getProposalProgresses(proposalId: number): Promise<ApiProposalProgressesResponse> {
    const response = await fetch(`${process.env.API_URL}/proposicoes/${proposalId}/tramitacoes`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar tramitações da proposição.')
    }

    const data = await response.json()

    return data.dados
  }
}
