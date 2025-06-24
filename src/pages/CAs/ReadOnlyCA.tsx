import { useEffect, useState } from "react";
import { loadOthersAchievements } from "../../hooks/achievementSynx";
import { useParams } from "react-router";
import achievements from "../../resources/combatAchievements.json"
import Achievement from "./components/achievement";
import Navbar from "../../components/navbar.old";

export const ReadOnlyCA = () => {
  const [checked, setChecked] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const { userID } = useParams()

  useEffect(() => {
    const fetchData = async () => {
    // Only Fetch if userID is not empty
      if (userID !== undefined) {
        const result = await loadOthersAchievements(userID);
        // If there are achievements, then save them to local storage
        if (result?.achievements) {
          setChecked(result.achievements);
        }
      }
    };
    fetchData();
  }, [userID]);


  const updateDifficulty = (newDiff: string) => {
    setDifficulty(newDiff);
    console.log(newDiff);
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
                  handleClick={() => null}
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
