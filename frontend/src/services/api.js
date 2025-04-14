import apiClient from '../utils/apiClient';

const API_URL = '/api/teams'; // Use relative path, baseURL is handled by apiClient

// Team API services
export const teamService = {
  // Get all teams
  getAllTeams: async () => {
    try {
      const response = await apiClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  // Get team by ID
  getTeamById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team with ID ${id}:`, error);
      throw error;
    }
  },

  // Create new team
  createTeam: async (teamData) => {
    try {
      const response = await apiClient.post(API_URL, teamData);
      return response.data; // apiClient handles parsing JSON response
    } catch (error) {
      console.error('Error creating team:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  },

  // Delete team
  deleteTeam: async (id) => {
    try {
      const response = await apiClient.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting team with ID ${id}:`, error);
      throw error;
    }
  },
};
