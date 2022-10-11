import { createContext } from 'react';
import { SettingsContext as Settings } from 'src/models/settings';

export const SettingsContext = createContext({} as Settings);
