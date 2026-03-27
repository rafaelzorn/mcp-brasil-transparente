export type ApiDeputy = {
  id: number
  nome: string
  siglaPartido: string
  siglaUf: string
}

export type ApiDeputiesResponse = ApiDeputy[]

export type Deputy = {
  id: number
  name: string
  party: string
  state: string
}

export type DeputiesFetcherResult = Deputy[]

export type ApiDeputyDetail = {
  id: number
  nomeCivil: string
  ultimoStatus: {
    nome: string,
    siglaPartido: string,
    siglaUf: string,
    nomeEleitoral: string,
    gabinete: {
      nome: string,
      predio: string,
      sala: string,
      telefone: string,
      email: string
    }
    situacao: string,
    condicaoEleitoral: string,
  },
  cpf: string,
  redeSocial: string[],
  dataNascimento: string,
  dataFalecimento: string,
  ufNascimento: string,
  municipioNascimento: string,
  escolaridade: string,
}

export type ApiDeputyDetailsResponse = ApiDeputyDetail

export type DeputyDetail = {
  id: number
  nameCivil: string
  lastStatus: {
    name: string
    party: string
    state: string
    electoralName: string
    office: {
      name: string
      building: string
      room: string
      phone: string
      email: string
    }
    status: string
    electoralCondition: string
  }
  cpf: string
  socialMedia: string[]
  birthDate: string
  deathDate: string | null
  birthState: string
  birthCity: string
  education: string
}

export type DeputyDetailsFetcherResult = DeputyDetail

export type ApiDeputyExpense = {
  tipoDespesa: string
  nomeFornecedor: string
  cnpjCpfFornecedor: string
  dataDocumento: string
  valorDocumento: number
  urlDocumento: string
}

export type ApiDeputyExpensesResponse = ApiDeputyExpense[]

export type DeputyExpense = {
  typeExpense: string
  providerName: string
  providerCnpjCpf: string
  documentDate: string
  documentValue: number
  urlDocument: string
}

export type DeputyExpensesFetcherResult = DeputyExpense[]
