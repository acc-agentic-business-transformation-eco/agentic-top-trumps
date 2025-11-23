export const generateRandomColor = () => {
    const colors = [
        "bg-gradient-to-br from-blue-500 to-blue-700",
        "bg-gradient-to-br from-purple-500 to-purple-700",
        "bg-gradient-to-br from-green-500 to-green-700",
        "bg-gradient-to-br from-red-500 to-red-700",
        "bg-gradient-to-br from-orange-500 to-orange-700",
        "bg-gradient-to-br from-indigo-500 to-indigo-700",
        "bg-gradient-to-br from-teal-500 to-teal-700",
        "bg-gradient-to-br from-pink-500 to-pink-700",
        "bg-gradient-to-br from-yellow-500 to-yellow-700",
        "bg-gradient-to-br from-cyan-500 to-cyan-700",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
