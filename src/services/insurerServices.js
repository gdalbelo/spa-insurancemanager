import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

export function getAllInsurers() {
  const response = axios.get(`${baseURL}/insurers`);
  return response;
}

export function getTopInsurer() {
  const response = axios.get(`${baseURL}/insurers/top`);
  return response;
}

export function searchInsurers(title) {
  const response = axios.get(`${baseURL}/insurers/search?title=${title}`);
  return response;
}

export function getAllInsurersByUser() {
  const response = axios.get(`${baseURL}/insurers/byUserId`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createNews(body) {
  const response = axios.post(`${baseURL}/insurers/create`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getNewsById(id) {
  const response = axios.get(`${baseURL}/insurers/byIdInsurer/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function editNews(body, id) {
  const response = axios.patch(`${baseURL}/insurers/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteNews (id) {
  const response = axios.delete(`${baseURL}/insurers/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}