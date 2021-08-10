const { host } = window.location;
// const MAIN = `http://${host}/api`;
const MAIN = "http://localhost:8000";

export const ENDPOINT_AUTH = `${MAIN}/auth/`;
export const ENDPOINT_QUESTION = `${MAIN}/questions/`;
export const ENDPOINT_LABEL = `${MAIN}/labels/`;
export const ENDPOINT_ANALYSIS = `${MAIN}/analysis/`;
export const ENDPOINT_GAME = `${MAIN}/games/`;
export const ENDPOINT_VOTE = `${MAIN}/votes/`;
export const ENDPOINT_USER = `${MAIN}/users/`;
export const ENDPOINT_LEADERBOARD = `${MAIN}/leaderboard/`;
export const ENDPOINT_MY_SCORE = `${MAIN}/myscores/`;
export const ENDPOINT_DATA = `${MAIN}/datas/`;
