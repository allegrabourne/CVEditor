// hooks/useDragDrop.js - Custom hook for drag and drop functionality

import { useState, useCallback } from 'react';

export const useDragDrop = (initialItems, onReorder) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((event, item, index) => {
    setDraggedItem({ item, index });
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.outerHTML);
    
    // Add visual feedback
    setTimeout(() => {
      event.target.style.opacity = '0.5';
    }, 0);
  }, []);

  const handleDragEnd = useCallback((event) => {
    // Reset visual feedback
    event.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback((event, index) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback((event) => {
    // Only clear drag over if we're actually leaving the drop zone
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
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
    
    // Adjust the drop index if we're moving an item from before the drop position
    const actualDropIndex = draggedItem.index < dropIndex ? dropIndex - 1 : dropIndex;
    newItems.splice(actualDropIndex, 0, movedItem);

    onReorder(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  }, [draggedItem, initialItems, onReorder]);

  const getDragProps = useCallback((item, index) => ({
    draggable: true,
    onDragStart: (e) => handleDragStart(e, item, index),
    onDragEnd: handleDragEnd,
    style: {
      cursor: 'grab',
      userSelect: 'none',
      ...(draggedItem?.index === index && { opacity: 0.5, transform: 'scale(0.95)' })
    }
  }), [draggedItem, handleDragStart, handleDragEnd]);

  const getDropProps = useCallback((index) => ({
    onDragOver: (e) => handleDragOver(e, index),
    onDragLeave: handleDragLeave,
    onDrop: (e) => handleDrop(e, index),
    'data-drop-target': true,
    style: {
      ...(dragOverIndex === index && {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderColor: 'rgba(168, 85, 247, 0.5)',
        transform: 'scale(1.02)'
      })
    }
  }), [dragOverIndex, handleDragOver, handleDragLeave, handleDrop]);

  return {
    draggedItem,
    dragOverIndex,
    getDragProps,
    getDropProps,
    isDragging: !!draggedItem
  };
};