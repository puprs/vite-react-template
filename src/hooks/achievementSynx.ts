import { supabase } from "../supabase-client";
import { formatDiscordName } from "../utils/utils";

export const loadAchievements = async (user: string) => {
  let { data: achievements, error } = await supabase
    .from("achievements")
    .select("achievements")
    .eq("user_id", user)
    .single();

  if (error) {
    console.error("error", error);
  }

  return achievements;
};

export const loadOthersAchievements = async (user: string) => {
  console.log("user:", user)
  let { data: achievements, error } = await supabase
    .from("achievements")
    .select("achievements")
    .eq("display_name", user)
    .single();

  if (error) {
    console.error("error", error);
  }
  console.log("achievements :", achievements)
  return achievements;
};

export const setAchievements = async (user: string, newachievement: string) => {
  let { error } = await supabase
    .from("achievements")
    .update({ achievements: newachievement })
    .eq("user_id", user)
    .select();

  if (error) {
    console.error("error", error);
  }
};

export const establishRecord = async (user: string | undefined, displayName: string| undefined) => {
// See if there was user data
if (user === undefined){
  return
}

// Check to see if local record exists
  const hasLocalRecord = !!localStorage.getItem("__hasRecord"); 
  // If not local record exists:
  if (!hasLocalRecord) {
    // Check to see if the record exists in the DB already
    let { data: achievements, error } = await supabase
      .from("achievements")
      .select("achievements")
      .eq("user_id", user)

    if (error) {
      console.error("error", error);
      return
    }
    // If no record exists in the DB already
    if (achievements?.length === 0) {
      // Write a blank record to the DB
      let { error } = await supabase
        .from("achievements")
        .insert({ achievements: "", "user_id": user, "display_name": formatDiscordName(displayName) })
        .select();

      // Check to see if we errored while writing to the DB
      if (error) {
        console.log("error", error);
      } else {
        // If we didn't error while writing to the DB
        localStorage.setItem("__hasRecord", "true");
      }
    }
    
  } else {
    // Skip everything
    return;
  }
};
