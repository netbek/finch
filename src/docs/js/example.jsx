import React, {PureComponent} from 'react';

export default class Example extends PureComponent {
  render() {
    return (
      <div className="example">
        <div
          className="example__code"
          data-lang="js"
          dangerouslySetInnerHTML={{__html: this.props.children}}
        />
      </div>
    );
  }
}
