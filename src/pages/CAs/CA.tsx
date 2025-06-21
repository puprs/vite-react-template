import achievements from "../../resources/combatAchievements.json"
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/navbar";
import { establishRecord, loadAchievements, setAchievements } from "../../hooks/achievementSynx";
import Achievement, { combatAchievement } from "./components/achievement";

export const CA = () => {
  const { user } = useAuth();

  const storedAch = localStorage.getItem("__rs3Achievements") || "";
  const [checked, setChecked] = useState<string>(storedAch);
  const [difficulty, setDifficulty] = useState<string>("All");

  useEffect(() => {
    establishRecord(user?.id, user?.user_metadata.name)
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

  const bodyStyle = {
    backgroundColor: "#111",
    margin: "0",
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    paddingTop: "75px",
  };

  const mainLayoutStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "40px",
    padding: "40px",
  };

  const achievementGridStyle = {
    flex: "1",
    justifyContent: "center",
    alignItems: "flex-start",
    viewWidth: "100%",
  };
  return (
    <div style={bodyStyle}>
      <Navbar
        currentDifficulty={difficulty}
        handleChange={(diff) => updateDifficulty(diff)}
      />
      <div style={mainLayoutStyle}>
        {/*sidebar in here*/}

        <div style={achievementGridStyle}>
          {achievements.map((achievement) => {
            if (achievement.tier === difficulty || difficulty === "All") {
              return (
                <Achievement
                  key={achievement.id}
                  achievement={achievement}
                  handleClick={() => handleAchievementToggle(achievement)}
                  completed={checked.includes(achievement.id.toString())}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
