const helloWorld = (req, res, next) => {
    res.json('Hello World');
};

module.exports = { helloWorld }