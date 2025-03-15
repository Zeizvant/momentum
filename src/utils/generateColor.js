
const generateColor = (departmentName) => {
    const input = departmentName + Date.now().toString();

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
    }

    const color = `#${((hash & 0x00FFFFFF) | 0x1000000).toString(16).slice(1)}`;
    return color;
};

export default generateColor;