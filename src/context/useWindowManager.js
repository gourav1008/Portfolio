import { useContext } from 'react';
import WindowManagerContext from './WindowManagerContext';

export const useWindowManager = () => useContext(WindowManagerContext);
