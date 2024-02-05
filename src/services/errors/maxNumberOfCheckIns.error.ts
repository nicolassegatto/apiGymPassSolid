export class MaxNumberOfCheckinError extends Error {
  constructor() {
    super('Max number of checkins reached!')
  }
}
