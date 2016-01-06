'use strict';


export function formatFreeTime(time: Number) {
  const MAX_TIME = 10; // minutes

  const minutes = parseInt(time * MAX_TIME);
  const seconds = parseInt(((time * MAX_TIME) - minutes) * 60);

  let label = '';
  label += minutes + (minutes === 1 ? ' min' : ' mins');
  label += seconds > 1 ? ` ${seconds} sec` : '';

  return label;
}
