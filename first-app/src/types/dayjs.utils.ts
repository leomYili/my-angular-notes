/*
 * 中文官网：https://dayjs.fenxianglu.cn/category/#node-js
 * 如果需要多语言，需要自己手动设置
 * */
// 预加载一些常用的插件
import * as _dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as weekday from 'dayjs/plugin/weekday';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as quarterOfYear from 'dayjs/plugin/quarterOfYear';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as weekYear from 'dayjs/plugin/weekYear';
import * as isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import * as minMax from 'dayjs/plugin/minMax';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as duration from 'dayjs/plugin/duration';
import * as toArray from 'dayjs/plugin/toArray';
import * as toObject from 'dayjs/plugin/toObject';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isToday from 'dayjs/plugin/isToday';
import * as isTomorrow from 'dayjs/plugin/isTomorrow';
import * as isYesterday from 'dayjs/plugin/isYesterday';
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as Timezone from 'dayjs/plugin/timezone';
import * as Utc from 'dayjs/plugin/utc';

// 之前或相同
_dayjs.extend(isSameOrBefore);
// 之后或相同
_dayjs.extend(isSameOrAfter);
// 之间
_dayjs.extend(isBetween);
// 是否是今天
_dayjs.extend(isToday);
// 是否是明天
_dayjs.extend(isTomorrow);
// 是否是昨天
_dayjs.extend(isYesterday);
// 是否是闰年
_dayjs.extend(isLeapYear);
// 获取/设置月份的日期，0-6
_dayjs.extend(weekday);
// 获取或设置ISO年度有多少周，isoWeek年度周，isoWeekday周几，isoWeekYear周年，
_dayjs.extend(isoWeek);
// 获取或设置季度
_dayjs.extend(quarterOfYear);
// 获取/设置一年中的日期，1-366
_dayjs.extend(dayOfYear);
// 周年
_dayjs.extend(weekYear);
// 根据ISO weeks获取当前年度有多少周
_dayjs.extend(isoWeeksInYear);
// 获取或设置当前日期是第几周
_dayjs.extend(weekOfYear);
// 给dayjs实例设置最大、最小值
_dayjs.extend(minMax);
// 根据时间间隔，返回当前时间之前的时间
_dayjs.extend(relativeTime);
// 时长，有很多妙用，比如换算时间，注意这里使用的是dayjs.duration()，不是dayjs().duration()
_dayjs.extend(duration);
// 转数组
_dayjs.extend(toArray);
// 转对象
_dayjs.extend(toObject);
// 支持字符串+格式解析 dayjs("12-25-1995", "MM-DD-YYYY")
_dayjs.extend(customParseFormat);
// 支持时区
_dayjs.extend(Utc);
_dayjs.extend(Timezone);

export const dayjs = _dayjs;

export const moment = _dayjs;

// 强行把extend的那些声明加上，解决core打成标准lib后，athena web项目安装core，ts找不到extend的那些声明文件
declare module 'dayjs' {
  interface Dayjs {
    isToday(): boolean;
  }
}
declare module 'dayjs' {
  interface Dayjs {
    tz(timezone?: string, keepLocalTime?: boolean): _dayjs.Dayjs;
    offsetName(type?: 'short' | 'long'): string | undefined;
  }
  interface DayjsTimezone {
    (date: _dayjs.ConfigType, timezone?: string): _dayjs.Dayjs;
    (date: _dayjs.ConfigType, format: string, timezone?: string): _dayjs.Dayjs;
    guess(): string;
    setDefault(timezone?: string): void;
  }
  // @ts-ignore
  const tz: DayjsTimezone;
}

declare module 'dayjs' {
  interface Dayjs {
    weekday(): number;
    weekday(value: number): _dayjs.Dayjs;
  }
}

declare module 'dayjs' {
  interface Dayjs {
    week(): number;

    week(value: number): _dayjs.Dayjs;
  }
}
declare module 'dayjs' {
  interface Dayjs {
    quarter(): number;

    quarter(quarter: number): _dayjs.Dayjs;

    add(value: number, unit: _dayjs.QUnitType): _dayjs.Dayjs;

    subtract(value: number, unit: _dayjs.QUnitType): _dayjs.Dayjs;

    startOf(unit: _dayjs.QUnitType): _dayjs.Dayjs;

    endOf(unit: _dayjs.QUnitType): _dayjs.Dayjs;

    isSame(date: _dayjs.ConfigType, unit?: _dayjs.QUnitType): boolean;

    isBefore(date: _dayjs.ConfigType, unit?: _dayjs.QUnitType): boolean;

    isAfter(date: _dayjs.ConfigType, unit?: _dayjs.QUnitType): boolean;
  }
}

declare module 'dayjs' {
  interface Dayjs {
    isSameOrAfter(date: _dayjs.ConfigType, unit?: _dayjs.OpUnitType): boolean;
  }
}
declare module 'dayjs' {
  interface Dayjs {
    isSameOrBefore(date: _dayjs.ConfigType, unit?: _dayjs.OpUnitType): boolean;
  }
}
