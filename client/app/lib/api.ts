import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export async function getCampsites() {
  const response = await axios.get(`${API_BASE_URL}/campsites`);
  return response.data;
}

export async function getCampsiteById(id: string) {
  const response = await axios.get(`${API_BASE_URL}/campsites/${id}`);
  return response.data;
}

export async function createReservation(data: {
  campsite_id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  start_date: string;
  end_date: string;
  guests: number;
}) {
  const response = await axios.post(`${API_BASE_URL}/reservations`, data);
  return response.data;
}