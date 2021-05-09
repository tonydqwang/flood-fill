import { render } from '@testing-library/react';
import { AppCtxProvider } from '../components/app-context';
import { act } from 'react-dom/test-utils';

const AllTheProviders = ({ chilren }) => {
  return (
    <AppCtxProvider>
      {chilren}
    </AppCtxProvider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export { 
  customRender as render,
}