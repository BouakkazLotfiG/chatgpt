import openai from './chatgpt';

const query = async (prompt: string, chatId: string, model: string) => {
  console.log('prompt', prompt);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Specify the desired engine here
      prompt,
      max_tokens: 150,
      temperature: 0.9,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0.5,
    });
    if (response.data.choices.length > 0) {
      return response.data.choices[0].text;
    } else {
      console.error('No text was generated for the given prompt.');
      return null;
    }
  } catch (error) {
    console.error(
      `ChatGPT was unable to find an answer to your question. (${error})`
    );
    throw error;
  }
};

export default query;
