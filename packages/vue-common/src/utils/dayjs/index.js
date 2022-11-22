import dayjs from 'dayjs'

// plugin
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isSameOrAfter).extend(isSameOrBefore).extend(isBetween)

export default dayjs
