export const RandomColor = () => {
    // Randomly pick between "green", "red", "light", or "white"
    const colorType = Math.floor(Math.random() * 4);
  
    let backgroundColor;
    let borderColor;
  
    if (colorType === 0) {
      // Green color
      backgroundColor = `rgba(0, ${Math.floor(Math.random() * 156 + 100)}, 0, 0.4)`;
      borderColor = `rgba(0, ${Math.floor(Math.random() * 156 + 100)}, 0, 0.8)`;
    } else if (colorType === 1) {
      // Red color
      backgroundColor = `rgba(${Math.floor(Math.random() * 156 + 100)}, 0, 0, 0.4)`;
      borderColor = `rgba(${Math.floor(Math.random() * 156 + 100)}, 0, 0, 0.8)`;
    } else if (colorType === 2) {
      // Light color
      backgroundColor = `rgba(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, 0.4)`;
      borderColor = `rgba(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, 0.8)`;
    } else {
      // White color
      backgroundColor = `rgba(255, 255, 255, 0.4)`;
      borderColor = `rgba(160, 111, 111, 0.55)`;
    }
  
    return {
      background: backgroundColor,
      borderColor: borderColor,
    };
  };
  