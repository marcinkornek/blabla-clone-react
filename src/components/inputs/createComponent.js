// Updated for React 18 and MUI v5

import React, { forwardRef } from 'react'

/**
 * Creates a component that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export default function createComponent(MaterialUIComponent, mapProps) {
  const InputComponent = forwardRef((props, ref) => {
    return React.createElement(MaterialUIComponent, {
      ...mapProps(props),
      ref
    })
  })
  
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.displayName || MaterialUIComponent.name}`
  return InputComponent
}
