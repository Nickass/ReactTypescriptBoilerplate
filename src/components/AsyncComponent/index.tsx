// modules
import * as React from 'react';
import { connect } from 'react-redux';
import { defaultState } from '~/store';
import ErrorProtector, { ErrorDisplay } from '~/components/ErrorProtector';
import { ReactComponent } from '~/components';

type LoadComponentProps = {
  id: string;
  progress?: number;
}
export const DefaultLoadComponent: React.FunctionComponent<LoadComponentProps> = props => (
  <div className="load-component" style={{border: '2px solid blue'}}>LOADING.....</div>
);

type ErrorComponentProps = {
  stack: string;
  message: string;
}

export interface AsyncComponentProps {
  id: string;
  caching?: boolean;
  timeout?: number;
  children: () => Promise<any>;
  LoadComponent?: React.FunctionComponent<LoadComponentProps>;
  ErrorComponent?: React.FunctionComponent<ErrorComponentProps>;
  SuccessComponent: ReactComponent<any>;
};
export interface AsyncComponentWithStore {
  // allData: state;
  // dispatch: Dispatch
};
export interface AsyncComponentAllProps extends AsyncComponentProps, AsyncComponentWithStore {};

const AsyncComponent: React.ComponentType<AsyncComponentAllProps> = function (props) {
  const {
    ErrorComponent = ErrorDisplay,
    LoadComponent = DefaultLoadComponent,
    children: waitFunc,
    SuccessComponent,
    dispatch,
    promise,
    errorData,
    successData,
    caching,
    timeout = 10000,
    id,
  } = props as any;

  const resolver = async () => {
    try {
      const timeoutPromise = (time: number) => new Promise((res, rej) =>
        setTimeout(() => rej(new Error('Timeout')), timeout)
      );
      const promises = [
        timeoutPromise(timeout),
        waitFunc()
      ];

      const data = await Promise.race(promises) || {};
      dispatch({
        type: 'UPSERT_ASYNC_COMPONENT_SUCCESS',
        payload: { id, data }
      });
      return (
        <ErrorProtector id={'async-component-' + id}>
          <SuccessComponent {...data} />
        </ErrorProtector>
      )
    } catch (err) {
      const error = {
        message: err.message,
        stack: err.stack,
      };
      console.error(`\nAsyncComponentError:\n${err.stack}\n\n`);
      dispatch({
        type: 'UPSERT_ASYNC_COMPONENT_ERROR',
        payload: { id, error }
      });
      return <ErrorComponent id={id} {...error} />
    }
  }

  if (!promise && !errorData && !successData) {
    dispatch({
      type: 'UPSERT_ASYNC_COMPONENT_PROMISE',
      payload: { id, promise: resolver() }
    });
  }

  React.useEffect(() => {
    return () => {
      if (!caching) {
        dispatch({
          type: 'REMOVE_ASYNC_DATA',
          payload: { id }
        });
      }
    }
  }, [id, caching])

  if (errorData) {
    return <ErrorComponent id={id + '-error'} {...errorData} />;
  } else if (successData) {
    return (
      <ErrorProtector id={'async-component-' + id}>
        <SuccessComponent {...successData} />
      </ErrorProtector>
    );
  } else if (promise) {
    return <LoadComponent id={id + '-load'} />;
  } else {
    return <div data-async-id={props.id}>The replace element</div>;
  }
}

export default connect<any, AsyncComponentWithStore, AsyncComponentProps, defaultState>(
  (state, ownProps) => ({
    promise: state.asyncComponent.promises[ownProps.id],
    errorData: state.asyncComponent.errors[ownProps.id],
    successData: state.asyncComponent.success[ownProps.id],
  })
)(AsyncComponent);
