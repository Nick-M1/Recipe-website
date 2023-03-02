const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const
export const dateFormatter = Intl.DateTimeFormat("en-GB", dateOptions)