import { ApiDeputiesResponse, DeputiesFetcherResult, ApiDeputyDetailsResponse, DeputyDetailsFetcherResult } from '@/types'

export function transformDeputies(apiDeputies: ApiDeputiesResponse): DeputiesFetcherResult {
  return apiDeputies.map((deputy) => ({
    id: deputy.id,
    name: deputy.nome,
    party: deputy.siglaPartido,
    state: deputy.siglaUf,
  }))
}

export function transformDeputyDetails(apiDeputy: ApiDeputyDetailsResponse): DeputyDetailsFetcherResult {
  const lastStatus = apiDeputy.ultimoStatus
  const office = lastStatus.gabinete

  return {
    id: apiDeputy.id,
    nameCivil: apiDeputy.nomeCivil,
    lastStatus: {
      name: lastStatus.nome,
      party: lastStatus.siglaPartido,
      state: lastStatus.siglaUf,
      electoralName: lastStatus.nomeEleitoral,
      office: {
        name: office.nome,
        building: office.predio,
        room: office.sala,
        phone: office.telefone,
        email: office.email,
      },
      status: lastStatus.situacao,
      electoralCondition: lastStatus.condicaoEleitoral,
    },
    cpf: apiDeputy.cpf,
    socialMedia: apiDeputy.redeSocial,
    birthDate: apiDeputy.dataNascimento,
    deathDate: apiDeputy.dataFalecimento,
    birthState: apiDeputy.ufNascimento,
    birthCity: apiDeputy.municipioNascimento,
    education: apiDeputy.escolaridade,
  }
}
