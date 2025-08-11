# Modular CSS Architecture

This project now uses a modular CSS architecture for better maintainability and organization. The CSS has been broken down into logical modules following the ITCSS (Inverted Triangle CSS) methodology.

## File Structure

```
src/portfolio/static/css/
├── main-modular.css           # New modular entry point
├── main.css                   # Original monolithic file (keep for reference)
├── core/                      # Foundation styles
│   ├── reset.css             # CSS reset and Tailwind base
│   ├── variables.css         # CSS custom properties (design tokens)
│   └── base.css              # Base typography and global styles
├── components/               # Reusable UI components
│   ├── buttons.css           # Button styles and variants
│   ├── cards.css             # Card components and effects
│   ├── forms.css             # Form elements and states
│   ├── ui.css                # UI components (tooltips, modals, etc.)
│   └── project-cards.css     # Complex project card components
├── utilities/                # Helper classes and utilities
│   ├── layout.css            # Layout utilities and grid systems
│   ├── animations.css        # Animation classes and keyframes
│   └── responsive.css        # Responsive utilities and media queries
├── custom/                   # Complex custom components
│   └── navbar.css            # Complex navbar with advanced interactions
├── tailwind/                 # Tailwind utility classes
│   └── utilities.css         # All Tailwind utility classes
└── sections/                 # Page-specific styles (existing)
    └── blog.css
```

## Benefits of This Architecture

### 1. **Maintainability**
- Each file has a single responsibility
- Easy to locate and modify specific styles
- Reduced risk of unintended side effects

### 2. **Reusability**
- Components can be easily reused across pages
- Clear separation between layout, components, and utilities
- Design tokens in variables.css ensure consistency

### 3. **Performance**
- Selective loading of only needed CSS modules
- Better caching strategies (individual files can be cached separately)
- Easier to identify and remove unused styles

### 4. **Scalability**
- New components can be added without affecting existing ones
- Team collaboration is easier with smaller, focused files
- Clear naming conventions and organization

### 5. **Development Experience**
- Faster development with smaller files to navigate
- Better IDE support with focused contexts
- Easier debugging and testing

## Usage

### Option 1: Use the New Modular Architecture
Replace the current CSS import in your HTML templates:

```html
<!-- Instead of -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/main.css') }}">

<!-- Use -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/main-modular.css') }}">
```

### Option 2: Selective Loading
For better performance, you can load only specific modules:

```html
<!-- Core styles (always needed) -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/core/reset.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/core/variables.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/core/base.css') }}">

<!-- Components (load as needed) -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/components/buttons.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/components/cards.css') }}">

<!-- Utilities -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/utilities/layout.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/utilities/animations.css') }}">
```

## Design Tokens (CSS Custom Properties)

The `core/variables.css` file contains all design tokens:

```css
:root {
    /* Colors */
    --color-primary: #00b96b;
    --color-secondary: #0088cc;
    
    /* Spacing */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    
    /* Transitions */
    --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* And many more... */
}
```

These tokens ensure consistency across all components and make theme changes easier.

## Component Examples

### Buttons
```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
```

### Cards
```html
<div class="card-base card-hover">
    <h3>Card Title</h3>
    <p>Card content...</p>
</div>
```

### Forms
```html
<div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="form-input" placeholder="Enter email">
</div>
```

## Migration Guide

1. **Backup**: Keep the original `main.css` file as reference
2. **Update imports**: Change CSS link in your HTML templates
3. **Test**: Verify all components render correctly
4. **Optimize**: Consider selective loading for better performance
5. **Customize**: Modify design tokens in `variables.css` for brand customization

## Future Enhancements

- **CSS-in-JS**: Consider migrating to a CSS-in-JS solution for dynamic theming
- **Build Process**: Add CSS minification and purging for production
- **Component Library**: Create a style guide/component library documentation
- **Dark Mode**: Extend variables.css with dark mode support
- **Critical CSS**: Implement critical CSS extraction for above-the-fold content

## File Size Comparison

- **Original main.css**: ~2820 lines
- **Modular architecture**: Distributed across 12 focused files
- **Core files**: ~400 lines
- **Components**: ~300 lines each
- **Utilities**: ~200 lines each

This organization makes the codebase much more manageable while maintaining all functionality.
