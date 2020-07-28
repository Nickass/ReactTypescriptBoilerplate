import * as React from 'react';
import AsyncPage from './AsyncPage';
import Helmet from 'react-helmet';


type clientStats = {
  namedChunkGroups: {
    [propname: string]: {
      chunks: string[];
      assets: string[];
      children: object;
      childAssets: object;
    }
  }
}
type PageProps = { [propName: string]: any }
type Page = React.FunctionComponent<PageProps> | React.ComponentClass<PageProps>;
type pageLoader = (path: string) => Page;


export default function(ctx: any): pageLoader {
  return component_path => props => {
    const chunkName = component_path.replace(/\//g, '-') + 'index';
    const clientStats: clientStats = ctx.clientStats;
    const { assets } = clientStats.namedChunkGroups[chunkName];
    const scripts = assets.filter(item => item.endsWith('.js')).map(item => (
      <script type="text/javascript" key={item} src={`http://localhost:8080/public/${item}`} />
    ));
    const styles = assets.filter(item => item.endsWith('.css')).map(item => (
      <link rel="stylesheet" key={item} href={`http://localhost:8080/public/${item}`} />
    ));

    const SuccessComponent = ({ Page }: any) => (
      <>
        <Helmet>
          {scripts}
          {styles}
        </Helmet>
        <Page {...props} />
      </>
    );

    return <AsyncPage component_path={component_path} SuccessComponent={SuccessComponent} />
  }
};