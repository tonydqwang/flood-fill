import { render } from './utils/test-utils';
import App from './App';

test('renders default app', async () => {
  const { baseElement } = await render(<App />);
  expect(baseElement).toMatchSnapshot();
});
