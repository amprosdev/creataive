const Service = require('egg').Service;
const OpenAIService = require('./openai_interface.js');

class ArticleService extends Service {
  async generate(params) {
    const result = await OpenAIService.generate(params);
    return result;
  }
  async list(page = 1) {
    // read config
    const { testUrl, pageSize } = this.config.article;
    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(
      `${testUrl}/topstories.json`,
      {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      }
    );
    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${testUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = ArticleService;
