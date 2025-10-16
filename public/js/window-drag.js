// Window Dragging Functionality
(function() {
  const windowElement = document.querySelector('.window');
  const titleBar = document.querySelector('.title-bar');

  if (!windowElement || !titleBar) return;

  let isDragging = false;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;

  // Get current transform values
  function getTransformValues() {
    const style = window.getComputedStyle(windowElement);
    const matrix = style.transform;

    if (matrix === 'none') return { x: 0, y: 0 };

    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
    return {
      x: parseFloat(values[4]) || 0,
      y: parseFloat(values[5]) || 0
    };
  }

  function dragStart(e) {
    // Prevent dragging if clicking on links or buttons
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

    const transform = getTransformValues();
    initialX = e.clientX - transform.x;
    initialY = e.clientY - transform.y;

    isDragging = true;
    windowElement.classList.add('dragging');
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    windowElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  function dragEnd() {
    isDragging = false;
    windowElement.classList.remove('dragging');
  }

  // Mouse events
  titleBar.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  // Touch events for mobile
  titleBar.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    dragStart(mouseEvent);
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    drag(mouseEvent);
  });

  document.addEventListener('touchend', dragEnd);
})();
