export class FetchErrorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FetchErrorException'
  }
}
