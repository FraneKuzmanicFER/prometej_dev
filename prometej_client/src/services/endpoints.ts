import config from '../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const userBase = `${base}/user`;
const periodBase = `${base}/period`;

export const endpoints = {
  user: {
    base: userBase,
  },
  period: {
    base: periodBase,
  }

};
