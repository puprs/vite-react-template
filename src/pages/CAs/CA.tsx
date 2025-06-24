import achievements from "../../resources/combatAchievements.json";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/navbar.old";
import {
  establishRecord,
  loadAchievements,
  setAchievements,
} from "../../hooks/achievementSynx";
import Achievement, { combatAchievement } from "./components/achievement";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CA = () => {
  const { user } = useAuth();

  const storedAch = localStorage.getItem("__rs3Achievements") || "";
  const [checked, setChecked] = useState<string>(storedAch);
  const [difficulty, setDifficulty] = useState<string>("All");

  useEffect(() => {
    establishRecord(user?.id, user?.user_metadata.name);
    const fetchData = async () => {
      // If user & Nothing in Local Storage - Load in DB
      if (user && storedAch === "") {
        const result = await loadAchievements(user.id);
        // If there are achievements, then save them to local storage
        if (result?.achievements) {
          setChecked(result.achievements);
          localStorage.setItem("__rs3Achievements", result.achievements);
        }
      } else {
        // Not logged in, just set the state based on local storage
        setChecked(storedAch);
      }
    };
    fetchData();
  }, [user]);

  const updateDifficulty = (newDiff: string) => {
    setDifficulty(newDiff);
    console.log(newDiff);
  };

  const updateChecked = (array: string) => {
    setChecked(array);
    localStorage.setItem("__rs3Achievements", array);
    // If user is logged in, save to the database
    if (user) {
      setAchievements(user.id, array);
    }
  };

  const handleAchievementToggle = (ach: combatAchievement) => {
    const achStr = checked;
    let achArr = achStr.split(",");
    achArr = achArr.filter(Boolean);
    if (achArr.includes(ach.id.toString())) {
      achArr = achArr.filter((t) => t !== ach.id.toString());
    } else {
      achArr.push(ach.id.toString());
    }
    updateChecked(achArr.toString());
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-53px)]">
      <div className="grid grid-cols-6 gap-4 w-full h-full">
        <div className="col-span-1 text-center p-4">Boss List</div>
        <ScrollArea className="col-span-4 h-[calc(100vh-53px)] px-4">
          <div className="flex flex-col w-full items-center gap-4 py-4">
            {achievements.map((achievement) =>
              achievement.tier === difficulty || difficulty === "All" ? (
                <Achievement
                  key={achievement.id}
                  achievement={achievement}
                  handleClick={() => handleAchievementToggle(achievement)}
                  completed={checked.includes(achievement.id.toString())}
                />
              ) : null
            )}
          </div>
        </ScrollArea>
        <div className="col-span-1 text-center p-4">Stats</div>
      </div>
    </div>
  );
};
