import { FetchErrorException } from '@/exceptions/FetchErrorException'
import { ApiDeputyExpensesResponse } from '@/types'

export class DeputyExpenseRepository {
  public async getDeputyExpenses(id: number, params: URLSearchParams): Promise<ApiDeputyExpensesResponse> {
    const response = await fetch(`${process.env.API_URL}/deputados/${id}/despesas?${params}`)

    if (!response.ok) {
      throw new FetchErrorException('Ops... Erro ao buscar despesas do deputado.')
    }

    const data = await response.json()

    return data.dados
  }
}
