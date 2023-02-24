import axios from 'axios';

const axiosBaseUrl = 'http://localhost:5000';

export function addTodo(description) {
  return axios.post(`${axiosBaseUrl}/todos`, description);
}
export function getAllTodos() {
  return axios.get(`${axiosBaseUrl}/todos`);
}
export function deleteTodo(id) {
  return axios.delete(`${axiosBaseUrl}/todos/${id}`);
}
export function updateTodo(id, description) {
  return axios.put(`${axiosBaseUrl}/todos/${id}`, description);
}
