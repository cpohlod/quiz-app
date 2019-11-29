import React from 'react';

export default class Button extends React.Component {
    render() {
      return (
        <span data-test="refazer" onClick={this.props.onClick} className="btn">
          Refazer o Quiz
        </span>
      );
    }
  }