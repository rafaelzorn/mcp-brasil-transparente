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

export type ApiProposal = {
  id: number
  siglaTipo: string
  codTipo: string
  numero: string
  ano: string
  ementa: string
  dataApresentacao: string
}

export type ApiProposalsResponse = ApiProposal[]

export type Proposal = {
  id: number
  proposal: string
  presentationDate: string
  summary: string
}

export type ProposalsFetcherResult = Proposal[]

export type ApiProposalDetail = {
  id: number
  siglaTipo: string
  numero: string
  ano: string,
  ementa: string
  urlInteiroTeor: string
  statusProposicao: {
    dataHora: string
    descricaoSituacao: string
    descricaoTramitacao: string
    despacho: string
  }
}

export type ApiProposalDetailsResponse = ApiProposalDetail

export type ProposalDetail = {
  id: number
  proposal: string
  summary: string
  urlDocument: string
  statusProposal: {
    dateTime: string
    statusSituation: string
    descriptionSituation: string
    dispatch: string
  }
}

export type ProposalDetailsFetcherResult = ProposalDetail

export type ApiProposalProgress = {
  descricaoSituacao: string
  descricaoTramitacao: string
  despacho: string
  dataHora: string
}

export type ApiProposalProgressesResponse = ApiProposalProgress[]

export type ProposalProgress = {
  statusSituation: string
  descriptionSituation: string
  dispatch: string
  dateTime: string
}

export type ProposalProgressesFetcherResult = ProposalProgress[]
