export const dateFormatter = (
  value: string | Date | null,
  format: 'date' | 'datetime' | 'time' = 'date'
): string => {
  if (!value) return '-'

  const date = new Date(value)
  if (isNaN(date.getTime())) return '-'

  const pad = (n: number) => n.toString().padStart(2, '0')

  const yyyy = date.getFullYear()
  const mm = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const hh = pad(date.getHours())
  const mi = pad(date.getMinutes())
  const ss = pad(date.getSeconds())

  switch (format) {
    case 'datetime':
      return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`
    case 'time':
      return `${hh}:${mi}:${ss}`
    default:
      return `${dd}/${mm}/${yyyy}`
  }
}
