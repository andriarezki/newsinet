# SMARTRI Information Data Management Center - Design Guidelines

## Design Approach
**Selected Approach**: Design System - Material Design principles adapted for corporate context
**Justification**: Corporate information portal requiring stability, professional presentation, and clear information hierarchy across multiple content sections.

## Core Design Elements

### A. Color Palette
**Primary Colors**:
- Primary Green: 140 45% 45% (corporate green, headers, CTAs)
- Primary Green Light: 140 40% 55% (hover states, accents)
- Primary Green Dark: 140 50% 35% (active states, footer)

**Neutral Colors**:
- White: 0 0% 100% (backgrounds, cards)
- Gray 50: 140 10% 98% (section backgrounds)
- Gray 100: 140 8% 95% (borders, dividers)
- Gray 600: 140 5% 45% (body text)
- Gray 900: 140 8% 15% (headings)

**System Colors**:
- Success: 142 71% 45%
- Warning: 45 93% 47%
- Error: 0 84% 60%

### B. Typography
**Font Families**: 
- Primary: Inter (headings, UI) - Google Fonts CDN
- Secondary: Open Sans (body text) - Google Fonts CDN

**Type Scale**:
- Hero/H1: text-5xl font-bold (48px)
- H2: text-4xl font-bold (36px)
- H3: text-2xl font-semibold (24px)
- H4: text-xl font-semibold (20px)
- Body: text-base (16px)
- Small: text-sm (14px)

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 4, 6, 8, 12, 16, 20, 24 for vertical/horizontal spacing
- Section padding: py-16 md:py-20 (desktop), py-12 (mobile)
- Container: max-w-7xl mx-auto px-4 md:px-6
- Card spacing: p-6 md:p-8
- Element gaps: gap-6 md:gap-8

### D. Component Library

**Navigation Header**:
- Fixed/sticky header with white background, subtle shadow
- Company logo left (max height 60px), division name right
- Horizontal menu with green hover states
- Mobile: Hamburger menu with slide-in drawer
- Admin indicator badge when logged in

**Hero Carousel/Slider**:
- Full-width image slider with 16:9 aspect ratio
- Navigation dots below, arrow controls on sides
- Smooth fade transitions (duration-700)
- Overlay gradient for text readability

**Content Cards**:
- White background with subtle shadow (shadow-md)
- Rounded corners (rounded-lg)
- Hover lift effect (hover:shadow-xl transition)
- Image aspect ratio 16:9 for consistency

**Service Icons Grid**:
- 5 columns desktop, 3 tablet, 2 mobile (grid-cols-2 md:grid-cols-3 lg:grid-cols-5)
- Icon size: 48px with green accent color
- Circular backgrounds with hover scale (hover:scale-110)
- Icon library: Heroicons or Material Icons via CDN

**Gallery Layout**:
- 4 distinct sections with category headers
- Masonry grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Lightbox modal for full-size viewing
- Subtle borders between categories

**News Cards**:
- Featured news (larger card) + grid of recent news
- Date badges in green
- Read more links with arrow icons
- Pagination or "Load More" pattern

**Collaboration Logos**:
- Horizontal scrolling slider
- Grayscale logos with color on hover
- Equal spacing and sizing (max-height: 80px)
- Auto-play with pause on hover

**Admin Controls**:
- Floating action button (bottom-right) for logged-in admins
- Edit icons appear on hover over editable sections
- Modal forms for content editing with clear save/cancel actions
- Toast notifications for success/error states

**Contact Section**:
- Two-column layout: Google Maps embed (60%) + contact details (40%)
- Maps with custom green marker
- Contact info with icons (phone, email, address)
- Social media links in footer

**Footer**:
- Dark green background (Primary Green Dark)
- Three-column layout: About, Quick Links, Contact
- Copyright notice centered below
- White text for contrast

### E. Responsive Breakpoints
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

### F. Interactive States
- Buttons: Solid green primary, white text, hover darken, active scale-95
- Links: Green underline on hover
- Cards: Shadow elevation on hover
- Forms: Green focus rings, clear validation states

### G. Accessibility
- WCAG AA contrast ratios maintained
- Focus visible states for keyboard navigation
- Semantic HTML structure
- Alt text for all images (admin-editable)
- Skip-to-content link

## Images Strategy
**Hero Section**: Large sliding carousel images (1920x1080 recommended) showing company facilities, palm oil operations, R&D activities
**Collaboration**: Partner company logos (transparent PNG, max 400x200)
**Gallery**: 4 categorized sections (Field Operations, Laboratory, Events, Facilities) with high-quality photos
**News**: Featured images for each news article (16:9 ratio, 800x450)