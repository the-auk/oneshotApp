const OPENAI = require('openai');

const apiKey = '';
const openai = new OPENAI({ apiKey: apiKey });

const getFilters = async (userMessage) => {
  const messages = [
    {
      role: 'system', content: `Identify and extract the following filters: 'locations', 'excludedLocations', 'employeeRange', and 'orgKeywords'. Ensure that the 'employeeRange' filter respects a minimum of 1 employee and a maximum of 1,000,000 employees. 
                                If there is only a number specified in the user's message for employeeRange filter, assume that is the lower end of the range and the top end would be 1,000,000. Also ensure that if a location should not be included in the locations list, goes inside the excludedLocations list EXCLUSIVELY and vice versa.
                                This is the desired output format, do not deviate from this: {"locations":[...(NO KEY VALUE PAIRS INSIDE THE LIST ONLY STRINGS)], "excludedLocations":[...(NO KEY VALUE PAIRS INSIDE THE LIST ONLY STRINGS)],"employeeRange":{min:..., max:...}, "orgKeywords":[...(NO KEY VALUE PAIRS INSIDE THE LIST ONLY STRINGS)]}`},
    { role: 'user', content: userMessage },
  ];
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  const assistantReply = response.choices[0].message.content;
  let assistantReplyJSON = {}
    try {
      assistantReplyJSON = JSON.parse(assistantReply);
      return assistantReplyJSON
    }
    catch (err){
      return null
    }
}
exports.getFilters = getFilters;