import { RecursiveCharacterTextSplitter } from "@langchain/textSplitters";
export const chunker = async (content: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
  });
  const text = await splitter.splitText(content);
  return text;
};
export default chunker;
