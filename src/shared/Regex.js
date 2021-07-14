const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const checkRegex = (regex, string) => {
    return regex.test(string);
};

export { emailRegex, checkRegex };
