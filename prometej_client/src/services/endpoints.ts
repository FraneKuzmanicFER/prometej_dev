import config from '../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const userBase = `${base}/user`;

export const endpoints = {
  user: {
    base: userBase,
  },

};
