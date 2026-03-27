import { DeputyExpenseRepository } from '@/repositories/DeputyExpenseRepository'
import { DeputyExpense } from '@/types'
import { NotFoundException } from '@/exceptions/NotFoundException'
import { transformDeputyExpenses } from '@/transformers'

export class DeputyExpenseService {
  constructor(private deputyExpenseRepository: DeputyExpenseRepository) {}

  public async getDeputyExpenses(deputyId: number, year?: number, month?: number): Promise<DeputyExpense[]> {
    let page = 1
    let allDeputyExpenses: DeputyExpense[] = []
    let deputyExpenses: DeputyExpense[] = []

    do {
      const params = new URLSearchParams({
        ...(year && { ano: year.toString() }),
        ...(month && { mes: month.toString() }),
        ...({ ordenarPor: 'dataDocumento', pagina: page.toString() })
      });

      const apiDeputyExpenses = await this.deputyExpenseRepository.getDeputyExpenses(deputyId, params)

      deputyExpenses = transformDeputyExpenses(apiDeputyExpenses)

      allDeputyExpenses.push(...deputyExpenses)

      page++
    } while (deputyExpenses.length > 0)

    if (allDeputyExpenses.length === 0) {
      throw new NotFoundException('Nenhuma despesa encontrada para o deputado.')
    }

    return allDeputyExpenses
  }
}
