const { Configuration, OpenAIApi } = require('openai');

const ERROR_CODE = {
  SUCCESS: 0,
  TERMINATED_BY_LENGTH: 1,
  OTHERS: 2,
};

// const configuration = new Configuration({
//   organization: 'org-kUFKE1quikvhvcUPwFkFr6Ls',
//   apiKey: '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',
// });

const configurationPro = new Configuration({
  organization: 'org-tmscOOFbGFeM52WJBRIrDDV',
  apiKey: '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',
});

const OpenAIService = {
  // openai: new OpenAIApi(configuration),
  openai: new OpenAIApi(configurationPro),
  async ngram_hash(sentence, ngram) {
    const results = new Set('_');
    for (let i = 0; i < ((sentence.length - ngram) + 1); i++) {
      const subset = [];
      for (let j = i; j < (i + ngram); j++) {
        subset.push(sentence[j]);
      }
      results.add(subset.join(' '));
    }
    return results;
  },
  async calc_document_score(document) {
    const separator = new RegExp('[!|！||。|？|?]');
    const sentences = document.split(separator);
    const sentences_ngram = [];
    let max_similarity = 1e-7;
    for (let i = 0; i < sentences.length; i++) {
      sentences_ngram.push(await this.ngram_hash(sentences[i], 2));
      for (let j = 0; j < i; j++) {
        const union_set = new Set([ ...sentences_ngram[i], ...sentences_ngram[j] ]);
        const inter_set = new Set([ ...sentences_ngram[i] ].filter(function(x) {
          return sentences_ngram[j].has(x);
        }));
        const similarity = inter_set.size / union_set.size;
        max_similarity = Math.max(similarity, max_similarity);
      }
    }
    return 1 / max_similarity;
  },
  async generate_document({ brand, name, type, feature, count }, tempe) {
    let text = `请为我们的商品设计一个${count}字的宣传文案。品牌是${brand}, 商品名称为${name}, 所属的商品分类为${type}, 以下是商品信息和卖点： ${feature}。`;
    text += '请用中文给出回复，商品描述中可能含有英文，请翻译为中文理解。';
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      max_tokens: Math.min(2048, count * 4),
      temperature: tempe,
    });
    const result = response.data.choices[0];
    let error_code_ = ERROR_CODE.SUCCESS;
    if (result.finish_reason === 'length') {
      error_code_ = ERROR_CODE.TERMINATED_BY_LENGTH;
    }
    const generated_text = result.text.substr(2);
    return {
      data: generated_text,
      error_code: error_code_,
      score: error_code_ === ERROR_CODE.SUCCESS ? await this.calc_document_score(generated_text) : -1,
    };
  },

  async generate(params) {
    const all_promise = Promise.all([
      this.generate_document(params, 0),
      this.generate_document(params, 0.15),
      this.generate_document(params, 0.3),
      this.generate_document(params, 0.5),
    ]);
    return all_promise.then(results => {
      let index = 0;
      for (let i = 1; i < results.length; i++) {
        if (results[i].score > results[index].score) {
          index = i;
        }
      }
      return results[index];
    });
  },
};

module.exports = OpenAIService;
