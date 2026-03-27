import { FetchErrorException } from '@/exceptions/FetchErrorException'
import { ApiDeputiesResponse, ApiDeputyDetailsResponse } from '@/types'

export class DeputyRepository {
  public async getDeputies(params: URLSearchParams): Promise<ApiDeputiesResponse> {
    const response = await fetch(`${process.env.API_URL}/deputados?${params}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar os deputados.')
    }

    const data = await response.json()

    return data.dados
  }

  public async getDeputy(id: number): Promise<ApiDeputyDetailsResponse> {
    const response = await fetch(`${process.env.API_URL}/deputados/${id}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar detalhes do deputado.')
    }

    const data = await response.json()

    return data.dados
  }
}
