import {
  AppRegistry,
  AppState,
  AppStateStatus,
  TaskProvider,
} from 'react-native';

class _Bridge {
  #data: {[key: string]: string} = {};
  #taskIds: number[] = [];
  #callBacks: {forKey: string; cb: TaskProvider}[] = [];

  init() {
    this.#data = {};
    this.#taskIds = [];
    this.#callBacks = [];
    AppState.addEventListener('change', this.onStateChange);
  }

  addKey(key: string) {
    if (!Object.keys(this.#data).includes(key)) {
      this.#data[key] = '';
    }
  }

  addCallback(forKey: string, callBack: TaskProvider) {
    if (Object.keys(this.#data).includes(forKey)) {
      this.#callBacks.push({forKey: forKey, cb: callBack});
    } else {
      this.warn(
        `Cannot find any data with key "${forKey}". \nTry using 'hasKey' before calling getData.`,
      );
    }
  }

  getData(key: string): string | null {
    if (Object.keys(this.#data).includes(key)) {
      return this.#data[key];
    } else {
      this.warn(
        `Cannot find any data with key "${key}". \nTry using 'hasKey' before calling getData.`,
      );
      return null;
    }
  }

  hasKey(key: string): boolean {
    return Object.keys(this.#data).includes(key);
  }

  updateRegistry() {
    this.#callBacks.forEach(cb => {
      if (Object.keys(this.#data).includes(cb.forKey)) {
        AppRegistry.registerHeadlessTask('Bridge', cb.cb);
      }
    });
  }

  private warn(msg: string) {
    console.warn(`[WARNING] Bridge : "${msg}"`);
  }

  private onStateChange(nextAppState: AppStateStatus) {
    console.log('nextAppState', nextAppState);
    console.log('STATE : ', AppState.currentState);
    // if (AppState.currentState === 'background') {
    //   setInterval(() => {
    //     console.log('LOOP : ', AppState.currentState);
    //   }, 1000);
    // }
  }
}

const Bridge = new _Bridge();

export default Bridge;
