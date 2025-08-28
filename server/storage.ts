// Storage interface for Japan discovery platform
// Currently, all data is provided via external APIs (Perplexity, weather, etc.)
// No persistent storage needed for search functionality

export interface IStorage {
  // Future storage methods can be added here if needed
  // For now, all data comes from external APIs
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage if needed in the future
  }
}

export const storage = new MemStorage();
