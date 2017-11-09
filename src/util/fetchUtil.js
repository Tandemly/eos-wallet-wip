/* global fetch */

const apiHost = process.env.REACT_APP_API_URI;
const apiKey = process.env.REACT_APP_API_KEY;
const defaultOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${apiKey}`
  }
};

export const apiRequest = async (path: string, options = {}) => {
  let resp;
  try {
    resp = await fetch(`${apiHost}${path}`, {
      ...defaultOptions,
      ...options
    });
    // just grab as text (rather than check response headers for content type)
    let text = await resp.text();
    try {
      // attempt to parse as JSON
      let json = JSON.parse(text);
      return json;
    } catch (err) {
      // Not json, format and return
      return { status: resp.status, text: resp.statusText, message: text };
    }
  } catch (err) {
    return { status: resp.status, text: resp.statusText };
  }
};
