db.createUser(
    {
        user: "misescapes",
        pwd: "",
        roles: [
            {
                role: "readWrite",
                db: "misescapes"
            }
        ]
    }
)