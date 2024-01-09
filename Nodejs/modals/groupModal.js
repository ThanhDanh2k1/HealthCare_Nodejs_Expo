const ConfigSQLite = require('../config/sqlite')

// groupId
// userIdA
// userIdB
// isBlock

class groupModal extends ConfigSQLite {

    //
    createGroup({ userIdA, userIdB }) {
        this.connectDatabase()

        const query = `INSERT INTO groups (
            userIdA,
            userIdB
            ) VALUES (?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [userIdA, userIdB],
                (error, data) => {
                    if (error)
                        return reject(error);
                    return resolve(data)
                }
            )

            this.closeDatabase()
        })
    }

    //
    getGroup({ userIdA, userIdB }) {
        this.connectDatabase()

        const query = `SELECT * FROM groups WHERE userIdA = (?) and userIdB = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [userIdA, userIdB], function (error, data) {
                if (error)
                    return reject(error);
                return resolve(data)
            }
            )

            this.closeDatabase()
        })
    }

    //
    getGroupById({ groupId }) {
        this.connectDatabase()

        const query = `SELECT * FROM groups WHERE groupId = (?) and isBlock = 'false'`

        return new Promise((resolve, reject) => {
            this.db.all(query, [groupId], function (error, data) {
                if (error)
                    return reject(error);
                return resolve(data)
            }
            )

            this.closeDatabase()
        })
    }

    //
    getAllGroups({ userId }) {
        this.connectDatabase()

        const query = `SELECT * FROM groups WHERE userIdA = (?) or userIdB = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [userId, userId], (error, data) => {
                if (error)
                    return reject(error);
                return resolve(data)
            }
            )

            this.closeDatabase()
        })
    }

    //
    updateGroup({ isBlock, groupId, userId }) {
        this.connectDatabase()

        const query = ` UPDATE groups
                        SET isBlock = (?)
                        WHERE groupId = (?) and userIdA = (?) or userIdB = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [isBlock, groupId, userId, userId], (error, data) => {
                if (error)
                    return reject(error);
                return resolve(data)
            }
            )

            this.closeDatabase()
        })
    }

    //
    daleteGroup({ groupId, userId }) {
        this.connectDatabase()

        const query = ` DELETE FRom groups
                        WHERE groupId = (?) and userIdA = (?) or userIdB = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [groupId, userId, userId], (error, data) => {
                if (error)
                    return reject(error);
                return resolve(data)
            }
            )

            this.closeDatabase()
        })
    }
}

module.exports = groupModal