import * as React from 'react';

export interface GameControlsProps {
    reset: React.MouseEventHandler<HTMLElement>;
    toggleSound: React.MouseEventHandler<HTMLElement>;
}

export const GameControls = (props:GameControlsProps) => (
    <div className="controls">
        <button key="reset" onClick={props.reset}>Reset</button>
        <button key="sound" onClick={props.toggleSound}>Sound</button>
    </div>
);