import * as use from '@tensorflow-models/universal-sentence-encoder'
import * as tf from '@tensorflow/tfjs-node'

let encoder: use.UniversalSentenceEncoder | null = null

async function loadModel() {
  if (!encoder) {
    encoder = await use.load()
  }
}

export async function getSemanticSimilarities(
  query: string,
  candidates: string[],
): Promise<number[]> {
  await loadModel()

  if (!encoder) {
    throw new Error('Model failed to load')
  }

  const sentences = [query, ...candidates]
  const embeddings = await encoder.embed(sentences)

  const queryEmbedding = embeddings.slice([0, 0], [1, -1])
  const candidateEmbeddings = embeddings.slice([1, 0], [-1, -1])

  const similaritiesMatrix = tf.matMul(
    queryEmbedding,
    candidateEmbeddings.transpose(),
  )
  const similarities = similaritiesMatrix.squeeze()

  return Array.from(await similarities.data())
}
