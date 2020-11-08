import * as React from 'react';
import Helmet from 'react-helmet';
import { ServerEnvContext } from '~/system/env-facade/createServerFacade';
import PageModule from '~/system/components/PageModule';

type PageModuleProps = {
  url: string;
}
type PageModule = React.FunctionComponent<PageModuleProps> | React.ComponentClass<PageModuleProps>;


export default function getPageModule(ctx: ServerEnvContext): PageModule {
  return ({ url }) => {
    const SuccessComponent: any = React.useCallback((props: any) => {
      const { default: ExternalPage } = props;
      return <ExternalPage />
    }, []);

    return <PageModule Component={SuccessComponent} path={url} />;
  }
};