/* eslint-disable */
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.css';
declare module '*.scss';

declare let CLIENT_JS_FILE_CONTENTS: string;
declare let CLIENT_CSS_FILE_CONTENTS: string;
declare let __webpack_init_sharing__: any;
declare let __webpack_share_scopes__: any;
declare let __webpack_exports__: any;
declare let __home_public_path__: string;
declare let react: any;
declare let reactDom: any;
declare let styledComponents: any;

declare let ENTRYMODULE: string;
declare module 'ENTRYMODULE' {
  const any: any;
  export default any;
}
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  REDUX_STATE: any;
  ROOT_COMPONENT_HREF: string;
}

declare namespace Express {
  export interface Request {
    _reduxStore?: any;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    SERVER_URL: string;
  }
}
