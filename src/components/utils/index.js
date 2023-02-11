/*
The first property is simply the name of the locale to use. 
This could be en-us for US english, es-es for Spain spanish, 
or even undefined to infer the user's locale.

The second configuration option is the numeric option. This determines if the formatted value should always be numeric, 
such as 1 day ago, or if the formatted value should try to use a string to represent the relative time, such as yesterday. 
The only options are always and auto. By default it is always.
 */

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function formatTimeAgo(date) {
  let duration = (date - new Date()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
