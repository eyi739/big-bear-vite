import { Link } from "react-router-dom"

export default function ProfilesPage(){
    const profiles = [1,2,3,4,5]
    return (
        <div className="flex flex-col gap-6">
            <h1>THIS IS THE PROFILES PAGE</h1>
            {
                profiles.map((profile) => (
                    <Link key={profile} to={`/profiles/${profile}`}>
                        Profile {profile}
                    </Link>
                ))
            }
        </div>
    )
}