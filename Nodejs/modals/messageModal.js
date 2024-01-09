const ConfigSQLite = require('../config/sqlite')

// messageId
// senderId
// receiverId
// content
// timestamp
// isRead
// groupId

class MessageModal extends ConfigSQLite {

    //
    createMess({ senderId, content, groupId }) {
        this.connectDatabase()

        const query = ` INSERT INTO messages (
                            senderId,
                            content,
                            groupId
                        ) VALUES (?, ?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [senderId, content, groupId],
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
    readMess({ groupId }) {
        this.connectDatabase()

        const query = ` SELECT *
                        FROM messages
                        WHERE groupId = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query,
                [groupId],
                (error, data) => {
                    console.log(data);
                    if (error)
                        return reject(error);
                    return resolve(data)
                }
            )

            this.closeDatabase()
        })
    }

    //
    updateMess({ userId, groupId }) {
        this.connectDatabase()

        const query = ` UPDATE messages
                        SET isRead = 'true'
                        WHERE senderId != (?) and groupId = (?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [userId, groupId],
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
    deleteMess({ senderId, messageId }) {
        this.connectDatabase()

        const query = ` DELETE FROM messages
                        WHERE senderId = (?) and messageId = (?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [senderId, messageId],
                (error, data) => {
                    if (error)
                        return reject(error);
                    return resolve(data)
                }
            )

            this.closeDatabase()
        })
    }
}

module.exports = MessageModal