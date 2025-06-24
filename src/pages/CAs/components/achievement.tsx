import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface combatAchievement {
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
  handleClick: (ach: combatAchievement) => void;
  completed: boolean;
}

const achievementStyles = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #333",
  width: "576px",
  height: "48px",
  borderRadius: "15px",
  padding: "10px",
  backgroundColor: "#333",
  color: "white",
  gap: "12px",
  cursor: "pointer",
};

const checkedAchievementStyles = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #0f0",
  width: "576px",
  height: "48px",
  borderRadius: "15px",
  padding: "10px",
  backgroundColor: "#333",
  color: "white",
  gap: "12px",
  cursor: "pointer",
};

const Achievement = ({
  achievement,
  handleClick,
  completed,
}: achievementProps) => {
  return (
    <Card
      className={
        "w-[75%] h-18 p-1 justify-center cursor-pointer select-none " +
        (completed ? "border-completed" : "border-muted-foreground")
      }
      onClick={() => handleClick(achievement)}
    >
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-[48px] h-[48px] min-w-[48px]">
            <img
              src={`/images/Combat_Mastery_-_${achievement.tier}_achievement_icon.png`}
            />
          </div>
          <div className="flex flex-col">
            <span>{achievement.name}</span>
            <span className="text-muted-foreground text-[14px]">
              {achievement.description}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievement;
