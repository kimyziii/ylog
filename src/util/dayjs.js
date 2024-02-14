import dayjs from 'dayjs'

export function formatDate(time, format = 'YYYY.MM.DD') {
  return dayjs(time).format(format)
}

export function formatTimestamp(time, format = 'YYYY.MM.DD') {
  const d = time.seconds * 1000 + time.nanoseconds / 1000000
  return dayjs(d).format(format)
}
