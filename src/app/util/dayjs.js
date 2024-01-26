import dayjs from 'dayjs'

export function formatDate(time, format = 'YYYY.MM.DD') {
  return dayjs(time).format(format)
}
