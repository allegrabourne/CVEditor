// hooks/useDragDrop.js - Custom hook for drag and drop functionality

import { useState, useCallback } from 'react';

export const useDragDrop = (initialItems, onReorder) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((event, item, index) => {
    setDraggedItem({ item, index });
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.outerHTML);
    event.target.classList.add('dragging');
  }, []);

  const handleDragEnd = useCallback((event) => {
    event.target.classList.remove('dragging');
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback((event, index) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback((event) => {
    // Only clear drag over if we're leaving the container, not just moving between children
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDragOverIndex(null);
    }
  }, []);

  const handleDrop = useCallback((event, dropIndex) => {
    event.preventDefault();
    
    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...initialItems];
    const [movedItem] = newItems.splice(draggedItem.index, 1);
    newItems.splice(dropIndex, 0, movedItem);

    onReorder(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  }, [draggedItem, initialItems, onReorder]);

  const getDragProps = useCallback((item, index) => ({
    draggable: true,
    onDragStart: (e) => handleDragStart(e, item, index),
    onDragEnd: handleDragEnd,
    className: draggedItem?.index === index ? 'dragging' : ''
  }), [draggedItem, handleDragStart, handleDragEnd]);

  const getDropProps = useCallback((index) => ({
    onDragOver: (e) => handleDragOver(e, index),
    onDragLeave: handleDragLeave,
    onDrop: (e) => handleDrop(e, index),
    className: dragOverIndex === index ? 'drag-over' : ''
  }), [dragOverIndex, handleDragOver, handleDragLeave, handleDrop]);

  return {
    draggedItem,
    dragOverIndex,
    getDragProps,
    getDropProps
  };
};