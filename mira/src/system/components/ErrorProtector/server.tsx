import * as React from 'react'
import * as ReactDom from 'react-dom/server';
import ServerWrapper from '~/system/server-wrapper';
import parse from 'html-react-parser';
import { ErrorDisplay, ErrorProtectorProps } from './index';
import { ServerEnvContext } from '~/system/env-facade/createServerFacade';

export type EnvErrorProtectorProps = ErrorProtectorProps & {
  ErrorDisplay: ErrorDisplay;
};

export default function getEnvErrorProtector(ctx: ServerEnvContext): React.SFC<EnvErrorProtectorProps> {
  return ({ id, className, children, ErrorDisplay }) => {
    try {
      const __html = ReactDom.renderToString(
        <ServerWrapper {...ctx}>
          {children}
        </ServerWrapper>
      );
      
      return <>{parse(__html)}</>;
    } catch (err) {
      const { message, stack } = err;
      ctx.store.dispatch({ type: 'UPSERT_ERROR_BUS', payload: { id, message, stack } })
      return <ErrorDisplay id={id} className={className} message={message} stack={stack} />
    }
  }
}