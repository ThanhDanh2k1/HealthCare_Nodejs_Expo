// 
const { bcrypt, jwt, sendEmail, isValidEmail } = require('../utils')
// 
const { UserModal, DoctorModal, PatientModal, OtpModal } = require('../modals')

// 
const userModal = new UserModal
const doctorModel = new DoctorModal
const patientModel = new PatientModal
const otpModal = new OtpModal

// thêm 1 user
module.exports.register = async (req, res, next) => {
    try {
        console.log('user/register');

        let { email, password, role } = req.body
        if (!role || role == undefined)
            role = 'patient'

        if (!isValidEmail(email))
            throw new Error('400: Email không đúng định dạng')

        const passHash = bcrypt.hash(password)

        let [data] = await Promise.all([
            userModal.getUser({ email })
        ])

        if (data.length > 0) {
            res.status(400).send('Email đã được sử dụng')
        } else {
            const user = await userModal
                .addUser({ ...req.body, password: passHash })

            switch (role) {
                case 'doctor':
                    await doctorModel
                        .addDoctor({ ...req.body, userId: user.userId })
                    break
                case 'patient':
                    await patientModel
                        .addPatient({ ...req.body, userId: user.userId })
                    break
            }


            res.status(201).send('Thêm người dùng thành công')
        }
    } catch (error) {
        next(error)
    }
}

// login
module.exports.login = async (req, res, next) => {
    try {
        console.log('user/login');

        const { email, password } = req.body

        if (!isValidEmail(email))
            throw new Error('400: Email không đúng định dạng')

        let [data] = await Promise.all([
            userModal.getUser({ email })
        ])

        if (data.length === 0) {
            res.status(404).send('Không tìm thấy email')
        } else {
            if (!bcrypt.compare(password, data[0].password)) {
                res.status(404).send('Tài khoản mật khẩu không chính xác')
            } else {
                switch (data[0].role) {
                    case 'doctor':
                        req.user = await doctorModel
                            .getDoctor({ email })
                        break
                    case 'patient':
                        req.user = await patientModel
                            .getPatient({ email })
                        break
                    case 'admin':
                        req.user = []
                        req.user.push({ email })
                        break
                }

                req.user[0].role = data[0].role

                let [token] = await Promise.all([
                    jwt.createToken(req.user[0])
                ])

                res.status(200).send({
                    token,
                    user: req.user[0]
                })
            }
        }
    } catch (error) {
        next(error)
    }
}


// login
module.exports.changePass = async (req, res, next) => {
    try {
        console.log('user/changePasss');

        const { email, passwordOld, password } = req.body

        if (!isValidEmail(email))
            throw new Error('400: Email không đúng định dạng')

        const passHash = bcrypt.hash(password)

        let [data] = await Promise.all([
            userModal.getUser({ email })
        ])

        if (data.length === 0) {
            res.status(404).send('Không tìm thấy email')
        } else {
            if (!bcrypt.compare(passwordOld, data[0].password)) {
                res.status(404).send('Tài khoản mật khẩu không chính xác')
            } else {
                await userModal
                    .changePass({ email, password: passHash })

                res.status(201).send('Cập nhật mật khẩu thành công')
            }
        }
    } catch (error) {
        next(error)
    }
}

// lấy otp
module.exports.getOtp = async (req, res, next) => {
    try {
        console.log('user/otp');

        const { email } = req.body

        // Tạo OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // kiểm tra email có otp không hoặc otp còn hạn hay không
        let [data] = await Promise.all([
            otpModal.getEmail({ email })
        ])

        if (data.length !== 0) {
            res.status(400).send('Otp còn hạn sử dụng. Không gọi lại')
        } else {
            // gửi mail
            await sendEmail(email, otp);

            await otpModal
                .addOtp({ email, otp })

            res.status(200).send('Gửi email thành công!!!')
        }
    } catch (error) {
        next(error)
    }
}

// xác thực otp
module.exports.verifyOtp = async (req, res, next) => {
    try {
        console.log('user/verify');

        const { email, otp } = req.body

        let [data] = await Promise.all([
            otpModal.verifyOtp({ email, otp })
        ])

        if (data.length === 0) {
            res.status(400).send('Otp hết hạn sử dụng hoặc không chính xác')
        } else {
            await otpModal
                .updateOtp({ email })

            res.status(200).send('Xác thực OTP thành công!!!')
        }
    } catch (error) {
        next(error)
    }
}

// lấy hết
module.exports.getDoctors = async (req, res, next) => {
    try {
        console.log('user/allDoctors');

        let { limit } = req.body
        let [data] = await Promise.all([
            doctorModel.getAllDoctors({ limit })
        ])

        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
}

// lấy hết
module.exports.getPatients = async (req, res, next) => {
    try {
        let [data] = await Promise.all([
            patientModel.getAllPatients()
        ])

        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
}

//
module.exports.updateUser = async (req, res, next) => {
    try {
        console.log('user/update');

        const { userId, email, role } = req.user

        console.log(req.body);

        switch (role) {
            case 'doctor':
                await doctorModel.updateDoctor({ ...req.body, userId })
                req.user = await doctorModel
                    .getDoctor({ email })
                break
            case 'patient':
                await patientModel.updatePatient({ ...req.body, userId })
                req.user = await patientModel
                    .getPatient({ email })
                break
            case 'admin':
                req.user = []
                req.user.push({ email })
                break
        }

        req.user[0].role = role

        let [token] = await Promise.all([
            jwt.createToken(req.user[0])
        ])

        res.status(200).send({
            token,
            user: req.user[0]
        })
    } catch (error) {
        next(error)
    }
}

//
module.exports.deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body
        await userModal.deleteUser({ email })

        res.status(200).send('susscess')
    } catch (error) {
        next(error)
    }
}

//
module.exports.find = async (req, res, next) => {
    try {
        console.log('user/find');

        let { email } = req.body

        if (!isValidEmail(email))
            throw new Error('400: Email không đúng định dạng')

        let data = await userModal.getUser({ email })

        if (data.length !== 0) {
            res.status(404).send('Email đã được sử dụng')
        } else {
            res.status(200).send('Email chưa được sử dụng')
        }
    } catch (error) {
        next(error)
    }
}

//
module.exports.forget = async (req, res, next) => {
    try {
        console.log('user/forget');

        let { email, password } = req.body

        if (!isValidEmail(email))
            throw new Error('400: Email không đúng định dạng')

        let data = await userModal.getUser({ email })

        if (data.length == 0) {
            res.status(404).send('Email chưa được sử dụng')
        } else {
            const passHash = bcrypt.hash(password)

            await userModal
                .changePass({ ...req.body, password: passHash })

            res.status(201).send('Thành công')
        }


    } catch (error) {
        next(error)
    }
}