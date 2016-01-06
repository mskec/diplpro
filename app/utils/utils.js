'use strict';

import _ from 'underscore';

import AppConstants from '../AppConstants';


export function formatFreeTime(time: Number) {
  const MAX_TIME = 10; // minutes

  return formatDuration(time * MAX_TIME * 60);
}

export function formatDuration(seconds: Number) {
  const minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds) - minutes * 60;

  let label = '';
  if (minutes > 0) {
    label += minutes + (minutes === 1 ? ' min' : ' mins');
  }

  label += seconds > 1 ? ` ${seconds} sec` : '';

  return label.trim();
}

export function calculateVibDuration(vib: Object) {
  let duration = 0;

  _.each(vib.impacts, (impact) => {
    duration += (impact.endSec - impact.startSec);
  });

  return duration;
}

export function generateVibEmbedUrl(vib: Object) {
  return `${AppConstants.API_URL}/embed?vib=${vib.shortId}`;
}
