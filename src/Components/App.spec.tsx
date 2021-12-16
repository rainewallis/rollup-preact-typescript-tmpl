import { h, Component } from 'preact';
import { render as testRender , screen } from '@testing-library/preact';

import App from './App';

describe("Test the App component", (): void => {
    test("The App renders the text 'Template App'", (): void => {
        testRender(<App />);
        expect(screen.getByText("Template App")).toBeInTheDocument();
    });
});