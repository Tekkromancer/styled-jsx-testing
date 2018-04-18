import css from 'styled-jsx/css';
import React from 'react';

const TestComponent = () => {
  return (
    <div className="TestComponent">
      <h1>Test Component</h1>
      <style jsx>{styles}</style>
    </div>
  );
};

export default TestComponent;

const styles = css`
  h1 {
    border: 5px solid red;
  }
`;
