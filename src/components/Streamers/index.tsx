import { useEffect, useState } from "react";
import { MemberCard, MemberProps } from "./MemberCard";

function Members() {
  const [members, setMembers] = useState<MemberProps[]>();
  useEffect(() => {
    fetch("http://localhost:7500/users")
      .then((response) => response.json())
      .then((json) => setMembers(json.data))
  }, []);

  return (
    <div className="background">
      <div className="cards">
        {members &&
          members.map((item) => (
            MemberCard(item)
          ))}
      </div>
    </div>
  )
}
export default Members;