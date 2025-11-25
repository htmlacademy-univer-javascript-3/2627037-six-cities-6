const key = 'six-cities-token';
export type Token = string;

export const getToken = (): Token => localStorage.getItem(key) ?? '';

export const storeToken = (token: Token): void => {
  localStorage.setItem(key, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(key);
};
