import React from 'react';

/**
 * @module
 * @name BookLoader
 * @description
 * Shows a flipping book as loader animation.
 */
const BookLoader = () => (
  <div className="book-loader">
    <div className="book-page" />
    <div className="book-page" />
    <div className="book-page" />
  </div>
);

export default BookLoader;
