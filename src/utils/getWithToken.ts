import apiHandler from './apiHandler';
import { getAppToken, removeAppToken, setAppToken } from './tokenHandler';

type ApiMethodType = 'GET';

export type IntError = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  };
};

export type IntErrors = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  }[];
};

export default async function getWithToken(
  uri: string,
  method: ApiMethodType = 'GET'
) {
  const headers: HeadersInit = {};

  const tokens = getAppToken();
  if (tokens) {
    const accessToken = JSON.parse(tokens);
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken.access}`;
    else throw 'An error occurred when fetching the access token';
  } else {
    throw 'An error occurred when fetching the token';
  }

  const fetchOptions: RequestInit = {
    method,
    headers
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${uri}`,
    fetchOptions
  ).catch((error) => {
    console.error('Fetch error:', error);
    throw error; // Rethrow the original error
  });

  if (res.status === 204) {
    // No content, return null or handle accordingly
    return null;
  }

  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      console.error('Error parsing response:', err);
      throw err; // Rethrow the original error
    }
  }

    if (res.status === 401) {
      const tokens = getAppToken();

      // Call refresh token service
      try {
        if (tokens) {
          const refreshToken = JSON.parse(tokens);
          if (refreshToken) {
            apiHandler('/user/refresh', 'POST', {
              refreshToken: refreshToken.refresh
            })
              .then((res) =>
                setAppToken({
                  access: res.accessToken,
                  refresh: res.refreshToken
                })
              )
              .catch(() => {
                removeAppToken();
                window.location.reload();
              });
          }
        }
        // Retry the request with the new token
        return await apiHandler(uri, method);
      } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError);
        throw refreshError;
      }
    }


  const error = await res.json();
  console.error('API error response:', error);
  throw error;
}
