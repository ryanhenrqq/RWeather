import { supabase } from "./supabase"

type FeedbackAnswer = "y" | "n"
const STORAGE_KEY = "clima-feedback-enviado"

export async function sendFeedback(site: string,page: string,answer: FeedbackAnswer) {
  if (localStorage.getItem(STORAGE_KEY) === "true") {
    console.error("FEEDBACK.TS: Feedback já registrado! Cancelando requisição.")
    return
  }
  const { error } = await supabase
    .from("feedback")
    .insert({
      site,
      page,
      answer,
    })
  localStorage.setItem(STORAGE_KEY, "true")
  if (error) {
    console.error("Erro no feedback:", error.message)
    throw error
  }
}