import React, { useState, useEffect } from 'react';
import { 
  Save, 
  FolderOpen, 
  Download, 
  Upload, 
  Trash2, 
  Edit3, 
  X, 
  Check,
  AlertCircle,
  Clock,
  FileText,
  Plus,
  RefreshCw
} from 'lucide-react';
import { profileManager } from '../utils/profileManager';

export const ProfileManager = ({
  isDark,
  cvData,
  sectionOrder,
  hiddenSections,
  selectedTemplate,
  setCvData,
  setSectionOrder,
  setHiddenSections,
  setSelectedTemplate,
  onClose
}) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [editingProfile, setEditingProfile] = useState(null);
  const [editName, setEditName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load profiles and check for unsaved changes
  useEffect(() => {
    loadProfiles();
    checkUnsavedChanges();
  }, [cvData, sectionOrder, hiddenSections, selectedTemplate]);

  const loadProfiles = () => {
    try {
      const profileList = profileManager.getProfileList();
      setProfiles(profileList);
      setCurrentProfileId(profileManager.getCurrentProfileId());
    } catch (error) {
      showNotification('Failed to load CVs', 'error');
    }
  };

  const checkUnsavedChanges = () => {
    const hasChanges = profileManager.hasUnsavedChanges(
      cvData, 
      sectionOrder, 
      hiddenSections, 
      selectedTemplate
    );
    setHasUnsavedChanges(hasChanges);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Save current CV as new profile
  const handleSaveProfile = async () => {
    if (!newProfileName.trim()) {
      showNotification('Please enter a CV name', 'error');
      return;
    }

    try {
      const result = profileManager.saveProfile(
        newProfileName,
        cvData,
        sectionOrder,
        hiddenSections,
        selectedTemplate
      );
      
      loadProfiles();
      setCurrentProfileId(result.profileId);
      setNewProfileName('');
      setShowSaveDialog(false);
      setHasUnsavedChanges(false);
      showNotification(`CV "${newProfileName}" saved successfully`);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Load an existing profile
  const handleLoadProfile = (profileId) => {
    try {
      const profile = profileManager.loadProfile(profileId);
      
      setCvData(profile.cvData);
      setSectionOrder(profile.sectionOrder);
      setHiddenSections(profile.hiddenSections);
      setSelectedTemplate(profile.selectedTemplate);
      
      setCurrentProfileId(profileId);
      setHasUnsavedChanges(false);
      showNotification(`Loaded CV "${profile.profileName}"`);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Delete a profile
  const handleDeleteProfile = (profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    if (window.confirm(`Are you sure you want to delete "${profile.name}"? This action cannot be undone.`)) {
      try {
        profileManager.deleteProfile(profileId);
        loadProfiles();
        
        if (currentProfileId === profileId) {
          setCurrentProfileId(null);
          setHasUnsavedChanges(true);
        }
        
        showNotification(`CV "${profile.name}" deleted`);
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  };

  // Rename a profile
  const handleRenameProfile = (profileId) => {
    if (!editName.trim()) {
      showNotification('Please enter a valid name', 'error');
      return;
    }

    try {
      profileManager.renameProfile(profileId, editName);
      loadProfiles();
      setEditingProfile(null);
      setEditName('');
      showNotification('CV renamed successfully');
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Export profile
  const handleExportProfile = (profileId, format) => {
    try {
      if (format === 'xml') {
        profileManager.exportProfileXML(profileId);
      } else {
        profileManager.exportProfile(profileId);
      }
      showNotification(`CV exported`);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Import profile from file
  const handleImportProfile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const profileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        
        profileManager.importProfileFromJSON(content, profileName);
        loadProfiles();
        showNotification(`CV imported from ${file.name}`);
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  // Update current profile (overwrite)
  const handleUpdateCurrentProfile = () => {
    if (!currentProfileId) return;

    const currentProfile = profiles.find(p => p.id === currentProfileId);
    if (!currentProfile) return;

    try {
      profileManager.saveProfile(
        currentProfile.name,
        cvData,
        sectionOrder,
        hiddenSections,
        selectedTemplate
      );
      
      setHasUnsavedChanges(false);
      showNotification(`CV "${currentProfile.name}" updated`);
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  const getCurrentProfileName = () => {
    const current = profiles.find(p => p.id === currentProfileId);
    return current ? current.name : 'Unsaved CV';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FolderOpen className="h-6 w-6" />
                CV Manager
              </h2>
              <p className="text-purple-100 mt-1">
                Current: {getCurrentProfileName()}
                {hasUnsavedChanges && <span className="text-yellow-300 ml-2">(Unsaved changes)</span>}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`p-4 ${
            notification.type === 'error' 
              ? 'bg-red-100 text-red-800 border-red-200' 
              : 'bg-green-100 text-green-800 border-green-200'
          } border-b`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {notification.message}
            </div>
          </div>
        )}

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          
          {/* Export Reminder Note */}
          {profiles.length > 0 && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDark ? 'bg-yellow-900/20 border-yellow-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  <strong>Remember:</strong> Export your CV to save it permanently. Data stored here is temporary and may be lost.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Create
            </button>

            {currentProfileId && hasUnsavedChanges && (
              <button
                onClick={handleUpdateCurrentProfile}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Update Current
              </button>
            )}

            <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              <Upload className="h-4 w-4" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportProfile}
                className="hidden"
              />
            </label>
          </div>

          {/* Save Dialog */}
          {showSaveDialog && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className="font-semibold mb-3">Save New Profile</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Enter CV name..."
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveProfile()}
                />
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setShowSaveDialog(false);
                    setNewProfileName('');
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Profiles List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">
              Saved CVs ({profiles.length})
            </h3>
            
            {profiles.length === 0 ? (
              <div className={`text-center py-12 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No saved CVs yet</p>
                <p className="text-sm">Select 'Create' to get started</p>
              </div>
            ) : (
              profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border transition-all ${
                    currentProfileId === profile.id
                      ? (isDark 
                          ? 'bg-purple-900/20 border-purple-600' 
                          : 'bg-purple-50 border-purple-300')
                      : (isDark 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100')
                  }`}
                >
                  <div className="flex items-start justify-between sm:items-center">
                    <div className="flex-1">
                      {editingProfile === profile.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className={`flex-1 px-3 py-1 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              isDark 
                                ? 'bg-gray-800 border-gray-600 text-white' 
                                : 'bg-white border-gray-300'
                            }`}
                            onKeyPress={(e) => e.key === 'Enter' && handleRenameProfile(profile.id)}
                          />
                          <button
                            onClick={() => handleRenameProfile(profile.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingProfile(null);
                              setEditName('');
                            }}
                            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-lg">{profile.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(profile.savedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {profile.templateName}
                            </span>
                            {currentProfileId === profile.id && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4 sm:gap-3">
                      {/* Desktop: single row layout */}
                      <div className="hidden sm:flex items-center gap-3">
                        <button
                          onClick={() => handleLoadProfile(profile.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            currentProfileId === profile.id
                              ? 'opacity-50 cursor-not-allowed'
                              : 'text-blue-600 hover:bg-blue-100'
                          }`}
                          disabled={currentProfileId === profile.id}
                          title="Load profile"
                        >
                          <FolderOpen className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingProfile(profile.id);
                            setEditName(profile.name);
                          }}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Rename profile"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleExportProfile(profile.id, 'json')}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Save profile to file"
                        >
                          <Download className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete profile"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Mobile: 2x2 grid layout */}
                      <div className="grid grid-cols-2 grid-rows-2 gap-1 sm:hidden">
                        <button
                          onClick={() => handleLoadProfile(profile.id)}
                          className={`p-3 rounded-lg transition-colors ${
                            currentProfileId === profile.id
                              ? 'opacity-50 cursor-not-allowed'
                              : 'text-blue-600 hover:bg-blue-100'
                          }`}
                          disabled={currentProfileId === profile.id}
                          title="Load profile"
                        >
                          <FolderOpen className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingProfile(profile.id);
                            setEditName(profile.name);
                          }}
                          className="p-3 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Rename profile"
                        >
                          <Edit3 className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleExportProfile(profile.id, 'json')}
                          className="p-3 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Save profile to file"
                        >
                          <Download className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete profile"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};