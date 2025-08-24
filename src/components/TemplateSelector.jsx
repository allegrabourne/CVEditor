// components/TemplateSelector.jsx - Template selection interface

import React, { useState, useMemo } from 'react';
import { Palette, Eye, Grid, Filter, Star } from 'lucide-react';
import { TEMPLATE_REGISTRY, TEMPLATE_CATEGORIES, getTemplatesByCategory, getTemplateColorSchemes } from '../templates/templateRegistry.js';

const TemplateSelector = ({ 
  selectedTemplateId, 
  selectedColorScheme, 
  onTemplateChange, 
  onColorSchemeChange,
  isDark 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const templates = useMemo(() => {
    if (selectedCategory === 'all') {
      return Object.values(TEMPLATE_REGISTRY);
    }
    return getTemplatesByCategory(selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => [
    { id: 'all', name: 'All Templates', count: Object.keys(TEMPLATE_REGISTRY).length },
    ...Object.values(TEMPLATE_CATEGORIES).map(category => ({
      id: category,
      name: category,
      count: getTemplatesByCategory(category).length
    }))
  ], []);

  const colorSchemes = useMemo(() => {
    if (!selectedTemplateId) return [];
    return getTemplateColorSchemes(selectedTemplateId);
  }, [selectedTemplateId]);

  const TemplateCard = ({ template, isSelected }) => (
    <div 
      className={`
        relative group cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden
        ${isSelected 
          ? 'border-purple-500 ring-4 ring-purple-200 dark:ring-purple-800' 
          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
        }
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}
      onClick={() => onTemplateChange(template.id)}
    >
      {/* Preview Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
        {template.preview ? (
          <img 
            src={template.preview} 
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl opacity-50">📄</div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        )}
      </div>

      {/* Template info */}
      <div className="p-4">
        <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {template.name}
        </h3>
        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {template.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {template.tags?.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${
                isDark 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Category badge */}
        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
          isDark 
            ? 'bg-purple-900/30 text-purple-300' 
            : 'bg-purple-100 text-purple-700'
        }`}>
          {template.category}
        </div>
      </div>
    </div>
  );

  const ColorSchemeSelector = () => (
    <div className="mt-4">
      <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Color Scheme
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {colorSchemes.map(scheme => (
          <button
            key={scheme.id}
            onClick={() => onColorSchemeChange(scheme.id)}
            className={`
              p-3 rounded-xl border-2 transition-all duration-300
              ${selectedColorScheme === scheme.id
                ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
              ${isDark ? 'bg-gray-800' : 'bg-white'}
            `}
          >
            {/* Color preview circles */}
            <div className="flex justify-center gap-1 mb-2">
              <div 
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: scheme.primary }}
              />
              <div 
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: scheme.secondary }}
              />
              <div 
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: scheme.accent }}
              />
            </div>
            <div className={`text-xs font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {scheme.id.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`rounded-2xl shadow-xl border p-6 ${
      isDark 
        ? 'bg-gray-800/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <Palette className="h-5 w-5 text-purple-600" />
          Choose Template
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
            }`}
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${selectedCategory === category.id
                ? 'bg-purple-600 text-white shadow-lg'
                : `${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`
              }
            `}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className={`
        grid gap-4 mb-6
        ${viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
        }
      `}>
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
          />
        ))}
      </div>

      {/* Color scheme selector */}
      {selectedTemplateId && colorSchemes.length > 0 && (
        <ColorSchemeSelector />
      )}
    </div>
  );
};

export default TemplateSelector;