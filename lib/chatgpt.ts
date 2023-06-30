import { Configuration, OpenAIApi } from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log('OPENAI_API_KEY:', OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  basePath: 'https://api.openai.com/v1',
});

const openai = new OpenAIApi(configuration);

export default openai;
