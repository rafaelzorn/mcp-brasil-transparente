import { DeputyEntity } from '@/entities/DeputyEntity'
import { DeputyRepository } from '@/repositories/DeputyRepository'

export class DeputyService {
  constructor(private deputyRepository: DeputyRepository) {}

  public async getDeputies(name?: string, state?: string, party?: string): Promise<DeputyEntity[]> {
    const params = new URLSearchParams({
      ...(name && { nome: name }),
      ...(state && { siglaUf: state }),
      ...(party && { siglaPartido: party }),
    })

    const deputies = await this.deputyRepository.getDeputies(
      params,
    )

    return deputies
  }
}
