import * as React from 'react'
import { Store } from 'redux';

type ReactComp = React.FunctionComponent<any> | React.ComponentClass<any>;

export interface Facade {
  EnvExternalComponent: ReactComp,
  EnvPageModule: ReactComp;
  EnvErrorProtector: ReactComp;
}
export type EnvContext = { store: Store, [propName: string]: any };
export type createFacade = (ctx: EnvContext) => Facade;

export const createFacade: createFacade = ctx => {
  // const ctx = createContext(ctx.store);
  
  return ({
    EnvExternalComponent: () => <div>Undefined getEnvExternalComponent!</div>,
    EnvPageModule: () => <div>Undefined getEnvPageModule!</div>,
    EnvErrorProtector: () => <div>Undefined EnvErrorProtector!</div>
  })
}

export default createFacade;