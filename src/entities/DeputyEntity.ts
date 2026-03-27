import { Deputy } from '@/types'

export class DeputyEntity {
  id: number
  name: string
  party: string
  state: string

  private constructor({ id, name, party, state }: Deputy) {
    this.id = id
    this.name = name
    this.party = party
    this.state = state
  }

  static fromApi(data: any): DeputyEntity {
    return new DeputyEntity({
      id: data.id,
      name: data.nome,
      party: data.siglaPartido,
      state: data.siglaUf,
    })
  }

  static toJSON(deputy: Deputy): Deputy {
    return {
      id: deputy.id,
      name: deputy.name,
      party: deputy.party,
      state: deputy.state,
    }
  }
}
