type DeputyProps = {
  name: string
}

export class DeputyEntity {
  name: string

  private constructor({ name }: DeputyProps) {
    this.name = name
  }

  static fromApi(data: any): DeputyEntity {
    return new DeputyEntity({
      name: data.nome,
    })
  }

  toJSON() {
    return {
      name: this.name,
    }
  }
}
