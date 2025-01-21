export const selectCategoriesMap = (state) => {
  console.log("selector fired");
  const categoriesMap = state.categories.categories.reduce(
    (acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );
  return categoriesMap;
};

/*
ERROR ENCOUNTERING:
Selector selectCategoriesMap returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
Selectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization 
{state: {…}, selected: {…}, selected2: {…}, stack: 'Error\n    at selectCategoriesMap (http://localhost…tp://localhost:3000/static/js/bundle.js:63351:22)'}
 Error Component Stack
    at CategoriesPreview (categories-preview.component.jsx:7:1)
    at Shop (shop.component.jsx:12:1)
    at Navigation (navigation.component.jsx:15:1)
    at App (App.js:18:1)
    at CartProvider (cart.context.jsx:82:1)
-------------------------------------------

Summary
Old Way: Use plain functions for selectors, often leading to inefficiencies.
New Way with RTK: Use createSelector from reselect to memoize selectors.
Best Practice: Combine Redux Toolkit's createSlice with memoized selectors for efficient state management.
-------------------------------------------------------------
Yes, the code you shared is the "old way" of writing a selector without memoization. The issue with this approach is that every time the `selectCategoriesMap` selector is called, it performs the computation again, even if the underlying state hasn't changed. This can lead to:

1. **Performance Overhead:** Unnecessary recomputation on every call.
2. **Unnecessary Rerenders:** Since a new object reference is created each time, components using this selector will rerender even when the state is unchanged.

### Why This is Problematic:
Selectors that return derived data, such as objects or arrays, should be memoized to avoid returning a new reference unnecessarily. Without memoization, this selector will:

- Always return a new object (due to `reduce` creating a new object).
- Cause React components that depend on `categoriesMap` to rerender even if the `state.categories.categories` data hasn't changed.

### Comparison with Memoized Selector:
Here’s how the old approach compares to the memoized approach using `createSelector`:

#### Old Way (Unoptimized):
```javascript
export const selectCategoriesMap = (state) => {
  const categoriesMap = state.categories.categories.reduce(
    (acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );
  return categoriesMap;
};
```

#### Memoized Way (Optimized with `createSelector`):
```javascript
import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
```

### Key Advantages of the Memoized Approach:
1. **Efficiency:** The computation (using `reduce`) is only performed if `categoriesSlice.categories` changes.
2. **Stable References:** The memoized selector ensures that the same reference is returned if the input state hasn’t changed, preventing unnecessary React renders.
3. **Scalability:** Memoized selectors are crucial in larger apps with more complex selectors to maintain performance.

### Recommendation:
You should always use the memoized approach (`createSelector`) for selectors that:
- Derive data.
- Return objects or arrays (non-primitive types).
- Are used by components or other selectors frequently. 

This will make your application more efficient and predictable.
*/
