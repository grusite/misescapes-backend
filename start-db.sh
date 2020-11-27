db.createUser(
    {
        user: "misescapes",
        pwd: "JanaJana12",
        roles: [
            {
                role: "readWrite",
                db: "misescapes"
            }
        ]
    }
)