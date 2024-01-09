//
const { GroupModal, MessageModal, UserModal } = require('../modals')

// 
const groupModal = new GroupModal
const messageModal = new MessageModal
const userModal = new UserModal

module.exports.createGroup = async (req, res, next) => {
    try {
        let { userIdA, userIdB } = req.body

        if (Number(userIdA) > Number(userIdB)) {
            let temp = userIdA
            userIdA = userIdB
            userIdB = temp
        }

        let [a, b, data] = await Promise.all([
            userModal.getUserById({ userId: userIdA }),
            userModal.getUserById({ userId: userIdB }),
            groupModal.getGroup({ userIdA, userIdB })
        ])

        if (a.length === 0 || b.length === 0)
            res.status(400).json('không tìm thấy người dùng')

        if (data.length === 0)
            await groupModal.createGroup({ userIdA, userIdB })

        data = await groupModal.getGroup({ userIdA, userIdB })

        if (data[0].isBlock == 'true') {
            res.status(400).json('cuộc hội thoại đã bị chặn')
        } else {
            res.status(201).json(data)
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getAllGroups = async (req, res, next) => {
    try {
        let { userId } = req.user

        let data = await groupModal.getAllGroups({ userId })

        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

module.exports.updateGroup = async (req, res, next) => {
    try {
        const { isBlock, groupId } = req.body
        const { userId } = req.user

        await groupModal.updateGroup({ isBlock, groupId, userId })

        res.status(201).json('Cập nhật thành công')
    } catch (error) {
        next(error)
    }
}

// 
module.exports.deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.body
        const { userId } = req.user

        await groupModal.daleteGroup({ groupId, userId })

        res.status(201).json('xoá thành công')
    } catch (error) {
        next(error)
    }
}

// 
module.exports.createMess = async (req, res, next) => {
    try {
        let { userId } = req.user
        let { content, groupId } = req.body

        let group = await groupModal.getGroupById({ groupId })

        if (userId !== group[0].userIdA && userId !== group[0].userIdB)
            res.status(400).json('không hợp lệ')

        if (group.length === 0)
            res.status(400).json('không tìm thấy nhóm hoặc đã bị chặn')

        await messageModal.createMess({ senderId: userId, content, groupId })


        res.status(201).json('gửi tin nhắn thành công')
    } catch (error) {
        next(error)
    }
}

// 
module.exports.readMess = async (req, res, next) => {
    try {
        let { userId } = req.user
        console.log(userId);
        let { groupId } = req.body

        let group = await groupModal.getGroupById({ groupId })

        if (userId !== group[0].userIdA && userId !== group[0].userIdB)
            res.status(400).json('không hợp lệ')

        if (group.length === 0)
            res.status(400).json('không tìm thấy nhóm')

        await messageModal.updateMess({ userId, groupId })
        const data = await messageModal.readMess({ groupId })

        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

// 
module.exports.deleteMess = async (req, res, next) => {
    try {
        const { messageId } = req.body
        const { userId } = req.user

        await messageModal.deleteMess({ messageId, senderId: userId })

        res.status(201).json('xoá thành công')
    } catch (error) {
        next(error)
    }
}