import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Bridge} from './src/lib';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Bridge.init();
    Bridge.addKey('key');
    Bridge.addCallback('key', () => {
      return async () => {
        setInterval(() => {
          console.log('LOOP');
        }, 2000);
      };
    });
    Bridge.updateRegistry();
  }, []);

  return null;
};

export default App;
