import * as process from 'node:process';

export default () => ({
  secret: process.env.SECRET,
  accessTtl: process.env.ACCESS_TTL,
  refreshTtl: process.env.REFRESH_TTL,
  sessions: process.env.SESSIONS,
});
