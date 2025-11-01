# Reusable UI Components

This project now includes reusable UI components to ensure consistent styling across all pages.

## Components

### Button Component
**Location:** `src/Components/Button.jsx`

A flexible button component with multiple variants and sizes.

#### Props:
- `variant` - Style variant: `'primary'` | `'secondary'` | `'success'` | `'warning'`
  - **primary**: Black background (#111) - used for main actions
  - **success**: Green background (#10b461) - used for positive actions
  - **warning**: Yellow background (#f3c164) - used for alerts/switches
  - **secondary**: Gray background - used for less important actions

- `size` - Button size: `'small'` | `'medium'` | `'large'`
- `fullWidth` - Boolean, makes button take full width
- `type` - HTML button type: `'button'` | `'submit'` | `'reset'`
- `disabled` - Boolean, disables the button
- `onClick` - Click handler function
- `className` - Additional custom classes

#### Usage Examples:
```jsx
import Button from '../Components/Button'

// Primary submit button
<Button type="submit" variant="primary" fullWidth>
  Login
</Button>

// Success action button
<Button variant="success" fullWidth>
  Sign in as Captain
</Button>

// Warning button
<Button variant="warning" size="medium">
  Cancel
</Button>
```

---

### Input Component
**Location:** `src/Components/Input.jsx`

A consistent input field component with label support.

#### Props:
- `label` - Label text displayed above input
- `type` - HTML input type (text, email, password, number, etc.)
- `placeholder` - Placeholder text
- `value` - Input value (controlled component)
- `onChange` - Change handler function
- `required` - Boolean, makes field required
- `name` - Input name attribute
- `id` - Input id attribute
- `halfWidth` - Boolean, sets width to 50% (for side-by-side inputs)
- `className` - Additional custom classes for input
- `containerClassName` - Additional classes for container div
- `labelClassName` - Additional classes for label

#### Usage Examples:
```jsx
import Input from '../Components/Input'

// Standard input with label
<Input
  label="What's your email"
  type="email"
  placeholder="email@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

// Side-by-side inputs (firstname/lastname)
<div className='flex gap-4 mb-6'>
  <Input
    type="text"
    placeholder="Firstname"
    value={firstname}
    onChange={(e) => setFirstname(e.target.value)}
    required
    halfWidth
    containerClassName="w-1/2"
    className="mb-0"
  />
  <Input
    type="text"
    placeholder="Lastname"
    value={lastname}
    onChange={(e) => setLastname(e.target.value)}
    required
    halfWidth
    containerClassName="w-1/2"
    className="mb-0"
  />
</div>
```

---

## Updated Pages

The following pages have been refactored to use these components:

1. **UserLogin.jsx** - Uses Button and Input components
2. **UserSignup.jsx** - Uses Button and Input components
3. **Captainlogin.jsx** - Uses Button and Input components
4. **CaptainSignup.jsx** - Uses Button and Input components

## Benefits

✅ **Consistency** - All buttons and inputs look and behave the same  
✅ **Maintainability** - Update styling in one place affects all instances  
✅ **Reusability** - Easy to add new forms with consistent design  
✅ **Accessibility** - Built-in focus states and proper HTML structure  
✅ **Flexibility** - Props allow customization when needed  

## Design System Colors

- **Primary Dark**: `#111` (Black)
- **Success Green**: `#10b461`
- **Warning Yellow**: `#f3c164`
- **Background Gray**: `#eeeeee`
- **Border Gray**: Default Tailwind border color

## Future Improvements

Consider creating additional reusable components:
- `Card` - For consistent card layouts
- `Modal` - For popups and dialogs
- `Badge` - For status indicators
- `Avatar` - For user profile images
- `Select` - For dropdown menus (currently select is inline)
