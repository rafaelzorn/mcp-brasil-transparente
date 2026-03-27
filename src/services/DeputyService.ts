import { DeputyRepository } from '@/repositories/DeputyRepository'
import { Deputy } from '@/types'
import { DeputyEntity } from '@/entities/DeputyEntity'

export class DeputyService {
  constructor(private deputyRepository: DeputyRepository) {}

  public async getDeputies(name?: string, state?: string, party?: string): Promise<Deputy[]> {
    let page = 1
    let allDeputies: DeputyEntity[] = []
    let deputies: DeputyEntity[] = []

    do {
      const params = new URLSearchParams({
        ...(name && { nome: name }),
        ...(state && { siglaUf: state }),
        ...(party && { siglaPartido: party }),
        ...({ ordenarPor: 'nome', pagina: page.toString() })
      });

      deputies = await this.deputyRepository.getDeputies(params)

      allDeputies.push(...deputies.map(DeputyEntity.toJSON))

      page++
    } while (deputies.length > 0)

    return allDeputies
  }
}
