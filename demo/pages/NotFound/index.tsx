// modules
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface NotFoundProps extends RouteComponentProps {
  className?: string;
};

class NotFound extends React.Component<NotFoundProps> {
  render () {
    const { className } = this.props;

    return (
      <div className={className}>
        <strong className="NotFound__code">404</strong>
        <h1 className="NotFound__titl">Sorry, page not found</h1>
      </div>
    )
  }
}

export default NotFound;