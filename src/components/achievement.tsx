interface combatAchievement {
  id: number;
  name: string;
  description: string;
  members: boolean;
  subcategory: string;
  subcategory2: string;
  tier: string;
  points: number;
  runescore: number;
}

interface achievementProps {
  achievement: combatAchievement;
}

const Achievement = ({ achievement }: achievementProps) => {

    const handleAchievementToggle = ()=> {
        console.log(achievement.name)
    }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "2px solid black",
        width: "600px",
        height: "52px",
        borderRadius: "15px",
        padding: "10px",
        backgroundColor: "#333",
        color: "white",
        gap: "12px"
      }}
      onClick={handleAchievementToggle}
    >
      <img
        style={{ height: "48px", width: "48px" }}
        src={`src/assets/images/Combat_Mastery_-_${achievement.tier}_achievement_icon.png`}
      ></img>

      <div style={{ display: "flex", flexDirection: "column", margin: "0px" }}>
        <span>{achievement.name}</span>
        <span>{achievement.description}</span>
      </div>
    </div>
  );
};

export default Achievement;
