
import { BodySplit, MuscleGroup } from "../types/workout";

// Generate different workout splits based on days per week and split preference
export const generateWorkoutSplit = (daysPerWeek: number, bodySplit: BodySplit): { day: number; focus: MuscleGroup | MuscleGroup[] }[] => {
  // Zenin Style (Push/Pull/Legs)
  if (bodySplit === "zenin style") {
    const basePPL = [
      { focus: ["demonic chest", "shoulder domination", "arm control"] as MuscleGroup[] },  // Push
      { focus: ["titanic back", "arm control"] as MuscleGroup[] },               // Pull
      { focus: ["legs of steel", "core seal"] as MuscleGroup[] },                 // Legs
    ];
    
    // Add days based on frequency
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: basePPL[i % 3].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Inverted Spear Protocol (Upper/Lower)
  if (bodySplit === "inverted spear protocol") {
    const baseUL = [
      { focus: ["demonic chest", "titanic back", "shoulder domination", "arm control"] as MuscleGroup[] },  // Upper
      { focus: ["legs of steel", "core seal"] as MuscleGroup[] },                      // Lower
    ];
    
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: baseUL[i % 2].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Domain Split (Bro Split - body part per day)
  if (bodySplit === "domain split") {
    const baseBroSplit = [
      { focus: "demonic chest" as MuscleGroup },
      { focus: "titanic back" as MuscleGroup },
      { focus: "shoulder domination" as MuscleGroup },
      { focus: "arm control" as MuscleGroup },
      { focus: "legs of steel" as MuscleGroup },
    ];
    
    // Add core and rest day for 6-7 day splits
    if (daysPerWeek >= 6) {
      baseBroSplit.push({ focus: "core seal" as MuscleGroup });
    }
    
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: baseBroSplit[i % baseBroSplit.length].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Full Body Curse Mastery
  if (bodySplit === "full body curse mastery") {
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      // Use different focus for variety but still full body
      const fullBodyFocus: MuscleGroup[] = ["demonic chest", "titanic back", "shoulder domination", "arm control", "legs of steel", "core seal"];
      
      workoutSplit.push({
        day: i + 1,
        focus: fullBodyFocus,
      });
    }
    
    return workoutSplit;
  }
  
  // Default to Zenin Style if something goes wrong
  return generateWorkoutSplit(daysPerWeek, "zenin style");
};
