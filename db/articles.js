let articles = [{ title: 'LoTR', body: 'some long body', author: 'JRTolkien' }, { title: 'some-book-title', body: 'body text', author: 'some author guy' }, { title: 'third-book', body: '1000', author: 'another author guy' }];
module.exports = {
    getArticles: function () {
        return articles;
    },
    getArticleById: function (paramId, res) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].title.toLowerCase() == paramId.toLowerCase()) {
                return articles[i]
            }
        }
        return false;
    },
    addArticles: function (data) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].title.toLowerCase() === data.title.toLowerCase()) {
                return false;
            }
        }
        let newArticle = {
            title: data.title,
            body: data.body,
            author: data.author
        };
        articles.push(newArticle);
    },
    editArticle: function (paramId, obj, res) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].title === paramId) {
                for (key in obj) {
                    articles[i][key] = obj[key];
                }
                console.log('Sucessful edit.');
            }
        }
    },
    deleteArticle: function (paramId, res) {
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].title == paramId) {
                articles.splice(i, 1)
                return "Item deleted";
            }
        };
    }
};