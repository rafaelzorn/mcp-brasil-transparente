import { DeputyEntity } from '@/entities/DeputyEntity'
import { FetchErrorException } from '@/exceptions/FetchErrorException'

export class DeputyRepository {
  public async getDeputies(params: URLSearchParams): Promise<DeputyEntity[]> {
    const response = await fetch(`${process.env.API_URL}/deputados?${params}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar os deputados.')
    }

    const data = await response.json()

    return data.dados.map((deputy: any) => DeputyEntity.fromApi(deputy))
  }
}
