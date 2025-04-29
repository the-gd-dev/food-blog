import { HttpClientOptions, HttpClientResponse } from "@/types";

const BASE_API_URL = "http://localhost:8080/api/v1";

/**
 * Retrieves the authorization token from cookies.
 * @returns {string | undefined} The token if it exists.
 */
export const getToken = (key: string): string | undefined => {
  return document?.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];
};

/**
 * Generates a random profile picture URL based on gender.
 * @param gender - The gender for the profile picture ("male", "female", or "any").
 * @returns {string} The URL of the random profile picture.
 */
export const getRandomProfilePicture = (
  gender: "male" | "female" | "any" = "any"
): string => {
  const id = Math.floor(Math.random() * 100);
  const selectedGender =
    gender === "male" || gender === "female"
      ? gender
      : Math.random() < 0.5
      ? "men"
      : "women";

  return `https://randomuser.me/api/portraits/${selectedGender}/${id}.jpg`;
};

/**
 * Unified HTTP client for making API requests.
 * @param options - The options for the HTTP request.
 * @returns {Promise<Response>} The response from the API.
 */
export const httpClient = async ({
  apiUrl,
  method = "GET",
  data,
  headers = {},
  isPrivate = false,
}: HttpClientOptions): Promise<HttpClientResponse> => {
  const headersInit: HeadersInit = {
    ...headers,
    ...(isPrivate && { Authorization: `Bearer ${getToken("token")}` }),
    ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
  };

  const requestOptions: RequestInit = {
    method,
    headers: headersInit,
    ...(data &&
      !["GET", "HEAD"].includes(method) && {
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
  };

  try {
    const response = await fetch(`${BASE_API_URL}${apiUrl}`, requestOptions);
    if (response.status === 401) handleUnauthorized();
    const responseData = await response.json();
    return { ok: response.ok, ...responseData };
  } catch (error) {
    console.error("HTTP Client Error:", error);
    throw error;
  }
};

/**
 * Handles unauthorized responses by clearing the token and logging out.
 */
const handleUnauthorized = async (): Promise<void> => {
  document.cookie = `token=; expires=${new Date(0).toUTCString()}; path=/;`;
  await fetch(`${BASE_API_URL}/auth/logout`, { method: "POST" });
};

/**
 * Reset cookie
 * @param cookieName
 */
export const resetCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
