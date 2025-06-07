import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

export function getAllInsurances() {
  const response = axios.get(`${baseURL}/Insurances`);
  return response;
}

export function getTopInsurance() {
  const response = axios.get(`${baseURL}/Insurances/top`);
  return response;
}

export function searchInsurances(title) {
  const response = axios.get(`${baseURL}/Insurances/search?title=${title}`);
  return response;
}

export function getAllInsurancesByUser() {
  const response = axios.get(`${baseURL}/Insurances/byUserId`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createInsurances(body) {
  const response = axios.Insurance(`${baseURL}/Insurances/create`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getInsurancesById(id) {
  const response = axios.get(`${baseURL}/Insurances/byIdInsurance/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function ediInsurances(body, id) {
  const response = axios.patch(`${baseURL}/Insurances/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteInsurances (id) {
  const response = axios.delete(`${baseURL}/Insurances/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}