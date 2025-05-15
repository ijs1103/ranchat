import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

type CreateProfileInput = {
  profile_id: string;
  nickname: string;
  age: number;
  mbti:
    | "istp"
    | "intp"
    | "isfp"
    | "infp"
    | "estp"
    | "entp"
    | "esfp"
    | "enfp"
    | "istj"
    | "intj"
    | "isfj"
    | "infj"
    | "estj"
    | "entj"
    | "esfj"
    | "enfj";
};

export const createProfile = async (
  client: SupabaseClient<Database>,
  input: CreateProfileInput
) => {
  const { error } = await client.from("profiles").insert(input);
  if (error) {
    throw error;
  }
};

export const updateProfile = async (
  client: SupabaseClient<Database>,
  input: Partial<CreateProfileInput>
) => {
  const { error } = await client
    .from("profiles")
    .update({
      ...input,
    })
    .eq("profile_id", input.profile_id!);
  if (error) {
    throw error;
  }
};

export const getProfile = async (
  client: SupabaseClient<Database>,
  { profile_id }: { profile_id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select()
    .eq("profile_id", profile_id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
