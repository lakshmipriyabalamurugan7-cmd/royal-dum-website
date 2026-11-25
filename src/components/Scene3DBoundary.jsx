import { Component } from 'react';

/* Catches crashes inside the 3D scene and shows the branded fallback
   instead of letting the error blank the whole page. */
export default class Scene3DBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('3D scene failed to load:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
