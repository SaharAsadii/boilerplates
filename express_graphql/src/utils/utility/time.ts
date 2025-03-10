import { Duration, intervalToDuration } from "date-fns";

export const getFutureTime = (remainedTime: number) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + remainedTime);
  return time;
};

export const getRemainingTime = (date: Date, expired?: boolean) =>
  `ایجاد شده در تاریخ *${new Date(date ?? "").toLocaleDateString(
    "fa-IR"
  )}* - ${timeSince(date)} ${expired ? "قبل" : "مانده"}   `;

export const timeSince = (date: Date) => {
  const remainedTime: Duration = intervalToDuration({
    start: new Date(),
    end: new Date(date)
  });

  if (remainedTime.years) {
    return `${Math.abs(remainedTime.years)} سال`;
  }

  if (remainedTime.months) {
    return `${Math.abs(remainedTime.months)} ماه`;
  }

  if (remainedTime.days) {
    return `${Math.abs(remainedTime.days)} روز`;
  }

  if (remainedTime.hours) {
    return `${Math.abs(remainedTime.hours)} ساعت`;
  }

  if (remainedTime.minutes) {
    return `${Math.abs(remainedTime.minutes)} دقیقه`;
  }
  return `${Math.abs(remainedTime.seconds ?? 0)} ثانیه`;
};
