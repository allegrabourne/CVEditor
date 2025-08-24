# CV Editor Pro - Enhanced Version

This is an improved version of the CV Editor with better parsing, drag-and-drop functionality, theme support, and adherence to SOLID principles.

## 🚀 Key Improvements

### 1. Enhanced CV Parsing
- **Better Job History Parsing**: The parser now correctly identifies and separates individual job entries instead of lumping everything into one field
- **Improved Pattern Recognition**: Enhanced regex patterns for dates, job titles, companies, and responsibilities
- **Structured Data Extraction**: More accurate extraction of contact information, education, and certifications

### 2. Drag-and-Drop Section Management
- **Reorderable Sections**: Drag sections to reorder them on your CV
- **Section Visibility**: Toggle sections on/off (except required sections)
- **Visual Feedback**: Clear drag indicators and drop zones

### 3. Theme Support
- **Dark/Light Mode**: Toggle between themes with proper contrast
- **Preview Theming**: The preview section now respects the selected theme
- **Persistent Settings**: Theme preference is saved to localStorage

### 4. Better Architecture (SOLID Principles)

#### Single Responsibility Principle
- **Hooks**: Separate hooks for theme management and drag-drop functionality
- **Utils**: Dedicated utilities for parsing, section management, and styling
- **Components**: Focused components with clear responsibilities

#### Open/Closed Principle
- **Extensible Parsers**: Easy to add new parsing rules
- **Style System**: New themes can be added without modifying existing code

#### Liskov Substitution Principle
- **Interface Consistency**: All data update functions follow consistent patterns

#### Interface Segregation Principle
- **Focused Interfaces**: Components only receive the props they need

#### Dependency Inversion Principle
- **Configuration-Driven**: Section management is configuration-driven
- **Pluggable Components**: Easy to swap out implementations

## 📁 Project Structure

```
src/
├── components/
│   ├── CVEditor.jsx              # Main editor component
│   └── SectionOrderManager.jsx   # Drag-and-drop section management
├── hooks/
│   ├── useTheme.js              # Theme management hook
│   └── useDragDrop.js           # Drag and drop functionality
├── utils/
│   ├── cvParser.js              # Enhanced CV parsing logic
│   ├── sectionManager.js        # Section configuration and management
│   └── cv_data.js               # Sample CV data
├── styles/
│   └── cvStyles.js              # Theme-aware styling system
├── App.jsx                      # Main app component
├── App.css                      # Global styles and animations
├── main.jsx                     # Application entry point
└── index.css                    # Tailwind and base styles
```

## 🔧 How to Use

### Installation
1. Copy all files to your React project
2. Ensure you have the required dependencies:
   - `react`
   - `lucide-react`
   - `pdfjs-dist`
   - `tailwindcss`

### Import Structure
The new structure makes it easy to import individual components:
```javascript
import CVEditor from './components/CVEditor'
import { useTheme } from './hooks/useTheme'
import { CVParser } from './utils/cvParser'
```

## 🆕 New Features

### Section Management
- Click the "Sections" button to manage section order and visibility
- Drag sections up/down to reorder them
- Use the eye icon to show/hide sections (except required ones)

### Enhanced Import
- **Better PDF Parsing**: Improved text extraction with proper line grouping
- **Embedded Data Support**: Export includes metadata for perfect re-import
- **Multiple Formats**: Support for PDF, TXT, and JSON files
- **Detailed Feedback**: Clear success/error messages with parsing statistics

### Theme Support
- **Auto-Detection**: Respects system theme preference
- **Preview Theming**: Live preview matches selected theme
- **Persistent**: Theme choice is remembered between sessions

### Improved Export
- **Theme-Aware Export**: PDF export respects current theme
- **Section Order**: Exported CV follows your custom section order
- **Re-import Friendly**: Includes metadata for perfect re-import

## 🎨 Styling System

The new styling system supports:
- **Theme-Aware Colors**: Automatic dark/light mode adaptation
- **Rich/Plain Styles**: Two professional styling options
- **Print Optimization**: Special styles for PDF export
- **Responsive Design**: Works on all screen sizes

## 🔍 Parser Improvements

The enhanced parser now:
- Identifies job titles vs company names more accurately
- Properly separates individual work experiences
- Better handles bullet points and responsibilities
- Extracts dates, education, and certifications more reliably
- Provides debugging information for troubleshooting

## 💾 Data Structure

The CV data structure remains compatible with the original but now includes:
```javascript
{
  cvData: { /* CV content */ },
  sectionOrder: ['personal', 'profile', 'experience', ...],
  hiddenSections: ['courses'],
  theme: 'dark'
}
```

## 🎯 Future Enhancements

The new architecture makes it easy to add:
- Custom section types
- Advanced parsing rules
- Additional export formats
- Collaborative editing
- Template system

This restructured application maintains backward compatibility while providing a much more robust and maintainable codebase.