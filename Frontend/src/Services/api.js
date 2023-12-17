import {host} from "../Helper/host";

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${host}${endpoint}` , {
        headers:{'ngrok-skip-browser-warning': 'true'}
    });
    return await response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${host}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  // Add other HTTP methods (put, delete, etc.) as needed...
};
