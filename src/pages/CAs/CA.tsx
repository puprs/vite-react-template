import achievements from "../../resources/combatAchievements.json";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner"
import Navbar from "../../components/navbar.old";
import {
  establishRecord,
  loadAchievements,
  setAchievements,
} from "../../hooks/achievementSynx";
import Achievement, { combatAchievement } from "./components/achievement";
import { ScrollArea } from "@/components/ui/scroll-area";
import DifficultyFilter from "./components/difficultyFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";

export const CA = () => {
  const { user } = useAuth();

  const storedAch = localStorage.getItem("__rs3Achievements") || "";
  const [checked, setChecked] = useState<string>(storedAch);
  const [search, setSearch] = useState("");
  const [boss, setBoss] = useState("");
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

  const allBosses = achievements.map((ach) => ach.subcategory);
  const uniqueBosses = Array.from(new Set(allBosses));

  return (
    <div className="flex flex-col w-full h-[calc(100vh-53px)]">
      <div className="flex gap-4 w-[100vw] h-full">
        {/* Boss List */}
        <ScrollArea className="flex-1 overflow-y-auto w-full px-4">
          <div className="flex flex-col w-[25vw] text-center p-4">
            <span>Boss List</span>
            <span onClick={() => setBoss("")} className="h-12" key={"all"}>
              All
            </span>
            {uniqueBosses.map((boss) => (
              <span onClick={() => setBoss(boss)} className="h-12" key={boss}>
                {boss}
              </span>
            ))}
          </div>
        </ScrollArea>
        {/* CA list */}
        <div className="flex flex-col h-full w-[50vw] items-center px-4">
          <div className="flex border-muted-foreground w-full h-12 items-center p-2 m-2 gap-4">
            <Input
              value={search}
              placeholder="Search for an achievement"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <DifficultyFilter onSelect={updateDifficulty} />
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setBoss("");
                setDifficulty("All");
                toast("Reset All Filters")
              }}
            >
              <RepeatIcon/>
            </Button>
          </div>
          <ScrollArea className="flex-1 overflow-y-auto w-full px-4">
            <div className="flex flex-col w-full items-center gap-4">
              {achievements
                .filter(
                  (achievement) =>
                    (achievement.tier === difficulty || difficulty === "All") &&
                    (!search ||
                      achievement.name
                        .toLowerCase()
                        .includes(search.toLowerCase())) &&
                    (!boss || achievement.subcategory === boss)
                )
                .map((achievement) => (
                  <Achievement
                    key={achievement.id}
                    achievement={achievement}
                    handleClick={() => handleAchievementToggle(achievement)}
                    completed={checked.includes(achievement.id.toString())}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
        {/* Stats */}
        <div className="w-[25vw] text-center p-4">Stats</div>
      </div>
    </div>
  );
};
