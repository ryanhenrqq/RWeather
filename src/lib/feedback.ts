import { supabase } from "./supabase"

type FeedbackAnswer = "sim" | "nao"

export async function sendFeedback(
  site: string,
  page: string,
  answer: FeedbackAnswer
) {
  const { error } = await supabase
    .from("feedback")
    .insert({
      site,
      page,
      answer,
    })

  if (error) {
    console.error("Erro no feedback:", error.message)
    throw error
  }
}