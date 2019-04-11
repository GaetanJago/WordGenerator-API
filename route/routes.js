const languageController = require('../controller/Language');
const wordController = require('../controller/Word');
const wordTranslatedController = require('../controller/WordTranslated');
const categoryController = require('../controller/Category');
const accountController = require('../controller/Account');
const roleController = require('../controller/Role');

module.exports = function (app){
    app.route('/api/languages').get(languageController.getAll);
    app.route('/api/languages').post(languageController.create);
    app.route('/api/languages/:id').get(languageController.get);
    app.route('/api/languages/:id').put(languageController.update);
    app.route('/api/languages/:id').delete(languageController.remove);

    app.route('/api/words').get(wordController.getAll);
    app.route('/api/words').post(wordController.create);
    app.route('/api/words/:id').get(wordController.get);
    app.route('/api/words/:id').put(wordController.update);
    app.route('/api/words/:id').delete(wordController.remove);

    app.route('/api/wordsTranslated').get(wordTranslatedController.getAll);
    app.route('/api/wordsTranslated').post(wordTranslatedController.create);
    app.route('/api/wordsTranslated/:id').get(wordTranslatedController.get);
    app.route('/api/wordsTranslated/:id').put(wordTranslatedController.update);
    app.route('/api/wordsTranslated/:id').delete(wordTranslatedController.remove);
    app.route('/api/wordTranslated').get(wordTranslatedController.findByWordRef);

    app.route('/api/categories').get(categoryController.getAll);
    app.route('/api/categories').post(categoryController.create);
    app.route('/api/categories/:id').get(categoryController.get);
    app.route('/api/categories/:id').put(categoryController.update);
    app.route('/api/categories/:id').delete(categoryController.remove);

    app.route('/api/account').get(accountController.getAll);
    app.route('/api/account').post(accountController.create);
    app.route('/api/account/:id').get(accountController.get);
    app.route('/api/account/:id').put(accountController.update);
    app.route('/api/account/:id').delete(accountController.remove);

    app.route('/api/role').get(roleController.getAll);
    app.route('/api/role').post(roleController.create);
    app.route('/api/role/:id').get(roleController.get);
    app.route('/api/role/:id').put(roleController.update);
    app.route('/api/role/:id').delete(roleController.remove);

    app.use('/api/', function (req, res){
        res.status(404).json({url: req.originalUrl, error: 'not found'});
    });
};