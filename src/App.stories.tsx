import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
  title: 'App Component', // ❗ Заголовок в боковой панели Storybook
  component: App,         // ❗ Компонент, для которого пишем stories
  decorators: [ReduxStoreProviderDecorator],
};

export const AppBaseExample = () => {
  return <App/>
};