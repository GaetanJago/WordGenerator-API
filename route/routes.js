const languageController = require('../controller/Language');
const wordController = require('../controller/Word');
const wordTranslatedController = require('../controller/WordTranslated');
const categoryController = require('../controller/Category');


module.exports = function (app){
    app.route('/languages').get(languageController.getAll);
    app.route('/languages').post(languageController.create);
    app.route('/languages/:id').get(languageController.get);
    app.route('/languages/:id').put(languageController.update);
    app.route('/languages/:id').delete(languageController.remove);

    app.route('/words').get(wordController.getAll);
    app.route('/words').post(wordController.create);
    app.route('/words/:id').get(wordController.get);
    app.route('/words/:id').put(wordController.update);
    app.route('/words/:id').delete(wordController.remove);

    app.route('/wordsTranslated').get(wordTranslatedController.getAll);
    app.route('/wordsTranslated').post(wordTranslatedController.create);
    app.route('/wordsTranslated/:id').get(wordTranslatedController.get);
    app.route('/wordsTranslated/:id').put(wordTranslatedController.update);
    app.route('/wordsTranslated/:id').delete(wordTranslatedController.remove);
    app.route('/wordTranslated').get(wordTranslatedController.findByWordRef);

    app.route('/categories').get(categoryController.getAll);
    app.route('/categories').post(categoryController.create);
    app.route('/categories/:id').get(categoryController.get);
    app.route('/categories/:id').put(categoryController.update);
    app.route('/categories/:id').delete(categoryController.remove);

    app.use(function (req, res){
        res.status(404).json({url: req.originalUrl, error: 'not found'});
    });
};