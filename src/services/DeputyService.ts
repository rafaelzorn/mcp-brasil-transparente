import { DeputyRepository } from '@/repositories/DeputyRepository'
import { Deputy } from '@/types'
import { DeputyEntity } from '@/entities/DeputyEntity'

export class DeputyService {
  constructor(private deputyRepository: DeputyRepository) {}

  public async getDeputies(name?: string, state?: string, party?: string): Promise<{ data: Deputy[] }> {
    const params = new URLSearchParams({
      ...(name && { nome: name }),
      ...(state && { siglaUf: state }),
      ...(party && { siglaPartido: party }),
      ...({ ordenarPor: 'nome' })
    })

    const deputies: DeputyEntity[] = await this.deputyRepository.getDeputies(
      params,
    )

    const data: { data: Deputy[] } = {
      data: deputies.map((deputy) => {
        return DeputyEntity.toJSON(deputy)
      })
    }

    return data
  }
}
