
import React from 'react';

/**
 * @module
 * @name NotFoundPage
 * @description
 * Displays a simple 404 Not Found page consisting in a green circle with text.
 * The user gets this when typing an unexpected location path in the browser url bar.
 */
const NotFoundPage = () => (
  <div className="notfound-page-wrap">
    <h1>404</h1>
    <h2>Not Found</h2>
  </div>
);

export default NotFoundPage;
