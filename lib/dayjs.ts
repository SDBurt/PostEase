import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(calendar)

export type Dayjs = dayjs.Dayjs
export default dayjs
