import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Controls } from '../../src/components/polyfolio/Controls';

describe('Controls', () => {
  it('should render the controls', () => {
    const { getByText } = render(
      <Controls
        activeCamera="third-person"
        onCameraChange={() => {}}
        hoveredObjectName={null}
      />
    );
    expect(getByText('3rd Person')).toBeInTheDocument();
    expect(getByText('First Person')).toBeInTheDocument();
  });

  it('should call onCameraChange when a camera view is selected', () => {
    const onCameraChange = jest.fn();
    const { getByText } = render(
      <Controls
        activeCamera="third-person"
        onCameraChange={onCameraChange}
        hoveredObjectName={null}
      />
    );

    fireEvent.click(getByText('First Person'));
    expect(onCameraChange).toHaveBeenCalledWith('first-person');
  });
});