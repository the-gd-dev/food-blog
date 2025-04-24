const BASE_API_URL = "http://localhost:8080/api/v1";

export const getAuthorizationToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
};

export const getRandomProfilePicture = (gender = "any") => {
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
 * A unified HTTP client using an options object.
 * @param options
 * @returns {Promise<Response>}
 */
export const httpClient = async ({
  apiUrl,
  method = "GET",
  data = {},
  headers = {},
  isPrivate = false,
}: {
  apiUrl: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: Record<string, any>;
  headers?: Record<string, any>;
  isPrivate?: boolean;
}): Promise<Response> => {
  const token = isPrivate
    ? headers["Authorization"] || `Bearer ${getAuthorizationToken()}`
    : undefined;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(isPrivate && token ? { Authorization: token } : {}),
      ...headers,
    },
  };

  if (Object.keys(data).length > 0) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_API_URL}${apiUrl}`, requestOptions);
    if (response.status === 401) {
      document.cookie = `token=; expires=${new Date(0).toUTCString()}; path=/;`;
      await fetch(`${BASE_API_URL}/auth/logout`, { method: "POST" });
    }
    return response
  } catch (error) {
    throw error;
  }
};
