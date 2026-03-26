import { DeputyEntity } from '@/entities/DeputyEntity'

export class DeputyRepository {
  public async getDeputies(params: URLSearchParams): Promise<DeputyEntity[]> {
    const response = await fetch(`${process.env.API_URL}/deputados?${params}`)

    if (!response.ok) {
      // TODO
    }

    const data = await response.json()

    return data.dados.map((deputy: any) => DeputyEntity.fromApi(deputy))
  }
}
