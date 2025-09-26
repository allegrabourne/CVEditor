
export class ProfileManager {
    constructor() {
      this.storageKey = 'cvEditor_savedProfiles';
      this.currentProfileKey = 'cvEditor_currentProfile';
    }
  
    // Save current CV as a named profile
    saveProfile(profileName, cvData, sectionOrder, hiddenSections, selectedTemplate) {
      if (!profileName.trim()) {
        throw new Error('Profile name cannot be empty');
      }
  
      const profiles = this.getSavedProfiles();
      
      const profile = {
        name: profileName.trim(),
        cvData: JSON.parse(JSON.stringify(cvData)), // Deep clone
        sectionOrder: [...sectionOrder],
        hiddenSections: [...hiddenSections],
        selectedTemplate,
        savedAt: new Date().toISOString(),
        id: this.generateProfileId()
      };
  
      profiles[profile.id] = profile;
      
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(profiles));
        this.setCurrentProfile(profile.id);
        return { success: true, profileId: profile.id };
      } catch (error) {
        throw new Error(`Failed to save profile: ${error.message}`);
      }
    }
  
    // Load a specific profile
    loadProfile(profileId) {
      const profiles = this.getSavedProfiles();
      const profile = profiles[profileId];
      
      if (!profile) {
        throw new Error('Profile not found');
      }
  
      this.setCurrentProfile(profileId);
      
      return {
        cvData: profile.cvData,
        sectionOrder: profile.sectionOrder,
        hiddenSections: profile.hiddenSections,
        selectedTemplate: profile.selectedTemplate,
        profileName: profile.name
      };
    }
  
    // Get all saved profiles
    getSavedProfiles() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.warn('Failed to load saved profiles:', error);
        return {};
      }
    }
  
    // Get profile list for UI
    getProfileList() {
      const profiles = this.getSavedProfiles();
      return Object.values(profiles)
        .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
        .map(profile => ({
          id: profile.id,
          name: profile.name,
          savedAt: profile.savedAt,
          templateName: profile.selectedTemplate
        }));
    }
  
    // Delete a profile
    deleteProfile(profileId) {
      const profiles = this.getSavedProfiles();
      
      if (!profiles[profileId]) {
        throw new Error('Profile not found');
      }
  
      delete profiles[profileId];
      
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(profiles));
        
        // If this was the current profile, clear current profile
        if (this.getCurrentProfileId() === profileId) {
          localStorage.removeItem(this.currentProfileKey);
        }
        
        return { success: true };
      } catch (error) {
        throw new Error(`Failed to delete profile: ${error.message}`);
      }
    }
  
    // Rename a profile
    renameProfile(profileId, newName) {
      if (!newName.trim()) {
        throw new Error('Profile name cannot be empty');
      }
  
      const profiles = this.getSavedProfiles();
      const profile = profiles[profileId];
      
      if (!profile) {
        throw new Error('Profile not found');
      }
  
      profile.name = newName.trim();
      profile.updatedAt = new Date().toISOString();
      
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(profiles));
        return { success: true };
      } catch (error) {
        throw new Error(`Failed to rename profile: ${error.message}`);
      }
    }
  
    // Export profile to JSON file
    exportProfile(profileId) {
      const profiles = this.getSavedProfiles();
      const profile = profiles[profileId];
      
      if (!profile) {
        throw new Error('Profile not found');
      }
  
      const exportData = {
        profileName: profile.name,
        cvData: profile.cvData,
        sectionOrder: profile.sectionOrder,
        hiddenSections: profile.hiddenSections,
        selectedTemplate: profile.selectedTemplate,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };
  
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cv-profile-${profile.name.replace(/[^a-zA-Z0-9]/g, '-')}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  
    // Export profile to XML file
    exportProfileXML(profileId) {
      const profiles = this.getSavedProfiles();
      const profile = profiles[profileId];
      
      if (!profile) {
        throw new Error('Profile not found');
      }
  
      const xml = this.convertToXML(profile);
      
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cv-profile-${profile.name.replace(/[^a-zA-Z0-9]/g, '-')}.xml`;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  
    // Import profile from JSON
    importProfileFromJSON(jsonString, profileName) {
      try {
        const data = JSON.parse(jsonString);
        
        // Validate required fields
        if (!data.cvData) {
          throw new Error('Invalid profile format: missing CV data');
        }
  
        const name = profileName || data.profileName || 'Imported Profile';
        
        return this.saveProfile(
          name,
          data.cvData,
          data.sectionOrder || ['personal', 'profile', 'experience', 'projects', 'certificates', 'education', 'courses'],
          data.hiddenSections || [],
          data.selectedTemplate || 'plain-professional'
        );
      } catch (error) {
        throw new Error(`Failed to import profile: ${error.message}`);
      }
    }
  
    // Convert profile to XML format
    convertToXML(profile) {
      const escapeXML = (str) => {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      };
  
      const arrayToXML = (arr, itemName) => {
        return arr.map(item => {
          if (typeof item === 'string') {
            return `<${itemName}>${escapeXML(item)}</${itemName}>`;
          }
          return `<${itemName}>${objectToXML(item)}</${itemName}>`;
        }).join('\n');
      };
  
      const objectToXML = (obj, indent = '') => {
        return Object.entries(obj).map(([key, value]) => {
          if (value === null || value === undefined) {
            return `${indent}<${key}></${key}>`;
          }
          if (Array.isArray(value)) {
            return `${indent}<${key}>\n${arrayToXML(value, key.slice(0, -1))}\n${indent}</${key}>`;
          }
          if (typeof value === 'object') {
            return `${indent}<${key}>\n${objectToXML(value, indent + '  ')}\n${indent}</${key}>`;
          }
          return `${indent}<${key}>${escapeXML(value)}</${key}>`;
        }).join('\n');
      };
  
      return `<?xml version="1.0" encoding="UTF-8"?>
  <cvProfile>
    <metadata>
      <name>${escapeXML(profile.name)}</name>
      <savedAt>${escapeXML(profile.savedAt)}</savedAt>
      <selectedTemplate>${escapeXML(profile.selectedTemplate)}</selectedTemplate>
      <version>1.0</version>
    </metadata>
    <configuration>
      <sectionOrder>
  ${profile.sectionOrder.map(section => `      <section>${escapeXML(section)}</section>`).join('\n')}
      </sectionOrder>
      <hiddenSections>
  ${profile.hiddenSections.map(section => `      <section>${escapeXML(section)}</section>`).join('\n')}
      </hiddenSections>
    </configuration>
    <cvData>
  ${objectToXML(profile.cvData, '    ')}
    </cvData>
  </cvProfile>`;
    }
  
    // Get current profile ID
    getCurrentProfileId() {
      return localStorage.getItem(this.currentProfileKey);
    }
  
    // Set current profile
    setCurrentProfile(profileId) {
      localStorage.setItem(this.currentProfileKey, profileId);
    }
  
    // Check if there are unsaved changes
    hasUnsavedChanges(currentCvData, currentSectionOrder, currentHiddenSections, currentTemplate) {
      const currentProfileId = this.getCurrentProfileId();
      if (!currentProfileId) return true;
  
      try {
        const savedProfile = this.getSavedProfiles()[currentProfileId];
        if (!savedProfile) return true;
  
        return (
          JSON.stringify(currentCvData) !== JSON.stringify(savedProfile.cvData) ||
          JSON.stringify(currentSectionOrder) !== JSON.stringify(savedProfile.sectionOrder) ||
          JSON.stringify(currentHiddenSections) !== JSON.stringify(savedProfile.hiddenSections) ||
          currentTemplate !== savedProfile.selectedTemplate
        );
      } catch (error) {
        return true;
      }
    }
  
    // Generate unique profile ID
    generateProfileId() {
      return 'profile_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  
    // Clear all profiles (with confirmation)
    clearAllProfiles() {
      try {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.currentProfileKey);
        return { success: true };
      } catch (error) {
        throw new Error(`Failed to clear profiles: ${error.message}`);
      }
    }
  }
  
  // Export singleton instance
  export const profileManager = new ProfileManager();